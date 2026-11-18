import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import type { Pool, PoolRound } from '@src/model/pools';
import React from 'react';
import HTML from './HTML';

const CSS = `
.pool-sheet {
  position: relative;
  width: 1000px;
  overflow: hidden;
  border-radius: 24px;
  background: #30364b;
  color: #354058;
  font-family: "Microsoft YaHei", sans-serif;
  text-align: left;
}
.pool-sheet * { box-sizing: border-box; }
.pool-backdrop { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; opacity: .66; }
.pool-content { position: relative; padding: 28px 24px 24px; background: linear-gradient(180deg, #1b203116, #20273bb3); }
.pool-header { margin: 0 15px 24px; color: #f4ead7; }
.pool-brand { font: 24px "tttgbnumber", "SimSun", serif; letter-spacing: 4px; }
.pool-header h1 { margin: 16px 0 12px; font: italic 48px "tttgbnumber", "SimSun", serif; letter-spacing: 5px; }
.pool-header p { margin: 0; font-size: 14px; color: #e0d5c1; }
.pool-round {
  margin-top: 18px;
  padding: 20px;
  border: 1px solid #dfcca5;
  outline: 1px solid #ffffff77;
  outline-offset: -5px;
  border-radius: 21px;
  background: linear-gradient(120deg, #f6f3eff0, #dedfeced);
}
.pool-round-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 0 0 14px; border-bottom: 1px solid #b7bacb99; }
.pool-round-head strong { font: 23px "tttgbnumber", "SimSun", serif; color: #8b6833; }
.pool-round-time { font-size: 14px; color: #535e75; }
.pool-countdown { border: 1px solid #b18a4e66; border-radius: 16px; padding: 5px 11px; background: #eadabd88; color: #805b28; font-size: 13px; }
.pool-columns { display: flex; gap: 16px; }
.pool-column { flex: 1; min-width: 0; }
.pool-column h2 { margin: 16px 0 10px; font-size: 17px; color: #8b6833; }
.pool-column.weapon h2 { color: #526c8d; }
.pool-entry {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 82px;
  padding: 10px 12px;
  margin-bottom: 8px;
  border: 1px solid #b7bacb;
  border-radius: 10px;
  background: #f1eff6ba;
}
.pool-entry:last-child { margin-bottom: 0; }
.pool-entry h3 { margin: 0; font-size: 17px; line-height: 1.45; overflow-wrap: anywhere; }
.pool-entry p { margin: 5px 0 0; color: #59647b; font-size: 12px; line-height: 1.5; }
.pool-art { display: flex; gap: 4px; flex-shrink: 0; }
.pool-art img { display: block; width: 46px; height: 59px; object-fit: contain; border-radius: 5px; background: #cbd0df; }
.pool-empty { text-align: center; color: #59647b; }
.pool-footer { margin-top: 18px; padding: 12px 16px; border: 1px solid #c5aa7788; border-radius: 10px; background: #2b3147d9; color: #e5d7b8; font-size: 12px; }
`;

function PoolColumn({ title, type, pools }: { title: string; type: Pool['type']; pools: Pool[] }) {
  if (!pools.length) {
    return null;
  }

  return (
    <div className={`pool-column ${type}`}>
      <h2>{title}</h2>
      {pools.map((pool, index) => {
        const names = [...new Set(pool.images.map(image => image.title.trim()).filter(Boolean))];

        return (
          <article className='pool-entry' key={index}>
            {!!pool.images.length && (
              <div className='pool-art'>
                {pool.images.slice(0, 4).map((image, i) => (
                  <img key={i} src={image.url} alt={image.title} />
                ))}
              </div>
            )}
            <div>
              <h3>{pool.name}</h3>
              {!!names.length && <p>{names.join(' / ')}</p>}
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function PoolCard({ data }: { data: { rounds: PoolRound[] } }) {
  const active = data.rounds.reduce((count, round) => count + (round.status === '进行中' ? round.pools.length : 0), 0);
  const summary = active ? `${active} 个活动唤取进行中` : data.rounds.some(round => round.range) ? '暂无已确认进行中的活动唤取' : '';

  return (
    <HTML style={{ width: '1000px' }}>
      <main className='pool-sheet'>
        <style>{CSS}</style>
        <img className='pool-backdrop' src={BACKGROUND} alt='' />
        <div className='pool-content'>
          <header className='pool-header'>
            <div className='pool-brand'>✦ 鸣潮助手</div>
            <h1>活动唤取</h1>
            {summary && <p>{summary}</p>}
          </header>
          {data.rounds.map((round, index) => (
            <section className='pool-round' key={index}>
              <header className='pool-round-head'>
                <strong>{round.status}</strong>
                {round.range && <span className='pool-round-time'>{round.range.join(' — ')}</span>}
                {round.countdown && <span className='pool-countdown'>剩余 {round.countdown}</span>}
              </header>
              <div className='pool-columns'>
                <PoolColumn title='角色唤取' type='char' pools={round.pools.filter(pool => pool.type === 'char')} />
                <PoolColumn title='武器唤取' type='weapon' pools={round.pools.filter(pool => pool.type === 'weapon')} />
              </div>
            </section>
          ))}
          {!data.rounds.length && <section className='pool-round pool-empty'>Wiki 暂未返回活动唤取信息</section>}
          <footer className='pool-footer'>✦ #mc卡池 · 来源：鸣潮 Wiki · 北京时间</footer>
        </div>
      </main>
    </HTML>
  );
}
