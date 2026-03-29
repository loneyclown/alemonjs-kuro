import React from 'react';
import HTML from './HTML.js';

function PokerCard({ data }) {
    const { battle, base } = data;
    const expPercent = battle.expLimit > 0 ? Math.min(100, (battle.exp / battle.expLimit) * 100) : 0;
    const cardPercent = battle.maxCardNum > 0 ? Math.min(100, (battle.cardNum / battle.maxCardNum) * 100) : 0;
    const badgePercent = battle.maxBadgeNum > 0 ? Math.min(100, (battle.badgeNum / battle.maxBadgeNum) * 100) : 0;
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
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u6FC0\u6597 \u00B7 \u724C\u5C40"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } }, base ? `${base.name} | UID: ${data.uid}` : `UID: ${data.uid}`)),
            React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("div", null,
                        React.createElement("span", { style: { fontSize: '18px', fontWeight: 'bold', color: '#e8d5b0' } },
                            "Lv.",
                            battle.level),
                        React.createElement("span", { style: { fontSize: '14px', marginLeft: '8px', opacity: 0.8 } }, battle.levelName)),
                    React.createElement("div", { style: { fontSize: '12px', opacity: 0.6 } },
                        battle.exp,
                        "/",
                        battle.expLimit)),
                React.createElement("div", { style: { background: 'rgba(255,255,255,0.1)', borderRadius: '6px', height: '8px', overflow: 'hidden' } },
                    React.createElement("div", { style: {
                            background: 'linear-gradient(90deg, #dcb268, #e8d5b0)',
                            height: '100%',
                            width: `${expPercent}%`,
                            borderRadius: '6px'
                        } }))),
            React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, "\u5361\u7247\u6536\u96C6"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#e8d5b0' } },
                        battle.cardNum,
                        "/",
                        battle.maxCardNum)),
                React.createElement("div", { style: { background: 'rgba(255,255,255,0.1)', borderRadius: '6px', height: '8px', overflow: 'hidden' } },
                    React.createElement("div", { style: {
                            background: 'linear-gradient(90deg, #4fc3f7, #81d4fa)',
                            height: '100%',
                            width: `${cardPercent}%`,
                            borderRadius: '6px'
                        } }))),
            React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, "\u5FBD\u7AE0\u6536\u96C6"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#e8d5b0' } },
                        battle.badgeNum,
                        "/",
                        battle.maxBadgeNum)),
                React.createElement("div", { style: { background: 'rgba(255,255,255,0.1)', borderRadius: '6px', height: '8px', overflow: 'hidden', marginBottom: '12px' } },
                    React.createElement("div", { style: {
                            background: 'linear-gradient(90deg, #ffd54f, #ffecb3)',
                            height: '100%',
                            width: `${badgePercent}%`,
                            borderRadius: '6px'
                        } })),
                battle.badgeList.length > 0 && (React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, battle.badgeList.map((badge, i) => (React.createElement("div", { key: i, style: {
                        width: '100px',
                        padding: '8px',
                        borderRadius: '10px',
                        background: badge.unlock ? 'rgba(255,215,0,0.12)' : 'rgba(100,100,100,0.2)',
                        border: badge.unlock ? '1px solid rgba(255,215,0,0.4)' : '1px solid rgba(100,100,100,0.3)',
                        textAlign: 'center',
                        opacity: badge.unlock ? 1 : 0.5
                    } },
                    badge.iconUrl && (React.createElement("img", { src: badge.iconUrl, style: {
                            width: '48px',
                            height: '48px',
                            objectFit: 'contain',
                            filter: badge.unlock ? 'none' : 'grayscale(1)'
                        } })),
                    React.createElement("div", { style: { fontSize: '10px', marginTop: '4px', lineHeight: '1.3' } }, badge.name))))))))));
}

export { PokerCard as default };
