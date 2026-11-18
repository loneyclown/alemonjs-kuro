import type { MineInfo } from '@src/model/types';
import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import COIN from '@src/assets/img/help/icons/库洛币.png';
import React from 'react';
import HTML from './HTML';

interface CoinCardProps {
  data: { uid: string; mine: MineInfo };
}

const CSS = `
.coin-sheet{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#354058;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}

.coin-sheet *{box-sizing:border-box}

.coin-backdrop{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.66}

.coin-content{position:relative;
padding:28px 24px 24px;
background:linear-gradient(180deg,
#1b203116,
#20273bb3)}

.coin-brand{font:24px "tttgbnumber",
"SimSun",
serif;
letter-spacing:4px;
color:#f3e9d5;
margin:0 15px}

.coin-brand small{display:block;
font:7px Arial;
letter-spacing:4px;
color:#d8c59d;
margin-top:8px}

.coin-title{font:italic 48px "tttgbnumber",
"SimSun",
serif;
letter-spacing:5px;
color:#f4ead7;
margin:23px 15px}

.coin-title small{display:block;
font:8px Arial;
letter-spacing:5px;
color:#d8c59d;
margin-top:10px}

.coin-panel{padding:30px;
border:1px solid #e0cba2;
border-radius:23px;
outline:1px solid #ffffff88;
outline-offset:-5px;
background:linear-gradient(120deg,
#f7f5f1f2,
#dedfeced);
box-shadow:0 6px 20px #151a3433}

.coin-main{display:flex;
align-items:center;
justify-content:space-between;
gap:26px;
min-height:165px;
padding:8px 4px 25px}

.coin-account{display:flex;
align-items:center;
gap:22px;
flex:1;
min-width:0}

.coin-avatar{width:100px;
height:100px;
flex-shrink:0;
border:2px solid #c4a264;
outline:1px solid #ad9d7a77;
outline-offset:4px;
border-radius:50%;
overflow:hidden;
background:linear-gradient(130deg,
#b7b9ca,
#777c96);
display:flex;
align-items:center;
justify-content:center;
font:36px "SimSun",
serif;
color:#f4e8cd}

.coin-avatar img{width:100%;
height:100%;
object-fit:cover}

.coin-account-info{min-width:0}

.coin-account-label{font-size:12px;
color:#858a9e;
letter-spacing:2px;
margin-bottom:10px}

.coin-account-name{font:28px "tttgbnumber",
"SimSun",
serif;
color:#3b465f;
line-height:1.5;
overflow-wrap:anywhere}

.coin-account-tag{display:inline-block;
margin-top:10px;
border:1px solid #b9b4a4;
border-radius:18px;
padding:4px 10px;
color:#988050;
font-size:10px;
letter-spacing:1px}

.coin-balance{position:relative;
min-width:300px;
max-width:390px;
text-align:right;
padding-left:30px;
border-left:1px solid #b6b7c988}

.coin-balance-label{font-size:15px;
letter-spacing:2px;
color:#6f768c;
position:relative}

.coin-balance-value{position:relative;
font:76px "tttgbnumber",
serif;
line-height:1.15;
letter-spacing:1px;
color:#ad8340;
margin-top:12px;
overflow-wrap:anywhere}

.coin-balance-note{font-size:10px;
letter-spacing:3px;
color:#9397a8;
margin-top:7px}

.coin-decoration{position:absolute;
right:100px;
top:-19px;
width:130px;
height:130px;
object-fit:contain;
opacity:.09}

.coin-identities{display:grid;
grid-template-columns:repeat(2,
minmax(0,
1fr));
gap:14px;
border-top:1px solid #b4b7c988;
padding-top:21px}

.coin-identity{display:flex;
justify-content:space-between;
align-items:center;
gap:15px;
padding:13px 17px;
border:1px solid #bdbece;
border-radius:10px;
background:#d8dae76b}

.coin-identity span{font-size:13px;
color:#747c92}

.coin-identity b{font:19px "tttgbnumber",
serif;
color:#3e4a65;
overflow-wrap:anywhere}

.coin-note{margin:18px 1px 0;
padding:12px 17px;
border-left:2px solid #c9ac75;
background:#30364caa;
border-radius:0 10px 10px 0;
font-size:12px;
color:#d9d3c9;
line-height:1.9}

.coin-footer{margin-top:18px;
padding:13px 17px;
border:1px solid #c5aa7788;
border-radius:11px;
background:#2b3147d9;
color:#e5d7b8;
display:flex;
justify-content:space-between;
font-size:12px}

.coin-footer small{font-size:10px;
color:#bdc0d1}

`;

function label(value: unknown) {
  return typeof value === 'string' && value.trim() ? value : typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? String(value) : '未返回';
}

export default function CoinCard({ data }: CoinCardProps) {
  const mine = data.mine;
  const value = mine?.goldNum;
  const balance = typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value.toLocaleString('zh-CN') : '未返回';

  return (
    <HTML style={{ width: '1000px' }}>
      <main className='coin-sheet'>
        <style>{CSS}</style>
        <img className='coin-backdrop' src={BACKGROUND} alt='' />
        <div className='coin-content'>
          <div className='coin-brand'>
            ✦ 鸣潮助手<small>WUTHERING WAVES ASSISTANT</small>
          </div>
          <h1 className='coin-title'>
            库洛币<small>KURO COIN · COMMUNITY POINTS</small>
          </h1>
          <section className='coin-panel'>
            <div className='coin-main'>
              <div className='coin-account'>
                <div className='coin-avatar'>{mine?.headUrl ? <img src={mine.headUrl} alt='' /> : '✦'}</div>
                <div className='coin-account-info'>
                  <div className='coin-account-label'>库街区账号</div>
                  <div className='coin-account-name'>{label(mine?.userName)}</div>
                  <div className='coin-account-tag'>COMMUNITY ACCOUNT</div>
                </div>
              </div>
              <div className='coin-balance'>
                <img className='coin-decoration' src={COIN} alt='' />
                <div className='coin-balance-label'>库洛币余额</div>
                <div className='coin-balance-value' style={balance.length > 10 ? { fontSize: '42px' } : undefined}>
                  {balance}
                </div>
                <div className='coin-balance-note'>KURO COIN BALANCE</div>
              </div>
            </div>
            <div className='coin-identities'>
              <div className='coin-identity'>
                <span>库街区 ID</span>
                <b>{label(mine?.userId)}</b>
              </div>
              <div className='coin-identity'>
                <span>游戏 UID</span>
                <b>{label(data.uid)}</b>
              </div>
            </div>
          </section>
          <div className='coin-note'>库洛币属于库街区账号，是社区积分，不是游戏内贝币；这里展示的是所选游戏账号对应的库街区余额。</div>
          <footer className='coin-footer'>
            <span>✦ #mc库洛币 · 社区积分</span>
            <small>鸣潮助手 · 以库街区返回数据为准</small>
          </footer>
        </div>
      </main>
    </HTML>
  );
}
