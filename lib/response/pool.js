import PoolCard from '../img/views/PoolCard.js';
import { apiAnnList } from '../model/api.js';
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
    const resp = await apiAnnList('1', 30);
    if (!resp.success || !resp.data) {
        md.addText(`[鸣潮] 卡池信息获取失败: ${resp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const poolAnnList = (resp.data.list ?? []).filter(a => /调谐|唤取|卡池/.test(a.title));
    if (poolAnnList.length === 0) {
        md.addText('[鸣潮] 当前无进行中的卡池信息');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const pools = poolAnnList.slice(0, 6).map(ann => ({
        title: ann.title,
        publishTime: ann.publishTime
    }));
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

export { pool as default };
