import React from 'react';
import { DarkContainer, UserHeader, Section, C, Footer } from './CardBase.js';
import HTML from './HTML.js';

function ChallengeCard({ data }) {
    const { uid, base, challenge, title, icon } = data;
    if (!challenge.isUnlock) {
        return (React.createElement(HTML, { style: { width: '1000px' } },
            React.createElement(DarkContainer, null,
                React.createElement(UserHeader, { name: base.name, uid: uid, avatarUrl: data.headUrl, decoText: 'CHALLENGE' }),
                React.createElement(Section, { title: `${icon} ${title}` },
                    React.createElement("div", { style: { fontSize: '18px', color: C.gold, textAlign: 'center', padding: '20px' } },
                        title,
                        "\u5C1A\u672A\u89E3\u9501")))));
    }
    const difficulties = challenge.difficultyList ?? [];
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement(DarkContainer, null,
            React.createElement(UserHeader, { name: base.name, uid: uid, level: base.level, worldLevel: base.worldLevel, avatarUrl: data.headUrl, decoText: 'CHALLENGE MODE' }),
            difficulties.map((diff, di) => (React.createElement(Section, { key: di, title: `${icon} ${diff.difficultyName}` },
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' } }, (diff.towerAreaList ?? []).map((area, ai) => (React.createElement("div", { key: ai, style: {
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '10px',
                        padding: '14px 16px',
                        borderLeft: `2px solid ${area.star >= area.maxStar ? C.gold : 'rgba(255,255,255,0.15)'}`
                    } },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                        React.createElement("span", { style: { fontSize: '18px', fontWeight: 'bold', color: '#fff' } }, area.areaName),
                        React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', gap: '4px' } },
                            React.createElement("span", { style: { fontSize: '28px', fontWeight: 'bold', color: C.gold, lineHeight: 1 } }, area.star),
                            React.createElement("span", { style: { fontSize: '18px', color: C.textDim } },
                                "/",
                                area.maxStar))),
                    (area.floorList ?? []).map((floor, fi) => (React.createElement("div", { key: fi, style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 0',
                            borderTop: fi > 0 ? `1px solid ${C.panelBorder}` : 'none'
                        } },
                        React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
                            React.createElement("span", { style: { fontSize: '15px', color: C.textSecondary } },
                                "\u7B2C",
                                floor.floor,
                                "\u5C42"),
                            React.createElement("span", { style: { fontSize: '15px', color: C.gold } }, '★'.repeat(floor.star))),
                        floor.roleList && floor.roleList.length > 0 && (React.createElement("div", { style: { display: 'flex', gap: '6px' } }, floor.roleList.map((role, ri) => (React.createElement("div", { key: ri, style: {
                                width: '40px',
                                height: '40px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                border: `2px solid ${C.gold}`
                            } }, role.iconUrl ? (React.createElement("img", { src: role.iconUrl, style: { width: '100%', height: '100%', display: 'block', objectFit: 'cover' } })) : (React.createElement("div", { style: {
                                width: '100%',
                                height: '100%',
                                background: C.bg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '14px',
                                color: C.gold
                            } }, "?"))))))))))))))))),
            React.createElement(Footer, null))));
}

export { ChallengeCard as default };
