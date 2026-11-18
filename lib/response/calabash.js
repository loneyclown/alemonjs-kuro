import CalabashCard from '../img/views/CalabashCard.js';
import { getCookie, apiCalabashData } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var calabash = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserKey;
    const format = Format.create();
    const md = Format.createMarkdown();
    const uid = await getActiveUid(userId);
    if (!uid) {
        md.addText('[鸣潮] 请先绑定特征码: #mc绑定123456789');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const ckResult = await getCookie(uid, userId);
    if (!ckResult) {
        md.addText('[鸣潮] 未添加Token或Token已失效\n请私聊发送 #mc登录 重新登录');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { cookie } = ckResult;
    const resp = await apiCalabashData(uid, cookie, userId);
    if (!resp.success || !resp.data) {
        md.addText(`[鸣潮] 数据坞查询失败: ${resp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(CalabashCard, {
        data: { uid, calabash: resp.data, page: Number(event.MessageText.trim().match(/\s+(\d+)$/)?.[1] ?? 1) }
    });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 数据坞卡片渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { calabash as default };
