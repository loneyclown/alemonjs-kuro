import React from 'react';
import HTML from './HTML.js';

function SignCard({ data }) {
    const { uid, sign } = data;
    const items = sign.sigInDTOList || [];
    return (React.createElement(HTML, { style: { minWidth: '460px' } },
        React.createElement("div", { style: {
                padding: '24px',
                background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                    borderRadius: '12px 12px 0 0',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83D\uDCC5 \u7B7E\u5230\u65E5\u5386"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                        "UID ",
                        uid,
                        " \u00B7 \u672C\u6708\u5DF2\u7B7E ",
                        sign.sigInNum,
                        " \u5929")),
                React.createElement("div", { style: {
                        fontSize: '13px',
                        color: sign.hasSignIn ? '#22c55e' : '#fbbf24',
                        fontWeight: 'bold'
                    } }, sign.hasSignIn ? '✅ 今日已签' : '⏳ 今日未签')),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '16px'
                } },
                React.createElement("div", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                    } }, items.map((item, idx) => {
                    const isClaimed = item.sigInStatus === 1;
                    return (React.createElement("div", { key: idx, style: {
                            width: 'calc(14.285% - 7px)',
                            background: isClaimed ? '#2d3a4f' : '#32334f',
                            borderRadius: '8px',
                            padding: '8px 4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            border: isClaimed ? '1px solid #3a5d3a' : '1px solid transparent',
                            opacity: isClaimed ? 0.6 : 1,
                            minWidth: '52px'
                        } },
                        React.createElement("div", { style: {
                                fontSize: '11px',
                                color: '#8088bb',
                                marginBottom: '4px'
                            } },
                            "\u7B2C",
                            idx + 1,
                            "\u5929"),
                        item.goodsUrl ? (React.createElement("img", { src: item.goodsUrl, style: {
                                width: '32px',
                                height: '32px',
                                marginBottom: '4px',
                                filter: isClaimed ? 'grayscale(0.5)' : 'none'
                            } })) : (React.createElement("div", { style: {
                                width: '32px',
                                height: '32px',
                                marginBottom: '4px',
                                background: '#3a3b55',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '16px'
                            } }, "\uD83C\uDF81")),
                        React.createElement("div", { style: { fontSize: '10px', color: '#a0a4cc', lineHeight: '1.2' } }, item.goodsName),
                        React.createElement("div", { style: { fontSize: '11px', color: '#e0e4ff', fontWeight: 'bold' } },
                            "\u00D7",
                            item.goodsNum),
                        isClaimed && React.createElement("div", { style: { fontSize: '10px', color: '#22c55e', marginTop: '2px' } }, "\u2713")));
                }))),
            React.createElement("div", { style: {
                    marginTop: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#5a5d8c'
                } }, "Powered by alemonjs \u00B7 \u9E23\u6F6E\u52A9\u624B"))));
}

export { SignCard as default };
