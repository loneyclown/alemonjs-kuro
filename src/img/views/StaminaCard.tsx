import type { AccountBaseInfo, DailyData } from '@src/model/types';
import React from 'react';
import HTML from './HTML';

interface StaminaCardProps {
  data: {
    uid: string;
    daily: DailyData;
    base: AccountBaseInfo;
  };
}

/** 格式化剩余时间 */
function formatRefreshTime(timestamp: number): string {
  if (!timestamp || timestamp <= 0) {
    return '已满';
  }
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;

  if (diff <= 0) {
    return '已满';
  }
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);

  if (h > 0) {
    return `${h}小时${m}分钟`;
  }

  return `${m}分钟`;
}

export default function StaminaCard({ data }: StaminaCardProps) {
  const { uid, daily, base } = data;
  const energy = daily.energyData;
  const liveness = daily.livenessData;

  const energyCur = energy?.cur ?? 0;
  const energyTotal = energy?.total ?? 240;
  const energyPct = Math.min(100, Math.round((energyCur / energyTotal) * 100));
  const refreshTime = energy?.refreshTimeStamp ? formatRefreshTime(energy.refreshTimeStamp) : '已满';

  const livenessCur = liveness?.cur ?? 0;
  const livenessTotal = liveness?.total ?? 100;
  const livenessPct = Math.min(100, Math.round((livenessCur / livenessTotal) * 100));

  return (
    <HTML>
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)',
          minWidth: '420px'
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
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' }}>⚡ 实时便笺</div>
            <div style={{ fontSize: '13px', color: '#a0a4cc', marginTop: '4px' }}>
              {base.name} · Lv.{base.level} · UID {uid}
            </div>
          </div>
          <div
            style={{
              fontSize: '11px',
              color: '#8088bb',
              textAlign: 'right'
            }}
          >
            世界等级 {base.worldLevel}
          </div>
        </div>

        {/* 内容 */}
        <div
          style={{
            background: '#2a2b45',
            borderRadius: '0 0 12px 12px',
            padding: '20px'
          }}
        >
          {/* 结晶波片 */}
          <div
            style={{
              background: '#32334f',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '15px', color: '#c8ccee', fontWeight: 'bold' }}>🔋 结晶波片</span>
              <span style={{ fontSize: '22px', color: energyCur >= energyTotal ? '#ff6b6b' : '#6bdfff', fontWeight: 'bold' }}>
                {energyCur} / {energyTotal}
              </span>
            </div>
            {/* 进度条 */}
            <div style={{ background: '#1e1f36', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${energyPct}%`,
                  height: '100%',
                  background: energyCur >= energyTotal ? 'linear-gradient(90deg, #ff6b6b, #ee5a24)' : 'linear-gradient(90deg, #6bdfff, #4facfe)',
                  borderRadius: '6px'
                }}
              />
            </div>
            <div style={{ fontSize: '12px', color: '#8088bb', marginTop: '8px' }}>
              {energyCur >= energyTotal ? '⚠️ 体力已满！' : `⏰ 恢复满需 ${refreshTime}`}
            </div>
          </div>

          {/* 活跃度 */}
          <div
            style={{
              background: '#32334f',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '15px', color: '#c8ccee', fontWeight: 'bold' }}>🎯 活跃度</span>
              <span style={{ fontSize: '22px', color: '#a78bfa', fontWeight: 'bold' }}>
                {livenessCur} / {livenessTotal}
              </span>
            </div>
            <div style={{ background: '#1e1f36', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${livenessPct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #a78bfa, #7c3aed)',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>

          {/* 基本数据 */}
          <div
            style={{
              background: '#32334f',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            {[
              { label: '角色数', value: base.roleNum, icon: '👤' },
              { label: '成就数', value: base.achievementCount, icon: '🏆' },
              { label: '声骸数', value: base.phantomNum, icon: '💎' },
              { label: '宝箱数', value: base.boxNum, icon: '📦' }
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  width: 'calc(50% - 6px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: '12px', color: '#8088bb' }}>{item.label}</div>
                  <div style={{ fontSize: '18px', color: '#e0e4ff', fontWeight: 'bold' }}>{item.value}</div>
                </div>
              </div>
            ))}
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
