import type { WikiGachaTab, WikiHomeResp } from './types';

export interface Pool {
  name: string;
  type: 'char' | 'weapon';
  images: { url: string; title: string }[];
}

export interface PoolRound {
  range?: [string, string];
  status: '进行中' | '未开始' | '已结束' | '时间未公布';
  countdown?: string;
  pools: Pool[];
}

function chinaTime(value: string) {
  if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(value)) {
    return NaN;
  }
  const time = Date.parse(value.replace(' ', 'T') + ':00+08:00');

  return Number.isFinite(time) && new Date(time + 28800000).toISOString().slice(0, 16).replace('T', ' ') === value ? time : NaN;
}

function remaining(ms: number) {
  const minutes = Math.ceil(ms / 60000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);

  return days ? `${days} 天 ${hours} 小时` : hours ? `${hours} 小时 ${minutes % 60} 分钟` : `${minutes} 分钟`;
}

export function readPoolRounds(raw: WikiHomeResp['contentJson'], now = Date.now()): PoolRound[] {
  const content = typeof raw === 'string' ? (JSON.parse(raw) as Exclude<WikiHomeResp['contentJson'], string>) : raw;
  const rounds = new Map<string, PoolRound>();

  for (const module of content?.sideModules ?? []) {
    const type = module?.title === '角色活动唤取' ? 'char' : module?.title === '武器活动唤取' ? 'weapon' : null;

    if (!type) {
      continue;
    }
    const tabs = (module.content as { tabs?: WikiGachaTab[] })?.tabs;

    for (const tab of Array.isArray(tabs) ? tabs : []) {
      if (typeof tab?.name !== 'string' || !tab.name.trim()) {
        continue;
      }
      const range = tab.countDown?.dateRange;
      const start = chinaTime(range?.[0] ?? '');
      const end = chinaTime(range?.[1] ?? '');
      const dated = Number.isFinite(start) && Number.isFinite(end) && end > start;
      const key = dated ? `${start}:${end}` : 'unknown';
      const status = !dated ? '时间未公布' : now < start ? '未开始' : now >= end ? '已结束' : '进行中';
      const round = rounds.get(key) ?? {
        range: dated ? range : undefined,
        status,
        countdown: status === '进行中' ? remaining(end - now) : undefined,
        pools: []
      };

      round.pools.push({
        name: tab.name,
        type,
        images: (Array.isArray(tab.imgs) ? tab.imgs : []).flatMap(item => {
          if (typeof item?.img !== 'string' || !/^https:\/\//i.test(item.img)) {
            return [];
          }

          return [{ url: item.img, title: typeof item.title === 'string' ? item.title : '' }];
        })
      });
      rounds.set(key, round);
    }
  }
  const priority = { 进行中: 0, 未开始: 1, 时间未公布: 2, 已结束: 3 };

  return [...rounds.values()].sort((a, b) => {
    const order = priority[a.status] - priority[b.status];
    const dates = (a.range?.[0] ?? '').localeCompare(b.range?.[0] ?? '');

    return order || (a.status === '已结束' ? -dates : dates);
  });
}
