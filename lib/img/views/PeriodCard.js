import React from 'react';
import HTML from './HTML.js';

const RESOURCE_NAMES = {
    1: '贝币',
    2: '星声',
    3: '唤声涡纹',
    4: '浮金 & 铸潮'
};
const RESOURCE_COLORS = {
    1: '#4fc3f7',
    2: '#e8d5b0',
    3: '#9c6cdb',
    4: '#ffb74d'
};
function PeriodCard({ data }) {
    const { detail, periodTitle } = data;
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
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u8D44\u6E90\u7EDF\u8BA1"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                    periodTitle,
                    " | UID: ",
                    data.uid)),
            React.createElement("div", { style: {
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '16px'
                } },
                detail.totalStar !== null && detail.totalStar !== undefined && (React.createElement("div", { style: {
                        flex: 1,
                        background: 'rgba(232,213,176,0.15)',
                        borderRadius: '10px',
                        padding: '14px',
                        textAlign: 'center'
                    } },
                    React.createElement("div", { style: { fontSize: '28px', fontWeight: 'bold', color: '#e8d5b0' } }, detail.totalStar),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.6, marginTop: '4px' } }, "\u661F\u58F0\u603B\u8BA1"))),
                detail.totalCoin !== null && detail.totalCoin !== undefined && (React.createElement("div", { style: {
                        flex: 1,
                        background: 'rgba(79,195,247,0.15)',
                        borderRadius: '10px',
                        padding: '14px',
                        textAlign: 'center'
                    } },
                    React.createElement("div", { style: { fontSize: '28px', fontWeight: 'bold', color: '#4fc3f7' } }, detail.totalCoin),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.6, marginTop: '4px' } }, "\u8D1D\u5E01\u603B\u8BA1")))),
            detail.itemList?.map((item, i) => {
                const name = RESOURCE_NAMES[item.type] ?? `资源${item.type}`;
                const color = RESOURCE_COLORS[item.type] ?? '#ffffff';
                return (React.createElement("div", { key: i, style: {
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        marginBottom: '10px'
                    } },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' } },
                        React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', color } }, name),
                        React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold' } }, item.total)),
                    item.detail && item.detail.length > 0 && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } }, item.detail.map((d, j) => (React.createElement("div", { key: j, style: {
                            fontSize: '11px',
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: '4px',
                            padding: '3px 8px'
                        } },
                        React.createElement("span", { style: { opacity: 0.6 } },
                            d.type,
                            ": "),
                        React.createElement("span", null, d.num))))))));
            }))));
}

export { PeriodCard as default };
