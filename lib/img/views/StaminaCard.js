import React from 'react';
import HTML from './HTML.js';

function formatRefreshTime(timestamp) {
    if (!timestamp || timestamp <= 0) {
        return '已满';
    }
    const now = Math.floor(Date.now() / 1000);
    const diff = timestamp - now;
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
function StaminaCard({ data }) {
    const { uid, daily, base } = data;
    const energy = daily.energyData;
    const liveness = daily.livenessData;
    const energyCur = energy?.cur ?? 0;
    const energyTotal = energy?.total ?? 240;
    const energyPct = Math.min(100, Math.round((energyCur / energyTotal) * 100));
    const refreshTime = energy?.refreshTimeStamp ? formatRefreshTime(energy.refreshTimeStamp) : '已满';
    const livenessCur = liveness?.cur ?? 0;
    const livenessTotal = liveness?.total ?? 100;
    const livenessPct = Math.min(100, Math.round((livenessCur / livenessTotal) * 100));
    return (React.createElement(HTML, { style: { minWidth: '420px' } },
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
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\u26A1 \u5B9E\u65F6\u4FBF\u7B3A"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                        base.name,
                        " \u00B7 Lv.",
                        base.level,
                        " \u00B7 UID ",
                        uid)),
                React.createElement("div", { style: {
                        fontSize: '11px',
                        color: '#8088bb',
                        textAlign: 'right'
                    } },
                    "\u4E16\u754C\u7B49\u7EA7 ",
                    base.worldLevel)),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '20px'
                } },
                React.createElement("div", { style: {
                        background: '#32334f',
                        borderRadius: '10px',
                        padding: '16px',
                        marginBottom: '12px'
                    } },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                        React.createElement("span", { style: { fontSize: '15px', color: '#c8ccee', fontWeight: 'bold' } }, "\uD83D\uDD0B \u7ED3\u6676\u6CE2\u7247"),
                        React.createElement("span", { style: { fontSize: '22px', color: energyCur >= energyTotal ? '#ff6b6b' : '#6bdfff', fontWeight: 'bold' } },
                            energyCur,
                            " / ",
                            energyTotal)),
                    React.createElement("div", { style: { background: '#1e1f36', borderRadius: '6px', height: '10px', overflow: 'hidden' } },
                        React.createElement("div", { style: {
                                width: `${energyPct}%`,
                                height: '100%',
                                background: energyCur >= energyTotal ? 'linear-gradient(90deg, #ff6b6b, #ee5a24)' : 'linear-gradient(90deg, #6bdfff, #4facfe)',
                                borderRadius: '6px'
                            } })),
                    React.createElement("div", { style: { fontSize: '12px', color: '#8088bb', marginTop: '8px' } }, energyCur >= energyTotal ? '⚠️ 体力已满！' : `⏰ 恢复满需 ${refreshTime}`)),
                React.createElement("div", { style: {
                        background: '#32334f',
                        borderRadius: '10px',
                        padding: '16px',
                        marginBottom: '12px'
                    } },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                        React.createElement("span", { style: { fontSize: '15px', color: '#c8ccee', fontWeight: 'bold' } }, "\uD83C\uDFAF \u6D3B\u8DC3\u5EA6"),
                        React.createElement("span", { style: { fontSize: '22px', color: '#a78bfa', fontWeight: 'bold' } },
                            livenessCur,
                            " / ",
                            livenessTotal)),
                    React.createElement("div", { style: { background: '#1e1f36', borderRadius: '6px', height: '10px', overflow: 'hidden' } },
                        React.createElement("div", { style: {
                                width: `${livenessPct}%`,
                                height: '100%',
                                background: 'linear-gradient(90deg, #a78bfa, #7c3aed)',
                                borderRadius: '6px'
                            } }))),
                React.createElement("div", { style: {
                        background: '#32334f',
                        borderRadius: '10px',
                        padding: '16px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '12px'
                    } }, [
                    { label: '角色数', value: base.roleNum, icon: '👤' },
                    { label: '成就数', value: base.achievementCount, icon: '🏆' },
                    { label: '声骸数', value: base.phantomNum, icon: '💎' },
                    { label: '宝箱数', value: base.boxNum, icon: '📦' }
                ].map((item, i) => (React.createElement("div", { key: i, style: {
                        width: 'calc(50% - 6px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    } },
                    React.createElement("span", { style: { fontSize: '20px' } }, item.icon),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '12px', color: '#8088bb' } }, item.label),
                        React.createElement("div", { style: { fontSize: '18px', color: '#e0e4ff', fontWeight: 'bold' } }, item.value))))))),
            React.createElement("div", { style: {
                    marginTop: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#5a5d8c'
                } }, "Powered by alemonjs \u00B7 \u9E23\u6F6E\u52A9\u624B"))));
}

export { StaminaCard as default };
