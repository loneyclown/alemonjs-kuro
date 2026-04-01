import React from 'react';
import HTML from './HTML.js';

/* ═══ 指令图标 ═══ */
import ICON_STAMINA from '@src/assets/img/help/icons/体力.png';
import ICON_CODE from '@src/assets/img/help/icons/兑换码.png';
import ICON_CHALLENGE from '@src/assets/img/help/icons/全息战略.png';
import ICON_ANN from '@src/assets/img/help/icons/公告.png';
import ICON_SLASH from '@src/assets/img/help/icons/冥歌海墟.png';
import ICON_SWITCH from '@src/assets/img/help/icons/切换.png';
import ICON_DELETE from '@src/assets/img/help/icons/删除.png';
import ICON_DEL_TOKEN from '@src/assets/img/help/icons/删除token.png';
import ICON_POOL from '@src/assets/img/help/icons/卡池.png';
import ICON_CARD from '@src/assets/img/help/icons/基本信息卡片.png';
import ICON_CALABASH from '@src/assets/img/help/icons/声骸介绍.png';
import ICON_COIN from '@src/assets/img/help/icons/库洛币.png';
import ICON_POKER from '@src/assets/img/help/icons/打牌.png';
import ICON_GACHA from '@src/assets/img/help/icons/抽卡记录.png';
import ICON_WIKI from '@src/assets/img/help/icons/攻略.png';
import ICON_CALENDAR from '@src/assets/img/help/icons/日历.png';
import ICON_PERIOD from '@src/assets/img/help/icons/星声.png';
import ICON_VIEW from '@src/assets/img/help/icons/查看或刷新特征码列表.png';
import ICON_ECHO from '@src/assets/img/help/icons/查询声骸列表.png';
import ICON_EXPLORE from '@src/assets/img/help/icons/查询探索度.png';
import ICON_ROLEINFO from '@src/assets/img/help/icons/查询角色面板.png';
import ICON_TOWER from '@src/assets/img/help/icons/深塔.png';
import ICON_ADD_TOKEN from '@src/assets/img/help/icons/添加token.png';
import ICON_LOGIN from '@src/assets/img/help/icons/登录.png';
import ICON_MATRIX from '@src/assets/img/help/icons/矩阵.png';
import ICON_SIGN from '@src/assets/img/help/icons/签到.png';
import ICON_SIGN_CAL from '@src/assets/img/help/icons/签到日历.png';
import ICON_CHARLIST from '@src/assets/img/help/icons/练度.png';
import ICON_RANK from '@src/assets/img/help/icons/练度排行.png';
import ICON_BIND from '@src/assets/img/help/icons/绑定.png';
import ICON_GET_TOKEN from '@src/assets/img/help/icons/获取绑定的token.png';
import ICON_DEVELOP from '@src/assets/img/help/icons/角色.png';
import ICON_GENERAL from '@src/assets/img/help/icons/通用.png';
import ICON_REFRESH from '@src/assets/img/help/icons/面板更新.png';

/* ═══ 数据结构 ═══ */
interface CmdItem {
  icon: string;
  name: string;
  desc: string;
  eg: string;
  needCk?: boolean;
}

interface HelpCategory {
  title: string;
  desc: string;
  items: CmdItem[];
}

const HELP_DATA: HelpCategory[] = [
  {
    title: '库街区登录',
    desc: '登录后可使用更多功能',
    items: [
      { icon: ICON_LOGIN, name: '登录', desc: '手机号验证码登录', eg: '#mc登录' },
      { icon: ICON_ADD_TOKEN, name: '添加Token', desc: '手动绑定库街区Token', eg: '#mc添加token xxx' },
      { icon: ICON_DEL_TOKEN, name: '删除Token', desc: '删除指定UID的Token', eg: '#mc删除token' },
      { icon: ICON_GET_TOKEN, name: '获取Token', desc: '查看已绑定的Token', eg: '#mc获取token', needCk: true }
    ]
  },
  {
    title: '绑定账号',
    desc: '在执行查询之前请先绑定',
    items: [
      { icon: ICON_BIND, name: '绑定特征码', desc: '绑定游戏UID', eg: '#mc绑定123456' },
      { icon: ICON_SWITCH, name: '切换特征码', desc: '切换当前使用的账户', eg: '#mc切换123456' },
      { icon: ICON_DELETE, name: '删除特征码', desc: '删除已绑定的UID', eg: '#mc删除123456' },
      { icon: ICON_VIEW, name: '查看特征码列表', desc: '查看已绑定的特征码', eg: '#mc查看' }
    ]
  },
  {
    title: '信息查询',
    desc: '查询游戏数据信息',
    items: [
      { icon: ICON_STAMINA, name: '体力', desc: '查询当前体力状态', eg: '#mc每日', needCk: true },
      { icon: ICON_CARD, name: '基本信息卡片', desc: '查询账号基本信息', eg: '#mc卡片', needCk: true },
      { icon: ICON_ROLEINFO, name: '角色面板', desc: '查询角色装备面板', eg: '#mc查询 角色名', needCk: true },
      { icon: ICON_EXPLORE, name: '探索度', desc: '查询地图探索进度', eg: '#mc探索度', needCk: true },
      { icon: ICON_REFRESH, name: '刷新面板', desc: '刷新角色面板数据', eg: '#mc刷新面板', needCk: true }
    ]
  },
  {
    title: '深塔查询',
    desc: '挑战模式数据查询',
    items: [
      { icon: ICON_TOWER, name: '逆境深塔', desc: '查询深塔通关记录', eg: '#mc深塔', needCk: true },
      { icon: ICON_CHALLENGE, name: '全息战略', desc: '查询全息战略记录', eg: '#mc全息战略', needCk: true },
      { icon: ICON_SLASH, name: '冥歌海墟', desc: '查询冥歌海墟记录', eg: '#mc冥海', needCk: true },
      { icon: ICON_MATRIX, name: '终焉矩阵', desc: '查询终焉矩阵记录', eg: '#mc矩阵', needCk: true }
    ]
  },
  {
    title: '数据统计',
    desc: '角色与资源数据',
    items: [
      { icon: ICON_CHARLIST, name: '练度统计', desc: '查看角色练度列表', eg: '#mc练度', needCk: true },
      { icon: ICON_COIN, name: '库洛币', desc: '查询库洛币余额', eg: '#mc库洛币', needCk: true },
      { icon: ICON_ECHO, name: '声骸列表', desc: '查询声骸数据', eg: '#mc声骸列表', needCk: true },
      { icon: ICON_CALABASH, name: '数据坞', desc: '查看声骸数据坞', eg: '#mc数据坞', needCk: true },
      { icon: ICON_GACHA, name: '抽卡记录', desc: '查询抽卡历史记录', eg: '#mc抽卡记录', needCk: true },
      { icon: ICON_PERIOD, name: '星声统计', desc: '查看资源收支统计', eg: '#mc星声', needCk: true },
      { icon: ICON_RANK, name: '练度排行', desc: '查看群练度排行', eg: '#mc练度排行', needCk: true },
      { icon: ICON_DEVELOP, name: '角色培养', desc: '角色养成材料计算', eg: '#mc养成', needCk: true }
    ]
  },
  {
    title: '社区功能',
    desc: '签到与活动',
    items: [
      { icon: ICON_SIGN, name: '签到', desc: '库街区每日签到', eg: '#mc签到', needCk: true },
      { icon: ICON_SIGN_CAL, name: '签到日历', desc: '查看签到奖励日历', eg: '#mc签到日历', needCk: true },
      { icon: ICON_ANN, name: '公告', desc: '查看游戏公告', eg: '#mc公告' },
      { icon: ICON_CODE, name: '兑换码', desc: '查看可用兑换码', eg: '#mc兑换码' },
      { icon: ICON_CALENDAR, name: '日历', desc: '查看活动日历', eg: '#mc日历' },
      { icon: ICON_POOL, name: '卡池', desc: '查看当前卡池信息', eg: '#mc卡池' },
      { icon: ICON_POKER, name: '激斗牌局', desc: '查看激斗活动数据', eg: '#mc牌局', needCk: true },
      { icon: ICON_WIKI, name: 'Wiki攻略', desc: '角色技能/共鸣链/攻略', eg: '#mc安可攻略' },
      { icon: ICON_GENERAL, name: '帮助', desc: '查看帮助列表', eg: '#mc帮助' }
    ]
  }
];

const COLUMNS = 5;
const ITEM_W = 136;
const ITEM_H = 140;
const ITEM_GAP = 12;
const CONTENT_PAD = 32;
const TOTAL_W = COLUMNS * ITEM_W + (COLUMNS - 1) * ITEM_GAP + CONTENT_PAD * 2;

export default function WuwaHelp() {
  return (
    <HTML style={{ width: `${TOTAL_W}px` }}>
      <div className='relative flex justify-center p-6 bg-[#f6f6f6]' style={{ fontFamily: '"tttgbnumber", system-ui, sans-serif' }}>
        <div className='relative w-full overflow-hidden bg-white border-2 border-[#eae5d9] rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.05)]'>
          <div className='flex flex-col items-start px-8 pt-6 pb-2'>
            <div className='text-[32px] font-bold tracking-[2px] text-[#3d3833]'>鸣潮助手</div>
            <div className='mt-1 text-sm tracking-[4px] text-[#a09d98]'>WUTHERING WAVES ASSISTANT</div>
          </div>

          <div className='px-8 pt-3 pb-6'>
            {HELP_DATA.map((cat, ci) => (
              <div key={ci} className='mb-6'>
                <div className='relative flex flex-col mb-4'>
                  <div className='flex items-center'>
                    <div className='w-[5px] h-[22px] mr-3 rounded-[3px] bg-[#dcb858] shadow-[0_2px_4px_rgba(220,184,88,0.4)]' />
                    <span className='text-[22px] font-bold tracking-[1px] text-[#423c36]'>{cat.title}</span>
                  </div>
                  <div className='mt-1.5 ml-[17px] font-sans text-[11px] tracking-[2px] text-[#b0a89d]'>{cat.desc}</div>
                  <div className='w-full h-px mt-2.5 bg-gradient-to-r from-[rgba(0,0,0,0.08)] to-[rgba(0,0,0,0.02)]' />
                </div>

                <div className='flex flex-wrap gap-3'>
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className='relative flex flex-col items-center justify-start box-border pt-1'
                      style={{ width: `${ITEM_W}px`, height: `${ITEM_H}px` }}
                    >
                      <img src={item.icon} className='block shrink-0 object-contain w-[76px] h-[76px] z-[2] drop-shadow-[0_6px_8px_rgba(0,0,0,0.08)]' />

                      <div className='relative flex items-center justify-center box-border min-w-[116px] px-3 py-1 -mt-2 bg-[#faf7f2] border-2 border-[#e1dcce] rounded-3xl z-[1] shadow-[inset_0_0_0_1px_#fff,0_4px_6px_rgba(0,0,0,0.02)]'>
                        <div className='text-[15px] font-bold whitespace-nowrap text-[#5b534b]'>{item.name}</div>
                      </div>

                      <div className='mt-1.5 text-xs text-center text-[#b0a89d]'>{item.eg}</div>

                      {item.needCk && (
                        <div className='absolute top-1 right-2 z-[3] px-1.5 py-0.5 text-[10px] font-bold text-white bg-[#eebb4d] border border-[#dca73a] shadow-[0_2px_4px_rgba(238,187,77,0.4)] rounded-t-lg rounded-bl-lg rounded-br-sm'>
                          NEW
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className='flex items-center justify-between px-5 py-3 mt-2 bg-[#faf7f2] border border-[#e1dcce] rounded-xl'>
              <span className='text-sm font-bold text-[#8a837b]'>NEW 标签 = 可能需要登录或绑定凭证 · 所有指令均需加前缀 (# / ! 等)</span>
              <span className='text-xs text-[#c2bcb2]'>Powered by alemonjs-kuro</span>
            </div>
          </div>
        </div>
      </div>
    </HTML>
  );
}
