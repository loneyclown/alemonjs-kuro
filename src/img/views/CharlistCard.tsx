import type { AccountBaseInfo, RoleData } from '@src/model/types';
import HELP_BACKGROUND from '@src/assets/img/help/rover-background.png';
import React from 'react';
import HTML from './HTML';

interface CharlistCardProps {
  data: { uid: string; base: AccountBaseInfo; roles: RoleData[]; headUrl?: string };
}

const STYLES = `
.roster{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#1b202a;
color:#f7f4ec;
font-family:"Microsoft YaHei",
sans-serif;
text-align:left}
.roster *{box-sizing:border-box}
.roster-scene{position:absolute;
inset:0;
width:100%;
height:940px;
object-fit:fill;
opacity:.5}
.roster-hero{position:relative;
height:206px;
padding:26px 46px;
background:linear-gradient(90deg,
rgba(17,
22,
31,
.8),
transparent)}
.roster-brand{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:30px;
letter-spacing:5px}
.roster-brand small{font-family:Arial,
sans-serif;
font-size:9px;
letter-spacing:3px;
color:#c8ad7f;
margin-left:24px}
.roster-heading{display:flex;
align-items:center;
gap:20px;
margin-top:21px}
.roster-heading h1{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:56px;
font-style:italic;
letter-spacing:4px;
color:#f3e1c1;
margin:0;
line-height:1.1}
.roster-tag{padding:6px 22px;
background:#e6d1ac;
color:#1a1d25;
font-size:20px;
font-weight:bold;
clip-path:polygon(10px 0,
100% 0,
calc(100% - 10px) 100%,
0 100%)}
.roster-subtitle{font-size:9px;
letter-spacing:5px;
color:#d3c4ab;
margin-top:15px}
.roster-panel{position:relative;
margin:0 22px;
padding:24px;
background:rgba(18,
22,
30,
.92);
border:1px solid #bba17b;
outline:1px solid #575b62;
outline-offset:-6px;
clip-path:polygon(20px 0,
calc(100% - 20px) 0,
100% 20px,
100% calc(100% - 20px),
calc(100% - 20px) 100%,
20px 100%,
0 calc(100% - 20px),
0 20px)}
.roster-account{display:flex;
align-items:center;
gap:16px;
padding:0 8px 22px;
border-bottom:1px solid #635b4e}
.roster-avatar{position:relative;
flex-shrink:0;
width:64px;
height:64px;
border:1px solid #c9ad80;
background:#333944;
display:flex;
align-items:center;
justify-content:center;
color:#dec08d;
font-size:30px;
overflow:hidden}
.roster-avatar img{position:absolute;
width:100%;
height:100%;
object-fit:cover}
.roster-name{max-width:490px;
overflow-wrap:anywhere;
font-size:26px;
font-weight:700;
line-height:1.3}
.roster-uid{font:14px Arial,
sans-serif;
letter-spacing:2px;
color:#b9bdc4;
margin-top:7px}
.roster-level{margin-left:auto;
color:#e8d0a8;
text-align:right;
font-size:16px;
white-space:nowrap}
.roster-level strong{font:38px Georgia,
serif;
margin-left:8px}
.roster-world{font-size:13px;
color:#adb1b9;
margin-top:3px}
.roster-stats{display:flex;
gap:12px;
margin:20px 0 24px}
.roster-stat{flex:1;
border-left:2px solid #c9ad80;
padding:8px 16px;
background:linear-gradient(90deg,
rgba(207,
181,
137,
.1),
transparent);
display:flex;
align-items:baseline;
gap:12px}
.roster-stat strong{font:32px Georgia,
serif;
color:#ebd1a4}
.roster-stat span{font-size:15px;
color:#c4c6cc}
.roster-section{display:flex;
align-items:center;
gap:14px;
margin-bottom:16px;
color:#eee7da}
.roster-section b{font:italic bold 27px Georgia,
serif;
color:#d7b784}
.roster-section h2{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:25px;
letter-spacing:3px;
margin:0}
.roster-section:after{content:"";
height:1px;
flex:1;
background:linear-gradient(90deg,
#baa17b,
transparent)}
.roster-sort{font-size:12px;
color:#aaaeb8;
margin-bottom:14px}
.roster-grid{display:grid;
grid-template-columns:repeat(5,
minmax(0,
1fr));
gap:12px}
.roster-role{--rarity:#d2b581;
position:relative;
padding:12px 10px;
background:linear-gradient(145deg,
#353b47,
#222732);
border:1px solid #59616f;
border-top:2px solid var(--rarity);
clip-path:polygon(9px 0,
calc(100% - 9px) 0,
100% 9px,
100% calc(100% - 9px),
calc(100% - 9px) 100%,
9px 100%,
0 calc(100% - 9px),
0 9px)}
.roster-portrait{position:relative;
height:88px;
width:88px;
margin:0 auto 10px;
background:radial-gradient(ellipse at bottom,
#6b625b,
rgba(26,
31,
41,
.3));
border-bottom:1px solid var(--rarity);
display:flex;
align-items:center;
justify-content:center;
color:#d3c3a6;
font-family:"tttgbnumber",
"SimSun",
serif;
font-size:44px;
overflow:hidden}
.roster-portrait img{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:contain}
.roster-chain{position:absolute;
right:8px;
top:10px;
background:rgba(17,
21,
28,
.9);
border:1px solid #737074;
color:#f0debc;
padding:2px 5px;
font-size:12px}
.roster-role-name{font-size:18px;
font-weight:bold;
line-height:1.3;
text-align:center;
overflow-wrap:anywhere}
.roster-role-info{display:flex;
justify-content:space-between;
align-items:center;
margin-top:9px;
font-size:13px;
color:#c4c7ce;
gap:4px}
.roster-role-level{display:inline-block;
border-radius:14px;
padding:3px 9px;
background:linear-gradient(100deg,
#f0dfbb,
#d9bc90);
color:#19202b;
font:700 14px Arial,
sans-serif;
white-space:nowrap}
.roster-rarity{font-size:10px;
color:var(--rarity);
text-align:center;
letter-spacing:3px;
margin-top:5px}
.roster-empty{padding:50px 20px;
text-align:center;
color:#c7c9d0;
border:1px dashed #6e685b;
line-height:2;
font-size:17px}
.roster-footer{position:relative;
padding:24px 46px 28px;
display:flex;
justify-content:space-between;
align-items:center;
color:#d5cbb9;
font-size:13px;
gap:18px}
.roster-footer code{color:#edd2a6;
font-family:inherit}
`;

export default function CharlistCard({ data }: CharlistCardProps) {
  const { uid, base, roles, headUrl } = data;
  const sorted = [...roles].sort((a, b) => b.starLevel - a.starLevel || b.level - a.level || a.roleId - b.roleId);
  const fiveStars = roles.filter(role => role.starLevel === 5).length;
  const fourStars = roles.filter(role => role.starLevel === 4).length;

  return (
    <HTML style={{ width: '1000px', margin: 0 }}>
      <style>{STYLES}</style>
      <main className='roster'>
        <img className='roster-scene' src={HELP_BACKGROUND} alt='' />
        <header className='roster-hero'>
          <div className='roster-brand'>
            鸣潮 <small>WUTHERING WAVES</small>
          </div>
          <div className='roster-heading'>
            <h1>共鸣者档案</h1>
            <span className='roster-tag'>角色练度</span>
          </div>
          <div className='roster-subtitle'>RESONATOR COLLECTION / ROVER ARCHIVE</div>
        </header>
        <section className='roster-panel'>
          <div className='roster-account'>
            <div className='roster-avatar'>
              {base.name?.[0] ?? '漂'}
              {headUrl && <img src={headUrl} alt='' />}
            </div>
            <div>
              <div className='roster-name'>{base.name || '漂泊者'}</div>
              <div className='roster-uid'>UID / {uid}</div>
            </div>
            <div className='roster-level'>
              联觉等级<strong>{base.level}</strong>
              <div className='roster-world'>索拉等级 · {base.worldLevel ?? base.bigWorldLevel ?? '—'}</div>
            </div>
          </div>
          <div className='roster-stats'>
            {[
              ['已收录', roles.length],
              ['五星共鸣者', fiveStars],
              ['四星共鸣者', fourStars]
            ].map(([label, value]) => (
              <div className='roster-stat' key={label}>
                <strong>{String(value).padStart(2, '0')}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <div className='roster-section'>
            <b>01</b>
            <h2>共鸣者一览</h2>
          </div>
          <div className='roster-sort'>按星级、等级排序 · 数量以本次返回的角色列表为准</div>
          {sorted.length ? (
            <div className='roster-grid'>
              {sorted.map(role => (
                <article className='roster-role' key={role.roleId} style={{ '--rarity': role.starLevel === 5 ? '#d2b581' : '#b59bce' } as React.CSSProperties}>
                  <div className='roster-portrait'>{role.roleIconUrl ? <img src={role.roleIconUrl} alt={role.roleName} /> : (role.roleName?.[0] ?? '？')}</div>
                  <span className='roster-chain'>{role.chainUnlockNum ?? 0} 链</span>
                  <div className='roster-role-name'>{role.roleName}</div>
                  <div className='roster-rarity'>{'★'.repeat(Math.max(0, Math.min(5, role.starLevel)))}</div>
                  <div className='roster-role-info'>
                    <span className='roster-role-level'>Lv.{role.level}</span>
                    <span>{role.attributeName ?? '—'}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className='roster-empty'>
              暂未获取到共鸣者数据
              <br />
              请确认库街区角色展示设置后，发送 #mc刷新面板 重试
            </div>
          )}
        </section>
        <footer className='roster-footer'>
          <span>
            ✦ <code>#mc查询 角色名</code> 查看详细面板
          </span>
          <span>鸣潮助手 · WUTHERING WAVES</span>
        </footer>
      </main>
    </HTML>
  );
}
