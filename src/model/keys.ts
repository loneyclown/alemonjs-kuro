/**
 * 存储在 Redis 里的 Key 相关
 */
const prefix = 'data:alemonjs-kuro';

export const kuroKeys = {
  base: (data?: string) => `${prefix}${data ?? ''}`,
  /** 凭据按聊天用户和游戏 UID 隔离，不读取旧的共享凭据 */
  userByUid: (uid: string | number, userId: string) => {
    if (!userId) {
      throw new Error('缺少凭据所属用户');
    }

    return `${prefix}:user:${encodeURIComponent(userId)}:uid:${encodeURIComponent(uid)}`;
  },
  /** 用户绑定的 uid 列表 */
  uidByUser: (userId: string | number) => `${prefix}:uid:user:${userId}`,
  /** 当前激活 uid */
  activeUid: (userId: string | number) => `${prefix}:active_uid:user:${userId}`,
  /** 查询缓存 */
  queryCache: (uid: string | number, api: string) => `${prefix}:cache:${uid}:${api}`,
  /** 扫码登录锁 */
  qrLoginLock: (userId: string | number) => `${prefix}:qrlogin:lock:${userId}`
};
