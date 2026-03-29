import { WAVES_ECHO_COLORS } from '@src/constants/kuro.js';
import type { RankEntry } from '@src/model/types';
import React from 'react';
import HTML from './HTML.js';

interface RankCardProps {
  data: {
    uid: string;
    playerName: string;
    entries: RankEntry[];
  };
}

const CHAIN_COLORS: Record<number, string> = {
  0: '#666',
  1: '#4fc3f7',
  2: '#66bb6a',
  3: '#9c6cdb',
  4: '#e8a640',
  5: '#ff7043',
  6: '#ef5350'
};

export default function RankCard({ data }: RankCardProps) {
  return (
    <HTML>
      <div
        style={{
          padding: '24px',
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: '#ffffff',
          minWidth: '560px'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '16px',
            color: '#2d2d2d'
          }}
        >
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>练度排行</div>
          <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
            {data.playerName} | UID: {data.uid}
          </div>
        </div>

        {/* 排行列表 */}
        {data.entries.map((entry, i) => {
          const attrColor = WAVES_ECHO_COLORS[entry.attributeName] ?? '#e8d5b0';

          return (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              {/* 排名 */}
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: i < 3 ? '#e8d5b0' : '#888',
                  width: '30px',
                  textAlign: 'center'
                }}
              >
                {i + 1}
              </div>

              {/* 角色头像 */}
              {entry.roleIconUrl && (
                <img
                  src={entry.roleIconUrl}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: `2px solid ${attrColor}`,
                    objectFit: 'cover'
                  }}
                />
              )}

              {/* 角色信息 */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 'bold' }}>{entry.roleName}</span>
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: `${CHAIN_COLORS[entry.chainCount] ?? CHAIN_COLORS[0]}33`,
                      color: CHAIN_COLORS[entry.chainCount] ?? CHAIN_COLORS[0]
                    }}
                  >
                    {entry.chainCount}链
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      padding: '1px 6px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#aaa'
                    }}
                  >
                    Lv.{entry.level}
                  </span>
                </div>
                <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '3px' }}>
                  <span style={{ color: attrColor }}>◆ {entry.attributeName}</span>
                  {entry.weaponName !== '-' && (
                    <span style={{ marginLeft: '10px' }}>
                      {entry.weaponName} Lv.{entry.weaponLevel}
                      {entry.resonLevel > 0 && ` 精${entry.resonLevel}`}
                    </span>
                  )}
                </div>
              </div>

              {/* 分数 */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#e8d5b0' }}>{entry.score.toFixed(0)}</div>
                <div style={{ fontSize: '10px', opacity: 0.5 }}>练度分</div>
              </div>
            </div>
          );
        })}

        {data.entries.length === 0 && <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>暂无排行数据</div>}
      </div>
    </HTML>
  );
}
