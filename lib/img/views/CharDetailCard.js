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
    const weapon = weaponData?.weapon;
    const attrColor = ATTR_COLORS[role.attributeName ?? ''] ?? '#d4b163';
    const unlockedChains = chainList?.filter(c => c.unlocked).length ?? 0;
    const equippedPhantoms = phantomData?.equipPhantomList?.filter(ep => ep.phantomProp) ?? [];
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement("div", { style: {
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: `1px solid ${C.panelBorder}`,
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                    minHeight: '280px',
                    display: 'flex'
                } },
                React.createElement("div", { style: {
                        position: 'absolute',
                        inset: 0,
                        background: `radial-gradient(circle at 80% 30%, ${attrColor}30 0%, transparent 50%),
                           linear-gradient(135deg, rgba(20,22,28,0.95) 0%, rgba(10,12,16,0.98) 100%)`,
                        zIndex: 0
                    } }),
                role.rolePicUrl && (React.createElement("div", { style: {
                        position: 'absolute',
                        right: '-20px',
                        top: '-40px',
                        width: '380px',
                        height: '380px',
                        zIndex: 1,
                        opacity: 0.85
                    } },
                    React.createElement("img", { src: role.rolePicUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'contain' } }))),
                React.createElement("div", { style: { position: 'relative', zIndex: 2, padding: '30px 40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' } },
                        role.roleIconUrl && (React.createElement("div", { style: {
                                width: '80px',
                                height: '80px',
                                flexShrink: 0,
                                borderRadius: '50%',
                                border: `3px solid ${attrColor}`,
                                overflow: 'hidden',
                                boxShadow: `0 0 15px ${attrColor}40`
                            } },
                            React.createElement("img", { src: role.roleIconUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } }))),
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: '42px', fontWeight: 800, color: '#fff', textShadow: '0 4px 10px rgba(0,0,0,0.5)' } }, role.roleName),
                            React.createElement("div", { style: { display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' } },
                                React.createElement("span", { style: { color: attrColor, fontSize: '22px', fontWeight: 'bold' } },
                                    "\u25C6 ",
                                    role.attributeName),
                                React.createElement("span", { style: { color: C.gold, fontSize: '20px' } }, '★'.repeat(role.starLevel))))),
                    React.createElement("div", { style: { display: 'flex', gap: '24px', marginTop: '8px' } },
                        React.createElement("div", { style: { background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '10px 20px', border: `1px solid ${C.panelBorder}` } },
                            React.createElement("div", { style: { fontSize: '28px', fontWeight: 700, color: '#fff', lineHeight: 1.1 } },
                                "Lv.",
                                level),
                            React.createElement("div", { style: { fontSize: '18px', color: C.textDim, marginTop: '2px' } }, "\u89D2\u8272\u7B49\u7EA7")),
                        React.createElement("div", { style: { background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '10px 20px', border: `1px solid ${C.panelBorder}` } },
                            React.createElement("div", { style: { fontSize: '28px', fontWeight: 700, color: attrColor, lineHeight: 1.1 } },
                                unlockedChains,
                                "/",
                                chainList?.length ?? 0),
                            React.createElement("div", { style: { fontSize: '18px', color: C.textDim, marginTop: '2px' } }, "\u5171\u9E23\u94FE")),
                        React.createElement("div", { style: { background: 'rgba(0,0,0,0.4)', borderRadius: '10px', padding: '10px 20px', border: `1px solid ${C.panelBorder}` } },
                            React.createElement("div", { style: { fontSize: '20px', fontWeight: 700, color: C.gold, lineHeight: 1.1 } },
                                "UID ",
                                data.uid),
                            React.createElement("div", { style: { fontSize: '18px', color: C.textDim, marginTop: '2px' } }, "\u7279\u5F81\u7801"))))),
            weapon && (React.createElement(Section, { title: '\u6B66\u5668' },
                React.createElement("div", { style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        border: `1px solid ${C.panelBorder}`
                    } },
                    weapon.weaponIcon && (React.createElement("div", { style: {
                            width: '80px',
                            height: '80px',
                            flexShrink: 0,
                            borderRadius: '12px',
                            border: `2px solid ${C.goldBorder}`,
                            overflow: 'hidden',
                            background: 'rgba(0,0,0,0.4)'
                        } },
                        React.createElement("img", { src: weapon.weaponIcon, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } }))),
                    React.createElement("div", { style: { flex: 1 } },
                        React.createElement("div", { style: { fontSize: '24px', fontWeight: 'bold', color: '#fff' } },
                            weapon.weaponName,
                            React.createElement("span", { style: { color: C.gold, marginLeft: '10px', fontSize: '20px' } }, '★'.repeat(weapon.weaponStarLevel))),
                        React.createElement("div", { style: { fontSize: '20px', color: C.textSecondary, marginTop: '6px' } },
                            "Lv.",
                            weaponData.level,
                            " \u00B7 \u8C10\u632F R",
                            weaponData.resonLevel))))),
            chainList && chainList.length > 0 && (React.createElement(Section, { title: `共鸣链 (${unlockedChains}/${chainList.length})` },
                React.createElement("div", { style: { display: 'flex', gap: '12px', justifyContent: 'space-between' } }, chainList.map((chain, i) => (React.createElement("div", { key: i, style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        flex: 1
                    } },
                    React.createElement("div", { style: {
                            width: '72px',
                            height: '72px',
                            borderRadius: '50%',
                            border: `2px solid ${chain.unlocked ? attrColor : 'rgba(255,255,255,0.15)'}`,
                            background: chain.unlocked ? `${attrColor}20` : 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: chain.unlocked ? 1 : 0.4,
                            boxShadow: chain.unlocked ? `0 0 15px ${attrColor}40` : 'none',
                            overflow: 'hidden'
                        } }, chain.iconUrl ? (React.createElement("img", { src: chain.iconUrl, style: {
                            width: '56px',
                            height: '56px',
                            display: 'block',
                            objectFit: 'contain',
                            filter: chain.unlocked ? 'none' : 'grayscale(100%) brightness(0.5)'
                        } })) : (React.createElement("span", { style: { fontSize: '24px', fontWeight: 'bold', color: chain.unlocked ? attrColor : C.textDim } }, chain.order))),
                    React.createElement("div", { style: { fontSize: '18px', color: chain.unlocked ? '#fff' : C.textDim, textAlign: 'center', lineHeight: 1.2 } }, chain.name || `第${chain.order}链`))))))),
            skillList && skillList.length > 0 && (React.createElement(Section, { title: '\u6280\u80FD' },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '12px' } }, skillList.map((entry, i) => {
                    const sk = entry.skill;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '10px',
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            minWidth: '180px',
                            border: `1px solid ${C.panelBorder}`
                        } },
                        sk?.iconUrl ? (React.createElement("div", { style: {
                                width: '48px',
                                height: '48px',
                                flexShrink: 0,
                                borderRadius: '10px',
                                overflow: 'hidden',
                                background: 'rgba(0,0,0,0.4)',
                                border: `1px solid ${C.panelBorder}`
                            } },
                            React.createElement("img", { src: sk.iconUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'contain' } }))) : (React.createElement("div", { style: {
                                width: '48px',
                                height: '48px',
                                flexShrink: 0,
                                borderRadius: '10px',
                                background: `${attrColor}20`,
                                border: `1px solid ${attrColor}40`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                fontWeight: 'bold',
                                color: attrColor
                            } }, (sk?.name || '?')[0])),
                        React.createElement("div", null,
                            React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#fff' } }, sk?.name || '-'),
                            React.createElement("div", { style: { fontSize: '18px', color: C.gold, fontWeight: 'bold' } },
                                "Lv.",
                                entry.level))));
                })))),
            equippedPhantoms.length > 0 && (React.createElement(Section, { title: '\u58F0\u9AB8', extra: `Cost: ${phantomData.cost}` },
                React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '12px' } }, equippedPhantoms.map((ep, i) => {
                    const p = ep.phantomProp;
                    if (!p) {
                        return null;
                    }
                    const fetterName = ep.fetterDetail?.name;
                    return (React.createElement("div", { key: i, style: {
                            background: 'rgba(0,0,0,0.3)',
                            borderRadius: '12px',
                            padding: '14px',
                            width: '180px',
                            boxSizing: 'border-box',
                            border: `1px solid ${C.panelBorder}`
                        } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' } },
                            p.iconUrl ? (React.createElement("div", { style: {
                                    width: '48px',
                                    height: '48px',
                                    flexShrink: 0,
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    background: 'rgba(0,0,0,0.4)',
                                    border: `1px solid ${C.panelBorder}`
                                } },
                                React.createElement("img", { src: p.iconUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'contain' } }))) : (React.createElement("div", { style: {
                                    width: '48px',
                                    height: '48px',
                                    flexShrink: 0,
                                    borderRadius: '10px',
                                    background: `${C.goldDim}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '22px',
                                    fontWeight: 'bold',
                                    color: C.gold
                                } }, (p.name || '?')[0])),
                            React.createElement("div", { style: { flex: 1, minWidth: 0 } },
                                React.createElement("div", { style: {
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        lineHeight: 1.2,
                                        color: '#fff',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    } }, p.name || '-'),
                                React.createElement("div", { style: { fontSize: '18px', color: C.textDim } },
                                    "Lv.",
                                    ep.level,
                                    " \u00B7 C",
                                    ep.cost))),
                        fetterName && (React.createElement("div", { style: { fontSize: '18px', color: attrColor, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, fetterName)),
                        ep.mainProps && ep.mainProps.length > 0 && (React.createElement("div", { style: { marginTop: '4px' } }, ep.mainProps.map((mp, j) => (React.createElement("div", { key: j, style: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', color: C.gold, padding: '1px 0' } },
                            React.createElement("span", null, mp.attributeName),
                            React.createElement("span", { style: { fontWeight: 'bold' } }, mp.attributeValue)))))),
                        ep.subProps && ep.subProps.length > 0 && (React.createElement("div", { style: { marginTop: '4px', borderTop: `1px solid ${C.panelBorder}`, paddingTop: '4px' } }, ep.subProps.map((sp, j) => (React.createElement("div", { key: j, style: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', color: C.textSecondary, padding: '1px 0' } },
                            React.createElement("span", null, sp.attributeName),
                            React.createElement("span", null, sp.attributeValue))))))));
                })))),
            React.createElement(Footer, null))));
}

export { CharDetailCard as default };
