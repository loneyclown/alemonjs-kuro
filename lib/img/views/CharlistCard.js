import fileUrl from '../../assets/img/help/rover-background.png.js';
import React from 'react';
import HTML from './HTML.js';

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
function CharlistCard({ data }) {
    const { uid, base, roles, headUrl } = data;
    const sorted = [...roles].sort((a, b) => b.starLevel - a.starLevel || b.level - a.level || a.roleId - b.roleId);
    const fiveStars = roles.filter(role => role.starLevel === 5).length;
    const fourStars = roles.filter(role => role.starLevel === 4).length;
    return (React.createElement(HTML, { style: { width: '1000px', margin: 0 } },
        React.createElement("style", null, STYLES),
        React.createElement("main", { className: 'roster' },
            React.createElement("img", { className: 'roster-scene', src: fileUrl, alt: '' }),
            React.createElement("header", { className: 'roster-hero' },
                React.createElement("div", { className: 'roster-brand' },
                    "\u9E23\u6F6E ",
                    React.createElement("small", null, "WUTHERING WAVES")),
                React.createElement("div", { className: 'roster-heading' },
                    React.createElement("h1", null, "\u5171\u9E23\u8005\u6863\u6848"),
                    React.createElement("span", { className: 'roster-tag' }, "\u89D2\u8272\u7EC3\u5EA6")),
                React.createElement("div", { className: 'roster-subtitle' }, "RESONATOR COLLECTION / ROVER ARCHIVE")),
            React.createElement("section", { className: 'roster-panel' },
                React.createElement("div", { className: 'roster-account' },
                    React.createElement("div", { className: 'roster-avatar' },
                        base.name?.[0] ?? '漂',
                        headUrl && React.createElement("img", { src: headUrl, alt: '' })),
                    React.createElement("div", null,
                        React.createElement("div", { className: 'roster-name' }, base.name || '漂泊者'),
                        React.createElement("div", { className: 'roster-uid' },
                            "UID / ",
                            uid)),
                    React.createElement("div", { className: 'roster-level' },
                        "\u8054\u89C9\u7B49\u7EA7",
                        React.createElement("strong", null, base.level),
                        React.createElement("div", { className: 'roster-world' },
                            "\u7D22\u62C9\u7B49\u7EA7 \u00B7 ",
                            base.worldLevel ?? base.bigWorldLevel ?? '—'))),
                React.createElement("div", { className: 'roster-stats' }, [
                    ['已收录', roles.length],
                    ['五星共鸣者', fiveStars],
                    ['四星共鸣者', fourStars]
                ].map(([label, value]) => (React.createElement("div", { className: 'roster-stat', key: label },
                    React.createElement("strong", null, String(value).padStart(2, '0')),
                    React.createElement("span", null, label))))),
                React.createElement("div", { className: 'roster-section' },
                    React.createElement("b", null, "01"),
                    React.createElement("h2", null, "\u5171\u9E23\u8005\u4E00\u89C8")),
                React.createElement("div", { className: 'roster-sort' }, "\u6309\u661F\u7EA7\u3001\u7B49\u7EA7\u6392\u5E8F \u00B7 \u6570\u91CF\u4EE5\u672C\u6B21\u8FD4\u56DE\u7684\u89D2\u8272\u5217\u8868\u4E3A\u51C6"),
                sorted.length ? (React.createElement("div", { className: 'roster-grid' }, sorted.map(role => (React.createElement("article", { className: 'roster-role', key: role.roleId, style: { '--rarity': role.starLevel === 5 ? '#d2b581' : '#b59bce' } },
                    React.createElement("div", { className: 'roster-portrait' }, role.roleIconUrl ? React.createElement("img", { src: role.roleIconUrl, alt: role.roleName }) : (role.roleName?.[0] ?? '？')),
                    React.createElement("span", { className: 'roster-chain' },
                        role.chainUnlockNum ?? 0,
                        " \u94FE"),
                    React.createElement("div", { className: 'roster-role-name' }, role.roleName),
                    React.createElement("div", { className: 'roster-rarity' }, '★'.repeat(Math.max(0, Math.min(5, role.starLevel)))),
                    React.createElement("div", { className: 'roster-role-info' },
                        React.createElement("span", { className: 'roster-role-level' },
                            "Lv.",
                            role.level),
                        React.createElement("span", null, role.attributeName ?? '—'))))))) : (React.createElement("div", { className: 'roster-empty' },
                    "\u6682\u672A\u83B7\u53D6\u5230\u5171\u9E23\u8005\u6570\u636E",
                    React.createElement("br", null),
                    "\u8BF7\u786E\u8BA4\u5E93\u8857\u533A\u89D2\u8272\u5C55\u793A\u8BBE\u7F6E\u540E\uFF0C\u53D1\u9001 #mc\u5237\u65B0\u9762\u677F \u91CD\u8BD5"))),
            React.createElement("footer", { className: 'roster-footer' },
                React.createElement("span", null,
                    "\u2726 ",
                    React.createElement("code", null, "#mc\u67E5\u8BE2 \u89D2\u8272\u540D"),
                    " \u67E5\u770B\u8BE6\u7EC6\u9762\u677F"),
                React.createElement("span", null, "\u9E23\u6F6E\u52A9\u624B \u00B7 WUTHERING WAVES")))));
}

export { CharlistCard as default };
