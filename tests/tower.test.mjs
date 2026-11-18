import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/TowerCard.js';
import { routeRules } from '../lib/constants/kuro.js';

const role = id => ({ roleId: id, iconUrl: `https://example.com/role-${id}.png` });
const area = (id, stars, total, floors) => ({ areaId: id, areaName: `测试塔${id}`, star: stars, maxStar: total, floorList: floors });
const floor = (number, stars, roles) => ({ floor: number, star: stars, roleList: roles });
const tower = {
  isUnlock: true,
  difficultyList: [
    { difficulty: 1, difficultyName: '稳定区', towerAreaList: [area(1, 3, 12, [floor(1, 3, [role(1)])])] },
    {
      difficulty: 3,
      difficultyName: '深境区',
      towerAreaList: [area(2, 5, 12, [floor(1, 3, [role(2), role(3), role(4)]), floor(2, 2, [role(5)])]), area(3, 0, 6, [floor(1, 0, [])])]
    }
  ]
};
const render = (tower, zone) =>
  renderToStaticMarkup(React.createElement(Card, { data: { uid: '100000001', base: { name: '<漂泊者>', level: 80, worldLevel: 8 }, tower, zone } }));
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('tower keeps every region, floor and team, with separate per-region totals and compact grids', () => {
  const original = JSON.stringify(tower);
  const html = render(tower);
  const content = text(html);
  assert.ok(html.includes('class="tower-areas"'));
  for (const expected of ['深境区', '测试塔2', '测试塔3', '5 / 18', '0 星', '队伍记录未返回', '&lt;漂泊者&gt;'])
    assert.ok(content.includes(expected), expected);
  for (let id = 2; id <= 5; id++) assert.ok(html.includes(`https://example.com/role-${id}.png`));
  assert.ok(!content.includes('测试塔1'), 'default command shows only 深境区');
  assert.equal((html.match(/class="tower-floor"/g) ?? []).length, 3);
  const stable = render(tower, '稳定区');
  assert.ok(text(stable).includes('3 / 12') && text(stable).includes('测试塔1'));
  assert.ok(stable.includes('https://example.com/role-1.png') && !text(stable).includes('测试塔2'));
  assert.ok(!content.includes('8 / 30'), 'do not combine permanent and cyclic difficulties into a fake seasonal total');
  assert.equal(JSON.stringify(tower), original);
});

test('unknown, locked and malformed tower data never becomes fake completion or crashes the renderer', () => {
  const unknown = text(render({}));
  assert.ok(unknown.includes('暂未返回') && !unknown.includes('尚未解锁'));
  const locked = text(render({ ...tower, isUnlock: false }));
  assert.ok(locked.includes('尚未解锁') && !locked.includes('测试塔1'));
  const malformed = {
    isUnlock: true,
    difficultyList: [
      null,
      {
        difficulty: 9,
        difficultyName: '特殊区域',
        towerAreaList: [null, { areaId: 9, areaName: '未知塔', floorList: [null, floor(1, -1, [null, role(6)]), floor(2, 10000000, [])] }]
      }
    ]
  };
  const html = render(malformed, '特殊区域');
  const content = text(html);
  assert.ok(content.includes('特殊区域') && content.includes('星级未返回'));
  assert.ok(html.includes('https://example.com/role-6.png'));
  for (const invalid of ['undefined', 'NaN', 'Infinity', '0 / 0', '10000000 星']) assert.ok(!content.includes(invalid));
  const missingZone = text(render({ ...tower, difficultyList: [tower.difficultyList[0]] }));
  assert.ok(missingZone.includes('深境区数据暂未返回') && !missingZone.includes('测试塔1'));
});

test('all tower aliases accept optional region names without swallowing other commands', () => {
  for (const prefix of ['#mc', '/鸣潮', '!kuro']) {
    for (const alias of ['深塔', '逆境深塔', 'st']) {
      assert.equal(routeRules.tower.exec(prefix + alias)?.[2], undefined);
      for (const zone of ['超载', '实验', '稳定', '深境']) {
        assert.equal(routeRules.tower.exec(`${prefix}${alias} ${zone}区`)?.[2], zone);
        assert.equal(routeRules.tower.exec(`${prefix}${alias}${zone}`)?.[2], zone);
      }
    }
  }
  assert.equal(routeRules.tower.test('#mc深塔 不存在'), false);
});
