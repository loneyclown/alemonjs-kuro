import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PoolCard from '../lib/img/views/PoolCard.js';
import { readPoolRounds } from '../lib/model/pools.js';

test('same-period character and weapon pools share one countdown in China time', () => {
  const dateRange = ['2026-11-12 11:00', '2026-12-03 09:59'];
  const tab = { name: '角色池', active: false, countDown: { dateRange }, imgs: [{ img: 'https://example.com/cover.png', title: '' }] };
  const feed = {
    sideModules: [
      {
        title: '角色活动唤取',
        content: { tabs: [tab, { name: '未知日期' }, { name: '非法日期', countDown: { dateRange: ['2026-11-31 11:00', dateRange[1]] } }] }
      },
      { title: '武器活动唤取', content: { tabs: [{ ...tab, name: '武器池' }] } }
    ]
  };
  const start = Date.parse('2026-11-12T03:00:00Z');
  assert.equal(readPoolRounds(feed, start - 1)[0].status, '未开始');
  const rounds = readPoolRounds(JSON.stringify(feed), start);
  assert.deepEqual(
    rounds.map(round => round.status),
    ['进行中', '时间未公布']
  );
  assert.equal(rounds[0].pools.length, 2);
  assert.equal(rounds[1].pools.length, 2);
  assert.ok(readPoolRounds(feed, Date.parse('2026-12-03T01:59:00Z')).some(round => round.status === '已结束'));
  const html = renderToStaticMarkup(React.createElement(PoolCard, { data: { rounds } }));
  assert.equal((html.match(/class="pool-countdown"/g) ?? []).length, 1);
  assert.match(html, /2 个活动唤取进行中/);
  assert.match(html, /角色唤取/);
  assert.match(html, /武器唤取/);
  assert.match(html, /https:\/\/example.com\/cover.png/);
  assert.throws(() => readPoolRounds('{broken'));
});
