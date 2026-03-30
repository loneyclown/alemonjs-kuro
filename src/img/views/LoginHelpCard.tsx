import QRCode from 'qrcode';
import React from 'react';
import HTML from './HTML.js';

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
    <HTML style={{ width: '520px' }}>
      <div className='relative flex justify-center p-6 bg-[#f6f6f6]' style={{ fontFamily: '"tttgbnumber", system-ui, sans-serif' }}>
        <div className='relative w-full overflow-hidden bg-white border-2 border-[#eae5d9] rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.05)]'>
          {/* 标题 */}
          <div className='flex flex-col items-start px-8 pt-6 pb-2'>
            <div className='text-[32px] font-bold tracking-[2px] text-[#3d3833]'>鸣潮助手 · 登录指引</div>
            <div className='mt-1 text-sm tracking-[4px] text-[#a09d98]'>请按照以下步骤完成登录</div>
          </div>

          <div className='px-8 pt-3 pb-6'>
            {/* 步骤卡片 */}
            <div className='flex flex-col gap-4 mb-6'>
              {STEPS.map((step, i) => (
                <div key={i} className='flex items-start gap-4 p-4 bg-[#faf7f2] border border-[#e1dcce] rounded-2xl'>
                  {/* 序号 */}
                  <div className='flex items-center justify-center shrink-0 w-8 h-8 mt-0.5 text-[20px] font-bold text-white bg-[#eebb4d] rounded-full shadow-[0_2px_4px_rgba(238,187,77,0.4)]'>
                    {step.num}
                  </div>
                  {/* 内容 */}
                  <div className='flex flex-col w-full'>
                    <div className='text-[20px] font-bold text-[#423c36]'>{step.title}</div>
                    <div className='mt-1 text-[15px] text-[#b0a89d]'>{step.desc}</div>
                    <div className='mt-2 px-3 py-1.5 text-[15px] font-bold text-[#5b534b] bg-white border border-[#eae5d9] rounded-lg break-all'>
                      {step.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 二维码区域 */}
            <div className='flex items-center gap-5 p-4 bg-[#faf7f2] border border-[#e1dcce] rounded-2xl'>
              <div className='shrink-0 p-1.5 bg-white border border-[#eae5d9] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)]'>
                <img src={data.qrDataUrl} className='block w-[100px] h-[100px]' />
              </div>
              <div className='flex flex-col'>
                <div className='flex items-center'>
                  <div className='w-[4px] h-[18px] mr-2.5 rounded-[2px] bg-[#dcb858] shadow-[0_2px_4px_rgba(220,184,88,0.4)]' />
                  <span className='text-[20px] font-bold tracking-[1px] text-[#423c36]'>扫码打开登录页</span>
                </div>
                <div className='mt-2.5 text-[15px] leading-relaxed text-[#b0a89d]'>
                  使用手机浏览器扫描左侧二维码
                  <br />
                  即可直接打开库街区登录页面
                </div>
              </div>
            </div>

            {/* 底部提示 */}
            <div className='flex items-center justify-between px-5 py-3 mt-6 bg-[#faf7f2] border border-[#e1dcce] rounded-xl'>
              <span className='text-sm font-bold text-[#8a837b]'>指令前缀 # ! / ！＃</span>
              <span className='text-xs text-[#c2bcb2]'>Powered by alemonjs-kuro</span>
            </div>
          </div>
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
