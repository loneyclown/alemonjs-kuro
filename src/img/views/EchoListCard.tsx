import { WAVES_ECHO_COLORS } from '@src/constants/kuro.js';
import type { EchoRankItem } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section } from './CardBase';
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
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        {/* 头部 */}
        <div
          style={{
            background: `radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                         linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
            borderRadius: '16px',
            padding: '25px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `1px solid ${C.panelBorder}`
          }}
        >
          <div>
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>声骸列表</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>
              {data.playerName} · UID {data.uid}
            </div>
          </div>
          {data.totalPages > 1 && (
            <div style={{ fontSize: '18px', color: C.textDim, fontWeight: 'bold' }}>
              {data.page} / {data.totalPages}
            </div>
          )}
        </div>

        <Section title='声骸'>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {data.echoes.map((echo, i) => {
              const fetterColor = WAVES_ECHO_COLORS[echo.fetterName] ?? C.gold;

              return (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '14px',
                    width: 'calc(50% - 6px)',
                    borderLeft: `3px solid ${fetterColor}`,
                    boxSizing: 'border-box'
                  }}
                >
                  {/* 声骸头部 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    {echo.phantomIconUrl && <img src={echo.phantomIconUrl} style={{ width: '44px', height: '44px', display: 'block', borderRadius: '8px' }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', lineHeight: 1.3 }}>{echo.phantomName}</div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '18px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.4)', color: '#fff' }}>
                          Lv.{echo.level}
                        </span>
                        <span style={{ fontSize: '18px', padding: '2px 6px', borderRadius: '4px', background: `${fetterColor}25`, color: fetterColor }}>
                          {echo.fetterName}
                        </span>
                        <span style={{ fontSize: '18px', color: C.gold }}>{'◆'.repeat(echo.cost)}</span>
                      </div>
                    </div>
                    {echo.roleIconUrl && (
                      <img
                        src={echo.roleIconUrl}
                        style={{
                          width: '36px',
                          height: '36px',
                          display: 'block',
                          borderRadius: '50%',
                          border: `2px solid ${C.panelBorderTop}`
                        }}
                      />
                    )}
                  </div>

                  {/* 主词条 */}
                  {echo.mainProps.map((prop, j) => (
                    <div key={`m${j}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', padding: '2px 0', color: C.gold }}>
                      <span>{prop.attributeName}</span>
                      <span style={{ fontWeight: 'bold' }}>{prop.attributeValue}</span>
                    </div>
                  ))}

                  {echo.subProps.length > 0 && <div style={{ borderTop: `1px solid ${C.panelBorder}`, margin: '6px 0' }} />}

                  {/* 副词条 */}
                  {echo.subProps.map((prop, j) => (
                    <div key={`s${j}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', padding: '2px 0', color: C.textSecondary }}>
                      <span>{prop.attributeName}</span>
                      <span>{prop.attributeValue}</span>
                    </div>
                  ))}

                  <div style={{ fontSize: '18px', color: C.textDim, marginTop: '6px', textAlign: 'right' }}>{echo.roleName}</div>
                </div>
              );
            })}
          </div>

          {data.echoes.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' }}>暂无声骸数据</div>}
        </Section>

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
