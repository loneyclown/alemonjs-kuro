import type { PeriodDetailResp } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface PeriodCardProps {
  data: {
    uid: string;
    periodType: string;
    periodTitle: string;
    detail: PeriodDetailResp;
  };
}

const RESOURCE_NAMES: Record<number, string> = { 1: '贝币', 2: '星声', 3: '唤声涡纹', 4: '浮金 & 铸潮' };
const RESOURCE_COLORS: Record<number, string> = { 1: '#4fc3f7', 2: C.gold, 3: '#9c6cdb', 4: '#ffb74d' };

export default function PeriodCard({ data }: PeriodCardProps) {
  const { detail, periodTitle } = data;

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
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>资源统计</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>
              {periodTitle} · UID {data.uid}
            </div>
          </div>
          <div style={{ fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>LEDGER</div>
        </div>

        {/* 总计 */}
        {(detail.totalStar !== null || detail.totalCoin !== null) && (
          <div style={{ display: 'flex', gap: '16px' }}>
            {detail.totalStar !== null && (
              <div
                style={{
                  flex: 1,
                  background: C.goldDim,
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  border: `1px solid ${C.goldBorder}`
                }}
              >
                <div style={{ fontSize: '42px', fontWeight: 800, color: C.gold }}>{detail.totalStar}</div>
                <div style={{ fontSize: '16px', color: C.textDim, marginTop: '6px' }}>星声总计</div>
              </div>
            )}
            {detail.totalCoin !== null && (
              <div
                style={{
                  flex: 1,
                  background: 'rgba(79,195,247,0.12)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  border: '1px solid rgba(79,195,247,0.3)'
                }}
              >
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#4fc3f7' }}>{detail.totalCoin}</div>
                <div style={{ fontSize: '16px', color: C.textDim, marginTop: '6px' }}>贝币总计</div>
              </div>
            )}
          </div>
        )}

        {/* 资源明细 */}
        {detail.itemList?.map((item, i) => {
          const name = RESOURCE_NAMES[item.type] ?? `资源${item.type}`;
          const color = RESOURCE_COLORS[item.type] ?? '#ffffff';

          return (
            <Section key={i} title={name} extra={item.total}>
              {item.detail && item.detail.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {item.detail.map((d, j) => (
                    <div
                      key={j}
                      style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        borderLeft: `2px solid ${color}`
                      }}
                    >
                      <span style={{ color: C.textDim }}>{d.type}: </span>
                      <span style={{ color: '#fff', fontWeight: 'bold' }}>{d.num}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ color: C.textDim, fontSize: '14px' }}>暂无明细</div>
              )}
            </Section>
          );
        })}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
