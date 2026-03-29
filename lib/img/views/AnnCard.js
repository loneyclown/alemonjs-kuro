import React from 'react';
import HTML from './HTML.js';

function AnnSection({ title, icon, items }) {
    if (items.length === 0) {
        return null;
    }
    return (React.createElement("div", { style: { marginBottom: '12px' } },
        React.createElement("div", { style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#a78bfa',
                marginBottom: '8px',
                borderLeft: '3px solid #a78bfa',
                paddingLeft: '10px'
            } },
            icon,
            " ",
            title),
        items.map((item, i) => (React.createElement("div", { key: i, style: {
                background: '#32334f',
                borderRadius: '10px',
                padding: '12px',
                marginBottom: '8px',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
            } },
            item.coverUrl && (React.createElement("div", { style: {
                    width: '100px',
                    height: '56px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    flexShrink: 0
                } },
                React.createElement("img", { src: item.coverUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } }))),
            React.createElement("div", { style: { flex: 1 } },
                React.createElement("div", { style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#e0e4ff',
                        lineHeight: '1.3',
                        marginBottom: '4px'
                    } }, item.title),
                React.createElement("div", { style: { fontSize: '11px', color: '#8088bb' } }, item.publishTime)))))));
}
function AnnCard({ data }) {
    const { activities, notices } = data;
    return (React.createElement(HTML, { style: { minWidth: '480px' } },
        React.createElement("div", { style: {
                padding: '24px',
                background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                    borderRadius: '12px 12px 0 0',
                    padding: '16px 20px'
                } },
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83D\uDCF0 \u6E38\u620F\u516C\u544A"),
                React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } }, "\u9E23\u6F6E \u00B7 \u6700\u65B0\u8D44\u8BAF")),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '16px'
                } },
                React.createElement(AnnSection, { title: '\u5F53\u524D\u6D3B\u52A8', icon: '\uD83C\uDF89', items: activities }),
                React.createElement(AnnSection, { title: '\u6E38\u620F\u516C\u544A', icon: '\uD83D\uDCCB', items: notices })))));
}

export { AnnCard as default };
