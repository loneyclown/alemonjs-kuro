export const wuwaRouteRules = {
  /** 帮助 */
  help: /^(?:!|！|\/|#|＃)(鸣潮|wuwa|mc)(帮助|help)$/,
  /** 登录 */
  login: /^(?:!|！|\/|#|＃)(登录|登陆|登入|login|dl)(.*)$/,
  /** 绑定特征码 */
  bind: /^(?:!|！|\/|#|＃)(?:鸣潮|wuwa|mc)?(绑定|切换|解绑|删除|查看|我的)(?:特征码|uid)?(.*)$/,
  /** 添加/删除/获取 token */
  token: /^(?:!|！|\/|#|＃)(添加|删除|获取)(token|Token|TOKEN|ck|CK)(.*)$/,
  /** 每日/体力 */
  stamina: /^(?:!|！|\/|#|＃)(每日|mr|实时便笺|便笺|便签|体力)$/,
  /** 查询/卡片 */
  roleinfo: /^(?:!|！|\/|#|＃)(查询|卡片|kp)$/,
  /** 探索度 */
  explore: /^(?:!|！|\/|#|＃)(ts|探索|探索度)$/,
  /** 签到 */
  sign: /^(?:!|！|\/|#|＃)(签到日历|签到记录|签到|qdjl|qd)$/,
  /** 深塔 */
  tower: /^(?:!|！|\/|#|＃)(深塔|逆境深塔|st)$/,
  /** 全息战略 */
  challenge: /^(?:!|！|\/|#|＃)(全息|全息战略|qx)$/,
  /** 冥歌海墟 */
  slash: /^(?:!|！|\/|#|＃)(冥海|冥歌海墟|无尽|禁忌海域|hx)$/,
  /** 终焉矩阵 */
  matrix: /^(?:!|！|\/|#|＃)(矩阵|终焉矩阵|jz|奇点扩张|稳态协议)$/,
  /** 练度统计 */
  charlist: /^(?:!|！|\/|#|＃)(练度|练度统计|ld)$/,
  /** 库洛币 */
  coin: /^(?:!|！|\/|#|＃)(库洛币|库币|coin)$/,
  /** 公告 */
  announce: /^(?:!|！|\/|#|＃)(公告)(.*)?$/,
  /** 兑换码 */
  code: /^(?:!|！|\/|#|＃)(兑换码|code)$/,
  /** 抽卡记录 */
  gacha: /^(?:!|！|\/|#|＃)(抽卡记录|抽卡|ck|chou)$/,
  /** 声骸列表 */
  echoList: /^(?:!|！|\/|#|＃)(声骸列表|声骸|sg)$/,
  /** 数据坞 */
  calabash: /^(?:!|！|\/|#|＃)(数据坞|声骸坞|swu)$/,
  /** 星声统计 */
  period: /^(?:!|！|\/|#|＃)(星声|星声统计|资源统计|xx)(.*)$/,
  /** 日历 */
  calendar: /^(?:!|！|\/|#|＃)(日历|活动日历|rl)$/,
  /** 卡池 */
  pool: /^(?:!|！|\/|#|＃)(卡池|当前卡池|kc)$/,
  /** 刷新面板 */
  refresh: /^(?:!|！|\/|#|＃)(刷新面板|刷新)$/,
  /** 角色培养 */
  develop: /^(?:!|！|\/|#|＃)(.*)(养成|培养|yc)(.*)$/,
  /** 激斗/牌局 */
  poker: /^(?:!|！|\/|#|＃)(poker|牌局|扑克|激斗|打牌)$/,
  /** 排行 */
  rank: /^(?:!|！|\/|#|＃)(练度排行|群排行|ldph|ldpm)$/,
  /** Wiki/攻略 */
  wiki: /^(?:!|！|\/|#|＃)(.*)(wiki|攻略|gl|技能|jn|共鸣链|gml|命座|回路|机制|jz|图鉴)$/
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
  /** 全息战略索引 */
  CHALLENGE_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/challengeIndex`,
  /** 冥歌海墟索引 */
  SLASH_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/slashIndex`,
  /** 冥歌海墟详情 */
  SLASH_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/slashDetail`,
  /** 终焉矩阵索引 */
  MATRIX_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/newTowerIndex`,
  /** 终焉矩阵详情 */
  MATRIX_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/newTowerDetail`,
  /** 用户信息 */
  MINE_V2: `${KURO_BASE_URL}/user/mineV2`,
  /** 公告列表 */
  ANN_LIST: `${KURO_BASE_URL}/forum/companyEvent/findEventList`,
  /** 公告详情 */
  ANN_DETAIL: `${KURO_BASE_URL}/forum/getPostDetail`,
  /** 角色养成 — 刷新计算器 */
  CALC_REFRESH: `${KURO_BASE_URL}/aki/calculator/refreshData`,
  /** 角色养成 — 角色列表 */
  CALC_ROLE_LIST: `${KURO_BASE_URL}/aki/calculator/listRole`,
  /** 角色养成 — 已拥有角色 */
  CALC_OWNED_ROLE: `${KURO_BASE_URL}/aki/calculator/ownedRole/roleInfo`,
  /** 角色养成 — 培养状态 */
  CALC_CULTIVATE: `${KURO_BASE_URL}/aki/calculator/roleCultivateStatus`,
  /** 角色养成 — 批量计算成本 */
  CALC_BATCH_COST: `${KURO_BASE_URL}/aki/calculator/batchRoleCost`,
  /** 资源统计 — 周期列表 */
  PERIOD_LIST: `${KURO_BASE_URL}/aki/resource/period/list`,
  /** 资源统计 — 月报 */
  PERIOD_MONTH: `${KURO_BASE_URL}/aki/resource/month`,
  /** 资源统计 — 周报 */
  PERIOD_WEEK: `${KURO_BASE_URL}/aki/resource/week`,
  /** 资源统计 — 版本报告 */
  PERIOD_VERSION: `${KURO_BASE_URL}/aki/resource/version`,
  /** Wiki 主页 */
  WIKI_HOME: `${KURO_BASE_URL}/wiki/core/homepage/getPage`,
  /** Wiki 目录树 */
  WIKI_TREE: `${KURO_BASE_URL}/wiki/core/catalogue/config/getTree`,
  /** Wiki 条目详情 */
  WIKI_ENTRY_DETAIL: `${KURO_BASE_URL}/wiki/core/catalogue/item/getEntryDetail`,
  /** 更多活动 (激斗/牌局) */
  MORE_ACTIVITY: `${KURO_BASE_URL}/aki/roleBox/akiBox/moreActivity`
} as const;

/** 抽卡记录 API (游戏服务器) */
export const GACHA_API_CN = 'https://gmserver-api.aki-game2.com/gacha/record/query';
export const GACHA_API_NET = 'https://gmserver-api.aki-game2.net/gacha/record/query';

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
