import PokerCard from '../img/views/PokerCard.js';
import { getCookie, apiMoreActivity, apiBaseInfo } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var poker = async (e) => {
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
    const ckResult = await getCookie(uid);
    if (!ckResult) {
        md.addText('[鸣潮] 未添加Token或Token已失效');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { cookie } = ckResult;
    const [moreResp, baseResp] = await Promise.all([apiMoreActivity(uid, cookie), apiBaseInfo(uid, cookie)]);
    if (!moreResp.success || !moreResp.data?.phantomBattle) {
        md.addText('[鸣潮] 激斗数据获取失败或未解锁');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(PokerCard, {
        data: {
            uid,
            battle: moreResp.data.phantomBattle,
            base: baseResp.success ? baseResp.data : null
        }
    });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 激斗卡片渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { poker as default };
