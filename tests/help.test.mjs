import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Help, { HELP_DATA, MORE_HELP_DATA } from '../lib/img/views/Help.js';
import { routeRules } from '../lib/constants/kuro.js';
import router from '../lib/response/router.js';
import CharlistCard from '../lib/img/views/CharlistCard.js';
import RoleInfoCard from '../lib/img/views/RoleInfoCard.js';

test('every published help command reaches its advertised active route', () => {
  const routes = router.current[0].children;
  const html = renderToStaticMarkup(React.createElement(Help)) + renderToStaticMarkup(React.createElement(Help, { more: true }));
  const commands = [...HELP_DATA, ...MORE_HELP_DATA].flatMap(category => category.items);
  assert.equal(new Set(commands.map(item => item.command)).size, commands.length);
  for (const item of commands) {
    const selected = routes.find(route => route.regular.test(item.command));
    assert.equal(selected?.regular, routeRules[item.rule], item.command);
    const escaped = item.command.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
    assert.ok(html.includes(escaped), `missing visible command: ${item.command}`);
  }
  assert.ok(!html.includes('NEW'));
  assert.ok(html.includes('9 位特征码'));
});

test('incomplete features are absent from both help and active routes', () => {
  const routes = router.current[0].children;
  const advertised = [...HELP_DATA, ...MORE_HELP_DATA].flatMap(category => category.items.map(item => item.rule));
  for (const [rule, command] of Object.entries({
    challenge: '#mc全息战略',
    slash: '#mc冥海',
    matrix: '#mc矩阵',
    code: '#mc兑换码',
    gacha: '#mc抽卡记录',
    echoList: '#mc声骸列表',
    calendar: '#mc日历',
    develop: '#mc养成',
    poker: '#mc牌局',
    rank: '#mc练度排行',
    wiki: '#mc安可攻略'
  })) {
    assert.ok(!advertised.includes(rule), `still advertised: ${rule}`);
    assert.ok(!routes.some(route => route.regular.test(command)), `still registered: ${command}`);
  }
});

test('compact main help and sign routes match the tested feature scope', () => {
  const routes = router.current[0].children;
  const primary = HELP_DATA.flatMap(category => category.items.map(item => item.command));
  const all = [...primary, ...MORE_HELP_DATA.flatMap(category => category.items.map(item => item.command))];
  assert.ok(primary.length <= 12);
  assert.ok(!all.includes('#mc卡片'), 'card alias must not duplicate the collection entry');
  assert.ok(all.includes('#mc数据坞'), 'deferred data issue retains its entry');
  assert.ok(all.includes('#mc签到'));
  for (const command of ['#mc获取token', '#mc获取ck']) {
    assert.ok(!routes.some(route => route.regular.test(command)), `disabled command is still reachable: ${command}`);
    assert.ok(!all.includes(command));
  }
  for (const command of ['#mc签到', '#mcqd', '!鸣潮签到', '#mc签到日历', '#mc签到记录', '#mcqdjl']) {
    assert.ok(routeRules.sign.test(command));
  }
  assert.ok(routeRules.help.test('#mc更多帮助'));
});

test('collection aliases share one route and card, preserving named character queries', () => {
  const routes = router.current[0].children;
  for (const command of ['#mc练度', '#mc卡片', '#mc查询', '#mckp', '/鸣潮练度统计', '!库洛ld']) {
    const matches = routes.filter(route => route.regular.test(command));
    assert.equal(matches.length, 1, command);
    assert.equal(matches[0].regular, routeRules.charlist);
  }
  assert.ok(routeRules.chardetail.test('#mc卡片 今汐'));
  assert.ok(!routeRules.charlist.test('#mc卡片 今汐'));
  assert.equal(RoleInfoCard, CharlistCard);
  const roles = [
    { roleId: 1, roleName: '四星角色', starLevel: 4, level: 90 },
    { roleId: 2, roleName: '五星角色', starLevel: 5, level: 80, chainUnlockNum: 2 }
  ];
  const data = { uid: '100000001', base: { name: '<漂泊者>', level: 60, worldLevel: 6 }, roles };
  const html = renderToStaticMarkup(React.createElement(CharlistCard, { data }));
  assert.ok(html.includes('共鸣者档案') && html.includes('&lt;漂泊者&gt;'));
  assert.ok(html.indexOf('五星角色') < html.indexOf('四星角色'));
  assert.equal((html.match(/class="roster-role"/g) ?? []).length, 2);
  assert.equal(roles[0].roleId, 1, 'rendering must not reorder input');
  const empty = renderToStaticMarkup(React.createElement(CharlistCard, { data: { ...data, roles: [] } }));
  assert.ok(empty.includes('暂未获取到共鸣者数据'));
});
