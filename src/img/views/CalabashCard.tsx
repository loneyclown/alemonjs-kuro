import type { CalabashPhantom, CalabashResp } from '@src/model/types';
import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import React from 'react';
import HTML from './HTML';

interface CalabashCardProps {
  data: { uid: string; calabash: CalabashResp; page?: number };
}

const PAGE_SIZE = 30;
const CSS = `
.bank{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#303449;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}

.bank *{box-sizing:border-box}

.bank-bg{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.68}

.bank-content{position:relative;
padding:30px 24px 22px;
background:linear-gradient(180deg,
rgba(25,
30,
47,
.12),
rgba(31,
36,
55,
.6))}

.bank-brand{color:#f1e8d4;
letter-spacing:4px;
font:24px "tttgbnumber",
"SimSun",
serif;
margin:0 15px}

.bank-brand small{display:block;
font:7px Arial;
letter-spacing:4px;
margin-top:8px;
color:#dac8a4}

.bank-heading{font:italic 52px "tttgbnumber",
"SimSun",
serif;
color:#f7eddb;
letter-spacing:5px;
margin:26px 15px 22px}

.bank-heading small{display:block;
font:8px Arial;
letter-spacing:5px;
margin-top:10px;
color:#dbcba9}

.bank-hero{display:flex;
align-items:center;
gap:25px;
border:1px solid #d8bd87;
border-radius:23px;
outline:1px solid #eadabd66;
outline-offset:-5px;
background:linear-gradient(115deg,
#252b40ed,
#636a8aad);
color:#f3eddf;
padding:24px 30px;
box-shadow:0 4px 20px #171d3433}

.bank-level{flex-shrink:0;
width:110px;
text-align:center;
border-right:1px solid #d0b67d77;
padding-right:25px}

.bank-level strong{font:64px "tttgbnumber",
serif;
color:#edcf91;
line-height:1}

.bank-level span{display:block;
font-size:13px;
margin-top:8px;
color:#ded5c4}

.bank-identity{flex:1}

.bank-identity h2{font:27px "tttgbnumber",
serif;
margin:0 0 12px;
letter-spacing:2px}

.bank-tag{display:inline-block;
border:1px solid #d7c9a577;
border-radius:20px;
font-size:13px;
padding:5px 13px;
color:#e9dfcb}

.bank-exp{font-size:12px;
color:#cbcbd7;
margin-top:12px}

.bank-progress{width:280px;
text-align:right}

.bank-progress-label{font-size:15px;
letter-spacing:2px;
color:#e1d7c5}

.bank-progress-value{font:36px "tttgbnumber",
serif;
margin:8px 0;
color:#f5dba1}

.bank-track{height:8px;
border-radius:10px;
background:#555b7599;
overflow:hidden;
border:1px solid #d4c5ac55}

.bank-track i{display:block;
height:100%;
background:linear-gradient(90deg,
#c6984d,
#fff0bb);
border-radius:10px}

.bank-note{font-size:11px;
color:#c7c8d7;
margin-top:7px;
line-height:1.5}

.bank-panel{margin-top:18px;
padding:22px;
border:1px solid #e1cfaa;
border-radius:20px;
outline:1px solid #ffffff80;
outline-offset:-5px;
background:linear-gradient(120deg,
#f5f3f1ed,
#dedfeced);
box-shadow:0 5px 18px #171c3630}

.bank-section{font:23px "tttgbnumber",
"SimSun",
serif;
margin:0 0 17px;
letter-spacing:2px;
color:#313b52;
display:flex;
align-items:center;
gap:10px}

.bank-section:before{content:"◆";
font:14px serif;
color:#b98d49}

.bank-section small{font:7px Arial;
letter-spacing:3px;
color:#81879a}

.bank-section:after{content:"";
height:1px;
flex:1;
background:linear-gradient(90deg,
#b9a17d99,
transparent)}

.bank-stats{display:grid;
grid-template-columns:repeat(4,
1fr);
gap:12px}

.bank-stat{padding:17px 13px;
border:1px solid #b6b7ca;
border-radius:12px;
background:linear-gradient(135deg,
#ffffff8c,
#d1d3e35e);
text-align:center}

.bank-stat-name{font-size:13px;
color:#686e83}

.bank-stat-value{font:32px "tttgbnumber",
serif;
color:#a57730;
margin-top:9px}

.bank-stat-value small{font:15px "Microsoft YaHei",
sans-serif;
margin-left:3px}

.bank-collection-head{display:flex;
align-items:center;
justify-content:space-between;
gap:12px;
margin-bottom:18px}

.bank-summary{display:flex;
gap:16px;
font-size:12px;
color:#646d83;
flex-wrap:wrap}

.bank-summary b{font-size:17px;
color:#9b7131;
margin:0 4px}

.bank-page{font-size:12px;
color:#73788d;
white-space:nowrap}

.bank-grid{display:grid;
grid-template-columns:repeat(6,
minmax(0,
1fr));
gap:10px}

.bank-echo{border:1px solid #b4b5c9;
border-radius:10px;
overflow:hidden;
background:#f2f1f6aa;
padding:5px}

.bank-echo-art{height:82px;
position:relative;
display:flex;
align-items:center;
justify-content:center;
border-radius:6px;
background:radial-gradient(ellipse at center,
#a7a3b8,
#626579)}

.bank-echo-art img{width:77px;
height:77px;
object-fit:contain;
filter:drop-shadow(0 3px 4px #1f233a77)}

.bank-echo-art span{position:absolute;
top:5px;
right:5px;
background:#292d41cc;
color:#e9d9b5;
border:1px solid #d0b57955;
border-radius:4px;
padding:2px 5px;
font:10px Arial}

.bank-no-icon{font:24px "SimSun",
serif;
color:#d5c5a6}

.bank-echo-name{font-size:13px;
font-weight:600;
color:#364158;
margin:8px 3px 5px;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis}

.bank-echo-count{display:flex;
justify-content:space-between;
align-items:center;
font-size:10px;
color:#7a7f93;
margin:0 3px 5px}

.bank-echo-count strong{font-size:12px;
color:#8b6a32}

.bank-echo .bank-track{height:4px;
border:0;
background:#b7bacb;
margin:0 3px 5px}

.bank-hint{margin-top:17px;
padding-top:12px;
border-top:1px solid #b6b7ca88;
font-size:12px;
color:#697188;
line-height:1.7}

.bank-hint b{color:#987039}

.bank-empty{padding:35px 15px;
color:#6a7187;
font-size:17px;
text-align:center;
line-height:1.9}

.bank-footer{margin-top:20px;
padding:12px 17px;
display:flex;
justify-content:space-between;
border:1px solid #bfa46e99;
border-radius:10px;
background:#292e45c9;
color:#e8d9b9;
font-size:12px}

.bank-footer small{color:#bdc0cf;
font-size:10px;
letter-spacing:1px}

`;

function count(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
}

function progress(current: unknown, total: unknown) {
  const a = count(current);
  const b = count(total);

  return a !== null && b !== null && b > 0 ? Math.min(100, (a / b) * 100) : null;
}

function rate(value: unknown) {
  if (typeof value === 'string' && /^\d+(?:\.\d+)?%$/.test(value)) {
    return value;
  }

  const number = count(value);

  return number === null ? '未返回' : `${number}%`;
}

function Track({ value }: { value: number | null }) {
  return value === null ? null : (
    <div className='bank-track'>
      <i style={{ width: `${value}%` }} />
    </div>
  );
}

export default function CalabashCard({ data }: CalabashCardProps) {
  const bank = data.calabash ?? {};
  const entries = (Array.isArray(bank.phantomList) ? bank.phantomList : []).filter((item): item is CalabashPhantom => !!item?.phantom?.name);
  const pages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
  const page = Math.min(pages, Number.isSafeInteger(data.page) && (data.page ?? 0) > 0 ? data.page! : 1);
  const start = (page - 1) * PAGE_SIZE;
  const visible = entries.slice(start, start + PAGE_SIZE);
  const completed = entries.filter(item => count(item.star) !== null && (count(item.maxStar) ?? 0) > 0 && item.star! >= item.maxStar!).length;
  const collected = entries.filter(item => (count(item.star) ?? 0) > 0).length;
  const overall = progress(bank.unlockCount, bank.maxCount);
  const locked = bank.isUnlock === false;
  const stats = [
    { label: '装备 COST 上限', value: count(bank.cost) ?? '未返回' },
    { label: '最高可吸收品质', value: count(bank.catchQuality) ?? '未返回', unit: count(bank.catchQuality) !== null ? '星' : '' },
    { label: '基础吸收率', value: rate(bank.baseCatch) },
    { label: '强化吸收率', value: rate(bank.strengthenCatch) }
  ];

  return (
    <HTML style={{ width: '1000px' }}>
      <main className='bank'>
        <style>{CSS}</style>
        <img className='bank-bg' src={BACKGROUND} alt='' />
        <div className='bank-content'>
          <div className='bank-brand'>
            ✦ 鸣潮助手<small>WUTHERING WAVES ASSISTANT</small>
          </div>
          <h1 className='bank-heading'>
            数据坞<small>DATA BANK · ECHO ARCHIVE</small>
          </h1>
          {locked ? (
            <section className='bank-panel'>
              <div className='bank-empty'>
                数据坞尚未解锁
                <br />
                请先在游戏内解锁后重新查询
              </div>
            </section>
          ) : (
            <>
              <section className='bank-hero'>
                <div className='bank-level'>
                  <strong>{count(bank.level) ?? '—'}</strong>
                  <span>数据坞等级</span>
                </div>
                <div className='bank-identity'>
                  <h2>声骸收集档案</h2>
                  <span className='bank-tag'>UID · {data.uid}</span>
                  {count(bank.curExp) !== null && <div className='bank-exp'>当前经验 {bank.curExp}</div>}
                </div>
                <div className='bank-progress'>
                  <div className='bank-progress-label'>图鉴收集进度</div>
                  <div className='bank-progress-value'>
                    {count(bank.unlockCount) ?? '—'} / {count(bank.maxCount) ?? '—'}
                  </div>
                  <Track value={overall} />
                  <div className='bank-note'>按已解锁品质档位累计 · 非声骸种数</div>
                </div>
              </section>
              <section className='bank-panel'>
                <h2 className='bank-section'>
                  吸收能力<small>ABSORPTION</small>
                </h2>
                <div className='bank-stats'>
                  {stats.map(stat => (
                    <div className='bank-stat' key={stat.label}>
                      <div className='bank-stat-name'>{stat.label}</div>
                      <div className='bank-stat-value'>
                        {stat.value}
                        {stat.unit && <small>{stat.unit}</small>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              <section className='bank-panel'>
                <h2 className='bank-section'>
                  声骸图鉴<small>ECHO COLLECTION</small>
                </h2>
                {entries.length ? (
                  <>
                    <div className='bank-collection-head'>
                      <div className='bank-summary'>
                        <span>
                          已收集<b>{collected}</b>种
                        </span>
                        <span>
                          图鉴完整<b>{completed}</b>种
                        </span>
                        <span>
                          图鉴条目<b>{entries.length}</b>种
                        </span>
                      </div>
                      <div className='bank-page'>
                        第 {page} / {pages} 页 · {start + 1}–{start + visible.length}
                      </div>
                    </div>
                    <div className='bank-grid'>
                      {visible.map((entry, i) => (
                        <article className='bank-echo' key={`${entry.phantom?.phantomId ?? 'echo'}-${start + i}`}>
                          <div className='bank-echo-art'>
                            {entry.phantom?.iconUrl ? <img src={entry.phantom.iconUrl} alt={entry.phantom.name} /> : <div className='bank-no-icon'>声骸</div>}
                            {count(entry.phantom?.cost) !== null && <span>COST {entry.phantom?.cost}</span>}
                          </div>
                          <div className='bank-echo-name'>{entry.phantom?.name}</div>
                          <div className='bank-echo-count'>
                            <span>图鉴收集</span>
                            <strong>
                              {count(entry.star) ?? '—'} / {count(entry.maxStar) ?? '—'}
                            </strong>
                          </div>
                          <Track value={progress(entry.star, entry.maxStar)} />
                        </article>
                      ))}
                    </div>
                    <div className='bank-hint'>
                      收集数表示已解锁的品质档位，不是持有数量或当前装备星级。
                      {pages > 1 && (
                        <>
                          <br />
                          {page < pages ? (
                            <>
                              下一页：<b>#mc数据坞 {page + 1}</b> ·{' '}
                            </>
                          ) : null}
                          发送 <b>#mc数据坞 页码</b> 查看其他声骸，每页 {PAGE_SIZE} 种。
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div className='bank-empty'>
                    {bank.showToGuest === false ? '库街区数据展示未开启' : '声骸图鉴暂未返回数据'}
                    <br />
                    请检查库街区展示设置后重新查询
                  </div>
                )}
              </section>
            </>
          )}
          <footer className='bank-footer'>
            <span>✦ #mc数据坞 · 声骸收集档案</span>
            <small>鸣潮助手 · 以库街区返回数据为准</small>
          </footer>
        </div>
      </main>
    </HTML>
  );
}
