import type { MineInfo } from '@src/model/types';
import React from 'react';
import { LightContainer, LightHeader } from './CardBase';
import HTML from './HTML';

interface CoinCardProps {
  data: {
    uid: string;
    mine: MineInfo;
  };
}

export default function CoinCard({ data }: CoinCardProps) {
  const { uid, mine } = data;

  return (
    <HTML style={{ width: '420px' }}>
      <LightContainer width={420}>
        <LightHeader title='库洛币' subtitle={`${mine.userName} · UID ${uid}`} />

        <div style={{ width: '100%', padding: '24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* 头像 */}
          {mine.headUrl && (
            <div
              style={{
                width: '90px',
                height: '90px',
                borderRadius: '45px',
                overflow: 'hidden',
                border: '3px solid rgba(212,177,99,0.8)',
                marginBottom: '14px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
              }}
            >
              <img src={mine.headUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
            </div>
          )}

          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '4px' }}>{mine.userName}</div>
          {mine.signature && <div style={{ fontSize: '20px', color: '#7f8c8d', marginBottom: '20px' }}>{mine.signature}</div>}

          {/* 库洛币 */}
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '24px 40px',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid rgba(0,0,0,0.06)',
              width: '80%',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ fontSize: '20px', color: '#95a5a6', marginBottom: '8px' }}>库洛币余额</div>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#d4b163', lineHeight: 1, textShadow: '0 2px 8px rgba(212,177,99,0.3)' }}>
              {mine.goldNum}
            </div>
          </div>

          <div style={{ fontSize: '20px', color: '#95a5a6', marginTop: '16px' }}>库街区 ID: {mine.userId}</div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '18px', color: '#bdc3c7', padding: '0 0 16px' }}>Powered by AlemonJS · 鸣潮助手</div>
      </LightContainer>
    </HTML>
  );
}
