import { randomBytes, randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { networkInterfaces } from 'node:os';
import { getConfigValue } from 'alemonjs';
import { GEETEST_CAPTCHA_ID } from '../constants/kuro.js';
import { LOGIN_PAGE } from '../img/login-page.js';
import { apiSendSms } from './api.js';
import { LoginError, loginWithCode } from './login.js';

const sessions = new Map();
let server;
let starting;
let publicUrl = '';
function pruneSessions() {
    for (const [token, session] of sessions) {
        if (Date.now() >= session.expiresAt) {
            sessions.delete(token);
        }
    }
}
function reply(res, status, body) {
    res.writeHead(status, {
        'Content-Type': typeof body === 'string' ? 'text/html; charset=utf-8' : 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Content-Security-Policy': "frame-ancestors 'none'; base-uri 'none'; form-action 'self'"
    });
    res.end(typeof body === 'string' ? body : JSON.stringify(body));
}
async function readJson(req) {
    if (req.headers['content-type']?.split(';')[0] !== 'application/json') {
        throw new LoginError('请求必须使用 JSON 格式');
    }
    let raw = '';
    for await (const chunk of req) {
        raw += String(chunk);
        if (Buffer.byteLength(raw) > 8192) {
            throw new LoginError('请求内容过大');
        }
    }
    const body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
        throw new LoginError('请求内容无效');
    }
    return body;
}
async function handle(req, res) {
    const path = new URL(req.url ?? '/', 'http://localhost').pathname;
    const match = path.match(/^\/kuro\/login\/([a-f0-9]{48})(?:\/(sms|submit))?$/);
    if (!match) {
        reply(res, 404, { success: false, msg: '页面不存在' });
        return;
    }
    pruneSessions();
    const token = match[1];
    const session = sessions.get(token);
    if (!session) {
        reply(res, 410, { success: false, msg: '登录链接已失效，请私聊机器人重新发送 #mc登录' });
        return;
    }
    if (req.method === 'GET' && !match[2]) {
        reply(res, 200, LOGIN_PAGE);
        return;
    }
    if (req.method !== 'POST' || !match[2]) {
        reply(res, 405, { success: false, msg: '请求方法不支持' });
        return;
    }
    if (req.headers.origin && req.headers.origin !== session.origin) {
        reply(res, 403, { success: false, msg: '请求来源不匹配' });
        return;
    }
    if (session.busy) {
        reply(res, 409, { success: false, msg: '请求正在处理中，请稍候' });
        return;
    }
    session.busy = true;
    try {
        const body = await readJson(req);
        const mobile = body.mobile;
        if (typeof mobile !== 'string' || !/^1[3-9]\d{9}$/.test(mobile)) {
            throw new LoginError('手机号格式错误');
        }
        if (match[2] === 'sms') {
            if (session.smsAt && Date.now() - session.smsAt < 60000) {
                reply(res, 429, { success: false, msg: '请等待60秒后再获取验证码' });
                return;
            }
            const captcha = body.captcha;
            if (!captcha || typeof captcha !== 'object' || Array.isArray(captcha)) {
                throw new LoginError('请先完成滑块验证');
            }
            const result = { captcha_id: GEETEST_CAPTCHA_ID };
            for (const field of ['lot_number', 'captcha_output', 'pass_token', 'gen_time']) {
                const value = captcha[field];
                if (typeof value !== 'string' || !value || value.length > 2048) {
                    throw new LoginError('滑块验证结果无效，请重新验证');
                }
                result[field] = value;
            }
            session.smsAt = Date.now();
            const response = await apiSendSms(mobile, JSON.stringify(result), session.did);
            if (!response.success) {
                throw new LoginError(`验证码发送失败：${response.msg || '请重新验证'}`);
            }
            session.mobile = mobile;
            reply(res, 200, { success: true });
        }
        else {
            if (typeof body.code !== 'string' || !/^\d{6}$/.test(body.code)) {
                throw new LoginError('请输入6位短信验证码');
            }
            if (session.mobile && session.mobile !== mobile) {
                throw new LoginError('请使用获取验证码时的手机号登录');
            }
            if (++session.attempts > 5) {
                sessions.delete(token);
                throw new LoginError('尝试次数过多，请重新发送 #mc登录');
            }
            const result = await loginWithCode(session.userId, mobile, body.code, session.did, () => sessions.get(token) === session && Date.now() < session.expiresAt);
            sessions.delete(token);
            reply(res, 200, { success: true, uid: result.uid });
            await session.notify(`[鸣潮] 登录成功！\n特征码：${result.uid}\n发送 #mc体力 开始查询`).catch(() => { });
        }
    }
    catch (error) {
        if (!res.writableEnded) {
            reply(res, 400, { success: false, msg: error instanceof LoginError ? error.message : '登录服务请求失败，请检查网络和 Redis 后重试' });
        }
    }
    finally {
        session.busy = false;
    }
}
function startLoginServer() {
    if (starting) {
        return starting;
    }
    const config = getConfigValue()['alemonjs-kuro']?.login ?? {};
    const port = Number(config.port ?? 8130);
    const host = String(config.host ?? '0.0.0.0');
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
        throw new LoginError('登录服务端口配置无效');
    }
    const configured = config.publicUrl ? new URL(String(config.publicUrl)) : null;
    if (configured &&
        (!['http:', 'https:'].includes(configured.protocol) ||
            configured.username ||
            configured.password ||
            configured.pathname !== '/' ||
            configured.search ||
            configured.hash)) {
        throw new LoginError('登录服务 publicUrl 必须是 http/https 域名或IP地址，不包含路径');
    }
    server = createServer((req, res) => {
        void handle(req, res).catch(() => {
            if (!res.writableEnded) {
                reply(res, 500, { success: false, msg: '登录服务暂不可用' });
            }
        });
    });
    server.requestTimeout = 15000;
    server.headersTimeout = 10000;
    const listener = server;
    starting = new Promise((resolve, reject) => {
        listener.once('error', () => {
            starting = undefined;
            server = undefined;
            reject(new LoginError(`登录服务启动失败，请检查端口 ${port} 是否被占用`));
        });
        listener.listen(port, host, () => {
            const address = listener.address();
            const actualPort = address && typeof address === 'object' ? address.port : port;
            const addresses = Object.values(networkInterfaces())
                .flat()
                .filter(item => item?.family === 'IPv4' && !item.internal && !item.address.startsWith('169.254.'));
            const lan = addresses.find(item => item?.address.startsWith('192.168.')) ?? addresses[0];
            const publicHost = host === '0.0.0.0' || host === '::' ? (lan?.address ?? '127.0.0.1') : host;
            if (configured?.port === '0') {
                configured.port = String(actualPort);
            }
            publicUrl = configured?.origin ?? `http://${publicHost.includes(':') ? `[${publicHost}]` : publicHost}:${actualPort}`;
            resolve();
        });
    });
    return starting;
}
async function createLoginSession(userId, notify) {
    if (!userId) {
        throw new LoginError('缺少登录用户身份');
    }
    await startLoginServer();
    pruneSessions();
    revokeLoginSessions(userId);
    if (sessions.size >= 100) {
        throw new LoginError('登录人数较多，请稍后重试');
    }
    const token = randomBytes(24).toString('hex');
    sessions.set(token, {
        userId,
        did: randomUUID().toUpperCase(),
        expiresAt: Date.now() + 180000,
        origin: publicUrl,
        busy: false,
        smsAt: 0,
        mobile: '',
        attempts: 0,
        notify
    });
    return `${publicUrl}/kuro/login/${token}`;
}
function revokeLoginSessions(userId) {
    for (const [token, session] of sessions) {
        if (session.userId === userId) {
            sessions.delete(token);
        }
    }
}
async function closeLoginServer() {
    sessions.clear();
    const listener = server;
    server = undefined;
    starting = undefined;
    if (listener) {
        listener.closeAllConnections();
        await new Promise(resolve => listener.close(() => resolve()));
    }
}

export { closeLoginServer, createLoginSession, revokeLoginSessions };
