import type { RoleDetailResp } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface CharDetailCardProps {
  data: {
    uid: string;
    detail: RoleDetailResp;
  };
}

const ATTR_COLORS: Record<string, string> = {
  冰: '#3598db',
  火: '#ba372a',
  雷: '#b96ad9',
  光: '#e6bf2e',
  暗: '#d97a24',
  风: '#169179',
  导: '#48c4d8'
};

export default function CharDetailCard({ data }: CharDetailCardProps) {
  const { detail } = data;
  const { role, level, chainList, weaponData, phantomData, skillList } = detail;
  const weapon = weaponData?.weapon;
  const attrColor = ATTR_COLORS[role.attributeName ?? ''] ?? '#d4b163';
  const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;
  const equippedPhantoms = phantomData?.equipPhantomList?.filter(ep => ep.phantomProp) ?? [];

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        {/* ═══ 角色头部：立绘 + 信息 ═══ */}
        <div
          style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: `1px solid ${C.panelBorder}`,
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
            minHeight: '280px',
            display: 'flex'
          }}
        >
          {/* 背景渐变 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at 80% 30%, ${attrColor}30 0%, transparent 50%),
                           linear-gradient(135deg, rgba(20,22,28,0.95) 0%, rgba(10,12,16,0.98) 100%)`,
              zIndex: 0
            }}
          />

          {/* 角色立绘 */}
          {role.rolePicUrl && (
            <div
              style={{
                position: 'absolute',
                right: '-20px',
                top: '-40px',
                width: '380px',
                height: '380px',
                zIndex: 1,
                opacity: 0.85
              }}
            >
              <img src={role.rolePicUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
            </div>
          )}

          {/* 信息区域 */}
          <div style={{ position: 'relative', zIndex: 2, padding: '30px 40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* 名字行 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
              {role.roleIconUrl && (
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    flexShrink: 0,
                    borderRadius: '50%',
                    border: `3px solid ${attrColor}`,
                    overflow: 'hidden',
                    boxShadow: `0 0 15px ${attrColor}40`
                  }}
                >
                  <img src={role.roleIconUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
              )}
              <div>
                <div style={{ fontSize: '42px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>{role.roleName}</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ color: attrColor, fontSize: '22px', fontWeight: 'bold' }}>◆ {role.attributeName}</span>
                  <span style={{ color: C.gold, fontSize: '20px' }}>{'★'.repeat(role.starLevel)}</span>
                </div>
              </div>
            </div>

            {/* 数据行 */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '8px' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '10px 20px', border: `1px solid ${C.panelBorder}` }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>Lv.{level}</div>
                <div style={{ fontSize: '18px', color: C.textDim, marginTop: '2px' }}>角色等级</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '10px 20px', border: `1px solid ${C.panelBorder}` }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: attrColor, lineHeight: 1.1 }}>
                  {unlockedChains}/{chainList?.length ?? 0}
                </div>
                <div style={{ fontSize: '18px', color: C.textDim, marginTop: '2px' }}>共鸣链</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '10px 20px', border: `1px solid ${C.panelBorder}` }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: C.gold, lineHeight: 1.1 }}>UID {data.uid}</div>
                <div style={{ fontSize: '18px', color: C.textDim, marginTop: '2px' }}>特征码</div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ 武器 ═══ */}
        {weapon && (
          <Section title='武器'>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '12px',
                padding: '16px 20px',
                border: `1px solid ${C.panelBorder}`
              }}
            >
              {weapon.weaponIcon && (
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    flexShrink: 0,
                    borderRadius: '12px',
                    border: `2px solid ${C.goldBorder}`,
                    overflow: 'hidden',
                    background: 'rgba(0,0,0,0.4)'
                  }}
                >
                  <img src={weapon.weaponIcon} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>
                  {weapon.weaponName}
                  <span style={{ color: C.gold, marginLeft: '10px', fontSize: '20px' }}>{'★'.repeat(weapon.weaponStarLevel)}</span>
                </div>
                <div style={{ fontSize: '20px', color: C.textSecondary, marginTop: '6px' }}>
                  Lv.{weaponData.level} · 谐振 R{weaponData.resonLevel}
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* ═══ 共鸣链 ═══ */}
        {chainList && chainList.length > 0 && (
          <Section title={`共鸣链 (${unlockedChains}/${chainList.length})`}>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
              {chainList.map((chain, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    flex: 1
                  }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      border: `2px solid ${chain.unlocked ? attrColor : 'rgba(255,255,255,0.15)'}`,
                      background: chain.unlocked ? `${attrColor}20` : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: chain.unlocked ? 1 : 0.4,
                      boxShadow: chain.unlocked ? `0 0 15px ${attrColor}40` : 'none',
                      overflow: 'hidden'
                    }}
                  >
                    {chain.iconUrl ? (
                      <img
                        src={chain.iconUrl}
                        style={{
                          width: '56px',
                          height: '56px',
                          display: 'block',
                          objectFit: 'contain',
                          filter: chain.unlocked ? 'none' : 'grayscale(100%) brightness(0.5)'
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: '24px', fontWeight: 'bold', color: chain.unlocked ? attrColor : C.textDim }}>{chain.order}</span>
                    )}
                  </div>
                  <div style={{ fontSize: '18px', color: chain.unlocked ? '#fff' : C.textDim, textAlign: 'center', lineHeight: 1.2 }}>
                    {chain.name || `第${chain.order}链`}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ═══ 技能 ═══ */}
        {skillList && skillList.length > 0 && (
          <Section title='技能'>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {skillList.map((entry, i) => {
                const sk = entry.skill;

                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      minWidth: '180px',
                      border: `1px solid ${C.panelBorder}`
                    }}
                  >
                    {sk?.iconUrl ? (
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          flexShrink: 0,
                          borderRadius: '10px',
                          overflow: 'hidden',
                          background: 'rgba(0,0,0,0.4)',
                          border: `1px solid ${C.panelBorder}`
                        }}
                      >
                        <img src={sk.iconUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '48px',
                          height: '48px',
                          flexShrink: 0,
                          borderRadius: '10px',
                          background: `${attrColor}20`,
                          border: `1px solid ${attrColor}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: attrColor
                        }}
                      >
                        {(sk?.name || '?')[0]}
                      </div>
                    )}
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>{sk?.name || '-'}</div>
                      <div style={{ fontSize: '18px', color: C.gold, fontWeight: 'bold' }}>Lv.{entry.level}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* ═══ 声骸 ═══ */}
        {equippedPhantoms.length > 0 && (
          <Section title='声骸' extra={`Cost: ${phantomData.cost}`}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {equippedPhantoms.map((ep, i) => {
                const p = ep.phantomProp;

                if (!p) { return null; }
                const fetterName = ep.fetterDetail?.name;

                return (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '12px',
                      padding: '14px',
                      width: '180px',
                      boxSizing: 'border-box',
                      border: `1px solid ${C.panelBorder}`
                    }}
                  >
                    {/* 声骸头部：图标+名称 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      {p.iconUrl ? (
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            flexShrink: 0,
                            borderRadius: '10px',
                            overflow: 'hidden',
                            background: 'rgba(0,0,0,0.4)',
                            border: `1px solid ${C.panelBorder}`
                          }}
                        >
                          <img src={p.iconUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '48px',
                            height: '48px',
                            flexShrink: 0,
                            borderRadius: '10px',
                            background: `${C.goldDim}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '22px',
                            fontWeight: 'bold',
                            color: C.gold
                          }}
                        >
                          {(p.name || '?')[0]}
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            lineHeight: 1.2,
                            color: '#fff',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {p.name || '-'}
                        </div>
                        <div style={{ fontSize: '18px', color: C.textDim }}>
                          Lv.{ep.level} · C{ep.cost}
                        </div>
                      </div>
                    </div>
                    {/* 套装效果 */}
                    {fetterName && (
                      <div
                        style={{ fontSize: '18px', color: attrColor, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {fetterName}
                      </div>
                    )}
                    {/* 主词条 */}
                    {ep.mainProps && ep.mainProps.length > 0 && (
                      <div style={{ marginTop: '4px' }}>
                        {ep.mainProps.map((mp, j) => (
                          <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', color: C.gold, padding: '1px 0' }}>
                            <span>{mp.attributeName}</span>
                            <span style={{ fontWeight: 'bold' }}>{mp.attributeValue}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {/* 副词条 */}
                    {ep.subProps && ep.subProps.length > 0 && (
                      <div style={{ marginTop: '4px', borderTop: `1px solid ${C.panelBorder}`, paddingTop: '4px' }}>
                        {ep.subProps.map((sp, j) => (
                          <div key={j} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', color: C.textSecondary, padding: '1px 0' }}>
                            <span>{sp.attributeName}</span>
                            <span>{sp.attributeValue}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
