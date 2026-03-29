export interface KuroApiResp<T = unknown> {
    code: number;
    msg: string;
    data: T | null;
    success: boolean;
}
export interface EnergyData {
    cur: number;
    total: number;
    refreshTimeStamp: number;
}
export interface DailyData {
    energyData: EnergyData | null;
    livenessData: {
        cur: number;
        total: number;
    } | null;
    battlePassData: unknown[];
    shopDataList: unknown[];
}
export interface AccountBaseInfo {
    name: string;
    id: number;
    level: number;
    worldLevel: number;
    roleNum: number;
    phantomNum: number;
    achievementCount: number;
    boxNum: number;
    soundLevel: number;
    bigWorldLevel: number;
}
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
export interface RoleListResp {
    roleList: RoleData[];
}
export interface ExploreItem {
    name: string;
    progress: number;
    type: number;
    icon?: string | null;
}
export interface AreaInfo {
    areaId: number;
    areaName: string;
    areaProgress: number;
    itemList: ExploreItem[];
}
export interface ExploreCountry {
    countryId: number;
    countryName: string;
    detailPageFontColor: string;
    detailPagePic: string;
    detailPageProgressColor: string;
    homePageIcon: string;
}
export interface ExploreArea {
    areaInfoList?: AreaInfo[] | null;
    country: ExploreCountry;
    countryProgress: string;
}
export interface ExploreResp {
    open: boolean;
    exploreList?: ExploreArea[] | null;
}
export interface SignItem {
    id: string;
    goodsName: string;
    goodsNum: number;
    goodsUrl: string;
    sigInStatus: number;
}
export interface SignInitResp {
    sigInNum: number;
    hasSignIn: boolean;
    sigInDTOList: SignItem[];
}
export interface KuroRole {
    roleId: string;
    userId: string;
    gameId: number;
    serverId: string;
    serverName: string;
    roleNum: string;
}
export interface AbyssRole {
    roleId: number;
    iconUrl?: string;
}
export interface TowerFloor {
    floor: number;
    picUrl: string;
    star: number;
    roleList?: AbyssRole[] | null;
}
export interface TowerArea {
    areaId: number;
    areaName: string;
    star: number;
    maxStar: number;
    floorList?: TowerFloor[] | null;
}
export interface TowerDifficulty {
    difficulty: number;
    difficultyName: string;
    towerAreaList?: TowerArea[] | null;
}
export interface TowerResp {
    isUnlock: boolean;
    difficultyList?: TowerDifficulty[] | null;
}
export type ChallengeResp = TowerResp;
export type SlashResp = TowerResp;
export type MatrixResp = TowerResp;
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
export interface PhantomProp {
    phantomPropId: number;
    attributeName: string;
    attributeValue: string;
}
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
export interface EquipPhantom {
    phantomProp: PhantomItem | null;
    cost: number;
}
export interface RoleSkill {
    skillId: number;
    skillName: string;
    iconUrl: string;
    level: number;
    type: string;
}
export interface RoleDetailResp {
    role: RoleData;
    level: number;
    chainList: {
        order: number;
        name: string;
        iconUrl: string;
        unlocked: boolean;
    }[];
    weaponData: RoleWeapon;
    phantomData: {
        cost: number;
        equipPhantomList: EquipPhantom[];
    };
    skillList: RoleSkill[];
}
export interface MineInfo {
    goldNum: number;
    userName: string;
    userId: string;
    headUrl: string;
    headFrameUrl?: string;
    signature?: string;
}
export interface MineV2Resp {
    mine: MineInfo;
}
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
export interface AnnItem {
    id: string;
    postId: string;
    title: string;
    coverUrl: string;
    publishTime: string;
    eventType: string;
}
export interface AnnListResp {
    list: AnnItem[];
}
export interface AnnDetailResp {
    postDetail: {
        postId: string;
        postTitle: string;
        postContent: string;
        publishTime: string;
        coverUrl: string;
    };
}
export interface RedeemCode {
    code: string;
    rewards: string;
    expireTime?: string;
    isExpired?: boolean;
}
export interface CalcRole {
    roleId: number;
    roleName: string;
    roleIconUrl: string;
    starLevel: number;
}
export interface CultivateStatus {
    roleLevel: number;
    breach: number;
    skillLevelList: {
        skillId: number;
        level: number;
    }[];
    weaponLevel: number;
    weaponBreach: number;
}
export interface CostItem {
    id: number;
    name: string;
    iconUrl: string;
    num: number;
}
export interface GachaLogItem {
    cardPoolType: string;
    resourceId: number;
    qualityLevel: number;
    resourceType: string;
    name: string;
    count: number;
    time: string;
}
export declare const GACHA_POOL_TYPE: Record<string, string>;
export interface GachaPoolStat {
    poolName: string;
    poolType: string;
    total: number;
    star5List: {
        name: string;
        count: number;
        time: string;
    }[];
    star4Count: number;
    star3Count: number;
    pity: number;
}
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
    mainProps?: {
        attributeName: string;
        attributeValue: string;
    }[];
    subProps?: {
        attributeName: string;
        attributeValue: string;
    }[];
}
export interface PeriodItem {
    title: string;
    index: number;
}
export interface PeriodListResp {
    weeks: PeriodItem[];
    months: PeriodItem[];
    versions: PeriodItem[];
}
export interface PeriodNode {
    type: string;
    num: number;
}
export interface PeriodDetailItem {
    type: number;
    total: number;
    inc?: number;
    detail: PeriodNode[];
    copyWriting?: string;
}
export interface PeriodDetailResp {
    totalCoin?: number;
    totalStar?: number;
    coinList: PeriodNode[];
    starList: PeriodNode[];
    itemList: PeriodDetailItem[];
    copyWriting?: string;
}
export interface OnlineRole {
    roleId: number;
    roleName: string;
    roleIconUrl: string;
    starLevel: number;
}
export interface OwnedRoleInfo {
    roleId: number;
    level: number;
    breach: number;
    skillLevelList: {
        skillId: number;
        level: number;
        type: string;
    }[];
}
export interface CultivateCostItem {
    id: number;
    name: string;
    num: number;
    quality: number;
    iconUrl?: string;
}
export interface BatchRoleCostResp {
    costList: {
        roleId: number;
        roleName: string;
        weaponId: number;
        cultivateCost: CultivateCostItem[];
    }[];
}
export interface PokerBadge {
    unlock: boolean;
    name: string;
    description: string;
    iconUrl?: string;
}
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
export interface MoreActivityResp {
    phantomBattle: PhantomBattle | null;
}
export interface RankEntry {
    uid: string;
    roleName: string;
    roleIconUrl: string;
    starLevel: number;
    level: number;
    chainCount: number;
    attributeName: string;
    score: number;
    weaponName: string;
    weaponLevel: number;
    weaponStarLevel: number;
    resonLevel: number;
}
export interface WikiCatalogueItem {
    id: string;
    name: string;
    content?: string;
    icon?: string;
}
export interface WikiEntryDetail {
    id: string;
    name: string;
    content: string;
    icon?: string;
}
export interface EchoRankItem {
    roleId: number;
    roleName: string;
    roleIconUrl: string;
    phantomName: string;
    phantomIconUrl: string;
    level: number;
    cost: number;
    fetterName: string;
    mainProps: {
        attributeName: string;
        attributeValue: string;
    }[];
    subProps: {
        attributeName: string;
        attributeValue: string;
    }[];
}
export declare const NORMAL_ROLE_LIST: string[];
export declare const LUCK_TAGS: string[];
export declare const LUCK_THRESHOLDS: Record<string, number[]>;
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
