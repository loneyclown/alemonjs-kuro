import { getIoRedis } from '@alemonjs/db';
import { wuwaKeys } from './keys';

/** 用户数据结构 (存储在 Redis) */
export interface WuwaUser {
  uid: string;
  cookie: string;
  did: string;
  bat: string;
  isLogin: boolean;
  createdAt: number;
}

/** 获取可用的 Redis 实例，检查连接状态 */
function getRedis() {
  const redis = getIoRedis();

  if (!redis) {
    return null;
  }

  // ioredis status: 'ready' 表示已连接
  if (redis.status !== 'ready') {
    console.warn('[鸣潮][Redis] 连接未就绪, status:', redis.status);

    return null;
  }

  return redis;
}

/** Redis 操作超时包装 */
function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  return Promise.race([promise, new Promise<never>((_, reject) => setTimeout(() => reject(new Error('Redis 操作超时')), ms))]);
}

// ═══ UID 绑定 ═══

/** 获取用户绑定的 UID 列表 */
export async function getUidList(userId: string): Promise<string[]> {
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

/** 获取用户当前激活的 UID */
export async function getActiveUid(userId: string): Promise<string | null> {
  const redis = getRedis();

  if (!redis) {
    return null;
  }

  const active = await withTimeout(redis.get(wuwaKeys.activeUid(userId)));

  if (active) {
    return active;
  }

  // 无激活 uid 时取第一个
  const list = await getUidList(userId);

  return list[0] ?? null;
}

/** 绑定 UID */
export async function bindUid(userId: string, uid: string): Promise<string> {
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

/** 切换激活 UID */
export async function switchUid(userId: string, uid: string): Promise<string> {
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

/** 解绑 UID */
export async function unbindUid(userId: string, uid: string): Promise<string> {
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
  } else {
    await withTimeout(redis.del(wuwaKeys.uidByUser(userId)));
  }

  // 如果解绑的是激活 uid，则切到第一个
  const active = await withTimeout(redis.get(wuwaKeys.activeUid(userId)));

  if (active === uid) {
    if (newList.length > 0) {
      await withTimeout(redis.set(wuwaKeys.activeUid(userId), newList[0], 'EX', 86400 * 90));
    } else {
      await withTimeout(redis.del(wuwaKeys.activeUid(userId)));
    }
  }

  // 清理用户数据
  await withTimeout(redis.del(wuwaKeys.userByUid(uid)));

  return `特征码 ${uid} 已解绑`;
}

/** 查看已绑定的 UID */
export async function viewUids(userId: string): Promise<string> {
  const list = await getUidList(userId);

  if (list.length === 0) {
    return '未绑定任何特征码';
  }

  const active = await getActiveUid(userId);
  const lines = list.map(uid => (uid === active ? `✅ ${uid} (当前)` : `  ${uid}`));

  return `已绑定特征码:\n${lines.join('\n')}`;
}

// ═══ Token/Cookie 管理 ═══

/** 添加 Token (cookie) */
export async function addToken(_userId: string, uid: string, cookie: string, did: string, bat = ''): Promise<void> {
  const redis = getRedis();

  if (!redis) {
    return;
  }

  const user: WuwaUser = {
    uid,
    cookie,
    did,
    bat,
    isLogin: true,
    createdAt: Date.now()
  };

  await withTimeout(redis.set(wuwaKeys.userByUid(uid), JSON.stringify(user), 'EX', 86400 * 90));
}

/** 获取用户信息 */
export async function getUserByUid(uid: string): Promise<WuwaUser | null> {
  const redis = getRedis();

  if (!redis) {
    return null;
  }

  const raw = await withTimeout(redis.get(wuwaKeys.userByUid(uid)));

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as WuwaUser;
  } catch {
    return null;
  }
}

/** 删除 Token */
export async function deleteToken(uid: string): Promise<void> {
  const redis = getRedis();

  if (!redis) {
    return;
  }

  await withTimeout(redis.del(wuwaKeys.userByUid(uid)));
}
