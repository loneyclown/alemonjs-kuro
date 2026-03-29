import React from 'react';
import HTML from './HTML.js';

const STAR_COLORS = {
    5: '#fbbf24',
    4: '#a78bfa',
    3: '#60a5fa'
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
    const sorted = [...roles].sort((a, b) => {
        if (b.starLevel !== a.starLevel) {
            return b.starLevel - a.starLevel;
        }
        return b.level - a.level;
    });
    const star5 = sorted.filter(r => r.starLevel === 5);
    const star4 = sorted.filter(r => r.starLevel === 4);
    return (React.createElement(HTML, { style: { minWidth: '680px' } },
        React.createElement("div", { style: {
                padding: '24px',
                background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                    borderRadius: '12px 12px 0 0',
                    padding: '16px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                } },
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83D\uDCCA \u7EC3\u5EA6\u7EDF\u8BA1"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                        base.name,
                        " \u00B7 Lv.",
                        base.level,
                        " \u00B7 UID ",
                        uid)),
                React.createElement("div", { style: { textAlign: 'right' } },
                    React.createElement("div", { style: { fontSize: '14px', color: '#e0e4ff' } },
                        "\u5171 ",
                        roles.length,
                        " \u4E2A\u89D2\u8272"),
                    React.createElement("div", { style: { fontSize: '12px', color: '#a0a4cc', marginTop: '2px' } },
                        "\u2B505: ",
                        star5.length,
                        " \u00B7 \u2B504: ",
                        star4.length))),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '16px'
                } },
                React.createElement("div", { style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px'
                    } }, sorted.map((role, i) => {
                    const starColor = STAR_COLORS[role.starLevel] || '#9ca3af';
                    const attrColor = ATTR_COLORS[role.attributeName] || '#8b95a5';
                    return (React.createElement("div", { key: i, style: {
                            width: '120px',
                            background: '#32334f',
                            borderRadius: '10px',
                            padding: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderBottom: `3px solid ${starColor}`
                        } },
                        React.createElement("div", { style: {
                                width: '56px',
                                height: '56px',
                                borderRadius: '28px',
                                overflow: 'hidden',
                                marginBottom: '6px',
                                border: `2px solid ${starColor}`
                            } }, role.roleIconUrl ? (React.createElement("img", { src: role.roleIconUrl, style: { width: '100%', height: '100%', objectFit: 'cover' } })) : (React.createElement("div", { style: {
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                color: '#e0e4ff'
                            } }, role.roleName[0]))),
                        React.createElement("div", { style: {
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: '#e0e4ff',
                                textAlign: 'center',
                                lineHeight: '1.2',
                                marginBottom: '4px'
                            } }, role.roleName),
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '4px' } },
                            React.createElement("span", { style: { fontSize: '12px', color: '#e0e4ff', fontWeight: 'bold' } },
                                "Lv.",
                                role.level),
                            React.createElement("span", { style: {
                                    fontSize: '10px',
                                    color: attrColor,
                                    background: 'rgba(255,255,255,0.08)',
                                    borderRadius: '4px',
                                    padding: '1px 4px'
                                } }, role.attributeName)),
                        React.createElement("div", { style: { fontSize: '11px', color: '#a0a4cc', marginTop: '3px' } },
                            "\u547D\u5EA7 ",
                            role.chainCount)));
                }))))));
}

export { CharlistCard as default };
