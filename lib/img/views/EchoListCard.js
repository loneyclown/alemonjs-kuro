import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

function EchoListCard({ data }) {
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
                    React.createElement("div", { style: { fontSize: '36px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, "\u58F0\u9AB8\u5217\u8868"),
                    React.createElement("div", { style: { fontSize: '18px', color: C.textSecondary, marginTop: '6px' } },
                        data.playerName,
                        " \u00B7 UID ",
                        data.uid)),
                data.totalPages > 1 && (React.createElement("div", { style: { fontSize: '18px', color: C.textDim, fontWeight: 'bold' } },
                    data.page,
                    " / ",
                    data.totalPages))),
            React.createElement(Section, { title: '\u58F0\u9AB8' },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '12px' } }, data.echoes.map((echo, i) => {
                    const fetterColor = WAVES_ECHO_COLORS[echo.fetterName] ?? C.gold;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '10px',
                            padding: '14px',
                            width: 'calc(50% - 6px)',
                            borderLeft: `3px solid ${fetterColor}`,
                            boxSizing: 'border-box'
                        } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' } },
                            echo.phantomIconUrl && React.createElement("img", { src: echo.phantomIconUrl, style: { width: '44px', height: '44px', display: 'block', borderRadius: '8px' } }),
                            React.createElement("div", { style: { flex: 1 } },
                                React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', color: '#fff', lineHeight: 1.3 } }, echo.phantomName),
                                React.createElement("div", { style: { display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' } },
                                    React.createElement("span", { style: { fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.4)', color: '#fff' } },
                                        "Lv.",
                                        echo.level),
                                    React.createElement("span", { style: { fontSize: '11px', padding: '2px 6px', borderRadius: '4px', background: `${fetterColor}25`, color: fetterColor } }, echo.fetterName),
                                    React.createElement("span", { style: { fontSize: '11px', color: C.gold } }, '◆'.repeat(echo.cost)))),
                            echo.roleIconUrl && (React.createElement("img", { src: echo.roleIconUrl, style: {
                                    width: '36px',
                                    height: '36px',
                                    display: 'block',
                                    borderRadius: '50%',
                                    border: `2px solid ${C.panelBorderTop}`
                                } }))),
                        echo.mainProps.map((prop, j) => (React.createElement("div", { key: `m${j}`, style: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '2px 0', color: C.gold } },
                            React.createElement("span", null, prop.attributeName),
                            React.createElement("span", { style: { fontWeight: 'bold' } }, prop.attributeValue)))),
                        echo.subProps.length > 0 && React.createElement("div", { style: { borderTop: `1px solid ${C.panelBorder}`, margin: '6px 0' } }),
                        echo.subProps.map((prop, j) => (React.createElement("div", { key: `s${j}`, style: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '2px 0', color: C.textSecondary } },
                            React.createElement("span", null, prop.attributeName),
                            React.createElement("span", null, prop.attributeValue)))),
                        React.createElement("div", { style: { fontSize: '11px', color: C.textDim, marginTop: '6px', textAlign: 'right' } }, echo.roleName)));
                })),
                data.echoes.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', color: C.textDim, fontSize: '18px' } }, "\u6682\u65E0\u58F0\u9AB8\u6570\u636E")),
            React.createElement(Footer, null))));
}

export { EchoListCard as default };
