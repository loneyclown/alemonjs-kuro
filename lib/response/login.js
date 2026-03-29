import { WAVES_GAME_ID } from '../constants/kuro.js';
import { apiLogin, apiRoleList, apiRequestToken } from '../model/api.js';
import { addToken, bindUid } from '../model/db.js';
import { createEvent, useMessage, Format } from 'alemonjs';

function generateUUID() {
    const chars = 'abcdef0123456789';
    let result = '';
    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            result += '-';
        }
        else {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    return result.toUpperCase();
}
var login = async (e) => {
    const event = createEvent({
        event: e,
        selects: ['private.message.create', 'message.create', 'interaction.create', 'private.interaction.create']
    });
    const [message] = useMessage(event);
    const userId = event.UserId;
    const text = e.MessageText.replace(/^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(?:登录|登陆|登入|login|dl)\s*/, '').trim();
    const format = Format.create();
    const md = Format.createMarkdown();
    if (!text) {
        md.addText('[鸣潮] 登录方式:\n#mc登录 手机号,验证码\n\n请先在库街区APP获取短信验证码后使用此命令');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const normalized = text.replace('，', ',');
    if (!normalized.includes(',')) {
        md.addText('[鸣潮] 格式错误，请使用:\n#mc登录 手机号,验证码');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const [phone, code] = normalized.split(',').map(s => s.trim());
    if (!/^1[3-9]\d{9}$/.test(phone)) {
        md.addText('[鸣潮] 手机号格式错误');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    if (!/^\d{6}$/.test(code)) {
        md.addText('[鸣潮] 验证码格式错误，请输入6位数字');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const did = generateUUID();
    const loginResp = await apiLogin(phone, code, did);
    if (!loginResp.success || !loginResp.data?.token) {
        md.addText(`[鸣潮] 登录失败: ${loginResp.msg || '未知错误'}\n请检查:\n1.是否注册过库街区\n2.验证码是否正确`);
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const token = loginResp.data.token;
    const roleResp = await apiRoleList(token, did, WAVES_GAME_ID);
    if (!roleResp.success || !roleResp.data || !Array.isArray(roleResp.data) || roleResp.data.length === 0) {
        md.addText('[鸣潮] 登录成功但未找到鸣潮角色，请确认库街区已绑定鸣潮');
        format.addMarkdown(md);
        void message.send({ format });
        return;
    }
    const role = roleResp.data[0];
    const uid = role.roleId;
    let bat = '';
    const tokenResp = await apiRequestToken(uid, token, did);
    if (tokenResp.success && tokenResp.data?.accessToken) {
        bat = tokenResp.data.accessToken;
    }
    await addToken(userId, uid, token, did, bat);
    await bindUid(userId, uid);
    md.addText(`[鸣潮] 登录成功!\n特征码: ${uid}\n服务器: ${role.serverName || '未知'}\nToken 已保存`);
    format.addMarkdown(md);
    void message.send({ format });
};

export { login as default };
