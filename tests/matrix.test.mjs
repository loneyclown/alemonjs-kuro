import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import MatrixCard from '../lib/img/views/MatrixCard.js';

const render = (matrix, modeId) => renderToStaticMarkup(React.createElement(MatrixCard, { data: { uid: '100000001', matrix, modeId } }));

test('matrix summary and details use the current season and mode data', () => {
  const matrix = {
    isUnlock: true,
    endTime: 1796112000,
    reward: 0,
    totalReward: 8,
    modeDetails: [
      { modeId: 0, isUnlock: true, hasRecord: false, score: 0 },
      null,
      {
        modeId: 1,
        hasRecord: true,
        score: 3200,
        passBoss: 2,
        bossCount: 4,
        teams: [
          null,
          {
            round: 2,
            score: 1200,
            passBoss: 0,
            bossCount: 2,
            roleIcons: ['https://example.com/role.png'],
            roleList: [{ roleId: 1301, iconUrl: '' }],
            buffs: [null, { buffName: '共鸣增幅' }]
          }
        ]
      }
    ]
  };
  const summary = render(matrix);
  assert.match(summary, /本期奖励已领取 0 \/ 8/);
  assert.match(summary, /赛季结束/);
  assert.match(summary, /本期暂无挑战记录/);
  assert.match(summary, /3,200/);
  assert.match(summary, /width:50%/);
  assert.doesNotMatch(summary, /共鸣增幅/);
  const detail = render(matrix, 1);
  assert.match(detail, /队伍 1 · 第 2 轮/);
  assert.match(detail, /1,200 分/);
  assert.match(detail, /首领击破 0 \/ 2/);
  assert.match(detail, /role\.png/);
  assert.match(detail, /共鸣增幅/);
  assert.doesNotMatch(detail, /稳态协议|undefined|NaN/);
  assert.match(render(matrix, 0), /本期暂无挑战记录/);
  assert.match(render({ isUnlock: false, modeDetails: null }), /终焉矩阵尚未解锁/);
  assert.match(render({ modeDetails: [] }), /库街区暂未返回当前玩法数据/);
});
