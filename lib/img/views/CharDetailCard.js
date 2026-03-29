import React from 'react';
import HTML from './HTML.js';

const ATTR_COLORS = {
    冰: '#6dd5ed',
    火: '#ff6b6b',
    雷: '#d89cf6',
    光: '#ffd93d',
    暗: '#9d65c9',
    风: '#7ec8a0',
    导: '#e8d5b0'
};
function CharDetailCard({ data }) {
    const { detail } = data;
    const { role, level, chainList, weaponData, phantomData, skillList } = detail;
    const attrColor = ATTR_COLORS[role.attributeName] ?? '#ffffff';
    const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;
    return (React.createElement(HTML, { style: { minWidth: '480px' } },
        React.createElement("div", { style: {
                padding: '24px',
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                color: '#ffffff'
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
                    React.createElement("div", { style: { fontSize: '22px', fontWeight: 'bold' } }, role.roleName),
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
            weaponData && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#e8d5b0' } }, "\u6B66\u5668"),
                React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                    weaponData.weaponIcon && (React.createElement("img", { src: weaponData.weaponIcon, style: { width: '52px', height: '52px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)' } })),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '15px', fontWeight: 'bold' } }, weaponData.weaponName),
                        React.createElement("div", { style: { fontSize: '12px', opacity: 0.7, marginTop: '2px' } },
                            "Lv.",
                            weaponData.level,
                            " | ",
                            '★'.repeat(weaponData.weaponStarLevel),
                            " | \u8C10\u632F R",
                            weaponData.resonLevel))))),
            skillList && skillList.length > 0 && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#e8d5b0' } }, "\u6280\u80FD"),
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, skillList.map((skill, i) => (React.createElement("div", { key: i, style: {
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        minWidth: '120px'
                    } },
                    skill.iconUrl && React.createElement("img", { src: skill.iconUrl, style: { width: '28px', height: '28px', borderRadius: '4px' } }),
                    React.createElement("div", null,
                        React.createElement("div", { style: { fontSize: '12px', fontWeight: 'bold' } }, skill.skillName),
                        React.createElement("div", { style: { fontSize: '11px', opacity: 0.6 } },
                            "Lv.",
                            skill.level)))))))),
            phantomData?.equipPhantomList && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    marginBottom: '12px'
                } },
                React.createElement("div", { style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#e8d5b0',
                        display: 'flex',
                        justifyContent: 'space-between'
                    } },
                    React.createElement("span", null, "\u58F0\u9AB8"),
                    React.createElement("span", { style: { fontSize: '12px', opacity: 0.6, fontWeight: 'normal' } },
                        "Cost: ",
                        phantomData.cost)),
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '8px' } }, phantomData.equipPhantomList
                    .filter(ep => ep.phantomProp)
                    .map((ep, i) => {
                    const p = ep.phantomProp;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(255,255,255,0.06)',
                            borderRadius: '8px',
                            padding: '8px 10px',
                            width: '130px',
                            boxSizing: 'border-box'
                        } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' } },
                            p.icon && React.createElement("img", { src: p.icon, style: { width: '28px', height: '28px', borderRadius: '4px' } }),
                            React.createElement("div", null,
                                React.createElement("div", { style: { fontSize: '11px', fontWeight: 'bold', lineHeight: '1.2' } }, p.name),
                                React.createElement("div", { style: { fontSize: '10px', opacity: 0.5 } },
                                    "Lv.",
                                    p.level,
                                    " C",
                                    p.cost))),
                        p.mainProps && p.mainProps.length > 0 && (React.createElement("div", { style: { fontSize: '10px', color: '#e8d5b0', marginTop: '2px' } }, p.mainProps.map((mp, j) => (React.createElement("div", { key: j },
                            mp.attributeName,
                            ": ",
                            mp.attributeValue))))),
                        p.phantomProp && p.phantomProp.length > 0 && (React.createElement("div", { style: { fontSize: '9px', opacity: 0.6, marginTop: '2px' } }, p.phantomProp.map((sp, j) => (React.createElement("div", { key: j },
                            sp.attributeName,
                            ": ",
                            sp.attributeValue)))))));
                })))),
            chainList && chainList.length > 0 && (React.createElement("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '14px 16px'
                } },
                React.createElement("div", { style: { fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#e8d5b0' } },
                    "\u5171\u9E23\u94FE (",
                    unlockedChains,
                    "/",
                    chainList.length,
                    ")"),
                React.createElement("div", { style: { display: 'flex', gap: '8px' } }, chainList.map((chain, i) => (React.createElement("div", { key: i, style: {
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: `2px solid ${chain.unlocked ? '#e8d5b0' : 'rgba(255,255,255,0.2)'}`,
                        background: chain.unlocked ? 'rgba(232,213,176,0.2)' : 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        opacity: chain.unlocked ? 1 : 0.4
                    } }, chain.order)))))))));
}

export { CharDetailCard as default };
