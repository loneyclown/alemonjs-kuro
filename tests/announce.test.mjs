import assert from 'node:assert/strict';
import test from 'node:test';
import { registerHooks } from 'node:module';
import { createTestApp } from 'alemonjs/testing';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/AnnCard.js';
import { annPostUrl, annTimestamp, getAnnList, parseAnnQuery, rememberAnnList, sortedAnnouncements } from '../lib/model/announcements.js';

const post = (id, title, publishTime) => ({ id, postId: String(id), postTitle: title, publishTime, coverUrl: 'https://example.com/cover.png' });
const data = {
  activities: [post('101', '活动专属标题', 1794967200)],
  infos: [post('102', '资讯专属标题', 1794967200)],
  notices: [post('103', '较旧公告', 1794880800000), post('104', '<最新公告>', 1794967200)]
};
const render = values => renderToStaticMarkup(React.createElement(Card, { data: values }));
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('default bulletin shows only notices, newest first; categories remain separately selectable', () => {
  const original = JSON.stringify(data);
  const html = render(data);
  const content = text(html);
  assert.ok(!content.includes('活动专属标题') && !content.includes('资讯专属标题'));
  assert.ok(content.indexOf('&lt;最新公告&gt;') < content.indexOf('较旧公告'));
  assert.ok(content.includes('#mc公告 1') && content.includes('2026-11-18'));
  const activity = text(render({ ...data, category: 'activity' }));
  assert.ok(activity.includes('活动专属标题') && !activity.includes('较旧公告') && activity.includes('#mc公告 活动 1'));
  assert.ok(!activity.includes('当前活动'), 'publishing an event post does not prove the event is still running');
  assert.ok(text(render({ ...data, category: 'info' })).includes('资讯专属标题'));
  assert.equal(JSON.stringify(data), original);
});

test('sorting tolerates null rows, deduplicates post IDs and preserves large original-link IDs without precision loss', () => {
  const sorted = sortedAnnouncements([null, {}, data.notices[0], data.notices[1], data.notices[1]]);
  assert.deepEqual(
    sorted.map(item => item.postId),
    ['104', '103']
  );
  assert.equal(annTimestamp(1794967200), annTimestamp(1794967200000));
  assert.equal(annTimestamp(''), null);
  assert.equal(annPostUrl('1572257146396131328'), 'https://www.kurobbs.com/mc/post/1572257146396131328');
  assert.equal(annPostUrl(1572257146396131328), null);
  assert.equal(annPostUrl('../login'), null);
  assert.ok(text(render({ activities: [], infos: [], notices: [null] })).includes('暂无'));
});

test('commands parse category and original-link number; indices bind to the displayed snapshot and expire safely', () => {
  assert.deepEqual(parseAnnQuery(''), { category: 'notice', index: undefined });
  assert.deepEqual(parseAnnQuery('2'), { category: 'notice', index: 2 });
  assert.deepEqual(parseAnnQuery('活动 1'), { category: 'activity', index: 1 });
  assert.deepEqual(parseAnnQuery('资讯3'), { category: 'info', index: 3 });
  for (const bad of ['0', '-1', '其他', '1abc', '999999999999999999999']) assert.equal(parseAnnQuery(bad), null);
  rememberAnnList('chat-a', 'notice', [data.notices[0]], 100);
  assert.equal(getAnnList('chat-a', 'notice', 200)[0].postId, '103');
  assert.equal(getAnnList('chat-b', 'notice', 200), null);
  assert.equal(getAnnList('chat-a', 'activity', 200), null);
  assert.equal(getAnnList('chat-a', 'notice', 600100), null);
  for (let i = 0; i <= 100; i++) rememberAnnList(`bounded-${i}`, 'notice', data.notices, 1000);
  assert.equal(getAnnList('bounded-0', 'notice', 1001), null);
  assert.ok(getAnnList('bounded-100', 'notice', 1001));
});

const state = { calls: [], fail: false, list: data.notices };
globalThis.__announceTest = state;
registerHooks({
  resolve(specifier, context, next) {
    if (context.parentURL?.endsWith('/response/announce.js') && ['../model/api.js', 'jsxp'].includes(specifier)) {
      const source =
        specifier === 'jsxp'
          ? 'export const renderComponentIsHtmlToBuffer=async()=>Buffer.from("preview");'
          : `export const apiAnnList=async(type,size)=>{const s=globalThis.__announceTest;s.calls.push([type,size]);return s.fail?{success:false,data:null}:{success:true,data:{list:s.list}};};`;
      return { url: `data:text/javascript,${encodeURIComponent(source)}`, shortCircuit: true };
    }
    return next(specifier, context);
  }
});
const { default: handler } = await import('../lib/response/announce.js');

test('real handler returns the pictured post link without refetching or mixing users; category requests only fetch that category', async () => {
  const app = createTestApp();
  const invoke = (text, owner = 'announce-alice') => app.runHandler(handler, app.events.privateMessage({ text }, { UserKey: owner }), 'alemonjs-kuro');
  state.calls.length = 0;
  state.fail = false;
  state.list = data.notices;
  try {
    await invoke('#mc公告');
    assert.deepEqual(state.calls, [['3', 6]]);
    state.list = [post('105', '后来发布的新公告', 1795053600000)];
    const link = await invoke('#mc公告 1');
    assert.ok(link.messages[0].text.includes('https://www.kurobbs.com/mc/post/104'));
    assert.equal(state.calls.length, 1);
    const other = await invoke('#mc公告 1', 'announce-bob');
    assert.match(other.messages[0].text, /尚未查询|过期/);
    const group = await app.runHandler(handler, app.events.groupMessage({ text: '#mc公告 1' }, { UserKey: 'announce-alice' }), 'alemonjs-kuro');
    assert.match(group.messages[0].text, /尚未查询|过期/);
    await invoke('#mc公告 活动');
    assert.deepEqual(state.calls.at(-1), ['1', 6]);
    state.fail = true;
    const failed = await invoke('#mc公告 资讯');
    assert.match(failed.messages[0].text, /获取失败/);
    state.fail = false;
    state.list = undefined;
    assert.match((await invoke('#mc公告 资讯')).messages[0].text, /获取失败/);
  } finally {
    state.fail = false;
    await app.dispose();
  }
});
