import type { CultivateCostItem } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface DevelopCardProps {
  data: {
    uid: string;
    roles: { roleId: number; roleName: string }[];
    costs: CultivateCostItem[];
  };
}

const QUALITY_COLORS: Record<number, string> = { 5: C.star5, 4: C.star4, 3: '#4a9ed6', 2: '#66bb6a', 1: '#9e9e9e' };

export default function DevelopCard({ data }: DevelopCardProps) {
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
            border: `1px solid ${C.panelBorder}`
          }}
        >
          <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>角色培养计算</div>
          <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>
            UID {data.uid} · 共 {data.roles.length} 个角色
          </div>
        </div>

        <Section title='计算角色'>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {data.roles.map((r, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '14px',
                  color: '#fff',
                  border: `1px solid ${C.panelBorder}`
                }}
              >
                {r.roleName}
              </div>
            ))}
          </div>
        </Section>

        <Section title='总计所需材料' extra={`${data.costs.length} 种`}>
          {data.costs.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {data.costs.map((cost, i) => {
                const qColor = QUALITY_COLORS[cost.quality] ?? '#9e9e9e';

                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${qColor}40`,
                      borderRadius: '10px',
                      padding: '12px',
                      width: '150px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {cost.iconUrl && <img src={cost.iconUrl} style={{ width: '52px', height: '52px', display: 'block', objectFit: 'contain' }} />}
                    <div style={{ fontSize: '13px', textAlign: 'center', color: qColor, lineHeight: 1.3 }}>{cost.name}</div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>×{cost.num.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>所有角色已满级</div>
          )}
        </Section>

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
