import React from 'react';
import HTML from './HTML.js';

function CoinCard({ data }) {
    const { uid, mine } = data;
    return (React.createElement(HTML, { style: { minWidth: '380px' } },
        React.createElement("div", { style: {
                padding: '24px',
                background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                    borderRadius: '12px 12px 0 0',
                    padding: '16px 20px'
                } },
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83E\uDE99 \u5E93\u6D1B\u5E01"),
                React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                    mine.userName,
                    " \u00B7 UID ",
                    uid)),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                } },
                mine.headUrl && (React.createElement("div", { style: {
                        width: '80px',
                        height: '80px',
                        borderRadius: '40px',
                        overflow: 'hidden',
                        border: '3px solid #a78bfa',
                        marginBottom: '12px'
                    } },
                    React.createElement("img", { src: mine.headUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } }))),
                React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: '#e0e4ff', marginBottom: '4px' } }, mine.userName),
                mine.signature && React.createElement("div", { style: { fontSize: '12px', color: '#a0a4cc', marginBottom: '16px' } }, mine.signature),
                React.createElement("div", { style: {
                        background: '#32334f',
                        borderRadius: '12px',
                        padding: '16px 32px',
                        textAlign: 'center'
                    } },
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginBottom: '6px' } }, "\u5E93\u6D1B\u5E01\u4F59\u989D"),
                    React.createElement("div", { style: { fontSize: '32px', fontWeight: 'bold', color: '#fbbf24' } }, mine.goldNum)),
                React.createElement("div", { style: { fontSize: '12px', color: '#8088bb', marginTop: '12px' } },
                    "\u5E93\u8857\u533A ID: ",
                    mine.userId)))));
}

export { CoinCard as default };
