import type { SignInitResp } from '@src/model/types';
import React from 'react';
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
    <HTML>
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)',
          minWidth: '460px'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
            borderRadius: '12px 12px 0 0',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' }}>📅 签到日历</div>
            <div style={{ fontSize: '13px', color: '#a0a4cc', marginTop: '4px' }}>
              UID {uid} · 本月已签 {sign.sigInNum} 天
            </div>
          </div>
          <div
            style={{
              fontSize: '13px',
              color: sign.hasSignIn ? '#22c55e' : '#fbbf24',
              fontWeight: 'bold'
            }}
          >
            {sign.hasSignIn ? '✅ 今日已签' : '⏳ 今日未签'}
          </div>
        </div>

        {/* 签到日历 */}
        <div
          style={{
            background: '#2a2b45',
            borderRadius: '0 0 12px 12px',
            padding: '16px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}
          >
            {items.map((item, idx) => {
              const isClaimed = item.sigInStatus === 1;

              return (
                <div
                  key={idx}
                  style={{
                    width: 'calc(14.285% - 7px)',
                    background: isClaimed ? '#2d3a4f' : '#32334f',
                    borderRadius: '8px',
                    padding: '8px 4px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    border: isClaimed ? '1px solid #3a5d3a' : '1px solid transparent',
                    opacity: isClaimed ? 0.6 : 1,
                    minWidth: '52px'
                  }}
                >
                  {/* 天数 */}
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#8088bb',
                      marginBottom: '4px'
                    }}
                  >
                    第{idx + 1}天
                  </div>

                  {/* 奖励图标 */}
                  {item.goodsUrl ? (
                    <img
                      src={item.goodsUrl}
                      style={{
                        width: '32px',
                        height: '32px',
                        marginBottom: '4px',
                        filter: isClaimed ? 'grayscale(0.5)' : 'none'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        marginBottom: '4px',
                        background: '#3a3b55',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}
                    >
                      🎁
                    </div>
                  )}

                  {/* 奖励名 + 数量 */}
                  <div style={{ fontSize: '10px', color: '#a0a4cc', lineHeight: '1.2' }}>{item.goodsName}</div>
                  <div style={{ fontSize: '11px', color: '#e0e4ff', fontWeight: 'bold' }}>×{item.goodsNum}</div>

                  {/* 已领取标记 */}
                  {isClaimed && <div style={{ fontSize: '10px', color: '#22c55e', marginTop: '2px' }}>✓</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部 */}
        <div
          style={{
            marginTop: '8px',
            textAlign: 'center',
            fontSize: '11px',
            color: '#5a5d8c'
          }}
        >
          Powered by alemonjs · 鸣潮助手
        </div>
      </div>
    </HTML>
  );
}
