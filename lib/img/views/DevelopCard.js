import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const QUALITY_COLORS = { 5: C.star5, 4: C.star4, 3: '#4a9ed6', 2: '#66bb6a', 1: '#9e9e9e' };
function DevelopCard({ data }) {
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement("div", { style: {
                    background: `radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                         linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
                    borderRadius: '16px',
                    padding: '25px 40px',
                    border: `1px solid ${C.panelBorder}`
                } },
                React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u89D2\u8272\u57F9\u517B\u8BA1\u7B97"),
                React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                    "UID ",
                    data.uid,
                    " \u00B7 \u5171 ",
                    data.roles.length,
                    " \u4E2A\u89D2\u8272")),
            React.createElement(Section, { title: '\u8BA1\u7B97\u89D2\u8272' },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, data.roles.map((r, i) => (React.createElement("div", { key: i, style: {
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '8px',
                        padding: '6px 14px',
                        fontSize: '14px',
                        color: '#fff',
                        border: `1px solid ${C.panelBorder}`
                    } }, r.roleName))))),
            React.createElement(Section, { title: '\u603B\u8BA1\u6240\u9700\u6750\u6599', extra: `${data.costs.length} 种` }, data.costs.length > 0 ? (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, data.costs.map((cost, i) => {
                const qColor = QUALITY_COLORS[cost.quality] ?? '#9e9e9e';
                return (React.createElement("div", { key: i, style: {
                        background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${qColor}40`,
                        borderRadius: '10px',
                        padding: '12px',
                        width: '150px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '6px',
                        boxSizing: 'border-box'
                    } },
                    cost.iconUrl && React.createElement("img", { src: cost.iconUrl, style: { width: '52px', height: '52px', display: 'block', objectFit: 'contain' } }),
                    React.createElement("div", { style: { fontSize: '13px', textAlign: 'center', color: qColor, lineHeight: 1.3 } }, cost.name),
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#fff' } },
                        "\u00D7",
                        cost.num.toLocaleString())));
            }))) : (React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u6240\u6709\u89D2\u8272\u5DF2\u6EE1\u7EA7"))),
            React.createElement(Footer, null))));
}

export { DevelopCard as default };
