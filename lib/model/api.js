import { getIoRedis } from '@alemonjs/db';
import { WAVES_GAME_ID, KURO_API, KURO_VERSION, NET_SERVER_ID_MAP, SERVER_ID_NET, SERVER_ID, IOS_USER_AGENT, ANDROID_USER_AGENT, GACHA_API_NET, GACHA_API_CN } from '../constants/kuro.js';
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
        const resp = await fetch(url, {
            method: 'POST',
            headers,
            body,
            signal: AbortSignal.timeout(10000)
        });
        const json = (await resp.json());
        if (typeof json.data === 'string') {
            try {
                json.data = JSON.parse(json.data);
            }
            catch { }
        }
        return {
            ...json,
            success: json.code === 0 || json.code === 200 || ((json.code === undefined || json.code === null) && json.success === true)
        };
    }
    catch (err) {
        return { code: -999, msg: String(err), data: null, success: false };
    }
}
async function getUserHeaders(token, uid, userId, needToken = false) {
    const headers = { did: '', 'b-at': '' };
    if (needToken) {
        headers['token'] = token;
    }
    const redis = getIoRedis();
    if (!redis) {
        return headers;
    }
    const userJson = await redis.get(kuroKeys.userByUid(uid, userId));
    if (userJson) {
        try {
            const user = JSON.parse(userJson);
            if (user.cookie !== token) {
                return headers;
            }
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
        code,
        devCode: did
    });
}
function apiSendSms(mobile, geeTestData, did) {
    const headers = getBaseHeaders();
    headers.source = 'h5';
    headers.devCode = did;
    return kuroPost(KURO_API.SMS_CODE, headers, { mobile, geeTestData });
}
async function apiLoginLog(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
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
async function apiRefresh(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
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
async function apiDailyInfo(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.GAME_DATA, headers, {
        type: '2',
        sizeType: '1',
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiBaseInfo(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.BASE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiRoleData(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.ROLE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiExploreData(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.EXPLORE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid,
        countryCode: '1'
    });
}
async function apiSignInit(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
    Object.assign(headers, uh);
    headers['devcode'] = '';
    return kuroPost(KURO_API.SIGN_INIT, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiSignIn(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.SIGN_IN, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiTowerDetail(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.TOWER_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiChallengeDetail(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CHALLENGE_DATA, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiSlashDetail(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.SLASH_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiMatrixDetail(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.MATRIX_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiRoleDetail(uid, token, userId, roleId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.ROLE_DETAIL, headers, {
        gameId: WAVES_GAME_ID,
        serverId: getServerId(uid),
        roleId: uid,
        id: roleId
    });
}
async function apiCalabashData(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
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
async function apiPeriodList(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
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
async function apiPeriodDetail(uid, token, userId, type, period) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
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
async function apiCalcRefresh(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
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
async function apiOwnedRoleInfo(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CALC_OWNED_ROLE, headers, {
        serverId: getServerId(uid),
        roleId: uid
    });
}
async function apiBatchRoleCost(uid, token, userId, content) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId, true);
    Object.assign(headers, uh);
    return kuroPost(KURO_API.CALC_BATCH_COST, headers, {
        serverId: getServerId(uid),
        roleId: uid,
        content: JSON.stringify(content)
    });
}
async function apiMoreActivity(uid, token, userId) {
    const headers = getBaseHeaders();
    const uh = await getUserHeaders(token, uid, userId);
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
async function getSelfCookie(uid, userId) {
    const redis = getIoRedis();
    if (!redis) {
        return null;
    }
    const userJson = await redis.get(kuroKeys.userByUid(uid, userId));
    if (!userJson) {
        return null;
    }
    try {
        const user = JSON.parse(userJson);
        if (!user.cookie) {
            return null;
        }
        await ensurePublicIp();
        if (!user.bat && user.did) {
            const tokenResp = await apiRequestToken(uid, user.cookie, user.did);
            if (tokenResp.success && tokenResp.data?.accessToken) {
                user.bat = tokenResp.data.accessToken;
                await redis.set(kuroKeys.userByUid(uid, userId), JSON.stringify(user), 'EX', 86400 * 90, 'XX');
            }
        }
        const logResp = await apiLoginLog(uid, user.cookie, userId);
        if (!logResp.success) {
            if (logResp.code === 220) {
                return null;
            }
            if (logResp.code === 999 || logResp.msg?.includes('维护')) {
                return user.cookie;
            }
        }
        const refreshResp = await apiRefresh(uid, user.cookie, userId);
        if (!refreshResp.success) {
            if (refreshResp.code === 999 || refreshResp.msg?.includes('维护')) {
                return user.cookie;
            }
            if ((refreshResp.code === 10903 || refreshResp.code === 10900) && user.did) {
                const tokenResp = await apiRequestToken(uid, user.cookie, user.did);
                if (tokenResp.success && tokenResp.data?.accessToken) {
                    user.bat = tokenResp.data.accessToken;
                    await redis.set(kuroKeys.userByUid(uid, userId), JSON.stringify(user), 'EX', 86400 * 90, 'XX');
                    await apiRefresh(uid, user.cookie, userId);
                    return user.cookie;
                }
            }
            if (refreshResp.code !== 220) {
                return user.cookie;
            }
            return null;
        }
        return user.cookie;
    }
    catch {
        return null;
    }
}
async function getCookie(uid, userId) {
    const ck = await getSelfCookie(uid, userId);
    if (ck) {
        return { isSelf: true, cookie: ck };
    }
    return null;
}

export { apiAnnDetail, apiAnnList, apiBaseInfo, apiBatchRoleCost, apiCalabashData, apiCalcRefresh, apiChallengeDetail, apiDailyInfo, apiExploreData, apiGachaLog, apiLogin, apiLoginLog, apiMatrixDetail, apiMineV2, apiMoreActivity, apiOnlineRoleList, apiOwnedRoleInfo, apiPeriodDetail, apiPeriodList, apiRefresh, apiRequestToken, apiRoleData, apiRoleDetail, apiRoleList, apiSendSms, apiSignIn, apiSignInit, apiSlashDetail, apiTowerDetail, apiWikiEntryDetail, apiWikiHome, apiWikiTree, getCookie, getSelfCookie };
