import fileUrl from '../../assets/img/help/rover-background.png.js';
import React from 'react';
import HTML from './HTML.js';

const STYLES = `
.character{position:relative;
width:1200px;
overflow:hidden;
border-radius:24px;
background:#242a38;
color:#252a3a;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}
.character *{box-sizing:border-box}
.character-scene{position:absolute;
left:0;
top:0;
width:2400px;
height:1128px;
max-width:none;
object-fit:fill;
opacity:.6}
.character-hero{position:relative;
height:282px;
background:linear-gradient(100deg,
rgba(21,
25,
37,
.15),
rgba(21,
25,
37,
.7));
color:#f7f1e5}
.character-brand{position:relative;
z-index:2;
padding:24px 34px;
font-family:"tttgbnumber",
"SimSun",
serif;
font-size:26px;
letter-spacing:3px}
.character-brand small{display:block;
font-family:Arial,
sans-serif;
font-size:7px;
letter-spacing:3px;
margin-top:5px;
color:#c9bbab}
.character-art{position:absolute;
left:0;
top:-38px;
width:580px;
height:440px;
object-fit:contain;
object-position:center top;
mask-image:linear-gradient(#000 70%,
transparent)}
.character-title{position:absolute;
top:78px;
left:590px;
right:26px}
.character-title h1{display:inline;
font-family:"tttgbnumber",
"SimSun",
serif;
font-size:48px;
letter-spacing:4px;
line-height:1.2}
.character-title .character-lv{font:28px Georgia,
serif;
margin-left:16px;
white-space:nowrap}
.character-stars{color:#e7cda1;
font-size:18px;
letter-spacing:7px;
margin:10px 0}
.character-tag{display:inline-block;
padding:4px 15px;
border:1px solid #c1b29d;
border-radius:20px;
margin-right:10px;
font-size:15px;
background:rgba(28,
32,
44,
.55)}
.character-chains{display:flex;
gap:9px;
margin-top:14px}
.character-chain{width:34px;
height:34px;
border:1px solid #8b8397;
transform:rotate(45deg);
background:rgba(24,
28,
42,
.7);
margin:4px 3px;
opacity:.4;
display:flex;
align-items:center;
justify-content:center}
.character-chain.unlocked{opacity:1;
border-color:#e5c188;
background:#857052}
.character-chain img{width:27px;
height:27px;
object-fit:contain;
transform:rotate(-45deg)}
.character-chain span{transform:rotate(-45deg);
font:16px Georgia,
serif}
.character-content{position:relative;
padding:0 24px 22px;
display:flex;
flex-direction:column;
gap:14px}
.character-top{display:grid;
grid-template-columns:230px minmax(0,
1fr) 338px;
gap:12px}
.character-box{position:relative;
min-width:0;
padding:16px;
border:1px solid #d6c6af;
border-radius:15px;
background:linear-gradient(125deg,
rgba(249,
249,
254,
.95),
rgba(229,
232,
243,
.95));
box-shadow:inset 0 0 0 4px rgba(255,
255,
255,
.35)}
.character-section-title{display:flex;
align-items:center;
gap:8px;
border-bottom:1px solid #c7c9d6;
padding-bottom:10px;
margin:0 0 13px;
font-size:20px;
font-family:"tttgbnumber",
"SimSun",
serif;
letter-spacing:2px;
font-weight:bold}
.character-section-title:before{content:"◆";
font-size:12px;
color:#b58b49}
.character-section-title small{font:8px Arial,
sans-serif;
letter-spacing:3px;
color:#878b9b;
margin-left:5px}
.character-user{display:flex;
align-items:center;
gap:12px;
margin:6px 0 16px}
.character-avatar{position:relative;
width:60px;
height:60px;
flex-shrink:0;
overflow:hidden;
border-radius:50%;
border:2px solid #c1a578;
background:#d6d9e5;
display:flex;
align-items:center;
justify-content:center;
font-size:30px;
color:#6e6480}
.character-avatar img{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:cover}
.character-user-name{font-size:19px;
font-weight:bold;
overflow-wrap:anywhere;
max-width:110px}
.character-uid{font:12px Arial,
sans-serif;
margin-top:5px;
color:#6f7486;
white-space:nowrap}
.character-account-levels{display:flex;
border-top:1px solid #c6c9d6;
padding-top:14px;
text-align:center}
.character-account-levels>div{flex:1;
font-size:12px;
color:#6f7486}
.character-account-levels strong{display:block;
font:27px Georgia,
serif;
color:#38384e;
margin-bottom:5px}
.character-props{display:grid;
grid-template-columns:repeat(2,
minmax(0,
1fr));
gap:5px 10px}
.character-prop{display:flex;
align-items:center;
gap:7px;
min-width:0;
padding:5px 7px;
background:rgba(117,
123,
153,
.1);
border-radius:4px;
font-size:14px;
line-height:1.3}
.character-prop img{width:16px;
height:16px;
object-fit:contain;
flex-shrink:0}
.character-prop-name{min-width:0;
overflow-wrap:anywhere}
.character-prop-value{margin-left:auto;
white-space:nowrap;
font-family:Arial,
sans-serif;
font-weight:600;
font-size:16px}
.character-prop.accent .character-prop-value{color:#9e6c20}
.character-weapon{display:flex;
align-items:center;
gap:14px;
margin-bottom:10px}
.character-weapon-icon{width:76px;
height:76px;
flex-shrink:0;
object-fit:contain;
background:linear-gradient(135deg,
#6d647b,
#bba67e);
border:1px solid #bb9e6b;
border-radius:8px}
.character-weapon-name{font-size:21px;
color:#9d722e;
font-family:"tttgbnumber",
"SimSun",
serif;
font-weight:bold}
.character-weapon-level{font-size:14px;
margin-top:7px;
color:#5d6073}
.character-weapon-props{display:flex;
flex-direction:column;
gap:5px}
.character-effect{font-size:12px;
line-height:1.6;
color:#737485;
margin:10px 0 0;
overflow-wrap:anywhere}
.character-empty{font-size:14px;
line-height:1.8;
color:#77798a;
padding:16px 2px}
.character-skills{display:grid;
grid-template-columns:repeat(7,
minmax(0,
1fr));
gap:10px}
.character-skill{display:flex;
align-items:center;
gap:8px;
min-width:0}
.character-skill img{width:38px;
height:38px;
object-fit:contain;
padding:4px;
background:#66657a;
border:1px solid #bca986;
clip-path:polygon(50% 0,
100% 50%,
50% 100%,
0 50%)}
.character-skill-type{font-size:12px;
color:#58596f;
line-height:1.5}
.character-skill-level{font:20px Georgia,
serif;
color:#39394d;
margin-top:2px}
.character-skill-name{font-size:10px;
line-height:1.5;
color:#818194;
margin-top:3px;
overflow-wrap:anywhere}
.character-echo-summary{display:grid;
grid-template-columns:repeat(4,
minmax(0,
1fr));
gap:5px 12px;
margin-bottom:14px}
.character-echo-label{font-size:12px;
color:#737789;
margin:-4px 0 10px;
line-height:1.6}
.character-echoes{display:grid;
grid-template-columns:repeat(5,
minmax(0,
1fr));
gap:10px}
.character-echo{min-width:0;
padding:10px 9px;
border:1px solid #b4b4c8;
border-radius:9px;
background:rgba(255,
255,
255,
.32)}
.character-echo-head{display:flex;
align-items:center;
gap:7px;
padding:5px;
margin:-5px -4px 8px;
background:linear-gradient(115deg,
#4f5367,
#777487);
color:#f4eddf;
clip-path:polygon(8px 0,
calc(100% - 8px) 0,
100% 8px,
100% 100%,
0 100%,
0 8px)}
.character-echo-head img{width:46px;
height:46px;
object-fit:contain;
flex-shrink:0}
.character-echo-name{font-size:14px;
font-weight:bold;
line-height:1.3;
color:#ecd1a0;
overflow-wrap:anywhere}
.character-echo-level{font:12px Arial,
sans-serif;
color:#ecebf2;
margin-top:5px}
.character-echo-set{font-size:11px;
color:#8d6a32;
line-height:1.5;
margin-bottom:8px;
overflow-wrap:anywhere}
.character-echo-prop{display:flex;
align-items:flex-start;
justify-content:space-between;
gap:5px;
font-size:13px;
line-height:1.6;
padding:4px 2px}
.character-echo-prop:nth-child(even){background:rgba(111,
117,
146,
.09)}
.character-echo-prop strong{font:600 14px Arial,
sans-serif;
white-space:nowrap;
line-height:1.6}
.character-echo-prop.recommended{background:linear-gradient(90deg,#eadcbc,#f8f3e790)}
.character-echo-prop.main.recommended{background:#eadcbc;
color:#79521c}
.character-echo-divider{border-top:1px solid #cacbd6;
margin:7px 0}
.character-echo-cost{margin-left:auto;
font:12px Arial,
sans-serif;
letter-spacing:0;
color:#737789}
.character-footer{position:relative;
padding:0 28px 22px;
display:flex;
justify-content:space-between;
gap:20px;
color:#d3ccbf;
font-size:11px;
line-height:1.6}
`;
function Property({ prop }) {
    const accent = ['生命', '共鸣效率', '治疗效果加成'].includes(prop.attributeName);
    return (React.createElement("div", { className: `character-prop${accent ? ' accent' : ''}` },
        prop.iconUrl && React.createElement("img", { src: prop.iconUrl, alt: '' }),
        React.createElement("span", { className: 'character-prop-name' }, prop.attributeName),
        React.createElement("strong", { className: 'character-prop-value' }, prop.attributeValue)));
}
function Title({ name, en }) {
    return (React.createElement("h2", { className: 'character-section-title' },
        name,
        React.createElement("small", null, en)));
}
function CharDetailCard({ data }) {
    const { uid, detail, base, headUrl } = data;
    const { role, chainList, weaponData } = detail;
    const weapon = weaponData?.weapon;
    const echoes = detail.phantomData?.equipPhantomList?.filter((echo) => !!echo?.phantomProp) ?? [];
    const attributes = [...(detail.roleAttributeList ?? [])].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
    const echoSummary = detail.equipPhantomAddPropList?.length ? detail.equipPhantomAddPropList : (detail.equipPhantomAttributeList ?? []);
    const hasFinalEcho = !!detail.equipPhantomAddPropList?.length;
    const chains = chainList?.filter(chain => chain.unlocked).length ?? role.chainUnlockNum ?? 0;
    const cost = detail.phantomData ? echoes.reduce((sum, echo) => sum + (echo.cost ?? echo.phantomProp?.cost ?? 0), 0) : '—';
    const art = detail.roleSkin?.picUrl ?? role.rolePicUrl;
    const skills = detail.skillList ?? [];
    return (React.createElement(HTML, { style: { width: '1200px', margin: 0 } },
        React.createElement("style", null, STYLES),
        React.createElement("main", { className: 'character' },
            React.createElement("img", { className: 'character-scene', src: fileUrl, alt: '' }),
            React.createElement("header", { className: 'character-hero' },
                art && React.createElement("img", { className: 'character-art', src: art, alt: '' }),
                React.createElement("div", { className: 'character-brand' },
                    "\u9E23\u6F6E\u52A9\u624B / \u89D2\u8272\u9762\u677F",
                    React.createElement("small", null, "WUTHERING WAVES \u00B7 RESONATOR ARCHIVE")),
                React.createElement("div", { className: 'character-title' },
                    React.createElement("h1", null, role.roleName),
                    React.createElement("span", { className: 'character-lv' },
                        "Lv.",
                        detail.level ?? role.level),
                    React.createElement("div", { className: 'character-stars' }, '✧'.repeat(Math.max(0, Math.min(5, role.starLevel)))),
                    React.createElement("span", { className: 'character-tag' }, role.attributeName ?? '共鸣者'),
                    React.createElement("span", { className: 'character-tag' },
                        chains,
                        " / 6 \u5171\u9E23\u94FE"),
                    React.createElement("div", { className: 'character-chains' }, chainList?.map(chain => (React.createElement("div", { className: `character-chain${chain.unlocked ? ' unlocked' : ''}`, key: chain.order, title: chain.name }, chain.iconUrl ? React.createElement("img", { src: chain.iconUrl, alt: chain.name }) : React.createElement("span", null, chain.order))))))),
            React.createElement("div", { className: 'character-content' },
                React.createElement("div", { className: 'character-top' },
                    React.createElement("section", { className: 'character-box' },
                        React.createElement(Title, { name: '\u89D2\u8272\u4FE1\u606F', en: 'ROVER' }),
                        React.createElement("div", { className: 'character-user' },
                            React.createElement("div", { className: 'character-avatar' },
                                base?.name?.[0] ?? '漂',
                                headUrl && React.createElement("img", { src: headUrl, alt: '' })),
                            React.createElement("div", null,
                                React.createElement("div", { className: 'character-user-name' }, base?.name ?? '漂泊者'),
                                React.createElement("div", { className: 'character-uid' },
                                    "UID ",
                                    uid))),
                        React.createElement("div", { className: 'character-account-levels' },
                            React.createElement("div", null,
                                React.createElement("strong", null, base?.level ?? '—'),
                                "\u8054\u89C9\u7B49\u7EA7"),
                            React.createElement("div", null,
                                React.createElement("strong", null, base?.worldLevel ?? base?.bigWorldLevel ?? '—'),
                                "\u7D22\u62C9\u7B49\u7EA7"))),
                    React.createElement("section", { className: 'character-box' },
                        React.createElement(Title, { name: '\u6838\u5FC3\u5C5E\u6027', en: 'ATTRIBUTES' }),
                        attributes.length ? (React.createElement("div", { className: 'character-props' }, attributes.map((prop, i) => (React.createElement(Property, { key: i, prop: prop }))))) : (React.createElement("div", { className: 'character-empty' },
                            "\u5E93\u8857\u533A\u672A\u8FD4\u56DE\u6700\u7EC8\u9762\u677F\u5C5E\u6027",
                            React.createElement("br", null),
                            "\u8BF7\u5728\u6E38\u620F\u5185\u5C55\u793A\u89D2\u8272\u6570\u636E\u540E\u53D1\u9001 #mc\u5237\u65B0\u9762\u677F"))),
                    React.createElement("section", { className: 'character-box' },
                        React.createElement(Title, { name: '\u6B66\u5668\u4FE1\u606F', en: 'WEAPON' }),
                        weapon ? (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: 'character-weapon' },
                                weapon.weaponIcon && React.createElement("img", { className: 'character-weapon-icon', src: weapon.weaponIcon, alt: '' }),
                                React.createElement("div", null,
                                    React.createElement("div", { className: 'character-weapon-name' }, weapon.weaponName),
                                    React.createElement("div", { className: 'character-weapon-level' },
                                        "Lv.",
                                        weaponData.level,
                                        " \u00B7 \u8C10\u632F R",
                                        weaponData.resonLevel,
                                        " \u00B7 ",
                                        weapon.weaponStarLevel,
                                        "\u2605"))),
                            React.createElement("div", { className: 'character-weapon-props' }, weaponData.mainPropList?.map((prop, i) => (React.createElement(Property, { key: i, prop: prop })))),
                            weapon.effectDescription && React.createElement("p", { className: 'character-effect' }, weapon.effectDescription.replace(/<[^>]*>/g, '')))) : (React.createElement("div", { className: 'character-empty' }, "\u672A\u88C5\u5907\u6B66\u5668\u6216\u6570\u636E\u672A\u8FD4\u56DE")))),
                React.createElement("section", { className: 'character-box' },
                    React.createElement(Title, { name: '\u6280\u80FD\u7B49\u7EA7', en: 'SKILLS' }),
                    skills.length ? (React.createElement("div", { className: 'character-skills' }, skills.map((entry, i) => (React.createElement("div", { className: 'character-skill', key: i },
                        entry.skill?.iconUrl && React.createElement("img", { src: entry.skill.iconUrl, alt: '' }),
                        React.createElement("div", null,
                            React.createElement("div", { className: 'character-skill-type' }, entry.skill?.type || '技能'),
                            React.createElement("div", { className: 'character-skill-level' },
                                "Lv.",
                                entry.level),
                            React.createElement("div", { className: 'character-skill-name' }, entry.skill?.name))))))) : (React.createElement("div", { className: 'character-empty' }, "\u6280\u80FD\u6570\u636E\u672A\u8FD4\u56DE"))),
                React.createElement("section", { className: 'character-box' },
                    React.createElement("h2", { className: 'character-section-title' },
                        "\u58F0\u9AB8\u4FE1\u606F",
                        React.createElement("small", null, "ECHO"),
                        React.createElement("span", { className: 'character-echo-cost' },
                            "COST ",
                            cost,
                            " \u00B7 \u5DF2\u88C5\u5907 ",
                            echoes.length,
                            " / 5")),
                    React.createElement("div", { className: 'character-echo-label' }, hasFinalEcho ? '声骸结算贡献 · 已含百分比属性折算与套装效果' : '原始声骸词条汇总 · 固定值与百分比分开显示'),
                    echoSummary.length ? (React.createElement("div", { className: 'character-echo-summary' }, echoSummary.map((prop, i) => (React.createElement(Property, { key: i, prop: prop }))))) : (React.createElement("div", { className: 'character-empty' }, "\u58F0\u9AB8\u6C47\u603B\u6570\u636E\u672A\u8FD4\u56DE")),
                    echoes.length ? (React.createElement("div", { className: 'character-echoes' }, echoes.map((echo, i) => (React.createElement("article", { className: 'character-echo', key: i },
                        React.createElement("div", { className: 'character-echo-head' },
                            echo.phantomProp?.iconUrl && React.createElement("img", { src: echo.phantomProp.iconUrl, alt: '' }),
                            React.createElement("div", null,
                                React.createElement("div", { className: 'character-echo-name' }, echo.phantomProp?.name),
                                React.createElement("div", { className: 'character-echo-level' },
                                    "Lv.",
                                    echo.level,
                                    " \u00B7 COST ",
                                    echo.cost))),
                        React.createElement("div", { className: 'character-echo-set' }, echo.fetterDetail?.name ?? '套装信息未返回'),
                        echo.mainProps?.map((prop, j) => (React.createElement("div", { className: `character-echo-prop main${prop.valid === true ? ' recommended' : ''}`, key: j },
                            React.createElement("span", null, prop.attributeName),
                            React.createElement("strong", null, prop.attributeValue)))),
                        React.createElement("div", { className: 'character-echo-divider' }),
                        echo.subProps?.length ? (echo.subProps.map((prop, j) => (React.createElement("div", { className: `character-echo-prop${prop.valid === true ? ' recommended' : ''}`, key: j },
                            React.createElement("span", null, prop.attributeName),
                            React.createElement("strong", null, prop.attributeValue))))) : (React.createElement("div", { className: 'character-empty' }, "\u5C1A\u65E0\u526F\u8BCD\u6761"))))))) : (React.createElement("div", { className: 'character-empty' }, "\u672A\u88C5\u5907\u58F0\u9AB8\u6216\u88C5\u5907\u6570\u636E\u672A\u8FD4\u56DE")))),
            React.createElement("footer", { className: 'character-footer' },
                React.createElement("span", null, "\u6838\u5FC3\u5C5E\u6027\uFF1A\u5E93\u8857\u533A\u6700\u7EC8\u7ED3\u7B97\u9762\u677F \u00B7 \u6B66\u5668\u3001\u58F0\u9AB8\u8D21\u732E\u5DF2\u5305\u542B\u5728\u5185"),
                React.createElement("span", null, "\u9E23\u6F6E\u52A9\u624B \u00B7 #mc\u5237\u65B0\u9762\u677F \u66F4\u65B0\u6570\u636E")))));
}

export { CharDetailCard as default };
