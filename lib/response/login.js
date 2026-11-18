import { createEvent, useMessage, Format } from 'alemonjs';
import LoginHelpCard, { generateQrDataUrl } from '../img/views/LoginHelpCard.js';
import { loginWithCode, LoginError } from '../model/login.js';
import { createLoginSession, revokeLoginSessions } from '../model/login-server.js';
import { renderComponentIsHtmlToBuffer } from 'jsxp';

var login = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const sendText = (text) => {
        const format = Format.create();
        format.addText(text);
        return message.send({ format });
    };
    if (!event.name.startsWith('private.')) {
        await sendText('[鸣潮] 请私聊机器人发送 #mc登录，获取专属登录链接');
        return;
    }
    const userId = event.UserKey;
    const text = event.MessageText.replace(/^[!！/#＃](?:库洛|kuro|mc|鸣潮)(?:登录|登陆|登入|login|dl)\s*/, '').trim();
    try {
        if (!text) {
            const loginUrl = await createLoginSession(userId, sendText);
            await sendText(`[鸣潮] 打开专属登录页，完成滑块和短信验证。\n${loginUrl}\n链接3分钟有效，请勿转发。正在生成二维码，也可直接打开链接登录。`);
            const qrDataUrl = await generateQrDataUrl(loginUrl);
            const img = await renderComponentIsHtmlToBuffer(LoginHelpCard, { data: { qrDataUrl, loginUrl } }).catch(() => false);
            const format = Format.create();
            if (img && typeof img !== 'boolean') {
                format.addImage(img);
                await message.send({ format });
            }
            return;
        }
        const parts = text.split(/[\s,，]+/);
        if (parts.length !== 2) {
            await sendText('[鸣潮] 请发送 #mc登录 获取登录页，或使用 #mc登录 手机号 验证码');
            return;
        }
        revokeLoginSessions(userId);
        const result = await loginWithCode(userId, parts[0], parts[1]);
        await sendText(`[鸣潮] 登录成功！\n特征码：${result.uid}\n服务器：${result.serverName}\n发送 #mc体力 开始查询`);
    }
    catch (error) {
        await sendText(`[鸣潮] ${error instanceof LoginError ? error.message : '登录失败，请检查 Redis 和登录服务配置后重试'}`);
    }
};

export { login as default };
