import SignCard from '../img/views/SignCard.js';
import { getCookie, apiSignIn, apiSignInit } from '../model/api.js';
import { getActiveUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var sign = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText;
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
        md.addText('[鸣潮] 未添加Token或Token已失效\n请使用 #mc登录 手机号,验证码 重新登录');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const { cookie } = ckResult;
    const isDoSign = /签到$|qd$/i.test(text) && !/日历|记录|jl/i.test(text);
    if (isDoSign) {
        const signResp = await apiSignIn(uid, cookie);
        if (signResp.success) {
            md.addText('[鸣潮] 签到成功！');
        }
        else {
            md.addText(`[鸣潮] 签到失败: ${signResp.msg || '未知错误'}`);
        }
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const initResp = await apiSignInit(uid, cookie);
    if (!initResp.success || !initResp.data) {
        md.addText(`[鸣潮] 签到信息获取失败: ${initResp.msg || '未知错误'}`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const img = await renderComponentIsHtmlToBuffer(SignCard, {
        data: {
            uid,
            sign: initResp.data
        }
    });
    if (typeof img === 'boolean') {
        md.addText('[鸣潮] 签到卡片渲染失败');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    format.addImage(img);
    void message.send({ format });
};

export { sign as default };
