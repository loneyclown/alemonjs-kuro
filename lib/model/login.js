import { randomUUID } from 'node:crypto';
import { WAVES_GAME_ID } from '../constants/kuro.js';
import { apiLogin, apiRoleList, apiRequestToken } from './api.js';
import { addToken, bindUid, switchUid } from './db.js';

class LoginError extends Error {
}
async function loginWithCode(userId, mobile, code, did = randomUUID().toUpperCase(), isCurrent = () => true) {
    if (!userId || !/^1[3-9]\d{9}$/.test(mobile) || !/^\d{6}$/.test(code)) {
        throw new LoginError('请输入正确的手机号和6位验证码');
    }
    const login = await apiLogin(mobile, code, did);
    if (!login.success || typeof login.data?.token !== 'string' || !login.data.token) {
        throw new LoginError(login.success ? '库街区未返回登录凭据，请确认已注册库街区并重新获取验证码' : `登录失败：${login.msg || '请检查验证码是否有效'}`);
    }
    const token = login.data.token;
    const roles = await apiRoleList(token, did, WAVES_GAME_ID);
    if (!roles.success || !Array.isArray(roles.data) || !roles.data.length) {
        throw new LoginError('未找到鸣潮角色，请确认库街区已绑定鸣潮');
    }
    const role = roles.data[0];
    const uid = String(role.roleId);
    if (!/^\d{9}$/.test(uid)) {
        throw new LoginError('库街区返回的特征码格式异常');
    }
    const access = await apiRequestToken(uid, token, did);
    if (!isCurrent()) {
        throw new LoginError('登录链接已过期或被新链接替换，请重新发送 #mc登录');
    }
    const bat = access.success && typeof access.data?.accessToken === 'string' ? access.data.accessToken : '';
    await addToken(userId, uid, token, did, bat);
    await bindUid(userId, uid);
    await switchUid(userId, uid);
    return { uid, serverName: role.serverName || '未知' };
}

export { LoginError, loginWithCode };
