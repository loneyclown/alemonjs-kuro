import ChallengeCard from '../img/views/ChallengeCard.js';
import { getCookie, apiSlashDetail, apiBaseInfo, apiMineV2 } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var slash = async (e) => {
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
        md.addText('[鸣潮] 未添加Token或Token已失效\n请使用 #mc登录 手机号 验证码 重新登录');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { cookie } = ckResult;
    const [resp, baseResp, mineResp] = await Promise.all([apiSlashDetail(uid, cookie), apiBaseInfo(uid, cookie), apiMineV2(cookie)]);
    if (!resp.success || !resp.data) {
        md.addText(`[鸣潮] 冥歌海墟查询失败: ${resp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    if (!baseResp.success || !baseResp.data) {
        md.addText(`[鸣潮] 基础信息查询失败: ${baseResp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(ChallengeCard, {
        data: { uid, base: baseResp.data, challenge: resp.data, title: '冥歌海墟', icon: '🌊', headUrl: mineResp.data?.mine?.headUrl }
    });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 冥歌海墟卡片渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { slash as default };
