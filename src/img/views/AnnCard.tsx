import type { AnnItem } from '@src/model/types';
import dayjs from 'dayjs';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML';

interface AnnCardProps {
  data: {
    activities: AnnItem[];
    infos: AnnItem[];
    notices: AnnItem[];
  };
}

const TYPE_COLORS: Record<string, string> = {
  activity: '#F97316',
  info: '#3B82F6',
  notice: '#10B981'
};

function formatDate(ts: number): string {
  if (!ts) {
    return '未知';
  }

  return dayjs(ts).format('MM-DD');
}

function getCoverUrl(item: AnnItem): string {
  if (item.coverUrl) {
    return item.coverUrl;
  }
  if (item.coverImages && item.coverImages.length > 0) {
    return item.coverImages[0].url;
  }

  return '';
}

const TYPE_LABELS: Record<string, string> = {
  activity: '活动',
  info: '资讯',
  notice: '公告'
};

function AnnSection({ title, items, type }: { title: string; items: AnnItem[]; type: string }) {
  if (items.length === 0) {
    return null;
  }
  const color = TYPE_COLORS[type] ?? C.gold;

  return (
    <Section title={title} extra={`${items.length}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map((item, i) => {
          const cover = getCoverUrl(item);

          return (
            <div
              key={i}
              style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
                padding: '14px 16px',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
                borderLeft: `3px solid ${color}`,
                border: `1px solid ${C.panelBorder}`,
                borderLeftWidth: '3px',
                borderLeftColor: color
              }}
            >
              {cover && (
                <div style={{ width: '140px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={cover} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', lineHeight: 1.3 }}>{item.postTitle}</div>
                <div style={{ fontSize: '18px', color: C.textDim }}>{formatDate(item.publishTime)}</div>
              </div>
              <div
                style={{
                  fontSize: '18px',
                  background: `${color}25`,
                  borderRadius: '4px',
                  padding: '3px 10px',
                  color,
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap'
                }}
              >
                {TYPE_LABELS[type] ?? type}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default function AnnCard({ data }: AnnCardProps) {
  const total = data.activities.length + data.infos.length + data.notices.length;

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
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>游戏公告</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>鸣潮 · 最新资讯 · 共 {total} 条</div>
          </div>
          <div style={{ fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>NEWS</div>
        </div>

        <AnnSection title='当前活动' items={data.activities} type='activity' />
        <AnnSection title='游戏资讯' items={data.infos} type='info' />
        <AnnSection title='游戏公告' items={data.notices} type='notice' />

        {total === 0 && (
          <Section title='公告'>
            <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>暂无公告信息</div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
