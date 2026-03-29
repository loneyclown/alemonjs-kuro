import React from 'react';
import HTML from './HTML.js';
import fileUrl$1 from '../../assets/img/help/texture2d/banner_bg.jpg.js';
import fileUrl from '../../assets/img/help/texture2d/bg.jpg.js';
import fileUrl$A from '../../assets/img/help/texture2d/cag_bg.png.js';
import fileUrl$B from '../../assets/img/help/texture2d/item.png.js';
import fileUrl$a from '../../assets/img/help/icons/体力.png.js';
import fileUrl$u from '../../assets/img/help/icons/兑换码.png.js';
import fileUrl$g from '../../assets/img/help/icons/全息战略.png.js';
import fileUrl$t from '../../assets/img/help/icons/公告.png.js';
import fileUrl$h from '../../assets/img/help/icons/冥歌海墟.png.js';
import fileUrl$7 from '../../assets/img/help/icons/切换.png.js';
import fileUrl$8 from '../../assets/img/help/icons/删除.png.js';
import fileUrl$4 from '../../assets/img/help/icons/删除token.png.js';
import fileUrl$w from '../../assets/img/help/icons/卡池.png.js';
import fileUrl$b from '../../assets/img/help/icons/基本信息卡片.png.js';
import fileUrl$m from '../../assets/img/help/icons/声骸介绍.png.js';
import fileUrl$k from '../../assets/img/help/icons/库洛币.png.js';
import fileUrl$x from '../../assets/img/help/icons/打牌.png.js';
import fileUrl$n from '../../assets/img/help/icons/抽卡记录.png.js';
import fileUrl$y from '../../assets/img/help/icons/攻略.png.js';
import fileUrl$v from '../../assets/img/help/icons/日历.png.js';
import fileUrl$o from '../../assets/img/help/icons/星声.png.js';
import fileUrl$9 from '../../assets/img/help/icons/查看或刷新特征码列表.png.js';
import fileUrl$l from '../../assets/img/help/icons/查询声骸列表.png.js';
import fileUrl$d from '../../assets/img/help/icons/查询探索度.png.js';
import fileUrl$c from '../../assets/img/help/icons/查询角色面板.png.js';
import fileUrl$f from '../../assets/img/help/icons/深塔.png.js';
import fileUrl$3 from '../../assets/img/help/icons/添加token.png.js';
import fileUrl$2 from '../../assets/img/help/icons/登录.png.js';
import fileUrl$i from '../../assets/img/help/icons/矩阵.png.js';
import fileUrl$r from '../../assets/img/help/icons/签到.png.js';
import fileUrl$s from '../../assets/img/help/icons/签到日历.png.js';
import fileUrl$j from '../../assets/img/help/icons/练度.png.js';
import fileUrl$p from '../../assets/img/help/icons/练度排行.png.js';
import fileUrl$6 from '../../assets/img/help/icons/绑定.png.js';
import fileUrl$5 from '../../assets/img/help/icons/获取绑定的token.png.js';
import fileUrl$q from '../../assets/img/help/icons/角色.png.js';
import fileUrl$z from '../../assets/img/help/icons/通用.png.js';
import fileUrl$e from '../../assets/img/help/icons/面板更新.png.js';

const HELP_DATA = [
    {
        title: '库街区登录',
        desc: '登录后可使用更多功能',
        items: [
            { icon: fileUrl$2, name: '登录', desc: '手机号验证码登录', eg: '#mc登录' },
            { icon: fileUrl$3, name: '添加Token', desc: '手动绑定库街区Token', eg: '#mc添加token xxx' },
            { icon: fileUrl$4, name: '删除Token', desc: '删除指定UID的Token', eg: '#mc删除token' },
            { icon: fileUrl$5, name: '获取Token', desc: '查看已绑定的Token', eg: '#mc获取token', needCk: true }
        ]
    },
    {
        title: '绑定账号',
        desc: '在执行查询之前请先绑定',
        items: [
            { icon: fileUrl$6, name: '绑定特征码', desc: '绑定游戏UID', eg: '#mc绑定123456' },
            { icon: fileUrl$7, name: '切换特征码', desc: '切换当前使用的账户', eg: '#mc切换123456' },
            { icon: fileUrl$8, name: '删除特征码', desc: '删除已绑定的UID', eg: '#mc删除123456' },
            { icon: fileUrl$9, name: '查看特征码列表', desc: '查看已绑定的特征码', eg: '#mc查看' }
        ]
    },
    {
        title: '信息查询',
        desc: '查询游戏数据信息',
        items: [
            { icon: fileUrl$a, name: '体力', desc: '查询当前体力状态', eg: '#mc每日', needCk: true },
            { icon: fileUrl$b, name: '基本信息卡片', desc: '查询账号基本信息', eg: '#mc卡片', needCk: true },
            { icon: fileUrl$c, name: '角色面板', desc: '查询角色装备面板', eg: '#mc查询', needCk: true },
            { icon: fileUrl$d, name: '探索度', desc: '查询地图探索进度', eg: '#mc探索度', needCk: true },
            { icon: fileUrl$e, name: '刷新面板', desc: '刷新角色面板数据', eg: '#mc刷新面板', needCk: true }
        ]
    },
    {
        title: '深塔查询',
        desc: '挑战模式数据查询',
        items: [
            { icon: fileUrl$f, name: '逆境深塔', desc: '查询深塔通关记录', eg: '#mc深塔', needCk: true },
            { icon: fileUrl$g, name: '全息战略', desc: '查询全息战略记录', eg: '#mc全息战略', needCk: true },
            { icon: fileUrl$h, name: '冥歌海墟', desc: '查询冥歌海墟记录', eg: '#mc冥海', needCk: true },
            { icon: fileUrl$i, name: '终焉矩阵', desc: '查询终焉矩阵记录', eg: '#mc矩阵', needCk: true }
        ]
    },
    {
        title: '数据统计',
        desc: '角色与资源数据',
        items: [
            { icon: fileUrl$j, name: '练度统计', desc: '查看角色练度列表', eg: '#mc练度', needCk: true },
            { icon: fileUrl$k, name: '库洛币', desc: '查询库洛币余额', eg: '#mc库洛币', needCk: true },
            { icon: fileUrl$l, name: '声骸列表', desc: '查询声骸数据', eg: '#mc声骸列表', needCk: true },
            { icon: fileUrl$m, name: '数据坞', desc: '查看声骸数据坞', eg: '#mc数据坞', needCk: true },
            { icon: fileUrl$n, name: '抽卡记录', desc: '查询抽卡历史记录', eg: '#mc抽卡记录', needCk: true },
            { icon: fileUrl$o, name: '星声统计', desc: '查看资源收支统计', eg: '#mc星声', needCk: true },
            { icon: fileUrl$p, name: '练度排行', desc: '查看群练度排行', eg: '#mc练度排行', needCk: true },
            { icon: fileUrl$q, name: '角色培养', desc: '角色养成材料计算', eg: '#mc养成', needCk: true }
        ]
    },
    {
        title: '社区功能',
        desc: '签到与活动',
        items: [
            { icon: fileUrl$r, name: '签到', desc: '库街区每日签到', eg: '#mc签到', needCk: true },
            { icon: fileUrl$s, name: '签到日历', desc: '查看签到奖励日历', eg: '#mc签到日历', needCk: true },
            { icon: fileUrl$t, name: '公告', desc: '查看游戏公告', eg: '#mc公告' },
            { icon: fileUrl$u, name: '兑换码', desc: '查看可用兑换码', eg: '#mc兑换码' },
            { icon: fileUrl$v, name: '日历', desc: '查看活动日历', eg: '#mc日历' },
            { icon: fileUrl$w, name: '卡池', desc: '查看当前卡池信息', eg: '#mc卡池' },
            { icon: fileUrl$x, name: '激斗牌局', desc: '查看激斗活动数据', eg: '#mc牌局', needCk: true },
            { icon: fileUrl$y, name: 'Wiki攻略', desc: '角色技能/共鸣链/攻略', eg: '#mc安可攻略' },
            { icon: fileUrl$z, name: '帮助', desc: '查看帮助列表', eg: '#mc帮助' }
        ]
    }
];
const COLUMNS = 4;
const ITEM_W = 240;
const ITEM_H = 100;
const ITEM_GAP = 10;
const CONTENT_PAD = 24;
const TOTAL_W = COLUMNS * ITEM_W + (COLUMNS - 1) * ITEM_GAP + CONTENT_PAD * 2;
function WuwaHelp() {
    return (React.createElement(HTML, { style: { width: `${TOTAL_W}px` } },
        React.createElement("div", { style: {
                fontFamily: '"tttgbnumber", system-ui, sans-serif',
                fontSize: '16px',
                color: '#ffffff',
                backgroundImage: `url(${fileUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            } },
            React.createElement("div", { style: {
                    width: '100%',
                    height: '260px',
                    backgroundImage: `url(${fileUrl$1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 30%',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px 24px'
                } },
                React.createElement("div", { style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '120px',
                        background: 'linear-gradient(transparent, rgba(13,27,36,0.95))',
                        pointerEvents: 'none'
                    } }),
                React.createElement("div", { style: { position: 'relative', zIndex: 1 } },
                    React.createElement("div", { style: {
                            fontSize: '34px',
                            fontWeight: 'bold',
                            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                            letterSpacing: '2px'
                        } }, "\u9E23\u6F6E\u52A9\u624B"),
                    React.createElement("div", { style: {
                            fontSize: '16px',
                            opacity: 0.8,
                            marginTop: '6px',
                            textShadow: '0 1px 4px rgba(0,0,0,0.7)'
                        } }, "\u6F02\u6CCA\u8005\uFF0C\u6B22\u8FCE\u5728\u8FD9\u4E2A\u65F6\u4EE3\u9192\u6765\u3002"))),
            React.createElement("div", { style: { padding: `16px ${CONTENT_PAD}px 20px` } },
                HELP_DATA.map((cat, ci) => (React.createElement("div", { key: ci, style: { marginBottom: '16px' } },
                    React.createElement("div", { style: {
                            height: '44px',
                            backgroundImage: `url(${fileUrl$A})`,
                            backgroundSize: '100% 100%',
                            display: 'flex',
                            alignItems: 'center',
                            paddingLeft: '32px',
                            marginBottom: '10px',
                            position: 'relative'
                        } },
                        React.createElement("div", { style: {
                                position: 'absolute',
                                left: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '14px',
                                height: '14px',
                                background: '#d32f2f',
                                borderRadius: '2px'
                            } }),
                        React.createElement("span", { style: {
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#ffffff'
                            } }, cat.title),
                        React.createElement("span", { style: {
                                fontSize: '14px',
                                color: 'rgba(255,255,255,0.5)',
                                marginLeft: '12px'
                            } }, cat.desc)),
                    React.createElement("div", { style: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: `${ITEM_GAP}px`
                        } }, cat.items.map((item, idx) => (React.createElement("div", { key: idx, style: {
                            width: `${ITEM_W}px`,
                            height: `${ITEM_H}px`,
                            backgroundImage: `url(${fileUrl$B})`,
                            backgroundSize: '100% 100%',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px 12px',
                            boxSizing: 'border-box',
                            position: 'relative'
                        } },
                        React.createElement("img", { src: item.icon, style: {
                                width: '60px',
                                height: '60px',
                                objectFit: 'contain',
                                flexShrink: 0,
                                marginRight: '10px'
                            } }),
                        React.createElement("div", { style: {
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                flex: 1
                            } },
                            React.createElement("div", { style: {
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    lineHeight: '1.3',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                } }, item.name),
                            React.createElement("div", { style: {
                                    fontSize: '13px',
                                    color: 'rgba(255,255,255,0.55)',
                                    lineHeight: '1.3',
                                    marginTop: '2px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                } }, item.eg)),
                        item.needCk && (React.createElement("div", { style: {
                                position: 'absolute',
                                top: '4px',
                                right: '6px',
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#4fc3f7'
                            } }))))))))),
                React.createElement("div", { style: {
                        marginTop: '8px',
                        padding: '10px 16px',
                        background: 'rgba(0,0,0,0.35)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    } },
                    React.createElement("span", { style: { fontSize: '14px', color: 'rgba(255,255,255,0.5)' } }, "\u84DD\u8272\u5706\u70B9 = \u9700\u8981\u767B\u5F55 \u00B7 \u6307\u4EE4\u524D\u7F00 # ! / \uFF01\uFF03"),
                    React.createElement("span", { style: { fontSize: '14px', color: 'rgba(255,255,255,0.35)' } }, "Powered by alemonjs"))))));
}

export { WuwaHelp as default };
