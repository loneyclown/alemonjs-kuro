import type { AccountBaseInfo, DailyData } from '@src/model/types';
import React from 'react';
import { DarkContainer, Footer, Section, UserHeader } from './CardBase';
import HTML from './HTML';

interface StaminaCardProps {
  data: {
    uid: string;
    daily: DailyData;
    base: AccountBaseInfo;
    headUrl?: string;
  };
}

function formatRefreshTime(timestamp: number): string {
  if (!timestamp || timestamp <= 0) {
    return '已满';
  }
  const diff = timestamp - Math.floor(Date.now() / 1000);

  if (diff <= 0) {
    return '已满';
  }
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);

  return h > 0 ? `${h}小时${m}分钟` : `${m}分钟`;
}

/** 数据行 — 匹配 Python .stat-row */
function StatRow({ label, cur, total, color, subText }: { label: string; cur: number; total: number; color: string; subText?: string }) {
  const pct = Math.min(100, Math.round((cur / total) * 100));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 80%, transparent 100%)',
        padding: '12px 18px',
        borderRadius: '12px',
        borderLeft: '2px solid rgba(255,255,255,0.2)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)'
            }}
          >
            {label}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontSize: '46px',
                fontWeight: 'bold',
                color: '#fff',
                lineHeight: 1,
                textShadow: '0 2px 5px rgba(0,0,0,0.8)'
              }}
            >
              {cur}
            </span>
            <span
              style={{
                fontSize: '30px',
                color: 'rgba(255,255,255,0.8)',
                fontWeight: 500,
                textShadow: '0 1px 3px rgba(0,0,0,0.8)'
              }}
            >
              /{total}
            </span>
          </div>
        </div>
      </div>
      {/* 进度条 */}
      <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            borderRadius: '5px',
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}`
          }}
        />
      </div>
      {subText && <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{subText}</div>}
    </div>
  );
}

export default function StaminaCard({ data }: StaminaCardProps) {
  const { uid, daily, base } = data;
  const energy = daily.energyData;
  const liveness = daily.livenessData;

  const energyCur = energy?.cur ?? 0;
  const energyTotal = energy?.total ?? 240;
  const refreshTime = energy?.refreshTimeStamp ? formatRefreshTime(energy.refreshTimeStamp) : '已满';
  const energyUrgent = energyCur >= energyTotal;

  const livenessCur = liveness?.cur ?? 0;
  const livenessTotal = liveness?.total ?? 100;

  const stats = [
    { label: '角色数', value: base.roleNum },
    { label: '成就数', value: base.achievementCount },
    { label: '声骸数', value: base.phantomNum },
    { label: '宝箱数', value: base.boxNum }
  ];

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        <UserHeader name={base.name} uid={uid} level={base.level} worldLevel={base.worldLevel} avatarUrl={data.headUrl} decoText='DAILY STATUS' />

        <Section title='实时便笺' extra={`恢复时间: ${refreshTime}`}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <StatRow
              label='结晶波片'
              cur={energyCur}
              total={energyTotal}
              color={energyUrgent ? '#ba372a' : '#4fc3f7'}
              subText={energyUrgent ? '⚠ 体力已满！' : undefined}
            />
            <StatRow label='活跃度' cur={livenessCur} total={livenessTotal} color='#66bb6a' />
          </div>
        </Section>

        {/* 底部统计 — 匹配 Python .footer-stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '15px 0',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
            borderRadius: '12px'
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '100px',
                position: 'relative'
              }}
            >
              <div
                style={{
                  fontSize: '42px',
                  fontWeight: 'bold',
                  color: '#fff',
                  lineHeight: 1.1,
                  textShadow: '0 2px 5px rgba(0,0,0,0.8)'
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 'bold',
                  marginTop: '4px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
