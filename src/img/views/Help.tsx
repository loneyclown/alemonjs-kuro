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

/** 鸣潮帮助分类 */
const WUWA_HELP: HelpCategory[] = [
  {
    title: '账号绑定',
    items: [
      { icon: '🔗', cmd: '#绑定特征码', desc: '绑定游戏特征码（UID）' },
      { icon: '🔄', cmd: '#切换特征码', desc: '切换当前激活的特征码' },
      { icon: '📋', cmd: '#查看特征码', desc: '查看已绑定的特征码列表' },
      { icon: '❌', cmd: '#解绑特征码', desc: '解除特征码绑定' }
    ]
  },
  {
    title: '登录认证',
    items: [
      { icon: '📱', cmd: '#登录', desc: '手机验证码登录库街区' },
      { icon: '🔑', cmd: '#添加token', desc: '手动添加Token' },
      { icon: '🗑️', cmd: '#删除token', desc: '删除已添加的Token' },
      { icon: '📄', cmd: '#获取token', desc: '查看当前Token状态' }
    ]
  },
  {
    title: '数据查询',
    items: [
      { icon: '⚡', cmd: '#体力 / #每日', desc: '查询结晶波片和活跃度' },
      { icon: '👤', cmd: '#查询 / #卡片', desc: '查看角色一览' },
      { icon: '🗺️', cmd: '#探索 / #探索度', desc: '查看各区域探索进度' },
      { icon: '🗼', cmd: '#深塔', desc: '查看逆境深塔通关情况' },
      { icon: '🔃', cmd: '#刷新面板', desc: '刷新缓存数据' }
    ]
  },
  {
    title: '社区功能',
    items: [
      { icon: '📅', cmd: '#签到', desc: '执行库街区每日签到' },
      { icon: '📆', cmd: '#签到日历', desc: '查看签到日历和奖励' }
    ]
  }
];

/** 组件 Props */
interface WuwaHelpProps {
  data?: Record<string, unknown>;
}

export default function WuwaHelp(_props: WuwaHelpProps) {
  return (
    <HTML>
      <div
        style={{
          padding: '24px',
          background: 'linear-gradient(180deg, #1a1b2e 0%, #252642 100%)',
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          fontSize: '16px',
          color: '#e0e4ff',
          minWidth: '680px'
        }}
      >
        {/* ═══ 标题卡 ═══ */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
            borderRadius: '12px',
            padding: '14px 20px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🎵</span>
            <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#e0e4ff' }}>鸣潮 · 指令帮助</span>
          </div>
          <span style={{ fontSize: '13px', color: '#8088bb' }}>Powered by alemonjs</span>
        </div>

        {/* ═══ 分类列表 ═══ */}
        {WUWA_HELP.map((cat, ci) => (
          <div
            key={ci}
            style={{
              background: '#2a2b45',
              borderRadius: '12px',
              marginBottom: '12px',
              overflow: 'hidden'
            }}
          >
            {/* — 分类标题栏 — */}
            <div
              style={{
                background: 'linear-gradient(90deg, #3a3d6b, #4a4d8b)',
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
                  background: '#6bdfff',
                  borderRadius: '2px'
                }}
              />
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#e0e4ff' }}>{cat.title}</span>
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
                    background: '#32334f',
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
                      background: 'linear-gradient(135deg, #3a3d6b, #5a5d9b)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '6px',
                      fontSize: '20px'
                    }}
                  >
                    {item.icon}
                  </div>
                  {/* 指令 */}
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 'bold',
                      color: '#e0e4ff',
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
                      color: '#8088bb',
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
            background: '#2a2b45',
            borderRadius: '12px',
            padding: '10px 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span style={{ fontSize: '12px', color: '#8088bb' }}>💡 指令前缀支持 # ! / ！＃</span>
          <span style={{ fontSize: '12px', color: '#5a5d8c' }}>鸣潮助手 v1.0</span>
        </div>
      </div>
    </HTML>
  );
}
