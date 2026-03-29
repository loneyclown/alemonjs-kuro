import CalendarCard from '../img/views/CalendarCard.js';
import { apiWikiHome } from '../model/api.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import dayjs from 'dayjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

function getCycleNode(name, startBase) {
    const cycleDays = 28;
    const now = Date.now();
    const elapsed = now - startBase.valueOf();
    const periodIndex = Math.floor(elapsed / (cycleDays * 86400000));
    const periodStart = startBase.add(periodIndex * cycleDays, 'day');
    const periodEnd = periodStart.add(cycleDays, 'day');
    const fmt = (d) => d.format('YYYY-MM-DD HH:mm');
    return {
        title: name,
        contentUrl: '',
        countDown: { dateRange: [fmt(periodStart), fmt(periodEnd)] }
    };
}
var calendar = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const format = Format.create();
    const md = Format.createMarkdown();
    const resp = await apiWikiHome();
    if (!resp.success || !resp.data) {
        md.addText(`[鸣潮] 活动日历获取失败: ${resp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const contentJson = typeof resp.data.contentJson === 'string' ? JSON.parse(resp.data.contentJson) : resp.data.contentJson;
    const sideModules = contentJson?.sideModules ?? [];
    const now = Date.now();
    const events = [];
    for (const mod of sideModules) {
        if (mod.title === '角色活动唤取' || mod.title === '武器活动唤取') {
            const tabs = mod.content?.tabs ?? [];
            for (const tab of tabs) {
                const dr = tab.countDown?.dateRange;
                const { status, timeLeft, isActive } = getStatus(dr, now);
                events.push({
                    title: `${mod.title}: ${tab.name || '当前卡池'}`,
                    type: 'gacha',
                    dateRange: dr,
                    status,
                    timeLeft,
                    isActive,
                    iconUrl: tab.imgs?.[0]?.img
                });
            }
        }
        else if (mod.title === '版本活动') {
            const towerNode = getCycleNode('逆境深塔', dayjs('2025-02-03 04:00'));
            const abyssNode = getCycleNode('冥歌海墟', dayjs('2025-03-17 04:00'));
            const builtInNodes = [towerNode, abyssNode];
            const activityList = Array.isArray(mod.content) ? mod.content : [];
            const allActivities = [...builtInNodes, ...activityList];
            for (const act of allActivities) {
                const dr = act.countDown?.dateRange;
                const { status, timeLeft, isActive } = getStatus(dr, now);
                events.push({
                    title: act.title,
                    type: /深塔|海墟/.test(act.title) ? 'tower' : 'activity',
                    dateRange: dr,
                    status,
                    timeLeft,
                    isActive,
                    iconUrl: act.contentUrl?.startsWith('http') ? act.contentUrl : undefined
                });
            }
        }
    }
    if (events.length === 0) {
        md.addText('[鸣潮] 当前日历无数据');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(CalendarCard, { data: { events } });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 日历渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};
function getStatus(dateRange, now) {
    if (!dateRange || dateRange.length < 2) {
        return { status: '进行中', timeLeft: '', isActive: true };
    }
    const start = dayjs(dateRange[0]).valueOf();
    const end = dayjs(dateRange[1]).valueOf();
    if (now < start) {
        return { status: '未开始', timeLeft: '', isActive: false };
    }
    if (now > end) {
        return { status: '已结束', timeLeft: '', isActive: false };
    }
    const diff = end - now;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const timeLeft = d > 0 ? `剩余${d}天${h}小时` : `剩余${h}小时`;
    return { status: '进行中', timeLeft, isActive: true };
}

export { calendar as default };
