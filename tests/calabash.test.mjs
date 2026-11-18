import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/CalabashCard.js';
import { routeRules } from '../lib/constants/kuro.js';

const entry = i => ({ phantom: { phantomId: i, name: `声骸${i}`, iconUrl: `https://example.com/${i}.png`, cost: 3 }, star: 4, maxStar: 4 });
const source = {
  level: 30,
  baseCatch: '20%',
  strengthenCatch: '100%',
  cost: 12,
  catchQuality: 5,
  curExp: 1925,
  target: 9999999,
  maxCount: 748,
  unlockCount: 748,
  isUnlock: true,
  phantomList: Array.from({ length: 187 }, (_, i) => entry(i + 1))
};
const render = (calabash, page) => renderToStaticMarkup(React.createElement(Card, { data: { uid: '100000001', calabash, page } }));
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('real nested data renders correct collection units and paginates every echo without fabricated Cost or quality', () => {
  const original = JSON.stringify(source);
  const html = render(source);
  const content = text(html);
  for (const expected of ['748 / 748', '187', '声骸1', '20%', '100%', '装备 COST 上限', '12']) assert.ok(content.includes(expected), expected);
  assert.ok(html.includes('https://example.com/1.png'));
  for (const bad of ['undefined', 'NaN', 'Infinity', '9999999', '12/', '声骸31']) assert.ok(!content.includes(bad), bad);
  const names = [];
  for (let page = 1; page <= 7; page++) {
    const pageHtml = render(source, page);
    names.push(...[...pageHtml.matchAll(/alt="(声骸\d+)"/g)].map(match => match[1]));
  }
  assert.equal(names.length, 187);
  assert.equal(new Set(names).size, 187);
  assert.ok(text(render(source, 999)).includes('声骸187'));
  assert.equal(JSON.stringify(source), original);
  assert.ok(routeRules.calabash.test('#mc数据坞 2'));
});

test('missing, private and locked data stay explicit; null entries and zero progress are safe', () => {
  const missing = text(render({ phantomList: [null, { phantom: null }, {}] }));
  assert.ok(missing.includes('未返回') && !missing.includes('undefined') && !missing.includes('NaN'));
  const locked = text(render({ ...source, isUnlock: false }));
  assert.ok(locked.includes('尚未解锁') && !locked.includes('声骸1'));
  const privateData = text(render({ showToGuest: false }));
  assert.ok(privateData.includes('未开启'));
  const zero = text(render({ ...source, unlockCount: 0, maxCount: 748, phantomList: [null, { ...entry(1), star: 0 }] }));
  assert.ok(zero.includes('0 / 748') && zero.includes('0 / 4'));
});
