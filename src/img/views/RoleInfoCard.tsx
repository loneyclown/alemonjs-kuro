import { WAVES_ECHO_COLORS } from '@src/constants/kuro';
import type { AccountBaseInfo, RoleData } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section, UserHeader } from './CardBase';
import HTML from './HTML';

interface RoleInfoCardProps {
  data: {
    uid: string;
    base: AccountBaseInfo;
    roles: RoleData[];
    headUrl?: string;
  };
}

const STAR_COLORS: Record<number, string> = { 5: C.star5, 4: C.star4, 3: '#4a9ed6' };

export default function RoleInfoCard({ data }: RoleInfoCardProps) {
  const { uid, base, roles } = data;
  const sortedRoles = [...roles].sort((a, b) => b.starLevel - a.starLevel || b.level - a.level);

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        <UserHeader name={base.name} uid={uid} level={base.level} avatarUrl={data.headUrl} decoText='ROLE OVERVIEW' />

        <Section title='角色一览' extra={`共 ${roles.length} 个`}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {sortedRoles.map((role, idx) => {
              const attrColor = WAVES_ECHO_COLORS[role.attributeName] || '#6b9fff';
              const sColor = STAR_COLORS[role.starLevel] || '#4a9ed6';
              const chainColor = C.chain[role.chainCount] ?? C.chain[0];

              return (
                <div
                  key={idx}
                  style={{
                    width: 'calc(20% - 8px)',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '12px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderTop: `3px solid ${sColor}`,
                    boxSizing: 'border-box'
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '32px',
                      overflow: 'hidden',
                      marginBottom: '8px',
                      border: `2px solid ${sColor}`
                    }}
                  >
                    {role.roleIconUrl ? (
                      <img src={role.roleIconUrl} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: C.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px',
                          color: C.gold
                        }}
                      >
                        {role.roleName[0]}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', marginBottom: '4px', textAlign: 'center' }}>{role.roleName}</div>
                  <div style={{ fontSize: '12px', color: sColor, marginBottom: '6px' }}>{'★'.repeat(role.starLevel)}</div>
                  <div
                    style={{
                      fontSize: '11px',
                      color: attrColor,
                      background: `${attrColor}20`,
                      borderRadius: '4px',
                      padding: '2px 6px',
                      marginBottom: '6px'
                    }}
                  >
                    {role.attributeName}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' }}>
                    <span style={{ color: C.textSecondary }}>Lv.{role.level}</span>
                    <span
                      style={{
                        color: chainColor,
                        background: `${chainColor}25`,
                        borderRadius: '4px',
                        padding: '1px 6px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}
                    >
                      {role.chainCount}链
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
