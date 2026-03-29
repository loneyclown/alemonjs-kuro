import { LUCK_TAGS } from '../../model/types.js';
import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const STAR_COLORS = { 5: C.star5, 4: C.star4, 3: '#4a9ed6' };
const LUCK_COLORS = ['#ef5350', '#ff8a80', '#9e9e9e', '#66bb6a', C.gold];
function GachaCard({ data }) {
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement("div", { style: {
                    background: `radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                         linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
                    borderRadius: '16px',
                    padding: '25px 40px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: `1px solid ${C.panelBorder}`
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u62BD\u5361\u8BB0\u5F55"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        "UID ",
                        data.uid)),
                React.createElement("div", { style: { fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "GACHA LOG")),
            data.pools.map((pool, i) => (React.createElement(Section, { key: i, title: pool.poolName, extra: `${pool.total} 抽` },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' } },
                    React.createElement("div", { style: {
                            fontSize: '14px',
                            padding: '4px 14px',
                            borderRadius: '20px',
                            background: `${LUCK_COLORS[pool.luckLevel] ?? LUCK_COLORS[2]}30`,
                            color: LUCK_COLORS[pool.luckLevel] ?? LUCK_COLORS[2],
                            fontWeight: 'bold',
                            border: `1px solid ${LUCK_COLORS[pool.luckLevel] ?? LUCK_COLORS[2]}50`
                        } }, LUCK_TAGS[pool.luckLevel] ?? '平稳保底'),
                    React.createElement("div", { style: { fontSize: '14px', color: C.textDim } },
                        "\u8DDD\u4E0A\u6B215\u2605: ",
                        React.createElement("span", { style: { color: C.gold, fontWeight: 'bold' } }, pool.pity),
                        " \u62BD"),
                    pool.avg !== null && (React.createElement("div", { style: { fontSize: '14px', color: C.textDim } },
                        "\u5E73\u5747: ",
                        React.createElement("span", { style: { color: '#fff', fontWeight: 'bold' } }, pool.avg),
                        " \u62BD/5\u2605")),
                    pool.avgUp !== null && (React.createElement("div", { style: { fontSize: '14px', color: C.textDim } },
                        "UP\u5747: ",
                        React.createElement("span", { style: { color: '#fff', fontWeight: 'bold' } }, pool.avgUp),
                        " \u62BD"))),
                pool.star5Items.length > 0 && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' } }, pool.star5Items.map((s, j) => (React.createElement("div", { key: j, style: {
                        background: s.isUp ? C.goldDim : 'rgba(0,0,0,0.3)',
                        border: `1px solid ${s.isUp ? C.goldBorder : C.panelBorder}`,
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    } },
                    React.createElement("span", { style: { color: C.gold, fontWeight: 'bold' } }, "\u2605"),
                    React.createElement("span", { style: { color: '#fff' } }, s.name),
                    s.isUp && React.createElement("span", { style: { color: C.gold, fontSize: '11px', fontWeight: 'bold' } }, "UP"),
                    React.createElement("span", { style: { color: s.count <= 70 ? '#4fc3f7' : '#ef5350', fontSize: '13px' } },
                        "(",
                        s.count,
                        ")")))))),
                React.createElement("div", { style: { display: 'flex', gap: '20px', fontSize: '14px' } },
                    React.createElement("span", { style: { color: STAR_COLORS[5] } },
                        "\u26055: ",
                        pool.star5Items.length),
                    React.createElement("span", { style: { color: STAR_COLORS[4] } },
                        "\u26054: ",
                        pool.star4Count),
                    React.createElement("span", { style: { color: STAR_COLORS[3] } },
                        "\u26053: ",
                        pool.star3Count))))),
            data.pools.length === 0 && (React.createElement(Section, { title: '\u6682\u65E0\u6570\u636E' },
                React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u6682\u65E0\u62BD\u5361\u8BB0\u5F55"))),
            React.createElement(Footer, null))));
}

export { GachaCard as default };
