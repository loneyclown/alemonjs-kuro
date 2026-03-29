import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import HTML from './HTML.js';

const CHAIN_COLORS = {
    0: '#666',
    1: '#4fc3f7',
    2: '#66bb6a',
    3: '#9c6cdb',
    4: '#e8a640',
    5: '#ff7043',
    6: '#ef5350'
};
function RankCard({ data }) {
    return (React.createElement(HTML, null,
        React.createElement("div", { style: {
                padding: '24px',
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: '#ffffff',
                minWidth: '560px'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    color: '#2d2d2d'
                } },
                React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u7EC3\u5EA6\u6392\u884C"),
                React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                    data.playerName,
                    " | UID: ",
                    data.uid)),
            data.entries.map((entry, i) => {
                const attrColor = WAVES_ECHO_COLORS[entry.attributeName] ?? '#e8d5b0';
                return (React.createElement("div", { key: i, style: {
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                    } },
                    React.createElement("div", { style: {
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: i < 3 ? '#e8d5b0' : '#888',
                            width: '30px',
                            textAlign: 'center'
                        } }, i + 1),
                    entry.roleIconUrl && (React.createElement("img", { src: entry.roleIconUrl, style: {
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            border: `2px solid ${attrColor}`,
                            objectFit: 'cover'
                        } })),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                            React.createElement("span", { style: { fontSize: '15px', fontWeight: 'bold' } }, entry.roleName),
                            React.createElement("span", { style: {
                                    fontSize: '10px',
                                    padding: '1px 6px',
                                    borderRadius: '4px',
                                    background: `${CHAIN_COLORS[entry.chainCount] ?? CHAIN_COLORS[0]}33`,
                                    color: CHAIN_COLORS[entry.chainCount] ?? CHAIN_COLORS[0]
                                } },
                                entry.chainCount,
                                "\u94FE"),
                            React.createElement("span", { style: {
                                    fontSize: '10px',
                                    padding: '1px 6px',
                                    borderRadius: '4px',
                                    background: 'rgba(255,255,255,0.1)',
                                    color: '#aaa'
                                } },
                                "Lv.",
                                entry.level)),
                        React.createElement("div", { style: { fontSize: '11px', opacity: 0.6, marginTop: '3px' } },
                            React.createElement("span", { style: { color: attrColor } },
                                "\u25C6 ",
                                entry.attributeName),
                            entry.weaponName !== '-' && (React.createElement("span", { style: { marginLeft: '10px' } },
                                entry.weaponName,
                                " Lv.",
                                entry.weaponLevel,
                                entry.resonLevel > 0 && ` 精${entry.resonLevel}`)))),
                    React.createElement("div", { style: { textAlign: 'right' } },
                        React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: '#e8d5b0' } }, entry.score.toFixed(0)),
                        React.createElement("div", { style: { fontSize: '10px', opacity: 0.5 } }, "\u7EC3\u5EA6\u5206"))));
            }),
            data.entries.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', opacity: 0.5 } }, "\u6682\u65E0\u6392\u884C\u6570\u636E"))));
}

export { RankCard as default };
