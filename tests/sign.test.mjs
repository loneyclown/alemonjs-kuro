import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Card from '../lib/img/views/SignCard.js';

const item = (serialNum, isGain) => ({ serialNum, isGain, goodsName: `奖励${serialNum + 1}`, goodsNum: 2, goodsUrl: `https://example.com/${serialNum}.png` });
const sign = {
  eventStartTimes: '2026-11-01 00:00:00',
  eventEndTimes: '2026-11-30 23:59:59',
  nowServerTimes: '2026-11-18 17:00:00',
  isSigIn: false,
  sigInNum: 1,
  omissionNnm: 16,
  signInGoodsConfigs: [item(0, true), null, item(2, false)],
  disposableGoodsList: [item(99, false)],
  signLoopGoodsList: [item(199, false)]
};
const render = sign => renderToStaticMarkup(React.createElement(Card, { data: { uid: '100000001', sign } }));
const text = html => html.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, '');

test('sign calendar preserves reward order numbers, claimed flags, real period and bonus rewards without using calendar dates', () => {
  const original = JSON.stringify(sign);
  const html = render(sign);
  const content = text(html);
  for (const value of ['2026年11月', '今日未签', '16', '累计第 3 天', '奖励3', '奖励100', '奖励200', '已领取', '2026-11-30'])
    assert.ok(content.includes(value), value);
  assert.ok(!content.includes('累计第 2 天'), 'null entries must not renumber rewards');
  assert.ok(html.includes('https://example.com/2.png'));
  assert.equal(JSON.stringify(sign), original);
});

test('next reward is highlighted from cumulative count; unknown state never becomes unsigned or zero days', () => {
  const html = render({ ...sign, sigInNum: 1, signInGoodsConfigs: [item(0, true), item(1, false)] });
  assert.ok(html.includes('sign-reward next') && text(html).includes('下一档'));
  const unknown = text(render({ signInGoodsConfigs: [null] }));
  assert.ok(unknown.includes('状态未返回') && unknown.includes('暂无奖励数据'));
  assert.ok(!unknown.includes('今日未签'));
  const legacy = text(render({ hasSignIn: true, sigInNum: 0, sigInDTOList: [{ goodsName: '旧版奖励', goodsNum: 0, sigInStatus: 1 }] }));
  assert.ok(legacy.includes('今日已签') && legacy.includes('旧版奖励') && legacy.includes('×0'));
});
