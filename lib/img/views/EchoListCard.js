import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import HTML from './HTML.js';

function EchoListCard({ data }) {
    return (React.createElement(HTML, null,
        React.createElement("div", { style: {
                padding: '24px',
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: '#ffffff',
                minWidth: '600px'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    color: '#2d2d2d',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } }, "\u58F0\u9AB8\u5217\u8868"),
                    React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                        data.playerName,
                        " | UID: ",
                        data.uid)),
                data.totalPages > 1 && (React.createElement("div", { style: { fontSize: '13px', opacity: 0.7 } },
                    "\u7B2C ",
                    data.page,
                    "/",
                    data.totalPages,
                    " \u9875"))),
            React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, data.echoes.map((echo, i) => {
                const fetterColor = WAVES_ECHO_COLORS[echo.fetterName] ?? '#e8d5b0';
                return (React.createElement("div", { key: i, style: {
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '10px',
                        padding: '12px',
                        width: '270px',
                        borderLeft: `3px solid ${fetterColor}`
                    } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' } },
                        echo.phantomIconUrl && React.createElement("img", { src: echo.phantomIconUrl, style: { width: '40px', height: '40px', borderRadius: '6px' } }),
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement("div", { style: { fontSize: '12px', fontWeight: 'bold', lineHeight: '1.3' } }, echo.phantomName),
                            React.createElement("div", { style: { display: 'flex', gap: '4px', marginTop: '3px' } },
                                React.createElement("span", { style: {
                                        fontSize: '10px',
                                        padding: '1px 5px',
                                        borderRadius: '3px',
                                        background: 'rgba(0,0,0,0.4)',
                                        color: '#fff'
                                    } },
                                    "Lv.",
                                    echo.level),
                                React.createElement("span", { style: {
                                        fontSize: '10px',
                                        padding: '1px 5px',
                                        borderRadius: '3px',
                                        background: `${fetterColor}33`,
                                        color: fetterColor
                                    } }, echo.fetterName),
                                React.createElement("span", { style: { fontSize: '10px', color: '#e8d5b0' } }, '◆'.repeat(echo.cost)))),
                        echo.roleIconUrl && (React.createElement("img", { src: echo.roleIconUrl, style: {
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid rgba(255,255,255,0.2)'
                            } }))),
                    echo.mainProps.map((prop, j) => (React.createElement("div", { key: `m${j}`, style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '11px',
                            padding: '2px 0',
                            color: '#e8d5b0'
                        } },
                        React.createElement("span", null, prop.attributeName),
                        React.createElement("span", { style: { fontWeight: 'bold' } }, prop.attributeValue)))),
                    echo.subProps.length > 0 && React.createElement("div", { style: { borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' } }),
                    echo.subProps.map((prop, j) => (React.createElement("div", { key: `s${j}`, style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '11px',
                            padding: '2px 0',
                            opacity: 0.8
                        } },
                        React.createElement("span", null, prop.attributeName),
                        React.createElement("span", null, prop.attributeValue)))),
                    React.createElement("div", { style: { fontSize: '10px', opacity: 0.5, marginTop: '4px', textAlign: 'right' } }, echo.roleName)));
            })),
            data.echoes.length === 0 && React.createElement("div", { style: { textAlign: 'center', padding: '40px', opacity: 0.5 } }, "\u6682\u65E0\u58F0\u9AB8\u6570\u636E"))));
}

export { EchoListCard as default };
