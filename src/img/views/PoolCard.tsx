import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface PoolInfo {
  poolName: string;
  type: 'char' | 'weapon';
  dateRange?: [string, string];
  status: string;
  timeLeft: string;
  isActive: boolean;
  items: string[];
}

interface PoolCardProps {
  data: {
    pools: PoolInfo[];
  };
}

const TYPE_COLORS: Record<string, string> = {
  char: C.gold,
  weapon: '#4fc3f7'
};

const TYPE_LABELS: Record<string, string> = {
  char: '角色',
  weapon: '武器'
};

function formatDateRange(dr?: [string, string]) {
  if (!dr || dr.length < 2) {
    return '';
  }
  const fmt = (s: string) => {
    const d = new Date(s.replace(' ', 'T'));

    return `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return `${fmt(dr[0])} ~ ${fmt(dr[1])}`;
}

export default function PoolCard({ data }: PoolCardProps) {
  const active = data.pools.filter(p => p.isActive);
  const inactive = data.pools.filter(p => !p.isActive);

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
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>当前卡池</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>共 {active.length} 个进行中</div>
          </div>
          <div style={{ fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>POOL</div>
        </div>

        {active.length > 0 && (
          <Section title='进行中' extra={`${active.length}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {active.map((pool, i) => {
                const color = TYPE_COLORS[pool.type] ?? C.gold;

                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                      padding: '16px 20px',
                      borderLeft: `3px solid ${color}`,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{pool.poolName}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ fontSize: '18px', background: `${color}30`, borderRadius: '4px', padding: '3px 10px', color, fontWeight: 'bold' }}>
                          {TYPE_LABELS[pool.type] ?? ''}唤取
                        </div>
                        {pool.timeLeft && <div style={{ fontSize: '18px', color: '#ef5350', fontWeight: 'bold' }}>{pool.timeLeft}</div>}
                      </div>
                    </div>
                    {pool.dateRange && <div style={{ fontSize: '18px', color: C.textDim }}>{formatDateRange(pool.dateRange)}</div>}
                    {pool.items.length > 0 && <div style={{ fontSize: '20px', color: C.textSecondary }}>UP: {pool.items.join(' / ')}</div>}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {inactive.length > 0 && (
          <Section title='已结束/未开始' extra={`${inactive.length}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {inactive.map((pool, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: '10px',
                    padding: '14px 18px',
                    borderLeft: '3px solid #555',
                    opacity: 0.6
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#aaa' }}>{pool.poolName}</div>
                    <div style={{ fontSize: '18px', color: '#888' }}>{pool.status}</div>
                  </div>
                  {pool.dateRange && <div style={{ fontSize: '18px', color: '#666', marginTop: '4px' }}>{formatDateRange(pool.dateRange)}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.pools.length === 0 && (
          <Section title='卡池列表'>
            <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>当前无卡池信息</div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
