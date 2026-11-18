import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/CoinCard.js';

const mine = {
  goldNum: 8540,
  userName: '<库街区昵称>',
  userId: '16795526',
  headUrl: 'https://example.com/avatar.png',
  signature: '这个人很懒，还没有签名。',
  mobile: 'private-mobile',
  token: 'private-token'
};
const render = mine => renderToStaticMarkup(React.createElement(Card, { data: { uid: '108839969', mine } }));
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('coin card presents community balance and identities without repeating the nickname or exposing unrelated account fields', () => {
  const original = JSON.stringify(mine);
  const html = render(mine);
  const content = text(html);
  for (const value of ['8,540', '库街区账号', '库街区 ID', '游戏 UID', '16795526', '108839969', '不是游戏内贝币']) assert.ok(content.includes(value), value);
  assert.equal((content.match(/&lt;库街区昵称&gt;/g) ?? []).length, 1);
  assert.ok(html.includes(mine.headUrl));
  for (const unwanted of ['private-mobile', 'private-token', '这个人很懒', 'undefined', 'NaN']) assert.ok(!content.includes(unwanted));
  assert.equal(JSON.stringify(mine), original);
});

test('zero balance remains valid; missing, null or invalid balance stays unknown without crashing', () => {
  const zero = text(render({ ...mine, goldNum: 0 }));
  assert.ok(!zero.includes('未返回'));
  assert.match(zero, /库洛币余额0/);
  for (const value of [null, undefined, { goldNum: -1 }, { goldNum: NaN }, { goldNum: Infinity }]) {
    const content = text(render(value));
    assert.ok(content.includes('未返回'));
    for (const bad of ['undefined', 'NaN', 'Infinity']) assert.ok(!content.includes(bad));
  }
});
