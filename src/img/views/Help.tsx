import React from 'react';
import HTML from './HTML.js';

/* ═══ 背景 & 纹理素材 ═══ */
import IMG_BANNER from '@src/assets/img/help/texture2d/banner_bg.jpg';
import IMG_BG from '@src/assets/img/help/texture2d/bg.jpg';
import IMG_CAG from '@src/assets/img/help/texture2d/cag_bg.png';
import IMG_ITEM from '@src/assets/img/help/texture2d/item.png';

/* ═══ 指令图标 ═══ */
import ICON_STAMINA from '@src/assets/img/help/icons/体力.png';
import ICON_SWITCH from '@src/assets/img/help/icons/切换.png';
import ICON_DELETE from '@src/assets/img/help/icons/删除.png';
import ICON_DEL_TOKEN from '@src/assets/img/help/icons/删除token.png';
import ICON_CARD from '@src/assets/img/help/icons/基本信息卡片.png';
import ICON_VIEW from '@src/assets/img/help/icons/查看或刷新特征码列表.png';
import ICON_EXPLORE from '@src/assets/img/help/icons/查询探索度.png';
import ICON_ROLEINFO from '@src/assets/img/help/icons/查询角色面板.png';
import ICON_TOWER from '@src/assets/img/help/icons/深塔.png';
import ICON_ADD_TOKEN from '@src/assets/img/help/icons/添加token.png';
import ICON_LOGIN from '@src/assets/img/help/icons/登录.png';
import ICON_SIGN from '@src/assets/img/help/icons/签到.png';
import ICON_SIGN_CAL from '@src/assets/img/help/icons/签到日历.png';
import ICON_BIND from '@src/assets/img/help/icons/绑定.png';
import ICON_GET_TOKEN from '@src/assets/img/help/icons/获取绑定的token.png';
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
    title: '绑定账号',
    desc: '在执行查询之前请绑定账号',
    items: [
      { icon: ICON_BIND, name: '绑定特征码', desc: '绑定特征码', eg: '绑定123456' },
      { icon: ICON_SWITCH, name: '切换特征码', desc: '切换绑定的账户', eg: '切换123456', needCk: true },
      { icon: ICON_DELETE, name: '删除特征码', desc: '删除特征码', eg: '删除123456' },
      { icon: ICON_VIEW, name: '查看特征码列表', desc: '查看或刷新特征码列表', eg: '查看 or 刷新绑定' }
    ]
  },
  {
    title: '库街区登录',
    desc: '在执行查询之前请库街区登录',
    items: [
      { icon: ICON_LOGIN, name: '登录页登录', desc: '推荐登录方式', eg: '登录' },
      { icon: ICON_ADD_TOKEN, name: '添加token', desc: '绑定库街区token', eg: '添加token tk,did' },
      { icon: ICON_DEL_TOKEN, name: '删除token', desc: '删除当前库街区CK', eg: '删除token 123456' },
      { icon: ICON_GET_TOKEN, name: '获取绑定的token', desc: '获取绑定的token', eg: '获取token', needCk: true }
    ]
  },
  {
    title: '信息查询',
    desc: '在执行查询之前请绑定账号',
    items: [
      { icon: ICON_STAMINA, name: '体力', desc: '获取每日体力状态', eg: 'mr/每日', needCk: true },
      { icon: ICON_CARD, name: '基本信息卡片', desc: '查询基本信息', eg: '卡片', needCk: true },
      { icon: ICON_ROLEINFO, name: '查询角色面板', desc: '查询角色面板', eg: '查询', needCk: true },
      { icon: ICON_EXPLORE, name: '查询探索度', desc: '查询探索度', eg: '探索度', needCk: true },
      { icon: ICON_REFRESH, name: '刷新面板', desc: '刷新面板数据', eg: '刷新面板', needCk: true }
    ]
  },
  {
    title: '深塔查询',
    desc: '深塔数据查询',
    items: [{ icon: ICON_TOWER, name: '深塔', desc: '查询逆境深塔', eg: 'st/深塔', needCk: true }]
  },
  {
    title: '社区功能',
    desc: '签到与活动',
    items: [
      { icon: ICON_SIGN, name: '签到', desc: '执行库街区每日签到', eg: '签到', needCk: true },
      { icon: ICON_SIGN_CAL, name: '签到日历', desc: '查看签到日历和奖励', eg: '签到日历', needCk: true },
      { icon: ICON_GENERAL, name: '帮助', desc: '查看帮助列表', eg: '帮助' }
    ]
  }
];

const COLUMNS = 4;
const ITEM_W = 180;
const ITEM_H = 80;
const ITEM_GAP = 8;
const CONTENT_PAD = 20;
const TOTAL_W = COLUMNS * ITEM_W + (COLUMNS - 1) * ITEM_GAP + CONTENT_PAD * 2;

interface WuwaHelpProps {
  data?: Record<string, unknown>;
}

export default function WuwaHelp(_props: WuwaHelpProps) {
  return (
    <HTML>
      <div
        style={{
          width: `${TOTAL_W}px`,
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          fontSize: '14px',
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
            height: '220px',
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
                fontSize: '28px',
                fontWeight: 'bold',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                letterSpacing: '2px'
              }}
            >
              鸣潮助手
            </div>
            <div
              style={{
                fontSize: '14px',
                opacity: 0.8,
                marginTop: '4px',
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
                  height: '36px',
                  backgroundImage: `url(${IMG_CAG})`,
                  backgroundSize: '100% 100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '28px',
                  marginBottom: '8px',
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
                    width: '12px',
                    height: '12px',
                    background: '#d32f2f',
                    borderRadius: '2px'
                  }}
                />
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#ffffff'
                  }}
                >
                  {cat.title}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    marginLeft: '10px'
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
                      padding: '8px 10px',
                      boxSizing: 'border-box',
                      position: 'relative'
                    }}
                  >
                    {/* 图标 */}
                    <img
                      src={item.icon}
                      style={{
                        width: '48px',
                        height: '48px',
                        objectFit: 'contain',
                        flexShrink: 0,
                        marginRight: '8px'
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
                          fontSize: '13px',
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
                          fontSize: '11px',
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
                          width: '6px',
                          height: '6px',
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
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>蓝色圆点 = 需要登录 · 指令前缀 # ! / ！＃</span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>Powered by alemonjs</span>
          </div>
        </div>
      </div>
    </HTML>
  );
}
