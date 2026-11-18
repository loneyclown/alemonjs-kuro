import { selectMonth } from '../../model/period.js';
import fileUrl from '../../assets/img/stamina/lily-background.png.js';
import React from 'react';
import HTML from './HTML.js';

const RESOURCES = {
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
function amount(value) {
    return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : null;
}
function number(value) {
    const parsed = amount(value);
    return parsed === null ? '未返回' : parsed.toLocaleString('zh-CN');
}
function ResourceIcon({ type, color }) {
    return (React.createElement("svg", { className: 'ledger-icon', viewBox: '0 0 40 40', fill: 'none', style: { color }, "aria-hidden": 'true' }, type === 2 ? (React.createElement(React.Fragment, null,
        React.createElement("path", { d: 'm20 2 5 12 13 6-13 5-5 13-5-13L2 20l13-6Z', fill: 'currentColor', opacity: '.25' }),
        React.createElement("path", { d: 'm20 2 5 12 13 6-13 5-5 13-5-13L2 20l13-6Z', stroke: 'currentColor' }),
        React.createElement("path", { d: 'm20 10 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z', fill: 'currentColor' }))) : type === 1 ? (React.createElement(React.Fragment, null,
        React.createElement("circle", { cx: '20', cy: '20', r: '16', stroke: 'currentColor', strokeWidth: '2' }),
        React.createElement("circle", { cx: '20', cy: '20', r: '12', fill: 'currentColor', opacity: '.2' }),
        React.createElement("path", { d: 'm10 21 5-6 5 10 5-10 5 6M20 8v4m0 16v4', stroke: 'currentColor', strokeWidth: '2' }))) : (React.createElement(React.Fragment, null,
        React.createElement("path", { d: 'm8 6 27 7-6 24L2 30Z', fill: 'currentColor', opacity: '.2' }),
        React.createElement("path", { d: 'm11 3 26 7-7 27-26-7Z', stroke: 'currentColor', strokeWidth: '1.5' }),
        React.createElement("path", { d: 'm22 11 3 7 6 4-8 2-5 6-1-8-5-5 7-1Z', fill: 'currentColor' })))));
}
function PeriodCard({ data }) {
    const detail = data.detail ?? {};
    const items = (Array.isArray(detail.itemList) ? detail.itemList : []).filter((item) => !!item && amount(item.type) !== null);
    const types = [...new Set([2, 1, 3, 4, ...items.map(item => item.type)])];
    const resources = types.map(type => {
        const item = items.find(candidate => candidate.type === type);
        const fallbackTotal = type === 2 ? detail.totalStar : type === 1 ? detail.totalCoin : undefined;
        const fallbackSources = type === 2 ? detail.starList : type === 1 ? detail.coinList : [];
        const rawSources = item?.detail ?? fallbackSources;
        const sources = (Array.isArray(rawSources) ? rawSources : []).filter((node) => !!node);
        const sorted = [...sources].sort((a, b) => (amount(b.num) ?? -1) - (amount(a.num) ?? -1));
        const total = amount(item?.total) ?? amount(fallbackTotal);
        const sourceSum = sources.length && sources.every(node => amount(node.num) !== null) ? sources.reduce((sum, node) => sum + node.num, 0) : null;
        return { type, ...(RESOURCES[type] ?? { name: `资源 ${type}`, color: '#85899e', english: 'RESOURCE' }), total, sources: sorted, sourceSum };
    });
    const month = data.periodType === 'month' ? selectMonth([{ index: data.periodIndex ?? NaN, title: data.periodTitle }]) : null;
    const monthLabel = month ? `${Math.floor(month.index / 100)}年${month.index % 100}月` : data.periodTitle;
    const historyExample = selectMonth(data.availableMonths?.filter(item => item?.index !== month?.index)) ?? month;
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement("main", { className: 'ledger' },
            React.createElement("style", null, CSS),
            React.createElement("img", { className: 'ledger-bg', src: fileUrl, alt: '' }),
            React.createElement("div", { className: 'ledger-content' },
                React.createElement("div", { className: 'ledger-brand' },
                    "\u2726 \u9E23\u6F6E\u52A9\u624B",
                    React.createElement("small", null, "WUTHERING WAVES ASSISTANT")),
                React.createElement("h1", { className: 'ledger-title' },
                    "\u8D44\u6E90\u6708\u62A5",
                    React.createElement("small", null, "RESOURCE LEDGER \u00B7 MONTHLY INCOME")),
                React.createElement("section", { className: 'ledger-profile' },
                    React.createElement("div", null,
                        React.createElement("div", { className: 'ledger-month' }, monthLabel || '统计周期未返回'),
                        React.createElement("span", { className: 'ledger-uid' },
                            "UID \u00B7 ",
                            data.uid)),
                    React.createElement("div", { className: 'ledger-profile-note' },
                        React.createElement("strong", null, "\u672C\u671F\u8D44\u6E90\u6536\u5165"),
                        "\u4EC5\u7EDF\u8BA1\u6240\u9009\u5468\u671F\u5185\u7684\u83B7\u53D6\u91CF",
                        React.createElement("br", null),
                        "\u4E0D\u4EE3\u8868\u5F53\u524D\u6301\u6709\u6570\u91CF")),
                React.createElement("div", { className: 'ledger-totals' }, resources.map(resource => (React.createElement("div", { className: 'ledger-total', key: resource.type },
                    React.createElement("div", { className: 'ledger-total-top' },
                        React.createElement(ResourceIcon, { type: resource.type, color: resource.color }),
                        resource.name),
                    React.createElement("div", { className: 'ledger-total-value', style: { color: resource.color } }, number(resource.total)),
                    React.createElement("small", null, resource.english))))),
                React.createElement("h2", { className: 'ledger-heading' },
                    "\u6536\u5165\u6765\u6E90",
                    React.createElement("small", null, "INCOME BREAKDOWN")),
                React.createElement("div", { className: 'ledger-grid' }, resources.map(resource => (React.createElement("section", { className: 'ledger-panel', key: resource.type },
                    React.createElement("header", { className: 'ledger-panel-head' },
                        React.createElement("div", { className: 'ledger-panel-name' },
                            resource.name,
                            React.createElement("small", null, resource.english)),
                        React.createElement("div", { className: 'ledger-panel-total', style: { color: resource.color } }, number(resource.total))),
                    resource.sources.length ? (React.createElement(React.Fragment, null,
                        React.createElement("div", { className: 'ledger-table-head' },
                            React.createElement("span", null, "\u6765\u6E90"),
                            React.createElement("span", null, "\u83B7\u53D6\u6570\u91CF / \u5360\u6BD4")),
                        React.createElement("div", { className: 'ledger-sources' }, resource.sources.map((source, i) => {
                            const value = amount(source.num);
                            const share = value !== null && resource.total !== null && resource.total > 0 ? (value / resource.total) * 100 : null;
                            return (React.createElement("div", { className: `ledger-row${value === 0 ? ' zero' : ''}`, key: i },
                                React.createElement("div", { className: 'ledger-row-text' },
                                    React.createElement("span", { className: 'ledger-source-name' }, source.type || '未命名来源'),
                                    React.createElement("span", { className: 'ledger-source-num' }, number(value)),
                                    React.createElement("span", { className: 'ledger-source-share' }, share === null ? '—' : `${share.toFixed(1)}%`)),
                                share !== null && (React.createElement("div", { className: 'ledger-track' },
                                    React.createElement("i", { style: { width: `${Math.min(100, share)}%`, background: resource.color } })))));
                        })),
                        resource.sourceSum !== null && resource.total !== null && resource.sourceSum !== resource.total && (React.createElement("div", { className: 'ledger-discrepancy' }, "\u6765\u6E90\u660E\u7EC6\u4E0E\u603B\u91CF\u4E0D\u5B8C\u5168\u4E00\u81F4\uFF0C\u5360\u6BD4\u6309\u672C\u671F\u603B\u91CF\u8BA1\u7B97\u3002")))) : (React.createElement("div", { className: 'ledger-empty' }, "\u6765\u6E90\u660E\u7EC6\u6682\u672A\u8FD4\u56DE")))))),
                typeof detail.copyWriting === 'string' && detail.copyWriting.trim() && (React.createElement("div", { className: 'ledger-memo' },
                    React.createElement("span", null, "THIS PERIOD \u00B7 \u672C\u671F\u5C0F\u8BB0"),
                    detail.copyWriting)),
                React.createElement("div", { className: 'ledger-navigation' },
                    "\u9ED8\u8BA4\u67E5\u8BE2\u6700\u65B0\u53EF\u7528\u6708\u4EFD \u00B7 \u6307\u5B9A\u6708\u4EFD\uFF1A",
                    React.createElement("b", null,
                        "#mc\u661F\u58F0 ",
                        historyExample?.index ?? '年月'),
                    " \u6216",
                    ' ',
                    React.createElement("b", null,
                        "#mc\u661F\u58F0 ",
                        historyExample ? `${historyExample.index % 100}月` : '月份'),
                    !!data.availableMonths?.length && (React.createElement("div", null,
                        "\u53EF\u7528\u6708\u4EFD\uFF1A",
                        data.availableMonths
                            .filter(item => !!item)
                            .map(item => (React.createElement("span", { key: item.index },
                            item.title,
                            " ",
                            React.createElement("b", null,
                                "#mc\u661F\u58F0 ",
                                item.index))))))),
                React.createElement("footer", { className: 'ledger-footer' },
                    React.createElement("span", null, "\u2726 #mc\u661F\u58F0 \u00B7 \u8D44\u6E90\u6708\u62A5"),
                    React.createElement("small", null, "\u9E23\u6F6E\u52A9\u624B \u00B7 \u4EE5\u5E93\u8857\u533A\u8FD4\u56DE\u6570\u636E\u4E3A\u51C6"))))));
}

export { PeriodCard as default };
