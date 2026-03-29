import React from 'react';
import { DarkContainer, UserHeader, Section, C, Footer } from './CardBase.js';
import HTML from './HTML.js';

const STAR_COLORS = {
    5: '#d4b163',
    4: '#843fa1',
    3: '#4a9ed6'
};
const ATTR_COLORS = {
    冰: '#3598db',
    火: '#ba372a',
    雷: '#b96ad9',
    风: '#169179',
    光: '#e6bf2e',
    暗: '#d97a24',
    共鸣: '#48c4d8'
};
function CharlistCard({ data }) {
    const { uid, base, roles } = data;
    const sorted = [...roles].sort((a, b) => b.starLevel - a.starLevel || b.level - a.level);
    const star5 = sorted.filter(r => r.starLevel === 5);
    const star4 = sorted.filter(r => r.starLevel === 4);
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement(UserHeader, { name: base.name, uid: uid, level: base.level, worldLevel: base.worldLevel, avatarUrl: data.headUrl, decoText: 'ROLE COLLECTION' }),
            React.createElement(Section, { title: '\u7EC3\u5EA6\u7EDF\u8BA1', extra: `★5: ${star5.length} · ★4: ${star4.length} · 共 ${roles.length} 角色` },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, sorted.map((role, i) => {
                    const starColor = STAR_COLORS[role.starLevel] || '#9ca3af';
                    const attrColor = ATTR_COLORS[role.attributeName] || '#8b95a5';
                    const chainColor = C.chain[role.chainCount] ?? C.chain[0];
                    return (React.createElement("div", { key: i, style: {
                            width: 'calc(20% - 8px)',
                            background: C.panelBg,
                            borderRadius: '10px',
                            padding: '12px 8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderTop: `3px solid ${starColor}`,
                            border: `1px solid ${C.panelBorder}`,
                            borderTopColor: starColor,
                            borderTopWidth: '3px',
                            boxSizing: 'border-box'
                        } },
                        React.createElement("div", { style: {
                                width: '64px',
                                height: '64px',
                                borderRadius: '32px',
                                overflow: 'hidden',
                                marginBottom: '8px',
                                border: `2px solid ${starColor}`
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
                        React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', color: '#fff', textAlign: 'center', lineHeight: 1.2, marginBottom: '6px' } }, role.roleName),
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' } },
                            React.createElement("span", { style: { fontSize: '14px', color: '#fff', fontWeight: 'bold' } },
                                "Lv.",
                                role.level),
                            React.createElement("span", { style: { fontSize: '12px', color: attrColor, background: `${attrColor}20`, borderRadius: '4px', padding: '1px 6px' } }, role.attributeName)),
                        React.createElement("div", { style: {
                                fontSize: '12px',
                                color: chainColor,
                                background: `${chainColor}20`,
                                borderRadius: '4px',
                                padding: '1px 8px',
                                fontWeight: 'bold'
                            } },
                            role.chainCount,
                            "\u94FE")));
                }))),
            React.createElement(Footer, null))));
}

export { CharlistCard as default };
