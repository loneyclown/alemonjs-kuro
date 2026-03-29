import { UI_ICONS } from '@src/assets/img/index.js';
import React from 'react';
import HTML from './HTML.js';

/** 指令条目 */
interface CmdItem {
  /** 图标 emoji */
  icon: string;
  /** 指令文本 */
  cmd: string;
  /** 简要说明 */
  desc: string;
}

/** 帮助分类 */
interface HelpCategory {
  title: string;
  items: CmdItem[];
}

/** 米游社帮助分类 — 参照 Miao-Yunzai help.yaml 布局 */
const MHY_HELP: HelpCategory[] = [
  {
    title: '账号绑定',
    items: [
      { icon: UI_ICONS.bind, cmd: '#绑定ck', desc: '绑定米游社Cookie（私聊发送）' },
      { icon: UI_ICONS.bind, cmd: '#绑定uid', desc: '手动绑定游戏UID' },
      { icon: UI_ICONS.record, cmd: '#我的uid', desc: '查看已绑定的UID列表' },
      { icon: UI_ICONS.record, cmd: '#我的ck', desc: '查看Cookie绑定状态' },
      { icon: UI_ICONS.record, cmd: '#删除ck / #删除uid', desc: '删除Cookie或解除UID绑定' },
      { icon: UI_ICONS.help, cmd: '#ck帮助', desc: 'Cookie获取教程' },
      { icon: UI_ICONS.checkin, cmd: '#检查ck', desc: '验证Cookie是否有效' },
      { icon: UI_ICONS.miyoushe, cmd: '#扫码登录', desc: '米游社扫码绑定Cookie+Stoken' },
      { icon: UI_ICONS.bind, cmd: '#绑定stoken', desc: '手动绑定Stoken（私聊发送）' },
      { icon: UI_ICONS.record, cmd: '#我的stoken', desc: '查看Stoken绑定状态' },
      { icon: UI_ICONS.record, cmd: '#删除stoken', desc: '删除已绑定的Stoken' }
    ]
  },
  {
    title: '原神查询指令',
    items: [
      { icon: UI_ICONS.role, cmd: '#角色', desc: '角色面板概览（等级/命座）' },
      { icon: UI_ICONS.stats, cmd: '#探索', desc: '宝箱·神瞳·世界探索度' },
      { icon: UI_ICONS.abyss, cmd: '#深渊 / #上期深渊', desc: '深境螺旋数据' },
      { icon: UI_ICONS.weapon, cmd: '#武器 / #五星武器', desc: '武器列表与装备情况' },
      { icon: UI_ICONS.resin, cmd: '#体力 / #树脂', desc: '实时树脂与每日委托' },
      { icon: UI_ICONS.primogem, cmd: '#原石 / #札记', desc: '原石收入月度统计' },
      { icon: UI_ICONS.team, cmd: '#剧诗', desc: '幻想真境剧诗阵容' },
      { icon: UI_ICONS.tcg, cmd: '#七圣召唤查询', desc: '七圣召唤牌组/卡牌查询' },
      { icon: UI_ICONS.sign, cmd: '#留影叙佳期 / #生日卡', desc: '领取生日角色卡片' }
    ]
  },
  {
    title: '星穹铁道',
    items: [
      { icon: UI_ICONS.role, cmd: '#星铁角色', desc: '角色面板与星魂等级' },
      { icon: UI_ICONS.resin, cmd: '#星铁体力', desc: '开拓力与委托状态' },
      { icon: UI_ICONS.abyss, cmd: '#星铁深渊', desc: '忘却之庭/虚构叙事' },
      { icon: UI_ICONS.primogem, cmd: '#星琼', desc: '星琼收入月度统计' }
    ]
  },
  {
    title: '绝区零',
    items: [
      { icon: UI_ICONS.role, cmd: '#绝区零角色', desc: '代理人面板数据' },
      { icon: UI_ICONS.resin, cmd: '#绝区零体力', desc: '电量与活跃度' },
      { icon: UI_ICONS.role, cmd: '#邦布', desc: '邦布收集列表' }
    ]
  },
  {
    title: '其他指令',
    items: [
      { icon: UI_ICONS.miyoushe, cmd: '#公告 / #资讯 / #活动', desc: '米游社官方资讯' },
      { icon: UI_ICONS.primogem, cmd: '#兑换码', desc: '查询直播兑换码' },
      { icon: UI_ICONS.primogem, cmd: '#兑换码使用 <CDK>', desc: '使用CDK兑换码' },
      { icon: UI_ICONS.sign, cmd: '#原神签到 / #签到', desc: '游戏每日签到' },
      { icon: UI_ICONS.sign, cmd: '#星铁签到', desc: '星穹铁道每日签到' },
      { icon: UI_ICONS.checkin, cmd: '#米游社签到', desc: '米游币社区签到' },
      { icon: UI_ICONS.ledger, cmd: '#充值记录', desc: '充值/消费记录统计' },
      { icon: UI_ICONS.help, cmd: '#米游社帮助', desc: '查看本帮助图' }
    ]
  }
];

/** 总页数（不分页，一页展示全部） */
export const MHY_TOTAL_PAGES = 1;

/** 组件 Props */
interface MihoyoHelpProps {
  data?: { page?: number; totalPages?: number };
}

export default function MihoyoHelp({ data: _data }: MihoyoHelpProps) {
  return (
    <HTML style={{ width: '780px' }}>
      <div
        style={{
          padding: '15px',
          background: '#f5f6fb',
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          fontSize: '16px',
          color: '#1e1f20'
        }}
      >
        {/* ═══ 标题卡 ═══ */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
            borderRadius: '12px',
            padding: '14px 20px',
            marginBottom: '12px',
            boxShadow: '0 5px 10px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src={UI_ICONS.paimon} style={{ width: '28px', height: '28px' }} />
            <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#4a3a20' }}>米游社 · 指令帮助</span>
          </div>
          <span style={{ fontSize: '13px', color: '#6b5838' }}>Powered by alemonjs</span>
        </div>

        {/* ═══ 分类列表 ═══ */}
        {MHY_HELP.map((cat, ci) => (
          <div
            key={ci}
            style={{
              background: '#fff',
              borderRadius: '12px',
              marginBottom: '12px',
              boxShadow: '0 5px 10px rgba(0,0,0,0.08)',
              overflow: 'hidden'
            }}
          >
            {/* — 分类标题栏 — */}
            <div
              style={{
                background: 'linear-gradient(90deg, #d3bc8e, #e8d5b0)',
                padding: '8px 15px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '18px',
                  background: '#8b6d3f',
                  borderRadius: '2px'
                }}
              />
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#4a3a20' }}>{cat.title}</span>
            </div>

            {/* — 指令条目 3×n 网格 — */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              {cat.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    width: 'calc(33.333% - 6px)',
                    background: '#f9f6f0',
                    borderRadius: '10px',
                    padding: '10px 8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  {/* 图标 */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #e8d5b0, #d3bc8e)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '6px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                      overflow: 'hidden'
                    }}
                  >
                    <img src={item.icon} style={{ width: '28px', height: '28px' }} />
                  </div>
                  {/* 指令 */}
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: '#1e1f20',
                      lineHeight: '1.3',
                      marginBottom: '2px',
                      wordBreak: 'break-all'
                    }}
                  >
                    {item.cmd}
                  </div>
                  {/* 说明 */}
                  <div
                    style={{
                      fontSize: '11px',
                      color: '#877254',
                      lineHeight: '1.3'
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* ═══ 底部 ═══ */}
        <div
          style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '10px 15px',
            boxShadow: '0 5px 10px rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '12px', color: '#877254' }}>💡 指令前缀支持 # ! / · 可加游戏名前缀</span>
          <span style={{ fontSize: '12px', color: '#b0a18a' }}>#ck帮助 查看绑定教程</span>
        </div>
      </div>
    </HTML>
  );
}
