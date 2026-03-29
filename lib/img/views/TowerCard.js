import React from 'react';
import HTML from './HTML.js';

function TowerCard({ data }) {
    const { uid, base, tower } = data;
    if (!tower.isUnlock) {
        return (React.createElement(HTML, { style: { minWidth: '420px' } },
            React.createElement("div", { style: {
                    padding: '24px',
                    background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)'
                } },
                React.createElement("div", { style: {
                        background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                        borderRadius: '12px',
                        padding: '16px 20px'
                    } },
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83D\uDDFC \u9006\u5883\u6DF1\u5854"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                        base.name,
                        " \u00B7 UID ",
                        uid),
                    React.createElement("div", { style: { fontSize: '14px', color: '#fbbf24', marginTop: '12px' } }, "\u26A0\uFE0F \u9006\u5883\u6DF1\u5854\u5C1A\u672A\u89E3\u9501")))));
    }
    const difficulties = tower.difficultyList || [];
    return (React.createElement(HTML, { style: { minWidth: '480px' } },
        React.createElement("div", { style: {
                padding: '24px',
                background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)'
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
                    React.createElement("div", { style: { fontSize: '20px', fontWeight: 'bold', color: '#e0e4ff' } }, "\uD83D\uDDFC \u9006\u5883\u6DF1\u5854"),
                    React.createElement("div", { style: { fontSize: '13px', color: '#a0a4cc', marginTop: '4px' } },
                        base.name,
                        " \u00B7 Lv.",
                        base.level,
                        " \u00B7 UID ",
                        uid))),
            React.createElement("div", { style: {
                    background: '#2a2b45',
                    borderRadius: '0 0 12px 12px',
                    padding: '16px'
                } }, difficulties.map((diff, di) => (React.createElement("div", { key: di, style: { marginBottom: di < difficulties.length - 1 ? '14px' : '0' } },
                React.createElement("div", { style: {
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#a78bfa',
                        marginBottom: '10px',
                        borderLeft: '3px solid #a78bfa',
                        paddingLeft: '10px'
                    } }, diff.difficultyName),
                diff.towerAreaList.map((area, ai) => (React.createElement("div", { key: ai, style: {
                        background: '#32334f',
                        borderRadius: '10px',
                        padding: '12px',
                        marginBottom: ai < diff.towerAreaList.length - 1 ? '8px' : '0'
                    } },
                    React.createElement("div", { style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '8px'
                        } },
                        React.createElement("span", { style: { fontSize: '14px', fontWeight: 'bold', color: '#e0e4ff' } }, area.areaName),
                        React.createElement("span", { style: { fontSize: '13px', color: '#fbbf24' } },
                            "\u2B50 ",
                            area.star,
                            "/",
                            area.maxStar)),
                    React.createElement("div", { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } }, area.floorList.map((floor, fi) => (React.createElement("div", { key: fi, style: {
                            background: '#282940',
                            borderRadius: '6px',
                            padding: '6px 10px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        } },
                        React.createElement("span", { style: { color: '#8088bb' } }, floor.floorName),
                        React.createElement("span", { style: { color: '#fbbf24' } },
                            '★'.repeat(floor.star),
                            '☆'.repeat(floor.maxStar - floor.star))))))))))))),
            React.createElement("div", { style: {
                    marginTop: '8px',
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#5a5d8c'
                } }, "Powered by alemonjs \u00B7 \u9E23\u6F6E\u52A9\u624B"))));
}

export { TowerCard as default };
