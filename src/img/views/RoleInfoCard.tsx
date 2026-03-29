import { WAVES_ECHO_COLORS } from '@src/constants/wuwa';
import type { AccountBaseInfo, RoleData } from '@src/model/types';
import React from 'react';
import HTML from './HTML';

interface RoleInfoCardProps {
  data: {
    uid: string;
    base: AccountBaseInfo;
    roles: RoleData[];
  };
}

/** 星级颜色 */
function starColor(star: number): string {
  if (star >= 5) {
    return '#fbbf24';
  }
  if (star >= 4) {
    return '#a78bfa';
  }

  return '#6b9fff';
}

export default function RoleInfoCard({ data }: RoleInfoCardProps) {
  const { uid, base, roles } = data;

  // 按星级降序、等级降序排列
  const sortedRoles = [...roles].sort((a, b) => b.starLevel - a.starLevel || b.level - a.level);

  return (
    <HTML>
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)',
          minWidth: '480px'
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
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' }}>👤 角色一览</div>
            <div style={{ fontSize: '13px', color: '#a0a4cc', marginTop: '4px' }}>
              {base.name} · Lv.{base.level} · UID {uid}
            </div>
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#a0a4cc',
              textAlign: 'right'
            }}
          >
            共 {roles.length} 个角色
          </div>
        </div>

        {/* 角色列表 */}
        <div
          style={{
            background: '#2a2b45',
            borderRadius: '0 0 12px 12px',
            padding: '16px'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            {sortedRoles.map((role, idx) => {
              const attrColor = WAVES_ECHO_COLORS[role.attributeName] || '#6b9fff';

              return (
                <div
                  key={idx}
                  style={{
                    width: 'calc(33.333% - 7px)',
                    background: '#32334f',
                    borderRadius: '10px',
                    padding: '12px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderTop: `3px solid ${starColor(role.starLevel)}`
                  }}
                >
                  {/* 角色名 */}
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#e0e4ff',
                      marginBottom: '4px',
                      textAlign: 'center'
                    }}
                  >
                    {role.roleName}
                  </div>

                  {/* 星级 */}
                  <div
                    style={{
                      fontSize: '12px',
                      color: starColor(role.starLevel),
                      marginBottom: '6px'
                    }}
                  >
                    {'★'.repeat(role.starLevel)}
                  </div>

                  {/* 属性 */}
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

                  {/* 等级 & 命座 */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ color: '#a0a4cc' }}>Lv.{role.level}</span>
                    <span style={{ color: '#fbbf24' }}>{role.chainCount > 0 ? `${role.chainCount}命` : '0命'}</span>
                  </div>
                </div>
              );
            })}
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
