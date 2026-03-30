import React from 'react';
import HTML from './HTML.js';
import fileUrl$8 from '../../assets/img/help/icons/体力.png.js';
import fileUrl$s from '../../assets/img/help/icons/兑换码.png.js';
import fileUrl$e from '../../assets/img/help/icons/全息战略.png.js';
import fileUrl$r from '../../assets/img/help/icons/公告.png.js';
import fileUrl$f from '../../assets/img/help/icons/冥歌海墟.png.js';
import fileUrl$5 from '../../assets/img/help/icons/切换.png.js';
import fileUrl$6 from '../../assets/img/help/icons/删除.png.js';
import fileUrl$2 from '../../assets/img/help/icons/删除token.png.js';
import fileUrl$u from '../../assets/img/help/icons/卡池.png.js';
import fileUrl$9 from '../../assets/img/help/icons/基本信息卡片.png.js';
import fileUrl$k from '../../assets/img/help/icons/声骸介绍.png.js';
import fileUrl$i from '../../assets/img/help/icons/库洛币.png.js';
import fileUrl$v from '../../assets/img/help/icons/打牌.png.js';
import fileUrl$l from '../../assets/img/help/icons/抽卡记录.png.js';
import fileUrl$w from '../../assets/img/help/icons/攻略.png.js';
import fileUrl$t from '../../assets/img/help/icons/日历.png.js';
import fileUrl$m from '../../assets/img/help/icons/星声.png.js';
import fileUrl$7 from '../../assets/img/help/icons/查看或刷新特征码列表.png.js';
import fileUrl$j from '../../assets/img/help/icons/查询声骸列表.png.js';
import fileUrl$b from '../../assets/img/help/icons/查询探索度.png.js';
import fileUrl$a from '../../assets/img/help/icons/查询角色面板.png.js';
import fileUrl$d from '../../assets/img/help/icons/深塔.png.js';
import fileUrl$1 from '../../assets/img/help/icons/添加token.png.js';
import fileUrl from '../../assets/img/help/icons/登录.png.js';
import fileUrl$g from '../../assets/img/help/icons/矩阵.png.js';
import fileUrl$p from '../../assets/img/help/icons/签到.png.js';
import fileUrl$q from '../../assets/img/help/icons/签到日历.png.js';
import fileUrl$h from '../../assets/img/help/icons/练度.png.js';
import fileUrl$n from '../../assets/img/help/icons/练度排行.png.js';
import fileUrl$4 from '../../assets/img/help/icons/绑定.png.js';
import fileUrl$3 from '../../assets/img/help/icons/获取绑定的token.png.js';
import fileUrl$o from '../../assets/img/help/icons/角色.png.js';
import fileUrl$x from '../../assets/img/help/icons/通用.png.js';
import fileUrl$c from '../../assets/img/help/icons/面板更新.png.js';

const HELP_DATA = [
    {
        title: '库街区登录',
        desc: '登录后可使用更多功能',
        items: [
            { icon: fileUrl, name: '登录', desc: '手机号验证码登录', eg: '#mc登录' },
            { icon: fileUrl$1, name: '添加Token', desc: '手动绑定库街区Token', eg: '#mc添加token xxx' },
            { icon: fileUrl$2, name: '删除Token', desc: '删除指定UID的Token', eg: '#mc删除token' },
            { icon: fileUrl$3, name: '获取Token', desc: '查看已绑定的Token', eg: '#mc获取token', needCk: true }
        ]
    },
    {
        title: '绑定账号',
        desc: '在执行查询之前请先绑定',
        items: [
            { icon: fileUrl$4, name: '绑定特征码', desc: '绑定游戏UID', eg: '#mc绑定123456' },
            { icon: fileUrl$5, name: '切换特征码', desc: '切换当前使用的账户', eg: '#mc切换123456' },
            { icon: fileUrl$6, name: '删除特征码', desc: '删除已绑定的UID', eg: '#mc删除123456' },
            { icon: fileUrl$7, name: '查看特征码列表', desc: '查看已绑定的特征码', eg: '#mc查看' }
        ]
    },
    {
        title: '信息查询',
        desc: '查询游戏数据信息',
        items: [
            { icon: fileUrl$8, name: '体力', desc: '查询当前体力状态', eg: '#mc每日', needCk: true },
            { icon: fileUrl$9, name: '基本信息卡片', desc: '查询账号基本信息', eg: '#mc卡片', needCk: true },
            { icon: fileUrl$a, name: '角色面板', desc: '查询角色装备面板', eg: '#mc查询 角色名', needCk: true },
            { icon: fileUrl$b, name: '探索度', desc: '查询地图探索进度', eg: '#mc探索度', needCk: true },
            { icon: fileUrl$c, name: '刷新面板', desc: '刷新角色面板数据', eg: '#mc刷新面板', needCk: true }
        ]
    },
    {
        title: '深塔查询',
        desc: '挑战模式数据查询',
        items: [
            { icon: fileUrl$d, name: '逆境深塔', desc: '查询深塔通关记录', eg: '#mc深塔', needCk: true },
            { icon: fileUrl$e, name: '全息战略', desc: '查询全息战略记录', eg: '#mc全息战略', needCk: true },
            { icon: fileUrl$f, name: '冥歌海墟', desc: '查询冥歌海墟记录', eg: '#mc冥海', needCk: true },
            { icon: fileUrl$g, name: '终焉矩阵', desc: '查询终焉矩阵记录', eg: '#mc矩阵', needCk: true }
        ]
    },
    {
        title: '数据统计',
        desc: '角色与资源数据',
        items: [
            { icon: fileUrl$h, name: '练度统计', desc: '查看角色练度列表', eg: '#mc练度', needCk: true },
            { icon: fileUrl$i, name: '库洛币', desc: '查询库洛币余额', eg: '#mc库洛币', needCk: true },
            { icon: fileUrl$j, name: '声骸列表', desc: '查询声骸数据', eg: '#mc声骸列表', needCk: true },
            { icon: fileUrl$k, name: '数据坞', desc: '查看声骸数据坞', eg: '#mc数据坞', needCk: true },
            { icon: fileUrl$l, name: '抽卡记录', desc: '查询抽卡历史记录', eg: '#mc抽卡记录', needCk: true },
            { icon: fileUrl$m, name: '星声统计', desc: '查看资源收支统计', eg: '#mc星声', needCk: true },
            { icon: fileUrl$n, name: '练度排行', desc: '查看群练度排行', eg: '#mc练度排行', needCk: true },
            { icon: fileUrl$o, name: '角色培养', desc: '角色养成材料计算', eg: '#mc养成', needCk: true }
        ]
    },
    {
        title: '社区功能',
        desc: '签到与活动',
        items: [
            { icon: fileUrl$p, name: '签到', desc: '库街区每日签到', eg: '#mc签到', needCk: true },
            { icon: fileUrl$q, name: '签到日历', desc: '查看签到奖励日历', eg: '#mc签到日历', needCk: true },
            { icon: fileUrl$r, name: '公告', desc: '查看游戏公告', eg: '#mc公告' },
            { icon: fileUrl$s, name: '兑换码', desc: '查看可用兑换码', eg: '#mc兑换码' },
            { icon: fileUrl$t, name: '日历', desc: '查看活动日历', eg: '#mc日历' },
            { icon: fileUrl$u, name: '卡池', desc: '查看当前卡池信息', eg: '#mc卡池' },
            { icon: fileUrl$v, name: '激斗牌局', desc: '查看激斗活动数据', eg: '#mc牌局', needCk: true },
            { icon: fileUrl$w, name: 'Wiki攻略', desc: '角色技能/共鸣链/攻略', eg: '#mc安可攻略' },
            { icon: fileUrl$x, name: '帮助', desc: '查看帮助列表', eg: '#mc帮助' }
        ]
    }
];
const COLUMNS = 5;
const ITEM_W = 136;
const ITEM_H = 140;
const ITEM_GAP = 12;
const CONTENT_PAD = 32;
const TOTAL_W = COLUMNS * ITEM_W + (COLUMNS - 1) * ITEM_GAP + CONTENT_PAD * 2;
function WuwaHelp() {
    return (React.createElement(HTML, { style: { width: `${TOTAL_W}px` } },
        React.createElement("div", { className: 'relative flex justify-center p-6 bg-[#f6f6f6]', style: { fontFamily: '"tttgbnumber", system-ui, sans-serif' } },
            React.createElement("div", { className: 'relative w-full overflow-hidden bg-white border-2 border-[#eae5d9] rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.05)]' },
                React.createElement("div", { className: 'flex flex-col items-start px-8 pt-6 pb-2' },
                    React.createElement("div", { className: 'text-[32px] font-bold tracking-[2px] text-[#3d3833]' }, "\u9E23\u6F6E\u52A9\u624B"),
                    React.createElement("div", { className: 'mt-1 text-sm tracking-[4px] text-[#a09d98]' }, "WUTHERING WAVES ASSISTANT")),
                React.createElement("div", { className: 'px-8 pt-3 pb-6' },
                    HELP_DATA.map((cat, ci) => (React.createElement("div", { key: ci, className: 'mb-6' },
                        React.createElement("div", { className: 'relative flex flex-col mb-4' },
                            React.createElement("div", { className: 'flex items-center' },
                                React.createElement("div", { className: 'w-[5px] h-[22px] mr-3 rounded-[3px] bg-[#dcb858] shadow-[0_2px_4px_rgba(220,184,88,0.4)]' }),
                                React.createElement("span", { className: 'text-[22px] font-bold tracking-[1px] text-[#423c36]' }, cat.title)),
                            React.createElement("div", { className: 'mt-1.5 ml-[17px] font-sans text-[11px] tracking-[2px] text-[#b0a89d]' }, cat.desc),
                            React.createElement("div", { className: 'w-full h-px mt-2.5 bg-gradient-to-r from-[rgba(0,0,0,0.08)] to-[rgba(0,0,0,0.02)]' })),
                        React.createElement("div", { className: 'flex flex-wrap gap-3' }, cat.items.map((item, idx) => (React.createElement("div", { key: idx, className: 'relative flex flex-col items-center justify-start box-border pt-1', style: { width: `${ITEM_W}px`, height: `${ITEM_H}px` } },
                            React.createElement("img", { src: item.icon, className: 'block shrink-0 object-contain w-[76px] h-[76px] z-[2] drop-shadow-[0_6px_8px_rgba(0,0,0,0.08)]' }),
                            React.createElement("div", { className: 'relative flex items-center justify-center box-border min-w-[116px] px-3 py-1 -mt-2 bg-[#faf7f2] border-2 border-[#e1dcce] rounded-3xl z-[1] shadow-[inset_0_0_0_1px_#fff,0_4px_6px_rgba(0,0,0,0.02)]' },
                                React.createElement("div", { className: 'text-[15px] font-bold whitespace-nowrap text-[#5b534b]' }, item.name)),
                            React.createElement("div", { className: 'mt-1.5 text-xs text-center text-[#b0a89d]' }, item.eg),
                            item.needCk && (React.createElement("div", { className: 'absolute top-1 right-2 z-[3] px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#eebb4d] border border-[#dca73a] shadow-[0_2px_4px_rgba(238,187,77,0.4)] rounded-t-lg rounded-bl-lg rounded-br-sm' }, "NEW"))))))))),
                    React.createElement("div", { className: 'flex items-center justify-between px-5 py-3 mt-2 bg-[#faf7f2] border border-[#e1dcce] rounded-xl' },
                        React.createElement("span", { className: 'text-sm font-bold text-[#8a837b]' }, "NEW \u6807\u7B7E = \u53EF\u80FD\u9700\u8981\u767B\u5F55\u6216\u7ED1\u5B9A\u51ED\u8BC1 \u00B7 \u6240\u6709\u6307\u4EE4\u5747\u9700\u52A0\u524D\u7F00 (# / ! \u7B49)"),
                        React.createElement("span", { className: 'text-xs text-[#c2bcb2]' }, "Powered by alemonjs-kuro")))))));
}

export { WuwaHelp as default };
