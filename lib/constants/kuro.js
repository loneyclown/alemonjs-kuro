const routeRules = {
    help: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(帮助|help)$/,
    login: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(登录|登陆|登入|login|dl)(.*)$/,
    bind: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(绑定|切换|解绑|删除|查看|我的)(?:特征码|uid)?(.*)$/,
    token: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(添加|删除|获取)(token|Token|TOKEN|ck|CK)(.*)$/,
    stamina: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(每日|mr|实时便笺|便笺|便签|体力)$/,
    roleinfo: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(查询|卡片|kp)$/,
    explore: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(ts|探索|探索度)$/,
    sign: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(签到日历|签到记录|签到|qdjl|qd)$/,
    tower: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(深塔|逆境深塔|st)$/,
    challenge: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(全息|全息战略|qx)$/,
    slash: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(冥海|冥歌海墟|无尽|禁忌海域|hx)$/,
    matrix: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(矩阵|终焉矩阵|jz|奇点扩张|稳态协议)$/,
    charlist: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(练度|练度统计|ld)$/,
    coin: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(库洛币|库币|coin)$/,
    announce: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(公告)(.*)?$/,
    code: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(兑换码|code)$/,
    gacha: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(抽卡记录|抽卡|ck|chou)$/,
    echoList: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(声骸列表|声骸|sg)$/,
    calabash: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(数据坞|声骸坞|swu)$/,
    period: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(星声|星声统计|资源统计|xx)(.*)$/,
    calendar: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(日历|活动日历|rl)$/,
    pool: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(卡池|当前卡池|kc)$/,
    refresh: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(刷新面板|刷新)$/,
    develop: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(.*)(养成|培养|yc)(.*)$/,
    poker: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(poker|牌局|扑克|激斗|打牌)$/,
    rank: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(练度排行|群排行|ldph|ldpm)$/,
    wiki: /^(?:!|！|\/|#|＃)(?:库洛|kuro|mc|鸣潮)(.*)(wiki|攻略|gl|技能|jn|共鸣链|gml|命座|回路|机制|jz|图鉴)$/
};
const WAVES_GAME_ID = 3;
const SERVER_ID = '76402e5b20be2c39f095a152090afddc';
const SERVER_ID_NET = '919752ae5ea09c1ced910dd668a63ffb';
const NET_SERVER_ID_MAP = {
    5: '591d6af3a3090d8ea00d8f86cf6d7501',
    6: '6eb2a235b30d05efd77bedb5cf60999e',
    7: '86d52186155b148b5c138ceb41be9650',
    8: '919752ae5ea09c1ced910dd668a63ffb',
    9: '10cd7254d57e58ae560b15d51e34b4c'
};
const KURO_BASE_URL = 'https://api.kurobbs.com';
const KURO_API = {
    LOGIN: `${KURO_BASE_URL}/user/sdkLogin`,
    LOGIN_LOG: `${KURO_BASE_URL}/user/login/log`,
    ROLE_LIST: `${KURO_BASE_URL}/gamer/role/list`,
    REFRESH: `${KURO_BASE_URL}/aki/roleBox/akiBox/refreshData`,
    REQUEST_TOKEN: `${KURO_BASE_URL}/aki/roleBox/requestToken`,
    GAME_DATA: `${KURO_BASE_URL}/gamer/widget/game3/getData`,
    BASE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/baseData`,
    ROLE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/roleData`,
    ROLE_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/getRoleDetail`,
    CALABASH_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/calabashData`,
    EXPLORE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/exploreIndex`,
    SIGN_INIT: `${KURO_BASE_URL}/encourage/signIn/initSignInV2`,
    SIGN_IN: `${KURO_BASE_URL}/encourage/signIn/v2`,
    TOWER_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/towerIndex`,
    TOWER_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/towerDataDetail`,
    CHALLENGE_DATA: `${KURO_BASE_URL}/aki/roleBox/akiBox/challengeDetails`,
    CHALLENGE_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/challengeIndex`,
    SLASH_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/slashIndex`,
    SLASH_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/slashDetail`,
    MATRIX_INDEX: `${KURO_BASE_URL}/aki/roleBox/akiBox/newTowerIndex`,
    MATRIX_DETAIL: `${KURO_BASE_URL}/aki/roleBox/akiBox/newTowerDetail`,
    MINE_V2: `${KURO_BASE_URL}/user/mineV2`,
    ANN_LIST: `${KURO_BASE_URL}/forum/companyEvent/findEventList`,
    ANN_DETAIL: `${KURO_BASE_URL}/forum/getPostDetail`,
    CALC_REFRESH: `${KURO_BASE_URL}/aki/calculator/refreshData`,
    CALC_ROLE_LIST: `${KURO_BASE_URL}/aki/calculator/listRole`,
    CALC_OWNED_ROLE: `${KURO_BASE_URL}/aki/calculator/ownedRole/roleInfo`,
    CALC_CULTIVATE: `${KURO_BASE_URL}/aki/calculator/roleCultivateStatus`,
    CALC_BATCH_COST: `${KURO_BASE_URL}/aki/calculator/batchRoleCost`,
    PERIOD_LIST: `${KURO_BASE_URL}/aki/resource/period/list`,
    PERIOD_MONTH: `${KURO_BASE_URL}/aki/resource/month`,
    PERIOD_WEEK: `${KURO_BASE_URL}/aki/resource/week`,
    PERIOD_VERSION: `${KURO_BASE_URL}/aki/resource/version`,
    WIKI_HOME: `${KURO_BASE_URL}/wiki/core/homepage/getPage`,
    WIKI_TREE: `${KURO_BASE_URL}/wiki/core/catalogue/config/getTree`,
    WIKI_ENTRY_DETAIL: `${KURO_BASE_URL}/wiki/core/catalogue/item/getEntryDetail`,
    MORE_ACTIVITY: `${KURO_BASE_URL}/aki/roleBox/akiBox/moreActivity`
};
const GACHA_API_CN = 'https://gmserver-api.aki-game2.com/gacha/record/query';
const GACHA_API_NET = 'https://gmserver-api.aki-game2.net/gacha/record/query';
const KURO_VERSION = '3.0.0';
const IOS_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) KuroGameBox/3.0.0';
const ANDROID_USER_AGENT = 'Mozilla/5.0 (Linux; Android 16; 25098PN5AC Build/BP2A.250605.031.A3; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/143.0.7499.34 Mobile Safari/537.36 Kuro/3.0.0 KuroGameBox/3.0.0';
const WAVES_ECHO_COLORS = {
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

export { ANDROID_USER_AGENT, GACHA_API_CN, GACHA_API_NET, IOS_USER_AGENT, KURO_API, KURO_BASE_URL, KURO_VERSION, NET_SERVER_ID_MAP, SERVER_ID, SERVER_ID_NET, WAVES_ECHO_COLORS, WAVES_GAME_ID, routeRules };
