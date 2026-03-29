import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import { DarkContainer, UserHeader, Section, C, Footer } from './CardBase.js';
import HTML from './HTML.js';

const STAR_COLORS = { 5: C.star5, 4: C.star4, 3: '#4a9ed6' };
function RoleInfoCard({ data }) {
    const { uid, base, roles } = data;
    const sortedRoles = [...roles].sort((a, b) => b.starLevel - a.starLevel || b.level - a.level);
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement(UserHeader, { name: base.name, uid: uid, level: base.level, avatarUrl: data.headUrl, decoText: 'ROLE OVERVIEW' }),
            React.createElement(Section, { title: '\u89D2\u8272\u4E00\u89C8', extra: `共 ${roles.length} 个` },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, sortedRoles.map((role, idx) => {
                    const attrColor = WAVES_ECHO_COLORS[role.attributeName] || '#6b9fff';
                    const sColor = STAR_COLORS[role.starLevel] || '#4a9ed6';
                    const chainColor = C.chain[role.chainCount] ?? C.chain[0];
                    return (React.createElement("div", { key: idx, style: {
                            width: 'calc(20% - 8px)',
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '10px',
                            padding: '12px 8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderTop: `3px solid ${sColor}`,
                            boxSizing: 'border-box'
                        } },
                        React.createElement("div", { style: {
                                width: '64px',
                                height: '64px',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                marginBottom: '8px',
                                border: `2px solid ${sColor}`
                            } }, role.roleIconUrl ? (React.createElement("img", { src: role.roleIconUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } })) : (React.createElement("div", { style: {
                                width: '100%',
                                height: '100%',
                                background: C.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                color: C.gold
                            } }, role.roleName[0]))),
                        React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', color: '#fff', marginBottom: '4px', textAlign: 'center' } }, role.roleName),
                        React.createElement("div", { style: { fontSize: '12px', color: sColor, marginBottom: '6px' } }, '★'.repeat(role.starLevel)),
                        React.createElement("div", { style: {
                                fontSize: '11px',
                                color: attrColor,
                                background: `${attrColor}20`,
                                borderRadius: '4px',
                                padding: '2px 6px',
                                marginBottom: '6px'
                            } }, role.attributeName),
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', width: '100%', fontSize: '12px' } },
                            React.createElement("span", { style: { color: C.textSecondary } },
                                "Lv.",
                                role.level),
                            React.createElement("span", { style: {
                                    color: chainColor,
                                    background: `${chainColor}25`,
                                    borderRadius: '4px',
                                    padding: '1px 6px',
                                    fontSize: '11px',
                                    fontWeight: 'bold'
                                } },
                                role.chainCount,
                                "\u94FE"))));
                }))),
            React.createElement(Footer, null))));
}

export { RoleInfoCard as default };
