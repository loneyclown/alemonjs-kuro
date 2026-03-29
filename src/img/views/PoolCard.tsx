import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface PoolItem {
  title: string;
  publishTime: string;
}

interface PoolCardProps {
  data: {
    pools: PoolItem[];
  };
}

export default function PoolCard({ data }: PoolCardProps) {
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
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>共 {data.pools.length} 个进行中</div>
          </div>
          <div style={{ fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>POOL</div>
        </div>

        <Section title='卡池列表'>
          {data.pools.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.pools.map((pool, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderLeft: `3px solid ${C.gold}`
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{pool.title}</div>
                    <div style={{ fontSize: '13px', color: C.textDim, marginTop: '6px' }}>{pool.publishTime}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>当前无进行中的卡池</div>
          )}
        </Section>

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
