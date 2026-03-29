import dayjs from 'dayjs';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface CalendarEvent {
  title: string;
  type: 'gacha' | 'tower' | 'activity';
  dateRange?: [string, string];
  status: string;
  timeLeft: string;
  isActive: boolean;
  iconUrl?: string;
}

interface CalendarCardProps {
  data: {
    events: CalendarEvent[];
  };
}

const TYPE_COLORS: Record<string, string> = {
  gacha: C.gold,
  activity: '#4fc3f7',
  tower: '#9c6cdb'
};

const TYPE_LABELS: Record<string, string> = {
  gacha: '唤取',
  activity: '活动',
  tower: '挑战'
};

function formatDateRange(dr?: [string, string]) {
  if (!dr || dr.length < 2) {
    return '';
  }
  const fmt = (s: string) => dayjs(s).format('M.DD HH:mm');

  return `${fmt(dr[0])} ~ ${fmt(dr[1])}`;
}

function getProgress(dr?: [string, string]) {
  if (!dr || dr.length < 2) {
    return 0;
  }
  const start = dayjs(dr[0]).valueOf();
  const end = dayjs(dr[1]).valueOf();
  const now = Date.now();

  if (now >= end) {
    return 1;
  }
  if (now <= start) {
    return 0;
  }

  return (now - start) / (end - start);
}

export default function CalendarCard({ data }: CalendarCardProps) {
  const activeEvents = data.events.filter(e => e.isActive);
  const inactiveEvents = data.events.filter(e => !e.isActive);

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
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>活动日历</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>
              进行中 {activeEvents.length} · 共 {data.events.length} 项
            </div>
          </div>
          <div style={{ fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>CALENDAR</div>
        </div>

        {activeEvents.length > 0 && (
          <Section title='进行中' extra={`${activeEvents.length}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeEvents.map((evt, i) => {
                const color = TYPE_COLORS[evt.type] ?? '#9e9e9e';
                const progress = getProgress(evt.dateRange);
                const progressColor = evt.timeLeft.includes('剩余') && parseInt(evt.timeLeft) <= 3 ? '#ef5350' : color;

                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${C.panelBorder}`,
                      borderLeft: `3px solid ${color}`,
                      borderRadius: '8px',
                      padding: '14px 18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', flex: 1 }}>{evt.title}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <div style={{ fontSize: '18px', background: `${color}30`, borderRadius: '4px', padding: '3px 10px', color, fontWeight: 'bold' }}>
                          {TYPE_LABELS[evt.type] ?? '其他'}
                        </div>
                      </div>
                    </div>
                    {evt.dateRange && <div style={{ fontSize: '18px', color: C.textDim }}>{formatDateRange(evt.dateRange)}</div>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {/* 进度条 */}
                      <div style={{ flex: 1, height: '6px', background: 'rgba(100,100,100,0.5)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.round(progress * 100)}%`, height: '100%', background: progressColor, borderRadius: '3px' }} />
                      </div>
                      {evt.timeLeft && <div style={{ fontSize: '18px', color: progressColor, fontWeight: 'bold', whiteSpace: 'nowrap' }}>{evt.timeLeft}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {inactiveEvents.length > 0 && (
          <Section title='未开始 / 已结束' extra={`${inactiveEvents.length}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {inactiveEvents.map((evt, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: `1px solid ${C.panelBorder}`,
                    borderLeft: '3px solid #555',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    opacity: 0.6
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#aaa' }}>{evt.title}</div>
                    <div style={{ fontSize: '18px', color: '#888' }}>{evt.status}</div>
                  </div>
                  {evt.dateRange && <div style={{ fontSize: '18px', color: '#666', marginTop: '4px' }}>{formatDateRange(evt.dateRange)}</div>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.events.length === 0 && (
          <Section title='暂无活动'>
            <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>暂无活动信息</div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
