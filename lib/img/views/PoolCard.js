import fileUrl from '../../assets/img/stamina/lily-background.png.js';
import React from 'react';
import HTML from './HTML.js';

const CSS = `
.pool-sheet {
  position: relative;
  width: 1000px;
  overflow: hidden;
  border-radius: 24px;
  background: #30364b;
  color: #354058;
  font-family: "Microsoft YaHei", sans-serif;
  text-align: left;
}
.pool-sheet * { box-sizing: border-box; }
.pool-backdrop { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; opacity: .66; }
.pool-content { position: relative; padding: 28px 24px 24px; background: linear-gradient(180deg, #1b203116, #20273bb3); }
.pool-header { margin: 0 15px 24px; color: #f4ead7; }
.pool-brand { font: 24px "tttgbnumber", "SimSun", serif; letter-spacing: 4px; }
.pool-header h1 { margin: 16px 0 12px; font: italic 48px "tttgbnumber", "SimSun", serif; letter-spacing: 5px; }
.pool-header p { margin: 0; font-size: 14px; color: #e0d5c1; }
.pool-round {
  margin-top: 18px;
  padding: 20px;
  border: 1px solid #dfcca5;
  outline: 1px solid #ffffff77;
  outline-offset: -5px;
  border-radius: 21px;
  background: linear-gradient(120deg, #f6f3eff0, #dedfeced);
}
.pool-round-head { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 0 0 14px; border-bottom: 1px solid #b7bacb99; }
.pool-round-head strong { font: 23px "tttgbnumber", "SimSun", serif; color: #8b6833; }
.pool-round-time { font-size: 14px; color: #535e75; }
.pool-countdown { border: 1px solid #b18a4e66; border-radius: 16px; padding: 5px 11px; background: #eadabd88; color: #805b28; font-size: 13px; }
.pool-columns { display: flex; gap: 16px; }
.pool-column { flex: 1; min-width: 0; }
.pool-column h2 { margin: 16px 0 10px; font-size: 17px; color: #8b6833; }
.pool-column.weapon h2 { color: #526c8d; }
.pool-entry {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 82px;
  padding: 10px 12px;
  margin-bottom: 8px;
  border: 1px solid #b7bacb;
  border-radius: 10px;
  background: #f1eff6ba;
}
.pool-entry:last-child { margin-bottom: 0; }
.pool-entry h3 { margin: 0; font-size: 17px; line-height: 1.45; overflow-wrap: anywhere; }
.pool-entry p { margin: 5px 0 0; color: #59647b; font-size: 12px; line-height: 1.5; }
.pool-art { display: flex; gap: 4px; flex-shrink: 0; }
.pool-art img { display: block; width: 46px; height: 59px; object-fit: contain; border-radius: 5px; background: #cbd0df; }
.pool-empty { text-align: center; color: #59647b; }
.pool-footer { margin-top: 18px; padding: 12px 16px; border: 1px solid #c5aa7788; border-radius: 10px; background: #2b3147d9; color: #e5d7b8; font-size: 12px; }
`;
function PoolColumn({ title, type, pools }) {
    if (!pools.length) {
        return null;
    }
    return (React.createElement("div", { className: `pool-column ${type}` },
        React.createElement("h2", null, title),
        pools.map((pool, index) => {
            const names = [...new Set(pool.images.map(image => image.title.trim()).filter(Boolean))];
            return (React.createElement("article", { className: 'pool-entry', key: index },
                !!pool.images.length && (React.createElement("div", { className: 'pool-art' }, pool.images.slice(0, 4).map((image, i) => (React.createElement("img", { key: i, src: image.url, alt: image.title }))))),
                React.createElement("div", null,
                    React.createElement("h3", null, pool.name),
                    !!names.length && React.createElement("p", null, names.join(' / ')))));
        })));
}
function PoolCard({ data }) {
    const active = data.rounds.reduce((count, round) => count + (round.status === '进行中' ? round.pools.length : 0), 0);
    const summary = active ? `${active} 个活动唤取进行中` : data.rounds.some(round => round.range) ? '暂无已确认进行中的活动唤取' : '';
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement("main", { className: 'pool-sheet' },
            React.createElement("style", null, CSS),
            React.createElement("img", { className: 'pool-backdrop', src: fileUrl, alt: '' }),
            React.createElement("div", { className: 'pool-content' },
                React.createElement("header", { className: 'pool-header' },
                    React.createElement("div", { className: 'pool-brand' }, "\u2726 \u9E23\u6F6E\u52A9\u624B"),
                    React.createElement("h1", null, "\u6D3B\u52A8\u5524\u53D6"),
                    summary && React.createElement("p", null, summary)),
                data.rounds.map((round, index) => (React.createElement("section", { className: 'pool-round', key: index },
                    React.createElement("header", { className: 'pool-round-head' },
                        React.createElement("strong", null, round.status),
                        round.range && React.createElement("span", { className: 'pool-round-time' }, round.range.join(' — ')),
                        round.countdown && React.createElement("span", { className: 'pool-countdown' },
                            "\u5269\u4F59 ",
                            round.countdown)),
                    React.createElement("div", { className: 'pool-columns' },
                        React.createElement(PoolColumn, { title: '\u89D2\u8272\u5524\u53D6', type: 'char', pools: round.pools.filter(pool => pool.type === 'char') }),
                        React.createElement(PoolColumn, { title: '\u6B66\u5668\u5524\u53D6', type: 'weapon', pools: round.pools.filter(pool => pool.type === 'weapon') }))))),
                !data.rounds.length && React.createElement("section", { className: 'pool-round pool-empty' }, "Wiki \u6682\u672A\u8FD4\u56DE\u6D3B\u52A8\u5524\u53D6\u4FE1\u606F"),
                React.createElement("footer", { className: 'pool-footer' }, "\u2726 #mc\u5361\u6C60 \u00B7 \u6765\u6E90\uFF1A\u9E23\u6F6E Wiki \u00B7 \u5317\u4EAC\u65F6\u95F4")))));
}

export { PoolCard as default };
