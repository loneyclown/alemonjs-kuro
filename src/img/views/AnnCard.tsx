import type { AnnItem } from '@src/model/types';
import React from 'react';
import { C, LightContainer, LightHeader } from './CardBase';
import HTML from './HTML';

interface AnnCardProps {
  data: {
    activities: AnnItem[];
    notices: AnnItem[];
  };
}

function AnnSection({ title, items }: { title: string; items: AnnItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <div
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#2c3e50',
          marginBottom: '12px',
          paddingLeft: '12px',
          borderLeft: `3px solid ${C.gold}`
        }}
      >
        {title}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '14px',
            marginBottom: '10px',
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}
        >
          {item.coverUrl && (
            <div style={{ width: '120px', height: '68px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
              <img src={item.coverUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#2c3e50', lineHeight: 1.3, marginBottom: '6px' }}>{item.title}</div>
            <div style={{ fontSize: '13px', color: '#95a5a6' }}>{item.publishTime}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AnnCard({ data }: AnnCardProps) {
  return (
    <HTML style={{ width: '750px' }}>
      <LightContainer width={750}>
        <LightHeader title='游戏公告' subtitle='鸣潮 · 最新资讯' />
        <div style={{ width: '100%', padding: '24px', boxSizing: 'border-box' }}>
          <AnnSection title='当前活动' items={data.activities} />
          <AnnSection title='游戏公告' items={data.notices} />
        </div>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#bdc3c7', padding: '0 0 16px' }}>Powered by AlemonJS · 鸣潮助手</div>
      </LightContainer>
    </HTML>
  );
}
