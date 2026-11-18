import type { AnnItem } from '@src/model/types';
import { ANN_CATEGORIES, annTimestamp, sortedAnnouncements, type AnnCategory } from '@src/model/announcements';
import BACKGROUND from '@src/assets/img/stamina/lily-background.png';
import React from 'react';
import HTML from './HTML';

interface AnnCardProps {
  data: { activities: AnnItem[]; infos: AnnItem[]; notices: AnnItem[]; category?: AnnCategory };
}

const CSS = `
.news-sheet{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#354058;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}

.news-sheet *{box-sizing:border-box}

.news-backdrop{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.66}

.news-content{position:relative;
padding:28px 24px 24px;
background:linear-gradient(180deg,
#1b203116,
#20273bb3)}

.news-brand{font:24px "tttgbnumber",
"SimSun",
serif;
letter-spacing:4px;
color:#f3e9d5;
margin:0 15px}

.news-brand small{display:block;
font:7px Arial;
letter-spacing:4px;
color:#d8c59d;
margin-top:8px}

.news-title{font:italic 48px "tttgbnumber",
"SimSun",
serif;
letter-spacing:5px;
color:#f4ead7;
margin:23px 15px}

.news-title small{display:block;
font:8px Arial;
letter-spacing:5px;
color:#d8c59d;
margin-top:10px}

.news-panel{padding:20px;
border:1px solid #dfcca5;
border-radius:22px;
outline:1px solid #ffffff77;
outline-offset:-5px;
background:linear-gradient(120deg,
#f6f3eff0,
#dedfeced);
box-shadow:0 5px 18px #151a3433}

.news-heading{display:flex;
align-items:center;
justify-content:space-between;
gap:15px;
padding-bottom:15px;
border-bottom:1px solid #b7bacb99;
margin-bottom:18px}

.news-heading h2{font:24px "tttgbnumber",
"SimSun",
serif;
letter-spacing:2px;
color:#3b465e;
margin:0}

.news-heading h2:before{content:"◆";
font:14px serif;
color:#b68e4c;
margin-right:10px}

.news-heading span{font-size:11px;
color:#81869b;
white-space:nowrap}

.news-feature{display:grid;
grid-template-columns:360px minmax(0,
1fr);
border:1px solid #b8b6c8;
border-radius:15px;
overflow:hidden;
background:#f4f1f6a8}

.news-feature-art{min-height:190px;
position:relative;
background:linear-gradient(130deg,
#b8b4c5,
#7e839c);
display:flex;
align-items:center;
justify-content:center;
overflow:hidden}

.news-feature-art img{width:100%;
height:100%;
position:absolute;
inset:0;
object-fit:cover}

.news-fallback{font:45px "SimSun",
serif;
letter-spacing:8px;
color:#e8dbc1;
opacity:.65}

.news-feature-copy{padding:22px;
display:flex;
flex-direction:column;
justify-content:center;
gap:15px}

.news-meta{display:flex;
align-items:center;
gap:10px;
color:#8a8fa2;
font-size:10px}

.news-tag{color:#9c7c41;
border:1px solid #b8a07888;
background:#e9d9b833;
border-radius:5px;
font-size:10px;
padding:3px 7px;
white-space:nowrap}

.news-feature-title{font:24px "tttgbnumber",
"SimSun",
serif;
color:#38435b;
line-height:1.5;
overflow-wrap:anywhere;
letter-spacing:.5px}

.news-number{font:16px "tttgbnumber",
serif;
color:#ac8748;
margin-right:9px}

.news-feature-command{font-size:13px;
color:#8d774d;
line-height:1.6}

.news-grid{display:grid;
grid-template-columns:repeat(2,
minmax(0,
1fr));
gap:12px;
margin-top:14px}

.news-article{display:flex;
gap:12px;
align-items:center;
padding:12px;
border:1px solid #bbbccc;
border-radius:11px;
background:linear-gradient(120deg,
#f4f1f6a6,
#d6d9e559);
min-width:0}

.news-article-art{position:relative;
width:124px;
height:83px;
flex-shrink:0;
border-radius:7px;
overflow:hidden;
display:flex;
align-items:center;
justify-content:center;
background:linear-gradient(130deg,
#b6b5c5,
#7c829b)}

.news-article-art img{width:100%;
height:100%;
object-fit:cover}

.news-article-art .news-fallback{font-size:20px;
letter-spacing:3px}

.news-article-copy{min-width:0;
flex:1}

.news-article-title{font-size:16px;
line-height:1.65;
color:#46516a;
overflow-wrap:anywhere;
font-weight:500}

.news-article-copy .news-meta{margin-top:8px;
gap:6px;
font-size:11px}

.news-article-copy .news-number{font-size:14px;
margin-right:3px}

.news-caption{border-top:1px solid #b8baca88;
margin-top:17px;
padding-top:12px;
font-size:12px;
color:#858a9d;
line-height:1.8}

.news-caption b{color:#9c7c43;
font-weight:500}

.news-navigation{margin-top:18px;
padding:14px 18px;
border:1px solid #ceb99488;
border-radius:12px;
background:#30364ccc;
color:#ddd1bd;
font-size:12px;
line-height:1.9}

.news-navigation b{color:#efd49a;
font-weight:500}

.news-empty{padding:38px 15px;
text-align:center;
color:#7d859a;
font-size:16px;
line-height:1.9}

.news-footer{margin-top:18px;
padding:13px 17px;
border:1px solid #c5aa7788;
border-radius:11px;
background:#2b3147d9;
color:#e5d7b8;
display:flex;
justify-content:space-between;
font-size:12px}

.news-footer small{font-size:10px;
color:#bdc0d1}

`;

function date(item: AnnItem) {
  const value = annTimestamp(item.publishTime) ?? annTimestamp(item.firstPublishTime);

  return value === null
    ? '日期未返回'
    : new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(value);
}

function Cover({ item }: { item: AnnItem }) {
  const url = item.coverUrl || item.coverImages?.find(image => !!image?.url)?.url;

  return url ? <img src={url} alt='' /> : <div className='news-fallback'>鸣潮</div>;
}

export default function AnnCard({ data }: AnnCardProps) {
  const category = data.category ?? 'notice';
  const meta = ANN_CATEGORIES[category];
  const items = sortedAnnouncements(data[meta.key]);
  const first = items[0];

  return (
    <HTML style={{ width: '1000px' }}>
      <main className='news-sheet'>
        <style>{CSS}</style>
        <img className='news-backdrop' src={BACKGROUND} alt='' />
        <div className='news-content'>
          <div className='news-brand'>
            ✦ 鸣潮助手<small>WUTHERING WAVES ASSISTANT</small>
          </div>
          <h1 className='news-title'>
            {meta.title}
            <small>{meta.english} · WUTHERING WAVES</small>
          </h1>
          <section className='news-panel'>
            <header className='news-heading'>
              <h2>近期发布</h2>
              <span>最近 {items.length} 条 · 按发布时间排序</span>
            </header>
            {first ? (
              <>
                <article className='news-feature'>
                  <div className='news-feature-art'>
                    <Cover item={first} />
                  </div>
                  <div className='news-feature-copy'>
                    <div className='news-meta'>
                      <span className='news-tag'>{meta.title}</span>
                      <span>{date(first)}</span>
                    </div>
                    <div className='news-feature-title'>
                      <span className='news-number'>01</span>
                      {first.postTitle}
                    </div>
                    <div className='news-feature-command'>查看原文：{meta.command} 1</div>
                  </div>
                </article>
                {!!items.slice(1).length && (
                  <div className='news-grid'>
                    {items.slice(1).map((item, index) => (
                      <article className='news-article' key={item.postId || index}>
                        <div className='news-article-art'>
                          <Cover item={item} />
                        </div>
                        <div className='news-article-copy'>
                          <div className='news-article-title'>{item.postTitle}</div>
                          <div className='news-meta'>
                            <span className='news-number'>{String(index + 2).padStart(2, '0')}</span>
                            <span>{date(item)}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                <div className='news-caption'>
                  发送 <b>{meta.command} 编号</b> 获取库街区原文链接，例如 <b>{meta.command} 1</b>。编号以最近一次查询为准，10分钟有效。
                  {category === 'activity' && (
                    <>
                      <br />
                      此页为活动文章列表，活动是否仍在进行请以原文时间为准。
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className='news-empty'>暂无{meta.title}信息，请稍后重新查询</div>
            )}
          </section>
          <div className='news-navigation'>
            游戏公告：<b>#mc公告</b> · 活动速递：<b>#mc公告 活动</b> · 游戏资讯：<b>#mc公告 资讯</b>
          </div>
          <footer className='news-footer'>
            <span>
              ✦ {meta.command} · {meta.title}
            </span>
            <small>鸣潮助手 · 来源：库街区</small>
          </footer>
        </div>
      </main>
    </HTML>
  );
}
