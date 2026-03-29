/**
 * 存储在 Redis 里的 Key 相关
 */
const prefix = 'data:alemonjs-wuwa';

export const wuwaKeys = {
  base: (data?: string) => `${prefix}${data ?? ''}`,
  /** 用户 cookie/did/bat 信息 (按 uid 存储) */
  userByUid: (uid: string | number) => `${prefix}:user:uid:${uid}`,
  /** 用户绑定的 uid 列表 */
  uidByUser: (userId: string | number) => `${prefix}:uid:user:${userId}`,
  /** 当前激活 uid */
  activeUid: (userId: string | number) => `${prefix}:active_uid:user:${userId}`,
  /** 查询缓存 */
  queryCache: (uid: string | number, api: string) => `${prefix}:cache:${uid}:${api}`,
  /** 扫码登录锁 */
  qrLoginLock: (userId: string | number) => `${prefix}:qrlogin:lock:${userId}`
};
