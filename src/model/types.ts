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
  roleIconUrl: string;
  starLevel: number;
  level: number;
  breach: number;
  attributeId: number;
  attributeName: string;
  weaponTypeId: number;
  chain: number[];
  chainCount: number;
}

/** 角色列表响应 */
export interface RoleListResp {
  roleList: RoleData[];
}

/** 探索区域 */
export interface ExploreArea {
  areaId: number;
  areaName: string;
  areaProgress: number;
  itemList: ExploreItem[];
}

/** 探索子项 */
export interface ExploreItem {
  type: string;
  name: string;
  progress: number;
  total: number;
}

/** 探索数据响应 */
export interface ExploreResp {
  open: boolean;
  exploreList: ExploreArea[];
  countryList?: ExploreArea[];
}

/** 签到日历项 */
export interface SignItem {
  id: string;
  goodsName: string;
  goodsNum: number;
  goodsUrl: string;
  sigInStatus: number;
}

/** 签到初始化响应 */
export interface SignInitResp {
  sigInNum: number;
  hasSignIn: boolean;
  sigInDTOList: SignItem[];
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

/** 深塔楼层 */
export interface TowerFloor {
  floorName: string;
  star: number;
  maxStar: number;
  roleList: RoleData[];
}

/** 深塔数据响应 */
export interface TowerResp {
  isUnlock: boolean;
  difficultyList: {
    difficulty: number;
    difficultyName: string;
    towerAreaList: {
      areaName: string;
      floorList: TowerFloor[];
      maxStar: number;
      star: number;
    }[];
  }[];
}
