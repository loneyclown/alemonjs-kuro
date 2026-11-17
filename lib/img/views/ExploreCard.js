import fileUrl from '../../assets/img/stamina/lily-background.png.js';
import React from 'react';
import HTML from './HTML.js';

const STYLES = `
.explore-sheet{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#303449;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}
.explore-sheet *{box-sizing:border-box}
.explore-backdrop{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.65}
.explore-shade{position:absolute;
inset:0;
background:linear-gradient(180deg,
rgba(24,
28,
43,
.1),
rgba(37,
40,
59,
.64) 70%)}
.explore-header{position:relative;
height:176px;
padding:22px 44px;
color:#f3ead8}
.explore-brand{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:23px;
letter-spacing:3px;
line-height:1.2}
.explore-brand span{color:#e5cc99;
margin-right:14px}
.explore-brand small{display:block;
font:6px Arial,
sans-serif;
letter-spacing:4px;
margin:8px 0 0 39px}
.explore-title{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:52px;
font-style:italic;
letter-spacing:5px;
line-height:1;
margin:20px 0 12px;
color:#f5ead6;
text-shadow:0 3px 10px #292e45}
.explore-subtitle{font:8px Arial,
sans-serif;
letter-spacing:5px;
margin-left:4px;
color:#d3c9b7}
.explore-profile{position:relative;
display:flex;
align-items:center;
gap:22px;
margin:0 20px 17px;
padding:23px 27px;
min-height:160px;
border:1px solid #e4c990;
outline:1px solid rgba(248,
242,
226,
.4);
outline-offset:-5px;
border-radius:25px;
background:linear-gradient(110deg,
rgba(30,
35,
53,
.92),
rgba(98,
104,
135,
.66));
box-shadow:0 6px 15px rgba(18,
20,
38,
.2);
color:#f3eddc}
.explore-avatar{position:relative;
width:107px;
height:107px;
display:flex;
align-items:center;
justify-content:center;
flex-shrink:0;
overflow:hidden;
border-radius:50%;
border:3px solid #dec893;
box-shadow:0 0 0 5px rgba(230,
216,
181,
.15);
background:#66627c;
font-size:40px}
.explore-avatar img{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:cover}
.explore-user{flex:1;
min-width:0}
.explore-name{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:32px;
line-height:1.2;
margin:0 0 10px;
overflow-wrap:anywhere}
.explore-uid{display:inline-block;
padding:5px 15px;
border:1px solid #b6b0ac;
border-radius:20px;
font:17px Arial,
sans-serif;
letter-spacing:1px;
background:rgba(135,
132,
151,
.15)}
.explore-levels{display:flex;
flex-wrap:wrap;
gap:9px;
margin-top:10px;
font-size:12px}
.explore-levels span{padding:4px 11px;
border-radius:20px;
border:1px solid rgba(202,
198,
205,
.5);
background:rgba(142,
141,
166,
.15)}
.explore-total{width:285px;
flex-shrink:0;
border-left:1px solid rgba(227,
214,
189,
.6);
padding-left:28px;
text-align:center}
.explore-total-label{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:21px;
letter-spacing:2px}
.explore-total-number{font:italic bold 51px Georgia,
serif;
color:#f1d58e;
line-height:1.2;
margin:7px 0;
text-shadow:0 0 15px rgba(224,
189,
116,
.2)}
.explore-total-number small{font-size:29px}
.explore-total-note{font-size:10px;
color:#d4d0d3;
margin-top:8px}
.explore-bar{height:6px;
border-radius:10px;
background:#a4a6be;
box-shadow:inset 0 1px 3px rgba(45,
47,
77,
.25);
overflow:hidden}
.explore-bar-fill{height:100%;
border-radius:10px;
background:linear-gradient(90deg,
#ebcb85,
#fff1b5);
box-shadow:0 0 5px rgba(214,
180,
103,
.3)}
.explore-total .explore-bar{height:12px;
border:1px solid #ded6c5;
background:#62667f}
.explore-regions{position:relative;
display:flex;
flex-direction:column;
gap:16px;
margin:0 20px}
.explore-region{position:relative;
overflow:hidden;
border-radius:25px;
border:1px solid #ddc28f;
outline:1px solid rgba(248,
245,
236,
.6);
outline-offset:-5px;
background:linear-gradient(125deg,
rgba(246,
247,
255,
.93),
rgba(227,
230,
247,
.93));
box-shadow:0 7px 20px rgba(23,
25,
42,
.2)}
.explore-region-header{position:relative;
display:flex;
align-items:center;
gap:18px;
min-height:87px;
padding:14px 24px;
border-bottom:1px solid rgba(255,
255,
255,
.8);
background:linear-gradient(110deg,
rgba(255,
255,
255,
.1),
rgba(209,
214,
237,
.6))}
.explore-region-icon{display:flex;
align-items:center;
justify-content:center;
width:58px;
height:58px;
flex-shrink:0;
background:#64657b;
clip-path:polygon(50% 0,
100% 50%,
50% 100%,
0 50%);
color:#efddb8;
font-size:27px}
.explore-region-icon img{width:52px;
height:52px;
object-fit:contain}
.explore-region-name{min-width:170px;
font-family:"tttgbnumber",
"SimSun",
serif;
font-size:31px;
letter-spacing:3px;
line-height:1.2;
margin:0}
.explore-region-name small{display:block;
font:7px Arial,
sans-serif;
letter-spacing:4px;
margin-top:7px;
color:#72758c}
.explore-region-number{font:italic bold 40px Georgia,
serif;
color:#b78d48;
white-space:nowrap}
.explore-region-number small{font-size:27px}
.explore-region-progress{flex:1;
max-width:310px;
margin:0 0 0 6px}
.explore-region-progress .explore-bar{height:10px;
border:1px solid #f4f1e9}
.explore-region-count{font-size:11px;
margin-top:8px;
color:#848598}
.explore-region-body{position:relative;
display:flex;
gap:15px;
padding:14px 17px 17px;
min-height:150px}
.explore-landscape{position:relative;
flex-shrink:0;
width:204px;
min-height:140px;
border-radius:14px;
overflow:hidden;
background:linear-gradient(160deg,
#b8bcd0,
#909bb8);
align-self:stretch}
.explore-landscape img{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:cover;
object-position:center;
mask-image:linear-gradient(90deg,
#000 85%,
rgba(0,
0,
0,
.3))}
.explore-landscape-label{position:absolute;
bottom:0;
left:0;
right:0;
padding:24px 10px 10px;
background:linear-gradient(transparent,
rgba(28,
32,
53,
.8));
color:#f8f0df;
font-size:12px;
letter-spacing:1px}
.explore-landscape-empty{position:absolute;
inset:0;
display:flex;
align-items:center;
justify-content:center;
color:#e1d4b7;
font-size:62px}
.explore-areas{flex:1;
min-width:0;
display:grid;
grid-template-columns:repeat(4,
minmax(0,
1fr));
gap:8px;
align-content:start}
.explore-areas.compact{grid-template-columns:minmax(0,
1fr)}
.explore-area{min-width:0;
min-height:58px;
padding:9px 8px;
border-radius:8px;
border:1px solid rgba(255,
255,
255,
.9);
background:rgba(252,
251,
255,
.43);
box-shadow:inset 0 0 0 2px rgba(255,
255,
255,
.13);
display:flex;
gap:7px;
align-items:center}
.explore-area-icon{width:22px;
height:22px;
flex-shrink:0;
object-fit:contain;
filter:grayscale(1) brightness(.7);
opacity:.8}
.explore-area-fallback{width:22px;
flex-shrink:0;
color:#8c8e9f;
font-size:20px;
text-align:center}
.explore-area-body{flex:1;
min-width:0}
.explore-area-heading{display:flex;
align-items:flex-start;
justify-content:space-between;
gap:5px;
margin-bottom:6px;
font-size:12px;
font-weight:600;
line-height:1.3}
.explore-area-name{min-width:0;
overflow-wrap:anywhere}
.explore-area-number{font:600 13px Arial,
sans-serif;
white-space:nowrap;
color:#303448}
.explore-area .explore-bar{height:5px}
.explore-area.is-complete .explore-bar-fill{background:linear-gradient(90deg,
#5d9aa9,
#96cabc)}
.explore-area.is-low .explore-bar-fill{background:linear-gradient(90deg,
#d78066,
#f2b58d)}
.explore-area.is-high .explore-bar-fill{background:linear-gradient(90deg,
#598ac1,
#b1c8ea)}
.explore-empty{position:relative;
padding:46px 24px;
margin:0 20px;
border:1px solid #d7c299;
border-radius:22px;
text-align:center;
color:#eddfc5;
background:rgba(35,
40,
61,
.7);
font-size:17px;
line-height:2}
.explore-region .explore-empty{padding:20px;
margin:0;
color:#777e94;
border:0;
background:transparent;
font-size:14px}
.explore-footer{position:relative;
display:flex;
align-items:center;
justify-content:space-between;
gap:20px;
margin:18px 23px 25px;
padding:16px 22px;
border:1px solid #bda881;
border-radius:12px;
background:rgba(47,
51,
74,
.82);
color:#e7ddca;
font-size:13px}
.explore-footer small{font-size:10px;
color:#c9c5cd}
`;
function percentage(value) {
    if (typeof value !== 'number' && typeof value !== 'string') {
        return null;
    }
    const normalized = typeof value === 'string' ? value.trim().replace(/%$/, '') : value;
    if (normalized === '') {
        return null;
    }
    const parsed = Number(normalized);
    return Number.isFinite(parsed) && parsed >= 0 && parsed <= 100 ? parsed : null;
}
function Percent({ value }) {
    return value === null ? (React.createElement(React.Fragment, null, "\u2014")) : (React.createElement(React.Fragment, null,
        Number(value.toFixed(2)),
        React.createElement("small", null, "%")));
}
function Bar({ value }) {
    return value === null ? null : (React.createElement("div", { className: 'explore-bar' },
        React.createElement("div", { className: 'explore-bar-fill', style: { width: `${value}%` } })));
}
function ExploreCard({ data }) {
    const { uid, base, explore, headUrl } = data;
    const regions = explore.open ? (explore.exploreList?.filter((region) => !!region?.country) ?? []) : [];
    const progresses = regions.map(region => percentage(region.countryProgress));
    const average = regions.length && progresses.every(value => value !== null) ? progresses.reduce((sum, value) => sum + (value ?? 0), 0) / regions.length : null;
    const areas = regions.flatMap(region => region.areaInfoList?.filter((area) => !!area) ?? []);
    const completed = areas.filter(area => percentage(area.areaProgress) === 100).length;
    return (React.createElement(HTML, { style: { width: '1000px', margin: 0 } },
        React.createElement("style", null, STYLES),
        React.createElement("main", { className: 'explore-sheet' },
            React.createElement("img", { className: 'explore-backdrop', src: fileUrl, alt: '' }),
            React.createElement("div", { className: 'explore-shade' }),
            React.createElement("header", { className: 'explore-header' },
                React.createElement("div", { className: 'explore-brand' },
                    React.createElement("span", null, "\u2726"),
                    "\u9E23\u6F6E\u52A9\u624B",
                    React.createElement("small", null, "WUTHERING WAVES ASSISTANT")),
                React.createElement("h1", { className: 'explore-title' }, "\u63A2\u7D22\u6570\u636E"),
                React.createElement("div", { className: 'explore-subtitle' }, "\u2014 EXPLORATION DATA \u2014")),
            React.createElement("section", { className: 'explore-profile' },
                React.createElement("div", { className: 'explore-avatar' },
                    base.name?.[0] ?? '漂',
                    headUrl && React.createElement("img", { src: headUrl, alt: '' })),
                React.createElement("div", { className: 'explore-user' },
                    React.createElement("h2", { className: 'explore-name' }, base.name),
                    React.createElement("div", { className: 'explore-uid' },
                        "UID: ",
                        uid),
                    React.createElement("div", { className: 'explore-levels' },
                        React.createElement("span", null,
                            "\u8054\u89C9\u7B49\u7EA7 ",
                            base.level),
                        React.createElement("span", null,
                            "\u7D22\u62C9\u7B49\u7EA7 ",
                            base.worldLevel ?? base.bigWorldLevel ?? '—'))),
                React.createElement("div", { className: 'explore-total' },
                    React.createElement("div", { className: 'explore-total-label' }, "\u5730\u533A\u5E73\u5747\u63A2\u7D22\u5EA6"),
                    React.createElement("div", { className: 'explore-total-number' },
                        React.createElement(Percent, { value: average })),
                    React.createElement(Bar, { value: average }),
                    React.createElement("div", { className: 'explore-total-note' }, "\u5DF2\u8FD4\u56DE\u5730\u533A\u7684\u7B49\u6743\u5747\u503C \u00B7 \u975E\u5168\u5730\u56FE\u52A0\u6743\u8FDB\u5EA6"))),
            regions.length ? (React.createElement("div", { className: 'explore-regions' }, regions.map((region, ri) => {
                const country = region.country;
                const progress = percentage(region.countryProgress);
                const children = region.areaInfoList?.filter((area) => !!area) ?? [];
                const landscape = children.find(area => area.areaPic)?.areaPic;
                const landscapeName = children.find(area => area.areaPic)?.areaName;
                const countryIcon = country.detailPageImage ?? country.homePageIcon;
                return (React.createElement("section", { className: 'explore-region', key: `${country.countryId}-${ri}` },
                    React.createElement("header", { className: 'explore-region-header' },
                        React.createElement("div", { className: 'explore-region-icon' }, countryIcon ? React.createElement("img", { src: countryIcon, alt: '' }) : '✦'),
                        React.createElement("h2", { className: 'explore-region-name' },
                            country.countryName,
                            React.createElement("small", null,
                                "REGION ",
                                String(ri + 1).padStart(2, '0'))),
                        React.createElement("div", { className: 'explore-region-number' },
                            React.createElement(Percent, { value: progress })),
                        React.createElement("div", { className: 'explore-region-progress' },
                            React.createElement(Bar, { value: progress }),
                            React.createElement("div", { className: 'explore-region-count' },
                                children.length,
                                " \u4E2A\u5B50\u533A\u57DF"))),
                    React.createElement("div", { className: 'explore-region-body' },
                        React.createElement("div", { className: 'explore-landscape' },
                            landscape ? React.createElement("img", { src: landscape, alt: '' }) : React.createElement("div", { className: 'explore-landscape-empty' }, "\u2727"),
                            landscapeName && React.createElement("div", { className: 'explore-landscape-label' }, landscapeName)),
                        children.length ? (React.createElement("div", { className: `explore-areas${children.length <= 2 ? ' compact' : ''}` }, children.map((area, ai) => {
                            const pct = percentage(area.areaProgress);
                            const status = pct === 100 ? ' is-complete' : pct !== null && pct < 30 ? ' is-low' : pct !== null && pct >= 80 ? ' is-high' : '';
                            return (React.createElement("div", { className: `explore-area${status}`, key: `${area.areaId}-${ai}` },
                                country.detailPageAreaPic ? (React.createElement("img", { className: 'explore-area-icon', src: country.detailPageAreaPic, alt: '' })) : (React.createElement("span", { className: 'explore-area-fallback' }, "\u2316")),
                                React.createElement("div", { className: 'explore-area-body' },
                                    React.createElement("div", { className: 'explore-area-heading' },
                                        React.createElement("span", { className: 'explore-area-name' }, area.areaName),
                                        React.createElement("span", { className: 'explore-area-number' }, pct === null ? '—' : `${Number(pct.toFixed(2))}%`)),
                                    React.createElement(Bar, { value: pct }))));
                        }))) : (React.createElement("div", { className: 'explore-empty' }, "\u6B64\u5730\u533A\u6682\u65E0\u5B50\u533A\u57DF\u6570\u636E")))));
            }))) : (React.createElement("div", { className: 'explore-empty' }, explore.open ? '暂无探索数据，请刷新后重试' : '探索数据未公开，请先在库街区开启数据展示')),
            React.createElement("footer", { className: 'explore-footer' },
                React.createElement("span", null, "\u2726 \u63A2\u7D22\u6570\u636E\u603B\u89C8 \u00B7 #mc\u63A2\u7D22\u5EA6"),
                React.createElement("small", null, regions.length ? `${regions.length} 个地区 · ${areas.length} 个子区域 · 已满探索 ${completed} 个` : '以库街区返回的数据为准')))));
}

export { ExploreCard as default };
