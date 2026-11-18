import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/PeriodCard.js';
import { selectMonth } from '../lib/model/period.js';
import { routeRules } from '../lib/constants/kuro.js';

test('ascending and unordered month lists select the latest available month; history selection never silently falls back', () => {
  const months = [
    { title: '9月', index: 202609 },
    { title: '10月', index: 202610 },
    { title: '11月', index: 202611 }
  ];
  const before = JSON.stringify(months);
  assert.equal(selectMonth(months).index, 202611);
  assert.equal(selectMonth([months[2], months[0], months[1]]).index, 202611);
  for (const query of ['202610', '2026-10', '2026年10月', '10月', '10']) assert.equal(selectMonth(months, query).index, 202610);
  for (const query of ['202613', '13月', '0月', '2025-10', '不存在']) assert.equal(selectMonth(months, query), null);
  assert.equal(selectMonth([null, { index: NaN }, { index: 202600 }]), null);
  assert.equal(selectMonth([]), null);
  assert.equal(selectMonth([...months, { title: '10月', index: 202710 }], '10月').index, 202710);
  assert.equal(JSON.stringify(months), before);
  for (const alias of ['星声', '星声统计', '资源统计', 'xx']) {
    assert.equal(routeRules.period.exec(`#mc${alias}`)?.[2], '');
    assert.equal(selectMonth(months, routeRules.period.exec(`#mc${alias} 10月`)?.[2]).index, 202610);
  }
});

const sources = [
  { type: '活动奖励', num: 2560 },
  { type: '玩法奖励', num: 2240 },
  { type: '日常挑战', num: 1740 },
  { type: '海市兑换', num: 0 }
];
const detail = {
  totalCoin: 3652075,
  totalStar: 6540,
  starList: sources,
  coinList: [],
  itemList: [
    { type: 2, total: 6540, detail: sources },
    { type: 1, total: 3652075, detail: [{ type: '日常挑战', num: 1918000 }] },
    { type: 3, total: 10, detail: [{ type: '海市兑换', num: 7 }] },
    { type: 4, total: 14, detail: [{ type: '海市兑换', num: 14 }] }
  ]
};
const render = detail =>
  renderToStaticMarkup(React.createElement(Card, { data: { uid: '100000001', periodType: 'month', periodTitle: '11月', periodIndex: 202611, detail } }));
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('ledger keeps all four resource totals and sources, with correctly scaled percentages and full month identity', () => {
  const original = JSON.stringify(detail);
  const html = render(detail);
  const content = text(html);
  for (const value of ['2026年11月', '6,540', '3,652,075', '唤声涡纹', '活动奖励', '2,560', '39.1%', '海市兑换', '0.0%'])
    assert.ok(content.includes(value), value);
  assert.equal(JSON.stringify(detail), original);
  assert.ok(!content.includes('undefined') && !content.includes('NaN'));
});

test('missing totals never become zero, legacy source lists survive, and malformed rows cannot break the card', () => {
  const legacy = text(render({ totalStar: 100, starList: [{ type: '仅根节点来源', num: 25 }], coinList: [], itemList: [] }));
  assert.ok(legacy.includes('仅根节点来源') && legacy.includes('25.0%'));
  const html = render({
    itemList: [
      {},
      null,
      { type: 2, total: 0, detail: [null, { type: '零收入', num: 0 }, { type: '缺失数量' }] },
      { type: 99, total: 3, detail: [{ type: '新资源来源', num: 3 }] }
    ]
  });
  const content = text(html);
  assert.ok(content.includes('未返回') && content.includes('零收入') && content.includes('新资源来源'));
  for (const invalid of ['undefined', 'NaN', 'Infinity']) assert.ok(!html.includes(invalid));
  assert.ok(!html.includes('width:NaN') && !content.includes('100.0%零收入'));
});
