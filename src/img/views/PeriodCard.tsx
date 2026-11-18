import type { PeriodDetailItem, PeriodDetailResp, PeriodItem, PeriodNode } from '@src/model/types';
import { selectMonth } from '@src/model/period';
import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import React from 'react';
import HTML from './HTML';

interface PeriodCardProps {
  data: { uid: string; periodType: string; periodTitle: string; periodIndex?: number; availableMonths?: PeriodItem[]; detail: PeriodDetailResp };
}

const RESOURCES: Record<number, { name: string; color: string; english: string }> = {
  2: { name: '星声', color: '#ad8644', english: 'ASTRITE' },
  1: { name: '贝币', color: '#6b87ad', english: 'SHELL CREDIT' },
  3: { name: '唤声涡纹', color: '#8b75b1', english: 'LUSTROUS TIDE' },
  4: { name: '浮金 / 铸潮', color: '#b38c62', english: 'RADIANT / FORGING TIDE' }
};
const CSS = `
.ledger{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#303449;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}

.ledger *{box-sizing:border-box}

.ledger-bg{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.66}

.ledger-content{position:relative;
padding:28px 24px 24px;
background:linear-gradient(180deg,
#1b203116,
#20273bb3)}

.ledger-brand{font:24px "tttgbnumber",
"SimSun",
serif;
letter-spacing:4px;
color:#f3e9d5;
margin:0 15px}

.ledger-brand small{display:block;
font:7px Arial;
letter-spacing:4px;
color:#d8c59d;
margin-top:8px}

.ledger-title{font:italic 50px "tttgbnumber",
"SimSun",
serif;
letter-spacing:5px;
color:#f4ead7;
margin:23px 15px}

.ledger-title small{display:block;
font:8px Arial;
letter-spacing:5px;
color:#d8c59d;
margin-top:10px}

.ledger-profile{display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
padding:23px 30px;
background:linear-gradient(110deg,
#252b40ed,
#646b8aaa);
border:1px solid #d8be8a;
border-radius:23px;
outline:1px solid #eadcc466;
outline-offset:-5px;
color:#f0e5ce}

.ledger-month{font:34px "tttgbnumber",
"SimSun",
serif;
letter-spacing:2px;
margin-bottom:13px}

.ledger-uid{display:inline-block;
border:1px solid #d6c3a277;
border-radius:20px;
padding:5px 14px;
font:14px "tttgbnumber",
serif;
letter-spacing:1px}

.ledger-profile-note{font-size:12px;
line-height:1.8;
text-align:right;
color:#d0cbd5}

.ledger-profile-note strong{display:block;
font:22px "tttgbnumber",
serif;
letter-spacing:3px;
color:#e7d3ab;
margin-bottom:6px}

.ledger-totals{display:grid;
grid-template-columns:repeat(4,
minmax(0,
1fr));
gap:12px;
margin:18px 0}

.ledger-total{position:relative;
padding:18px 16px 17px;
overflow:hidden;
border:1px solid #decdaa;
border-radius:15px;
background:linear-gradient(125deg,
#f7f5f0f2,
#dcddecf0);
outline:1px solid #ffffff66;
outline-offset:-4px}

.ledger-total-top{display:flex;
align-items:center;
gap:9px;
font-size:14px;
color:#5b647a}

.ledger-icon{display:block;
width:30px;
height:30px;
flex-shrink:0}

.ledger-total-value{font:33px "tttgbnumber",
serif;
margin-top:12px;
letter-spacing:-.5px;
white-space:nowrap}

.ledger-total small{display:block;
font:6px Arial;
letter-spacing:1.5px;
color:#9092a2;
margin-top:8px}

.ledger-heading{font:23px "tttgbnumber",
"SimSun",
serif;
color:#f2e7d0;
letter-spacing:2px;
margin:24px 9px 15px;
display:flex;
align-items:center;
gap:12px}

.ledger-heading:before{content:"◆";
color:#d7b779;
font:14px serif}

.ledger-heading small{font:7px Arial;
letter-spacing:3px;
color:#c6c6d3}

.ledger-grid{display:grid;
grid-template-columns:repeat(2,
minmax(0,
1fr));
gap:16px;
align-items:start}

.ledger-panel{min-width:0;
padding:20px;
border:1px solid #e0cda5;
border-radius:19px;
outline:1px solid #ffffff66;
outline-offset:-5px;
background:linear-gradient(125deg,
#f6f3f0ef,
#dfe0ebef);
box-shadow:0 5px 18px #171c3433}

.ledger-panel-head{display:flex;
justify-content:space-between;
align-items:center;
gap:12px;
padding-bottom:14px;
margin-bottom:15px;
border-bottom:1px solid #b6b7c988}

.ledger-panel-name{font:22px "tttgbnumber",
"SimSun",
serif;
color:#37425a}

.ledger-panel-name small{font:7px Arial;
letter-spacing:2px;
color:#8b8d9f;
display:block;
margin-top:8px}

.ledger-panel-total{font:25px "tttgbnumber",
serif;
white-space:nowrap}

.ledger-table-head{display:flex;
justify-content:space-between;
color:#85899d;
font-size:10px;
margin:0 0 13px}

.ledger-sources{display:grid;
gap:12px}

.ledger-row-text{display:grid;
grid-template-columns:minmax(0,
1fr) 100px 55px;
gap:8px;
align-items:center;
font-size:12px}

.ledger-source-name{overflow-wrap:anywhere;
color:#5a637a}

.ledger-source-num{text-align:right;
color:#3e4860;
font-weight:600;
font-variant-numeric:tabular-nums}

.ledger-source-share{text-align:right;
font-size:11px;
color:#7b8196;
font-variant-numeric:tabular-nums}

.ledger-track{height:4px;
background:#bec2d277;
border-radius:8px;
margin-top:7px;
overflow:hidden}

.ledger-track i{display:block;
height:100%;
border-radius:8px;
min-width:0;
opacity:.85}

.ledger-row.zero .ledger-source-name,
.ledger-row.zero .ledger-source-num,
.ledger-row.zero .ledger-source-share{color:#9a9daf}

.ledger-empty{padding:22px 10px;
text-align:center;
color:#7d8499;
font-size:14px;
line-height:1.8}

.ledger-discrepancy{margin-top:12px;
border-top:1px solid #b9bbcc66;
padding-top:10px;
font-size:10px;
color:#8a7c64;
line-height:1.8}

.ledger-memo{margin-top:18px;
border-left:2px solid #c8aa71;
padding:12px 18px;
background:#30364cb8;
border-radius:0 10px 10px 0;
color:#d8d2c5;
font-size:12px;
line-height:1.8}

.ledger-memo span{display:block;
font:8px Arial;
letter-spacing:3px;
color:#d9bd82;
margin-bottom:5px}

.ledger-navigation{margin-top:17px;
padding:14px 18px;
border:1px solid #ceb99488;
border-radius:12px;
background:#30364ccc;
color:#d6cbb8;
font-size:12px;
line-height:1.9}

.ledger-navigation b{color:#efd69f;
font-weight:500}

.ledger-navigation span{display:inline-block;
margin-right:16px}

.ledger-footer{margin-top:18px;
padding:13px 17px;
border:1px solid #c5aa7788;
border-radius:11px;
background:#2b3147d9;
color:#e5d7b8;
display:flex;
justify-content:space-between;
font-size:12px}

.ledger-footer small{font-size:10px;
color:#bdc0d1}

`;

function amount(value: unknown): number | null {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function number(value: unknown) {
  const parsed = amount(value);

  return parsed === null ? '未返回' : parsed.toLocaleString('zh-CN');
}

function ResourceIcon({ type, color }: { type: number; color: string }) {
  return (
    <svg className='ledger-icon' viewBox='0 0 40 40' fill='none' style={{ color }} aria-hidden='true'>
      {type === 2 ? (
        <>
          <path d='m20 2 5 12 13 6-13 5-5 13-5-13L2 20l13-6Z' fill='currentColor' opacity='.25' />
          <path d='m20 2 5 12 13 6-13 5-5 13-5-13L2 20l13-6Z' stroke='currentColor' />
          <path d='m20 10 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z' fill='currentColor' />
        </>
      ) : type === 1 ? (
        <>
          <circle cx='20' cy='20' r='16' stroke='currentColor' strokeWidth='2' />
          <circle cx='20' cy='20' r='12' fill='currentColor' opacity='.2' />
          <path d='m10 21 5-6 5 10 5-10 5 6M20 8v4m0 16v4' stroke='currentColor' strokeWidth='2' />
        </>
      ) : (
        <>
          <path d='m8 6 27 7-6 24L2 30Z' fill='currentColor' opacity='.2' />
          <path d='m11 3 26 7-7 27-26-7Z' stroke='currentColor' strokeWidth='1.5' />
          <path d='m22 11 3 7 6 4-8 2-5 6-1-8-5-5 7-1Z' fill='currentColor' />
        </>
      )}
    </svg>
  );
}

export default function PeriodCard({ data }: PeriodCardProps) {
  const detail = data.detail ?? {};
  const items = (Array.isArray(detail.itemList) ? detail.itemList : []).filter((item): item is PeriodDetailItem => !!item && amount(item.type) !== null);
  const types = [...new Set([2, 1, 3, 4, ...items.map(item => item.type)])];
  const resources = types.map(type => {
    const item = items.find(candidate => candidate.type === type);
    const fallbackTotal = type === 2 ? detail.totalStar : type === 1 ? detail.totalCoin : undefined;
    const fallbackSources = type === 2 ? detail.starList : type === 1 ? detail.coinList : [];
    const rawSources = item?.detail ?? fallbackSources;
    const sources = (Array.isArray(rawSources) ? rawSources : []).filter((node): node is PeriodNode => !!node);
    const sorted = [...sources].sort((a, b) => (amount(b.num) ?? -1) - (amount(a.num) ?? -1));
    const total = amount(item?.total) ?? amount(fallbackTotal);
    const sourceSum = sources.length && sources.every(node => amount(node.num) !== null) ? sources.reduce((sum, node) => sum + node.num!, 0) : null;

    return { type, ...(RESOURCES[type] ?? { name: `资源 ${type}`, color: '#85899e', english: 'RESOURCE' }), total, sources: sorted, sourceSum };
  });
  const month = data.periodType === 'month' ? selectMonth([{ index: data.periodIndex ?? NaN, title: data.periodTitle }]) : null;
  const monthLabel = month ? `${Math.floor(month.index / 100)}年${month.index % 100}月` : data.periodTitle;
  const historyExample = selectMonth(data.availableMonths?.filter(item => item?.index !== month?.index)) ?? month;

  return (
    <HTML style={{ width: '1000px' }}>
      <main className='ledger'>
        <style>{CSS}</style>
        <img className='ledger-bg' src={BACKGROUND} alt='' />
        <div className='ledger-content'>
          <div className='ledger-brand'>
            ✦ 鸣潮助手<small>WUTHERING WAVES ASSISTANT</small>
          </div>
          <h1 className='ledger-title'>
            资源月报<small>RESOURCE LEDGER · MONTHLY INCOME</small>
          </h1>
          <section className='ledger-profile'>
            <div>
              <div className='ledger-month'>{monthLabel || '统计周期未返回'}</div>
              <span className='ledger-uid'>UID · {data.uid}</span>
            </div>
            <div className='ledger-profile-note'>
              <strong>本期资源收入</strong>仅统计所选周期内的获取量
              <br />
              不代表当前持有数量
            </div>
          </section>
          <div className='ledger-totals'>
            {resources.map(resource => (
              <div className='ledger-total' key={resource.type}>
                <div className='ledger-total-top'>
                  <ResourceIcon type={resource.type} color={resource.color} />
                  {resource.name}
                </div>
                <div className='ledger-total-value' style={{ color: resource.color }}>
                  {number(resource.total)}
                </div>
                <small>{resource.english}</small>
              </div>
            ))}
          </div>
          <h2 className='ledger-heading'>
            收入来源<small>INCOME BREAKDOWN</small>
          </h2>
          <div className='ledger-grid'>
            {resources.map(resource => (
              <section className='ledger-panel' key={resource.type}>
                <header className='ledger-panel-head'>
                  <div className='ledger-panel-name'>
                    {resource.name}
                    <small>{resource.english}</small>
                  </div>
                  <div className='ledger-panel-total' style={{ color: resource.color }}>
                    {number(resource.total)}
                  </div>
                </header>
                {resource.sources.length ? (
                  <>
                    <div className='ledger-table-head'>
                      <span>来源</span>
                      <span>获取数量 / 占比</span>
                    </div>
                    <div className='ledger-sources'>
                      {resource.sources.map((source, i) => {
                        const value = amount(source.num);
                        const share = value !== null && resource.total !== null && resource.total > 0 ? (value / resource.total) * 100 : null;

                        return (
                          <div className={`ledger-row${value === 0 ? ' zero' : ''}`} key={i}>
                            <div className='ledger-row-text'>
                              <span className='ledger-source-name'>{source.type || '未命名来源'}</span>
                              <span className='ledger-source-num'>{number(value)}</span>
                              <span className='ledger-source-share'>{share === null ? '—' : `${share.toFixed(1)}%`}</span>
                            </div>
                            {share !== null && (
                              <div className='ledger-track'>
                                <i style={{ width: `${Math.min(100, share)}%`, background: resource.color }} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {resource.sourceSum !== null && resource.total !== null && resource.sourceSum !== resource.total && (
                      <div className='ledger-discrepancy'>来源明细与总量不完全一致，占比按本期总量计算。</div>
                    )}
                  </>
                ) : (
                  <div className='ledger-empty'>来源明细暂未返回</div>
                )}
              </section>
            ))}
          </div>
          {typeof detail.copyWriting === 'string' && detail.copyWriting.trim() && (
            <div className='ledger-memo'>
              <span>THIS PERIOD · 本期小记</span>
              {detail.copyWriting}
            </div>
          )}
          <div className='ledger-navigation'>
            默认查询最新可用月份 · 指定月份：<b>#mc星声 {historyExample?.index ?? '年月'}</b> 或{' '}
            <b>#mc星声 {historyExample ? `${historyExample.index % 100}月` : '月份'}</b>
            {!!data.availableMonths?.length && (
              <div>
                可用月份：
                {data.availableMonths
                  .filter(item => !!item)
                  .map(item => (
                    <span key={item.index}>
                      {item.title} <b>#mc星声 {item.index}</b>
                    </span>
                  ))}
              </div>
            )}
          </div>
          <footer className='ledger-footer'>
            <span>✦ #mc星声 · 资源月报</span>
            <small>鸣潮助手 · 以库街区返回数据为准</small>
          </footer>
        </div>
      </main>
    </HTML>
  );
}
