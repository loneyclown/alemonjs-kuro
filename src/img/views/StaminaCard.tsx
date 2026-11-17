import type { AccountBaseInfo, DailyData, DailyWidget } from '@src/model/types';
import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import React from 'react';
import HTML from './HTML';

interface StaminaCardProps {
  data: { uid: string; daily: DailyData; base: AccountBaseInfo; headUrl?: string };
}

const STYLES = `
.daily-sheet{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#c8cbdc;
color:#303448;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}
.daily-sheet *{box-sizing:border-box}
.daily-background{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill}
.daily-outline{position:absolute;
inset:78px 16px 16px;
border:1px solid #e2c58f;
border-radius:35px;
box-shadow:inset 0 0 0 4px rgba(255,
255,
255,
.15);
pointer-events:none}
.daily-brand{position:relative;
padding:22px 43px 0;
color:#f5eddd;
font-family:"tttgbnumber",
"SimSun",
serif;
font-size:27px;
letter-spacing:4px;
line-height:1.2}
.daily-brand span{color:#e4c995;
margin-right:12px}
.daily-brand small{display:block;
font:7px Arial,
sans-serif;
letter-spacing:5px;
margin:8px 0 0 43px;
color:#e5d9c4}
.daily-profile{position:relative;
display:flex;
align-items:center;
gap:26px;
height:152px;
margin:0 48px;
color:#f7f0e5}
.daily-avatar{position:relative;
display:flex;
align-items:center;
justify-content:center;
width:108px;
height:108px;
flex-shrink:0;
border-radius:50%;
border:3px solid #e2c88d;
box-shadow:0 0 0 5px rgba(232,
220,
184,
.18),
0 0 22px rgba(234,
204,
143,
.22);
overflow:hidden;
background:#55526b;
font-family:"tttgbnumber",
"SimSun",
serif;
font-size:42px}
.daily-avatar img{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:cover}
.daily-user{border-left:1px solid #d1bc96;
padding-left:26px;
max-width:600px}
.daily-user h1{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:38px;
letter-spacing:3px;
line-height:1.2;
margin:0 0 11px;
overflow-wrap:anywhere;
text-shadow:0 2px 6px #242637}
.daily-uid{display:inline-block;
font:17px Arial,
sans-serif;
letter-spacing:1px;
border:1px solid #b7aeac;
border-radius:20px;
padding:5px 18px;
background:rgba(71,
72,
94,
.4)}
.daily-levels{margin-top:9px;
font-size:12px;
letter-spacing:1px;
color:#e5dac9}
.daily-panel{position:relative;
margin:0 28px;
padding:21px 25px 24px;
border:1px solid #eee5d5;
border-radius:24px;
background:linear-gradient(120deg,
rgba(245,
246,
253,
.83),
rgba(230,
231,
246,
.86));
box-shadow:inset 0 0 0 5px rgba(255,
255,
255,
.27),
0 10px 24px rgba(44,
48,
74,
.18)}
.daily-heading{display:flex;
align-items:center;
gap:11px;
margin-bottom:18px;
font-family:"tttgbnumber",
"SimSun",
serif;
font-size:25px;
letter-spacing:2px}
.daily-heading small{font:8px Arial,
sans-serif;
letter-spacing:5px;
color:#777b90}
.daily-heading:before{content:"✦";
color:#b99151}
.daily-heading:after{content:"";
height:1px;
flex:1;
margin-left:8px;
background:linear-gradient(90deg,
#b99c65,
transparent)}
.daily-resources{display:grid;
grid-template-columns:repeat(3,
minmax(0,
1fr));
gap:12px;
margin-bottom:17px}
.daily-resource{padding:1px;
--cut:polygon(17px 0,
calc(100% - 17px) 0,
100% 17px,
100% calc(100% - 17px),
calc(100% - 17px) 100%,
17px 100%,
0 calc(100% - 17px),
0 17px);
clip-path:var(--cut);
background:linear-gradient(135deg,
#c3a876,
#fff 23%,
#fbf8f0 70%,
#bea16b)}
.daily-resource-inner{display:flex;
align-items:center;
gap:12px;
height:141px;
padding:15px 11px;
clip-path:var(--cut);
background:linear-gradient(140deg,
#f1f1fa,
#e2e3ef)}
.daily-orbit{position:relative;
display:flex;
align-items:center;
justify-content:center;
width:73px;
height:73px;
border:1px solid #bfc1d4;
border-radius:50%;
box-shadow:0 0 0 7px rgba(255,
255,
255,
.25),
0 0 0 9px rgba(205,
204,
218,
.5);
flex-shrink:0}
.daily-orbit:after{content:"";
position:absolute;
inset:-8px;
border:1px dashed rgba(177,
156,
116,
.65);
border-radius:50%}
.daily-orbit img{width:52px;
height:52px;
object-fit:contain;
filter:drop-shadow(0 3px 5px rgba(45,
50,
70,
.2))}
.daily-resource-text{min-width:0}
.daily-resource-name{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:20px;
letter-spacing:1px;
white-space:nowrap;
margin-bottom:6px}
.daily-number{font-family:Georgia,
"Microsoft YaHei",
serif;
font-size:35px;
font-weight:700;
color:#b38a42;
line-height:1.2;
white-space:nowrap}
.daily-number small{font-size:23px;
color:#53566e}
.daily-value-text{font-size:16px;
color:#777b8e;
line-height:1.5}
.daily-resource-note{font-size:11px;
line-height:1.7;
color:#7f7f8f;
margin-top:7px}
.daily-radio{display:flex;
flex-direction:column;
gap:10px;
margin-bottom:21px}
.daily-row{display:flex;
align-items:center;
gap:18px;
padding:13px 18px;
border:1px solid #f6f3ed;
border-radius:10px;
background:linear-gradient(110deg,
rgba(252,
252,
255,
.65),
rgba(215,
219,
236,
.55))}
.daily-row-icon{width:40px;
height:40px;
flex-shrink:0;
transform:rotate(45deg);
border:1px solid #b49b72;
box-shadow:0 0 0 3px rgba(244,
240,
229,
.7);
background:#676b80;
display:flex;
align-items:center;
justify-content:center;
color:#f2dbb0;
margin:2px 8px}
.daily-row-icon svg{width:26px;
height:26px;
transform:rotate(-45deg)}
.daily-row-body{flex:1;
min-width:0}
.daily-row-top{display:flex;
align-items:center;
justify-content:space-between;
gap:15px}
.daily-row-name{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:21px;
letter-spacing:2px}
.daily-row-top .daily-number{font-size:27px}
.daily-row-caption{font-size:11px;
color:#868899;
margin-right:13px}
.daily-bar{height:8px;
margin-top:10px;
border:1px solid #b9bbcd;
box-shadow:inset 0 1px 3px rgba(74,
75,
100,
.22);
background:#adafc2;
border-radius:10px;
overflow:hidden}
.daily-bar-fill{height:100%;
border-radius:8px;
background:repeating-linear-gradient(125deg,
transparent 0 9px,
rgba(255,
255,
255,
.4) 10px 13px),
linear-gradient(90deg,
#edd391,
#e6bd74);
box-shadow:0 0 6px rgba(232,
199,
135,
.5)}
.daily-section-small{font-size:20px;
margin-bottom:13px}
.daily-weekly-grid{display:grid;
grid-template-columns:repeat(3,
minmax(0,
1fr));
gap:11px}
.daily-task{min-width:0;
padding:13px;
border:1px solid #c3c3d4;
border-radius:10px;
background:rgba(249,
249,
255,
.38)}
.daily-task-head{display:flex;
align-items:center;
gap:9px;
font-size:14px;
font-weight:600;
line-height:1.4;
min-height:34px}
.daily-task-head img{width:30px;
height:30px;
object-fit:contain;
flex-shrink:0}
.daily-task-value{display:flex;
align-items:baseline;
justify-content:space-between;
gap:8px;
margin:8px 0 0}
.daily-task-value .daily-number{font-size:24px}
.daily-task-value .daily-number small{font-size:17px}
.daily-task-hint{font-size:10px;
color:#7c8094;
line-height:1.5;
max-width:105px}
.daily-task .daily-value-text{font-size:13px}
.daily-activity{display:flex;
align-items:center;
justify-content:space-between;
gap:14px;
margin-top:15px;
padding:12px 14px;
border:1px solid #c0b8ca;
border-radius:8px;
background:rgba(235,
231,
243,
.65);
font-size:13px}
.daily-activity-label{font-size:10px;
letter-spacing:2px;
color:#8e7854;
margin-bottom:5px}
.daily-activity-end{font-size:11px;
color:#78778d;
white-space:nowrap}
.daily-empty{font-size:13px;
color:#828498;
padding:10px 0}
.daily-footer{position:relative;
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
margin:15px 29px 25px;
padding:13px 19px;
border:1px solid #cdb98e;
border-radius:10px;
color:#f4e9d2;
background:rgba(48,
53,
75,
.85);
font-size:13px}
.daily-footer small{font-size:10px;
color:#ded8cf}
`;

function available(item?: DailyWidget | null): boolean {
  return !!item && (item.status ?? 0) === 0 && !item.value?.trim();
}

function Value({ item, level = false }: { item?: DailyWidget | null; level?: boolean }) {
  if (!item) {
    return <span className='daily-value-text'>未返回数据</span>;
  }
  if (!available(item)) {
    return <span className='daily-value-text'>{item.value?.trim() ? item.value : '暂无数据'}</span>;
  }
  if (!Number.isFinite(item.cur)) {
    return <span className='daily-value-text'>暂无数据</span>;
  }
  if (level) {
    return (
      <span className='daily-number'>
        <small>Lv.</small>
        {item.cur}
      </span>
    );
  }
  if (item.total <= 0 && item.cur === 0) {
    return <span className='daily-value-text'>暂无进度</span>;
  }

  return (
    <span className='daily-number'>
      {item.cur}
      {item.total > 0 && <small>/{item.total}</small>}
    </span>
  );
}

function Progress({ item }: { item?: DailyWidget | null }) {
  if (!item || !available(item) || item.total <= 0 || !Number.isFinite(item.cur) || !Number.isFinite(item.total)) {
    return null;
  }
  const percent = Math.max(0, Math.min(100, (item.cur / item.total) * 100));

  return (
    <div className='daily-bar'>
      <div className='daily-bar-fill' style={{ width: `${percent}%` }} />
    </div>
  );
}

function recovery(item?: DailyWidget | null) {
  if (!item || !available(item)) {
    return '恢复时间未返回';
  }
  if (item.total > 0 && item.cur >= item.total) {
    return '已达上限';
  }
  if (!item.refreshTimeStamp || item.refreshTimeStamp <= 0) {
    return '暂无恢复倒计时';
  }
  const minutes = Math.ceil((item.refreshTimeStamp - Date.now() / 1000) / 60);

  if (minutes <= 0) {
    return '预计已恢复，请刷新确认';
  }
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const remainder = minutes % 60;

  return `距回满 ${days ? `${days}天` : ''}${hours ? `${hours}小时` : ''}${remainder}分钟`;
}

function dateTime(timestamp: number, short = false) {
  return new Date(timestamp * 1000).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    ...(short ? {} : { year: 'numeric' })
  });
}

function LineIcon({ book = false }: { book?: boolean }) {
  return (
    <svg viewBox='0 0 32 32' fill='none' stroke='currentColor' strokeWidth='1.6' aria-hidden='true'>
      {book ? (
        <path d='M16 8 C11 5 6 5 3 6 V25 C8 23 12 24 16 27 C20 24 25 23 29 25 V6 C24 5 20 5 16 8 Z M16 8 V27' />
      ) : (
        <>
          <path d='M16 9 L10 27 H22 Z M8 7 C3 12 3 18 8 23 M24 7 C29 12 29 18 24 23 M11 10 C8 13 8 17 11 20 M21 10 C24 13 24 17 21 20' />
          <circle cx='16' cy='8' r='2.5' />
        </>
      )}
    </svg>
  );
}

function ResourceIcon({ item, color }: { item?: DailyWidget | null; color: string }) {
  return (
    <div className='daily-orbit'>
      {item?.img ? (
        <img src={item.img} alt='' />
      ) : (
        <svg width='45' height='45' viewBox='0 0 48 48' aria-hidden='true'>
          <path d='M9 4 H39 L45 13 L39 44 H9 L3 35 Z' fill={color} stroke='#fff' strokeWidth='2' />
          <path d='M9 4 L15 13 H35 L39 44 M3 35 L15 13 M35 13 L39 4' fill='none' stroke='#fff' strokeOpacity='.6' />
        </svg>
      )}
    </div>
  );
}

export default function StaminaCard({ data }: StaminaCardProps) {
  const { daily, base, uid, headUrl } = data;
  const resources = [
    { item: daily.energyData, name: '结晶波片', color: '#24b6cb', note: recovery(daily.energyData) },
    { item: daily.storeEnergyData, name: '结晶单质', color: '#56b16d', note: recovery(daily.storeEnergyData) },
    { item: daily.livenessData, name: '活跃度', color: '#d1a25b', note: '每日活跃进度' }
  ];
  const battlePass = daily.battlePassData?.filter((item): item is DailyWidget => !!item) ?? [];
  const tasks = [
    { item: daily.weeklyData, name: '战歌重奏', hint: '剩余领奖次数' },
    { item: daily.weeklyRougeData, name: '千道门扉的异想', hint: '本期积分' },
    { item: daily.weeklyFrameData, name: '周度游历', hint: '本周进度' },
    { item: daily.towerData, name: '逆境深塔', hint: '本期进度' },
    { item: daily.slashTowerData, name: '冥歌海墟', hint: '本期进度' },
    { item: daily.newTowerData, name: '终焉矩阵', hint: '本期进度' }
  ].filter(task => task.item);
  const activity = daily.activityData;

  return (
    <HTML style={{ width: '1000px', margin: 0 }}>
      <style>{STYLES}</style>
      <main className='daily-sheet'>
        <img className='daily-background' src={BACKGROUND} alt='' />
        <div className='daily-outline' />
        <header className='daily-brand'>
          <span>✦</span>鸣潮助手<small>WUTHERING WAVES ASSISTANT</small>
        </header>
        <div className='daily-profile'>
          <div className='daily-avatar'>
            {base.name?.[0] ?? '漂'}
            {headUrl && <img src={headUrl} alt='' />}
          </div>
          <div className='daily-user'>
            <h1>{base.name}</h1>
            <div className='daily-uid'>特征码：{uid}</div>
            <div className='daily-levels'>
              联觉等级 {base.level} · 索拉等级 {base.worldLevel ?? base.bigWorldLevel ?? '—'}
            </div>
          </div>
        </div>
        <section className='daily-panel'>
          <h2 className='daily-heading'>
            日常数据<small>DAILY STATUS</small>
          </h2>
          <div className='daily-resources'>
            {resources.map(resource => (
              <div className='daily-resource' key={resource.name}>
                <div className='daily-resource-inner'>
                  <ResourceIcon item={resource.item} color={resource.color} />
                  <div className='daily-resource-text'>
                    <div className='daily-resource-name'>{resource.item?.name ?? resource.name}</div>
                    <Value item={resource.item} />
                    <div className='daily-resource-note'>{resource.note}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='daily-radio'>
            {battlePass.length ? (
              battlePass.map((item, i) => {
                const isLevel = item.name?.includes('等级') ?? false;

                return (
                  <div className='daily-row' key={i}>
                    <div className='daily-row-icon'>
                      <LineIcon book={!isLevel} />
                    </div>
                    <div className='daily-row-body'>
                      <div className='daily-row-top'>
                        <span className='daily-row-name'>{item.name ?? '电台进度'}</span>
                        <div>
                          <span className='daily-row-caption'>{isLevel ? '当前等级' : '当前进度'}</span>
                          <Value item={item} level={isLevel} />
                        </div>
                      </div>
                      {!isLevel && <Progress item={item} />}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='daily-empty'>电台数据暂未返回</div>
            )}
          </div>
          {!!tasks.length && (
            <>
              <h2 className='daily-heading daily-section-small'>
                周常与挑战<small>WEEKLY & CHALLENGES</small>
              </h2>
              <div className='daily-weekly-grid'>
                {tasks.map(({ item, name, hint }) => (
                  <article className='daily-task' key={name}>
                    <div className='daily-task-head'>
                      {item?.img && <img src={item.img} alt='' />}
                      <span>{item?.name ?? name}</span>
                    </div>
                    <div className='daily-task-value'>
                      <Value item={item} />
                      <span className='daily-task-hint'>{hint}</span>
                    </div>
                    <Progress item={item} />
                  </article>
                ))}
              </div>
            </>
          )}
          {activity?.enabled && activity.title && (
            <div className='daily-activity'>
              <div>
                <div className='daily-activity-label'>CURRENT EVENT · 当前活动</div>
                {activity.title}
              </div>
              {!!activity.endTime && <span className='daily-activity-end'>截至 {dateTime(activity.endTime, true)}</span>}
            </div>
          )}
        </section>
        <footer className='daily-footer'>
          <span>✦ #mc体力 · 实时便笺</span>
          <small>{daily.serverTime ? `数据时间 ${dateTime(daily.serverTime)}` : '以库街区返回的数据为准'}</small>
        </footer>
      </main>
    </HTML>
  );
}
