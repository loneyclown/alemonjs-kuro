import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

function PoolCard({ data }) {
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
                        data.pools.length,
                        " \u4E2A\u8FDB\u884C\u4E2D")),
                React.createElement("div", { style: { fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "POOL")),
            React.createElement(Section, { title: '\u5361\u6C60\u5217\u8868' }, data.pools.length > 0 ? (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, data.pools.map((pool, i) => (React.createElement("div", { key: i, style: {
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    borderLeft: `3px solid ${C.gold}`
                } },
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } }, pool.title),
                    React.createElement("div", { style: { fontSize: '13px', color: C.textDim, marginTop: '6px' } }, pool.publishTime))))))) : (React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u5F53\u524D\u65E0\u8FDB\u884C\u4E2D\u7684\u5361\u6C60"))),
            React.createElement(Footer, null))));
}

export { PoolCard as default };
