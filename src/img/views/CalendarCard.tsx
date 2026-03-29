import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface CalendarEvent {
  title: string;
  startTime: string;
  endTime: string;
  type: string;
  isActive: boolean;
}

interface CalendarCardProps {
  data: {
    events: CalendarEvent[];
  };
}

const TYPE_COLORS: Record<string, string> = {
  gacha: C.gold,
  activity: '#4fc3f7',
  tower: '#9c6cdb',
  other: '#9e9e9e'
};

const TYPE_LABELS: Record<string, string> = {
  gacha: '调谐',
  activity: '活动',
  tower: '挑战',
  other: '其他'
};

export default function CalendarCard({ data }: CalendarCardProps) {
  const activeEvents = data.events.filter(e => e.isActive);
  const upcomingEvents = data.events.filter(e => !e.isActive);

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
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>鸣潮活动与卡池信息</div>
          </div>
          <div style={{ fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' }}>CALENDAR</div>
        </div>

        {activeEvents.length > 0 && (
          <Section title='进行中' extra={`${activeEvents.length}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeEvents.map((evt, i) => {
                const color = TYPE_COLORS[evt.type] ?? TYPE_COLORS.other;

                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${C.panelBorder}`,
                      borderLeft: `3px solid ${color}`,
                      borderRadius: '8px',
                      padding: '14px 18px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{evt.title}</div>
                      <div
                        style={{
                          fontSize: '12px',
                          background: `${color}30`,
                          borderRadius: '4px',
                          padding: '3px 10px',
                          color,
                          fontWeight: 'bold'
                        }}
                      >
                        {TYPE_LABELS[evt.type] ?? '其他'}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: C.textDim, marginTop: '6px' }}>
                      {evt.startTime} ~ {evt.endTime}
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {upcomingEvents.length > 0 && (
          <Section title='即将开始' extra={`${upcomingEvents.length}`}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {upcomingEvents.map((evt, i) => {
                const color = TYPE_COLORS[evt.type] ?? TYPE_COLORS.other;

                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: `1px solid ${C.panelBorder}`,
                      borderLeft: `3px solid ${color}`,
                      borderRadius: '8px',
                      padding: '14px 18px',
                      opacity: 0.7
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>{evt.title}</div>
                      <div style={{ fontSize: '12px', background: `${color}30`, borderRadius: '4px', padding: '3px 10px', color, fontWeight: 'bold' }}>
                        {TYPE_LABELS[evt.type] ?? '其他'}
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: C.textDim, marginTop: '6px' }}>
                      {evt.startTime} ~ {evt.endTime}
                    </div>
                  </div>
                );
              })}
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
