import type { GachaPoolStatEx } from '@src/model/types';
import { LUCK_TAGS } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface GachaCardProps {
  data: {
    uid: string;
    pools: GachaPoolStatEx[];
  };
}

const STAR_COLORS: Record<number, string> = { 5: C.star5, 4: C.star4, 3: '#4a9ed6' };
const LUCK_COLORS = ['#ef5350', '#ff8a80', '#9e9e9e', '#66bb6a', C.gold];

export default function GachaCard({ data }: GachaCardProps) {
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
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>抽卡记录</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>UID {data.uid}</div>
          </div>
          <div style={{ fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>GACHA LOG</div>
        </div>

        {data.pools.map((pool, i) => (
          <Section key={i} title={pool.poolName} extra={`${pool.total} 抽`}>
            {/* 运气 + 统计 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <div
                style={{
                  fontSize: '20px',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  background: `${LUCK_COLORS[pool.luckLevel] ?? LUCK_COLORS[2]}30`,
                  color: LUCK_COLORS[pool.luckLevel] ?? LUCK_COLORS[2],
                  fontWeight: 'bold',
                  border: `1px solid ${LUCK_COLORS[pool.luckLevel] ?? LUCK_COLORS[2]}50`
                }}
              >
                {LUCK_TAGS[pool.luckLevel] ?? '平稳保底'}
              </div>
              <div style={{ fontSize: '20px', color: C.textDim }}>
                距上次5★: <span style={{ color: C.gold, fontWeight: 'bold' }}>{pool.pity}</span> 抽
              </div>
              {pool.avg !== null && (
                <div style={{ fontSize: '20px', color: C.textDim }}>
                  平均: <span style={{ color: '#fff', fontWeight: 'bold' }}>{pool.avg}</span> 抽/5★
                </div>
              )}
              {pool.avgUp !== null && (
                <div style={{ fontSize: '20px', color: C.textDim }}>
                  UP均: <span style={{ color: '#fff', fontWeight: 'bold' }}>{pool.avgUp}</span> 抽
                </div>
              )}
            </div>

            {/* 5星列表 */}
            {pool.star5Items.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {pool.star5Items.map((s, j) => (
                  <div
                    key={j}
                    style={{
                      background: s.isUp ? C.goldDim : 'rgba(0,0,0,0.3)',
                      border: `1px solid ${s.isUp ? C.goldBorder : C.panelBorder}`,
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{ color: C.gold, fontWeight: 'bold' }}>★</span>
                    <span style={{ color: '#fff' }}>{s.name}</span>
                    {s.isUp && <span style={{ color: C.gold, fontSize: '18px', fontWeight: 'bold' }}>UP</span>}
                    <span style={{ color: s.count <= 70 ? '#4fc3f7' : '#ef5350', fontSize: '18px' }}>({s.count})</span>
                  </div>
                ))}
              </div>
            )}

            {/* 统计条 */}
            <div style={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
              <span style={{ color: STAR_COLORS[5] }}>★5: {pool.star5Items.length}</span>
              <span style={{ color: STAR_COLORS[4] }}>★4: {pool.star4Count}</span>
              <span style={{ color: STAR_COLORS[3] }}>★3: {pool.star3Count}</span>
            </div>
          </Section>
        ))}

        {data.pools.length === 0 && (
          <Section title='暂无数据'>
            <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>暂无抽卡记录</div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
