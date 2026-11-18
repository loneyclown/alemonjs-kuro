import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';
import { setTimeout as delay } from 'node:timers/promises';
import { Expose } from 'alemonjs';
import { createTestApp } from 'alemonjs/testing';

const state = { calls: [], credentials: true, fail: false, delay: 0 };
globalThis.__wavesExposeTest = state;
const api = `
 const state=globalThis.__wavesExposeTest;
 export const getCookie=async(uid,owner)=>{
   state.calls.push(['cookie',uid,owner]);
   return state.credentials && ((owner==='alice' && uid==='123456789') || (owner==='bob' && uid==='987654321'))
     ? {cookie:'never-expose-this-cookie'} : null;
 };
 const response=async(name,args)=>{
   state.calls.push([name,...args]);
   if(state.delay)await new Promise(resolve=>setTimeout(resolve,state.delay));
   return state.fail ? {success:false,data:null,msg:'never-expose-this-cookie'} : {success:true,data:state.fixtures[name]};
 };
 export const apiBaseInfo=(...args)=>response('base',args);
 export const apiDailyInfo=(...args)=>response('daily',args);
 export const apiRoleData=(...args)=>response('roles',args);
 export const apiRoleDetail=(...args)=>response('character',args);
 export const apiExploreData=(...args)=>response('exploration',args);
 export const apiTowerDetail=(...args)=>response('tower',args);
`;
const db = `
 const state=globalThis.__wavesExposeTest;
 export const getUidList=async owner=>{
   state.calls.push(['uids',owner]);
   return owner==='alice' ? ['123456789','111111111'] : ['987654321'];
 };
 export const getActiveUid=async owner=>owner==='alice'?'123456789':'987654321';
`;
registerHooks({
  resolve(specifier, context, next) {
    if (context.parentURL?.endsWith('/model/expose.js') && ['./api.js', './db.js'].includes(specifier)) {
      return { url: `data:text/javascript,${encodeURIComponent(specifier === './api.js' ? api : db)}`, shortCircuit: true };
    }
    return next(specifier, context);
  }
});
const { default: definition } = await import('../lib/index.js');
const protocol = 'kuro.waves';
const provider = 'alemonjs-kuro';
let app;
let client;
let event;
const invoke = (action, input = {}, options) => app.invoke(event, () => client.call(protocol, provider, action, input, options), 'any-community-consumer');

test.beforeEach(async () => {
  Object.assign(state, {
    calls: [],
    credentials: true,
    fail: false,
    delay: 0,
    fixtures: {
      base: { name: '漂泊者', level: 80, worldLevel: 8, userId: 999, cookie: 'never-expose-this-cookie' },
      daily: {
        energyData: { name: '波片', cur: 199, total: 240 },
        battlePassData: [null, { name: '电台等级', cur: 19, total: 0 }],
        userId: 999,
        token: 'never-expose-this-cookie'
      },
      roles: {
        roleList: [
          { roleId: 1405, roleName: '鉴心' },
          { roleId: 1311, roleName: '心' }
        ]
      },
      character: {
        role: { roleId: 1311, roleName: '心' },
        roleAttributeList: [{ attributeName: '生命', attributeValue: '10000', token: 'never-expose-this-cookie' }],
        phantomData: { cost: 0, equipPhantomList: [null, { phantomProp: null, cost: 4, level: 0 }] }
      },
      exploration: {
        open: true,
        exploreList: [
          null,
          {
            country: { countryId: 1, countryName: '瑝珑' },
            countryProgress: '67.5',
            areaInfoList: [null, { areaId: 1, areaName: '云陵谷', areaProgress: 100 }]
          }
        ]
      },
      tower: { isUnlock: true, difficultyList: [] }
    }
  });
  app = createTestApp({ clock: false });
  await app.mount(definition, {}, provider);
  client = Expose.create();
  event = app.events.privateMessage({ text: '查询我的鸣潮数据' }, { UserKey: 'alice' });
});
test.afterEach(async () => {
  await app.dispose();
});

test('real registration publishes versioned, validated read capabilities; help works without a user context', async () => {
  const catalog = app.run(() => client.list(protocol));
  assert.equal(catalog.length, 1);
  assert.equal(catalog[0].name, provider);
  assert.equal(catalog[0].displayName, '鸣潮助手');
  assert.equal(catalog[0].entryCommand, '#mc帮助');
  assert.equal(catalog[0].version, '1');
  assert.equal(Object.keys(catalog[0].actions).length, 8);
  for (const action of Object.values(catalog[0].actions)) {
    assert.equal(action.effect, 'read');
    assert.ok(action.inputSchema && action.outputSchema);
  }
  const result = await app.run(() => client.call(protocol, provider, 'help', null));
  assert.equal(result.ok, true);
  assert.ok(result.data.commands.some(command => command.command === '#mc体力'));
  assert.ok(!catalog[0].actions.login && !catalog[0].actions.deleteToken);
});

test('all account queries use current event ownership and return projected JSON, not credentials or arbitrary upstream fields', async () => {
  let watched = 0;
  const stop = app.run(() =>
    client.watch(protocol, () => {
      watched++;
    })
  );
  for (const action of ['accounts', 'base', 'daily', 'roles', 'exploration', 'tower', 'character']) {
    const run = await invoke(action, action === 'character' ? { character: '心' } : {});
    assert.equal(run.value.ok, true, JSON.stringify(run.value));
    assert.equal(run.value.data.status, 'ok');
    assert.ok(!JSON.stringify(run.value).includes('never-expose-this-cookie'));
    assert.ok(!JSON.stringify(run.value).includes('userId'));
  }
  assert.equal(watched, 0);
  stop();
  assert.ok(state.calls.filter(call => call[0] === 'cookie').every(call => call[1] === '123456789' && call[2] === 'alice'));
  const roleCall = state.calls.find(call => call[0] === 'character');
  assert.equal(roleCall[4], 1311);
  const character = (await invoke('character', { character: '心' })).value.data.data;
  assert.deepEqual(character.phantomData.equipPhantomList, []);
  const account = (await invoke('accounts')).value.data.data;
  assert.deepEqual(account, { uids: ['123456789', '111111111'], activeUid: '123456789' });
});

test('context-free account access, identity injection and unowned UID are rejected before credential access', async () => {
  const background = await app.run(() => client.call(protocol, provider, 'daily', {}));
  assert.equal(background.error.code, 'FORBIDDEN');
  const injected = (await invoke('daily', { userKey: 'bob' })).value;
  assert.equal(injected.error.code, 'INVALID_INPUT');
  const malformed = (await invoke('daily', { uid: 'abcdefghi' })).value;
  assert.equal(malformed.error.code, 'INVALID_INPUT');
  const unowned = (await invoke('daily', { uid: '987654321' })).value;
  assert.equal(unowned.data.status, 'not_bound');
  assert.ok(!state.calls.some(call => call[0] === 'cookie'));
  const boundWithoutOwnCredential = (await invoke('daily', { uid: '111111111' })).value;
  assert.equal(boundWithoutOwnCredential.data.status, 'not_logged_in');
  assert.ok(!state.calls.some(call => call[0] === 'daily'));
  event = app.events.groupMessage({ text: '体力' }, { UserKey: 'bob' });
  const own = (await invoke('daily')).value;
  assert.equal(own.ok, true);
  assert.equal(own.data.uid, '987654321');
  assert.ok(state.calls.some(call => call[0] === 'cookie' && call[2] === 'bob'));
});

test('business errors, private exploration and malformed upstream output do not leak private data or claim success', async () => {
  state.credentials = false;
  assert.equal((await invoke('daily')).value.data.status, 'not_logged_in');
  state.credentials = true;
  state.fail = true;
  const failed = (await invoke('daily')).value;
  assert.equal(failed.data.status, 'error');
  assert.ok(!JSON.stringify(failed).includes('never-expose-this-cookie'));
  state.fail = false;
  state.fixtures.exploration.open = false;
  assert.deepEqual((await invoke('exploration')).value.data.data, { open: false, exploreList: [] });
  state.fixtures.roles.roleList[0].roleId = 'bad-id';
  assert.equal((await invoke('roles')).value.error.code, 'INVALID_OUTPUT');
});

test('timeouts stop follow-up queries, and unloading invalidates discovered handles', async () => {
  state.delay = 25;
  const timed = (await invoke('character', { character: '心' }, { timeoutMs: 5 })).value;
  assert.equal(timed.error.code, 'TIMEOUT');
  await delay(35);
  assert.ok(!state.calls.some(call => call[0] === 'character'));
  const handle = app.run(() => client.list(protocol)[0]);
  await app.unmount(provider);
  assert.throws(
    () => app.run(() => handle.invoke('help', null)),
    error => error.code === 'STALE_PROVIDER'
  );
  assert.equal(app.run(() => client.list(protocol)).length, 0);
});
