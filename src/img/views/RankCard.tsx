import { WAVES_ECHO_COLORS } from '@src/constants/kuro.js';
import type { RankEntry } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface RankCardProps {
  data: {
    uid: string;
    playerName: string;
    entries: RankEntry[];
  };
}

export default function RankCard({ data }: RankCardProps) {
  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        {/* 头部 */}
        <div
          style={{
            background: `radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                         linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
            borderRadius: '16px',
            padding: '25px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `1px solid ${C.panelBorder}`
          }}
        >
          <div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>练度排行</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>
              {data.playerName} · UID {data.uid}
            </div>
          </div>
          <div style={{ fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>RANK</div>
        </div>

        <Section title='排行'>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.entries.map((entry, i) => {
              const attrColor = WAVES_ECHO_COLORS[entry.attributeName] ?? C.gold;
              const chainColor = C.chain[entry.chainUnlockNum] ?? C.chain[0];

              return (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderLeft: i < 3 ? `3px solid ${C.gold}` : `3px solid ${C.panelBorder}`
                  }}
                >
                  {/* 排名 */}
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: i < 3 ? C.gold : C.textDim, width: '36px', textAlign: 'center' }}>{i + 1}</div>

                  {/* 角色头像 */}
                  {entry.roleIconUrl && (
                    <img
                      src={entry.roleIconUrl}
                      style={{
                        width: '52px',
                        height: '52px',
                        display: 'block',
                        borderRadius: '50%',
                        border: `2px solid ${attrColor}`,
                        objectFit: 'cover'
                      }}
                    />
                  )}

                  {/* 角色信息 */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{entry.roleName}</span>
                      <span
                        style={{
                          fontSize: '18px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: `${chainColor}25`,
                          color: chainColor,
                          fontWeight: 'bold'
                        }}
                      >
                        {entry.chainUnlockNum}链
                      </span>
                      <span style={{ fontSize: '18px', color: C.textDim }}>Lv.{entry.level}</span>
                    </div>
                    <div style={{ fontSize: '18px', color: C.textDim, marginTop: '4px' }}>
                      <span style={{ color: attrColor }}>◆ {entry.attributeName}</span>
                      {entry.weaponName !== '-' && (
                        <span style={{ marginLeft: '12px' }}>
                          {entry.weaponName} Lv.{entry.weaponLevel}
                          {entry.resonLevel > 0 && ` 精${entry.resonLevel}`}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 分数 */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: C.gold }}>{entry.score.toFixed(0)}</div>
                    <div style={{ fontSize: '18px', color: C.textDim }}>练度分</div>
                  </div>
                </div>
              );
            })}
          </div>

          {data.entries.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>暂无排行数据</div>}
        </Section>

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
