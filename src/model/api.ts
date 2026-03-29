import { getIoRedis } from '@alemonjs/db';
import {
  ANDROID_USER_AGENT,
  GACHA_API_CN,
  GACHA_API_NET,
  IOS_USER_AGENT,
  KURO_API,
  KURO_VERSION,
  NET_SERVER_ID_MAP,
  SERVER_ID,
  SERVER_ID_NET,
  WAVES_GAME_ID
} from '@src/constants/kuro';
import { kuroKeys } from './keys';
import type {
  AccountBaseInfo,
  AnnDetailResp,
  AnnListResp,
  BatchRoleCostResp,
  CalabashResp,
  ChallengeResp,
  DailyData,
  ExploreResp,
  GachaLogItem,
  KuroApiResp,
  KuroRole,
  MatrixResp,
  MineV2Resp,
  MoreActivityResp,
  OnlineRole,
  OwnedRoleInfoResp,
  PeriodDetailResp,
  PeriodListResp,
  RoleDetailResp,
  RoleListResp,
  SignInitResp,
  SlashResp,
  TowerResp,
  WikiHomeResp
} from './types';

function randomSource(): 'ios' | 'android' {
  return Math.random() > 0.5 ? 'ios' : 'android';
}

/** 缓存的公网 IP (匹配 Python 的 get_public_ip) */
let _publicIp = '';

/** 获取公网 IP, 带缓存 */
async function ensurePublicIp(): Promise<string> {
  if (_publicIp) {
    return _publicIp;
  }

  try {
    const resp = await fetch('https://event.kurobbs.com/event/ip', { signal: AbortSignal.timeout(4000) });
    const ip = (await resp.text()).trim();

    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
      _publicIp = ip;

      return _publicIp;
    }
  } catch {}

  try {
    const resp = await fetch('https://api.ipify.org/?format=json', { signal: AbortSignal.timeout(4000) });
    const data = (await resp.json()) as { ip: string };

    if (data.ip) {
      _publicIp = data.ip;

      return _publicIp;
    }
  } catch {}

  _publicIp = '127.127.127.127';

  return _publicIp;
}

function getBaseHeaders(): Record<string, string> {
  const source = randomSource();
  const ua = source === 'ios' ? IOS_USER_AGENT : ANDROID_USER_AGENT;

  return {
    source,
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    'User-Agent': ua,
    devCode: `${_publicIp || '127.127.127.127'}, ${ua}`
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
    const body = formBody(data);

    console.log(`[kuroPost] >>> ${url}`);
    console.log('[kuroPost] headers:', JSON.stringify(headers));
    console.log(`[kuroPost] body: ${body}`);

    const resp = await fetch(url, {
      method: 'POST',
      headers,
      body
    });
    const json = (await resp.json()) as KuroApiResp<T>;

    // API 有时将 data 以 JSON 字符串返回，需要解析 (匹配 Python 的 _waves_request)
    if (typeof json.data === 'string') {
      try {
        json.data = JSON.parse(json.data);
      } catch {}
    }

    console.log(`[kuroPost] <<< ${url} code=${json.code} msg=${json.msg}`);
    if (url.includes('requestToken')) {
      console.log('[kuroPost] <<< requestToken data:', JSON.stringify(json.data));
    }

    return {
      ...json,
      success: json.code === 0 || json.code === 200
    };
  } catch (err) {
    console.log(`[kuroPost] !!! ${url} error: ${err}`);

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

  const userJson = await redis.get(kuroKeys.userByUid(uid));

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
export function apiLogin(mobile: string, code: string, did: string) {
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
  headers['version'] = KURO_VERSION;

  return kuroPost(KURO_API.LOGIN_LOG, headers, {});
}

/** 获取角色列表 */
export function apiRoleList(token: string, did: string, gameId = WAVES_GAME_ID) {
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
export function apiRequestToken(uid: string, token: string, did: string) {
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

/** 全息战略 */
export async function apiChallengeDetail(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<ChallengeResp>(KURO_API.CHALLENGE_DATA, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 冥歌海墟 */
export async function apiSlashDetail(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<SlashResp>(KURO_API.SLASH_DETAIL, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 终焉矩阵 */
export async function apiMatrixDetail(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<MatrixResp>(KURO_API.MATRIX_DETAIL, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 角色详情 (含装备/声骸) */
export async function apiRoleDetail(uid: string, token: string, roleId: number) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<RoleDetailResp>(KURO_API.ROLE_DETAIL, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid,
    id: roleId
  });
}

/** 数据坞 (声骸) */
export async function apiCalabashData(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<CalabashResp>(KURO_API.CALABASH_DATA, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 库洛币 / 用户信息 */
export function apiMineV2(token: string) {
  const headers = getBaseHeaders();

  headers['token'] = token;

  return kuroPost<MineV2Resp>(KURO_API.MINE_V2, headers, {});
}

/** Wiki 主页 (日历/卡池数据) */
export function apiWikiHome() {
  const headers = getBaseHeaders();

  headers.source = 'h5';
  headers.version = KURO_VERSION;
  headers.wiki_type = '9';

  return kuroPost<WikiHomeResp>(KURO_API.WIKI_HOME, headers, {});
}

/** 公告列表 */
export function apiAnnList(eventType = '1', pageSize = 10) {
  const headers = getBaseHeaders();

  return kuroPost<AnnListResp>(KURO_API.ANN_LIST, headers, {
    gameId: WAVES_GAME_ID,
    eventType,
    pageSize
  });
}

/** 公告详情 */
export function apiAnnDetail(postId: string) {
  const headers = getBaseHeaders();

  return kuroPost<AnnDetailResp>(KURO_API.ANN_DETAIL, headers, {
    postId,
    isOnlyPublisher: 1,
    showOrderType: 2
  });
}

/** 抽卡记录查询 (游戏服务器 API) */
export async function apiGachaLog(uid: string, cardPoolType: string, recordId = '0') {
  const isNet = parseInt(uid) >= 200000000;
  const url = isNet ? GACHA_API_NET : GACHA_API_CN;
  const serverId = getServerId(uid);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerId: uid,
        cardPoolType,
        serverId,
        languageCode: 'zh-Hans',
        recordId
      })
    });
    const json = (await resp.json()) as { code: number; message: string; data: GachaLogItem[] };

    return { success: json.code === 0, data: json.data ?? [], msg: json.message };
  } catch (err) {
    return { success: false, data: [] as GachaLogItem[], msg: String(err) };
  }
}

/** 资源统计 — 获取周期列表 */
export async function apiPeriodList(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);

  try {
    const resp = await fetch(`${KURO_API.PERIOD_LIST}?gameId=${WAVES_GAME_ID}&serverId=${getServerId(uid)}&roleId=${uid}`, {
      method: 'GET',
      headers
    });
    const json = (await resp.json()) as KuroApiResp<PeriodListResp>;

    return { ...json, success: json.code === 0 || json.code === 200 };
  } catch (err) {
    return { code: -999, msg: String(err), data: null, success: false };
  }
}

/** 资源统计 — 获取详情 (month/week/version) */
export async function apiPeriodDetail(uid: string, token: string, type: 'month' | 'week' | 'version', period: number) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);

  const urlMap = {
    month: KURO_API.PERIOD_MONTH,
    week: KURO_API.PERIOD_WEEK,
    version: KURO_API.PERIOD_VERSION
  };

  return kuroPost<PeriodDetailResp>(urlMap[type], headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid,
    period
  });
}

// ═══════════════════════════════════════
// 培养计算 API
// ═══════════════════════════════════════

/** 刷新计算器数据 */
export async function apiCalcRefresh(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);

  return kuroPost(KURO_API.CALC_REFRESH, headers, {
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 获取在线角色列表 (所有已上线角色) */
export function apiOnlineRoleList(token: string) {
  const headers = getBaseHeaders();

  headers['token'] = token;

  return kuroPost<OnlineRole[]>(KURO_API.CALC_ROLE_LIST, headers, {});
}

/** 获取已拥有角色信息 */
export async function apiOwnedRoleInfo(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);

  return kuroPost<OwnedRoleInfoResp>(KURO_API.CALC_OWNED_ROLE, headers, {
    serverId: getServerId(uid),
    roleId: uid
  });
}

/** 批量计算角色培养成本 */
export async function apiBatchRoleCost(uid: string, token: string, content: unknown[]) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid, true);

  Object.assign(headers, uh);

  return kuroPost<BatchRoleCostResp>(KURO_API.CALC_BATCH_COST, headers, {
    serverId: getServerId(uid),
    roleId: uid,
    content: JSON.stringify(content)
  });
}

// ═══════════════════════════════════════
// 持有率/激斗 API
// ═══════════════════════════════════════

/** 更多活动 (激斗/牌局) */
export async function apiMoreActivity(uid: string, token: string) {
  const headers = getBaseHeaders();
  const uh = await getUserHeaders(token, uid);

  Object.assign(headers, uh);

  return kuroPost<MoreActivityResp>(KURO_API.MORE_ACTIVITY, headers, {
    gameId: WAVES_GAME_ID,
    serverId: getServerId(uid),
    roleId: uid
  });
}

// ═══════════════════════════════════════
// Wiki API
// ═══════════════════════════════════════

/** Wiki 目录树 */
export function apiWikiTree(catalogueId: string) {
  const headers = getBaseHeaders();

  return kuroPost<unknown>(KURO_API.WIKI_TREE, headers, {
    gameId: WAVES_GAME_ID,
    catalogueId
  });
}

/** Wiki 条目详情 */
export function apiWikiEntryDetail(entryId: string) {
  const headers = getBaseHeaders();

  return kuroPost<unknown>(KURO_API.WIKI_ENTRY_DETAIL, headers, {
    entryId
  });
}

// ═══════════════════════════════════════
// Cookie 获取辅助
// ═══════════════════════════════════════

/** 获取用户自己的 cookie. 如果无效返回 null */
export async function getSelfCookie(uid: string, _userId: string): Promise<string | null> {
  // 确保公网 IP 已缓存 (首次调用时获取)
  await ensurePublicIp();
  console.log(`[getSelfCookie] publicIp=${_publicIp}, uid=${uid}`);

  const redis = getIoRedis();

  if (!redis) {
    console.log('[getSelfCookie] redis 未连接');

    return null;
  }

  const userJson = await redis.get(kuroKeys.userByUid(uid));

  if (!userJson) {
    console.log(`[getSelfCookie] redis 中未找到 uid=${uid} 的数据`);

    return null;
  }

  try {
    const user = JSON.parse(userJson);

    console.log(
      `[getSelfCookie] user: cookie=${user.cookie ? '***' + user.cookie.slice(-10) : 'null'}, did=${user.did}, bat=${user.bat ? '***' + user.bat.slice(-10) : 'null'}`
    );

    if (!user.cookie) {
      return null;
    }

    // bat 为空时主动获取
    if (!user.bat && user.did) {
      console.log('[getSelfCookie] bat 为空, 主动获取...');
      const tokenResp = await apiRequestToken(uid, user.cookie, user.did);

      console.log(
        `[getSelfCookie] requestToken: code=${tokenResp.code}, msg=${tokenResp.msg}, success=${tokenResp.success}, data=${JSON.stringify(tokenResp.data)}`
      );

      if (tokenResp.success && tokenResp.data?.accessToken) {
        user.bat = tokenResp.data.accessToken;
        await redis.set(kuroKeys.userByUid(uid), JSON.stringify(user), 'EX', 86400 * 90);
        console.log(`[getSelfCookie] bat 已更新: ***${user.bat.slice(-10)}`);
      }
    }

    // 校验登录状态
    const logResp = await apiLoginLog(uid, user.cookie);

    console.log(`[getSelfCookie] loginLog: code=${logResp.code}, msg=${logResp.msg}, success=${logResp.success}`);

    if (!logResp.success) {
      // code 220 = Token 真正过期
      if (logResp.code === 220) {
        return null;
      }

      // 服务器维护，跳过验证
      if (logResp.code === 999 || logResp.msg?.includes('维护')) {
        return user.cookie;
      }

      // 其他错误 (网络/限流等)，不代表 Token 失效，继续尝试
    }

    // 刷新数据
    const refreshResp = await apiRefresh(uid, user.cookie);

    console.log(`[getSelfCookie] refresh: code=${refreshResp.code}, msg=${refreshResp.msg}, success=${refreshResp.success}`);

    if (!refreshResp.success) {
      // 服务器维护，跳过刷新
      if (refreshResp.code === 999 || refreshResp.msg?.includes('维护')) {
        return user.cookie;
      }

      // bat 失效 => 尝试刷新 (10903=数据令牌已失效, 10900=角色查询失败也可能是bat问题)
      if ((refreshResp.code === 10903 || refreshResp.code === 10900) && user.did) {
        console.log('[getSelfCookie] bat 失效, 尝试刷新 bat...');
        const tokenResp = await apiRequestToken(uid, user.cookie, user.did);

        console.log(
          `[getSelfCookie] requestToken: code=${tokenResp.code}, msg=${tokenResp.msg}, success=${tokenResp.success}, data=${JSON.stringify(tokenResp.data)}`
        );

        if (tokenResp.success && tokenResp.data?.accessToken) {
          user.bat = tokenResp.data.accessToken;
          await redis.set(kuroKeys.userByUid(uid), JSON.stringify(user), 'EX', 86400 * 90);

          // 用新 bat 重试 refresh
          const retryResp = await apiRefresh(uid, user.cookie);

          console.log(`[getSelfCookie] refresh retry: code=${retryResp.code}, msg=${retryResp.msg}, success=${retryResp.success}`);

          return user.cookie;
        }
      }

      // 非 Token 过期的刷新失败，乐观返回 cookie，让实际查询决定是否可用
      if (refreshResp.code !== 220) {
        console.log('[getSelfCookie] 刷新失败但非220, 乐观返回 cookie');

        return user.cookie;
      }

      return null;
    }

    console.log('[getSelfCookie] 一切正常, 返回 cookie');

    return user.cookie;
  } catch (e) {
    console.log(`[getSelfCookie] 异常: ${e}`);

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
