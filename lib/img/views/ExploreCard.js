import React from 'react';
import HTML from './HTML.js';

function progressColor(pct) {
    if (pct >= 100) {
        return '#22c55e';
    }
    if (pct >= 80) {
        return '#6bdfff';
    }
    if (pct >= 50) {
        return '#a78bfa';
    }
    return '#fbbf24';
}
function ExploreCard({ data }) {
    const { uid, base, explore } = data;
    const areas = explore.exploreList || [];
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
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83D\uDDFA\uFE0F \u63A2\u7D22\u5EA6"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                        base.name,
                        " \u00B7 Lv.",
                        base.level,
                        " \u00B7 UID ",
                        uid))),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '16px'
                } }, areas.map((area, idx) => (React.createElement("div", { key: idx, style: {
                    background: '#32334f',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: idx < areas.length - 1 ? '10px' : '0'
                } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                    React.createElement("span", { style: { fontSize: '15px', fontWeight: 'bold', color: '#e0e4ff' } }, area.areaName),
                    React.createElement("span", { style: {
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: progressColor(area.areaProgress)
                        } },
                        area.areaProgress,
                        "%")),
                React.createElement("div", { style: { background: '#1e1f36', borderRadius: '5px', height: '8px', overflow: 'hidden', marginBottom: '10px' } },
                    React.createElement("div", { style: {
                            width: `${Math.min(100, area.areaProgress)}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${progressColor(area.areaProgress)}, ${progressColor(area.areaProgress)}88)`,
                            borderRadius: '5px'
                        } })),
                area.itemList && area.itemList.length > 0 && (React.createElement("div", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px'
                    } }, area.itemList.map((item, ii) => (React.createElement("div", { key: ii, style: {
                        background: '#282940',
                        borderRadius: '6px',
                        padding: '6px 10px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    } },
                    React.createElement("span", { style: { color: '#8088bb' } }, item.name),
                    React.createElement("span", { style: { color: '#e0e4ff', fontWeight: 'bold' } },
                        item.progress,
                        "/",
                        item.total)))))))))),
            React.createElement("div", { style: {
                    marginTop: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#5a5d8c'
                } }, "Powered by alemonjs \u00B7 \u9E23\u6F6E\u52A9\u624B"))));
}

export { ExploreCard as default };
