import React from 'react';
import HTML from './HTML.js';

/* ═══ 背景 & 纹理素材 ═══ */
import IMG_BANNER from '@src/assets/img/help/texture2d/banner_bg.jpg';
import IMG_BG from '@src/assets/img/help/texture2d/bg.jpg';
import IMG_CAG from '@src/assets/img/help/texture2d/cag_bg.png';
import IMG_ITEM from '@src/assets/img/help/texture2d/item.png';

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
      { icon: ICON_ROLEINFO, name: '角色面板', desc: '查询角色装备面板', eg: '#mc查询', needCk: true },
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

const COLUMNS = 4;
const ITEM_W = 240;
const ITEM_H = 100;
const ITEM_GAP = 10;
const CONTENT_PAD = 24;
const TOTAL_W = COLUMNS * ITEM_W + (COLUMNS - 1) * ITEM_GAP + CONTENT_PAD * 2;

export default function WuwaHelp() {
  return (
    <HTML style={{ width: `${TOTAL_W}px` }}>
      <div
        style={{
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          fontSize: '16px',
          color: '#ffffff',
          backgroundImage: `url(${IMG_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        {/* ═══ Banner ═══ */}
        <div
          style={{
            width: '100%',
            height: '260px',
            backgroundImage: `url(${IMG_BANNER})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '20px 24px'
          }}
        >
          {/* 渐变遮罩 */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '120px',
              background: 'linear-gradient(transparent, rgba(13,27,36,0.95))',
              pointerEvents: 'none'
            }}
          />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                fontSize: '34px',
                fontWeight: 'bold',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                letterSpacing: '2px'
              }}
            >
              鸣潮助手
            </div>
            <div
              style={{
                fontSize: '16px',
                opacity: 0.8,
                marginTop: '6px',
                textShadow: '0 1px 4px rgba(0,0,0,0.7)'
              }}
            >
              漂泊者，欢迎在这个时代醒来。
            </div>
          </div>
        </div>

        {/* ═══ 内容区域 ═══ */}
        <div style={{ padding: `16px ${CONTENT_PAD}px 20px` }}>
          {HELP_DATA.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: '16px' }}>
              {/* — 分类标题栏 — */}
              <div
                style={{
                  height: '44px',
                  backgroundImage: `url(${IMG_CAG})`,
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '32px',
                  marginBottom: '10px',
                  position: 'relative'
                }}
              >
                {/* 红色方块装饰 */}
                <div
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '14px',
                    height: '14px',
                    background: '#d32f2f',
                    borderRadius: '2px'
                  }}
                />
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#ffffff'
                  }}
                >
                  {cat.title}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    marginLeft: '12px'
                  }}
                >
                  {cat.desc}
                </span>
              </div>

              {/* — 指令网格 — */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: `${ITEM_GAP}px`
                }}
              >
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: `${ITEM_W}px`,
                      height: `${ITEM_H}px`,
                      backgroundImage: `url(${IMG_ITEM})`,
                      backgroundSize: '100% 100%',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 12px',
                      boxSizing: 'border-box',
                      position: 'relative'
                    }}
                  >
                    {/* 图标 */}
                    <img
                      src={item.icon}
                      style={{
                        width: '60px',
                        height: '60px',
                        display: 'block',
                        objectFit: 'contain',
                        flexShrink: 0
                      }}
                    />
                    {/* 文字 */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        flex: 1
                      }}
                    >
                      <div
                        style={{
                          fontSize: '20px',
                          fontWeight: 'bold',
                          color: '#ffffff',
                          lineHeight: '1.3',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.name}
                      </div>
                      <div
                        style={{
                          fontSize: '18px',
                          color: 'rgba(255,255,255,0.55)',
                          lineHeight: '1.3',
                          marginTop: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.eg}
                      </div>
                    </div>
                    {/* CK 标记 */}
                    {item.needCk && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '6px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#4fc3f7'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* ═══ 底部说明 ═══ */}
          <div
            style={{
              marginTop: '8px',
              padding: '10px 16px',
              background: 'rgba(0,0,0,0.35)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>蓝色圆点 = 需要登录 · 指令前缀 # ! / ！＃</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>Powered by alemonjs</span>
          </div>
        </div>
      </div>
    </HTML>
  );
}
