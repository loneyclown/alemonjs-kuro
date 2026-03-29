import { WAVES_ECHO_COLORS } from '@src/constants/kuro.js';
import type { RoleDetailResp } from '@src/model/types';
import React from 'react';
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
  const attrColor = WAVES_ECHO_COLORS[role.attributeName] ?? '#e8d5b0';

  const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;

  return (
    <HTML>
      <div
        style={{
          padding: '24px',
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: '#ffffff',
          minWidth: '480px'
        }}
      >
        {/* 头部 — 角色信息 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '16px',
            color: '#2d2d2d',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          {role.roleIconUrl && (
            <img
              src={role.roleIconUrl}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                border: `3px solid ${attrColor}`,
                objectFit: 'cover'
              }}
            />
          )}
          <div>
            <div style={{ fontSize: '22px', fontWeight: 'bold' }}>
              {role.roleName}
              <span style={{ fontSize: '13px', fontWeight: 'normal', marginLeft: '8px', opacity: 0.7 }}>{queryType}</span>
            </div>
            <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
              Lv.{level} | {'★'.repeat(role.starLevel)} | 共鸣链 {unlockedChains}/{chainList?.length ?? 0}
            </div>
            <div style={{ fontSize: '12px', marginTop: '2px' }}>
              <span style={{ color: attrColor }}>◆ {role.attributeName}</span>
              <span style={{ marginLeft: '10px', opacity: 0.7 }}>UID: {data.uid}</span>
            </div>
          </div>
        </div>

        {/* 技能信息 */}
        {(queryType === '技能' || queryType === '概览') && skillList && skillList.length > 0 && (
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: '12px'
            }}
          >
            <div style={{ fontSize: '14px', color: '#e8d5b0', marginBottom: '10px' }}>技能</div>
            {skillList.map((skill, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '6px 0',
                  borderBottom: i < skillList.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                }}
              >
                {skill.iconUrl && <img src={skill.iconUrl} style={{ width: '36px', height: '36px', borderRadius: '6px' }} />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{skill.skillName}</div>
                  <div style={{ fontSize: '11px', opacity: 0.5 }}>{skill.type}</div>
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: skill.level >= 10 ? '#e8d5b0' : '#fff'
                  }}
                >
                  Lv.{skill.level}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 共鸣链信息 */}
        {(queryType === '共鸣链' || queryType === '概览') && chainList && chainList.length > 0 && (
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: '12px'
            }}
          >
            <div style={{ fontSize: '14px', color: '#e8d5b0', marginBottom: '10px' }}>共鸣链</div>
            {chainList.map((chain, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 0',
                  borderBottom: i < chainList.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  opacity: chain.unlocked ? 1 : 0.4
                }}
              >
                {chain.iconUrl && (
                  <img
                    src={chain.iconUrl}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      filter: chain.unlocked ? 'none' : 'grayscale(1)'
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>
                    第{chain.order}链 · {chain.name}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    background: chain.unlocked ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.1)',
                    color: chain.unlocked ? '#66bb6a' : '#888'
                  }}
                >
                  {chain.unlocked ? '已解锁' : '未解锁'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 武器信息 */}
        {queryType === '概览' && weaponData && (
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: '12px'
            }}
          >
            <div style={{ fontSize: '14px', color: '#e8d5b0', marginBottom: '10px' }}>装备武器</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {weaponData.weaponIcon && <img src={weaponData.weaponIcon} style={{ width: '56px', height: '56px', borderRadius: '8px' }} />}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {weaponData.weaponName}
                  <span style={{ color: '#e8a640', marginLeft: '6px', fontSize: '12px' }}>{'★'.repeat(weaponData.weaponStarLevel)}</span>
                </div>
                <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '2px' }}>
                  Lv.{weaponData.level} | 精炼 {weaponData.resonLevel}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </HTML>
  );
}
