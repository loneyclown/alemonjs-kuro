import React from 'react';
import HTML from './HTML.js';

const TYPE_COLORS = {
    gacha: { bg: 'rgba(232,166,64,0.2)', border: 'rgba(232,166,64,0.5)' },
    activity: { bg: 'rgba(79,195,247,0.2)', border: 'rgba(79,195,247,0.5)' },
    tower: { bg: 'rgba(156,108,219,0.2)', border: 'rgba(156,108,219,0.5)' },
    other: { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.2)' }
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
    return (React.createElement(HTML, { style: { minWidth: '480px' } },
        React.createElement("div", { style: {
                padding: '24px',
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: '#ffffff'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    color: '#2d2d2d'
                } },
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u6D3B\u52A8\u65E5\u5386"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } }, "\u9E23\u6F6E\u6D3B\u52A8\u4E0E\u5361\u6C60\u4FE1\u606F")),
            activeEvents.length > 0 && (React.createElement("div", { style: { marginBottom: '16px' } },
                React.createElement("div", { style: { fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: '#81c784' } },
                    "\u8FDB\u884C\u4E2D (",
                    activeEvents.length,
                    ")"),
                activeEvents.map((evt, i) => {
                    const colors = TYPE_COLORS[evt.type] ?? TYPE_COLORS.other;
                    return (React.createElement("div", { key: i, style: {
                            background: colors.bg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: '8px',
                            padding: '10px 14px',
                            marginBottom: '8px'
                        } },
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold' } }, evt.title),
                            React.createElement("div", { style: {
                                    fontSize: '10px',
                                    background: colors.border,
                                    borderRadius: '4px',
                                    padding: '2px 6px',
                                    color: '#fff'
                                } }, TYPE_LABELS[evt.type] ?? '其他')),
                        React.createElement("div", { style: { fontSize: '11px', opacity: 0.6, marginTop: '4px' } },
                            evt.startTime,
                            " ~ ",
                            evt.endTime)));
                }))),
            upcomingEvents.length > 0 && (React.createElement("div", null,
                React.createElement("div", { style: { fontSize: '15px', fontWeight: 'bold', marginBottom: '8px', color: '#ffb74d' } },
                    "\u5373\u5C06\u5F00\u59CB (",
                    upcomingEvents.length,
                    ")"),
                upcomingEvents.map((evt, i) => {
                    const colors = TYPE_COLORS[evt.type] ?? TYPE_COLORS.other;
                    return (React.createElement("div", { key: i, style: {
                            background: colors.bg,
                            border: `1px solid ${colors.border}`,
                            borderRadius: '8px',
                            padding: '10px 14px',
                            marginBottom: '8px',
                            opacity: 0.7
                        } },
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold' } }, evt.title),
                            React.createElement("div", { style: {
                                    fontSize: '10px',
                                    background: colors.border,
                                    borderRadius: '4px',
                                    padding: '2px 6px',
                                    color: '#fff'
                                } }, TYPE_LABELS[evt.type] ?? '其他')),
                        React.createElement("div", { style: { fontSize: '11px', opacity: 0.6, marginTop: '4px' } },
                            evt.startTime,
                            " ~ ",
                            evt.endTime)));
                }))),
            data.events.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', opacity: 0.5 } }, "\u6682\u65E0\u6D3B\u52A8\u4FE1\u606F"))));
}

export { CalendarCard as default };
