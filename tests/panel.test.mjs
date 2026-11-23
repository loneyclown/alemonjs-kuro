import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/CharDetailCard.js';
import { findMatchingRoles } from '../lib/model/roles.js';

// Sanitized numbers from the current API: final totals and echo contribution are different layers.
const prop = (attributeName, attributeValue, sort) => ({ attributeName, attributeValue, sort });
const detail = {
  role: { roleId: 1512, roleName: '莉莉', starLevel: 5, level: 90, attributeName: '衍射' },
  level: 90,
  roleAttributeList: [prop('共鸣效率', '256.5%', 7000), prop('生命', '35315', 1000), prop('攻击', '1131', 2000)],
  equipPhantomAddPropList: [prop('生命', '18004'), prop('治疗效果加成', '36.4%')],
  equipPhantomAttributeList: [prop('生命', '4560'), prop('生命', '80.5%')],
  weaponData: {
    weapon: { weaponName: '华彩乐段', weaponStarLevel: 4, effectDescription: '<color>回复8点协奏能量</color>' },
    level: 80,
    resonLevel: 1,
    mainPropList: [prop('攻击', '296'), prop('共鸣效率', '47.3%')]
  },
  chainList: Array.from({ length: 6 }, (_, i) => ({ order: i + 1, name: `链${i}`, unlocked: i < 2 })),
  skillList: Array.from({ length: 7 }, (_, i) => ({ skill: { name: `完整技能${i}`, type: `类型${i}` }, level: i + 1 })),
  phantomData: {
    equipPhantomList: [4, 3, 3, 1, 1]
      .map((cost, i) => ({
        cost,
        level: 25,
        phantomProp: { name: `声骸${i}` },
        fetterDetail: { name: '茜染怀想之花' },
        mainProps: [prop('生命', '22.8%'), prop('生命', '2280')],
        subProps: [prop('共鸣效率', '9.2%'), prop('暴击', '9.3%')]
      }))
      .concat({ cost: 4, phantomProp: null })
  }
};

test('exact character names win over earlier partial matches; ambiguous names retain all candidates', () => {
  const roles = [
    { roleName: '鉴心', roleId: 1405, acronym: 'JX' },
    { roleName: '心', roleId: 1311, acronym: 'X' }
  ];
  assert.equal(findMatchingRoles(roles, '心')[0].roleId, 1311);
  assert.equal(findMatchingRoles(roles, 'jx')[0].roleId, 1405);
  assert.equal(findMatchingRoles(roles, ' 鉴心 ')[0].roleId, 1405);
  assert.equal(findMatchingRoles(roles, '鉴')[0].roleId, 1405);
  assert.deepEqual(findMatchingRoles(roles, '不存在'), []);
  assert.deepEqual(findMatchingRoles(roles, ''), []);
  const ambiguous = [{ roleName: '漂泊者·衍射' }, { roleName: '漂泊者·湮灭' }];
  assert.equal(findMatchingRoles(ambiguous, '漂泊者').length, 2);
  assert.equal(findMatchingRoles(ambiguous, '漂泊者·衍射').length, 1);
});
const render = detail =>
  renderToStaticMarkup(
    React.createElement(Card, {
      data: { uid: '100000001', base: { name: '<漂泊者>', level: 80, worldLevel: 8 }, detail }
    })
  );

test('final panel, weapon and echo values stay separate; all equipment and skills are retained', () => {
  const original = JSON.stringify(detail);
  const html = render(detail);
  const core = html.slice(html.indexOf('核心属性'), html.indexOf('武器信息'));
  assert.ok(core.includes('35315') && core.includes('1131') && core.includes('256.5%'));
  assert.ok(core.indexOf('生命') < core.indexOf('共鸣效率'));
  assert.ok(!core.includes('18004') && !core.includes('53319'), 'do not add echo contribution twice');
  assert.ok(html.includes('18004') && html.includes('36.4%') && html.includes('47.3%') && html.includes('296'));
  assert.ok(!html.includes('80.5%'), 'resolved echo contribution takes precedence over raw percentage aggregation');
  assert.ok(html.includes('COST 12') && html.includes('已装备 5 / 5'));
  assert.equal((html.match(/class="character-echo"/g) ?? []).length, 5);
  for (let i = 0; i < 7; i++) assert.ok(html.includes(`完整技能${i}`));
  assert.ok(html.includes('2280') && html.includes('22.8%') && html.includes('9.2%'));
  assert.ok(html.includes('&lt;漂泊者&gt;') && html.includes('回复8点协奏能量'));
  assert.ok(!html.includes('&lt;color&gt;'));
  assert.ok(!html.includes('伤害评估') && !html.includes('评分') && !html.includes('<nav'));
  assert.equal(JSON.stringify(detail), original, 'rendering must not mutate the API response');
});

test('missing final data stays unknown; raw echo values are clearly distinguished', () => {
  const raw = { ...detail, roleAttributeList: undefined, equipPhantomAddPropList: undefined };
  const html = render(raw);
  assert.ok(html.includes('库街区未返回最终面板属性'));
  assert.ok(html.includes('原始声骸词条汇总') && html.includes('4560') && html.includes('80.5%'));
  assert.ok(!html.includes('35315') && !html.includes('256.5%'));
  const empty = render({ role: detail.role, level: 90 });
  for (const hint of ['未返回最终面板属性', '未装备武器', '技能数据未返回', '未装备声骸', 'COST —']) assert.ok(empty.includes(hint));
  assert.ok(!empty.includes('150.0%') && !empty.includes('100.0%'), 'never fabricate baseline stats');
});

test('echo main and sub stats highlight only the API-recommended rows', () => {
  const echo = {
    ...detail.phantomData.equipPhantomList[0],
    mainProps: [{ ...prop('生命', '22.8%'), valid: true }, { ...prop('生命', '2280'), valid: false }],
    subProps: [{ ...prop('共鸣效率', '9.2%'), valid: true }, prop('暴击', '9.3%')]
  };
  const html = render({ ...detail, phantomData: { equipPhantomList: [echo] } });
  assert.ok(html.includes('class="character-echo-prop main recommended"><span>生命</span><strong>22.8%</strong>'));
  assert.ok(html.includes('class="character-echo-prop main"><span>生命</span><strong>2280</strong>'));
  assert.ok(html.includes('class="character-echo-prop recommended"><span>共鸣效率</span><strong>9.2%</strong>'));
  assert.ok(html.includes('class="character-echo-prop"><span>暴击</span><strong>9.3%</strong>'));
});

test('null equipment slots are ignored without losing equipped echoes or miscounting Cost', () => {
  const slots = [null, detail.phantomData.equipPhantomList[0], null, { phantomProp: null }, detail.phantomData.equipPhantomList[3]];
  const html = render({ ...detail, phantomData: { equipPhantomList: slots } });
  assert.ok(html.includes('COST 5') && html.includes('已装备 2 / 5'));
  assert.equal((html.match(/class="character-echo"/g) ?? []).length, 2);
  assert.ok(html.includes('声骸0') && html.includes('声骸3'));
  const empty = render({ ...detail, phantomData: { equipPhantomList: [null, null, null, null, null] } });
  assert.ok(empty.includes('COST 0') && empty.includes('已装备 0 / 5'));
  assert.ok(empty.includes('未装备声骸或装备数据未返回'));
});
