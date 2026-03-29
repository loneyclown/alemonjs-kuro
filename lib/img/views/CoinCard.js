import React from 'react';
import { LightContainer, LightHeader } from './CardBase.js';
import HTML from './HTML.js';

function CoinCard({ data }) {
    const { uid, mine } = data;
    return (React.createElement(HTML, { style: { width: '420px' } },
        React.createElement(LightContainer, { width: 420 },
            React.createElement(LightHeader, { title: '\u5E93\u6D1B\u5E01', subtitle: `${mine.userName} · UID ${uid}` }),
            React.createElement("div", { style: { width: '100%', padding: '24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' } },
                mine.headUrl && (React.createElement("div", { style: {
                        width: '90px',
                        height: '90px',
                        borderRadius: '45px',
                        overflow: 'hidden',
                        border: '3px solid rgba(212,177,99,0.8)',
                        marginBottom: '14px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
                    } },
                    React.createElement("img", { src: mine.headUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } }))),
                React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold', color: '#2c3e50', marginBottom: '4px' } }, mine.userName),
                mine.signature && React.createElement("div", { style: { fontSize: '14px', color: '#7f8c8d', marginBottom: '20px' } }, mine.signature),
                React.createElement("div", { style: {
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '24px 40px',
                        textAlign: 'center',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.06)',
                        width: '80%',
                        boxSizing: 'border-box'
                    } },
                    React.createElement("div", { style: { fontSize: '14px', color: '#95a5a6', marginBottom: '8px' } }, "\u5E93\u6D1B\u5E01\u4F59\u989D"),
                    React.createElement("div", { style: { fontSize: '48px', fontWeight: 'bold', color: '#d4b163', lineHeight: 1, textShadow: '0 2px 8px rgba(212,177,99,0.3)' } }, mine.goldNum)),
                React.createElement("div", { style: { fontSize: '14px', color: '#95a5a6', marginTop: '16px' } },
                    "\u5E93\u8857\u533A ID: ",
                    mine.userId)),
            React.createElement("div", { style: { textAlign: 'center', fontSize: '12px', color: '#bdc3c7', padding: '0 0 16px' } }, "Powered by AlemonJS \u00B7 \u9E23\u6F6E\u52A9\u624B"))));
}

export { CoinCard as default };
