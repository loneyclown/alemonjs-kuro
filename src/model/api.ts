import { getIoRedis } from '@alemonjs/db';
import { ANDROID_USER_AGENT, IOS_USER_AGENT, KURO_API, NET_SERVER_ID_MAP, SERVER_ID, SERVER_ID_NET, WAVES_GAME_ID } from '@src/constants/wuwa';
import { wuwaKeys } from './keys';
import type { AccountBaseInfo, DailyData, ExploreResp, KuroApiResp, KuroRole, RoleListResp, SignInitResp, TowerResp } from './types';

function randomSource(): 'ios' | 'android' {
  return Math.random() > 0.5 ? 'ios' : 'android';
}

function getBaseHeaders(): Record<string, string> {
  const source = randomSource();
  const ua = source === 'ios' ? IOS_USER_AGENT : ANDROID_USER_AGENT;

  return {
    source,
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'User-Agent': ua,
    devCode: `127.0.0.1, ${ua}`
  };
}

function getServerId(roleId: string, serverId?: string): string {
  if (serverId) {
    return serverId;
  }
  const id = parseInt(roleId);

  if (id >= 200000000) {
    const prefix = Math.floor(id / 100000000);

    return NET_SERVER_ID_MAP[prefix] ?? SERVER_ID_NET;
  }

  return SERVER_ID;
}

function formBody(data: Record<string, string | number>): string {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

async function kuroPost<T>(url: string, headers: Record<string, string>, data: Record<string, string | number>): Promise<KuroApiResp<T>> {
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body: formBody(data)
    });
    const json = (await resp.json()) as KuroApiResp<T>;

    return {
      ...json,
      success: json.code === 0 || json.code === 200
    };
  } catch (err) {
    return { code: -999, msg: String(err), data: null, success: false };
  }
}

/** 获取用户已存储的 did / bat */
async function getUserHeaders(token: string, uid: string, needToken = false): Promise<Record<string, string>> {
  const headers: Record<string, string> = { did: '', 'b-at': '' };

  if (needToken) {
    headers['token'] = token;
  }

  const redis = getIoRedis();

  if (!redis) {
    return headers;
  }

  const userJson = await redis.get(wuwaKeys.userByUid(uid));

  if (userJson) {
    try {
      const user = JSON.parse(userJson);

      headers['did'] = user.did ?? '';
      headers['b-at'] = user.bat ?? '';
    } catch {}
  }

  return headers;
}

// ═══════════════════════════════════════
// Kuro API 封装
// ═══════════════════════════════════════

/** 手机验证码登录 */
export async function apiLogin(mobile: string, code: string, did: string) {
  const headers = getBaseHeaders();

  headers['devCode'] = did;

  return kuroPost<{ token: string }>(KURO_API.LOGIN, headers, {
    mobile,
    code
  });
}

/** 登录校验 */
export async function apiLoginLog(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  headers['token'] = token;
  headers['devCode'] = uh['did'] || '';

  return kuroPost(KURO_API.LOGIN_LOG, headers, {});
}

/** 获取角色列表 */
export async function apiRoleList(token: string, did: string, gameId = WAVES_GAME_ID) {
  const headers = getBaseHeaders();

  headers['token'] = token;
  headers['devCode'] = did;

  return kuroPost<KuroRole[]>(KURO_API.ROLE_LIST, headers, { gameId });
}

/** 刷新数据 (查询前必须调) */
export async function apiRefresh(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost(KURO_API.REFRESH, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 请求 accessToken (刷新 bat) */
export async function apiRequestToken(uid: string, token: string, did: string) {
  const headers = getBaseHeaders();

  headers['token'] = token;
  headers['did'] = did;
  headers['b-at'] = '';

  return kuroPost<{ accessToken: string }>(KURO_API.REQUEST_TOKEN, headers, {
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 每日体力 (widget) */
export async function apiDailyInfo(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);

  return kuroPost<DailyData>(KURO_API.GAME_DATA, headers, {
    type: '2',
    sizeType: '1',
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 基础信息 */
export async function apiBaseInfo(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<AccountBaseInfo>(KURO_API.BASE_DATA, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 角色列表 */
export async function apiRoleData(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<RoleListResp>(KURO_API.ROLE_DATA, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 探索度 */
export async function apiExploreData(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<ExploreResp>(KURO_API.EXPLORE_DATA, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid,
    countryCode: '1'
  });
}

/** 签到初始化 */
export async function apiSignInit(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);
  headers['devcode'] = '';

  return kuroPost<SignInitResp>(KURO_API.SIGN_INIT, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 执行签到 */
export async function apiSignIn(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);

  return kuroPost(KURO_API.SIGN_IN, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 深塔 */
export async function apiTowerDetail(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<TowerResp>(KURO_API.TOWER_DETAIL, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

// ═══════════════════════════════════════
// Cookie 获取辅助
// ═══════════════════════════════════════

/** 获取用户自己的 cookie. 如果无效返回 null */
export async function getSelfCookie(uid: string, _userId: string): Promise<string | null> {
  const redis = getIoRedis();

  if (!redis) {
    return null;
  }

  const userJson = await redis.get(wuwaKeys.userByUid(uid));

  if (!userJson) {
    return null;
  }

  try {
    const user = JSON.parse(userJson);

    if (!user.cookie) {
      return null;
    }

    // 校验
    const logResp = await apiLoginLog(uid, user.cookie);

    if (!logResp.success) {
      return null;
    }

    // 刷新
    const refreshResp = await apiRefresh(uid, user.cookie);

    if (!refreshResp.success) {
      // bat 失效 => 尝试刷新
      if (refreshResp.code === 10903 && user.did) {
        const tokenResp = await apiRequestToken(uid, user.cookie, user.did);

        if (tokenResp.success && tokenResp.data?.accessToken) {
          user.bat = tokenResp.data.accessToken;
          await redis.set(wuwaKeys.userByUid(uid), JSON.stringify(user), 'EX', 86400 * 90);

          return user.cookie;
        }
      }

      return null;
    }

    return user.cookie;
  } catch {
    return null;
  }
}

/** 获取 cookie (自身优先, 无则返回 null) */
export async function getCookie(uid: string, userId: string): Promise<{ isSelf: boolean; cookie: string } | null> {
  const ck = await getSelfCookie(uid, userId);

  if (ck) {
    return { isSelf: true, cookie: ck };
  }

  return null;
}
