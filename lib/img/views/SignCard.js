import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

function SignCard({ data }) {
    const { uid, sign } = data;
    const items = sign.sigInDTOList || [];
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
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u7B7E\u5230\u65E5\u5386"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        "UID ",
                        uid,
                        " \u00B7 \u672C\u6708\u5DF2\u7B7E ",
                        React.createElement("span", { style: { color: C.gold, fontWeight: 'bold', fontSize: '22px' } }, sign.sigInNum),
                        " \u5929")),
                React.createElement("div", { style: {
                        fontSize: '18px',
                        color: sign.hasSignIn ? '#66bb6a' : C.gold,
                        fontWeight: 'bold',
                        background: sign.hasSignIn ? 'rgba(102,187,106,0.15)' : C.goldDim,
                        padding: '8px 20px',
                        borderRadius: '24px',
                        border: `1px solid ${sign.hasSignIn ? 'rgba(102,187,106,0.4)' : C.goldBorder}`
                    } }, sign.hasSignIn ? '今日已签' : '今日未签')),
            React.createElement(Section, { title: '\u7B7E\u5230\u5956\u52B1' },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, items.map((item, idx) => {
                    const isClaimed = item.sigInStatus === 1;
                    return (React.createElement("div", { key: idx, style: {
                            width: 'calc(14.285% - 9px)',
                            background: isClaimed ? 'rgba(102,187,106,0.1)' : 'rgba(0,0,0,0.3)',
                            borderRadius: '10px',
                            padding: '10px 6px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            border: isClaimed ? '1px solid rgba(102,187,106,0.3)' : `1px solid ${C.panelBorder}`,
                            opacity: isClaimed ? 0.6 : 1,
                            minWidth: '60px',
                            boxSizing: 'border-box'
                        } },
                        React.createElement("div", { style: { fontSize: '13px', color: C.textDim, marginBottom: '6px' } },
                            "\u7B2C",
                            idx + 1,
                            "\u5929"),
                        item.goodsUrl ? (React.createElement("img", { src: item.goodsUrl, style: {
                                width: '40px',
                                height: '40px',
                                display: 'block',
                                marginBottom: '6px',
                                filter: isClaimed ? 'grayscale(0.5)' : 'none'
                            } })) : (React.createElement("div", { style: {
                                width: '40px',
                                height: '40px',
                                marginBottom: '6px',
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px'
                            } }, "?")),
                        React.createElement("div", { style: { fontSize: '12px', color: C.textSecondary, lineHeight: 1.2 } }, item.goodsName),
                        React.createElement("div", { style: { fontSize: '14px', color: '#fff', fontWeight: 'bold' } },
                            "\u00D7",
                            item.goodsNum),
                        isClaimed && React.createElement("div", { style: { fontSize: '12px', color: '#66bb6a', marginTop: '2px' } }, "\u2713")));
                }))),
            React.createElement(Footer, null))));
}

export { SignCard as default };
