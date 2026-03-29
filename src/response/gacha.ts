import GachaCard from '@src/img/views/GachaCard';
import { apiGachaLog } from '@src/model/api';
import { getActiveUid } from '@src/model/db';
import type { GachaLogItem, GachaPoolStatEx } from '@src/model/types';
import { GACHA_POOL_TYPE, LUCK_THRESHOLDS, NORMAL_ROLE_LIST } from '@src/model/types';
import { createEvent, EventsEnum, Format, useMessage } from 'alemonjs';
import dayjs from 'dayjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

/** 查询所有卡池的抽卡记录 */
async function fetchAllGacha(uid: string): Promise<GachaLogItem[]> {
  const allItems: GachaLogItem[] = [];

  // 查询主要卡池: 1(角色UP) 2(武器UP) 3(角色常驻) 4(武器常驻/全频) 5(新手)
  for (const poolType of ['1', '2', '3', '4', '5']) {
    let recordId = '0';
    let hasMore = true;

    while (hasMore) {
      const resp = await apiGachaLog(uid, poolType, recordId);

      if (!resp.success || resp.data.length === 0) {
        hasMore = false;
        break;
      }

      allItems.push(...resp.data);

      // 最后一条的 resourceId 作为翻页游标
      if (resp.data.length < 10) {
        hasMore = false;
      } else {
        recordId = String(resp.data[resp.data.length - 1].resourceId);
      }
    }
  }

  return allItems;
}

/** 分析抽卡数据生成增强统计 */
function analyzeGacha(items: GachaLogItem[]): GachaPoolStatEx[] {
  const poolMap = new Map<string, GachaLogItem[]>();

  for (const item of items) {
    const pool = poolMap.get(item.cardPoolType) ?? [];

    pool.push(item);
    poolMap.set(item.cardPoolType, pool);
  }

  const stats: GachaPoolStatEx[] = [];

  for (const [poolType, poolItems] of poolMap) {
    // 按时间正序排序
    poolItems.sort((a, b) => dayjs(a.time).valueOf() - dayjs(b.time).valueOf());

    const star5Items: GachaPoolStatEx['star5Items'] = [];
    let counter = 0;
    let star4Count = 0;
    let star3Count = 0;

    for (const item of poolItems) {
      counter++;

      if (item.qualityLevel === 5) {
        const isUp = !NORMAL_ROLE_LIST.includes(item.name);

        star5Items.push({
          name: item.name,
          count: counter,
          time: item.time,
          isUp,
          resourceType: item.resourceType ?? '角色'
        });
        counter = 0;
      } else if (item.qualityLevel === 4) {
        star4Count++;
      } else {
        star3Count++;
      }
    }

    const poolName = GACHA_POOL_TYPE[poolType] ?? `卡池${poolType}`;

    // 计算平均抽数和 UP 平均抽数
    const avg = star5Items.length > 0 ? Math.round(poolItems.length / star5Items.length) : null;
    const upItems = star5Items.filter(s => s.isUp);
    const avgUp = upItems.length > 0 ? Math.round(poolItems.length / upItems.length) : null;

    // 计算运气等级
    const thresholds = LUCK_THRESHOLDS[poolName] ?? LUCK_THRESHOLDS['default'];
    let luckLevel = 2; // 默认平稳保底

    if (avg !== null && thresholds) {
      luckLevel = thresholds.findIndex(t => avg <= t);

      if (luckLevel === -1) {
        luckLevel = 0;
      } // 超出最大阈值 = 非到极致
    }

    stats.push({
      poolName,
      poolType,
      total: poolItems.length,
      star5List: star5Items.map(s => ({ name: s.name, count: s.count, time: s.time })),
      star4Count,
      star3Count,
      pity: counter,
      avg,
      avgUp,
      luckLevel,
      star5Items
    });
  }

  // 按 poolType 排序
  stats.sort((a, b) => parseInt(a.poolType) - parseInt(b.poolType));

  return stats;
}

export default async (e: EventsEnum) => {
  const event = createEvent({
    event: e,
    selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
  });
  const [message] = useMessage(event);
  const userId = event.UserId;

  const format = Format.create();
  const md = Format.createMarkdown();

  const uid = await getActiveUid(userId);

  if (!uid) {
    md.addText('[鸣潮] 请先绑定特征码: #mc绑定123456789');
    format.addMarkdown(md);
    void message.send({ format });

    return;
  }

  md.addText('[鸣潮] 正在查询抽卡记录，请稍候...');
  format.addMarkdown(md);
  void message.send({ format });

  const items = await fetchAllGacha(uid);

  if (items.length === 0) {
    const fmt2 = Format.create();
    const md2 = Format.createMarkdown();

    md2.addText('[鸣潮] 未查询到抽卡记录。可能原因：\n1. 抽卡记录需要在游戏内打开过调谐界面\n2. 该UID无抽卡数据');
    fmt2.addMarkdown(md2);
    void message.send({ format: fmt2 });

    return;
  }

  const pools = analyzeGacha(items);

  const img = await renderComponentIsHtmlToBuffer(GachaCard, { data: { uid, pools } });

  if (typeof img === 'boolean') {
    const fmt2 = Format.create();
    const md2 = Format.createMarkdown();

    md2.addText('[鸣潮] 抽卡统计卡片渲染失败');
    fmt2.addMarkdown(md2);
    void message.send({ format: fmt2 });

    return;
  }

  const fmt2 = Format.create();

  fmt2.addImage(img);
  void message.send({ format: fmt2 });
};
