import type { SignInitResp, SignItem } from '@src/model/types';
import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import React from 'react';
import HTML from './HTML';

interface SignCardProps {
  data: { uid: string; sign: SignInitResp; signMsg?: string };
}

const CSS = `
.sign-sheet{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#354058;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}

.sign-sheet *{box-sizing:border-box}

.sign-bg{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.66}

.sign-content{position:relative;
padding:28px 24px 24px;
background:linear-gradient(180deg,
#1b203116,
#20273bb3)}

.sign-brand{font:24px "tttgbnumber",
"SimSun",
serif;
letter-spacing:4px;
color:#f3e9d5;
margin:0 15px}

.sign-brand small{display:block;
font:7px Arial;
letter-spacing:4px;
color:#d8c59d;
margin-top:8px}

.sign-title{font:italic 48px "tttgbnumber",
"SimSun",
serif;
letter-spacing:5px;
color:#f4ead7;
margin:23px 15px}

.sign-title small{display:block;
font:8px Arial;
letter-spacing:5px;
color:#d8c59d;
margin-top:10px}

.sign-profile{display:flex;
align-items:center;
justify-content:space-between;
gap:25px;
padding:24px 30px;
border:1px solid #d9bf8b;
border-radius:23px;
outline:1px solid #eadcc366;
outline-offset:-5px;
background:linear-gradient(110deg,
#252b40ed,
#626a88bb);
color:#f2e8d4}

.sign-month{font:30px "tttgbnumber",
"SimSun",
serif;
letter-spacing:2px;
margin-bottom:13px}

.sign-uid{font:14px "tttgbnumber",
serif;
letter-spacing:1px;
display:inline-block;
border:1px solid #cabb9d88;
padding:5px 13px;
border-radius:18px}

.sign-range{font-size:11px;
color:#c6c6d4;
margin-top:12px}

.sign-stats{display:flex;
align-items:center;
gap:28px;
text-align:center}

.sign-stat{min-width:90px}

.sign-stat strong{font:42px "tttgbnumber",
serif;
color:#efd297;
line-height:1.1}

.sign-stat small{font-size:12px;
color:#d2c9b7;
margin-left:5px}

.sign-stat span{display:block;
font-size:12px;
color:#c9c7d3;
margin-top:10px}

.sign-state{font-size:13px;
white-space:nowrap;
border:1px solid #cdb17c77;
background:#d2b2761a;
padding:9px 14px;
border-radius:20px;
color:#f3d49b}

.sign-state.done{color:#bed7cd;
border-color:#93b5a177;
background:#88a79622}

.sign-state.unknown{color:#d1d0dc;
border-color:#b7bac666;
background:#b4b5c61a}

.sign-next{display:flex;
align-items:center;
gap:13px;
padding:13px 19px;
margin-top:17px;
border:1px solid #d0bb9388;
border-radius:13px;
background:#30364ccc;
color:#e1d5bc;
font-size:13px}

.sign-next img{width:37px;
height:37px;
object-fit:contain;
filter:drop-shadow(0 2px 3px #1d223a77)}

.sign-next-label{font-size:10px;
letter-spacing:2px;
color:#cdb787;
margin-bottom:5px}

.sign-next b{font-weight:500;
color:#f3dba8}

.sign-panel{margin-top:18px;
padding:20px;
border:1px solid #e0cda5;
border-radius:20px;
outline:1px solid #ffffff77;
outline-offset:-5px;
background:linear-gradient(120deg,
#f6f3f0f0,
#dedfeced);
box-shadow:0 5px 18px #151a3433}

.sign-heading{display:flex;
align-items:center;
gap:10px;
font:23px "tttgbnumber",
"SimSun",
serif;
letter-spacing:2px;
margin:0 0 18px;
padding-bottom:14px;
border-bottom:1px solid #b9b9cb88;
color:#39445b}

.sign-heading:before{content:"◆";
font:14px serif;
color:#b48a48}

.sign-heading small{font:7px Arial;
letter-spacing:3px;
color:#858a9d}

.sign-heading span{font:11px "Microsoft YaHei",
sans-serif;
margin-left:auto;
letter-spacing:0;
color:#7d8498}

.sign-grid{display:grid;
grid-template-columns:repeat(7,
minmax(0,
1fr));
gap:10px}

.sign-reward{position:relative;
min-width:0;
border:1px solid #b9bbce;
border-radius:11px;
padding:10px 7px 9px;
background:linear-gradient(140deg,
#f8f5f9aa,
#d5d8e866);
text-align:center;
overflow:hidden}

.sign-reward.claimed{background:#cbd9d273;
border-color:#a2b5ac}

.sign-reward.next{border-color:#bf9857;
box-shadow:inset 0 0 0 1px #d3b67a99;
background:linear-gradient(140deg,
#fff7e6cc,
#e5d5b766)}

.sign-reward-day{font-size:11px;
color:#7a8197;
white-space:nowrap}

.sign-reward img{display:block;
width:47px;
height:47px;
object-fit:contain;
margin:9px auto 6px;
filter:drop-shadow(0 2px 3px #4a4b6522)}

.sign-reward.claimed img{opacity:.7}

.sign-reward-placeholder{height:47px;
margin:9px auto 6px;
display:flex;
align-items:center;
justify-content:center;
color:#a49c8a;
font:26px "SimSun",
serif}

.sign-reward-name{font-size:12px;
line-height:1.55;
min-height:37px;
display:flex;
align-items:center;
justify-content:center;
color:#4e5870;
overflow-wrap:anywhere}

.sign-reward-number{font:21px "tttgbnumber",
serif;
color:#a17c3b;
margin:3px 0 7px}

.sign-reward-status{font-size:10px;
min-height:15px;
color:#9b9fb1}

.sign-reward.claimed .sign-reward-status{color:#6c8d7c}

.sign-reward.next .sign-reward-status{color:#a67c36}

.sign-legend{margin-top:15px;
padding-top:12px;
border-top:1px solid #b7bbca77;
color:#80879a;
font-size:11px;
line-height:1.8}

.sign-empty{padding:30px 12px;
text-align:center;
color:#7d859b;
font-size:15px;
line-height:1.9}

.sign-footer{margin-top:18px;
padding:13px 17px;
border:1px solid #c5aa7788;
border-radius:11px;
background:#2b3147d9;
color:#e5d7b8;
display:flex;
justify-content:space-between;
font-size:11px;
gap:20px}

.sign-footer small{font-size:10px;
color:#bdc0d1}

`;

function count(value: unknown): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function rewards(list: SignItem[] | undefined) {
  return (Array.isArray(list) ? list : [])
    .flatMap((item, index) => {
      if (!item) {
        return [];
      }
      const day = (count(item.serialNum) ?? index) + 1;
      const claimed = typeof item.isGain === 'boolean' ? item.isGain : item.sigInStatus === 1 ? true : item.sigInStatus === 0 ? false : null;

      return [{ item, day, claimed }];
    })
    .sort((a, b) => a.day - b.day);
}

function RewardGrid({ entries, nextDay, kind = 'days' }: { entries: ReturnType<typeof rewards>; nextDay?: number; kind?: 'days' | 'extra' | 'loop' }) {
  return (
    <div className='sign-grid'>
      {entries.map(({ item, day, claimed }, index) => {
        const next = kind === 'days' && day === nextDay && claimed !== true;

        return (
          <article className={`sign-reward${next ? ' next' : claimed ? ' claimed' : ''}`} key={`${day}-${index}`}>
            <div className='sign-reward-day'>{kind === 'days' ? `累计第 ${day} 天` : kind === 'extra' ? '额外奖励' : '循环奖励'}</div>
            {item.goodsUrl ? <img src={item.goodsUrl} alt='' /> : <div className='sign-reward-placeholder'>◇</div>}
            <div className='sign-reward-name'>{item.goodsName || '奖励名称未返回'}</div>
            <div className='sign-reward-number'>×{count(item.goodsNum) ?? '—'}</div>
            <div className='sign-reward-status'>{next ? '下一档' : claimed === true ? '✓ 已领取' : claimed === false ? '未领取' : '状态未知'}</div>
          </article>
        );
      })}
    </div>
  );
}

export default function SignCard({ data }: SignCardProps) {
  const sign = data.sign ?? {};
  const entries = rewards(sign.signInGoodsConfigs ?? sign.sigInDTOList);
  const extra = rewards(sign.disposableGoodsList);
  const loop = rewards(sign.signLoopGoodsList);
  const signed = typeof sign.isSigIn === 'boolean' ? sign.isSigIn : typeof sign.hasSignIn === 'boolean' ? sign.hasSignIn : null;
  const days = count(sign.sigInNum);
  const next = days === null ? undefined : entries.find(entry => entry.day === days + 1 && entry.claimed !== true);
  const start = typeof sign.eventStartTimes === 'string' ? sign.eventStartTimes.match(/^\d{4}-\d{2}-\d{2}/)?.[0] : undefined;
  const end = typeof sign.eventEndTimes === 'string' ? sign.eventEndTimes.match(/^\d{4}-\d{2}-\d{2}/)?.[0] : undefined;
  const beginMonth = start?.slice(0, 7);
  const month = beginMonth && beginMonth === end?.slice(0, 7) ? `${beginMonth.slice(0, 4)}年${Number(beginMonth.slice(5, 7))}月` : '本期签到';

  return (
    <HTML style={{ width: '1000px' }}>
      <main className='sign-sheet'>
        <style>{CSS}</style>
        <img className='sign-bg' src={BACKGROUND} alt='' />
        <div className='sign-content'>
          <div className='sign-brand'>
            ✦ 鸣潮助手<small>WUTHERING WAVES ASSISTANT</small>
          </div>
          <h1 className='sign-title'>
            签到日历<small>DAILY CHECK-IN · REWARD CALENDAR</small>
          </h1>
          <section className='sign-profile'>
            <div>
              <div className='sign-month'>{month}</div>
              <span className='sign-uid'>UID · {data.uid}</span>
              <div className='sign-range'>{start && end ? `${start} — ${end}` : '活动周期未返回'}</div>
            </div>
            <div className='sign-stats'>
              <div className='sign-stat'>
                <strong>{days ?? '—'}</strong>
                <small>天</small>
                <span>累计签到</span>
              </div>
              <div className='sign-stat'>
                <strong>{count(sign.omissionNnm) ?? '—'}</strong>
                <small>天</small>
                <span>本期漏签</span>
              </div>
            </div>
            <div className={`sign-state${signed === true ? ' done' : signed === null ? ' unknown' : ''}`}>
              {signed === true ? '今日已签' : signed === false ? '今日未签' : '状态未返回'}
            </div>
          </section>
          {next && (
            <div className='sign-next'>
              {next.item.goodsUrl && <img src={next.item.goodsUrl} alt='' />}
              <div>
                <div className='sign-next-label'>NEXT REWARD · 下一档奖励</div>累计第 {next.day} 天 ·{' '}
                <b>
                  {next.item.goodsName || '奖励名称未返回'} ×{count(next.item.goodsNum) ?? '—'}
                </b>
              </div>
            </div>
          )}
          <section className='sign-panel'>
            <h2 className='sign-heading'>
              签到奖励<small>CHECK-IN REWARDS</small>
              <span>{entries.length ? `${entries.length} 档奖励` : '奖励记录'}</span>
            </h2>
            {entries.length ? (
              <RewardGrid entries={entries} nextDay={next?.day} />
            ) : (
              <div className='sign-empty'>暂无奖励数据，请检查库街区签到页面后重新查询</div>
            )}
            <div className='sign-legend'>按累计签到天数解锁，不对应本月具体日期 · 金色描边为下一档，绿色为已领取。</div>
          </section>
          {!!extra.length && (
            <section className='sign-panel'>
              <h2 className='sign-heading'>
                额外奖励<small>BONUS REWARDS</small>
              </h2>
              <RewardGrid entries={extra} kind='extra' />
            </section>
          )}
          {!!loop.length && (
            <section className='sign-panel'>
              <h2 className='sign-heading'>
                循环奖励<small>REPEAT REWARDS</small>
              </h2>
              <RewardGrid entries={loop} kind='loop' />
            </section>
          )}
          <footer className='sign-footer'>
            <span>✦ #mc签到日历 · 发送 #mc签到 完成今日签到</span>
            <small>{sign.nowServerTimes ? `数据时间 ${sign.nowServerTimes}` : '鸣潮助手 · 以库街区返回数据为准'}</small>
          </footer>
        </div>
      </main>
    </HTML>
  );
}
