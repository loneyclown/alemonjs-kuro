import QRCode from 'qrcode';
import React from 'react';
import HTML from './HTML.js';

interface Props {
  data: { qrDataUrl: string; loginUrl: string };
}

export default function LoginHelpCard({ data }: Props) {
  return (
    <HTML style={{ width: '520px', margin: 0, textAlign: 'left' }}>
      <main
        style={{
          padding: '30px',
          background: '#111d23',
          color: '#eef3f1',
          borderTop: '4px solid #e5c78b',
          fontFamily: '"Microsoft YaHei", system-ui, sans-serif'
        }}
      >
        <div style={{ color: '#e5c78b', fontSize: '12px', letterSpacing: '4px' }}>WUTHERING WAVES</div>
        <h1 style={{ margin: '14px 0 8px', fontSize: '30px' }}>登录鸣潮助手</h1>
        <p style={{ color: '#a8b6bc', fontSize: '16px', lineHeight: 1.8 }}>
          使用浏览器扫码，在专属页面完成验证。
          <br />
          登录结果会自动保存到你的聊天账号。
        </p>
        <div style={{ textAlign: 'center', padding: '22px 0' }}>
          <img
            alt='专属登录链接二维码'
            src={data.qrDataUrl}
            style={{ display: 'block', width: '220px', height: '220px', margin: '0 auto', padding: '10px', background: '#fff', borderRadius: '8px' }}
          />
          <div style={{ marginTop: '14px', color: '#e5c78b', fontSize: '15px' }}>3 分钟有效 · 仅供本人使用</div>
          <div style={{ marginTop: '8px', color: '#91a3aa', fontSize: '13px' }}>{new URL(data.loginUrl).host}</div>
        </div>
        <div style={{ borderTop: '1px solid #38505b', paddingTop: '18px', color: '#c0ccd0', fontSize: '16px', lineHeight: 2 }}>
          <div>01 输入手机号，完成滑块验证</div>
          <div>02 获取短信验证码，在页面提交登录</div>
          <div>
            03 返回聊天，发送 <strong style={{ color: '#e5c78b' }}>#mc体力</strong>
          </div>
        </div>
        <p style={{ color: '#91a3aa', fontSize: '13px', lineHeight: 1.8, marginBottom: 0 }}>
          手机需要能访问上方服务地址。也可在电脑打开消息中的链接。
          <br />
          链接失效时重新发送 #mc登录，请勿转发二维码。
        </p>
      </main>
    </HTML>
  );
}

export function generateQrDataUrl(loginUrl: string): Promise<string> {
  return QRCode.toDataURL(loginUrl, { width: 320, margin: 2, color: { dark: '#111d23', light: '#ffffff' } });
}
