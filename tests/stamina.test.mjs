import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/StaminaCard.js';

const now = 1794907928 * 1000;
const widget = (name, cur, total, more = {}) => ({ name, cur, total, status: 0, ...more });
const daily = {
  energyData: widget('结晶波片', 199, 240, { refreshTimeStamp: now / 1000 + 3661 }),
  storeEnergyData: widget('结晶单质', 368, 480, { refreshTimeStamp: 0 }),
  livenessData: widget('活跃度', 0, 100),
  battlePassData: [null, widget('电台等级', 19, 0), widget('本周经验', 1800, 12000)],
  weeklyData: widget('战歌重奏', 3, 3),
  weeklyRougeData: widget('千道门扉的异想', 0, 6000),
  weeklyFrameData: widget('周度游历', 0, 6000),
  towerData: widget('逆境深塔·深境区', 36, 36),
  slashTowerData: widget('冥歌海墟·禁忌海域', 0, 0, { status: 1, value: '奖励进度：暂无数据' }),
  newTowerData: widget('终焉矩阵', 0, 0, { status: 1 }),
  activityData: { enabled: true, title: '当前活动示例', endTime: now / 1000 + 86400 },
  serverTime: now / 1000,
  shopDataList: []
};
const render = daily =>
  renderToStaticMarkup(
    React.createElement(Card, {
      data: { uid: '100000001', daily, base: { name: '<漂泊者>', level: 80, worldLevel: 8 } }
    })
  );
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('daily card retains all returned progress, distinguishes level and unknown values, and calculates real percentages', t => {
  t.mock.method(Date, 'now', () => now);
  const original = JSON.stringify(daily);
  const html = render(daily);
  const content = text(html);
  assert.ok(content.includes('Lv.19') && !content.includes('19/0'));
  assert.ok(content.includes('距回满 1小时2分钟'));
  assert.ok(content.includes('暂无恢复倒计时'));
  assert.ok(content.includes('1800/12000') && html.includes('width:15%'));
  assert.ok(content.includes('199/240') && content.includes('368/480') && content.includes('0/100'));
  for (const key of ['weeklyData', 'weeklyRougeData', 'weeklyFrameData', 'towerData', 'slashTowerData', 'newTowerData']) {
    assert.ok(content.includes(daily[key].name));
  }
  assert.ok(content.includes('36/36') && content.includes('奖励进度：暂无数据'));
  assert.ok(!content.includes('0/0') && !html.includes('NaN') && !html.includes('Infinity'));
  assert.ok(content.includes('当前活动示例') && content.includes('数据时间 2026/11/17 17:32'));
  assert.ok(content.includes('&lt;漂泊者&gt;'));
  assert.equal(JSON.stringify(daily), original);
});

test('missing data never produces fabricated defaults; full, expired and oversized progress are handled safely', t => {
  t.mock.method(Date, 'now', () => now);
  const empty = { energyData: null, livenessData: null, battlePassData: [null], shopDataList: [] };
  const missing = text(render(empty));
  assert.ok(missing.includes('未返回数据') && missing.includes('电台数据暂未返回'));
  for (const fake of ['0/240', '0/480', '0/100', '9900', '战歌重奏']) assert.ok(!missing.includes(fake));
  const expired = text(render({ ...empty, energyData: widget('结晶波片', 100, 240, { refreshTimeStamp: now / 1000 - 60 }) }));
  assert.ok(expired.includes('预计已恢复，请刷新确认') && !expired.includes('已达上限'));
  const full = text(render({ ...empty, energyData: widget('结晶波片', 240, 240) }));
  assert.ok(full.includes('已达上限'));
  const oversized = render({ ...empty, battlePassData: [widget('本周经验', 13000, 12000)], activityData: { enabled: false, title: '不应显示' } });
  assert.ok(oversized.includes('width:100%') && !oversized.includes('108.333') && !oversized.includes('不应显示'));
  const unknown = render({ ...empty, battlePassData: [widget('本周经验', 0, 0, { status: 1 })] });
  assert.ok(!unknown.includes('class="daily-bar"'));
});
