import fileUrl from '../../assets/img/stamina/lily-background.png.js';
import React from 'react';
import HTML from './HTML.js';

const CSS = `
.tower-sheet{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#303449;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}

.tower-sheet *{box-sizing:border-box}

.tower-backdrop{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.66}

.tower-content{position:relative;
padding:28px 24px 24px;
background:linear-gradient(180deg,
#1b203116,
#20273bb3)}

.tower-brand{font:24px "tttgbnumber",
"SimSun",
serif;
color:#f2e8d1;
letter-spacing:4px;
margin:0 15px}

.tower-brand small{display:block;
font:7px Arial;
letter-spacing:4px;
color:#d9c89e;
margin-top:8px}

.tower-title{font:italic 50px "tttgbnumber",
"SimSun",
serif;
color:#f6ecda;
letter-spacing:5px;
margin:23px 15px}

.tower-title small{display:block;
font:8px Arial;
letter-spacing:5px;
color:#d9c89e;
margin-top:10px}

.tower-profile{display:flex;
align-items:center;
gap:24px;
padding:24px 30px;
min-height:152px;
background:linear-gradient(110deg,
#252b40ee,
#626988aa);
border:1px solid #d9bf8c;
border-radius:24px;
outline:1px solid #f3e5cc66;
outline-offset:-5px;
color:#f3ead7}

.tower-avatar{width:98px;
height:98px;
flex-shrink:0;
border:2px solid #d5b472;
outline:1px solid #eee0bd66;
outline-offset:4px;
border-radius:50%;
background:#60637b;
overflow:hidden;
display:flex;
align-items:center;
justify-content:center;
font:40px "SimSun",
serif}

.tower-avatar img{width:100%;
height:100%;
object-fit:cover}

.tower-identity{flex:1;
min-width:0}

.tower-name{font:31px "tttgbnumber",
"SimSun",
serif;
letter-spacing:2px;
margin:0 0 12px;
overflow-wrap:anywhere}

.tower-uid{font:15px "tttgbnumber",
serif;
display:inline-block;
padding:5px 14px;
border:1px solid #d7c7a888;
border-radius:18px;
letter-spacing:1px}

.tower-levels{display:flex;
gap:18px;
font-size:12px;
color:#cbcbd9;
margin-top:12px}

.tower-emblem{width:86px;
height:100px;
color:#d8bb7e;
opacity:.75}
.tower-highlight{text-align:right;min-width:155px}
.tower-highlight-label{font-size:15px;letter-spacing:2px;color:#e0d4be}
.tower-highlight-score{font:40px "tttgbnumber",serif;color:#f2d495;margin:7px 0}
.tower-highlight-score small{font-size:24px;color:#d3c6b0}
.tower-highlight-note{font-size:11px;color:#c7c5d3}
.tower-navigation{margin-top:18px;
padding:16px 20px;
border:1px solid #d0bd9a88;
border-radius:12px;
background:#30364ccc;
color:#ddd1bd;
font-size:12px;
line-height:1.8}
.tower-navigation b{color:#f0d699;font-weight:500}

.tower-section{margin-top:18px;
padding:20px;
border:1px solid #e1cfa8;
border-radius:21px;
outline:1px solid #ffffff77;
outline-offset:-5px;
background:linear-gradient(120deg,
#f5f4f0ee,
#dedfeced);
box-shadow:0 5px 18px #151a3333}

.tower-section-head{display:flex;
align-items:center;
justify-content:space-between;
gap:15px;
margin-bottom:17px;
padding-bottom:13px;
border-bottom:1px solid #b7b7c988}

.tower-section-title{font:25px "tttgbnumber",
"SimSun",
serif;
letter-spacing:2px;
margin:0;
color:#313b53;
display:flex;
align-items:center;
gap:10px}

.tower-section-title:before{content:"◆";
font:14px serif;
color:#b58a45}

.tower-section-title small{font:7px Arial;
letter-spacing:3px;
color:#85899b}

.tower-section-score{font:24px "tttgbnumber",
serif;
color:#a57931;
white-space:nowrap}

.tower-areas{display:grid;
gap:13px;
align-items:start}

.tower-area{min-width:0;
border:1px solid #afb3ca;
border-radius:13px;
background:#f6f3f8aa;
padding:10px}

.tower-area-head{display:flex;
align-items:center;
justify-content:space-between;
gap:8px;
padding:6px 4px 12px;
border-bottom:1px solid #bec0d077;
margin-bottom:10px}

.tower-area-name{font:19px "tttgbnumber",
"SimSun",
serif;
color:#414a62;
overflow-wrap:anywhere}

.tower-area-number{font:7px Arial;
letter-spacing:2px;
color:#9093a5;
display:block;
margin-bottom:7px}

.tower-area-score{font:21px "tttgbnumber",
serif;
color:#a67b36;
white-space:nowrap}

.tower-area-score small{font-size:13px;
color:#85899e}

.tower-floors{display:grid;
gap:9px}

.tower-floor{min-width:0;
border-radius:8px;
padding:10px 11px;
background:linear-gradient(110deg,
#d3d5e26b,
#bfc3d347);
border:1px solid #ffffff66}

.tower-floor-top{display:flex;
align-items:center;
justify-content:space-between;
gap:6px;
margin-bottom:9px}

.tower-floor-name{font:15px "tttgbnumber",
serif;
color:#49536a;
white-space:nowrap}

.tower-floor-stars{display:flex;
align-items:center;
gap:3px;
font:13px Arial;
color:#bfc0cd;
white-space:nowrap}

.tower-floor-stars .lit{color:#b88b3f;
text-shadow:0 1px 1px #ffffffaa}

.tower-floor-stars small{font:10px "Microsoft YaHei",
sans-serif;
margin-left:4px;
color:#9a7b46}

.tower-unknown-stars{font-size:10px;
color:#888ca0}

.tower-team{display:flex;
flex-wrap:wrap;
align-items:center;
gap:8px;
min-height:44px}

.tower-role{position:relative;
width:44px;
height:44px;
display:flex;
align-items:center;
justify-content:center;
border:1px solid #bba172;
border-radius:8px;
background:linear-gradient(140deg,
#a7a3b4,
#666d86);
overflow:hidden;
color:#eee3c6;
font-size:17px}

.tower-role img{width:100%;
height:100%;
object-fit:cover}

.tower-missing-team{font-size:11px;
color:#8a8e9f;
min-height:44px;
display:flex;
align-items:center}

.tower-empty{padding:30px 15px;
text-align:center;
font-size:16px;
color:#747c91;
line-height:1.9}

.tower-footer{margin-top:20px;
padding:13px 17px;
border:1px solid #c9ae7a88;
border-radius:11px;
background:#2b3147d9;
color:#e6d7b8;
display:flex;
justify-content:space-between;
font-size:12px}

.tower-footer small{font-size:10px;
color:#bfc1d1}

`;
function score(value) {
    return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
}
function total(areas, field) {
    return areas.length && areas.every(area => score(area[field]) !== null && (field !== 'maxStar' || area[field] > 0))
        ? areas.reduce((sum, area) => sum + area[field], 0)
        : null;
}
function Stars({ value }) {
    const stars = score(value);
    return stars === null || stars > 3 ? (React.createElement("span", { className: 'tower-unknown-stars' }, "\u661F\u7EA7\u672A\u8FD4\u56DE")) : (React.createElement("div", { className: 'tower-floor-stars' },
        [1, 2, 3].map(index => (React.createElement("span", { className: index <= stars ? 'lit' : '', key: index }, "\u2605"))),
        React.createElement("small", null,
            stars,
            " \u661F")));
}
function TowerCard({ data }) {
    const { uid, base, headUrl } = data;
    const tower = data.tower ?? {};
    const locked = tower.isUnlock === false;
    const zone = data.zone ?? '深境区';
    const names = { 1: '稳定区', 2: '实验区', 3: '深境区', 4: '超载区' };
    const difficulties = locked ? [] : (tower.difficultyList ?? []).filter(diff => !!diff && (diff.difficultyName || names[diff.difficulty]) === zone);
    const selectedAreas = difficulties.flatMap(diff => (diff.towerAreaList ?? []).filter(area => !!area));
    const current = total(selectedAreas, 'star');
    const maximum = total(selectedAreas, 'maxStar');
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement("main", { className: 'tower-sheet' },
            React.createElement("style", null, CSS),
            React.createElement("img", { className: 'tower-backdrop', src: fileUrl, alt: '' }),
            React.createElement("div", { className: 'tower-content' },
                React.createElement("div", { className: 'tower-brand' },
                    "\u2726 \u9E23\u6F6E\u52A9\u624B",
                    React.createElement("small", null, "WUTHERING WAVES ASSISTANT")),
                React.createElement("h1", { className: 'tower-title' },
                    "\u9006\u5883\u6DF1\u5854",
                    React.createElement("small", null, "TOWER OF ADVERSITY \u00B7 CHALLENGE RECORD")),
                React.createElement("section", { className: 'tower-profile' },
                    React.createElement("div", { className: 'tower-avatar' }, headUrl ? React.createElement("img", { src: headUrl, alt: '' }) : '✦'),
                    React.createElement("div", { className: 'tower-identity' },
                        React.createElement("h2", { className: 'tower-name' }, base?.name || '漂泊者'),
                        React.createElement("span", { className: 'tower-uid' },
                            "UID \u00B7 ",
                            uid),
                        React.createElement("div", { className: 'tower-levels' },
                            React.createElement("span", null,
                                "\u8054\u89C9\u7B49\u7EA7 ",
                                score(base?.level) ?? '—'),
                            React.createElement("span", null,
                                "\u7D22\u62C9\u7B49\u7EA7 ",
                                score(base?.worldLevel) ?? '—'))),
                    !!difficulties.length && (React.createElement("div", { className: 'tower-highlight' },
                        React.createElement("div", { className: 'tower-highlight-label' }, zone),
                        React.createElement("div", { className: 'tower-highlight-score' },
                            current ?? '—',
                            " ",
                            React.createElement("small", null,
                                "/ ",
                                maximum ?? '—')),
                        React.createElement("div", { className: 'tower-highlight-note' }, maximum !== null && current === maximum ? '全星达成' : '本区累计星数'))),
                    React.createElement("svg", { className: 'tower-emblem', viewBox: '0 0 86 100', fill: 'none', "aria-hidden": 'true' },
                        React.createElement("path", { d: 'M43 3 78 24v52L43 97 8 76V24Z', stroke: 'currentColor' }),
                        React.createElement("path", { d: 'M43 13 69 29v42L43 87 17 71V29Z', stroke: 'currentColor', opacity: '.4' }),
                        React.createElement("path", { d: 'M28 70h30M32 69V37l11-14 11 14v32M37 69V43h12v26M27 38h32M39 34h8M43 16v9', stroke: 'currentColor', strokeWidth: '2' }))),
                difficulties.map((diff, di) => {
                    const areas = (diff.towerAreaList ?? []).filter(area => !!area);
                    const stars = total(areas, 'star');
                    const maximum = total(areas, 'maxStar');
                    return (React.createElement("section", { className: 'tower-section', key: di },
                        React.createElement("header", { className: 'tower-section-head' },
                            React.createElement("h2", { className: 'tower-section-title' },
                                diff.difficultyName || '挑战分区',
                                React.createElement("small", null, "CHALLENGE ZONE")),
                            React.createElement("div", { className: 'tower-section-score' },
                                stars ?? '—',
                                " / ",
                                maximum ?? '—',
                                " \u661F")),
                        React.createElement("div", { className: 'tower-areas', style: { gridTemplateColumns: `repeat(${Math.min(Math.max(areas.length, 1), 3)}, minmax(0, 1fr))` } }, areas.map((area, ai) => {
                            const floors = (area.floorList ?? []).filter(floor => !!floor);
                            return (React.createElement("article", { className: 'tower-area', key: ai },
                                React.createElement("div", { className: 'tower-area-head' },
                                    React.createElement("div", { className: 'tower-area-name' },
                                        React.createElement("small", { className: 'tower-area-number' },
                                            "TOWER ",
                                            String(ai + 1).padStart(2, '0')),
                                        area.areaName || '挑战之塔'),
                                    React.createElement("div", { className: 'tower-area-score' },
                                        score(area.star) ?? '—',
                                        " ",
                                        React.createElement("small", null,
                                            "/ ",
                                            (score(area.maxStar) ?? 0) > 0 ? area.maxStar : '—'))),
                                React.createElement("div", { className: 'tower-floors', style: areas.length === 1 ? { gridTemplateColumns: `repeat(${Math.min(Math.max(floors.length, 1), 4)}, minmax(0, 1fr))` } : undefined }, floors.map((floor, fi) => {
                                    const roles = (floor.roleList ?? []).filter(role => !!role);
                                    return (React.createElement("div", { className: 'tower-floor', key: fi },
                                        React.createElement("div", { className: 'tower-floor-top' },
                                            React.createElement("span", { className: 'tower-floor-name' },
                                                "\u7B2C ",
                                                score(floor.floor) ?? '—',
                                                " \u5C42"),
                                            React.createElement(Stars, { value: floor.star })),
                                        roles.length ? (React.createElement("div", { className: 'tower-team' }, roles.map((role, ri) => (React.createElement("div", { className: 'tower-role', key: ri }, role.iconUrl ? React.createElement("img", { src: role.iconUrl, alt: `出战角色 ${role.roleId}` }) : '？'))))) : (React.createElement("div", { className: 'tower-missing-team' }, "\u961F\u4F0D\u8BB0\u5F55\u672A\u8FD4\u56DE"))));
                                })),
                                !floors.length && React.createElement("div", { className: 'tower-empty' }, "\u697C\u5C42\u8BB0\u5F55\u6682\u672A\u8FD4\u56DE")));
                        })),
                        !areas.length && React.createElement("div", { className: 'tower-empty' }, "\u6311\u6218\u8BB0\u5F55\u6682\u672A\u8FD4\u56DE")));
                }),
                !difficulties.length && (React.createElement("section", { className: 'tower-section' },
                    React.createElement("div", { className: 'tower-empty' }, locked ? '逆境深塔尚未解锁' : `${zone}数据暂未返回，请检查库街区展示设置后重新查询`))),
                React.createElement("div", { className: 'tower-navigation' },
                    "\u9ED8\u8BA4\u67E5\u8BE2\u6DF1\u5883\u533A \u00B7 \u5207\u6362\u5206\u533A\uFF1A",
                    React.createElement("b", null, "#mc\u6DF1\u5854 \u8D85\u8F7D\u533A"),
                    " / ",
                    React.createElement("b", null, "#mc\u6DF1\u5854 \u5B9E\u9A8C\u533A"),
                    " / ",
                    React.createElement("b", null, "#mc\u6DF1\u5854 \u7A33\u5B9A\u533A")),
                React.createElement("footer", { className: 'tower-footer' },
                    React.createElement("span", null, "\u2726 #mc\u6DF1\u5854 \u00B7 \u6311\u6218\u8BB0\u5F55"),
                    React.createElement("small", null, "\u9E23\u6F6E\u52A9\u624B \u00B7 \u5404\u5206\u533A\u72EC\u7ACB\u7EDF\u8BA1"))))));
}

export { TowerCard as default };
