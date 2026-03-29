import GachaCard from '../img/views/GachaCard.js';
import { apiGachaLog } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { NORMAL_ROLE_LIST, LUCK_THRESHOLDS, GACHA_POOL_TYPE } from '../model/types.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

async function fetchAllGacha(uid) {
    const allItems = [];
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
            if (resp.data.length < 10) {
                hasMore = false;
            }
            else {
                recordId = String(resp.data[resp.data.length - 1].resourceId);
            }
        }
    }
    return allItems;
}
function analyzeGacha(items) {
    const poolMap = new Map();
    for (const item of items) {
        const pool = poolMap.get(item.cardPoolType) ?? [];
        pool.push(item);
        poolMap.set(item.cardPoolType, pool);
    }
    const stats = [];
    for (const [poolType, poolItems] of poolMap) {
        poolItems.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        const star5Items = [];
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
            }
            else if (item.qualityLevel === 4) {
                star4Count++;
            }
            else {
                star3Count++;
            }
        }
        const poolName = GACHA_POOL_TYPE[poolType] ?? `卡池${poolType}`;
        const avg = star5Items.length > 0 ? Math.round(poolItems.length / star5Items.length) : null;
        const upItems = star5Items.filter(s => s.isUp);
        const avgUp = upItems.length > 0 ? Math.round(poolItems.length / upItems.length) : null;
        const thresholds = LUCK_THRESHOLDS[poolName] ?? LUCK_THRESHOLDS['default'];
        let luckLevel = 2;
        if (avg !== null && thresholds) {
            luckLevel = thresholds.findIndex(t => avg <= t);
            if (luckLevel === -1) {
                luckLevel = 0;
            }
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
    stats.sort((a, b) => parseInt(a.poolType) - parseInt(b.poolType));
    return stats;
}
var gacha = async (e) => {
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

export { gacha as default };
