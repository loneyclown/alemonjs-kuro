import { sortedAnnouncements, ANN_CATEGORIES, annTimestamp } from '../../model/announcements.js';
import fileUrl from '../../assets/img/stamina/lily-background.png.js';
import React from 'react';
import HTML from './HTML.js';

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
function date(item) {
    const value = annTimestamp(item.publishTime) ?? annTimestamp(item.firstPublishTime);
    return value === null
        ? '日期未返回'
        : new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(value);
}
function Cover({ item }) {
    const url = item.coverUrl || item.coverImages?.find(image => !!image?.url)?.url;
    return url ? React.createElement("img", { src: url, alt: '' }) : React.createElement("div", { className: 'news-fallback' }, "\u9E23\u6F6E");
}
function AnnCard({ data }) {
    const category = data.category ?? 'notice';
    const meta = ANN_CATEGORIES[category];
    const items = sortedAnnouncements(data[meta.key]);
    const first = items[0];
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement("main", { className: 'news-sheet' },
            React.createElement("style", null, CSS),
            React.createElement("img", { className: 'news-backdrop', src: fileUrl, alt: '' }),
            React.createElement("div", { className: 'news-content' },
                React.createElement("div", { className: 'news-brand' },
                    "\u2726 \u9E23\u6F6E\u52A9\u624B",
                    React.createElement("small", null, "WUTHERING WAVES ASSISTANT")),
                React.createElement("h1", { className: 'news-title' },
                    meta.title,
                    React.createElement("small", null,
                        meta.english,
                        " \u00B7 WUTHERING WAVES")),
                React.createElement("section", { className: 'news-panel' },
                    React.createElement("header", { className: 'news-heading' },
                        React.createElement("h2", null, "\u8FD1\u671F\u53D1\u5E03"),
                        React.createElement("span", null,
                            "\u6700\u8FD1 ",
                            items.length,
                            " \u6761 \u00B7 \u6309\u53D1\u5E03\u65F6\u95F4\u6392\u5E8F")),
                    first ? (React.createElement(React.Fragment, null,
                        React.createElement("article", { className: 'news-feature' },
                            React.createElement("div", { className: 'news-feature-art' },
                                React.createElement(Cover, { item: first })),
                            React.createElement("div", { className: 'news-feature-copy' },
                                React.createElement("div", { className: 'news-meta' },
                                    React.createElement("span", { className: 'news-tag' }, meta.title),
                                    React.createElement("span", null, date(first))),
                                React.createElement("div", { className: 'news-feature-title' },
                                    React.createElement("span", { className: 'news-number' }, "01"),
                                    first.postTitle),
                                React.createElement("div", { className: 'news-feature-command' },
                                    "\u67E5\u770B\u539F\u6587\uFF1A",
                                    meta.command,
                                    " 1"))),
                        !!items.slice(1).length && (React.createElement("div", { className: 'news-grid' }, items.slice(1).map((item, index) => (React.createElement("article", { className: 'news-article', key: item.postId || index },
                            React.createElement("div", { className: 'news-article-art' },
                                React.createElement(Cover, { item: item })),
                            React.createElement("div", { className: 'news-article-copy' },
                                React.createElement("div", { className: 'news-article-title' }, item.postTitle),
                                React.createElement("div", { className: 'news-meta' },
                                    React.createElement("span", { className: 'news-number' }, String(index + 2).padStart(2, '0')),
                                    React.createElement("span", null, date(item))))))))),
                        React.createElement("div", { className: 'news-caption' },
                            "\u53D1\u9001 ",
                            React.createElement("b", null,
                                meta.command,
                                " \u7F16\u53F7"),
                            " \u83B7\u53D6\u5E93\u8857\u533A\u539F\u6587\u94FE\u63A5\uFF0C\u4F8B\u5982 ",
                            React.createElement("b", null,
                                meta.command,
                                " 1"),
                            "\u3002\u7F16\u53F7\u4EE5\u6700\u8FD1\u4E00\u6B21\u67E5\u8BE2\u4E3A\u51C6\uFF0C10\u5206\u949F\u6709\u6548\u3002",
                            category === 'activity' && (React.createElement(React.Fragment, null,
                                React.createElement("br", null),
                                "\u6B64\u9875\u4E3A\u6D3B\u52A8\u6587\u7AE0\u5217\u8868\uFF0C\u6D3B\u52A8\u662F\u5426\u4ECD\u5728\u8FDB\u884C\u8BF7\u4EE5\u539F\u6587\u65F6\u95F4\u4E3A\u51C6\u3002"))))) : (React.createElement("div", { className: 'news-empty' },
                        "\u6682\u65E0",
                        meta.title,
                        "\u4FE1\u606F\uFF0C\u8BF7\u7A0D\u540E\u91CD\u65B0\u67E5\u8BE2"))),
                React.createElement("div", { className: 'news-navigation' },
                    "\u6E38\u620F\u516C\u544A\uFF1A",
                    React.createElement("b", null, "#mc\u516C\u544A"),
                    " \u00B7 \u6D3B\u52A8\u901F\u9012\uFF1A",
                    React.createElement("b", null, "#mc\u516C\u544A \u6D3B\u52A8"),
                    " \u00B7 \u6E38\u620F\u8D44\u8BAF\uFF1A",
                    React.createElement("b", null, "#mc\u516C\u544A \u8D44\u8BAF")),
                React.createElement("footer", { className: 'news-footer' },
                    React.createElement("span", null,
                        "\u2726 ",
                        meta.command,
                        " \u00B7 ",
                        meta.title),
                    React.createElement("small", null, "\u9E23\u6F6E\u52A9\u624B \u00B7 \u6765\u6E90\uFF1A\u5E93\u8857\u533A"))))));
}

export { AnnCard as default };
