import { WAVES_ECHO_COLORS } from '../../constants/kuro.js';
import React from 'react';
import HTML from './HTML.js';

function WikiCard({ data }) {
    const { detail, queryType } = data;
    const { role, level, chainList, weaponData, skillList } = detail;
    const attrColor = WAVES_ECHO_COLORS[role.attributeName] ?? '#e8d5b0';
    const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;
    return (React.createElement(HTML, null,
        React.createElement("div", { style: {
                padding: '24px',
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: '#ffffff',
                minWidth: '480px'
            } },
            React.createElement("div", { style: {
                    background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '16px',
                    color: '#2d2d2d',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                } },
                role.roleIconUrl && (React.createElement("img", { src: role.roleIconUrl, style: {
                        width: '72px',
                        height: '72px',
                        borderRadius: '50%',
                        border: `3px solid ${attrColor}`,
                        objectFit: 'cover'
                    } })),
                React.createElement("div", null,
                    React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold' } },
                        role.roleName,
                        React.createElement("span", { style: { fontSize: '13px', fontWeight: 'normal', marginLeft: '8px', opacity: 0.7 } }, queryType)),
                    React.createElement("div", { style: { fontSize: '13px', opacity: 0.7, marginTop: '4px' } },
                        "Lv.",
                        level,
                        " | ",
                        '★'.repeat(role.starLevel),
                        " | \u5171\u9E23\u94FE ",
                        unlockedChains,
                        "/",
                        chainList?.length ?? 0),
                    React.createElement("div", { style: { fontSize: '12px', marginTop: '2px' } },
                        React.createElement("span", { style: { color: attrColor } },
                            "\u25C6 ",
                            role.attributeName),
                        React.createElement("span", { style: { marginLeft: '10px', opacity: 0.7 } },
                            "UID: ",
                            data.uid)))),
            (queryType === '技能' || queryType === '概览') && skillList && skillList.length > 0 && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { fontSize: '14px', color: '#e8d5b0', marginBottom: '10px' } }, "\u6280\u80FD"),
                skillList.map((skill, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px 0',
                        borderBottom: i < skillList.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none'
                    } },
                    skill.iconUrl && React.createElement("img", { src: skill.iconUrl, style: { width: '36px', height: '36px', borderRadius: '6px' } }),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold' } }, skill.skillName),
                        React.createElement("div", { style: { fontSize: '11px', opacity: 0.5 } }, skill.type)),
                    React.createElement("div", { style: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: skill.level >= 10 ? '#e8d5b0' : '#fff'
                        } },
                        "Lv.",
                        skill.level)))))),
            (queryType === '共鸣链' || queryType === '概览') && chainList && chainList.length > 0 && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { fontSize: '14px', color: '#e8d5b0', marginBottom: '10px' } }, "\u5171\u9E23\u94FE"),
                chainList.map((chain, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 0',
                        borderBottom: i < chainList.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        opacity: chain.unlocked ? 1 : 0.4
                    } },
                    chain.iconUrl && (React.createElement("img", { src: chain.iconUrl, style: {
                            width: '36px',
                            height: '36px',
                            borderRadius: '6px',
                            filter: chain.unlocked ? 'none' : 'grayscale(1)'
                        } })),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold' } },
                            "\u7B2C",
                            chain.order,
                            "\u94FE \u00B7 ",
                            chain.name)),
                    React.createElement("div", { style: {
                            fontSize: '11px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: chain.unlocked ? 'rgba(76,175,80,0.2)' : 'rgba(255,255,255,0.1)',
                            color: chain.unlocked ? '#66bb6a' : '#888'
                        } }, chain.unlocked ? '已解锁' : '未解锁')))))),
            queryType === '概览' && weaponData && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { fontSize: '14px', color: '#e8d5b0', marginBottom: '10px' } }, "\u88C5\u5907\u6B66\u5668"),
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                    weaponData.weaponIcon && React.createElement("img", { src: weaponData.weaponIcon, style: { width: '56px', height: '56px', borderRadius: '8px' } }),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } },
                            weaponData.weaponName,
                            React.createElement("span", { style: { color: '#e8a640', marginLeft: '6px', fontSize: '12px' } }, '★'.repeat(weaponData.weaponStarLevel))),
                        React.createElement("div", { style: { fontSize: '12px', opacity: 0.6, marginTop: '2px' } },
                            "Lv.",
                            weaponData.level,
                            " | \u7CBE\u70BC ",
                            weaponData.resonLevel))))))));
}

export { WikiCard as default };
