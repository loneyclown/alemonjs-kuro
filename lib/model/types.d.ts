export interface KuroApiResp<T = unknown> {
    code: number;
    msg: string;
    data: T | null;
    success: boolean;
}
export interface DailyWidget {
    name?: string;
    img?: string | null;
    value?: string | null;
    status?: number;
    cur: number;
    total: number;
    refreshTimeStamp?: number;
    timePreDesc?: string | null;
    expireTimeStamp?: number;
}
export interface EnergyData extends DailyWidget {
    refreshTimeStamp: number;
}
export interface DailyData {
    energyData: EnergyData | null;
    livenessData: DailyWidget | null;
    battlePassData: (DailyWidget | null)[];
    storeEnergyData?: DailyWidget | null;
    weeklyData?: DailyWidget | null;
    weeklyRougeData?: DailyWidget | null;
    weeklyFrameData?: DailyWidget | null;
    towerData?: DailyWidget | null;
    slashTowerData?: DailyWidget | null;
    newTowerData?: DailyWidget | null;
    serverTime?: number;
    activityData?: {
        enabled: boolean;
        title: string;
        endTime?: number;
    } | null;
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
export interface RoleListResp {
    roleList: RoleData[];
    showRoleIdList?: number[] | null;
    showToGuest?: boolean;
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
    areaPic?: string | null;
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
    detailPageImage?: string | null;
    detailPageAreaPic?: string | null;
}
export interface ExploreArea {
    areaInfoList?: (AreaInfo | null)[] | null;
    country: ExploreCountry;
    countryProgress: string;
}
export interface ExploreResp {
    open: boolean;
    exploreList?: (ExploreArea | null)[] | null;
}
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
export interface SignInitResp {
    isSigIn?: boolean;
    hasSignIn?: boolean;
    sigInNum: number;
    omissionNnm?: number;
    signInGoodsConfigs?: SignItem[];
    disposableGoodsList?: SignItem[];
    signLoopGoodsList?: SignItem[];
    sigInDTOList?: SignItem[];
    eventStartTimes?: string;
    eventEndTimes?: string;
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
export interface WeaponInfo {
    weaponId: number;
    weaponName: string;
    weaponStarLevel: number;
    weaponIcon: string;
    weaponType: number;
    weaponEffectName?: string;
    effectDescription?: string;
}
export interface WeaponData {
    weapon: WeaponInfo;
    level: number;
    breach?: number;
    resonLevel: number;
    mainPropList?: PhantomProp[];
}
export interface PhantomProp {
    attributeId?: number;
    attributeName: string;
    attributeValue: string;
    iconUrl?: string | null;
    key?: string;
    valid?: boolean;
    sort?: number;
}
export interface PhantomBase {
    phantomPropId?: number;
    phantomId: number;
    name: string;
    iconUrl: string;
    quality?: number;
    cost: number;
    skillDescription?: string;
}
export interface EquipPhantom {
    phantomProp: PhantomBase | null;
    cost: number;
    quality?: number;
    level: number;
    fetterDetail?: {
        groupId?: number;
        name: string;
        iconUrl?: string;
        num?: number;
        firstDescription?: string;
        secondDescription?: string;
    };
    mainProps?: PhantomProp[];
    subProps?: PhantomProp[];
}
export interface SkillInfo {
    id: number;
    type: string;
    name: string;
    description?: string;
    iconUrl: string;
}
export interface SkillEntry {
    skill: SkillInfo;
    level: number;
}
export interface RoleDetailResp {
    roleAttributeList?: PhantomProp[];
    equipPhantomAddPropList?: PhantomProp[];
    equipPhantomAttributeList?: PhantomProp[];
    roleSkin?: {
        picUrl?: string;
        skinName?: string;
    };
    role: RoleData;
    level: number;
    chainList: {
        order: number;
        name: string;
        iconUrl: string;
        unlocked: boolean;
    }[];
    weaponData: WeaponData;
    phantomData: {
        cost: number;
        equipPhantomList: (EquipPhantom | null)[];
    };
    skillList: SkillEntry[];
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
    id: number;
    postId: string;
    postTitle: string;
    coverUrl: string;
    coverImages?: {
        url: string;
    }[];
    publishTime: number;
    eventType: number;
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
export interface WikiGachaTab {
    name: string;
    countDown?: {
        dateRange: [string, string];
    };
    imgs?: Array<{
        img: string;
        title: string;
        linkConfig?: {
            linkUrl: string;
            linkType: number;
            entryId: string;
        };
    }>;
}
export interface WikiActivityContent {
    title: string;
    contentUrl: string;
    countDown?: {
        dateRange: [string, string];
    };
}
export interface WikiSideModule {
    title: string;
    content: unknown;
}
export interface WikiHomeResp {
    contentJson: string | {
        banner?: Array<{
            url: string;
            describe: string;
        }>;
        sideModules?: WikiSideModule[];
    };
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
}
export interface OwnedRoleInfoResp {
    roleInfoList: OwnedRoleInfo[];
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
