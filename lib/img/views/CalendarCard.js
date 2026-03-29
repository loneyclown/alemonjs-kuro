import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const TYPE_COLORS = {
    gacha: C.gold,
    activity: '#4fc3f7',
    tower: '#9c6cdb',
    other: '#9e9e9e'
};
const TYPE_LABELS = {
    gacha: '调谐',
    activity: '活动',
    tower: '挑战',
    other: '其他'
};
function CalendarCard({ data }) {
    const activeEvents = data.events.filter(e => e.isActive);
    const upcomingEvents = data.events.filter(e => !e.isActive);
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
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u6D3B\u52A8\u65E5\u5386"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } }, "\u9E23\u6F6E\u6D3B\u52A8\u4E0E\u5361\u6C60\u4FE1\u606F")),
                React.createElement("div", { style: { fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "CALENDAR")),
            activeEvents.length > 0 && (React.createElement(Section, { title: '\u8FDB\u884C\u4E2D', extra: `${activeEvents.length}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, activeEvents.map((evt, i) => {
                    const color = TYPE_COLORS[evt.type] ?? TYPE_COLORS.other;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            border: `1px solid ${C.panelBorder}`,
                            borderLeft: `3px solid ${color}`,
                            borderRadius: '8px',
                            padding: '14px 18px'
                        } },
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold', color: '#fff' } }, evt.title),
                            React.createElement("div", { style: {
                                    fontSize: '12px',
                                    background: `${color}30`,
                                    borderRadius: '4px',
                                    padding: '3px 10px',
                                    color,
                                    fontWeight: 'bold'
                                } }, TYPE_LABELS[evt.type] ?? '其他')),
                        React.createElement("div", { style: { fontSize: '13px', color: C.textDim, marginTop: '6px' } },
                            evt.startTime,
                            " ~ ",
                            evt.endTime)));
                })))),
            upcomingEvents.length > 0 && (React.createElement(Section, { title: '\u5373\u5C06\u5F00\u59CB', extra: `${upcomingEvents.length}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, upcomingEvents.map((evt, i) => {
                    const color = TYPE_COLORS[evt.type] ?? TYPE_COLORS.other;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            border: `1px solid ${C.panelBorder}`,
                            borderLeft: `3px solid ${color}`,
                            borderRadius: '8px',
                            padding: '14px 18px',
                            opacity: 0.7
                        } },
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold', color: '#fff' } }, evt.title),
                            React.createElement("div", { style: { fontSize: '12px', background: `${color}30`, borderRadius: '4px', padding: '3px 10px', color, fontWeight: 'bold' } }, TYPE_LABELS[evt.type] ?? '其他')),
                        React.createElement("div", { style: { fontSize: '13px', color: C.textDim, marginTop: '6px' } },
                            evt.startTime,
                            " ~ ",
                            evt.endTime)));
                })))),
            data.events.length === 0 && (React.createElement(Section, { title: '\u6682\u65E0\u6D3B\u52A8' },
                React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u6682\u65E0\u6D3B\u52A8\u4FE1\u606F"))),
            React.createElement(Footer, null))));
}

export { CalendarCard as default };
