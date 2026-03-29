import React from 'react';
import { DarkContainer, C, Section, Footer } from './CardBase.js';
import HTML from './HTML.js';

const ATTR_COLORS = {
    冰: '#3598db',
    火: '#ba372a',
    雷: '#b96ad9',
    光: '#e6bf2e',
    暗: '#d97a24',
    风: '#169179',
    导: '#48c4d8'
};
function CharDetailCard({ data }) {
    const { detail } = data;
    const { role, level, chainList, weaponData, phantomData, skillList } = detail;
    const attrColor = ATTR_COLORS[role.attributeName] ?? '#d4b163';
    const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement("div", { style: {
                    background: `radial-gradient(circle at 100% 0%, ${attrColor}25 0%, transparent 40%),
                         linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
                    borderRadius: '16px',
                    padding: '25px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    border: `1px solid ${C.panelBorder}`,
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                } },
                role.roleIconUrl && (React.createElement("div", { style: {
                        width: '100px',
                        height: '100px',
                        flexShrink: 0,
                        marginRight: '30px',
                        position: 'relative',
                        borderRadius: '50%',
                        border: `3px solid ${attrColor}`,
                        overflow: 'hidden'
                    } },
                    React.createElement("img", { src: role.roleIconUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } }))),
                React.createElement("div", { style: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
                    React.createElement("div", { style: {
                            display: 'flex',
                            alignItems: 'baseline',
                            marginBottom: '10px',
                            borderBottom: `1px solid ${C.panelBorder}`,
                            paddingBottom: '8px',
                            position: 'relative'
                        } },
                        React.createElement("div", { style: {
                                position: 'absolute',
                                bottom: '-1px',
                                left: 0,
                                width: '40px',
                                height: '2px',
                                background: attrColor,
                                boxShadow: `0 0 8px ${attrColor}`
                            } }),
                        React.createElement("div", { style: { fontSize: '42px', fontWeight: 800, color: '#fff', marginRight: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, role.roleName),
                        React.createElement("div", { style: {
                                fontSize: '20px',
                                color: C.gold,
                                background: 'rgba(0,0,0,0.4)',
                                padding: '4px 12px',
                                borderRadius: '6px',
                                border: `1px solid ${C.goldDim}`,
                                fontWeight: 'bold'
                            } },
                            "UID ",
                            data.uid)),
                    React.createElement("div", { style: { display: 'flex', gap: '30px' } },
                        React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                            React.createElement("div", { style: { fontSize: '30px', fontWeight: 700, color: '#fff', lineHeight: 1.1 } }, level),
                            React.createElement("div", { style: { fontSize: '12px', color: C.textDim, fontWeight: 'bold', letterSpacing: '1px', marginTop: '2px' } }, "\u89D2\u8272\u7B49\u7EA7")),
                        React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                            React.createElement("div", { style: { fontSize: '30px', fontWeight: 700, color: attrColor, lineHeight: 1.1 } },
                                unlockedChains,
                                "/",
                                chainList?.length ?? 0),
                            React.createElement("div", { style: { fontSize: '12px', color: C.textDim, fontWeight: 'bold', letterSpacing: '1px', marginTop: '2px' } }, "\u5171\u9E23\u94FE")),
                        React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
                            React.createElement("div", { style: { fontSize: '14px', fontWeight: 700, color: attrColor, lineHeight: 1.1 } },
                                "\u25C6 ",
                                role.attributeName),
                            React.createElement("div", { style: { fontSize: '12px', color: C.textDim, fontWeight: 'bold', letterSpacing: '1px', marginTop: '2px' } }, '★'.repeat(role.starLevel)))))),
            weaponData && (React.createElement(Section, { title: '\u6B66\u5668' },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' } },
                    weaponData.weaponIcon && (React.createElement("img", { src: weaponData.weaponIcon, style: { width: '64px', height: '64px', display: 'block', borderRadius: '10px', border: `1px solid ${C.panelBorder}` } })),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold' } },
                            weaponData.weaponName,
                            React.createElement("span", { style: { color: C.gold, marginLeft: '8px', fontSize: '14px' } }, '★'.repeat(weaponData.weaponStarLevel))),
                        React.createElement("div", { style: { fontSize: '16px', color: C.textSecondary, marginTop: '4px' } },
                            "Lv.",
                            weaponData.level,
                            " | \u8C10\u632F R",
                            weaponData.resonLevel))))),
            skillList && skillList.length > 0 && (React.createElement(Section, { title: '\u6280\u80FD' },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, skillList.map((skill, i) => (React.createElement("div", { key: i, style: {
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        minWidth: '160px',
                        borderLeft: '2px solid rgba(255,255,255,0.2)'
                    } },
                    skill.iconUrl && React.createElement("img", { src: skill.iconUrl, style: { width: '36px', height: '36px', display: 'block', borderRadius: '6px' } }),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold' } }, skill.skillName),
                        React.createElement("div", { style: { fontSize: '13px', color: C.textDim } },
                            "Lv.",
                            skill.level)))))))),
            phantomData?.equipPhantomList && (React.createElement(Section, { title: '\u58F0\u9AB8', extra: `Cost: ${phantomData.cost}` },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '10px' } }, phantomData.equipPhantomList
                    .filter(ep => ep.phantomProp)
                    .map((ep, i) => {
                    const p = ep.phantomProp;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '10px',
                            padding: '10px 12px',
                            width: '170px',
                            boxSizing: 'border-box',
                            borderLeft: '2px solid rgba(255,255,255,0.15)'
                        } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' } },
                            p.icon && React.createElement("img", { src: p.icon, style: { width: '36px', height: '36px', display: 'block', borderRadius: '6px' } }),
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: '13px', fontWeight: 'bold', lineHeight: 1.2 } }, p.name),
                                React.createElement("div", { style: { fontSize: '12px', color: C.textDim } },
                                    "Lv.",
                                    p.level,
                                    " C",
                                    p.cost))),
                        p.mainProps && p.mainProps.length > 0 && (React.createElement("div", { style: { fontSize: '12px', color: C.gold, marginTop: '4px' } }, p.mainProps.map((mp, j) => (React.createElement("div", { key: j },
                            mp.attributeName,
                            ": ",
                            mp.attributeValue))))),
                        p.phantomProp && p.phantomProp.length > 0 && (React.createElement("div", { style: { fontSize: '11px', color: C.textSecondary, marginTop: '3px' } }, p.phantomProp.map((sp, j) => (React.createElement("div", { key: j },
                            sp.attributeName,
                            ": ",
                            sp.attributeValue)))))));
                })))),
            chainList && chainList.length > 0 && (React.createElement(Section, { title: `共鸣链 (${unlockedChains}/${chainList.length})` },
                React.createElement("div", { style: { display: 'flex', gap: '12px' } }, chainList.map((chain, i) => (React.createElement("div", { key: i, style: {
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: `2px solid ${chain.unlocked ? C.gold : 'rgba(255,255,255,0.15)'}`,
                        background: chain.unlocked ? C.goldDim : 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        opacity: chain.unlocked ? 1 : 0.4,
                        boxShadow: chain.unlocked ? `0 0 10px ${C.goldDim}` : 'none'
                    } }, chain.order)))))),
            React.createElement(Footer, null))));
}

export { CharDetailCard as default };
