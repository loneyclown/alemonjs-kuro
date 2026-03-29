import type { AccountBaseInfo, PhantomBattle } from '@src/model/types';
import React from 'react';
import { C, DarkContainer, Footer, Section, UserHeader } from './CardBase';
import HTML from './HTML.js';

interface PokerCardProps {
  data: {
    uid: string;
    battle: PhantomBattle;
    base: AccountBaseInfo | null;
    headUrl?: string;
  };
}

function ProgressBar({ label, current, max, color }: { label: string; current: number; max: number; color: string }) {
  const pct = max > 0 ? Math.min(100, (current / max) * 100) : 0;

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>{label}</div>
        <div style={{ fontSize: '22px', color: C.textSecondary }}>
          <span style={{ color, fontWeight: 'bold', fontSize: '20px' }}>{current}</span> / {max}
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
        <div style={{ background: color, height: '100%', width: `${pct}%`, borderRadius: '6px', boxShadow: `0 0 10px ${color}` }} />
      </div>
    </div>
  );
}

export default function PokerCard({ data }: PokerCardProps) {
  const { battle, base } = data;

  return (
    <HTML style={{ width: '1000px' }}>
      <DarkContainer>
        {base ? (
          <UserHeader name={base.name} uid={data.uid} level={base.level} avatarUrl={data.headUrl} decoText='PHANTOM POKER' />
        ) : (
          <div
            style={{
              background: `radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                           linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
              borderRadius: '16px',
              padding: '25px 40px',
              border: `1px solid ${C.panelBorder}`
            }}
          >
            <div style={{ fontSize: '36px', fontWeight: 800, color: '#fff' }}>激斗 · 牌局</div>
            <div style={{ fontSize: '18px', color: C.textSecondary, marginTop: '6px' }}>UID {data.uid}</div>
          </div>
        )}

        <Section title='等级信息'>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, color: C.gold }}>{battle.level}</span>
            <span style={{ fontSize: '20px', color: C.textSecondary }}>{battle.levelName}</span>
          </div>
          <ProgressBar label='经验' current={battle.exp} max={battle.expLimit} color={C.gold} />
        </Section>

        <Section title='收集进度'>
          <ProgressBar label='卡片收集' current={battle.cardNum} max={battle.maxCardNum} color='#4fc3f7' />
          <ProgressBar label='徽章收集' current={battle.badgeNum} max={battle.maxBadgeNum} color='#ffb74d' />
        </Section>

        {battle.badgeList.length > 0 && (
          <Section title='徽章一览'>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {battle.badgeList.map((badge, i) => (
                <div
                  key={i}
                  style={{
                    width: '110px',
                    padding: '10px',
                    borderRadius: '10px',
                    background: badge.unlock ? C.goldDim : 'rgba(0,0,0,0.3)',
                    border: `1px solid ${badge.unlock ? C.goldBorder : C.panelBorder}`,
                    textAlign: 'center',
                    opacity: badge.unlock ? 1 : 0.4,
                    boxSizing: 'border-box'
                  }}
                >
                  {badge.iconUrl && (
                    <img
                      src={badge.iconUrl}
                      style={{
                        width: '52px',
                        height: '52px',
                        display: 'block',
                        margin: '0 auto',
                        objectFit: 'contain',
                        filter: badge.unlock ? 'none' : 'grayscale(1)'
                      }}
                    />
                  )}
                  <div style={{ fontSize: '18px', marginTop: '6px', lineHeight: 1.3, color: badge.unlock ? '#fff' : C.textDim }}>{badge.name}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Footer />
      </DarkContainer>
    </HTML>
  );
}
