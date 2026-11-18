import AnnCard from '../img/views/AnnCard.js';
import { routeRules } from '../constants/kuro.js';
import { apiAnnList } from '../model/api.js';
import { parseAnnQuery, ANN_CATEGORIES, getAnnList, annPostUrl, sortedAnnouncements, rememberAnnList } from '../model/announcements.js';
import { createEvent, useMessage, conversationIdentity, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var announce = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const sendText = (text) => message.send({ format: Format.create().addText(text) });
    const query = parseAnnQuery(routeRules.announce.exec(event.MessageText)?.[2] ?? '');
    if (!query) {
        await sendText('[鸣潮] 用法：#mc公告、#mc公告 活动、#mc公告 资讯\n查看原文：先查询列表，再发送 #mc公告 1 或 #mc公告 活动 1');
        return;
    }
    const meta = ANN_CATEGORIES[query.category];
    const scope = `${conversationIdentity(event)}:${event.UserKey}`;
    if (query.index !== undefined) {
        const items = getAnnList(scope, query.category);
        if (!items) {
            await sendText(`[鸣潮] 列表尚未查询或已过期，请先发送 ${meta.command}，再按图中编号查看原文（编号保留10分钟）。`);
            return;
        }
        const selected = items[query.index - 1];
        if (!selected) {
            await sendText(`[鸣潮] 没有这个编号，请按最近一次 ${meta.command} 图片中的编号查询。`);
            return;
        }
        const url = annPostUrl(selected.postId);
        await sendText(url ? `[鸣潮] ${selected.postTitle}\n${url}` : '[鸣潮] 这条内容未返回有效的原文地址，请在库街区查看。');
        return;
    }
    const response = await apiAnnList(meta.eventType, 6);
    if (!response.success || !Array.isArray(response.data?.list)) {
        await sendText(`[鸣潮] ${meta.title}获取失败，请稍后重试。`);
        return;
    }
    const items = sortedAnnouncements(response.data.list);
    const image = await renderComponentIsHtmlToBuffer(AnnCard, {
        data: { activities: [], infos: [], notices: [], [meta.key]: items, category: query.category }
    });
    if (typeof image === 'boolean') {
        await sendText('[鸣潮] 公告卡片渲染失败，请稍后重试。');
        return;
    }
    await message.send({ format: Format.create().addImage(image) });
    rememberAnnList(scope, query.category, items);
};

export { announce as default };
