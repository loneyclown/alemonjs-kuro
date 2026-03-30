import QRCode from 'qrcode';
import React from 'react';
import HTML from './HTML.js';

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
    return (React.createElement(HTML, { style: { width: '520px' } },
        React.createElement("div", { className: 'relative flex justify-center p-6 bg-[#f6f6f6]', style: { fontFamily: '"tttgbnumber", system-ui, sans-serif' } },
            React.createElement("div", { className: 'relative w-full overflow-hidden bg-white border-2 border-[#eae5d9] rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.05)]' },
                React.createElement("div", { className: 'flex flex-col items-start px-8 pt-6 pb-2' },
                    React.createElement("div", { className: 'text-[32px] font-bold tracking-[2px] text-[#3d3833]' }, "\u9E23\u6F6E\u52A9\u624B \u00B7 \u767B\u5F55\u6307\u5F15"),
                    React.createElement("div", { className: 'mt-1 text-sm tracking-[4px] text-[#a09d98]' }, "\u8BF7\u6309\u7167\u4EE5\u4E0B\u6B65\u9AA4\u5B8C\u6210\u767B\u5F55")),
                React.createElement("div", { className: 'px-8 pt-3 pb-6' },
                    React.createElement("div", { className: 'flex flex-col gap-4 mb-6' }, STEPS.map((step, i) => (React.createElement("div", { key: i, className: 'flex items-start gap-4 p-4 bg-[#faf7f2] border border-[#e1dcce] rounded-2xl' },
                        React.createElement("div", { className: 'flex items-center justify-center shrink-0 w-8 h-8 mt-0.5 text-[20px] font-bold text-white bg-[#eebb4d] rounded-full shadow-[0_2px_4px_rgba(238,187,77,0.4)]' }, step.num),
                        React.createElement("div", { className: 'flex flex-col w-full' },
                            React.createElement("div", { className: 'text-[20px] font-bold text-[#423c36]' }, step.title),
                            React.createElement("div", { className: 'mt-1 text-[15px] text-[#b0a89d]' }, step.desc),
                            React.createElement("div", { className: 'mt-2 px-3 py-1.5 text-[15px] font-bold text-[#5b534b] bg-white border border-[#eae5d9] rounded-lg break-all' }, step.detail)))))),
                    React.createElement("div", { className: 'flex items-center gap-5 p-4 bg-[#faf7f2] border border-[#e1dcce] rounded-2xl' },
                        React.createElement("div", { className: 'shrink-0 p-1.5 bg-white border border-[#eae5d9] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]' },
                            React.createElement("img", { src: data.qrDataUrl, className: 'block w-[100px] h-[100px]' })),
                        React.createElement("div", { className: 'flex flex-col' },
                            React.createElement("div", { className: 'flex items-center' },
                                React.createElement("div", { className: 'w-[4px] h-[18px] mr-2.5 rounded-[2px] bg-[#dcb858] shadow-[0_2px_4px_rgba(220,184,88,0.4)]' }),
                                React.createElement("span", { className: 'text-[20px] font-bold tracking-[1px] text-[#423c36]' }, "\u626B\u7801\u6253\u5F00\u767B\u5F55\u9875")),
                            React.createElement("div", { className: 'mt-2.5 text-[15px] leading-relaxed text-[#b0a89d]' },
                                "\u4F7F\u7528\u624B\u673A\u6D4F\u89C8\u5668\u626B\u63CF\u5DE6\u4FA7\u4E8C\u7EF4\u7801",
                                React.createElement("br", null),
                                "\u5373\u53EF\u76F4\u63A5\u6253\u5F00\u5E93\u8857\u533A\u767B\u5F55\u9875\u9762"))),
                    React.createElement("div", { className: 'flex items-center justify-between px-5 py-3 mt-6 bg-[#faf7f2] border border-[#e1dcce] rounded-xl' },
                        React.createElement("span", { className: 'text-sm font-bold text-[#8a837b]' }, "\u6307\u4EE4\u524D\u7F00 # ! / \uFF01\uFF03"),
                        React.createElement("span", { className: 'text-xs text-[#c2bcb2]' }, "Powered by alemonjs-kuro")))))));
}
async function generateQrDataUrl() {
    return await QRCode.toDataURL(LOGIN_URL, {
        width: 256,
        margin: 1,
        color: { dark: '#000000', light: '#ffffff' }
    });
}

export { LoginHelpCard as default, generateQrDataUrl };
