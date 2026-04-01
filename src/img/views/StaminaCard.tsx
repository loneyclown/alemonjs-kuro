import type { AccountBaseInfo, DailyData } from '@src/model/types';
import React from 'react';
import HTML from './HTML.js';

export interface DailyDataExt extends DailyData {
  storeEnergyData?: { cur: number; total: number; refreshTimeStamp?: number };
}

interface StaminaCardProps {
  data: {
    uid: string;
    daily: DailyDataExt;
    base: AccountBaseInfo;
    headUrl?: string;
  };
}

function formatTime(timestamp: number): string {
  if (!timestamp || timestamp <= 0) {
    return '已满';
  }
  const diff = timestamp - Math.floor(Date.now() / 1000);

  if (diff <= 0) {
    return '已满';
  }
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);

  if (h > 0) {
    return `${h}小时${m}分钟`;
  }

  return `${m}分钟`;
}

// 模拟图标的占位
function FallbackSquare({ color, size = 'w-12 h-12' }: { color: string; size?: string }) {
  return (
    <div className={`${size} shrink-0 flex items-center justify-center bg-[#f6f6f6] border border-[#e8e8e8] rounded-lg`}>
      <div className='w-3/5 h-3/5 rounded shadow-sm' style={{ backgroundColor: color }} />
    </div>
  );
}

export default function StaminaCard({ data }: StaminaCardProps) {
  const { daily, base, uid, headUrl } = data;
  const energy = daily?.energyData;
  const storeEnergy = daily?.storeEnergyData;
  const liveness = daily?.livenessData;
  const bpList = (daily?.battlePassData as any[]) || [];

  const eCur = energy?.cur ?? 0;
  const eTotal = energy?.total ?? 240;
  const eTime = energy?.refreshTimeStamp ? formatTime(energy.refreshTimeStamp) : '已满';

  const sCur = storeEnergy?.cur ?? 0;
  const sTotal = storeEnergy?.total ?? 480;
  const sTime = storeEnergy?.refreshTimeStamp ? formatTime(storeEnergy.refreshTimeStamp) : '暂停恢复';

  const lCur = liveness?.cur ?? 0;
  const lTotal = liveness?.total ?? 100;

  // 渲染底部的副本与电台内容
  // 尽量使用源数据，如果不存在则使用参照图中的数据结构打底
  const rows =
    bpList.length > 0
      ? bpList
      : [
          { name: '战歌重奏', cur: 0, total: 3, unit: '本周剩余收取次数', isBp: true },
          { name: '千道门扉的异想', cur: 0, total: 0, unit: '本期异想积分 暂无数据', isBp: true },
          { name: '先约电台', cur: 9900, total: 12000, unit: '本周经验上限', isBp: true }
        ];

  return (
    <HTML style={{ width: '720px' }}>
      {/* 整体卡片风格参考 LoginHelpCard.tsx 的外层容器 */}
      <div className='relative flex justify-center p-6 bg-[#f6f6f6]' style={{ fontFamily: '"tttgbnumber", system-ui, sans-serif' }}>
        {/* 白底倒圆角大容器 */}
        <div className='relative w-full overflow-hidden bg-white border-2 border-[#eae5d9] rounded-3xl shadow-[0_12px_32px_rgba(0,0,0,0.05)] flex flex-col'>
          {/* 头部用户信息 */}
          <div className='flex items-center px-8 pt-8 pb-3'>
            {/* 头像 */}
            <div className='relative shrink-0 w-[86px] h-[86px] bg-[#f8f5ea] rounded-full border-[3px] border-[#ecd98e] flex items-center justify-center shadow-sm overflow-hidden'>
              {headUrl ? <img src={headUrl} className='w-full h-full object-cover' alt='avatar' /> : <FallbackSquare color='#d39c5b' size='w-12 h-12' />}
            </div>
            {/* 名字 & 特征码 */}
            <div className='flex flex-col ml-5 justify-center'>
              <span className='text-[28px] font-bold text-[#3d3833] tracking-wide'>{base.name}</span>
              <span className='text-[16px] font-medium text-[#a09d98] mt-2 tracking-wider'>特征码: {uid}</span>
            </div>
          </div>

          {/* 日常数据区域 */}
          <div className='px-8 pt-4 pb-6'>
            <div className='relative w-full overflow-hidden border-2 border-[#eae5d9] rounded-2xl flex flex-col'>
              {/* 顶栏栏目 */}
              <div className='flex items-center justify-between px-6 h-[64px] bg-gradient-to-r from-[#514d48] to-[#43403c] text-[#ecece1] shadow-sm shrink-0'>
                <div className='flex items-center gap-3'>
                  {/* 顶部的指尖流星状小图标标识 */}
                  <div className='flex items-center justify-center w-[26px] h-[26px] border-[1.5px] border-[#c1b5a5] rounded-full bg-black bg-opacity-10'>
                    <div className='w-[10px] h-[10px] border-[1.5px] border-[#c1b5a5] rounded-sm rotate-45 transform skew-x-12' />
                  </div>
                  <span className='text-[20px] font-bold tracking-[1.5px] drop-shadow-md text-white'>日常数据</span>
                </div>
              </div>

              {/* 核心资源区：结晶、结晶单质、活跃度 */}
              <div className='flex items-center justify-evenly px-5 py-8 h-[140px] bg-white'>
                {/* 结晶波片 */}
                <div className='flex items-start gap-3 flex-1 px-3'>
                  <FallbackSquare color='#1fb2b7' />
                  <div className='flex flex-col'>
                    <div className='flex items-baseline'>
                      <span className='text-[26px] font-bold text-[#e1bb4f]'>{eCur}</span>
                      <span className='text-[22px] font-bold text-[#7d7975] ml-[2px]'>/{eTotal}</span>
                    </div>
                    <div className='text-[15px] font-medium tracking-wide text-[#9e9a94] mt-0.5'>结晶波片</div>
                    <div className='text-[13px] font-medium tracking-wider text-[#b1aba2] mt-1.5 flex items-center'>
                      <span className='mr-1.5 opacity-80' style={{ fontSize: '11px', transform: 'scale(1.2)' }}>
                        ◷
                      </span>
                      {eTime}
                    </div>
                  </div>
                </div>

                <div className='w-[1.5px] h-[64px] bg-[#edeae1]' />

                {/* 结晶单质 */}
                <div className='flex items-start gap-3 flex-1 pl-7'>
                  <FallbackSquare color='#3bae4c' />
                  <div className='flex flex-col'>
                    <div className='flex items-baseline'>
                      <span className='text-[26px] font-bold text-[#e1bb4f]'>{sCur}</span>
                      <span className='text-[22px] font-bold text-[#7d7975] ml-[2px]'>/{sTotal}</span>
                    </div>
                    <div className='text-[15px] font-medium tracking-wide text-[#9e9a94] mt-0.5'>结晶单质</div>
                    <div className='text-[13px] font-medium tracking-wider text-[#b1aba2] mt-1.5 flex items-center'>
                      <span className='mr-1.5 opacity-80' style={{ fontSize: '11px', transform: 'scale(1.2)' }}>
                        ◷
                      </span>
                      {sTime}
                    </div>
                  </div>
                </div>

                <div className='w-[1.5px] h-[64px] bg-[#edeae1]' />

                {/* 活跃度 */}
                <div className='flex items-start gap-3 flex-1 pl-7'>
                  <FallbackSquare color='#d39c5b' />
                  <div className='flex flex-col'>
                    <div className='flex items-baseline'>
                      <span className='text-[26px] font-bold text-[#e1bb4f]'>{lCur}</span>
                      <span className='text-[22px] font-bold text-[#7d7975] ml-[2px]'>/{lTotal}</span>
                    </div>
                    <div className='text-[15px] font-medium tracking-wide text-[#9e9a94] mt-0.5'>活跃度</div>
                    <div className='h-[20px]' /> {/* 占位以保持高度一致 */}
                  </div>
                </div>
              </div>

              {/* 底部详细项 (战歌重奏/异想/经验等) */}
              <div className='flex flex-col px-8 pb-7 gap-5 bg-white'>
                {rows.map((row: any, i: number) => {
                  const iconUrl = row.iconUrl ?? row.picUrl;
                  const title = row.title ?? row.name ?? '未知任务';
                  const cur = typeof row.cur !== 'undefined' ? row.cur : (row.experience ?? 0);
                  const total = typeof row.total !== 'undefined' ? row.total : (row.experienceTotal ?? 0);

                  let rightContent;

                  if (title.includes('异想')) {
                    rightContent = <span className='text-[#868686] font-medium text-[15px] tracking-wide'>本期异想积分 暂无数据</span>;
                  } else {
                    const desc = row.unit ?? (title.includes('战歌') ? '本周剩余收取次数' : '当前进度');

                    rightContent = (
                      <div className='flex items-baseline'>
                        <span className='text-[#868686] font-medium text-[15px] mr-2.5 tracking-wide'>{desc}</span>
                        <span className='text-[#e1bb4f] font-bold text-[18px] tracking-wide'>
                          {cur}/{total}
                        </span>
                      </div>
                    );
                  }

                  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                  const isBp = title.includes('电台') || row.isBp;
                  const pct = isBp && total > 0 ? Math.floor((cur / total) * 45) : 0;

                  return (
                    <div key={i} className='flex flex-col relative'>
                      {/* 内部带虚线的长条行布局 */}
                      <div className='flex items-center w-full justify-between z-10 relative bg-transparent'>
                        {/* Left */}
                        <div className='flex items-center gap-3 pr-4 bg-white'>
                          {iconUrl ? (
                            <img src={iconUrl} className='w-8 h-8 rounded shrink-0 object-contain' alt='' />
                          ) : (
                            <FallbackSquare color='#7a7a7a' size='w-8 h-8' />
                          )}
                          <span className='text-[18px] font-bold text-[#443e39] tracking-wide drop-shadow-sm'>{title}</span>
                        </div>

                        {/* Middle Dot Line Filler */}
                        <div className='absolute w-[96%] top-1/2 left-[2%] border-b-[2.5px] border-dotted border-[#e3dcd3] -z-10 mt-[2px]' />

                        {/* Right */}
                        <div className='pl-4 bg-white'>{rightContent}</div>
                      </div>

                      {/* Optional Progress bar for Battle Pass */}
                      {isBp && (
                        <div className='flex w-full h-[6px] mt-3.5 gap-[2px] bg-white'>
                          {Array.from({ length: 45 }).map((_, idx) => (
                            <div key={idx} className={`flex-1 ${idx < pct ? 'bg-[#dba83e]' : 'bg-[#e7e1d8]'} rounded-sm`} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 底部提示区，保持和 LoginHelpCard 一致 */}
          <div className='px-8 pb-8 pt-1'>
            <div className='flex items-center justify-between px-5 py-3 bg-[#faf7f2] border border-[#e1dcce] rounded-xl'>
              <span className='text-sm font-bold text-[#8a837b]'>指令前缀 # ! / ！＃</span>
              <span className='text-xs text-[#c2bcb2]'>Powered by alemonjs-kuro</span>
            </div>
          </div>
        </div>
      </div>
    </HTML>
  );
}
