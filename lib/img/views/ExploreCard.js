import React from 'react';
import { DarkContainer, UserHeader, Section, C, Footer } from './CardBase.js';
import HTML from './HTML.js';

function progressColor(pct) {
    if (pct >= 100) {
        return '#66bb6a';
    }
    if (pct >= 80) {
        return '#4fc3f7';
    }
    if (pct >= 50) {
        return C.gold;
    }
    return '#ff7043';
}
function ExploreCard({ data }) {
    const { uid, base, explore } = data;
    const regions = explore.exploreList ?? [];
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement(UserHeader, { name: base.name, uid: uid, level: base.level, worldLevel: base.worldLevel, avatarUrl: data.headUrl, decoText: 'EXPLORATION DATA' }),
            regions.map((region, ri) => {
                const pct = Number(region.countryProgress) || 0;
                const areas = region.areaInfoList ?? [];
                const completed = areas.filter(a => a.areaProgress >= 100);
                const incomplete = areas.filter(a => a.areaProgress < 100);
                return (React.createElement(Section, { key: ri, title: region.country.countryName },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' } },
                        region.country.homePageIcon && React.createElement("img", { src: region.country.homePageIcon, style: { width: '40px', height: '40px', borderRadius: '8px' } }),
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' } },
                                React.createElement("span", { style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } }, region.country.countryName),
                                React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '2px' } },
                                    React.createElement("span", { style: { fontSize: '28px', fontWeight: 'bold', color: progressColor(pct), lineHeight: 1 } }, pct),
                                    React.createElement("span", { style: { fontSize: '16px', color: C.textDim } }, "%"))),
                            React.createElement("div", { style: { width: '100%', height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' } },
                                React.createElement("div", { style: {
                                        width: `${Math.min(100, pct)}%`,
                                        height: '100%',
                                        borderRadius: '4px',
                                        backgroundColor: progressColor(pct),
                                        boxShadow: `0 0 10px ${progressColor(pct)}`
                                    } })))),
                    completed.length > 0 && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: incomplete.length > 0 ? '12px' : '0' } }, completed.map((area, ai) => (React.createElement("div", { key: ai, style: {
                            background: 'rgba(102,187,106,0.12)',
                            borderRadius: '8px',
                            padding: '6px 14px',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        } },
                        React.createElement("span", { style: { color: '#66bb6a' } }, "\u2713"),
                        React.createElement("span", { style: { color: 'rgba(255,255,255,0.6)' } }, area.areaName),
                        React.createElement("span", { style: { color: '#66bb6a', fontWeight: 'bold' } }, "100%")))))),
                    incomplete.map((area, ai) => {
                        const unfinished = area.itemList.filter(i => i.progress < 100).slice(0, 5);
                        return (React.createElement("div", { key: ai, style: {
                                background: 'rgba(0,0,0,0.3)',
                                borderRadius: '10px',
                                padding: '14px 16px',
                                marginBottom: ai < incomplete.length - 1 ? '10px' : '0',
                                borderLeft: `2px solid ${progressColor(area.areaProgress)}`
                            } },
                            React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                                React.createElement("span", { style: { fontSize: '16px', fontWeight: 'bold', color: '#fff' } }, area.areaName),
                                React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '2px' } },
                                    React.createElement("span", { style: { fontSize: '22px', fontWeight: 'bold', color: progressColor(area.areaProgress), lineHeight: 1 } }, area.areaProgress),
                                    React.createElement("span", { style: { fontSize: '14px', color: C.textDim } }, "%"))),
                            React.createElement("div", { style: {
                                    width: '100%',
                                    height: '6px',
                                    background: 'rgba(0,0,0,0.3)',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                    marginBottom: unfinished.length > 0 ? '10px' : '0'
                                } },
                                React.createElement("div", { style: {
                                        width: `${Math.min(100, area.areaProgress)}%`,
                                        height: '100%',
                                        borderRadius: '3px',
                                        backgroundColor: progressColor(area.areaProgress)
                                    } })),
                            unfinished.length > 0 && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, unfinished.map((item, ii) => (React.createElement("div", { key: ii, style: {
                                    background: 'rgba(0,0,0,0.25)',
                                    borderRadius: '8px',
                                    padding: '6px 12px',
                                    fontSize: '13px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                } },
                                item.icon && React.createElement("img", { src: item.icon, style: { width: '18px', height: '18px' } }),
                                React.createElement("span", { style: { color: C.textDim } }, item.name),
                                React.createElement("span", { style: { color: progressColor(item.progress), fontWeight: 'bold' } },
                                    item.progress,
                                    "%"))))))));
                    })));
            }),
            React.createElement(Footer, null))));
}

export { ExploreCard as default };
