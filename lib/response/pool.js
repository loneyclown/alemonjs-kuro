import PoolCard from '../img/views/PoolCard.js';
import { apiWikiHome } from '../model/api.js';
import { readPoolRounds } from '../model/pools.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var pool = async (e) => {
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
    let rounds;
    try {
        rounds = readPoolRounds(resp.data.contentJson);
    }
    catch {
        await message.send({ format: format.addText('[鸣潮] 卡池数据格式异常，请稍后重试。') });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(PoolCard, { data: { rounds } });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 卡池信息渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { pool as default };
