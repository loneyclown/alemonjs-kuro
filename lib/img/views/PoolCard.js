import dayjs from 'dayjs';
import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const TYPE_COLORS = {
    char: C.gold,
    weapon: '#4fc3f7'
};
const TYPE_LABELS = {
    char: '角色',
    weapon: '武器'
};
function formatDateRange(dr) {
    if (!dr || dr.length < 2) {
        return '';
    }
    const fmt = (s) => dayjs(s).format('M.DD HH:mm');
    return `${fmt(dr[0])} ~ ${fmt(dr[1])}`;
}
function PoolCard({ data }) {
    const active = data.pools.filter(p => p.isActive);
    const inactive = data.pools.filter(p => !p.isActive);
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
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u5F53\u524D\u5361\u6C60"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        "\u5171 ",
                        active.length,
                        " \u4E2A\u8FDB\u884C\u4E2D")),
                React.createElement("div", { style: { fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "POOL")),
            active.length > 0 && (React.createElement(Section, { title: '\u8FDB\u884C\u4E2D', extra: `${active.length}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, active.map((pool, i) => {
                    const color = TYPE_COLORS[pool.type] ?? C.gold;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '10px',
                            padding: '16px 20px',
                            borderLeft: `3px solid ${color}`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                        } },
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } }, pool.poolName),
                            React.createElement("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
                                React.createElement("div", { style: { fontSize: '18px', background: `${color}30`, borderRadius: '4px', padding: '3px 10px', color, fontWeight: 'bold' } },
                                    TYPE_LABELS[pool.type] ?? '',
                                    "\u5524\u53D6"),
                                pool.timeLeft && React.createElement("div", { style: { fontSize: '18px', color: '#ef5350', fontWeight: 'bold' } }, pool.timeLeft))),
                        pool.dateRange && React.createElement("div", { style: { fontSize: '18px', color: C.textDim } }, formatDateRange(pool.dateRange)),
                        pool.items.length > 0 && React.createElement("div", { style: { fontSize: '20px', color: C.textSecondary } },
                            "UP: ",
                            pool.items.join(' / '))));
                })))),
            inactive.length > 0 && (React.createElement(Section, { title: '\u5DF2\u7ED3\u675F/\u672A\u5F00\u59CB', extra: `${inactive.length}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, inactive.map((pool, i) => (React.createElement("div", { key: i, style: {
                        background: 'rgba(0,0,0,0.2)',
                        borderRadius: '10px',
                        padding: '14px 18px',
                        borderLeft: '3px solid #555',
                        opacity: 0.6
                    } },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                        React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold', color: '#aaa' } }, pool.poolName),
                        React.createElement("div", { style: { fontSize: '18px', color: '#888' } }, pool.status)),
                    pool.dateRange && React.createElement("div", { style: { fontSize: '18px', color: '#666', marginTop: '4px' } }, formatDateRange(pool.dateRange)))))))),
            data.pools.length === 0 && (React.createElement(Section, { title: '\u5361\u6C60\u5217\u8868' },
                React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u5F53\u524D\u65E0\u5361\u6C60\u4FE1\u606F"))),
            React.createElement(Footer, null))));
}

export { PoolCard as default };
