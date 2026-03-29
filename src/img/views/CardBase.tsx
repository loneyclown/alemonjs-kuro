import React from 'react';

/*
 * 共享样式常量 — 匹配 Python XutheringWavesUID 的视觉风格
 *
 * 暗色游戏风格卡片：1000px 宽, #0f1115 暗色背景, #d4b163 金色强调
 * 浅色卡片风格：420-750px 宽, #f4f7f9 浅色背景, 白色卡片
 */

export const C = {
  bg: '#0f1115',
  gold: '#d4b163',
  goldDim: 'rgba(212, 177, 99, 0.2)',
  goldBorder: 'rgba(212, 177, 99, 0.4)',
  panelBg: 'rgba(20, 22, 26, 0.6)',
  panelBorder: 'rgba(255, 255, 255, 0.08)',
  panelBorderTop: 'rgba(255, 255, 255, 0.2)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
  textDim: '#6d717a',
  star5: '#d4b163',
  star4: '#843fa1',
  chain: ['#666', '#4fc3f7', '#66bb6a', '#9c6cdb', '#e8a640', '#ff7043', '#ef5350']
} as const;

/** 暗色游戏风格容器 — 1000px */
export function DarkContainer({ children, width = 1000 }: { children: React.ReactNode; width?: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        backgroundColor: C.bg,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '30px',
        boxSizing: 'border-box',
        color: C.textPrimary,
        fontFamily: "'tttgbnumber', 'Source Han Sans CN', system-ui, sans-serif"
      }}
    >
      {children}
    </div>
  );
}

/** 用户信息头卡 — 匹配 Python 的 .user-card */
export function UserHeader({
  name,
  uid,
  level,
  worldLevel,
  avatarUrl,
  decoText = 'ROVER RESONANCE CARD'
}: {
  name: string;
  uid: string;
  level?: number;
  worldLevel?: number;
  avatarUrl?: string;
  decoText?: string;
}) {
  return (
    <div
      style={{
        background: `radial-gradient(circle at 100% 0%, rgba(212,177,99,0.15) 0%, transparent 40%),
                     linear-gradient(180deg, rgba(30,34,42,0.9) 0%, rgba(15,17,21,0.95) 100%)`,
        borderRadius: '0 0 16px 16px',
        padding: '25px 40px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        border: `1px solid ${C.panelBorder}`,
        borderTop: `1px solid ${C.panelBorderTop}`,
        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
      }}
    >
      {/* 装饰文字 */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          fontSize: '14px',
          letterSpacing: '4px',
          color: 'rgba(255,255,255,0.1)',
          fontWeight: 'bold'
        }}
      >
        {decoText}
      </div>

      {/* 头像圆环 */}
      <div
        style={{
          width: '100px',
          height: '100px',
          flexShrink: 0,
          marginRight: '30px',
          position: 'relative',
          borderRadius: '50%',
          border: '3px solid #2a2e35',
          backgroundColor: '#222',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '42px',
          fontWeight: 'bold',
          color: C.gold
        }}
      >
        {/* 金色外环 */}
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            left: '-8px',
            right: '-8px',
            bottom: '-8px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            borderLeft: `2px solid ${C.gold}`,
            transform: 'rotate(-45deg)',
            boxShadow: `-2px 2px 10px ${C.goldDim}`
          }}
        />
        {avatarUrl ? <img src={avatarUrl} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', display: 'block' }} /> : name[0]}
      </div>

      {/* 用户信息 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
        {/* 名字 + UID */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: '10px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '8px',
            position: 'relative'
          }}
        >
          {/* 金色底线 */}
          <div
            style={{
              position: 'absolute',
              bottom: '-1px',
              left: 0,
              width: '40px',
              height: '2px',
              background: C.gold,
              boxShadow: `0 0 8px ${C.gold}`
            }}
          />
          <div
            style={{
              fontSize: '42px',
              fontWeight: 800,
              color: '#fff',
              marginRight: '20px',
              textShadow: '0 4px 10px rgba(0,0,0,0.5)'
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: '20px',
              color: C.gold,
              background: 'rgba(0,0,0,0.4)',
              padding: '4px 12px',
              borderRadius: '6px',
              border: `1px solid ${C.goldDim}`,
              letterSpacing: '1.5px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            UID {uid}
          </div>
        </div>
        {/* 统计数据 */}
        {(level !== undefined || worldLevel !== undefined) && (
          <div style={{ display: 'flex', gap: '40px' }}>
            {level !== undefined && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '30px',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.1
                  }}
                >
                  {level}
                </div>
                <div style={{ fontSize: '12px', color: C.textDim, fontWeight: 'bold', letterSpacing: '1px', marginTop: '2px' }}>联觉等级</div>
              </div>
            )}
            {worldLevel !== undefined && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '30px',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.1
                  }}
                >
                  {worldLevel}
                </div>
                <div style={{ fontSize: '12px', color: C.textDim, fontWeight: 'bold', letterSpacing: '1px', marginTop: '2px' }}>索拉等级</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** 区块容器 — 匹配 Python 的 .section-container */
export function Section({ title, children, extra }: { title: string; children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: C.panelBg,
        borderRadius: '12px',
        border: `1px solid ${C.panelBorder}`,
        padding: '20px 25px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
      }}
    >
      {/* 区块头 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '15px'
        }}
      >
        <div
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '1.5px',
            marginRight: '20px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)'
          }}
        >
          {title}
        </div>
        <div
          style={{
            flex: 1,
            height: '2px',
            background: `linear-gradient(90deg, ${C.goldBorder}, transparent)`,
            boxShadow: '0 0 5px rgba(212,177,99,0.3)'
          }}
        />
        {extra && <div style={{ marginLeft: '15px', color: '#888', fontSize: '18px', fontWeight: 'bold' }}>{extra}</div>}
      </div>
      {children}
    </div>
  );
}

/** 浅色页面容器 — 匹配 Python 的 bbs_coin / ann_card 浅色风格 */
export function LightContainer({ children, width = 750 }: { children: React.ReactNode; width?: number }) {
  return (
    <div
      style={{
        width: `${width}px`,
        backgroundColor: '#f4f7f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'tttgbnumber', 'Noto Sans SC', system-ui, sans-serif",
        color: '#2c3e50'
      }}
    >
      {children}
    </div>
  );
}

/** 浅色风格暗色头部 — 匹配 Python 的 ann/coin 卡片头部 */
export function LightHeader({ title, subtitle, width }: { title: string; subtitle?: string; width?: string }) {
  return (
    <div
      style={{
        width: width ?? '100%',
        background: '#121212',
        padding: '20px 30px',
        boxSizing: 'border-box',
        borderBottom: '3px solid #3498db',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <div
        style={{
          fontSize: '28px',
          fontWeight: 900,
          color: '#ffffff',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          letterSpacing: '1px',
          zIndex: 1
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            zIndex: 1
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

/** 页脚 */
export function Footer() {
  return (
    <div
      style={{
        textAlign: 'center',
        fontSize: '14px',
        color: 'rgba(255,255,255,0.3)',
        padding: '10px 0 0'
      }}
    >
      Powered by AlemonJS · 鸣潮助手
    </div>
  );
}
