import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

function RankCard({ data }) {
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
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u7EC3\u5EA6\u6392\u884C"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        data.playerName,
                        " \u00B7 UID ",
                        data.uid)),
                React.createElement("div", { style: { fontSize: '14px', letterSpacing: '4px', color: 'rgba(255,255,255,0.1)', fontWeight: 'bold' } }, "RANK")),
            React.createElement(Section, { title: '\u6392\u884C' },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' } }, data.entries.map((entry, i) => {
                    const attrColor = WAVES_ECHO_COLORS[entry.attributeName] ?? C.gold;
                    const chainColor = C.chain[entry.chainCount] ?? C.chain[0];
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '10px',
                            padding: '14px 20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            borderLeft: i < 3 ? `3px solid ${C.gold}` : `3px solid ${C.panelBorder}`
                        } },
                        React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', color: i < 3 ? C.gold : C.textDim, width: '36px', textAlign: 'center' } }, i + 1),
                        entry.roleIconUrl && (React.createElement("img", { src: entry.roleIconUrl, style: {
                                width: '52px',
                                height: '52px',
                                display: 'block',
                                borderRadius: '50%',
                                border: `2px solid ${attrColor}`,
                                objectFit: 'cover'
                            } })),
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                                React.createElement("span", { style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } }, entry.roleName),
                                React.createElement("span", { style: {
                                        fontSize: '11px',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        background: `${chainColor}25`,
                                        color: chainColor,
                                        fontWeight: 'bold'
                                    } },
                                    entry.chainCount,
                                    "\u94FE"),
                                React.createElement("span", { style: { fontSize: '12px', color: C.textDim } },
                                    "Lv.",
                                    entry.level)),
                            React.createElement("div", { style: { fontSize: '13px', color: C.textDim, marginTop: '4px' } },
                                React.createElement("span", { style: { color: attrColor } },
                                    "\u25C6 ",
                                    entry.attributeName),
                                entry.weaponName !== '-' && (React.createElement("span", { style: { marginLeft: '12px' } },
                                    entry.weaponName,
                                    " Lv.",
                                    entry.weaponLevel,
                                    entry.resonLevel > 0 && ` 精${entry.resonLevel}`)))),
                        React.createElement("div", { style: { textAlign: 'right' } },
                            React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', color: C.gold } }, entry.score.toFixed(0)),
                            React.createElement("div", { style: { fontSize: '12px', color: C.textDim } }, "\u7EC3\u5EA6\u5206"))));
                })),
                data.entries.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u6682\u65E0\u6392\u884C\u6570\u636E")),
            React.createElement(Footer, null))));
}

export { RankCard as default };
