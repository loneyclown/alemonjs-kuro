import React from 'react';
import HTML from './HTML.js';

const QUALITY_COLORS = {
    5: '#e8a640',
    4: '#9c6cdb',
    3: '#4a9ed6',
    2: '#6eb86e',
    1: '#9e9e9e'
};
const QUALITY_BG = {
    5: 'rgba(232,166,64,0.15)',
    4: 'rgba(156,108,219,0.15)',
    3: 'rgba(74,158,214,0.15)',
    2: 'rgba(110,184,110,0.15)',
    1: 'rgba(158,158,158,0.15)'
};
function DevelopCard({ data }) {
    return (React.createElement(HTML, { style: { minWidth: '560px' } },
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
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u89D2\u8272\u57F9\u517B\u8BA1\u7B97"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                    "UID: ",
                    data.uid,
                    " | \u5171 ",
                    data.roles.length,
                    " \u4E2A\u89D2\u8272")),
            React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { fontSize: '13px', color: '#e8d5b0', marginBottom: '8px' } }, "\u8BA1\u7B97\u89D2\u8272"),
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } }, data.roles.map((r, i) => (React.createElement("div", { key: i, style: {
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '6px',
                        padding: '3px 10px',
                        fontSize: '12px'
                    } }, r.roleName))))),
            React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '14px 16px'
                } },
                React.createElement("div", { style: { fontSize: '14px', color: '#e8d5b0', marginBottom: '12px' } },
                    "\u603B\u8BA1\u6240\u9700\u6750\u6599 (",
                    data.costs.length,
                    " \u79CD)"),
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, data.costs.map((cost, i) => (React.createElement("div", { key: i, style: {
                        background: QUALITY_BG[cost.quality] ?? QUALITY_BG[1],
                        border: `1px solid ${QUALITY_COLORS[cost.quality] ?? QUALITY_COLORS[1]}44`,
                        borderRadius: '8px',
                        padding: '10px 12px',
                        width: '140px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                    } },
                    cost.iconUrl && React.createElement("img", { src: cost.iconUrl, style: { width: '48px', height: '48px', objectFit: 'contain' } }),
                    React.createElement("div", { style: {
                            fontSize: '11px',
                            textAlign: 'center',
                            color: QUALITY_COLORS[cost.quality] ?? '#fff',
                            lineHeight: '1.3'
                        } }, cost.name),
                    React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold' } },
                        "\u00D7",
                        cost.num.toLocaleString())))))),
            data.costs.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', opacity: 0.5 } }, "\u6240\u6709\u89D2\u8272\u5DF2\u6EE1\u7EA7"))));
}

export { DevelopCard as default };
