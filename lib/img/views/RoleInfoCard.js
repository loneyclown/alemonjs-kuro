import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import HTML from './HTML.js';

function starColor(star) {
    if (star >= 5) {
        return '#fbbf24';
    }
    if (star >= 4) {
        return '#a78bfa';
    }
    return '#6b9fff';
}
function RoleInfoCard({ data }) {
    const { uid, base, roles } = data;
    const sortedRoles = [...roles].sort((a, b) => b.starLevel - a.starLevel || b.level - a.level);
    return (React.createElement(HTML, null,
        React.createElement("div", { style: {
                padding: '24px',
                background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)',
                minWidth: '480px'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                    borderRadius: '12px 12px 0 0',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83D\uDC64 \u89D2\u8272\u4E00\u89C8"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                        base.name,
                        " \u00B7 Lv.",
                        base.level,
                        " \u00B7 UID ",
                        uid)),
                React.createElement("div", { style: {
                        fontSize: '13px',
                        color: '#a0a4cc',
                        textAlign: 'right'
                    } },
                    "\u5171 ",
                    roles.length,
                    " \u4E2A\u89D2\u8272")),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '16px'
                } },
                React.createElement("div", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '10px'
                    } }, sortedRoles.map((role, idx) => {
                    const attrColor = WAVES_ECHO_COLORS[role.attributeName] || '#6b9fff';
                    return (React.createElement("div", { key: idx, style: {
                            width: 'calc(33.333% - 7px)',
                            background: '#32334f',
                            borderRadius: '10px',
                            padding: '12px 10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderTop: `3px solid ${starColor(role.starLevel)}`
                        } },
                        React.createElement("div", { style: {
                                fontSize: '14px',
                                fontWeight: 'bold',
                                color: '#e0e4ff',
                                marginBottom: '4px',
                                textAlign: 'center'
                            } }, role.roleName),
                        React.createElement("div", { style: {
                                fontSize: '12px',
                                color: starColor(role.starLevel),
                                marginBottom: '6px'
                            } }, '★'.repeat(role.starLevel)),
                        React.createElement("div", { style: {
                                fontSize: '11px',
                                color: attrColor,
                                background: `${attrColor}20`,
                                borderRadius: '4px',
                                padding: '2px 6px',
                                marginBottom: '6px'
                            } }, role.attributeName),
                        React.createElement("div", { style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                fontSize: '12px'
                            } },
                            React.createElement("span", { style: { color: '#a0a4cc' } },
                                "Lv.",
                                role.level),
                            React.createElement("span", { style: { color: '#fbbf24' } }, role.chainCount > 0 ? `${role.chainCount}命` : '0命'))));
                }))),
            React.createElement("div", { style: {
                    marginTop: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#5a5d8c'
                } }, "Powered by alemonjs \u00B7 \u9E23\u6F6E\u52A9\u624B"))));
}

export { RoleInfoCard as default };
