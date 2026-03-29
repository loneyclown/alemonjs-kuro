import type { CalabashResp } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface CalabashCardProps {
  data: {
    uid: string;
    calabash: CalabashResp;
  };
}

export default function CalabashCard({ data }: CalabashCardProps) {
  const { calabash } = data;

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
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>数据坞</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>UID {data.uid}</div>
          </div>
          <div style={{ fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>CALABASH</div>
        </div>

        <Section title='基本信息'>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {[
              { value: calabash.level, label: '数据坞等级', color: C.gold },
              { value: calabash.baseCatch, label: '基础吸收率', color: '#4fc3f7' },
              { value: calabash.strengthenCatch, label: '强化吸收率', color: '#66bb6a' },
              { value: `${calabash.cost}/${calabash.maxCost}`, label: 'Cost', color: '#ffb74d' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: C.textDim, marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Section>

        {calabash.phantomList && calabash.phantomList.length > 0 && (
          <Section title='已收集声骸' extra={`${calabash.phantomList.length}`}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {calabash.phantomList.map((p, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    padding: '10px',
                    width: '95px',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  {p.iconUrl && <img src={p.iconUrl} style={{ width: '44px', height: '44px', display: 'block', borderRadius: '6px', margin: '0 auto 6px' }} />}
                  <div style={{ fontSize: '12px', lineHeight: 1.3, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '11px', color: C.gold, marginTop: '2px' }}>C{p.cost}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
