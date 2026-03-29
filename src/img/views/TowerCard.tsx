import type { AccountBaseInfo, TowerResp } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section, UserHeader } from './CardBase';
import HTML from './HTML';

interface TowerCardProps {
  data: {
    uid: string;
    base: AccountBaseInfo;
    tower: TowerResp;
    headUrl?: string;
  };
}

export default function TowerCard({ data }: TowerCardProps) {
  const { uid, base, tower } = data;

  if (!tower.isUnlock) {
    return (
      <HTML style={{ width: '1000px' }}>
        <DarkContainer>
          <UserHeader name={base.name} uid={uid} avatarUrl={data.headUrl} decoText='TOWER' />
          <Section title='逆境深塔'>
            <div style={{ fontSize: '18px', color: C.gold, textAlign: 'center', padding: '20px' }}>逆境深塔尚未解锁</div>
          </Section>
        </DarkContainer>
      </HTML>
    );
  }

  const difficulties = tower.difficultyList ?? [];

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        <UserHeader name={base.name} uid={uid} level={base.level} worldLevel={base.worldLevel} avatarUrl={data.headUrl} decoText='ABYSS TOWER' />

        {difficulties.map((diff, di) => (
          <Section key={di} title={diff.difficultyName}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(diff.towerAreaList ?? []).map((area, ai) => (
                <div
                  key={ai}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    borderLeft: `2px solid ${area.star >= area.maxStar ? C.gold : 'rgba(255,255,255,0.15)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{area.areaName}</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '28px', fontWeight: 'bold', color: C.gold, lineHeight: 1 }}>{area.star}</span>
                      <span style={{ fontSize: '18px', color: C.textDim }}>/{area.maxStar}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(area.floorList ?? []).map((floor, fi) => (
                      <div
                        key={fi}
                        style={{
                          background: 'rgba(0,0,0,0.25)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '15px', color: C.textSecondary }}>第{floor.floor}层</span>
                          <span style={{ fontSize: '15px', color: C.gold }}>{'★'.repeat(floor.star)}</span>
                        </div>
                        {floor.roleList && floor.roleList.length > 0 && (
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {floor.roleList.map((role, ri) => (
                              <div
                                key={ri}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '20px',
                                  overflow: 'hidden',
                                  border: `2px solid ${C.gold}`
                                }}
                              >
                                {role.iconUrl ? (
                                  <img src={role.iconUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                                ) : (
                                  <div
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      background: C.bg,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '14px',
                                      color: C.gold
                                    }}
                                  >
                                    ?
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        ))}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
