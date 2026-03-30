import { getIoRedis } from '@alemonjs/db';
import { WAVES_GAME_ID, KURO_API, KURO_VERSION, GACHA_API_NET, GACHA_API_CN, NET_SERVER_ID_MAP, SERVER_ID_NET, SERVER_ID, IOS_USER_AGENT, ANDROID_USER_AGENT } from '../constants/kuro.js';
import { kuroKeys } from './keys.js';

function randomSource() {
    return Math.random() > 0.5 ? 'ios' : 'android';
}
let _publicIp = '';
async function ensurePublicIp() {
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
    }
    catch { }
    try {
        const resp = await fetch('https://api.ipify.org/?format=json', { signal: AbortSignal.timeout(4000) });
        const data = (await resp.json());
        if (data.ip) {
            _publicIp = data.ip;
            return _publicIp;
        }
    }
    catch { }
    _publicIp = '127.127.127.127';
    return _publicIp;
}
function getBaseHeaders() {
    const source = randomSource();
    const ua = source === 'ios' ? IOS_USER_AGENT : ANDROID_USER_AGENT;
    return {
        source,
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'User-Agent': ua,
        devCode: `${_publicIp || '127.127.127.127'}, ${ua}`
    };
}
function getServerId(roleId, serverId) {
    const id = parseInt(roleId);
    if (id >= 200000000) {
        const prefix = Math.floor(id / 100000000);
        return NET_SERVER_ID_MAP[prefix] ?? SERVER_ID_NET;
    }
    return SERVER_ID;
}
function formBody(data) {
    return Object.entries(data)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
}
async function kuroPost(url, headers, data) {
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
        const json = (await resp.json());
        if (typeof json.data === 'string') {
            try {
                json.data = JSON.parse(json.data);
            }
            catch { }
        }
        console.log(`[kuroPost] <<< ${url} code=${json.code} msg=${json.msg}`);
        if (url.includes('requestToken')) {
            console.log('[kuroPost] <<< requestToken data:', JSON.stringify(json.data));
        }
        return {
            ...json,
            success: json.code === 0 || json.code === 200
        };
    }
    catch (err) {
        console.log(`[kuroPost] !!! ${url} error: ${err}`);
        return { code: -999, msg: String(err), data: null, success: false };
    }
}
async function getUserHeaders(token, uid, needToken = false) {
    const headers = { did: '', 'b-at': '' };
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
        }
        catch { }
    }
    return headers;
}
function apiLogin(mobile, code, did) {
    const headers = getBaseHeaders();
    headers['devCode'] = did;
    return kuroPost(KURO_API.LOGIN, headers, {
        mobile,
        code
    });
}
async function apiLoginLog(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    headers['token'] = token;
    headers['devCode'] = uh['did'] || '';
    headers['version'] = KURO_VERSION;
    return kuroPost(KURO_API.LOGIN_LOG, headers, {});
}
function apiRoleList(token, did, gameId = WAVES_GAME_ID) {
    const headers = getBaseHeaders();
    headers['token'] = token;
    headers['devCode'] = did;
    return kuroPost(KURO_API.ROLE_LIST, headers, { gameId });
}
async function apiRefresh(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.REFRESH, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
function apiRequestToken(uid, token, did) {
    const headers = getBaseHeaders();
    headers['token'] = token;
    headers['did'] = did;
    headers['b-at'] = '';
    return kuroPost(KURO_API.REQUEST_TOKEN, headers, {
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiDailyInfo(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.GAME_DATA, headers, {
        type: '2',
        sizeType: '1',
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiBaseInfo(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.BASE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiRoleData(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.ROLE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiExploreData(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.EXPLORE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid,
        countryCode: '1'
    });
}
async function apiSignInit(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    headers['devcode'] = '';
    return kuroPost(KURO_API.SIGN_INIT, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiSignIn(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.SIGN_IN, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiTowerDetail(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.TOWER_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiChallengeDetail(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CHALLENGE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiSlashDetail(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.SLASH_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiMatrixDetail(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.MATRIX_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiRoleDetail(uid, token, roleId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.ROLE_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid,
        id: roleId
    });
}
async function apiCalabashData(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CALABASH_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
function apiMineV2(token) {
    const headers = getBaseHeaders();
    headers['token'] = token;
    return kuroPost(KURO_API.MINE_V2, headers, {});
}
function apiWikiHome() {
    const headers = getBaseHeaders();
    headers.source = 'h5';
    headers.version = KURO_VERSION;
    headers.wiki_type = '9';
    return kuroPost(KURO_API.WIKI_HOME, headers, {});
}
function apiAnnList(eventType = '1', pageSize = 10) {
    const headers = getBaseHeaders();
    return kuroPost(KURO_API.ANN_LIST, headers, {
        gameId: WAVES_GAME_ID,
        eventType,
        pageSize
    });
}
function apiAnnDetail(postId) {
    const headers = getBaseHeaders();
    return kuroPost(KURO_API.ANN_DETAIL, headers, {
        postId,
        isOnlyPublisher: 1,
        showOrderType: 2
    });
}
async function apiGachaLog(uid, cardPoolType, recordId = '0') {
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
        const json = (await resp.json());
        return { success: json.code === 0, data: json.data ?? [], msg: json.message };
    }
    catch (err) {
        return { success: false, data: [], msg: String(err) };
    }
}
async function apiPeriodList(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    try {
        const resp = await fetch(`${KURO_API.PERIOD_LIST}?gameId=${WAVES_GAME_ID}&serverId=${getServerId(uid)}&roleId=${uid}`, {
            method: 'GET',
            headers
        });
        const json = (await resp.json());
        return { ...json, success: json.code === 0 || json.code === 200 };
    }
    catch (err) {
        return { code: -999, msg: String(err), data: null, success: false };
    }
}
async function apiPeriodDetail(uid, token, type, period) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    const urlMap = {
        month: KURO_API.PERIOD_MONTH,
        week: KURO_API.PERIOD_WEEK,
        version: KURO_API.PERIOD_VERSION
    };
    return kuroPost(urlMap[type], headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid,
        period
    });
}
async function apiCalcRefresh(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CALC_REFRESH, headers, {
        serverId: getServerId(uid),
        roleId: uid
    });
}
function apiOnlineRoleList(token) {
    const headers = getBaseHeaders();
    headers['token'] = token;
    return kuroPost(KURO_API.CALC_ROLE_LIST, headers, {});
}
async function apiOwnedRoleInfo(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CALC_OWNED_ROLE, headers, {
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiBatchRoleCost(uid, token, content) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CALC_BATCH_COST, headers, {
        serverId: getServerId(uid),
        roleId: uid,
        content: JSON.stringify(content)
    });
}
async function apiMoreActivity(uid, token) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.MORE_ACTIVITY, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
function apiWikiTree(catalogueId) {
    const headers = getBaseHeaders();
    return kuroPost(KURO_API.WIKI_TREE, headers, {
        gameId: WAVES_GAME_ID,
        catalogueId
    });
}
function apiWikiEntryDetail(entryId) {
    const headers = getBaseHeaders();
    return kuroPost(KURO_API.WIKI_ENTRY_DETAIL, headers, {
        entryId
    });
}
async function getSelfCookie(uid, _userId) {
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
        console.log(`[getSelfCookie] user: cookie=${user.cookie ? '***' + user.cookie.slice(-10) : 'null'}, did=${user.did}, bat=${user.bat ? '***' + user.bat.slice(-10) : 'null'}`);
        if (!user.cookie) {
            return null;
        }
        if (!user.bat && user.did) {
            console.log('[getSelfCookie] bat 为空, 主动获取...');
            const tokenResp = await apiRequestToken(uid, user.cookie, user.did);
            console.log(`[getSelfCookie] requestToken: code=${tokenResp.code}, msg=${tokenResp.msg}, success=${tokenResp.success}, data=${JSON.stringify(tokenResp.data)}`);
            if (tokenResp.success && tokenResp.data?.accessToken) {
                user.bat = tokenResp.data.accessToken;
                await redis.set(kuroKeys.userByUid(uid), JSON.stringify(user), 'EX', 86400 * 90);
                console.log(`[getSelfCookie] bat 已更新: ***${user.bat.slice(-10)}`);
            }
        }
        const logResp = await apiLoginLog(uid, user.cookie);
        console.log(`[getSelfCookie] loginLog: code=${logResp.code}, msg=${logResp.msg}, success=${logResp.success}`);
        if (!logResp.success) {
            if (logResp.code === 220) {
                return null;
            }
            if (logResp.code === 999 || logResp.msg?.includes('维护')) {
                return user.cookie;
            }
        }
        const refreshResp = await apiRefresh(uid, user.cookie);
        console.log(`[getSelfCookie] refresh: code=${refreshResp.code}, msg=${refreshResp.msg}, success=${refreshResp.success}`);
        if (!refreshResp.success) {
            if (refreshResp.code === 999 || refreshResp.msg?.includes('维护')) {
                return user.cookie;
            }
            if ((refreshResp.code === 10903 || refreshResp.code === 10900) && user.did) {
                console.log('[getSelfCookie] bat 失效, 尝试刷新 bat...');
                const tokenResp = await apiRequestToken(uid, user.cookie, user.did);
                console.log(`[getSelfCookie] requestToken: code=${tokenResp.code}, msg=${tokenResp.msg}, success=${tokenResp.success}, data=${JSON.stringify(tokenResp.data)}`);
                if (tokenResp.success && tokenResp.data?.accessToken) {
                    user.bat = tokenResp.data.accessToken;
                    await redis.set(kuroKeys.userByUid(uid), JSON.stringify(user), 'EX', 86400 * 90);
                    const retryResp = await apiRefresh(uid, user.cookie);
                    console.log(`[getSelfCookie] refresh retry: code=${retryResp.code}, msg=${retryResp.msg}, success=${retryResp.success}`);
                    return user.cookie;
                }
            }
            if (refreshResp.code !== 220) {
                console.log('[getSelfCookie] 刷新失败但非220, 乐观返回 cookie');
                return user.cookie;
            }
            return null;
        }
        console.log('[getSelfCookie] 一切正常, 返回 cookie');
        return user.cookie;
    }
    catch (e) {
        console.log(`[getSelfCookie] 异常: ${e}`);
        return null;
    }
}
async function getCookie(uid, userId) {
    const ck = await getSelfCookie(uid);
    if (ck) {
        return { isSelf: true, cookie: ck };
    }
    return null;
}

export { apiAnnDetail, apiAnnList, apiBaseInfo, apiBatchRoleCost, apiCalabashData, apiCalcRefresh, apiChallengeDetail, apiDailyInfo, apiExploreData, apiGachaLog, apiLogin, apiLoginLog, apiMatrixDetail, apiMineV2, apiMoreActivity, apiOnlineRoleList, apiOwnedRoleInfo, apiPeriodDetail, apiPeriodList, apiRefresh, apiRequestToken, apiRoleData, apiRoleDetail, apiRoleList, apiSignIn, apiSignInit, apiSlashDetail, apiTowerDetail, apiWikiEntryDetail, apiWikiHome, apiWikiTree, getCookie, getSelfCookie };
