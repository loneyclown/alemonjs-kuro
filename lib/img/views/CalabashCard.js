import fileUrl from '../../assets/img/stamina/lily-background.png.js';
import React from 'react';
import HTML from './HTML.js';

const PAGE_SIZE = 30;
const CSS = `
.bank{position:relative;
width:1000px;
overflow:hidden;
border-radius:24px;
background:#30364b;
color:#303449;
text-align:left;
font-family:"Microsoft YaHei",
sans-serif}

.bank *{box-sizing:border-box}

.bank-bg{position:absolute;
inset:0;
width:100%;
height:100%;
object-fit:fill;
opacity:.68}

.bank-content{position:relative;
padding:30px 24px 22px;
background:linear-gradient(180deg,
rgba(25,
30,
47,
.12),
rgba(31,
36,
55,
.6))}

.bank-brand{color:#f1e8d4;
letter-spacing:4px;
font:24px "tttgbnumber",
"SimSun",
serif;
margin:0 15px}

.bank-brand small{display:block;
font:7px Arial;
letter-spacing:4px;
margin-top:8px;
color:#dac8a4}

.bank-heading{font:italic 52px "tttgbnumber",
"SimSun",
serif;
color:#f7eddb;
letter-spacing:5px;
margin:26px 15px 22px}

.bank-heading small{display:block;
font:8px Arial;
letter-spacing:5px;
margin-top:10px;
color:#dbcba9}

.bank-hero{display:flex;
align-items:center;
gap:25px;
border:1px solid #d8bd87;
border-radius:23px;
outline:1px solid #eadabd66;
outline-offset:-5px;
background:linear-gradient(115deg,
#252b40ed,
#636a8aad);
color:#f3eddf;
padding:24px 30px;
box-shadow:0 4px 20px #171d3433}

.bank-level{flex-shrink:0;
width:110px;
text-align:center;
border-right:1px solid #d0b67d77;
padding-right:25px}

.bank-level strong{font:64px "tttgbnumber",
serif;
color:#edcf91;
line-height:1}

.bank-level span{display:block;
font-size:13px;
margin-top:8px;
color:#ded5c4}

.bank-identity{flex:1}

.bank-identity h2{font:27px "tttgbnumber",
serif;
margin:0 0 12px;
letter-spacing:2px}

.bank-tag{display:inline-block;
border:1px solid #d7c9a577;
border-radius:20px;
font-size:13px;
padding:5px 13px;
color:#e9dfcb}

.bank-exp{font-size:12px;
color:#cbcbd7;
margin-top:12px}

.bank-progress{width:280px;
text-align:right}

.bank-progress-label{font-size:15px;
letter-spacing:2px;
color:#e1d7c5}

.bank-progress-value{font:36px "tttgbnumber",
serif;
margin:8px 0;
color:#f5dba1}

.bank-track{height:8px;
border-radius:10px;
background:#555b7599;
overflow:hidden;
border:1px solid #d4c5ac55}

.bank-track i{display:block;
height:100%;
background:linear-gradient(90deg,
#c6984d,
#fff0bb);
border-radius:10px}

.bank-note{font-size:11px;
color:#c7c8d7;
margin-top:7px;
line-height:1.5}

.bank-panel{margin-top:18px;
padding:22px;
border:1px solid #e1cfaa;
border-radius:20px;
outline:1px solid #ffffff80;
outline-offset:-5px;
background:linear-gradient(120deg,
#f5f3f1ed,
#dedfeced);
box-shadow:0 5px 18px #171c3630}

.bank-section{font:23px "tttgbnumber",
"SimSun",
serif;
margin:0 0 17px;
letter-spacing:2px;
color:#313b52;
display:flex;
align-items:center;
gap:10px}

.bank-section:before{content:"◆";
font:14px serif;
color:#b98d49}

.bank-section small{font:7px Arial;
letter-spacing:3px;
color:#81879a}

.bank-section:after{content:"";
height:1px;
flex:1;
background:linear-gradient(90deg,
#b9a17d99,
transparent)}

.bank-stats{display:grid;
grid-template-columns:repeat(4,
1fr);
gap:12px}

.bank-stat{padding:17px 13px;
border:1px solid #b6b7ca;
border-radius:12px;
background:linear-gradient(135deg,
#ffffff8c,
#d1d3e35e);
text-align:center}

.bank-stat-name{font-size:13px;
color:#686e83}

.bank-stat-value{font:32px "tttgbnumber",
serif;
color:#a57730;
margin-top:9px}

.bank-stat-value small{font:15px "Microsoft YaHei",
sans-serif;
margin-left:3px}

.bank-collection-head{display:flex;
align-items:center;
justify-content:space-between;
gap:12px;
margin-bottom:18px}

.bank-summary{display:flex;
gap:16px;
font-size:12px;
color:#646d83;
flex-wrap:wrap}

.bank-summary b{font-size:17px;
color:#9b7131;
margin:0 4px}

.bank-page{font-size:12px;
color:#73788d;
white-space:nowrap}

.bank-grid{display:grid;
grid-template-columns:repeat(6,
minmax(0,
1fr));
gap:10px}

.bank-echo{border:1px solid #b4b5c9;
border-radius:10px;
overflow:hidden;
background:#f2f1f6aa;
padding:5px}

.bank-echo-art{height:82px;
position:relative;
display:flex;
align-items:center;
justify-content:center;
border-radius:6px;
background:radial-gradient(ellipse at center,
#a7a3b8,
#626579)}

.bank-echo-art img{width:77px;
height:77px;
object-fit:contain;
filter:drop-shadow(0 3px 4px #1f233a77)}

.bank-echo-art span{position:absolute;
top:5px;
right:5px;
background:#292d41cc;
color:#e9d9b5;
border:1px solid #d0b57955;
border-radius:4px;
padding:2px 5px;
font:10px Arial}

.bank-no-icon{font:24px "SimSun",
serif;
color:#d5c5a6}

.bank-echo-name{font-size:13px;
font-weight:600;
color:#364158;
margin:8px 3px 5px;
white-space:nowrap;
overflow:hidden;
text-overflow:ellipsis}

.bank-echo-count{display:flex;
justify-content:space-between;
align-items:center;
font-size:10px;
color:#7a7f93;
margin:0 3px 5px}

.bank-echo-count strong{font-size:12px;
color:#8b6a32}

.bank-echo .bank-track{height:4px;
border:0;
background:#b7bacb;
margin:0 3px 5px}

.bank-hint{margin-top:17px;
padding-top:12px;
border-top:1px solid #b6b7ca88;
font-size:12px;
color:#697188;
line-height:1.7}

.bank-hint b{color:#987039}

.bank-empty{padding:35px 15px;
color:#6a7187;
font-size:17px;
text-align:center;
line-height:1.9}

.bank-footer{margin-top:20px;
padding:12px 17px;
display:flex;
justify-content:space-between;
border:1px solid #bfa46e99;
border-radius:10px;
background:#292e45c9;
color:#e8d9b9;
font-size:12px}

.bank-footer small{color:#bdc0cf;
font-size:10px;
letter-spacing:1px}

`;
function count(value) {
    return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
}
function progress(current, total) {
    const a = count(current);
    const b = count(total);
    return a !== null && b !== null && b > 0 ? Math.min(100, (a / b) * 100) : null;
}
function rate(value) {
    if (typeof value === 'string' && /^\d+(?:\.\d+)?%$/.test(value)) {
        return value;
    }
    const number = count(value);
    return number === null ? '未返回' : `${number}%`;
}
function Track({ value }) {
    return value === null ? null : (React.createElement("div", { className: 'bank-track' },
        React.createElement("i", { style: { width: `${value}%` } })));
}
function CalabashCard({ data }) {
    const bank = data.calabash ?? {};
    const entries = (Array.isArray(bank.phantomList) ? bank.phantomList : []).filter((item) => !!item?.phantom?.name);
    const pages = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
    const page = Math.min(pages, Number.isSafeInteger(data.page) && (data.page ?? 0) > 0 ? data.page : 1);
    const start = (page - 1) * PAGE_SIZE;
    const visible = entries.slice(start, start + PAGE_SIZE);
    const completed = entries.filter(item => count(item.star) !== null && (count(item.maxStar) ?? 0) > 0 && item.star >= item.maxStar).length;
    const collected = entries.filter(item => (count(item.star) ?? 0) > 0).length;
    const overall = progress(bank.unlockCount, bank.maxCount);
    const locked = bank.isUnlock === false;
    const stats = [
        { label: '装备 COST 上限', value: count(bank.cost) ?? '未返回' },
        { label: '最高可吸收品质', value: count(bank.catchQuality) ?? '未返回', unit: count(bank.catchQuality) !== null ? '星' : '' },
        { label: '基础吸收率', value: rate(bank.baseCatch) },
        { label: '强化吸收率', value: rate(bank.strengthenCatch) }
    ];
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement("main", { className: 'bank' },
            React.createElement("style", null, CSS),
            React.createElement("img", { className: 'bank-bg', src: fileUrl, alt: '' }),
            React.createElement("div", { className: 'bank-content' },
                React.createElement("div", { className: 'bank-brand' },
                    "\u2726 \u9E23\u6F6E\u52A9\u624B",
                    React.createElement("small", null, "WUTHERING WAVES ASSISTANT")),
                React.createElement("h1", { className: 'bank-heading' },
                    "\u6570\u636E\u575E",
                    React.createElement("small", null, "DATA BANK \u00B7 ECHO ARCHIVE")),
                locked ? (React.createElement("section", { className: 'bank-panel' },
                    React.createElement("div", { className: 'bank-empty' },
                        "\u6570\u636E\u575E\u5C1A\u672A\u89E3\u9501",
                        React.createElement("br", null),
                        "\u8BF7\u5148\u5728\u6E38\u620F\u5185\u89E3\u9501\u540E\u91CD\u65B0\u67E5\u8BE2"))) : (React.createElement(React.Fragment, null,
                    React.createElement("section", { className: 'bank-hero' },
                        React.createElement("div", { className: 'bank-level' },
                            React.createElement("strong", null, count(bank.level) ?? '—'),
                            React.createElement("span", null, "\u6570\u636E\u575E\u7B49\u7EA7")),
                        React.createElement("div", { className: 'bank-identity' },
                            React.createElement("h2", null, "\u58F0\u9AB8\u6536\u96C6\u6863\u6848"),
                            React.createElement("span", { className: 'bank-tag' },
                                "UID \u00B7 ",
                                data.uid),
                            count(bank.curExp) !== null && React.createElement("div", { className: 'bank-exp' },
                                "\u5F53\u524D\u7ECF\u9A8C ",
                                bank.curExp)),
                        React.createElement("div", { className: 'bank-progress' },
                            React.createElement("div", { className: 'bank-progress-label' }, "\u56FE\u9274\u6536\u96C6\u8FDB\u5EA6"),
                            React.createElement("div", { className: 'bank-progress-value' },
                                count(bank.unlockCount) ?? '—',
                                " / ",
                                count(bank.maxCount) ?? '—'),
                            React.createElement(Track, { value: overall }),
                            React.createElement("div", { className: 'bank-note' }, "\u6309\u5DF2\u89E3\u9501\u54C1\u8D28\u6863\u4F4D\u7D2F\u8BA1 \u00B7 \u975E\u58F0\u9AB8\u79CD\u6570"))),
                    React.createElement("section", { className: 'bank-panel' },
                        React.createElement("h2", { className: 'bank-section' },
                            "\u5438\u6536\u80FD\u529B",
                            React.createElement("small", null, "ABSORPTION")),
                        React.createElement("div", { className: 'bank-stats' }, stats.map(stat => (React.createElement("div", { className: 'bank-stat', key: stat.label },
                            React.createElement("div", { className: 'bank-stat-name' }, stat.label),
                            React.createElement("div", { className: 'bank-stat-value' },
                                stat.value,
                                stat.unit && React.createElement("small", null, stat.unit))))))),
                    React.createElement("section", { className: 'bank-panel' },
                        React.createElement("h2", { className: 'bank-section' },
                            "\u58F0\u9AB8\u56FE\u9274",
                            React.createElement("small", null, "ECHO COLLECTION")),
                        entries.length ? (React.createElement(React.Fragment, null,
                            React.createElement("div", { className: 'bank-collection-head' },
                                React.createElement("div", { className: 'bank-summary' },
                                    React.createElement("span", null,
                                        "\u5DF2\u6536\u96C6",
                                        React.createElement("b", null, collected),
                                        "\u79CD"),
                                    React.createElement("span", null,
                                        "\u56FE\u9274\u5B8C\u6574",
                                        React.createElement("b", null, completed),
                                        "\u79CD"),
                                    React.createElement("span", null,
                                        "\u56FE\u9274\u6761\u76EE",
                                        React.createElement("b", null, entries.length),
                                        "\u79CD")),
                                React.createElement("div", { className: 'bank-page' },
                                    "\u7B2C ",
                                    page,
                                    " / ",
                                    pages,
                                    " \u9875 \u00B7 ",
                                    start + 1,
                                    "\u2013",
                                    start + visible.length)),
                            React.createElement("div", { className: 'bank-grid' }, visible.map((entry, i) => (React.createElement("article", { className: 'bank-echo', key: `${entry.phantom?.phantomId ?? 'echo'}-${start + i}` },
                                React.createElement("div", { className: 'bank-echo-art' },
                                    entry.phantom?.iconUrl ? React.createElement("img", { src: entry.phantom.iconUrl, alt: entry.phantom.name }) : React.createElement("div", { className: 'bank-no-icon' }, "\u58F0\u9AB8"),
                                    count(entry.phantom?.cost) !== null && React.createElement("span", null,
                                        "COST ",
                                        entry.phantom?.cost)),
                                React.createElement("div", { className: 'bank-echo-name' }, entry.phantom?.name),
                                React.createElement("div", { className: 'bank-echo-count' },
                                    React.createElement("span", null, "\u56FE\u9274\u6536\u96C6"),
                                    React.createElement("strong", null,
                                        count(entry.star) ?? '—',
                                        " / ",
                                        count(entry.maxStar) ?? '—')),
                                React.createElement(Track, { value: progress(entry.star, entry.maxStar) }))))),
                            React.createElement("div", { className: 'bank-hint' },
                                "\u6536\u96C6\u6570\u8868\u793A\u5DF2\u89E3\u9501\u7684\u54C1\u8D28\u6863\u4F4D\uFF0C\u4E0D\u662F\u6301\u6709\u6570\u91CF\u6216\u5F53\u524D\u88C5\u5907\u661F\u7EA7\u3002",
                                pages > 1 && (React.createElement(React.Fragment, null,
                                    React.createElement("br", null),
                                    page < pages ? (React.createElement(React.Fragment, null,
                                        "\u4E0B\u4E00\u9875\uFF1A",
                                        React.createElement("b", null,
                                            "#mc\u6570\u636E\u575E ",
                                            page + 1),
                                        " \u00B7",
                                        ' ')) : null,
                                    "\u53D1\u9001 ",
                                    React.createElement("b", null, "#mc\u6570\u636E\u575E \u9875\u7801"),
                                    " \u67E5\u770B\u5176\u4ED6\u58F0\u9AB8\uFF0C\u6BCF\u9875 ",
                                    PAGE_SIZE,
                                    " \u79CD\u3002"))))) : (React.createElement("div", { className: 'bank-empty' },
                            bank.showToGuest === false ? '库街区数据展示未开启' : '声骸图鉴暂未返回数据',
                            React.createElement("br", null),
                            "\u8BF7\u68C0\u67E5\u5E93\u8857\u533A\u5C55\u793A\u8BBE\u7F6E\u540E\u91CD\u65B0\u67E5\u8BE2"))))),
                React.createElement("footer", { className: 'bank-footer' },
                    React.createElement("span", null, "\u2726 #mc\u6570\u636E\u575E \u00B7 \u58F0\u9AB8\u6536\u96C6\u6863\u6848"),
                    React.createElement("small", null, "\u9E23\u6F6E\u52A9\u624B \u00B7 \u4EE5\u5E93\u8857\u533A\u8FD4\u56DE\u6570\u636E\u4E3A\u51C6"))))));
}

export { CalabashCard as default };
