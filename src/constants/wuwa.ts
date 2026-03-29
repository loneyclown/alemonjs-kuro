/** 鸣潮 指令前缀 */
const P = '(?:!|！|\\/|#|＃)';

export const wuwaRouteRules = {
  /** 帮助 */
  help: new RegExp(`^${P}(鸣潮|wuwa|mc)(帮助|help)$`),
  /** 登录 */
  login: new RegExp(`^${P}(登录|登陆|登入|login|dl)(.*)$`),
  /** 绑定特征码 */
  bind: new RegExp(`^${P}(绑定|切换|解绑|删除|查看|我的)(特征码|uid)(.*)$`),
  /** 添加/删除/获取 token */
  token: new RegExp(`^${P}(添加|删除|获取)(token|Token|TOKEN|ck|CK)(.*)$`),
  /** 每日/体力 */
  stamina: new RegExp(`^${P}(每日|mr|实时便笺|便笺|便签|体力)$`),
  /** 查询/卡片 */
  roleinfo: new RegExp(`^${P}(查询|卡片|kp)$`),
  /** 探索度 */
  explore: new RegExp(`^${P}(ts|探索|探索度)$`),
  /** 签到 */
  sign: new RegExp(`^${P}(签到日历|签到记录|签到|qdjl|qd)$`),
  /** 深塔 */
  tower: new RegExp(`^${P}(深塔|逆境深塔)$`),
  /** 刷新面板 */
  refresh: new RegExp(`^${P}(刷新面板|刷新)$`)
} as const;

// ═══════════════════════════════════════
// Kuro API 常量
// ═══════════════════════════════════════

export const WAVES_GAME_ID = 3;

/** 国服 serverId */
export const SERVER_ID = '76402e5b20be2c39f095a152090afddc';
/** 国际服默认 serverId */
export const SERVER_ID_NET = '919752ae5ea09c1ced910dd668a63ffb';

/** 国际服 serverId 映射 */
export const NET_SERVER_ID_MAP: Record<number, string> = {
  5: '591d6af3a3090d8ea00d8f86cf6d7501',
  6: '6eb2a235b30d05efd77bedb5cf60999e',
  7: '86d52186155b148b5c138ceb41be9650',
  8: '919752ae5ea09c1ced910dd668a63ffb',
  9: '10cd7254d57e58ae560b15d51e34b4c'
};

export const KURO_BASE_URL = 'https://api.kurobbs.com';

/** Kuro API 路径 */
export const KURO_API = {
  /** 登录 (手机+验证码) */
  LOGIN: `${KURO_BASE_URL}/user/sdkLogin`,
  /** 登录校验 */
  LOGIN_LOG: `${KURO_BASE_URL}/user/login/log`,
  /** 获取角色列表 */
  ROLE_LIST: `${KURO_BASE_URL}/gamer/role/list`,
  /** 刷新数据 (查询前必须调) */
  REFRESH: `${KURO_BASE_URL}/aki/roleBox/akiBox/refreshData`,
  /** 请求 accessToken */
  REQUEST_TOKEN: `${KURO_BASE_URL}/aki/roleBox/requestToken`,
  /** 每日/体力 (widget) */
  GAME_DATA: `${KURO_BASE_URL}/gamer/widget/game3/getData`,
  /** 基本资料 */
  BASE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/baseData`,
  /** 角色列表 */
  ROLE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/roleData`,
  /** 角色详情 */
  ROLE_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/getRoleDetail`,
  /** 数据坞 */
  CALABASH_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/calabashData`,
  /** 探索度 */
  EXPLORE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/exploreIndex`,
  /** 签到初始化 */
  SIGN_INIT: `${KURO_BASE_URL}/encourage/signIn/initSignInV2`,
  /** 签到 */
  SIGN_IN: `${KURO_BASE_URL}/encourage/signIn/v2`,
  /** 深塔索引 */
  TOWER_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/towerIndex`,
  /** 深塔详情 */
  TOWER_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/towerDataDetail`,
  /** 全息战略 */
  CHALLENGE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/challengeDetails`,
  /** 用户信息 */
  MINE_V2: `${KURO_BASE_URL}/user/mineV2`
} as const;

/** 请求头常量 */
export const KURO_VERSION = '3.0.0';
export const IOS_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) KuroGameBox/3.0.0';
export const ANDROID_USER_AGENT =
  'Mozilla/5.0 (Linux; Android 16; 25098PN5AC Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/143.0.7499.34 Mobile Safari/537.36 Kuro/3.0.0 KuroGameBox/3.0.0';

/** 鸣潮声骸元素色彩 */
export const WAVES_ECHO_COLORS: Record<string, string> = {
  凝夜白霜: '#3598db',
  熔山裂谷: '#ba372a',
  彻空冥雷: '#b96ad9',
  啸谷长风: '#169179',
  浮星祛暗: '#e6bf2e',
  沉日劫明: '#d97a24',
  隐世回光: '#48c4d8',
  轻云出月: '#aab8c2',
  不绝余音: '#e64980'
};
