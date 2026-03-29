import React from 'react';
import { DarkContainer, UserHeader, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

function ProgressBar({ label, current, max, color }) {
    const pct = max > 0 ? Math.min(100, (current / max) * 100) : 0;
    return (React.createElement("div", { style: { marginBottom: '10px' } },
        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
            React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } }, label),
            React.createElement("div", { style: { fontSize: '16px', color: C.textSecondary } },
                React.createElement("span", { style: { color, fontWeight: 'bold', fontSize: '20px' } }, current),
                " / ",
                max)),
        React.createElement("div", { style: { background: 'rgba(255,255,255,0.08)', borderRadius: '6px', height: '10px', overflow: 'hidden' } },
            React.createElement("div", { style: { background: color, height: '100%', width: `${pct}%`, borderRadius: '6px', boxShadow: `0 0 10px ${color}` } }))));
}
function PokerCard({ data }) {
    const { battle, base } = data;
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            base ? (React.createElement(UserHeader, { name: base.name, uid: data.uid, level: base.level, avatarUrl: data.headUrl, decoText: 'PHANTOM POKER' })) : (React.createElement("div", { style: {
                    background: `radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                           linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
                    borderRadius: '16px',
                    padding: '25px 40px',
                    border: `1px solid ${C.panelBorder}`
                } },
                React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff' } }, "\u6FC0\u6597 \u00B7 \u724C\u5C40"),
                React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                    "UID ",
                    data.uid))),
            React.createElement(Section, { title: '\u7B49\u7EA7\u4FE1\u606F' },
                React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' } },
                    React.createElement("span", { style: { fontSize: '36px', fontWeight: 800, color: C.gold } }, battle.level),
                    React.createElement("span", { style: { fontSize: '20px', color: C.textSecondary } }, battle.levelName)),
                React.createElement(ProgressBar, { label: '\u7ECF\u9A8C', current: battle.exp, max: battle.expLimit, color: C.gold })),
            React.createElement(Section, { title: '\u6536\u96C6\u8FDB\u5EA6' },
                React.createElement(ProgressBar, { label: '\u5361\u7247\u6536\u96C6', current: battle.cardNum, max: battle.maxCardNum, color: '#4fc3f7' }),
                React.createElement(ProgressBar, { label: '\u5FBD\u7AE0\u6536\u96C6', current: battle.badgeNum, max: battle.maxBadgeNum, color: '#ffb74d' })),
            battle.badgeList.length > 0 && (React.createElement(Section, { title: '\u5FBD\u7AE0\u4E00\u89C8' },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, battle.badgeList.map((badge, i) => (React.createElement("div", { key: i, style: {
                        width: '110px',
                        padding: '10px',
                        borderRadius: '10px',
                        background: badge.unlock ? C.goldDim : 'rgba(0,0,0,0.3)',
                        border: `1px solid ${badge.unlock ? C.goldBorder : C.panelBorder}`,
                        textAlign: 'center',
                        opacity: badge.unlock ? 1 : 0.4,
                        boxSizing: 'border-box'
                    } },
                    badge.iconUrl && (React.createElement("img", { src: badge.iconUrl, style: {
                            width: '52px',
                            height: '52px',
                            display: 'block',
                            margin: '0 auto',
                            objectFit: 'contain',
                            filter: badge.unlock ? 'none' : 'grayscale(1)'
                        } })),
                    React.createElement("div", { style: { fontSize: '12px', marginTop: '6px', lineHeight: 1.3, color: badge.unlock ? '#fff' : C.textDim } }, badge.name))))))),
            React.createElement(Footer, null))));
}

export { PokerCard as default };
