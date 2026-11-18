import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { registerHooks, stripTypeScriptTypes } from 'node:module';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { Script } from 'node:vm';

// Exercise the real handlers and storage without a QQ account or Redis server.
const records = new Map();
const sent = [];
const requests = [];
const state = { redis: null, sent };
globalThis.__kuroSecurityTest = state;
const redis = {
  async get(key) {
    return records.get(key) ?? null;
  },
  async set(key, value, ...options) {
    if (options.includes('XX') && !records.has(key)) return null;
    records.set(key, value);
    return 'OK';
  },
  async del(key) {
    return Number(records.delete(key));
  }
};
state.redis = redis;
const format = () => ({
  text: '',
  addText(value) {
    this.text += value;
  },
  addMarkdown(value) {
    this.text += value.text;
  },
  addImage() {}
});
state.format = format;
const stubs = {
  '@alemonjs/db': 'export const getIoRedis = () => globalThis.__kuroSecurityTest.redis;',
  alemonjs: `
    export const getConfigValue = () => globalThis.__kuroSecurityTest.config;
    export const EventsEnum = {};
    export const createEvent = ({ event }) => event;
    export const Format = {
      create: () => globalThis.__kuroSecurityTest.format(),
      createMarkdown: () => globalThis.__kuroSecurityTest.format()
    };
    export const useMessage = () => [{ send: async ({ format }) => {
      globalThis.__kuroSecurityTest.sent.push(format.text);
    } }];`,
  jsxp: 'export const renderComponentIsHtmlToBuffer = async () => { globalThis.__kuroSecurityTest.onRender?.(); return false; };',
  signCard: 'export default function Card() {}',
  loginCard: 'export default function Card() {} export const generateQrDataUrl = async () => "";'
};
const root = new URL('../', import.meta.url);
registerHooks({
  resolve(specifier, context, next) {
    const stub = specifier.includes('LoginHelpCard') ? stubs.loginCard : specifier.includes('SignCard') ? stubs.signCard : stubs[specifier];
    if (stub) return { url: `data:text/javascript,${encodeURIComponent(stub)}`, shortCircuit: true };
    if (specifier.startsWith('@src/')) {
      return { url: new URL(`src/${specifier.slice(5)}.ts`, root).href, shortCircuit: true };
    }
    if (specifier.startsWith('.') && context.parentURL?.endsWith('.ts')) {
      const url = new URL(`${specifier}.ts`, context.parentURL);
      if (existsSync(url)) return { url: url.href, shortCircuit: true };
    }
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url.endsWith('.ts'))
      return {
        format: 'module',
        shortCircuit: true,
        source: stripTypeScriptTypes(readFileSync(fileURLToPath(url), 'utf8'))
      };
    return next(url, context);
  }
});

const db = await import('../src/model/db.ts');
const api = await import('../src/model/api.ts');
const { default: tokenHandler } = await import('../src/response/token.ts');
const { default: loginHandler } = await import('../src/response/login.ts');
const { default: userHandler } = await import('../src/response/user.ts');
const { default: signHandler } = await import('../src/response/sign.ts');
const { createLoginSession, closeLoginServer } = await import('../src/model/login-server.ts');
const { LOGIN_PAGE } = await import('../src/img/login-page.ts');
const uid = '123456789';
const alice = 'qq-bot:alice';
const bob = 'qq-bot:bob';
const secret = 'secret-cookie-that-must-never-appear';
const bat = 'secret-access-token';
const event = (MessageText, UserKey = alice, name = 'private.message.create') => ({
  MessageText,
  UserKey,
  UserId: UserKey.split(':')[1],
  Platform: 'qq-bot',
  name
});

await test('credential ownership, deletion and disclosure regressions', async t => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options = {}) => {
    if (String(url).startsWith('http://127.0.0.1:')) return originalFetch(url, options);
    requests.push({ url: String(url), ...options });
    await state.onRequest?.(String(url));
    return {
      text: async () => '127.0.0.1',
      json: async () => state.respond?.(String(url)) ?? { code: 0, msg: 'ok', data: { token: secret, accessToken: bat } }
    };
  };
  t.after(async () => {
    await closeLoginServer();
    globalThis.fetch = originalFetch;
  });
  t.beforeEach(async () => {
    await closeLoginServer();
    records.clear();
    sent.length = 0;
    requests.length = 0;
    state.redis = redis;
    state.onRequest = null;
    state.respond = null;
    state.onRender = null;
    state.config = { 'alemonjs-kuro': { login: { port: 0, host: '127.0.0.1', publicUrl: 'http://127.0.0.1:0' } } };
  });

  await t.test('binding another UID does not grant access to its credentials', async () => {
    await db.addToken(alice, uid, secret, 'alice-device', bat);
    await db.bindUid(bob, uid);
    assert.equal(await db.getUserByUid(uid, bob), null);
    assert.equal(await api.getCookie(uid, bob), null);
    assert.equal(requests.length, 0, 'deny before contacting upstream');
  });

  await t.test('each user can store credentials for the same UID independently', async () => {
    await db.addToken(alice, uid, secret, 'alice-device', bat);
    await db.addToken(bob, uid, 'bob-cookie', 'bob-device', 'bob-bat');
    assert.equal((await db.getUserByUid(uid, alice)).cookie, secret);
    assert.equal((await db.getUserByUid(uid, bob)).cookie, 'bob-cookie');
    await api.apiBaseInfo(uid, 'bob-cookie', bob);
    assert.equal(requests.at(-1).headers.did, 'bob-device');
    assert.equal(requests.at(-1).headers['b-at'], 'bob-bat');
  });

  await t.test("delete and unbind cannot delete another user's credentials", async () => {
    await db.addToken(alice, uid, secret, 'device', bat);
    await tokenHandler(event(`#mc删除token${uid}`, bob));
    assert.equal((await db.getUserByUid(uid, alice)).cookie, secret);
    await db.bindUid(bob, uid);
    await db.unbindUid(bob, uid);
    assert.equal((await db.getUserByUid(uid, alice)).cookie, secret);
    await tokenHandler(event(`#mc删除token${uid}`, alice));
    assert.equal(await db.getUserByUid(uid, alice), null);
  });

  await t.test('legacy credentials without an owner are not claimed by binding', async () => {
    records.set(`data:alemonjs-kuro:user:uid:${uid}`, JSON.stringify({ uid, cookie: secret, did: 'device', bat }));
    await db.bindUid(bob, uid);
    assert.equal(await db.getUserByUid(uid, bob), null);
    assert.equal(await api.getCookie(uid, bob), null);
  });

  await t.test('cross-platform user IDs do not share bindings', async () => {
    await userHandler(event(`#mc绑定${uid}`, 'qq-bot:alice'));
    await userHandler(event('#mc查看', 'discord:alice'));
    assert.match(sent.at(-1), /未绑定/);
  });

  await t.test('credential commands in groups never call login or save a token', async () => {
    await db.bindUid(alice, uid);
    await loginHandler(event('#mc登录 13800138000 123456', alice, 'message.create'));
    await tokenHandler(event(`#mc添加token ${secret}`, alice, 'message.create'));
    assert.equal(requests.length, 0);
    assert.equal(await db.getUserByUid(uid, alice), null);
    assert.ok(sent.every(text => text.includes('私聊')));
  });

  await t.test('disabled token status never reads or exposes the credential', async () => {
    await db.bindUid(alice, uid);
    await db.addToken(alice, uid, secret, 'device', bat);
    await tokenHandler(event('#mc获取token'));
    assert.match(sent.at(-1), /已停用/);
    assert.ok(!sent.join().includes(secret.substring(0, 20)));
    assert.equal(requests.length, 0);
  });

  await t.test('sign execution is blocked while calendar lookup stays read-only', async () => {
    await signHandler(event('#mc签到'));
    assert.match(sent.at(-1), /签到执行暂未开放/);
    assert.equal(requests.length, 0);
    await db.bindUid(alice, uid);
    await db.addToken(alice, uid, secret, 'device', bat);
    await signHandler(event('#mc签到日历'));
    assert.ok(requests.some(request => request.url.endsWith('/encourage/signIn/initSignInV2')));
    assert.ok(!requests.some(request => request.url.endsWith('/encourage/signIn/v2')));
  });

  await t.test('API and binding logs do not include credentials or raw message text', async () => {
    const logs = [];
    const originalLog = console.log;
    console.log = (...values) => logs.push(values.join(' '));
    try {
      await api.apiLogin('13800138000', '123456', 'private-device');
      await api.apiRequestToken(uid, secret, 'private-device');
      await db.addToken(alice, uid, secret, 'private-device', bat);
      assert.equal(await api.getSelfCookie(uid, alice), secret);
      await userHandler(event(`#mc查看 ${secret}`));
    } finally {
      console.log = originalLog;
    }
    for (const value of [secret, bat, '13800138000', '123456', 'private-device']) {
      assert.ok(!logs.join('\n').includes(value), `sensitive value reached logs: ${value.slice(0, 3)}…`);
    }
  });

  await t.test('missing owner cannot read or delete a credential', async () => {
    await db.addToken(alice, uid, secret, 'device', bat);
    await assert.rejects(async () => db.getUserByUid(uid));
    await assert.rejects(async () => db.deleteToken(uid));
    assert.equal((await db.getUserByUid(uid, alice)).cookie, secret);
  });

  await t.test('an in-flight access-token refresh cannot recreate a deleted credential', async () => {
    await db.addToken(alice, uid, secret, 'device');
    state.onRequest = async url => {
      if (url.includes('requestToken')) await db.deleteToken(uid, alice);
    };
    await api.getSelfCookie(uid, alice);
    assert.equal(await db.getUserByUid(uid, alice), null);
  });

  await t.test('disconnected storage never reports a successful credential write or delete', async () => {
    state.redis = null;
    await assert.rejects(db.addToken(alice, uid, secret, 'device'), /数据库未连接/);
    await assert.rejects(db.deleteToken(uid, alice), /数据库未连接/);
  });

  const captcha = { lot_number: 'human-challenge', captcha_output: 'validated', pass_token: 'captcha-pass', gen_time: '1234' };
  const successfulLogin = url => ({
    code: 0,
    msg: 'ok',
    data: url.includes('/gamer/role/list') ? [{ roleId: uid, serverName: '国服' }] : { token: secret, accessToken: bat }
  });
  const post = (url, body, extraHeaders = {}) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...extraHeaders },
      body: JSON.stringify(body)
    });

  await t.test('SMS login sends the device ID in both header and body', async () => {
    await api.apiLogin('13800138000', '123456', 'same-device');
    assert.equal(new URLSearchParams(requests[0].body).get('devCode'), 'same-device');
    assert.equal(requests[0].headers.devCode, 'same-device');
  });

  await t.test('H5 SMS accepts the boolean success envelope without accepting error codes', async () => {
    state.respond = () => ({ success: true, msg: 'ok' });
    assert.equal((await api.apiSendSms('13800138000', '{}', 'device')).success, true);
    state.respond = () => ({ code: 1, success: true, msg: 'failed' });
    assert.equal((await api.apiSendSms('13800138000', '{}', 'device')).success, false);
  });

  await t.test('login page JavaScript parses and does not embed credentials', () => {
    const script = LOGIN_PAGE.match(/<script>([\s\S]*)<\/script>/)[1];
    assert.doesNotThrow(() => new Script(script));
    assert.ok(!LOGIN_PAGE.includes(secret));
    assert.ok(LOGIN_PAGE.includes('getValidate'));
  });

  await t.test('missing publicUrl refuses to issue an inaccessible container login link', async () => {
    delete state.config['alemonjs-kuro'].login.publicUrl;
    await assert.rejects(
      createLoginSession(alice, async () => {}),
      /publicUrl.*公网/
    );
    state.config['alemonjs-kuro'].login.publicUrl = 'not-a-url';
    await assert.rejects(
      createLoginSession(alice, async () => {}),
      /完整的 http\/https/
    );
  });

  await t.test('private login sends its link before rendering the QR image', async () => {
    let rendered = false;
    state.onRender = () => {
      rendered = true;
      assert.equal(sent.length, 1);
      assert.match(sent[0], /http:\/\/127\.0\.0\.1:\d+\/kuro\/login\/[a-f0-9]{48}/);
    };
    await loginHandler(event('#mc登录'));
    assert.equal(rendered, true);
    assert.equal(sent.length, 1, 'a failed image must not hide or duplicate the working login link');
  });

  await t.test('explicit public origin is preserved instead of using a local interface', async () => {
    state.config['alemonjs-kuro'].login.publicUrl = 'https://login.example.com';
    const url = await createLoginSession(alice, async () => {});
    assert.equal(new URL(url).origin, 'https://login.example.com');
  });

  await t.test('real HTTP login saves credentials to the session owner and activates the UID', async () => {
    state.respond = successfulLogin;
    const notifications = [];
    const url = await createLoginSession(alice, async text => notifications.push(text));
    assert.match(url, /\/kuro\/login\/[a-f0-9]{48}$/);
    const page = await fetch(url);
    assert.equal(page.status, 200);
    assert.equal(page.headers.get('cache-control'), 'no-store');
    assert.equal(page.headers.get('referrer-policy'), 'no-referrer');
    assert.ok((await page.text()).includes('短信验证码'));
    assert.equal((await post(url + '/sms', { mobile: '13800138000', captcha })).status, 200);
    const smsRequest = requests.find(item => item.url.includes('getSmsCodeForH5'));
    assert.equal(smsRequest.headers.source, 'h5');
    assert.equal(JSON.parse(new URLSearchParams(smsRequest.body).get('geeTestData')).pass_token, captcha.pass_token);
    const result = await post(url + '/submit', { mobile: '13800138000', code: '123456', userId: bob });
    assert.equal(result.status, 200);
    const body = await result.text();
    assert.equal(JSON.parse(body).uid, uid);
    assert.ok(!body.includes(secret) && !body.includes(bat));
    const saved = await db.getUserByUid(uid, alice);
    assert.equal(saved.cookie, secret);
    assert.equal(saved.did, smsRequest.headers.devCode);
    assert.equal(await db.getActiveUid(alice), uid);
    assert.equal(await db.getUserByUid(uid, bob), null);
    assert.equal((await api.getCookie(uid, alice)).cookie, secret);
    assert.match(notifications[0], /登录成功/);
    assert.equal((await post(url + '/submit', { mobile: '13800138000', code: '123456' })).status, 410);
  });

  await t.test('new or expired login links cannot be reused', async () => {
    const oldUrl = await createLoginSession(alice, async () => {});
    const currentUrl = await createLoginSession(alice, async () => {});
    assert.equal((await fetch(oldUrl)).status, 410);
    assert.equal((await fetch(currentUrl)).status, 200);
    const now = Date.now();
    const originalNow = Date.now;
    Date.now = () => now + 181000;
    try {
      assert.equal((await fetch(currentUrl)).status, 410);
    } finally {
      Date.now = originalNow;
    }
    assert.equal(requests.length, 0);
  });

  await t.test('invalid origins and missing captcha never send an SMS', async () => {
    const url = await createLoginSession(alice, async () => {});
    assert.equal((await post(url + '/sms', { mobile: '13800138000', captcha }, { Origin: 'https://another-site.invalid' })).status, 403);
    assert.equal((await post(url + '/sms', { mobile: '13800138000' })).status, 400);
    assert.equal(requests.length, 0);
  });

  await t.test('SMS is rate limited and a different phone cannot use its session', async () => {
    const url = await createLoginSession(alice, async () => {});
    assert.equal((await post(url + '/sms', { mobile: '13800138000', captcha })).status, 200);
    assert.equal((await post(url + '/sms', { mobile: '13800138000', captcha })).status, 429);
    assert.equal((await post(url + '/submit', { mobile: '13900139000', code: '123456' })).status, 400);
    assert.equal(requests.length, 1);
  });

  await t.test('a revoked in-flight login cannot save credentials', async () => {
    state.respond = successfulLogin;
    const url = await createLoginSession(alice, async () => {});
    state.onRequest = async endpoint => {
      if (endpoint.includes('requestToken')) await createLoginSession(alice, async () => {});
    };
    assert.equal((await post(url + '/submit', { mobile: '13800138000', code: '123456' })).status, 400);
    assert.equal(await db.getUserByUid(uid, alice), null);
  });

  await t.test('failed login attempts are bounded and do not overwrite credentials', async () => {
    state.respond = () => ({ code: 1, msg: '验证码无效', data: null });
    await db.addToken(alice, uid, 'previous-cookie', 'device', bat);
    const url = await createLoginSession(alice, async () => {});
    for (let i = 0; i < 6; i++) {
      assert.equal((await post(url + '/submit', { mobile: '13800138000', code: '123456' })).status, 400);
    }
    assert.equal((await fetch(url)).status, 410);
    assert.equal(requests.length, 5);
    assert.equal((await db.getUserByUid(uid, alice)).cookie, 'previous-cookie');
  });

  await t.test('private login supports comma-separated SMS parameters', async () => {
    state.respond = successfulLogin;
    await loginHandler(event('#mc登录 13800138000,123456'));
    assert.match(sent.at(-1), /登录成功/);
    assert.equal((await db.getUserByUid(uid, alice)).cookie, secret);
  });
});
