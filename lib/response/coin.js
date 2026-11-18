import CoinCard from '../img/views/CoinCard.js';
import { getCookie, apiMineV2 } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var coin = async (e) => {
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
    const resp = await apiMineV2(cookie);
    if (!resp.success || !resp.data?.mine) {
        md.addText(`[鸣潮] 库洛币查询失败: ${resp.success ? '未返回库街区账号资料' : resp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(CoinCard, {
        data: { uid, mine: resp.data.mine }
    });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 库洛币卡片渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { coin as default };
