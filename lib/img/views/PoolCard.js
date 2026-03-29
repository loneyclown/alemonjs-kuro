import React from 'react';
import HTML from './HTML.js';

function PoolCard({ data }) {
    return (React.createElement(HTML, { style: { minWidth: '480px' } },
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
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u5F53\u524D\u5361\u6C60"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                    "\u5171 ",
                    data.pools.length,
                    " \u4E2A\u8FDB\u884C\u4E2D")),
            data.pools.map((pool, i) => (React.createElement("div", { key: i, style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                } },
                React.createElement("div", { style: {
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #e8a640, #d3bc8e)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0
                    } }, "\uD83D\uDCCC"),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, pool.title),
                    React.createElement("div", { style: { fontSize: '11px', opacity: 0.6, marginTop: '4px' } }, pool.publishTime))))),
            data.pools.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', opacity: 0.5 } }, "\u5F53\u524D\u65E0\u8FDB\u884C\u4E2D\u7684\u5361\u6C60"))));
}

export { PoolCard as default };
