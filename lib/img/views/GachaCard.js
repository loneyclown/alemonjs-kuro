import { LUCK_TAGS } from '../../model/types.js';
import React from 'react';
import HTML from './HTML.js';

const STAR_COLORS = {
    5: '#e8a640',
    4: '#9c6cdb',
    3: '#4a9ed6'
};
const LUCK_COLORS = ['#ff4444', '#ff8a80', '#b0bec5', '#81c784', '#ffd54f'];
function GachaCard({ data }) {
    return (React.createElement(HTML, { style: { minWidth: '520px' } },
        React.createElement("div", { style: {
                padding: '24px',
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: '#ffffff'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    color: '#2d2d2d'
                } },
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u62BD\u5361\u8BB0\u5F55"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                    "UID: ",
                    data.uid)),
            data.pools.map((pool, i) => (React.createElement("div", { key: i, style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                        React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold' } }, pool.poolName),
                        React.createElement("div", { style: {
                                fontSize: '11px',
                                padding: '2px 8px',
                                borderRadius: '10px',
                                background: LUCK_COLORS[pool.luckLevel] ?? LUCK_COLORS[2],
                                color: pool.luckLevel <= 1 ? '#fff' : '#2d2d2d',
                                fontWeight: 'bold'
                            } }, LUCK_TAGS[pool.luckLevel] ?? '平稳保底')),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.7 } },
                        "\u5171 ",
                        pool.total,
                        " \u62BD | \u8DDD\u4E0A\u6B215\u2605: ",
                        pool.pity,
                        "\u62BD")),
                React.createElement("div", { style: { display: 'flex', gap: '16px', fontSize: '12px', marginBottom: '8px', opacity: 0.8 } },
                    pool.avg !== null && React.createElement("span", null,
                        "\u5E73\u5747: ",
                        pool.avg,
                        "\u62BD/5\u2605"),
                    pool.avgUp !== null && React.createElement("span", null,
                        "UP\u5747: ",
                        pool.avgUp,
                        "\u62BD/UP")),
                pool.star5Items.length > 0 && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' } }, pool.star5Items.map((s, j) => (React.createElement("div", { key: j, style: {
                        background: s.isUp ? 'rgba(232,166,64,0.25)' : 'rgba(180,180,180,0.15)',
                        border: s.isUp ? '1px solid rgba(232,166,64,0.5)' : '1px solid rgba(180,180,180,0.3)',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    } },
                    React.createElement("span", { style: { color: STAR_COLORS[5], fontWeight: 'bold' } }, "\u2605"),
                    React.createElement("span", null, s.name),
                    s.isUp && React.createElement("span", { style: { color: '#ffd54f', fontSize: '10px', fontWeight: 'bold' } }, "UP"),
                    React.createElement("span", { style: { color: s.count <= 70 ? '#4fc3f7' : '#ff8a80', fontSize: '11px' } },
                        "(",
                        s.count,
                        ")")))))),
                React.createElement("div", { style: { display: 'flex', gap: '12px', fontSize: '12px' } },
                    React.createElement("span", { style: { color: STAR_COLORS[5] } },
                        "\u26055: ",
                        pool.star5Items.length),
                    React.createElement("span", { style: { color: STAR_COLORS[4] } },
                        "\u26054: ",
                        pool.star4Count),
                    React.createElement("span", { style: { color: STAR_COLORS[3] } },
                        "\u26053: ",
                        pool.star3Count))))),
            data.pools.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', opacity: 0.5 } }, "\u6682\u65E0\u62BD\u5361\u8BB0\u5F55"))));
}

export { GachaCard as default };
