import React from 'react';
import fileUrl$8 from '../../assets/img/help/icons/登录.png.js';
import fileUrl from '../../assets/img/help/icons/星声.png.js';
import fileUrl$1 from '../../assets/img/help/icons/查询角色面板.png.js';
import fileUrl$f from '../../assets/img/help/rover-background.png.js';
import fileUrl$2 from '../../assets/img/help/command-icons.png.js';
import fileUrl$3 from '../../assets/img/help/icons/查询探索度.png.js';
import fileUrl$4 from '../../assets/img/help/icons/深塔.png.js';
import fileUrl$5 from '../../assets/img/help/icons/签到日历.png.js';
import fileUrl$6 from '../../assets/img/help/icons/库洛币.png.js';
import fileUrl$7 from '../../assets/img/help/icons/卡池.png.js';
import fileUrl$9 from '../../assets/img/help/icons/绑定.png.js';
import fileUrl$a from '../../assets/img/help/icons/切换.png.js';
import fileUrl$b from '../../assets/img/help/icons/删除.png.js';
import fileUrl$d from '../../assets/img/help/icons/添加token.png.js';
import fileUrl$e from '../../assets/img/help/icons/删除token.png.js';
import fileUrl$c from '../../assets/img/help/icons/声骸介绍.png.js';
import HTML from './HTML.js';

const HELP_DATA = [
    {
        title: '常用查询',
        items: [
            { rule: 'stamina', name: '体力便笺', command: '#mc体力', icon: fileUrl },
            { rule: 'chardetail', name: '角色面板', command: '#mc查询 今汐', input: '#mc查询 ', icon: fileUrl$1 },
            { rule: 'charlist', name: '角色练度', command: '#mc练度', icon: fileUrl$2, sprite: '11.1% 11.1%' },
            { rule: 'explore', name: '探索进度', command: '#mc探索度', icon: fileUrl$3 },
            { rule: 'tower', name: '深塔 · 深境区', command: '#mc深塔', icon: fileUrl$4 },
            { rule: 'period', name: '资源月报', command: '#mc星声', icon: fileUrl }
        ]
    },
    {
        title: '记录与资讯',
        items: [
            { rule: 'sign', name: '签到记录', command: '#mc签到日历', icon: fileUrl$5 },
            { rule: 'coin', name: '库街区积分', command: '#mc库洛币', icon: fileUrl$6 },
            { rule: 'announce', name: '游戏公告', command: '#mc公告', icon: fileUrl$2, sprite: '88.9% 11.1%' },
            { rule: 'pool', name: '当前卡池', command: '#mc卡池', icon: fileUrl$7 },
            { rule: 'refresh', name: '刷新数据', command: '#mc刷新面板', icon: fileUrl$2, sprite: '11.1% 88.9%' },
            { rule: 'bind', name: '我的账号', command: '#mc查看', icon: fileUrl$2, sprite: '88.9% 88.9%' }
        ]
    }
];
const MORE_HELP_DATA = [
    {
        title: '账号管理',
        items: [
            { rule: 'login', name: '网页登录', command: '#mc登录', icon: fileUrl$8, private: true },
            { rule: 'bind', name: '绑定特征码', command: '#mc绑定 123456789', input: '#mc绑定 ', icon: fileUrl$9 },
            { rule: 'bind', name: '切换账号', command: '#mc切换 123456789', input: '#mc切换 ', icon: fileUrl$a },
            { rule: 'bind', name: '解绑账号', command: '#mc解绑 123456789', input: '#mc解绑 ', icon: fileUrl$b }
        ]
    },
    {
        title: '补充指令',
        items: [
            { rule: 'calabash', name: '数据坞', command: '#mc数据坞', icon: fileUrl$c },
            { rule: 'sign', name: '每日签到', command: '#mc签到', icon: fileUrl$5 },
            { rule: 'token', name: '添加凭据', command: '#mc添加token <Token>,<DID>', input: '#mc添加token ', icon: fileUrl$d, private: true },
            { rule: 'token', name: '删除凭据', command: '#mc删除token 123456789', input: '#mc删除token ', icon: fileUrl$e, private: true }
        ]
    },
    {
        title: '分区与详情',
        items: [
            { rule: 'tower', name: '深塔 · 超载区', command: '#mc深塔 超载区', icon: fileUrl$4 },
            { rule: 'tower', name: '深塔 · 实验区', command: '#mc深塔 实验区', icon: fileUrl$4 },
            { rule: 'tower', name: '深塔 · 稳定区', command: '#mc深塔 稳定区', icon: fileUrl$4 },
            { rule: 'period', name: '历史月报（月份）', command: '#mc星声 10月', input: '#mc星声 ', icon: fileUrl },
            { rule: 'calabash', name: '数据坞（页码）', command: '#mc数据坞 2', input: '#mc数据坞 ', icon: fileUrl$c },
            { rule: 'announce', name: '活动速递', command: '#mc公告 活动', icon: fileUrl$2, sprite: '88.9% 11.1%' },
            { rule: 'announce', name: '游戏资讯', command: '#mc公告 资讯', icon: fileUrl$2, sprite: '88.9% 11.1%' },
            { rule: 'announce', name: '公告原文（编号）', command: '#mc公告 1', input: '#mc公告 ', icon: fileUrl$2, sprite: '88.9% 11.1%' },
            { rule: 'announce', name: '活动原文（编号）', command: '#mc公告 活动 1', input: '#mc公告 活动 ', icon: fileUrl$2, sprite: '88.9% 11.1%' },
            { rule: 'announce', name: '资讯原文（编号）', command: '#mc公告 资讯 1', input: '#mc公告 资讯 ', icon: fileUrl$2, sprite: '88.9% 11.1%' }
        ]
    }
];
const MORE_HELP_NOTES = ['原文编号取自同分类最近一次查询，10 分钟内有效。', '历史月报可填 10月 或 202610。示例 UID 请换成自己的 9 位特征码。'];
const STYLES = `
.help-sheet{position:relative;
width:1000px;
height:940px;
overflow:hidden;
border-radius:24px;
background:#1b202a;
color:#f7f4ec;
font-family:"Microsoft YaHei",
system-ui,
sans-serif}
.help-scene{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill}
.help-sheet.more{height:auto;min-height:940px;padding-bottom:32px}
.help-sheet.more .help-panel{height:auto}
.help-header{position:relative;
height:208px;
padding:22px 46px;
box-sizing:border-box}
.help-brand{display:flex;
align-items:center;
gap:22px;
height:45px;
color:#faf6ee}
.help-brand-logo{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:35px;
letter-spacing:5px;
line-height:1}
.help-brand .help-wave{max-width:145px}
.help-brand small{display:block;
font-family:Arial,
sans-serif;
font-size:5px;
letter-spacing:2px;
margin:6px 0 0 3px}
.help-brand-divider{width:1px;
height:34px;
background:rgba(236,
224,
198,
.7)}
.help-wave{color:#c8ad7f;
flex:1;
height:20px;
max-width:580px}
.help-title{display:flex;
align-items:center;
gap:20px;
margin-top:18px}
.help-title h1{margin:0;
font-family:"tttgbnumber",
"KaiTi",
"SimSun",
serif;
font-style:italic;
font-size:65px;
letter-spacing:3px;
font-weight:700;
line-height:1.15;
color:#f9f4e6;
background:linear-gradient(100deg,
#e3c69a,
#fff 85%);
background-clip:text;
-webkit-text-fill-color:transparent}
.help-title-tag{display:inline-block;
padding:5px 24px 6px;
font-family:"tttgbnumber",
"SimSun",
serif;
font-style:italic;
font-size:27px;
font-weight:700;
letter-spacing:3px;
background:#e6d1ac;
color:#1a1d25;
clip-path:polygon(9% 0,
100% 0,
91% 100%,
0 100%)}
.help-subtitle{margin:13px 0 0 4px;
font-family:Arial,
sans-serif;
font-size:8px;
letter-spacing:8px;
color:#d3c4ab}
.help-panel{position:relative;
margin:0 16px;
height:612px}
.help-panel-frame{position:absolute;
inset:0;
width:100%;
height:100%;
pointer-events:none}
.help-panel-content{position:relative;
padding:17px 28px 30px}
.help-section+.help-section{margin-top:20px}
.help-section-title{position:relative;
display:flex;
align-items:center;
gap:16px;
height:44px;
border-bottom:1px solid #c8ab7f;
margin-bottom:14px}
.help-section-title:after{position:absolute;
content:"";
width:8px;
height:8px;
background:#dfbe87;
transform:rotate(45deg);
left:-2px;
bottom:-4px}
.help-section-number{font-family:Georgia,
serif;
font-size:29px;
line-height:1;
font-weight:700;
font-style:italic;
color:#dfbd89;
padding-left:16px}
.help-section-title h2{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:29px;
line-height:1;
margin:0;
letter-spacing:3px;
font-weight:700}
.help-section-title .help-wave{margin-left:16px}
.help-commands{display:grid;
grid-template-columns:repeat(3,
minmax(0,
1fr));
gap:10px 16px}
.help-sheet.more .help-commands{grid-template-columns:repeat(2,
minmax(0,
1fr))}
.help-command{height:94px;
padding:1px;
box-sizing:border-box;
--cut:polygon(10px 0,
calc(100% - 10px) 0,
100% 10px,
100% calc(100% - 10px),
calc(100% - 10px) 100%,
10px 100%,
0 calc(100% - 10px),
0 10px);
clip-path:var(--cut);
background:linear-gradient(145deg,
#7c818c,
#4d5360 55%,
#69717d)}
.help-command-inner{height:100%;
box-sizing:border-box;
display:flex;
align-items:center;
gap:12px;
padding:8px 13px;
clip-path:var(--cut);
background:linear-gradient(115deg,
rgba(51,
56,
67,
.94),
rgba(35,
39,
49,
.98))}
.help-command-icon{width:76px;
height:76px;
flex-shrink:0;
object-fit:contain;
filter:drop-shadow(0 3px 4px rgba(0,
0,
0,
.25))}
.help-sprite{background-repeat:no-repeat;
background-size:280% 280%}
.help-command-text{min-width:0}
.help-command-name{font-family:"tttgbnumber",
"SimSun",
serif;
font-size:22px;
color:#f7f7f2;
white-space:nowrap;
margin-bottom:9px;
line-height:1.1}
.help-private{font-family:"Microsoft YaHei",
sans-serif;
font-size:11px;
margin-left:8px;
color:#dec08f}
.help-command code{display:inline-block;
max-width:100%;
box-sizing:border-box;
background:linear-gradient(100deg,
#f4e2bd,
#e5cda6);
color:#111720;
border-radius:24px;
padding:4px 12px 5px;
font-family:"Microsoft YaHei",
sans-serif;
font-weight:700;
font-size:20px;
line-height:1.1;
white-space:nowrap}
.help-sheet.more .help-command code{font-size:17px}
.help-footer{text-shadow:0 2px 4px #080d16;
position:relative;
margin:14px 50px 0;
font-family:"tttgbnumber",
"SimSun",
serif;
color:#ecdfc7}
.help-footer-nav{display:flex;
justify-content:space-between;
align-items:center;
font-size:22px;
letter-spacing:1px}
.help-footer-entry{display:flex;
align-items:center;
gap:12px;
white-space:nowrap}
.help-footer-icon{display:inline-flex;
justify-content:center;
align-items:center;
width:33px;
height:33px;
border:1px solid #cdb081;
border-radius:50%;
font-size:19px;
color:#d9bd8c}
.help-footer code{font-family:"Microsoft YaHei",
sans-serif;
font-size:20px;
font-weight:700;
color:#e8c995;
letter-spacing:0;
background:rgba(18,
22,
30,
.7);
padding:5px 13px 6px;
border-radius:24px}
.help-footer-note{margin:11px 0 0 45px;
font-size:15px;
letter-spacing:1px;
color:#d2c9b9}
`;
function WaveLine() {
    return (React.createElement("svg", { className: 'help-wave', viewBox: '0 0 580 24', preserveAspectRatio: 'none', "aria-hidden": 'true' },
        React.createElement("path", { d: 'M0 12 H15 M15 9 V15 M20 7 V17 M25 2 V22 M30 8 V16 M35 5 V19 M40 9 V15 M45 11 V13 M45 12 H580', fill: 'none', stroke: 'currentColor', strokeWidth: '1' })));
}
function WuwaHelp({ more = false }) {
    const categories = more ? MORE_HELP_DATA : HELP_DATA;
    return (React.createElement(HTML, { style: { width: '1000px', margin: 0, textAlign: 'left' } },
        React.createElement("style", null, STYLES),
        React.createElement("main", { className: `help-sheet${more ? ' more' : ''}` },
            React.createElement("img", { className: 'help-scene', src: fileUrl$f, alt: '' }),
            React.createElement("header", { className: 'help-header' },
                React.createElement("div", { className: 'help-brand' },
                    React.createElement("div", { className: 'help-brand-logo' },
                        "\u9E23\u6F6E",
                        React.createElement("small", null, "WUTHERING WAVES")),
                    React.createElement("span", { className: 'help-brand-divider' }),
                    React.createElement(WaveLine, null)),
                React.createElement("div", { className: 'help-title' },
                    React.createElement("h1", null, "\u9E23\u6F6E\u52A9\u624B"),
                    React.createElement("span", { className: 'help-title-tag' }, more ? '更多指令' : '常用指令')),
                React.createElement("div", { className: 'help-subtitle' }, "WUTHERING WAVES ASSISTANT")),
            React.createElement("div", { className: 'help-panel' },
                React.createElement("svg", { className: 'help-panel-frame', viewBox: '0 0 968 612', preserveAspectRatio: 'none', "aria-hidden": 'true' },
                    React.createElement("path", { d: 'M2 24 L24 2 H446 L470 23 H942 L966 45 V574 L944 596 H642 L620 610 H24 L2 588 Z', fill: 'rgba(17,20,27,.78)', stroke: '#c9ad80', strokeWidth: '1.4' }),
                    React.createElement("path", { d: 'M7 27 L27 7 H444 L468 28 H940 L961 48 V571 L941 591 H640 L618 605 H27 L7 585 Z', fill: 'none', stroke: 'rgba(221,215,202,.3)', strokeWidth: '.6' })),
                React.createElement("div", { className: 'help-panel-content' }, categories.map((category, index) => (React.createElement("section", { className: 'help-section', key: category.title },
                    React.createElement("div", { className: 'help-section-title' },
                        React.createElement("span", { className: 'help-section-number' }, String(index + 1).padStart(2, '0')),
                        React.createElement("h2", null, category.title),
                        React.createElement(WaveLine, null)),
                    React.createElement("div", { className: 'help-commands' }, category.items.map(item => (React.createElement("div", { className: 'help-command', key: item.command },
                        React.createElement("div", { className: 'help-command-inner' },
                            item.sprite ? (React.createElement("div", { className: 'help-command-icon help-sprite', style: { backgroundImage: `url(${encodeURI(item.icon)})`, backgroundPosition: item.sprite } })) : (React.createElement("img", { className: 'help-command-icon', alt: '', src: item.icon })),
                            React.createElement("div", { className: 'help-command-text' },
                                React.createElement("div", { className: 'help-command-name' },
                                    item.name,
                                    item.private && React.createElement("span", { className: 'help-private' }, "\u79C1\u804A")),
                                React.createElement("code", null, item.command)))))))))))),
            React.createElement("footer", { className: 'help-footer' },
                React.createElement("div", { className: 'help-footer-nav' },
                    React.createElement("div", { className: 'help-footer-entry' },
                        React.createElement("span", { className: 'help-footer-icon' }, "\u2726"),
                        React.createElement("span", null, more ? '常用指令' : '私聊登录'),
                        React.createElement("code", null, more ? '#mc帮助' : '#mc登录')),
                    React.createElement("div", { className: 'help-footer-entry' },
                        React.createElement("span", null, "\u00BB"),
                        React.createElement("span", null, more ? '凭据仅限本人' : '更多指令'),
                        !more && React.createElement("code", null, "#mc\u66F4\u591A\u5E2E\u52A9"))),
                React.createElement("div", { className: 'help-footer-note' }, more ? MORE_HELP_NOTES.map(note => React.createElement("div", { key: note }, note)) : '群内先 @机器人，示例：#mc体力')))));
}

export { HELP_DATA, MORE_HELP_DATA, MORE_HELP_NOTES, WuwaHelp as default };
