import { WAVES_ECHO_COLORS } from '@src/constants/kuro.js';
import type { RoleDetailResp } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
import HTML from './HTML.js';

interface WikiCardProps {
  data: {
    uid: string;
    detail: RoleDetailResp;
    queryType: string;
  };
}

export default function WikiCard({ data }: WikiCardProps) {
  const { detail, queryType } = data;
  const { role, level, chainList, weaponData, skillList } = detail;
  const attrColor = WAVES_ECHO_COLORS[role.attributeName ?? ''] ?? C.gold;
  const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        {/* 角色头部 */}
        <div
          style={{
            background: `radial-gradient(circle at 0% 50%, ${attrColor}25 0%, transparent 50%),
                         radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                         linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
            borderRadius: '16px',
            padding: '25px 40px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            border: `1px solid ${C.panelBorder}`,
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              fontSize: '20px',
              letterSpacing: '4px',
              color: 'rgba(255,255,255,0.1)',
              fontWeight: 'bold'
            }}
          >
            WIKI
          </div>
          {role.roleIconUrl && (
            <img
              src={role.roleIconUrl}
              style={{
                width: '100px',
                height: '100px',
                display: 'block',
                borderRadius: '50%',
                border: `3px solid ${attrColor}`,
                objectFit: 'cover',
                flexShrink: 0
              }}
            />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
              <div style={{ fontSize: '42px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>{role.roleName}</div>
              <div style={{ fontSize: '22px', color: C.textDim }}>{queryType}</div>
            </div>
            <div style={{ fontSize: '22px', color: C.textSecondary, marginBottom: '6px' }}>
              Lv.{level} · <span style={{ color: C.star5 }}>{'★'.repeat(role.starLevel)}</span> · 共鸣链 {unlockedChains}/{chainList?.length ?? 0}
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span style={{ color: attrColor, fontSize: '20px' }}>◆ {role.attributeName}</span>
              <div
                style={{
                  fontSize: '22px',
                  color: C.gold,
                  background: 'rgba(0,0,0,0.4)',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${C.goldDim}`,
                  fontWeight: 'bold'
                }}
              >
                UID {data.uid}
              </div>
            </div>
          </div>
        </div>

        {/* 技能信息 */}
        {(queryType === '技能' || queryType === '概览') && skillList && skillList.length > 0 && (
          <Section title='技能'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {skillList.map((skill, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    borderBottom: i < skillList.length - 1 ? `1px solid ${C.panelBorder}` : 'none'
                  }}
                >
                  {skill.iconUrl && <img src={skill.iconUrl} style={{ width: '40px', height: '40px', display: 'block', borderRadius: '8px' }} />}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>{skill.skillName}</div>
                    <div style={{ fontSize: '18px', color: C.textDim }}>{skill.type}</div>
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: skill.level >= 10 ? C.gold : '#fff' }}>Lv.{skill.level}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 共鸣链信息 */}
        {(queryType === '共鸣链' || queryType === '概览') && chainList && chainList.length > 0 && (
          <Section title='共鸣链'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {chainList.map((chain, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 0',
                    borderBottom: i < chainList.length - 1 ? `1px solid ${C.panelBorder}` : 'none',
                    opacity: chain.unlocked ? 1 : 0.4
                  }}
                >
                  {chain.iconUrl && (
                    <img
                      src={chain.iconUrl}
                      style={{ width: '40px', height: '40px', display: 'block', borderRadius: '8px', filter: chain.unlocked ? 'none' : 'grayscale(1)' }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>
                      第{chain.order}链 · {chain.name}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '18px',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      background: chain.unlocked ? 'rgba(102,187,106,0.15)' : 'rgba(0,0,0,0.3)',
                      color: chain.unlocked ? '#66bb6a' : C.textDim,
                      fontWeight: 'bold'
                    }}
                  >
                    {chain.unlocked ? '已解锁' : '未解锁'}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 武器信息 */}
        {queryType === '概览' && weaponData && (
          <Section title='装备武器'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {weaponData.weaponIcon && <img src={weaponData.weaponIcon} style={{ width: '64px', height: '64px', display: 'block', borderRadius: '10px' }} />}
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
                  {weaponData.weaponName}
                  <span style={{ color: C.star5, marginLeft: '8px', fontSize: '20px' }}>{'★'.repeat(weaponData.weaponStarLevel)}</span>
                </div>
                <div style={{ fontSize: '20px', color: C.textDim, marginTop: '4px' }}>
                  Lv.{weaponData.level} · 精炼 {weaponData.resonLevel}
                </div>
              </div>
            </div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
