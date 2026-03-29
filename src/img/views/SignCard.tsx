import type { SignInitResp } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML';

interface SignCardProps {
  data: {
    uid: string;
    sign: SignInitResp;
  };
}

export default function SignCard({ data }: SignCardProps) {
  const { uid, sign } = data;
  const items = sign.sigInDTOList || [];

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        {/* 签到头部 */}
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
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>签到日历</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>
              UID {uid} · 本月已签 <span style={{ color: C.gold, fontWeight: 'bold', fontSize: '22px' }}>{sign.sigInNum}</span> 天
            </div>
          </div>
          <div
            style={{
              fontSize: '18px',
              color: sign.hasSignIn ? '#66bb6a' : C.gold,
              fontWeight: 'bold',
              background: sign.hasSignIn ? 'rgba(102,187,106,0.15)' : C.goldDim,
              padding: '8px 20px',
              borderRadius: '24px',
              border: `1px solid ${sign.hasSignIn ? 'rgba(102,187,106,0.4)' : C.goldBorder}`
            }}
          >
            {sign.hasSignIn ? '今日已签' : '今日未签'}
          </div>
        </div>

        <Section title='签到奖励'>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {items.map((item, idx) => {
              const isClaimed = item.sigInStatus === 1;

              return (
                <div
                  key={idx}
                  style={{
                    width: 'calc(14.285% - 9px)',
                    background: isClaimed ? 'rgba(102,187,106,0.1)' : 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '10px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: isClaimed ? '1px solid rgba(102,187,106,0.3)' : `1px solid ${C.panelBorder}`,
                    opacity: isClaimed ? 0.6 : 1,
                    minWidth: '60px',
                    boxSizing: 'border-box'
                  }}
                >
                  <div style={{ fontSize: '13px', color: C.textDim, marginBottom: '6px' }}>第{idx + 1}天</div>
                  {item.goodsUrl ? (
                    <img
                      src={item.goodsUrl}
                      style={{
                        width: '40px',
                        height: '40px',
                        display: 'block',
                        marginBottom: '6px',
                        filter: isClaimed ? 'grayscale(0.5)' : 'none'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        marginBottom: '6px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px'
                      }}
                    >
                      ?
                    </div>
                  )}
                  <div style={{ fontSize: '12px', color: C.textSecondary, lineHeight: 1.2 }}>{item.goodsName}</div>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 'bold' }}>×{item.goodsNum}</div>
                  {isClaimed && <div style={{ fontSize: '12px', color: '#66bb6a', marginTop: '2px' }}>✓</div>}
                </div>
              );
            })}
          </div>
        </Section>

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
