import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';

const state = { config: {}, sent: [], warnings: [], responses: [], renders: 0 };
globalThis.__markdownTest = state;
const formatUrl = new URL('../node_modules/alemonjs/lib/application/format/message-format.js', import.meta.url).href;
const stubs = {
  alemonjs: `
    export { Format } from ${JSON.stringify(formatUrl)};
    export const ResultCode = { Ok: 2000 };
    export const createEvent = ({ event }) => event;
    export const getConfigValue = () => globalThis.__markdownTest.config;
    export const logger = { warn: message => globalThis.__markdownTest.warnings.push(message) };
    export const useMessage = () => [{ send: async message => {
      const state = globalThis.__markdownTest;
      state.sent.push(message);
      const result = state.responses.shift();
      if (result instanceof Error) throw result;
      return result ?? [{ code: 2000 }];
    } }];`,
  jsxp: `export const renderComponentIsHtmlToBuffer = async () => {
    globalThis.__markdownTest.renders++;
    return Buffer.from('test-image');
  };`
};
registerHooks({
  resolve(specifier, context, next) {
    if (stubs[specifier]) return { url: `data:text/javascript,${encodeURIComponent(stubs[specifier])}`, shortCircuit: true };
    return next(specifier, context);
  }
});

const { default: help } = await import('../lib/response/help.js');
const { HELP_DATA, MORE_HELP_DATA } = await import('../lib/img/views/Help.js');
const { createMarkdownText } = await import(new URL('../node_modules/@alemonjs/qq-bot/lib/format.js', import.meta.url).href);
const event = (MessageText = '#mc帮助', name = 'private.message.create', Platform = 'qq-bot') => ({
  MessageText,
  name,
  Platform,
  UserKey: 'test-user',
  UserId: 'test-user'
});
const enabled = () => {
  state.config = { 'alemonjs-kuro': { markdown: { enabled: true } }, 'qq-bot': { markdownToText: false } };
};
const buttons = message => message.format.value.find(item => item.type === 'Markdown')?.value.filter(item => item.type === 'MD.button') ?? [];
const isImage = message => message.format.value.some(item => item.type.startsWith('Image'));

test.beforeEach(() => {
  state.config = {};
  state.sent = [];
  state.warnings = [];
  state.responses = [];
  state.renders = 0;
});

test('missing or non-boolean Markdown switch preserves image help', async () => {
  for (const value of [undefined, false, 'true']) {
    state.config = { 'alemonjs-kuro': { markdown: { enabled: value } } };
    await help(event());
    assert.ok(isImage(state.sent.at(-1)));
  }
  assert.equal(state.renders, 3);
});

test('enabled Markdown makes every main command and navigation clickable without rendering an image', async () => {
  enabled();
  await help(event());
  assert.equal(state.renders, 0);
  assert.equal(state.sent.length, 1);
  const entries = buttons(state.sent[0]);
  const commands = HELP_DATA.flatMap(category => category.items);
  assert.equal(entries.length, commands.length + 2);
  for (const item of commands) {
    const button = entries.find(entry => entry.options.data === (item.input ?? item.command));
    assert.ok(button, item.command);
    assert.equal(button.options.commandTarget, false);
    assert.equal(button.options.autoEnter, item.input === undefined);
  }
  assert.ok(entries.some(button => button.options.data === '#mc更多帮助'));
  assert.ok(!entries.some(button => ['#mc签到', '#mc获取token'].includes(button.options.data)));
  const wire = createMarkdownText(state.sent[0].format.value[0].value, 'c2c');
  assert.ok(wire.includes('<qqbot-cmd-enter text="#mc体力"'));
  assert.ok(wire.includes('<qqbot-cmd-input text="%23mc%E6%9F%A5%E8%AF%A2%20"'));
});

test('more help fills parameter commands for editing and never sends sample UID or Token values', async () => {
  enabled();
  await help(event('#mc更多帮助'));
  const entries = buttons(state.sent[0]);
  const commands = MORE_HELP_DATA.flatMap(category => category.items);
  assert.equal(entries.length, commands.length + 2);
  for (const command of commands) {
    const button = entries.find(entry => entry.options.data === (command.input ?? command.command));
    assert.ok(button);
    if (command.input) {
      assert.equal(button.options.autoEnter, false);
      assert.ok(!button.options.data.includes('123456789') && !button.options.data.includes('<Token>'));
    }
  }
  assert.ok(entries.some(button => button.options.data === '#mc帮助'));
  for (const command of ['#mc签到', '#mc深塔 超载区', '#mc深塔 实验区', '#mc深塔 稳定区', '#mc公告 活动', '#mc公告 资讯']) {
    assert.equal(entries.find(button => button.options.data === command)?.options.autoEnter, true, command);
  }
  for (const input of ['#mc星声 ', '#mc数据坞 ', '#mc公告 ', '#mc公告 活动 ', '#mc公告 资讯 ']) {
    assert.equal(entries.find(button => button.options.data === input)?.options.autoEnter, false, input);
  }
});

test('private-only navigation in groups fills input instead of auto sending', async () => {
  enabled();
  await help(event('#mc帮助', 'message.create'));
  const login = buttons(state.sent[0]).find(button => button.options.data === '#mc登录');
  assert.equal(login.options.autoEnter, false);
  const wire = createMarkdownText(state.sent[0].format.value[0].value, 'group');
  assert.equal((wire.match(/qqbot-cmd-input/g) ?? []).length, 14);
  assert.ok(!wire.includes('qqbot-cmd-enter'));
});

test('markdownToText conflict gives a plain configuration message', async () => {
  enabled();
  state.config['qq-bot'].markdownToText = true;
  await help(event());
  assert.equal(state.renders, 0);
  assert.equal(buttons(state.sent[0]).length, 0);
  assert.ok(JSON.stringify(state.sent[0].format.value).includes('markdownToText'));
});

test('unsupported platforms keep the image reply', async () => {
  enabled();
  await help(event('#mc帮助', 'private.message.create', 'discord'));
  assert.equal(state.renders, 1);
  assert.ok(isImage(state.sent[0]));
});

test('permission rejection or transport exception falls back once without logging response details', async () => {
  enabled();
  state.responses = [[{ code: 4002 }]];
  await help(event());
  assert.ok(isImage(state.sent.at(-1)));
  assert.equal(state.renders, 1);
  state.responses = [new Error('sensitive upstream response')];
  await help(event());
  assert.ok(isImage(state.sent.at(-1)));
  assert.equal(state.renders, 2);
  assert.equal(state.warnings.length, 2);
  assert.ok(!state.warnings.join().includes('sensitive upstream response'));
});
