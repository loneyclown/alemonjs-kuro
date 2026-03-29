import type { AccountBaseInfo, ExploreResp } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section, UserHeader } from './CardBase';
import HTML from './HTML';

interface ExploreCardProps {
  data: {
    uid: string;
    base: AccountBaseInfo;
    explore: ExploreResp;
    headUrl?: string;
  };
}

function progressColor(pct: number): string {
  if (pct >= 100) {
    return '#66bb6a';
  }
  if (pct >= 80) {
    return '#4fc3f7';
  }
  if (pct >= 50) {
    return C.gold;
  }

  return '#ff7043';
}

export default function ExploreCard({ data }: ExploreCardProps) {
  const { uid, base, explore } = data;
  const regions = explore.exploreList ?? [];

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        <UserHeader name={base.name} uid={uid} level={base.level} worldLevel={base.worldLevel} avatarUrl={data.headUrl} decoText='EXPLORATION DATA' />

        {regions.map((region, ri) => {
          const pct = Number(region.countryProgress) || 0;
          const areas = region.areaInfoList ?? [];
          const completed = areas.filter(a => a.areaProgress >= 100);
          const incomplete = areas.filter(a => a.areaProgress < 100);

          return (
            <Section key={ri} title={region.country.countryName}>
              {/* 国家总进度 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                {region.country.homePageIcon && <img src={region.country.homePageIcon} style={{ width: '40px', height: '40px', borderRadius: '8px' }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{region.country.countryName}</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <span style={{ fontSize: '28px', fontWeight: 'bold', color: progressColor(pct), lineHeight: 1 }}>{pct}</span>
                      <span style={{ fontSize: '22px', color: C.textDim }}>%</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${Math.min(100, pct)}%`,
                        height: '100%',
                        borderRadius: '4px',
                        backgroundColor: progressColor(pct),
                        boxShadow: `0 0 10px ${progressColor(pct)}`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* 已完成的子区域 — 紧凑展示 */}
              {completed.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: incomplete.length > 0 ? '12px' : '0' }}>
                  {completed.map((area, ai) => (
                    <div
                      key={ai}
                      style={{
                        background: 'rgba(102,187,106,0.12)',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span style={{ color: '#66bb6a' }}>✓</span>
                      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{area.areaName}</span>
                      <span style={{ color: '#66bb6a', fontWeight: 'bold' }}>100%</span>
                    </div>
                  ))}
                </div>
              )}

              {/* 未完成的子区域 — 详细展示 */}
              {incomplete.map((area, ai) => {
                const unfinished = area.itemList.filter(i => i.progress < 100).slice(0, 5);

                return (
                  <div
                    key={ai}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      marginBottom: ai < incomplete.length - 1 ? '10px' : '0',
                      borderLeft: `2px solid ${progressColor(area.areaProgress)}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>{area.areaName}</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                        <span style={{ fontSize: '22px', fontWeight: 'bold', color: progressColor(area.areaProgress), lineHeight: 1 }}>
                          {area.areaProgress}
                        </span>
                        <span style={{ fontSize: '20px', color: C.textDim }}>%</span>
                      </div>
                    </div>
                    {/* 进度条 */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '3px',
                        overflow: 'hidden',
                        marginBottom: unfinished.length > 0 ? '10px' : '0'
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(100, area.areaProgress)}%`,
                          height: '100%',
                          borderRadius: '3px',
                          backgroundColor: progressColor(area.areaProgress)
                        }}
                      />
                    </div>
                    {/* 未完成的子项 */}
                    {unfinished.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {unfinished.map((item, ii) => (
                          <div
                            key={ii}
                            style={{
                              background: 'rgba(0,0,0,0.25)',
                              borderRadius: '8px',
                              padding: '6px 12px',
                              fontSize: '18px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {item.icon && <img src={item.icon} style={{ width: '18px', height: '18px' }} />}
                            <span style={{ color: C.textDim }}>{item.name}</span>
                            <span style={{ color: progressColor(item.progress), fontWeight: 'bold' }}>{item.progress}%</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </Section>
          );
        })}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
