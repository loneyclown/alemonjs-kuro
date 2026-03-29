import { getIoRedis } from '@alemonjs/db';
import { wuwaKeys } from './keys.js';

function getRedis() {
    const redis = getIoRedis();
    if (!redis) {
        return null;
    }
    if (redis.status !== 'ready') {
        console.warn('[鸣潮][Redis] 连接未就绪, status:', redis.status);
        return null;
    }
    return redis;
}
function withTimeout(promise, ms = 5000) {
    return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('Redis 操作超时')), ms))]);
}
async function getUidList(userId) {
    const redis = getRedis();
    if (!redis) {
        return [];
    }
    const raw = await withTimeout(redis.get(wuwaKeys.uidByUser(userId)));
    if (!raw) {
        return [];
    }
    return raw.split('_').filter(Boolean);
}
async function getActiveUid(userId) {
    const redis = getRedis();
    if (!redis) {
        return null;
    }
    const active = await withTimeout(redis.get(wuwaKeys.activeUid(userId)));
    if (active) {
        return active;
    }
    const list = await getUidList(userId);
    return list[0] ?? null;
}
async function bindUid(userId, uid) {
    const redis = getRedis();
    if (!redis) {
        return '数据库未连接，请确认 Redis 已启动';
    }
    if (!/^\d{9}$/.test(uid)) {
        return '特征码格式错误，请输入9位数字';
    }
    const list = await getUidList(userId);
    if (list.includes(uid)) {
        return `特征码 ${uid} 已绑定`;
    }
    list.push(uid);
    await withTimeout(redis.set(wuwaKeys.uidByUser(userId), list.join('_'), 'EX', 86400 * 90));
    await withTimeout(redis.set(wuwaKeys.activeUid(userId), uid, 'EX', 86400 * 90));
    return `特征码 ${uid} 绑定成功`;
}
async function switchUid(userId, uid) {
    const redis = getRedis();
    if (!redis) {
        return '数据库未连接，请确认 Redis 已启动';
    }
    const list = await getUidList(userId);
    if (!list.includes(uid)) {
        return `未绑定特征码 ${uid}`;
    }
    await withTimeout(redis.set(wuwaKeys.activeUid(userId), uid, 'EX', 86400 * 90));
    return `已切换到特征码 ${uid}`;
}
async function unbindUid(userId, uid) {
    const redis = getRedis();
    if (!redis) {
        return '数据库未连接，请确认 Redis 已启动';
    }
    const list = await getUidList(userId);
    const newList = list.filter(u => u !== uid);
    if (newList.length === list.length) {
        return `未绑定特征码 ${uid}`;
    }
    if (newList.length > 0) {
        await withTimeout(redis.set(wuwaKeys.uidByUser(userId), newList.join('_'), 'EX', 86400 * 90));
    }
    else {
        await withTimeout(redis.del(wuwaKeys.uidByUser(userId)));
    }
    const active = await withTimeout(redis.get(wuwaKeys.activeUid(userId)));
    if (active === uid) {
        if (newList.length > 0) {
            await withTimeout(redis.set(wuwaKeys.activeUid(userId), newList[0], 'EX', 86400 * 90));
        }
        else {
            await withTimeout(redis.del(wuwaKeys.activeUid(userId)));
        }
    }
    await withTimeout(redis.del(wuwaKeys.userByUid(uid)));
    return `特征码 ${uid} 已解绑`;
}
async function viewUids(userId) {
    const list = await getUidList(userId);
    if (list.length === 0) {
        return '未绑定任何特征码';
    }
    const active = await getActiveUid(userId);
    const lines = list.map(uid => (uid === active ? `✅ ${uid} (当前)` : `  ${uid}`));
    return `已绑定特征码:\n${lines.join('\n')}`;
}
async function addToken(_userId, uid, cookie, did, bat = '') {
    const redis = getRedis();
    if (!redis) {
        return;
    }
    const user = {
        uid,
        cookie,
        did,
        bat,
        isLogin: true,
        createdAt: Date.now()
    };
    await withTimeout(redis.set(wuwaKeys.userByUid(uid), JSON.stringify(user), 'EX', 86400 * 90));
}
async function getUserByUid(uid) {
    const redis = getRedis();
    if (!redis) {
        return null;
    }
    const raw = await withTimeout(redis.get(wuwaKeys.userByUid(uid)));
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
async function deleteToken(uid) {
    const redis = getRedis();
    if (!redis) {
        return;
    }
    await withTimeout(redis.del(wuwaKeys.userByUid(uid)));
}

export { addToken, bindUid, deleteToken, getActiveUid, getUidList, getUserByUid, switchUid, unbindUid, viewUids };
