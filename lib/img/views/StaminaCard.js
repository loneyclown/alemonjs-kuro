import React from 'react';
import { DarkContainer, UserHeader, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

function formatRefreshTime(timestamp) {
    if (!timestamp || timestamp <= 0) {
        return '已满';
    }
    const diff = timestamp - Math.floor(Date.now() / 1000);
    if (diff <= 0) {
        return '已满';
    }
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    return h > 0 ? `${h}小时${m}分钟` : `${m}分钟`;
}
function StatRow({ label, cur, total, color, subText }) {
    const pct = Math.min(100, Math.round((cur / total) * 100));
    return (React.createElement("div", { style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 80%, transparent 100%)',
            padding: '12px 18px',
            borderRadius: '12px',
            borderLeft: '2px solid rgba(255,255,255,0.2)'
        } },
        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '20px' } },
            React.createElement("div", { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
                React.createElement("span", { style: {
                        fontSize: '20px',
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 'bold',
                        letterSpacing: '0.5px',
                        textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                    } }, label),
                React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '6px' } },
                    React.createElement("span", { style: {
                            fontSize: '46px',
                            fontWeight: 'bold',
                            color: '#fff',
                            lineHeight: 1,
                            textShadow: '0 2px 5px rgba(0,0,0,0.8)'
                        } }, cur),
                    React.createElement("span", { style: {
                            fontSize: '30px',
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 500,
                            textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                        } },
                        "/",
                        total)))),
        React.createElement("div", { style: { width: '100%', height: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px', overflow: 'hidden' } },
            React.createElement("div", { style: {
                    width: `${pct}%`,
                    height: '100%',
                    borderRadius: '5px',
                    backgroundColor: color,
                    boxShadow: `0 0 12px ${color}`
                } })),
        subText && React.createElement("div", { style: { fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' } }, subText)));
}
function StaminaCard({ data }) {
    const { uid, daily, base } = data;
    const energy = daily.energyData;
    const liveness = daily.livenessData;
    const energyCur = energy?.cur ?? 0;
    const energyTotal = energy?.total ?? 240;
    const refreshTime = energy?.refreshTimeStamp ? formatRefreshTime(energy.refreshTimeStamp) : '已满';
    const energyUrgent = energyCur >= energyTotal;
    const livenessCur = liveness?.cur ?? 0;
    const livenessTotal = liveness?.total ?? 100;
    const stats = [
        { label: '角色数', value: base.roleNum },
        { label: '成就数', value: base.achievementCount },
        { label: '声骸数', value: base.phantomNum },
        { label: '宝箱数', value: base.boxNum }
    ];
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement(UserHeader, { name: base.name, uid: uid, level: base.level, worldLevel: base.worldLevel, avatarUrl: data.headUrl, decoText: 'DAILY STATUS' }),
            React.createElement(Section, { title: '\u5B9E\u65F6\u4FBF\u7B3A', extra: `恢复时间: ${refreshTime}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '25px' } },
                    React.createElement(StatRow, { label: '\u7ED3\u6676\u6CE2\u7247', cur: energyCur, total: energyTotal, color: energyUrgent ? '#ba372a' : '#4fc3f7', subText: energyUrgent ? '⚠ 体力已满！' : undefined }),
                    React.createElement(StatRow, { label: '\u6D3B\u8DC3\u5EA6', cur: livenessCur, total: livenessTotal, color: '#66bb6a' }))),
            React.createElement("div", { style: {
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '15px 0',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                    borderRadius: '12px'
                } }, stats.map((s, i) => (React.createElement("div", { key: i, style: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '100px',
                    position: 'relative'
                } },
                React.createElement("div", { style: {
                        fontSize: '42px',
                        fontWeight: 'bold',
                        color: '#fff',
                        lineHeight: 1.1,
                        textShadow: '0 2px 5px rgba(0,0,0,0.8)'
                    } }, s.value),
                React.createElement("div", { style: {
                        fontSize: '18px',
                        color: 'rgba(255,255,255,0.8)',
                        fontWeight: 'bold',
                        marginTop: '4px',
                        textShadow: '0 1px 3px rgba(0,0,0,0.8)'
                    } }, s.label))))),
            React.createElement(Footer, null))));
}

export { StaminaCard as default };
