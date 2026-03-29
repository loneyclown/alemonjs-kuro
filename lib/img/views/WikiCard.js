import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import { C, DarkContainer, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

function WikiCard({ data }) {
    const { detail, queryType } = data;
    const { role, level, chainList, weaponData, skillList } = detail;
    const attrColor = WAVES_ECHO_COLORS[role.attributeName] ?? C.gold;
    const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement("div", { style: {
                    background: `radial-gradient(circle at 0% 50%, ${attrColor}25 0%, transparent 50%),
                         radial-gradient(circle at 100% 0%, ${C.goldDim} 0%, transparent 40%),
                         linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
                    borderRadius: '16px',
                    padding: '25px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '24px',
                    border: `1px solid ${C.panelBorder}`,
                    position: 'relative'
                } },
                React.createElement("div", { style: {
                        position: 'absolute',
                        top: '20px',
                        right: '30px',
                        fontSize: '14px',
                        letterSpacing: '4px',
                        color: 'rgba(255,255,255,0.1)',
                        fontWeight: 'bold'
                    } }, "WIKI"),
                role.roleIconUrl && (React.createElement("img", { src: role.roleIconUrl, style: {
                        width: '100px',
                        height: '100px',
                        display: 'block',
                        borderRadius: '50%',
                        border: `3px solid ${attrColor}`,
                        objectFit: 'cover',
                        flexShrink: 0
                    } })),
                React.createElement("div", { style: { flex: 1 } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' } },
                        React.createElement("div", { style: { fontSize: '42px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, role.roleName),
                        React.createElement("div", { style: { fontSize: '16px', color: C.textDim } }, queryType)),
                    React.createElement("div", { style: { fontSize: '16px', color: C.textSecondary, marginBottom: '6px' } },
                        "Lv.",
                        level,
                        " \u00B7 ",
                        React.createElement("span", { style: { color: C.star5 } }, '★'.repeat(role.starLevel)),
                        " \u00B7 \u5171\u9E23\u94FE ",
                        unlockedChains,
                        "/",
                        chainList?.length ?? 0),
                    React.createElement("div", { style: { display: 'flex', gap: '16px', alignItems: 'center' } },
                        React.createElement("span", { style: { color: attrColor, fontSize: '14px' } },
                            "\u25C6 ",
                            role.attributeName),
                        React.createElement("div", { style: {
                                fontSize: '16px',
                                color: C.gold,
                                background: 'rgba(0,0,0,0.4)',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                border: `1px solid ${C.goldDim}`,
                                fontWeight: 'bold'
                            } },
                            "UID ",
                            data.uid)))),
            (queryType === '技能' || queryType === '概览') && skillList && skillList.length > 0 && (React.createElement(Section, { title: '\u6280\u80FD' },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '2px' } }, skillList.map((skill, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 0',
                        borderBottom: i < skillList.length - 1 ? `1px solid ${C.panelBorder}` : 'none'
                    } },
                    skill.iconUrl && React.createElement("img", { src: skill.iconUrl, style: { width: '40px', height: '40px', display: 'block', borderRadius: '8px' } }),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold', color: '#fff' } }, skill.skillName),
                        React.createElement("div", { style: { fontSize: '13px', color: C.textDim } }, skill.type)),
                    React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: skill.level >= 10 ? C.gold : '#fff' } },
                        "Lv.",
                        skill.level))))))),
            (queryType === '共鸣链' || queryType === '概览') && chainList && chainList.length > 0 && (React.createElement(Section, { title: '\u5171\u9E23\u94FE' },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '2px' } }, chainList.map((chain, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 0',
                        borderBottom: i < chainList.length - 1 ? `1px solid ${C.panelBorder}` : 'none',
                        opacity: chain.unlocked ? 1 : 0.4
                    } },
                    chain.iconUrl && (React.createElement("img", { src: chain.iconUrl, style: { width: '40px', height: '40px', display: 'block', borderRadius: '8px', filter: chain.unlocked ? 'none' : 'grayscale(1)' } })),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: '16px', fontWeight: 'bold', color: '#fff' } },
                            "\u7B2C",
                            chain.order,
                            "\u94FE \u00B7 ",
                            chain.name)),
                    React.createElement("div", { style: {
                            fontSize: '13px',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            background: chain.unlocked ? 'rgba(102,187,106,0.15)' : 'rgba(0,0,0,0.3)',
                            color: chain.unlocked ? '#66bb6a' : C.textDim,
                            fontWeight: 'bold'
                        } }, chain.unlocked ? '已解锁' : '未解锁'))))))),
            queryType === '概览' && weaponData && (React.createElement(Section, { title: '\u88C5\u5907\u6B66\u5668' },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
                    weaponData.weaponIcon && React.createElement("img", { src: weaponData.weaponIcon, style: { width: '64px', height: '64px', display: 'block', borderRadius: '10px' } }),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } },
                            weaponData.weaponName,
                            React.createElement("span", { style: { color: C.star5, marginLeft: '8px', fontSize: '14px' } }, '★'.repeat(weaponData.weaponStarLevel))),
                        React.createElement("div", { style: { fontSize: '14px', color: C.textDim, marginTop: '4px' } },
                            "Lv.",
                            weaponData.level,
                            " \u00B7 \u7CBE\u70BC ",
                            weaponData.resonLevel))))),
            React.createElement(Footer, null))));
}

export { WikiCard as default };
