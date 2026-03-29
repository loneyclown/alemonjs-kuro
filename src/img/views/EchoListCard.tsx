import { WAVES_ECHO_COLORS } from '@src/constants/kuro.js';
import type { EchoRankItem } from '@src/model/types';
import React from 'react';
import HTML from './HTML.js';

interface EchoListCardProps {
  data: {
    uid: string;
    playerName: string;
    echoes: EchoRankItem[];
    page: number;
    totalPages: number;
  };
}

export default function EchoListCard({ data }: EchoListCardProps) {
  return (
    <HTML>
      <div
        style={{
          padding: '24px',
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          color: '#ffffff',
          minWidth: '600px'
        }}
      >
        {/* 头部 */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
            borderRadius: '12px',
            padding: '16px 20px',
            marginBottom: '16px',
            color: '#2d2d2d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>声骸列表</div>
            <div style={{ fontSize: '13px', opacity: 0.7, marginTop: '4px' }}>
              {data.playerName} | UID: {data.uid}
            </div>
          </div>
          {data.totalPages > 1 && (
            <div style={{ fontSize: '13px', opacity: 0.7 }}>
              第 {data.page}/{data.totalPages} 页
            </div>
          )}
        </div>

        {/* 声骸网格 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {data.echoes.map((echo, i) => {
            const fetterColor = WAVES_ECHO_COLORS[echo.fetterName] ?? '#e8d5b0';

            return (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  padding: '12px',
                  width: '270px',
                  borderLeft: `3px solid ${fetterColor}`
                }}
              >
                {/* 声骸头部 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  {echo.phantomIconUrl && <img src={echo.phantomIconUrl} style={{ width: '40px', height: '40px', borderRadius: '6px' }} />}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', lineHeight: '1.3' }}>{echo.phantomName}</div>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '3px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          background: 'rgba(0,0,0,0.4)',
                          color: '#fff'
                        }}
                      >
                        Lv.{echo.level}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          background: `${fetterColor}33`,
                          color: fetterColor
                        }}
                      >
                        {echo.fetterName}
                      </span>
                      <span style={{ fontSize: '10px', color: '#e8d5b0' }}>{'◆'.repeat(echo.cost)}</span>
                    </div>
                  </div>
                  {/* 角色头像 */}
                  {echo.roleIconUrl && (
                    <img
                      src={echo.roleIconUrl}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    />
                  )}
                </div>

                {/* 主词条 */}
                {echo.mainProps.map((prop, j) => (
                  <div
                    key={`m${j}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      padding: '2px 0',
                      color: '#e8d5b0'
                    }}
                  >
                    <span>{prop.attributeName}</span>
                    <span style={{ fontWeight: 'bold' }}>{prop.attributeValue}</span>
                  </div>
                ))}

                {/* 分割线 */}
                {echo.subProps.length > 0 && <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />}

                {/* 副词条 */}
                {echo.subProps.map((prop, j) => (
                  <div
                    key={`s${j}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      padding: '2px 0',
                      opacity: 0.8
                    }}
                  >
                    <span>{prop.attributeName}</span>
                    <span>{prop.attributeValue}</span>
                  </div>
                ))}

                {/* 角色名 */}
                <div style={{ fontSize: '10px', opacity: 0.5, marginTop: '4px', textAlign: 'right' }}>{echo.roleName}</div>
              </div>
            );
          })}
        </div>

        {data.echoes.length === 0 && <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>暂无声骸数据</div>}
      </div>
    </HTML>
  );
}
