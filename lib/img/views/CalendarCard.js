import dayjs from 'dayjs';
import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const TYPE_COLORS = {
    gacha: C.gold,
    activity: '#4fc3f7',
    tower: '#9c6cdb'
};
const TYPE_LABELS = {
    gacha: '唤取',
    activity: '活动',
    tower: '挑战'
};
function formatDateRange(dr) {
    if (!dr || dr.length < 2) {
        return '';
    }
    const fmt = (s) => dayjs(s).format('M.DD HH:mm');
    return `${fmt(dr[0])} ~ ${fmt(dr[1])}`;
}
function getProgress(dr) {
    if (!dr || dr.length < 2) {
        return 0;
    }
    const start = dayjs(dr[0]).valueOf();
    const end = dayjs(dr[1]).valueOf();
    const now = Date.now();
    if (now >= end) {
        return 1;
    }
    if (now <= start) {
        return 0;
    }
    return (now - start) / (end - start);
}
function CalendarCard({ data }) {
    const activeEvents = data.events.filter(e => e.isActive);
    const inactiveEvents = data.events.filter(e => !e.isActive);
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
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        "\u8FDB\u884C\u4E2D ",
                        activeEvents.length,
                        " \u00B7 \u5171 ",
                        data.events.length,
                        " \u9879")),
                React.createElement("div", { style: { fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "CALENDAR")),
            activeEvents.length > 0 && (React.createElement(Section, { title: '\u8FDB\u884C\u4E2D', extra: `${activeEvents.length}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, activeEvents.map((evt, i) => {
                    const color = TYPE_COLORS[evt.type] ?? '#9e9e9e';
                    const progress = getProgress(evt.dateRange);
                    const progressColor = evt.timeLeft.includes('剩余') && parseInt(evt.timeLeft) <= 3 ? '#ef5350' : color;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            border: `1px solid ${C.panelBorder}`,
                            borderLeft: `3px solid ${color}`,
                            borderRadius: '8px',
                            padding: '14px 18px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                        } },
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold', color: '#fff', flex: 1 } }, evt.title),
                            React.createElement("div", { style: { display: 'flex', gap: '8px', alignItems: 'center' } },
                                React.createElement("div", { style: { fontSize: '18px', background: `${color}30`, borderRadius: '4px', padding: '3px 10px', color, fontWeight: 'bold' } }, TYPE_LABELS[evt.type] ?? '其他'))),
                        evt.dateRange && React.createElement("div", { style: { fontSize: '18px', color: C.textDim } }, formatDateRange(evt.dateRange)),
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                            React.createElement("div", { style: { flex: 1, height: '6px', background: 'rgba(100,100,100,0.5)', borderRadius: '3px', overflow: 'hidden' } },
                                React.createElement("div", { style: { width: `${Math.round(progress * 100)}%`, height: '100%', background: progressColor, borderRadius: '3px' } })),
                            evt.timeLeft && React.createElement("div", { style: { fontSize: '18px', color: progressColor, fontWeight: 'bold', whiteSpace: 'nowrap' } }, evt.timeLeft))));
                })))),
            inactiveEvents.length > 0 && (React.createElement(Section, { title: '\u672A\u5F00\u59CB / \u5DF2\u7ED3\u675F', extra: `${inactiveEvents.length}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' } }, inactiveEvents.map((evt, i) => (React.createElement("div", { key: i, style: {
                        background: 'rgba(0,0,0,0.2)',
                        border: `1px solid ${C.panelBorder}`,
                        borderLeft: '3px solid #555',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        opacity: 0.6
                    } },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                        React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#aaa' } }, evt.title),
                        React.createElement("div", { style: { fontSize: '18px', color: '#888' } }, evt.status)),
                    evt.dateRange && React.createElement("div", { style: { fontSize: '18px', color: '#666', marginTop: '4px' } }, formatDateRange(evt.dateRange)))))))),
            data.events.length === 0 && (React.createElement(Section, { title: '\u6682\u65E0\u6D3B\u52A8' },
                React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u6682\u65E0\u6D3B\u52A8\u4FE1\u606F"))),
            React.createElement(Footer, null))));
}

export { CalendarCard as default };
