import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/ExploreCard.js';
const countries = ['瑝珑', '黑海岸', '黎那汐塔', '罗伊冰原'];
const values = ['67.50', '43.00', '60.33', '46.50'];
const counts = [16, 2, 15, 18];
const regions = countries.map((countryName, i) => ({
  country: { countryName, countryId: i + 1 },
  countryProgress: values[i],
  areaInfoList: Array.from({ length: counts[i] }, (_, j) => ({ areaId: i * 100 + j, areaName: `区域${i}-${j}`, areaProgress: j === 0 ? 100 : j, itemList: [] }))
}));
const render = explore =>
  renderToStaticMarkup(React.createElement(Card, { data: { uid: '100000001', base: { name: '<漂泊者>', level: 80, worldLevel: 8 }, explore } }));
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('every returned region and area survives compact rendering, with explicitly labeled equal-region mean', () => {
  const explore = { open: true, exploreList: regions };
  const original = JSON.stringify(explore);
  const html = render(explore);
  const content = text(html);
  assert.ok(content.includes('地区平均探索度') && content.includes('54.33%') && content.includes('非全地图加权进度'));
  assert.equal((html.match(/class="explore-region"/g) ?? []).length, 4);
  assert.equal((html.match(/class="explore-area(?: [^"]*)?"/g) ?? []).length, 51);
  for (const region of regions) {
    assert.ok(content.includes(region.country.countryName));
    for (const area of region.areaInfoList) assert.ok(content.includes(area.areaName));
  }
  assert.ok(content.includes('4 个地区 · 51 个子区域 · 已满探索 4 个'));
  assert.ok(content.includes('67.5%') && content.includes('&lt;漂泊者&gt;'));
  assert.equal(JSON.stringify(explore), original);
});

test('private, null and invalid exploration data never leaks cached regions or becomes fake zero progress', () => {
  const privateHtml = text(render({ open: false, exploreList: regions }));
  assert.ok(privateHtml.includes('探索数据未公开'));
  assert.ok(!privateHtml.includes('瑝珑') && !privateHtml.includes('54.33%'));
  const empty = render({ open: true, exploreList: [null] });
  assert.ok(empty.includes('暂无探索数据'));
  const partial = render({
    open: true,
    exploreList: [
      null,
      {
        country: { countryName: '新地区', countryId: 99 },
        countryProgress: '',
        areaInfoList: [
          null,
          { areaId: 1, areaName: '待同步区域', areaProgress: null },
          { areaId: 2, areaName: '异常进度', areaProgress: -1 },
          { areaId: 3, areaName: '已探索区域', areaProgress: 100 }
        ]
      }
    ]
  });
  assert.ok(text(partial).includes('新地区') && text(partial).includes('待同步区域'));
  assert.ok(!partial.includes('NaN') && !partial.includes('Infinity') && !partial.includes('width:-1%'));
  assert.equal((partial.match(/class="explore-bar"/g) ?? []).length, 1, 'only known valid progress draws a bar');
  const zero = render({ open: true, exploreList: [{ country: { countryName: '零探索地区' }, countryProgress: '0', areaInfoList: [] }] });
  assert.ok(zero.includes('width:0%') && text(zero).includes('0%'));
});
