import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const RESOURCE_NAMES = { 1: '贝币', 2: '星声', 3: '唤声涡纹', 4: '浮金 & 铸潮' };
const RESOURCE_COLORS = { 1: '#4fc3f7', 2: C.gold, 3: '#9c6cdb', 4: '#ffb74d' };
function PeriodCard({ data }) {
    const { detail, periodTitle } = data;
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
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u8D44\u6E90\u7EDF\u8BA1"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        periodTitle,
                        " \u00B7 UID ",
                        data.uid)),
                React.createElement("div", { style: { fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "LEDGER")),
            (detail.totalStar !== null || detail.totalCoin !== null) && (React.createElement("div", { style: { display: 'flex', gap: '16px' } },
                detail.totalStar !== null && (React.createElement("div", { style: {
                        flex: 1,
                        background: C.goldDim,
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        border: `1px solid ${C.goldBorder}`
                    } },
                    React.createElement("div", { style: { fontSize: '42px', fontWeight: 800, color: C.gold } }, detail.totalStar),
                    React.createElement("div", { style: { fontSize: '16px', color: C.textDim, marginTop: '6px' } }, "\u661F\u58F0\u603B\u8BA1"))),
                detail.totalCoin !== null && (React.createElement("div", { style: {
                        flex: 1,
                        background: 'rgba(79,195,247,0.12)',
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        border: '1px solid rgba(79,195,247,0.3)'
                    } },
                    React.createElement("div", { style: { fontSize: '42px', fontWeight: 800, color: '#4fc3f7' } }, detail.totalCoin),
                    React.createElement("div", { style: { fontSize: '16px', color: C.textDim, marginTop: '6px' } }, "\u8D1D\u5E01\u603B\u8BA1"))))),
            detail.itemList?.map((item, i) => {
                const name = RESOURCE_NAMES[item.type] ?? `资源${item.type}`;
                const color = RESOURCE_COLORS[item.type] ?? '#ffffff';
                return (React.createElement(Section, { key: i, title: name, extra: item.total }, item.detail && item.detail.length > 0 ? (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, item.detail.map((d, j) => (React.createElement("div", { key: j, style: {
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '14px',
                        borderLeft: `2px solid ${color}`
                    } },
                    React.createElement("span", { style: { color: C.textDim } },
                        d.type,
                        ": "),
                    React.createElement("span", { style: { color: '#fff', fontWeight: 'bold' } }, d.num)))))) : (React.createElement("div", { style: { color: C.textDim, fontSize: '14px' } }, "\u6682\u65E0\u660E\u7EC6"))));
            }),
            React.createElement(Footer, null))));
}

export { PeriodCard as default };
