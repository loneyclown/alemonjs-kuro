import type { AccountBaseInfo, TowerResp } from '@src/model/types';
import React from 'react';
import HTML from './HTML';

interface TowerCardProps {
  data: {
    uid: string;
    base: AccountBaseInfo;
    tower: TowerResp;
  };
}

export default function TowerCard({ data }: TowerCardProps) {
  const { uid, base, tower } = data;

  if (!tower.isUnlock) {
    return (
      <HTML>
        <div
          style={{
            padding: '24px',
            background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)',
            minWidth: '420px'
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
              borderRadius: '12px',
              padding: '16px 20px'
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' }}>🗼 逆境深塔</div>
            <div style={{ fontSize: '13px', color: '#a0a4cc', marginTop: '4px' }}>
              {base.name} · UID {uid}
            </div>
            <div style={{ fontSize: '14px', color: '#fbbf24', marginTop: '12px' }}>⚠️ 逆境深塔尚未解锁</div>
          </div>
        </div>
      </HTML>
    );
  }

  const difficulties = tower.difficultyList || [];

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
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' }}>🗼 逆境深塔</div>
            <div style={{ fontSize: '13px', color: '#a0a4cc', marginTop: '4px' }}>
              {base.name} · Lv.{base.level} · UID {uid}
            </div>
          </div>
        </div>

        {/* 难度列表 */}
        <div
          style={{
            background: '#2a2b45',
            borderRadius: '0 0 12px 12px',
            padding: '16px'
          }}
        >
          {difficulties.map((diff, di) => (
            <div key={di} style={{ marginBottom: di < difficulties.length - 1 ? '14px' : '0' }}>
              {/* 难度标题 */}
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#a78bfa',
                  marginBottom: '10px',
                  borderLeft: '3px solid #a78bfa',
                  paddingLeft: '10px'
                }}
              >
                {diff.difficultyName}
              </div>

              {/* 区域 */}
              {diff.towerAreaList.map((area, ai) => (
                <div
                  key={ai}
                  style={{
                    background: '#32334f',
                    borderRadius: '10px',
                    padding: '12px',
                    marginBottom: ai < diff.towerAreaList.length - 1 ? '8px' : '0'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px'
                    }}
                  >
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#e0e4ff' }}>{area.areaName}</span>
                    <span style={{ fontSize: '13px', color: '#fbbf24' }}>
                      ⭐ {area.star}/{area.maxStar}
                    </span>
                  </div>

                  {/* 楼层 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {area.floorList.map((floor, fi) => (
                      <div
                        key={fi}
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
                        <span style={{ color: '#8088bb' }}>{floor.floorName}</span>
                        <span style={{ color: '#fbbf24' }}>
                          {'★'.repeat(floor.star)}
                          {'☆'.repeat(floor.maxStar - floor.star)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
