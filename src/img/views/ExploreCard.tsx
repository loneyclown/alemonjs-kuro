import type { AccountBaseInfo, ExploreResp } from '@src/model/types';
import React from 'react';
import HTML from './HTML';

interface ExploreCardProps {
  data: {
    uid: string;
    base: AccountBaseInfo;
    explore: ExploreResp;
  };
}

/** 进度条颜色 */
function progressColor(pct: number): string {
  if (pct >= 100) {
    return '#22c55e';
  }
  if (pct >= 80) {
    return '#6bdfff';
  }
  if (pct >= 50) {
    return '#a78bfa';
  }

  return '#fbbf24';
}

export default function ExploreCard({ data }: ExploreCardProps) {
  const { uid, base, explore } = data;
  const areas = explore.exploreList || [];

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
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' }}>🗺️ 探索度</div>
            <div style={{ fontSize: '13px', color: '#a0a4cc', marginTop: '4px' }}>
              {base.name} · Lv.{base.level} · UID {uid}
            </div>
          </div>
        </div>

        {/* 区域列表 */}
        <div
          style={{
            background: '#2a2b45',
            borderRadius: '0 0 12px 12px',
            padding: '16px'
          }}
        >
          {areas.map((area, idx) => (
            <div
              key={idx}
              style={{
                background: '#32334f',
                borderRadius: '10px',
                padding: '14px 16px',
                marginBottom: idx < areas.length - 1 ? '10px' : '0'
              }}
            >
              {/* 区域头 */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#e0e4ff' }}>{area.areaName}</span>
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: progressColor(area.areaProgress)
                  }}
                >
                  {area.areaProgress}%
                </span>
              </div>

              {/* 总进度条 */}
              <div style={{ background: '#1e1f36', borderRadius: '5px', height: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                <div
                  style={{
                    width: `${Math.min(100, area.areaProgress)}%`,
                    height: '100%',
                    background: `linear-gradient(90deg, ${progressColor(area.areaProgress)}, ${progressColor(area.areaProgress)}88)`,
                    borderRadius: '5px'
                  }}
                />
              </div>

              {/* 子项 */}
              {area.itemList && area.itemList.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px'
                  }}
                >
                  {area.itemList.map((item, ii) => (
                    <div
                      key={ii}
                      style={{
                        background: '#282940',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span style={{ color: '#8088bb' }}>{item.name}</span>
                      <span style={{ color: '#e0e4ff', fontWeight: 'bold' }}>
                        {item.progress}/{item.total}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
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
