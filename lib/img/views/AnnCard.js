import React from 'react';
import { LightContainer, LightHeader, C } from './CardBase.js';
import HTML from './HTML.js';

function AnnSection({ title, items }) {
    if (items.length === 0) {
        return null;
    }
    return (React.createElement("div", { style: { marginBottom: '20px' } },
        React.createElement("div", { style: {
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#2c3e50',
                marginBottom: '12px',
                paddingLeft: '12px',
                borderLeft: `3px solid ${C.gold}`
            } }, title),
        items.map((item, i) => (React.createElement("div", { key: i, style: {
                background: '#fff',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '10px',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.04)'
            } },
            item.coverUrl && (React.createElement("div", { style: { width: '120px', height: '68px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 } },
                React.createElement("img", { src: item.coverUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } }))),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: { fontSize: '15px', fontWeight: 'bold', color: '#2c3e50', lineHeight: 1.3, marginBottom: '6px' } }, item.title),
                React.createElement("div", { style: { fontSize: '13px', color: '#95a5a6' } }, item.publishTime)))))));
}
function AnnCard({ data }) {
    return (React.createElement(HTML, { style: { width: '750px' } },
        React.createElement(LightContainer, { width: 750 },
            React.createElement(LightHeader, { title: '\u6E38\u620F\u516C\u544A', subtitle: '\u9E23\u6F6E \u00B7 \u6700\u65B0\u8D44\u8BAF' }),
            React.createElement("div", { style: { width: '100%', padding: '24px', boxSizing: 'border-box' } },
                React.createElement(AnnSection, { title: '\u5F53\u524D\u6D3B\u52A8', items: data.activities }),
                React.createElement(AnnSection, { title: '\u6E38\u620F\u516C\u544A', items: data.notices })),
            React.createElement("div", { style: { textAlign: 'center', fontSize: '12px', color: '#bdc3c7', padding: '0 0 16px' } }, "Powered by AlemonJS \u00B7 \u9E23\u6F6E\u52A9\u624B"))));
}

export { AnnCard as default };
