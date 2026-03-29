/**
 * 存储在 Redis 里的 Key 相关
 */
const mihoyoKeyPrefix = 'data:alemonjs-wuwa';

export const mihoyoKeys = {
  base: (data?: string) => `${mihoyoKeyPrefix}${data ?? ''}`,
  cookieByUser: (userId: string | number) => `${mihoyoKeyPrefix}:cookie:user:${userId}`,
  stokenByUser: (userId: string | number) => `${mihoyoKeyPrefix}:stoken:user:${userId}`,
  uidByUserAndGame: (userId: string | number, game: string) => `${mihoyoKeyPrefix}:uid:user:${userId}:${game}`,
  authKeyByUid: (uid: string | number) => `${mihoyoKeyPrefix}:authkey:uid:${uid}`,
  payLogByUser: (userId: string | number) => `${mihoyoKeyPrefix}:paylog:user:${userId}`,
  queryCache: (game: string, uid: string | number, api: string) => `${mihoyoKeyPrefix}:cache:${game}:${uid}:${api}`,
  deviceFp: (uid: string | number) => `${mihoyoKeyPrefix}:device_fp:${uid}`,
  qrLoginLock: (userId: string | number) => `${mihoyoKeyPrefix}:qrlogin:lock:${userId}`,
  publicCookiePool: () => `${mihoyoKeyPrefix}:public:cookie_pool`,
  migrationPhase: () => `${mihoyoKeyPrefix}:migration:phase`
};
