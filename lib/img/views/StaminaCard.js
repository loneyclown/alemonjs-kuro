import React from 'react';
import HTML from './HTML.js';

function formatTime(timestamp) {
    if (!timestamp || timestamp <= 0) {
        return '已满';
    }
    const diff = timestamp - Math.floor(Date.now() / 1000);
    if (diff <= 0) {
        return '已满';
    }
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    if (h > 0) {
        return `${h}小时${m}分钟`;
    }
    return `${m}分钟`;
}
function FallbackSquare({ color, size = 'w-12 h-12' }) {
    return (React.createElement("div", { className: `${size} shrink-0 flex items-center justify-center bg-[#f6f6f6] border border-[#e8e8e8] rounded-lg` },
        React.createElement("div", { className: 'w-3/5 h-3/5 rounded shadow-sm', style: { backgroundColor: color } })));
}
function StaminaCard({ data }) {
    const { daily, base, uid, headUrl } = data;
    const energy = daily?.energyData;
    const storeEnergy = daily?.storeEnergyData;
    const liveness = daily?.livenessData;
    const bpList = daily?.battlePassData || [];
    const eCur = energy?.cur ?? 0;
    const eTotal = energy?.total ?? 240;
    const eTime = energy?.refreshTimeStamp ? formatTime(energy.refreshTimeStamp) : '已满';
    const sCur = storeEnergy?.cur ?? 0;
    const sTotal = storeEnergy?.total ?? 480;
    const sTime = storeEnergy?.refreshTimeStamp ? formatTime(storeEnergy.refreshTimeStamp) : '暂停恢复';
    const lCur = liveness?.cur ?? 0;
    const lTotal = liveness?.total ?? 100;
    const rows = bpList.length > 0
        ? bpList
        : [
            { name: '战歌重奏', cur: 0, total: 3, unit: '本周剩余收取次数', isBp: true },
            { name: '千道门扉的异想', cur: 0, total: 0, unit: '本期异想积分 暂无数据', isBp: true },
            { name: '先约电台', cur: 9900, total: 12000, unit: '本周经验上限', isBp: true }
        ];
    return (React.createElement(HTML, { style: { width: '720px' } },
        React.createElement("div", { className: 'relative flex justify-center p-6 bg-[#f6f6f6]', style: { fontFamily: '"tttgbnumber", system-ui, sans-serif' } },
            React.createElement("div", { className: 'relative w-full overflow-hidden bg-white border-2 border-[#eae5d9] rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.05)] flex flex-col' },
                React.createElement("div", { className: 'flex items-center px-8 pt-8 pb-3' },
                    React.createElement("div", { className: 'relative shrink-0 w-[86px] h-[86px] bg-[#f8f5ea] rounded-full border-[3px] border-[#ecd98e] flex items-center justify-center shadow-sm overflow-hidden' }, headUrl ? React.createElement("img", { src: headUrl, className: 'w-full h-full object-cover', alt: 'avatar' }) : React.createElement(FallbackSquare, { color: '#d39c5b', size: 'w-12 h-12' })),
                    React.createElement("div", { className: 'flex flex-col ml-5 justify-center' },
                        React.createElement("span", { className: 'text-[28px] font-bold text-[#3d3833] tracking-wide' }, base.name),
                        React.createElement("span", { className: 'text-[16px] font-medium text-[#a09d98] mt-2 tracking-wider' },
                            "\u7279\u5F81\u7801: ",
                            uid))),
                React.createElement("div", { className: 'px-8 pt-4 pb-6' },
                    React.createElement("div", { className: 'relative w-full overflow-hidden border-2 border-[#eae5d9] rounded-2xl flex flex-col' },
                        React.createElement("div", { className: 'flex items-center justify-between px-6 h-[64px] bg-gradient-to-r from-[#514d48] to-[#43403c] text-[#ecece1] shadow-sm shrink-0' },
                            React.createElement("div", { className: 'flex items-center gap-3' },
                                React.createElement("div", { className: 'flex items-center justify-center w-[26px] h-[26px] border-[1.5px] border-[#c1b5a5] rounded-full bg-black bg-opacity-10' },
                                    React.createElement("div", { className: 'w-[10px] h-[10px] border-[1.5px] border-[#c1b5a5] rounded-sm rotate-45 transform skew-x-12' })),
                                React.createElement("span", { className: 'text-[20px] font-bold tracking-[1.5px] drop-shadow-md text-white' }, "\u65E5\u5E38\u6570\u636E"))),
                        React.createElement("div", { className: 'flex items-center justify-evenly px-5 py-8 h-[140px] bg-white' },
                            React.createElement("div", { className: 'flex items-start gap-3 flex-1 px-3' },
                                React.createElement(FallbackSquare, { color: '#1fb2b7' }),
                                React.createElement("div", { className: 'flex flex-col' },
                                    React.createElement("div", { className: 'flex items-baseline' },
                                        React.createElement("span", { className: 'text-[26px] font-bold text-[#e1bb4f]' }, eCur),
                                        React.createElement("span", { className: 'text-[22px] font-bold text-[#7d7975] ml-[2px]' },
                                            "/",
                                            eTotal)),
                                    React.createElement("div", { className: 'text-[15px] font-medium tracking-wide text-[#9e9a94] mt-0.5' }, "\u7ED3\u6676\u6CE2\u7247"),
                                    React.createElement("div", { className: 'text-[13px] font-medium tracking-wider text-[#b1aba2] mt-1.5 flex items-center' },
                                        React.createElement("span", { className: 'mr-1.5 opacity-80', style: { fontSize: '11px', transform: 'scale(1.2)' } }, "\u25F7"),
                                        eTime))),
                            React.createElement("div", { className: 'w-[1.5px] h-[64px] bg-[#edeae1]' }),
                            React.createElement("div", { className: 'flex items-start gap-3 flex-1 pl-7' },
                                React.createElement(FallbackSquare, { color: '#3bae4c' }),
                                React.createElement("div", { className: 'flex flex-col' },
                                    React.createElement("div", { className: 'flex items-baseline' },
                                        React.createElement("span", { className: 'text-[26px] font-bold text-[#e1bb4f]' }, sCur),
                                        React.createElement("span", { className: 'text-[22px] font-bold text-[#7d7975] ml-[2px]' },
                                            "/",
                                            sTotal)),
                                    React.createElement("div", { className: 'text-[15px] font-medium tracking-wide text-[#9e9a94] mt-0.5' }, "\u7ED3\u6676\u5355\u8D28"),
                                    React.createElement("div", { className: 'text-[13px] font-medium tracking-wider text-[#b1aba2] mt-1.5 flex items-center' },
                                        React.createElement("span", { className: 'mr-1.5 opacity-80', style: { fontSize: '11px', transform: 'scale(1.2)' } }, "\u25F7"),
                                        sTime))),
                            React.createElement("div", { className: 'w-[1.5px] h-[64px] bg-[#edeae1]' }),
                            React.createElement("div", { className: 'flex items-start gap-3 flex-1 pl-7' },
                                React.createElement(FallbackSquare, { color: '#d39c5b' }),
                                React.createElement("div", { className: 'flex flex-col' },
                                    React.createElement("div", { className: 'flex items-baseline' },
                                        React.createElement("span", { className: 'text-[26px] font-bold text-[#e1bb4f]' }, lCur),
                                        React.createElement("span", { className: 'text-[22px] font-bold text-[#7d7975] ml-[2px]' },
                                            "/",
                                            lTotal)),
                                    React.createElement("div", { className: 'text-[15px] font-medium tracking-wide text-[#9e9a94] mt-0.5' }, "\u6D3B\u8DC3\u5EA6"),
                                    React.createElement("div", { className: 'h-[20px]' }),
                                    " "))),
                        React.createElement("div", { className: 'flex flex-col px-8 pb-7 gap-5 bg-white' }, rows.map((row, i) => {
                            const iconUrl = row.iconUrl ?? row.picUrl;
                            const title = row.title ?? row.name ?? '未知任务';
                            const cur = typeof row.cur !== 'undefined' ? row.cur : (row.experience ?? 0);
                            const total = typeof row.total !== 'undefined' ? row.total : (row.experienceTotal ?? 0);
                            let rightContent;
                            if (title.includes('异想')) {
                                rightContent = React.createElement("span", { className: 'text-[#868686] font-medium text-[15px] tracking-wide' }, "\u672C\u671F\u5F02\u60F3\u79EF\u5206 \u6682\u65E0\u6570\u636E");
                            }
                            else {
                                const desc = row.unit ?? (title.includes('战歌') ? '本周剩余收取次数' : '当前进度');
                                rightContent = (React.createElement("div", { className: 'flex items-baseline' },
                                    React.createElement("span", { className: 'text-[#868686] font-medium text-[15px] mr-2.5 tracking-wide' }, desc),
                                    React.createElement("span", { className: 'text-[#e1bb4f] font-bold text-[18px] tracking-wide' },
                                        cur,
                                        "/",
                                        total)));
                            }
                            const isBp = title.includes('电台') || row.isBp;
                            const pct = isBp && total > 0 ? Math.floor((cur / total) * 45) : 0;
                            return (React.createElement("div", { key: i, className: 'flex flex-col relative' },
                                React.createElement("div", { className: 'flex items-center w-full justify-between z-10 relative bg-transparent' },
                                    React.createElement("div", { className: 'flex items-center gap-3 pr-4 bg-white' },
                                        iconUrl ? (React.createElement("img", { src: iconUrl, className: 'w-8 h-8 rounded shrink-0 object-contain', alt: '' })) : (React.createElement(FallbackSquare, { color: '#7a7a7a', size: 'w-8 h-8' })),
                                        React.createElement("span", { className: 'text-[18px] font-bold text-[#443e39] tracking-wide drop-shadow-sm' }, title)),
                                    React.createElement("div", { className: 'absolute w-[96%] top-1/2 left-[2%] border-b-[2.5px] border-dotted border-[#e3dcd3] -z-10 mt-[2px]' }),
                                    React.createElement("div", { className: 'pl-4 bg-white' }, rightContent)),
                                isBp && (React.createElement("div", { className: 'flex w-full h-[6px] mt-3.5 gap-[2px] bg-white' }, Array.from({ length: 45 }).map((_, idx) => (React.createElement("div", { key: idx, className: `flex-1 ${idx < pct ? 'bg-[#dba83e]' : 'bg-[#e7e1d8]'} rounded-sm` })))))));
                        })))),
                React.createElement("div", { className: 'px-8 pb-8 pt-1' },
                    React.createElement("div", { className: 'flex items-center justify-between px-5 py-3 bg-[#faf7f2] border border-[#e1dcce] rounded-xl' },
                        React.createElement("span", { className: 'text-sm font-bold text-[#8a837b]' }, "\u6307\u4EE4\u524D\u7F00 # ! / \uFF01\uFF03"),
                        React.createElement("span", { className: 'text-xs text-[#c2bcb2]' }, "Powered by alemonjs-kuro")))))));
}

export { StaminaCard as default };
