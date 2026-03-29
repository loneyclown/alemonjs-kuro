import QRCode from 'qrcode';
import React from 'react';
import HTML from './HTML.js';
import fileUrl from '../../assets/img/help/texture2d/bg.jpg.js';

const LOGIN_URL = 'https://www.kurobbs.com/mc';
const STEPS = [
    {
        num: '1',
        title: '打开登录页',
        desc: '打开下方链接或扫描二维码',
        detail: LOGIN_URL
    },
    {
        num: '2',
        title: '获取验证码',
        desc: '在网页中输入手机号',
        detail: '点击获取验证码，等待短信'
    },
    {
        num: '3',
        title: '发送登录指令',
        desc: '在聊天中发送以下指令',
        detail: '#mc登录 手机号 验证码'
    }
];
function LoginHelpCard({ data }) {
    return (React.createElement(HTML, { style: { width: '480px' } },
        React.createElement("div", { style: {
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                color: '#ffffff',
                backgroundImage: `url(${fileUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '24px'
            } },
            React.createElement("div", { style: {
                    textAlign: 'center',
                    marginBottom: '20px'
                } },
                React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' } }, "\u9E23\u6F6E\u52A9\u624B \u00B7 \u767B\u5F55\u6307\u5F15"),
                React.createElement("div", { style: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' } }, "\u8BF7\u6309\u7167\u4EE5\u4E0B\u6B65\u9AA4\u5B8C\u6210\u767B\u5F55")),
            STEPS.map((step, i) => (React.createElement("div", { key: i, style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px'
                } },
                React.createElement("div", { style: {
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #d32f2f, #ff5252)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        flexShrink: 0,
                        marginTop: '2px'
                    } }, step.num),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold' } }, step.title),
                    React.createElement("div", { style: { fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' } }, step.desc),
                    React.createElement("div", { style: {
                            fontSize: '13px',
                            color: '#4fc3f7',
                            marginTop: '6px',
                            background: 'rgba(0,0,0,0.3)',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            wordBreak: 'break-all'
                        } }, step.detail))))),
            React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                } },
                React.createElement("div", { style: {
                        width: '120px',
                        height: '120px',
                        background: '#ffffff',
                        borderRadius: '8px',
                        padding: '6px',
                        flexShrink: 0
                    } },
                    React.createElement("img", { src: data.qrDataUrl, style: { width: '108px', height: '108px' } })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, "\u626B\u7801\u6253\u5F00\u767B\u5F55\u9875"),
                    React.createElement("div", { style: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px', lineHeight: '1.6' } },
                        "\u4F7F\u7528\u624B\u673A\u6D4F\u89C8\u5668\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801",
                        React.createElement("br", null),
                        "\u5373\u53EF\u6253\u5F00\u5E93\u8857\u533A\u767B\u5F55\u9875\u9762"))),
            React.createElement("div", { style: {
                    marginTop: '16px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.35)'
                } }, "\u6307\u4EE4\u524D\u7F00 # ! / \uFF01\uFF03 \u00B7 Powered by alemonjs"))));
}
async function generateQrDataUrl() {
    return await QRCode.toDataURL(LOGIN_URL, {
        width: 256,
        margin: 1,
        color: { dark: '#000000', light: '#ffffff' }
    });
}

export { LoginHelpCard as default, generateQrDataUrl };
