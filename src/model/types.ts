/** Kuro API 通用响应 */
export interface KuroApiResp<T = unknown> {
  code: number;
  msg: string;
  data: T | null;
  success: boolean;
}

/** 体力信息 */
export interface EnergyData {
  cur: number;
  total: number;
  refreshTimeStamp: number;
}

/** 每日信息（widget getData） */
export interface DailyData {
  /** 体力 */
  energyData: EnergyData | null;
  /** 活跃度 */
  livenessData: {
    cur: number;
    total: number;
  } | null;
  /** 战歌/挑战次数 */
  battlePassData: unknown[];
  /** 商店物品 */
  shopDataList: unknown[];
}

/** 账号基础信息 */
export interface AccountBaseInfo {
  /** 角色名 */
  name: string;
  /** UID */
  id: number;
  /** 等级 */
  level: number;
  /** 世界等级 */
  worldLevel: number;
  /** 角色数 */
  roleNum: number;
  /** 声骸数 */
  phantomNum: number;
  /** 成就数 */
  achievementCount: number;
  /** 宝箱数 */
  boxNum: number;
  /** 声级 */
  soundLevel: number;
  /** 大世界等级 */
  bigWorldLevel: number;
}

/** 角色数据 */
export interface RoleData {
  roleId: number;
  roleName: string;
  roleIconUrl?: string | null;
  rolePicUrl?: string | null;
  starLevel: number;
  level: number;
  breach?: number | null;
  attributeId: number;
  attributeName?: string | null;
  weaponTypeId: number;
  weaponTypeName?: string | null;
  acronym?: string | null;
  chainUnlockNum?: number | null;
  isMainRole?: boolean | null;
  totalSkillLevel?: number | null;
}

/** 角色列表响应 */
export interface RoleListResp {
  roleList: RoleData[];
  showRoleIdList?: number[] | null;
  showToGuest?: boolean;
}

/** 探索子项 */
export interface ExploreItem {
  name: string;
  progress: number;
  type: number;
  icon?: string | null;
}

/** 探索子区域 */
export interface AreaInfo {
  areaId: number;
  areaName: string;
  areaProgress: number;
  itemList: ExploreItem[];
}

/** 探索国家 */
export interface ExploreCountry {
  countryId: number;
  countryName: string;
  detailPageFontColor: string;
  detailPagePic: string;
  detailPageProgressColor: string;
  homePageIcon: string;
}

/** 探索区域 */
export interface ExploreArea {
  areaInfoList?: AreaInfo[] | null;
  country: ExploreCountry;
  countryProgress: string;
}

/** 探索数据响应 */
export interface ExploreResp {
  open: boolean;
  exploreList?: ExploreArea[] | null;
}

/** 签到日历项 */
export interface SignItem {
  id?: string;
  goodsId?: number;
  goodsName: string;
  goodsNum: number;
  goodsUrl: string;
  sigInStatus?: number;
  serialNum?: number;
  isGain?: boolean;
}

/** 签到初始化响应 */
export interface SignInitResp {
  /** 当前是否已签(Python: isSigIn) */
  isSigIn?: boolean;
  hasSignIn?: boolean;
  /** 累计签到天数 */
  sigInNum: number;
  /** 漏签天数 */
  omissionNnm?: number;
  /** 每日奖品列表(Python: signInGoodsConfigs) */
  signInGoodsConfigs?: SignItem[];
  /** 额外奖品 */
  disposableGoodsList?: SignItem[];
  signLoopGoodsList?: SignItem[];
  /** 兼容旧字段 */
  sigInDTOList?: SignItem[];
  eventStartTimes?: string;
  eventEndTimes?: string;
}

/** Kuro 角色列表（登录后） */
export interface KuroRole {
  roleId: string;
  userId: string;
  gameId: number;
  serverId: string;
  serverName: string;
  roleNum: string;
}

/** 深塔楼层角色 */
export interface AbyssRole {
  roleId: number;
  iconUrl?: string;
}

/** 深塔楼层 */
export interface TowerFloor {
  floor: number;
  picUrl: string;
  star: number;
  roleList?: AbyssRole[] | null;
}

/** 深塔区域 */
export interface TowerArea {
  areaId: number;
  areaName: string;
  star: number;
  maxStar: number;
  floorList?: TowerFloor[] | null;
}

/** 深塔难度 */
export interface TowerDifficulty {
  difficulty: number;
  difficultyName: string;
  towerAreaList?: TowerArea[] | null;
}

/** 深塔数据响应 */
export interface TowerResp {
  isUnlock: boolean;
  difficultyList?: TowerDifficulty[] | null;
}

/** 全息战略响应 (与深塔结构相同) */
export type ChallengeResp = TowerResp;

/** 冥歌海墟响应 */
export type SlashResp = TowerResp;

/** 终焉矩阵响应 */
export type MatrixResp = TowerResp;

/** 角色详情 — 武器 */
export interface RoleWeapon {
  weaponId: number;
  weaponName: string;
  weaponStarLevel: number;
  weaponIcon: string;
  weaponType: number;
  level: number;
  breach: number;
  resonLevel: number;
}

/** 角色详情 — 声骸属性 */
export interface PhantomProp {
  phantomPropId: number;
  attributeName: string;
  attributeValue: string;
}

/** 角色详情 — 单个声骸 */
export interface PhantomItem {
  phantomId: number;
  name: string;
  icon: string;
  level: number;
  cost: number;
  mainProps: PhantomProp[];
  phantomProp: PhantomProp[];
  fetterDetail?: {
    name: string;
    fetterLevel: number;
    rareLV?: number;
    groupId?: number;
  };
}

/** 角色详情 — 声骸装备槽 */
export interface EquipPhantom {
  phantomProp: PhantomItem | null;
  cost: number;
}

/** 角色详情 — 技能 */
export interface RoleSkill {
  skillId: number;
  skillName: string;
  iconUrl: string;
  level: number;
  type: string;
}

/** 角色完整详情响应 */
export interface RoleDetailResp {
  role: RoleData;
  level: number;
  chainList: { order: number; name: string; iconUrl: string; unlocked: boolean }[];
  weaponData: RoleWeapon;
  phantomData: {
    cost: number;
    equipPhantomList: EquipPhantom[];
  };
  skillList: RoleSkill[];
}

/** 库洛币 — 用户信息 */
export interface MineInfo {
  goldNum: number;
  userName: string;
  userId: string;
  headUrl: string;
  headFrameUrl?: string;
  signature?: string;
}

/** mineV2 响应 */
export interface MineV2Resp {
  mine: MineInfo;
}

/** 声骸坞（数据坞）响应 */
export interface CalabashResp {
  level: number;
  baseCatch: number;
  strengthenCatch: number;
  catchQuality: number;
  cost: number;
  maxCost: number;
  phantomList: {
    phantomId: number;
    name: string;
    iconUrl: string;
    cost: number;
    skillDescription: string;
  }[];
}

/** 公告项 */
export interface AnnItem {
  id: number;
  postId: string;
  postTitle: string;
  coverUrl: string;
  coverImages?: { url: string }[];
  publishTime: number;
  eventType: number;
}

/** 公告列表响应 */
export interface AnnListResp {
  list: AnnItem[];
}

/** 公告详情 */
export interface AnnDetailResp {
  postDetail: {
    postId: string;
    postTitle: string;
    postContent: string;
    publishTime: string;
    coverUrl: string;
  };
}

/** 兑换码项 */
export interface RedeemCode {
  code: string;
  rewards: string;
  expireTime?: string;
  isExpired?: boolean;
}

/** Wiki 主页 — 唤取卡池标签页 */
export interface WikiGachaTab {
  name: string;
  countDown?: { dateRange: [string, string] };
  imgs?: Array<{
    img: string;
    title: string;
    linkConfig?: { linkUrl: string; linkType: number; entryId: string };
  }>;
}

/** Wiki 主页 — 版本活动条目 */
export interface WikiActivityContent {
  title: string;
  contentUrl: string;
  countDown?: { dateRange: [string, string] };
}

/** Wiki 主页 — 侧边栏模块 */
export interface WikiSideModule {
  title: string;
  content: unknown;
}

/** Wiki 主页响应 */
export interface WikiHomeResp {
  contentJson:
    | string
    | {
        banner?: Array<{ url: string; describe: string }>;
        sideModules?: WikiSideModule[];
      };
}

/** 角色养成 — 角色列表项 */
export interface CalcRole {
  roleId: number;
  roleName: string;
  roleIconUrl: string;
  starLevel: number;
}

/** 角色养成 — 培养状态 */
export interface CultivateStatus {
  roleLevel: number;
  breach: number;
  skillLevelList: { skillId: number; level: number }[];
  weaponLevel: number;
  weaponBreach: number;
}

/** 角色养成 — 成本项 */
export interface CostItem {
  id: number;
  name: string;
  iconUrl: string;
  num: number;
}

// ═══════════════════════════════════════
// 抽卡记录
// ═══════════════════════════════════════

/** 抽卡记录项 */
export interface GachaLogItem {
  cardPoolType: string;
  resourceId: number;
  qualityLevel: number;
  resourceType: string;
  name: string;
  count: number;
  time: string;
}

/** 卡池类型映射 */
export const GACHA_POOL_TYPE: Record<string, string> = {
  1: '角色精准调谐',
  2: '武器精准调谐',
  3: '角色调谐',
  4: '武器调谐',
  5: '新手调谐',
  6: '新手自选唤取',
  7: '感恩定向唤取',
  8: '角色新旅唤取',
  9: '武器新旅唤取'
};

/** 分析后的卡池统计 */
export interface GachaPoolStat {
  poolName: string;
  poolType: string;
  total: number;
  star5List: { name: string; count: number; time: string }[];
  star4Count: number;
  star3Count: number;
  pity: number;
}

// ═══════════════════════════════════════
// 声骸列表
// ═══════════════════════════════════════

/** 声骸装备详情（含主副词条） */
export interface PhantomEquipDetail {
  phantomProp: {
    phantomPropId: number;
    name: string;
    phantomId: number;
    quality: number;
    cost: number;
    iconUrl: string;
    skillDescription?: string;
  };
  cost: number;
  quality: number;
  level: number;
  fetterDetail?: {
    groupId: number;
    name: string;
    num: number;
    firstDescription?: string;
    secondDescription?: string;
  };
  mainProps?: { attributeName: string; attributeValue: string }[];
  subProps?: { attributeName: string; attributeValue: string }[];
}

// ═══════════════════════════════════════
// 星声统计 / 资源统计
// ═══════════════════════════════════════

/** 资源统计周期 */
export interface PeriodItem {
  title: string;
  index: number;
}

/** 资源统计周期列表 */
export interface PeriodListResp {
  weeks: PeriodItem[];
  months: PeriodItem[];
  versions: PeriodItem[];
}

/** 资源明细节点 */
export interface PeriodNode {
  type: string;
  num: number;
}

/** 资源明细项 */
export interface PeriodDetailItem {
  type: number;
  total: number;
  inc?: number;
  detail: PeriodNode[];
  copyWriting?: string;
}

/** 资源统计详情 */
export interface PeriodDetailResp {
  totalCoin?: number;
  totalStar?: number;
  coinList: PeriodNode[];
  starList: PeriodNode[];
  itemList: PeriodDetailItem[];
  copyWriting?: string;
}

// ═══════════════════════════════════════
// 角色培养计算
// ═══════════════════════════════════════

/** 在线角色列表项 (calculator) */
export interface OnlineRole {
  roleId: number;
  roleName: string;
  roleIconUrl: string;
  starLevel: number;
}

/** 已拥有角色的状态 */
export interface OwnedRoleInfo {
  roleId: number;
  level: number;
}

/** 已拥有角色信息响应 */
export interface OwnedRoleInfoResp {
  roleInfoList: OwnedRoleInfo[];
}

/** 培养成本项 */
export interface CultivateCostItem {
  id: number;
  name: string;
  num: number;
  quality: number;
  iconUrl?: string;
}

/** 批量培养成本响应 */
export interface BatchRoleCostResp {
  costList: {
    roleId: number;
    roleName: string;
    weaponId: number;
    cultivateCost: CultivateCostItem[];
  }[];
}

// ═══════════════════════════════════════
// 持有率/激斗活动 (moreActivity)
// ═══════════════════════════════════════

/** 激斗徽章 */
export interface PokerBadge {
  unlock: boolean;
  name: string;
  description: string;
  iconUrl?: string;
}

/** 激斗/幻象对弈数据 */
export interface PhantomBattle {
  level: number;
  levelName: string;
  exp: number;
  expLimit: number;
  cardNum: number;
  maxCardNum: number;
  badgeNum: number;
  maxBadgeNum: number;
  badgeList: PokerBadge[];
}

/** moreActivity 响应 */
export interface MoreActivityResp {
  phantomBattle: PhantomBattle | null;
}

// ═══════════════════════════════════════
// 角色排行 (简化版 — 群内排行)
// ═══════════════════════════════════════

/** 排行条目 */
export interface RankEntry {
  uid: string;
  roleName: string;
  roleIconUrl?: string | null;
  starLevel: number;
  level: number;
  chainUnlockNum: number;
  attributeName: string;
  score: number;
  weaponName: string;
  weaponLevel: number;
  weaponStarLevel: number;
  resonLevel: number;
}

// ═══════════════════════════════════════
// Wiki
// ═══════════════════════════════════════

/** Wiki 目录项 */
export interface WikiCatalogueItem {
  id: string;
  name: string;
  content?: string;
  icon?: string;
}

/** Wiki 条目详情 */
export interface WikiEntryDetail {
  id: string;
  name: string;
  content: string;
  icon?: string;
}

// ═══════════════════════════════════════
// 声骸列表（完善版）
// ═══════════════════════════════════════

/** 声骸评分条目 */
export interface EchoRankItem {
  roleId: number;
  roleName: string;
  roleIconUrl: string;
  phantomName: string;
  phantomIconUrl: string;
  level: number;
  cost: number;
  fetterName: string;
  mainProps: { attributeName: string; attributeValue: string }[];
  subProps: { attributeName: string; attributeValue: string }[];
}

// ═══════════════════════════════════════
// 卡池完善 — 运气统计
// ═══════════════════════════════════════

/** 常驻角色列表 (不算UP) */
export const NORMAL_ROLE_LIST = ['维里奈', '卡卡罗', '凌阳', '鉴心', '安可', '漂泊者·衍射', '漂泊者·湮灭'];

/** 运气等级标签 */
export const LUCK_TAGS = ['非到极致', '运气不好', '平稳保底', '小欧一把', '欧狗在此'];

/** 各卡池的运气阈值 */
export const LUCK_THRESHOLDS: Record<string, number[]> = {
  角色精准调谐: [74, 87, 99, 105, 120],
  武器精准调谐: [45, 52, 59, 65, 70],
  新手调谐: [10, 20, 30, 40, 45],
  default: [60, 75, 90, 100, 110]
};

/** 分析后的增强版卡池统计 */
export interface GachaPoolStatEx extends GachaPoolStat {
  avg: number | null;
  avgUp: number | null;
  luckLevel: number;
  star5Items: {
    name: string;
    count: number;
    time: string;
    isUp: boolean;
    resourceType: string;
  }[];
}
