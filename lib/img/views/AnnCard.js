import dayjs from 'dayjs';
import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const TYPE_COLORS = {
    activity: '#F97316',
    info: '#3B82F6',
    notice: '#10B981'
};
function formatDate(ts) {
    if (!ts) {
        return '未知';
    }
    return dayjs(ts).format('MM-DD');
}
function getCoverUrl(item) {
    if (item.coverUrl) {
        return item.coverUrl;
    }
    if (item.coverImages && item.coverImages.length > 0) {
        return item.coverImages[0].url;
    }
    return '';
}
const TYPE_LABELS = {
    activity: '活动',
    info: '资讯',
    notice: '公告'
};
function AnnSection({ title, items, type }) {
    if (items.length === 0) {
        return null;
    }
    const color = TYPE_COLORS[type] ?? C.gold;
    return (React.createElement(Section, { title: title, extra: `${items.length}` },
        React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, items.map((item, i) => {
            const cover = getCoverUrl(item);
            return (React.createElement("div", { key: i, style: {
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center',
                    borderLeft: `3px solid ${color}`,
                    border: `1px solid ${C.panelBorder}`,
                    borderLeftWidth: '3px',
                    borderLeftColor: color
                } },
                cover && (React.createElement("div", { style: { width: '140px', height: '80px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 } },
                    React.createElement("img", { src: cover, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } }))),
                React.createElement("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' } },
                    React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold', color: '#fff', lineHeight: 1.3 } }, item.postTitle),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textDim } }, formatDate(item.publishTime))),
                React.createElement("div", { style: {
                        fontSize: '18px',
                        background: `${color}25`,
                        borderRadius: '4px',
                        padding: '3px 10px',
                        color,
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap'
                    } }, TYPE_LABELS[type] ?? type)));
        }))));
}
function AnnCard({ data }) {
    const total = data.activities.length + data.infos.length + data.notices.length;
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
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u6E38\u620F\u516C\u544A"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        "\u9E23\u6F6E \u00B7 \u6700\u65B0\u8D44\u8BAF \u00B7 \u5171 ",
                        total,
                        " \u6761")),
                React.createElement("div", { style: { fontSize: '20px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "NEWS")),
            React.createElement(AnnSection, { title: '\u5F53\u524D\u6D3B\u52A8', items: data.activities, type: 'activity' }),
            React.createElement(AnnSection, { title: '\u6E38\u620F\u8D44\u8BAF', items: data.infos, type: 'info' }),
            React.createElement(AnnSection, { title: '\u6E38\u620F\u516C\u544A', items: data.notices, type: 'notice' }),
            total === 0 && (React.createElement(Section, { title: '\u516C\u544A' },
                React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u6682\u65E0\u516C\u544A\u4FE1\u606F"))),
            React.createElement(Footer, null))));
}

export { AnnCard as default };
