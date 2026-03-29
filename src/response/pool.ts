import PoolCard from '@src/img/views/PoolCard';
import { apiWikiHome } from '@src/model/api';
import type { WikiGachaTab } from '@src/model/types';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import dayjs from 'dayjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

/** 计算剩余时间文本 */
function getTimeLeft(endStr: string): string {
  const diff = dayjs(endStr).valueOf() - Date.now();

  if (diff <= 0) {
    return '已结束';
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);

  return d > 0 ? `剩余${d}天${h}小时` : `剩余${h}小时`;
}

/** 获取卡池状态 */
function getPoolStatus(dateRange?: [string, string]): { status: string; timeLeft: string; isActive: boolean } {
  if (!dateRange || dateRange.length < 2) {
    return { status: '进行中', timeLeft: '', isActive: true };
  }
  const now = Date.now();
  const start = dayjs(dateRange[0]).valueOf();
  const end = dayjs(dateRange[1]).valueOf();

  if (now < start) {
    return { status: '未开始', timeLeft: '', isActive: false };
  }
  if (now > end) {
    return { status: '已结束', timeLeft: '', isActive: false };
  }

  return { status: '进行中', timeLeft: getTimeLeft(dateRange[1]), isActive: true };
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);

  const format = Format.create();
  const md = Format.createMarkdown();

  const resp = await apiWikiHome();

  if (!resp.success || !resp.data) {
    md.addText(`[鸣潮] 卡池信息获取失败: ${resp.msg || '未知错误'}`);
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  // contentJson 可能是字符串
  const contentJson = typeof resp.data.contentJson === 'string' ? JSON.parse(resp.data.contentJson) : resp.data.contentJson;

  const sideModules = contentJson?.sideModules ?? [];

  interface PoolInfo {
    poolName: string;
    type: 'char' | 'weapon';
    dateRange?: [string, string];
    status: string;
    timeLeft: string;
    isActive: boolean;
    items: string[];
  }

  const pools: PoolInfo[] = [];

  for (const mod of sideModules) {
    if (mod.title !== '角色活动唤取' && mod.title !== '武器活动唤取') {
      continue;
    }
    const type = mod.title === '角色活动唤取' ? 'char' : 'weapon';
    const tabs = (mod.content as { tabs?: WikiGachaTab[] })?.tabs ?? [];

    for (const tab of tabs) {
      const { status, timeLeft, isActive } = getPoolStatus(tab.countDown?.dateRange);
      const items = (tab.imgs ?? []).map(img => img.title).filter(Boolean);

      pools.push({
        poolName: tab.name || mod.title,
        type,
        dateRange: tab.countDown?.dateRange,
        status,
        timeLeft,
        isActive,
        items
      });
    }
  }

  if (pools.length === 0) {
    md.addText('[鸣潮] 当前无进行中的卡池信息');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  const img = await renderComponentIsHtmlToBuffer(PoolCard, { data: { pools } });

  if (typeof img === 'boolean') {
    md.addText('[鸣潮] 卡池信息渲染失败');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  format.addImage(img);
  void message.send({ format });
};
