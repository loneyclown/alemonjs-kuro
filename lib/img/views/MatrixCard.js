import fileUrl from '../../assets/img/stamina/lily-background.png.js';
import fileUrl$1 from '../../assets/img/help/icons/矩阵.png.js';
import React from 'react';
import HTML from './HTML.js';

const NAMES = { 1: '奇点扩张', 0: '稳态协议' };
const NUMBER = new Intl.NumberFormat('zh-CN');
const END_DATE = new Intl.DateTimeFormat('zh-CN', { timeZone: 'Asia/Shanghai', dateStyle: 'medium', timeStyle: 'short' });
const CSS = `
.matrix-sheet{position:relative;width:1000px;overflow:hidden;border-radius:24px;
background:#30364b;color:#293044;text-align:left;font-family:"Microsoft YaHei",sans-serif}
.matrix-sheet *{box-sizing:border-box}
.matrix-backdrop{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;opacity:.63}
.matrix-content{position:relative;padding:30px 28px 24px;background:linear-gradient(180deg,#21263833,#212638bd)}
.matrix-hero{display:flex;align-items:center;gap:20px;padding:8px 18px 25px;color:#f8ead2}
.matrix-hero img{width:76px;height:76px;object-fit:contain}
.matrix-brand{font-size:14px;letter-spacing:3px;color:#e0cba4}
.matrix-hero h1{margin:7px 0 0;font:48px "tttgbnumber","SimSun",serif;letter-spacing:4px}
.matrix-uid{margin-left:auto;align-self:flex-end;padding:7px 16px;border:1px solid #dfc994aa;border-radius:20px;background:#252b42cc;font-size:16px}
.matrix-season{display:flex;flex-wrap:wrap;gap:18px 32px;margin-bottom:16px;padding:12px 18px;
border:1px solid #d9bf8c;border-radius:12px;background:#282f45dc;color:#f1e3c7;font-size:16px}
.matrix-modes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.matrix-modes.single{grid-template-columns:1fr}
.matrix-mode{min-width:0;padding:21px;border:1px solid #e0cda4;border-radius:18px;outline:1px solid #ffffff99;
outline-offset:-5px;background:linear-gradient(135deg,#faf8f1,#dfe2ee);box-shadow:0 7px 22px #12182850}
.matrix-mode h2{margin:0 0 14px;padding-bottom:11px;border-bottom:1px solid #aeb2c288;font:27px "tttgbnumber","SimSun",serif;letter-spacing:2px}
.matrix-mode h2 span{margin-right:8px;color:#9b722d}
.matrix-metrics{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.matrix-metrics small{display:block;color:#555e74;font-size:14px}
.matrix-metrics strong{display:block;margin-top:4px;color:#835b20;font-size:34px;font-variant-numeric:tabular-nums;line-height:1.1}
.matrix-progress{text-align:right}
.matrix-progress b{display:block;margin-top:4px;font-size:22px}
.matrix-track{height:8px;margin-top:12px;border-radius:6px;background:#c0c4d5;overflow:hidden}
.matrix-track span{display:block;height:100%;background:linear-gradient(90deg,#b08847,#f5d791)}
.matrix-empty{margin:0;font-size:16px;color:#555e74}
.matrix-teams{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:17px}
.matrix-team{padding:13px 14px;border:1px solid #b9bfd1;border-radius:11px;background:#f8f9fd8c}
.matrix-team-head{display:flex;gap:8px;justify-content:space-between;align-items:baseline;font-size:16px;font-weight:700}
.matrix-team-head b{color:#835b20;font-size:20px}
.matrix-roles{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 0}
.matrix-role{width:52px;height:52px;border:1px solid #bea674;border-radius:9px;background:#394052;
color:#f4e5c9;display:grid;place-items:center;font-size:13px;overflow:hidden}
.matrix-role img{width:100%;height:100%;object-fit:cover}
.matrix-team-progress{margin:9px 0 0;color:#535e74;font-size:14px}
.matrix-buffs{display:flex;flex-wrap:wrap;gap:5px;margin:9px 0 0}
.matrix-buff{display:inline-flex;align-items:center;gap:4px;max-width:100%;padding:4px 7px;
border-radius:6px;background:#e2e3ee;color:#3b4255;font-size:13px;overflow-wrap:anywhere}
.matrix-buff img{width:22px;height:22px;object-fit:contain}
.matrix-footer{margin:16px 2px 0;color:#eee0c5;font-size:15px}
`;
const httpsImage = (url) => (url?.startsWith('https://') ? url : undefined);
const progressPercent = ({ passBoss, bossCount }) => {
    if (typeof passBoss !== 'number' || typeof bossCount !== 'number' || bossCount <= 0) {
        return undefined;
    }
    return Math.min(100, Math.max(0, (passBoss / bossCount) * 100));
};
function Team({ team, index }) {
    const roles = team.roleList ?? [];
    const icons = team.roleIcons ?? [];
    const roster = Array.from({ length: Math.max(roles.length, icons.length) }, (_, slot) => ({
        id: roles[slot]?.roleId,
        icon: httpsImage(roles[slot]?.iconUrl) ?? httpsImage(icons[slot])
    })).filter(role => Boolean(role.id) || Boolean(role.icon));
    return (React.createElement("div", { className: 'matrix-team' },
        React.createElement("div", { className: 'matrix-team-head' },
            React.createElement("span", null,
                "\u961F\u4F0D ",
                index + 1,
                team.round ? ` · 第 ${team.round} 轮` : ''),
            typeof team.score === 'number' && React.createElement("b", null,
                NUMBER.format(team.score),
                " \u5206")),
        roster.length > 0 && (React.createElement("div", { className: 'matrix-roles' }, roster.map((role, slot) => (React.createElement("div", { className: 'matrix-role', key: slot }, role.icon ? React.createElement("img", { src: role.icon, alt: role.id ? `角色 ${role.id}` : '出战角色' }) : role.id))))),
        progressPercent(team) !== undefined && (React.createElement("p", { className: 'matrix-team-progress' },
            "\u9996\u9886\u51FB\u7834 ",
            team.passBoss,
            " / ",
            team.bossCount)),
        team.buffs?.some(buff => Boolean(buff?.buffName) || Boolean(httpsImage(buff?.buffIcon))) && (React.createElement("div", { className: 'matrix-buffs' }, team.buffs.map((buff, slot) => {
            const icon = httpsImage(buff?.buffIcon);
            return ((Boolean(icon) || Boolean(buff?.buffName)) && (React.createElement("span", { className: 'matrix-buff', key: slot },
                icon && React.createElement("img", { src: icon, alt: buff?.buffName ? '' : '队伍增益' }),
                buff?.buffName)));
        })))));
}
function Mode({ mode, detailed }) {
    const teams = (mode.teams ?? []).filter(team => team !== null);
    const progress = progressPercent(mode);
    const record = mode.hasRecord ?? (typeof mode.score === 'number' || teams.length > 0);
    return (React.createElement("section", { className: 'matrix-mode' },
        React.createElement("h2", null,
            React.createElement("span", { "aria-hidden": 'true' }, "\u25C6"),
            NAMES[mode.modeId] ?? `玩法 ${mode.modeId}`),
        mode.isUnlock === false || !record ? (React.createElement("p", { className: 'matrix-empty' }, mode.isUnlock === false ? '尚未解锁' : '本期暂无挑战记录')) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'matrix-metrics' },
                React.createElement("div", null,
                    React.createElement("small", null, "\u672C\u671F\u5F97\u5206"),
                    React.createElement("strong", null, typeof mode.score === 'number' ? NUMBER.format(mode.score) : '—')),
                progress !== undefined && (React.createElement("div", { className: 'matrix-progress' },
                    React.createElement("small", null, "\u9996\u9886\u51FB\u7834"),
                    React.createElement("b", null,
                        mode.passBoss,
                        " / ",
                        mode.bossCount)))),
            progress !== undefined && (React.createElement("div", { className: 'matrix-track', "aria-hidden": 'true' },
                React.createElement("span", { style: { width: `${progress}%` } }))),
            detailed &&
                (teams.length > 0 ? (React.createElement("div", { className: 'matrix-teams' }, teams.map((team, index) => (React.createElement(Team, { team: team, index: index, key: index }))))) : (React.createElement("p", { className: 'matrix-team-progress' }, "\u672C\u671F\u6682\u65E0\u961F\u4F0D\u8BE6\u60C5")))))));
}
function MatrixCard({ data }) {
    const { uid, matrix, modeId } = data;
    const modes = (matrix.modeDetails ?? []).filter((mode) => mode !== null && (modeId === undefined || mode.modeId === modeId));
    const timestamp = matrix.endTime ?? 0;
    const end = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
    const endTime = timestamp > 0 && Number.isFinite(end.getTime()) ? END_DATE.format(end) : undefined;
    const reward = typeof matrix.reward === 'number' && typeof matrix.totalReward === 'number' && matrix.totalReward > 0;
    const empty = matrix.isUnlock === false ? '终焉矩阵尚未解锁' : modes.length === 0 ? '库街区暂未返回当前玩法数据' : undefined;
    return (React.createElement(HTML, { style: { width: '1000px' } },
        React.createElement("style", null, CSS),
        React.createElement("main", { className: 'matrix-sheet' },
            React.createElement("img", { className: 'matrix-backdrop', src: fileUrl, alt: '' }),
            React.createElement("div", { className: 'matrix-content' },
                React.createElement("header", { className: 'matrix-hero' },
                    React.createElement("img", { src: fileUrl$1, alt: '' }),
                    React.createElement("div", null,
                        React.createElement("div", { className: 'matrix-brand' }, "\u9E23\u6F6E\u52A9\u624B"),
                        React.createElement("h1", null, "\u7EC8\u7109\u77E9\u9635")),
                    React.createElement("span", { className: 'matrix-uid' },
                        "UID ",
                        uid)),
                !empty && (Boolean(endTime) || reward) && (React.createElement("div", { className: 'matrix-season' },
                    endTime && React.createElement("span", null,
                        "\u8D5B\u5B63\u7ED3\u675F ",
                        endTime),
                    reward && (React.createElement("span", null,
                        "\u672C\u671F\u5956\u52B1\u5DF2\u9886\u53D6 ",
                        matrix.reward,
                        " / ",
                        matrix.totalReward)))),
                empty ? (React.createElement("section", { className: 'matrix-mode' },
                    React.createElement("p", { className: 'matrix-empty' }, empty))) : (React.createElement("div", { className: `matrix-modes${modes.length === 1 ? ' single' : ''}` }, modes.map(mode => (React.createElement(Mode, { key: mode.modeId, mode: mode, detailed: modeId !== undefined }))))),
                React.createElement("footer", { className: 'matrix-footer' }, modeId === undefined ? '队伍详情　#mc奇点扩张　·　#mc稳态协议' : '矩阵总览　#mc矩阵')))));
}

export { MatrixCard as default };
