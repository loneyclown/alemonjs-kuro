import QRCode from 'qrcode';
import React from 'react';
import HTML from './HTML.js';

function LoginHelpCard({ data }) {
    return (React.createElement(HTML, { style: { width: '520px', margin: 0, textAlign: 'left' } },
        React.createElement("main", { style: {
                padding: '30px',
                background: '#111d23',
                color: '#eef3f1',
                borderTop: '4px solid #e5c78b',
                fontFamily: '"Microsoft YaHei", system-ui, sans-serif'
            } },
            React.createElement("div", { style: { color: '#e5c78b', fontSize: '12px', letterSpacing: '4px' } }, "WUTHERING WAVES"),
            React.createElement("h1", { style: { margin: '14px 0 8px', fontSize: '30px' } }, "\u767B\u5F55\u9E23\u6F6E\u52A9\u624B"),
            React.createElement("p", { style: { color: '#a8b6bc', fontSize: '16px', lineHeight: 1.8 } },
                "\u4F7F\u7528\u6D4F\u89C8\u5668\u626B\u7801\uFF0C\u5728\u4E13\u5C5E\u9875\u9762\u5B8C\u6210\u9A8C\u8BC1\u3002",
                React.createElement("br", null),
                "\u767B\u5F55\u7ED3\u679C\u4F1A\u81EA\u52A8\u4FDD\u5B58\u5230\u4F60\u7684\u804A\u5929\u8D26\u53F7\u3002"),
            React.createElement("div", { style: { textAlign: 'center', padding: '22px 0' } },
                React.createElement("img", { alt: '\u4E13\u5C5E\u767B\u5F55\u94FE\u63A5\u4E8C\u7EF4\u7801', src: data.qrDataUrl, style: { display: 'block', width: '220px', height: '220px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: '8px' } }),
                React.createElement("div", { style: { marginTop: '14px', color: '#e5c78b', fontSize: '15px' } }, "3 \u5206\u949F\u6709\u6548 \u00B7 \u4EC5\u4F9B\u672C\u4EBA\u4F7F\u7528"),
                React.createElement("div", { style: { marginTop: '8px', color: '#91a3aa', fontSize: '13px' } }, new URL(data.loginUrl).host)),
            React.createElement("div", { style: { borderTop: '1px solid #38505b', paddingTop: '18px', color: '#c0ccd0', fontSize: '16px', lineHeight: 2 } },
                React.createElement("div", null, "01 \u8F93\u5165\u624B\u673A\u53F7\uFF0C\u5B8C\u6210\u6ED1\u5757\u9A8C\u8BC1"),
                React.createElement("div", null, "02 \u83B7\u53D6\u77ED\u4FE1\u9A8C\u8BC1\u7801\uFF0C\u5728\u9875\u9762\u63D0\u4EA4\u767B\u5F55"),
                React.createElement("div", null,
                    "03 \u8FD4\u56DE\u804A\u5929\uFF0C\u53D1\u9001 ",
                    React.createElement("strong", { style: { color: '#e5c78b' } }, "#mc\u4F53\u529B"))),
            React.createElement("p", { style: { color: '#91a3aa', fontSize: '13px', lineHeight: 1.8, marginBottom: 0 } },
                "\u624B\u673A\u9700\u8981\u80FD\u8BBF\u95EE\u4E0A\u65B9\u670D\u52A1\u5730\u5740\u3002\u4E5F\u53EF\u5728\u7535\u8111\u6253\u5F00\u6D88\u606F\u4E2D\u7684\u94FE\u63A5\u3002",
                React.createElement("br", null),
                "\u94FE\u63A5\u5931\u6548\u65F6\u91CD\u65B0\u53D1\u9001 #mc\u767B\u5F55\uFF0C\u8BF7\u52FF\u8F6C\u53D1\u4E8C\u7EF4\u7801\u3002"))));
}
function generateQrDataUrl(loginUrl) {
    return QRCode.toDataURL(loginUrl, { width: 320, margin: 2, color: { dark: '#111d23', light: '#ffffff' } });
}

export { LoginHelpCard as default, generateQrDataUrl };
