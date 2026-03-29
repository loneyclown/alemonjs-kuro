import QRCode from 'qrcode';
import React from 'react';
import HTML from './HTML.js';

import IMG_BG from '@src/assets/img/help/texture2d/bg.jpg';

const LOGIN_URL = 'https://www.kurobbs.com/mc';

const STEPS = [
  {
    num: '1',
    title: '打开登录页',
    desc: '打开下方链接或扫描二维码',
    detail: LOGIN_URL
  },
  {
    num: '2',
    title: '获取验证码',
    desc: '在网页中输入手机号',
    detail: '点击获取验证码，等待短信'
  },
  {
    num: '3',
    title: '发送登录指令',
    desc: '在聊天中发送以下指令',
    detail: '#mc登录 手机号 验证码'
  }
];

interface Props {
  data: { qrDataUrl: string };
}

export default function LoginHelpCard({ data }: Props) {
  return (
    <HTML style={{ width: '480px' }}>
      <div
        style={{
          fontFamily: '"tttgbnumber", system-ui, sans-serif',
          color: '#ffffff',
          backgroundImage: `url(${IMG_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '24px'
        }}
      >
        {/* 标题 */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>鸣潮助手 · 登录指引</div>
          <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>请按照以下步骤完成登录</div>
        </div>

        {/* 步骤卡片 */}
        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '14px'
            }}
          >
            {/* 序号 */}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d32f2f, #ff5252)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 'bold',
                flexShrink: 0,
                marginTop: '2px'
              }}
            >
              {step.num}
            </div>
            {/* 内容 */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '22px', fontWeight: 'bold' }}>{step.title}</div>
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{step.desc}</div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#4fc3f7',
                  marginTop: '6px',
                  background: 'rgba(0,0,0,0.3)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  wordBreak: 'break-all'
                }}
              >
                {step.detail}
              </div>
            </div>
          </div>
        ))}

        {/* 二维码区域 */}
        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              background: '#ffffff',
              borderRadius: '8px',
              padding: '6px',
              flexShrink: 0
            }}
          >
            <img src={data.qrDataUrl} style={{ width: '108px', height: '108px', display: 'block' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>扫码打开登录页</div>
            <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', marginTop: '6px', lineHeight: '1.6' }}>
              使用手机浏览器扫描左侧二维码
              <br />
              即可打开库街区登录页面
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <div
          style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.35)'
          }}
        >
          指令前缀 # ! / ！＃ · Powered by alemonjs
        </div>
      </div>
    </HTML>
  );
}

/** 生成 QR code data URL */
export async function generateQrDataUrl(): Promise<string> {
  return await QRCode.toDataURL(LOGIN_URL, {
    width: 256,
    margin: 1,
    color: { dark: '#000000', light: '#ffffff' }
  });
}
