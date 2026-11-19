import type { AccountBaseInfo, AnnDetailResp, AnnListResp, BatchRoleCostResp, CalabashResp, DailyData, ExploreResp, GachaLogItem, KuroApiResp, KuroRole, MatrixResp, MineV2Resp, MoreActivityResp, OnlineRole, OwnedRoleInfoResp, PeriodDetailResp, PeriodListResp, RoleDetailResp, RoleListResp, SignInitResp, TowerResp, WikiHomeResp } from './types';
export declare function apiLogin(mobile: string, code: string, did: string): Promise<KuroApiResp<{
    token: string;
}>>;
export declare function apiSendSms(mobile: string, geeTestData: string, did: string): Promise<KuroApiResp<unknown>>;
export declare function apiLoginLog(uid: string, token: string, userId: string): Promise<KuroApiResp<unknown>>;
export declare function apiRoleList(token: string, did: string, gameId?: number): Promise<KuroApiResp<KuroRole[]>>;
export declare function apiRefresh(uid: string, token: string, userId: string): Promise<KuroApiResp<unknown>>;
export declare function apiRequestToken(uid: string, token: string, did: string): Promise<KuroApiResp<{
    accessToken: string;
}>>;
export declare function apiDailyInfo(uid: string, token: string, userId: string): Promise<KuroApiResp<DailyData>>;
export declare function apiBaseInfo(uid: string, token: string, userId: string): Promise<KuroApiResp<AccountBaseInfo>>;
export declare function apiRoleData(uid: string, token: string, userId: string): Promise<KuroApiResp<RoleListResp>>;
export declare function apiExploreData(uid: string, token: string, userId: string): Promise<KuroApiResp<ExploreResp>>;
export declare function apiSignInit(uid: string, token: string, userId: string): Promise<KuroApiResp<SignInitResp>>;
export declare function apiSignIn(uid: string, token: string, owner: string, reqMonth: string, communityId: string): Promise<KuroApiResp<unknown>>;
export declare function apiTowerDetail(uid: string, token: string, userId: string): Promise<KuroApiResp<TowerResp>>;
export declare function apiChallengeDetail(uid: string, token: string, userId: string): Promise<KuroApiResp<TowerResp>>;
export declare function apiSlashDetail(uid: string, token: string, userId: string): Promise<KuroApiResp<TowerResp>>;
export declare function apiMatrixDetail(uid: string, token: string, userId: string): Promise<KuroApiResp<MatrixResp>>;
export declare function apiRoleDetail(uid: string, token: string, userId: string, roleId: number): Promise<KuroApiResp<RoleDetailResp>>;
export declare function apiCalabashData(uid: string, token: string, userId: string): Promise<KuroApiResp<CalabashResp>>;
export declare function apiMineV2(token: string): Promise<KuroApiResp<MineV2Resp>>;
export declare function apiWikiHome(): Promise<KuroApiResp<WikiHomeResp>>;
export declare function apiAnnList(eventType?: string, pageSize?: number): Promise<KuroApiResp<AnnListResp>>;
export declare function apiAnnDetail(postId: string): Promise<KuroApiResp<AnnDetailResp>>;
export declare function apiGachaLog(uid: string, cardPoolType: string, recordId?: string): Promise<{
    success: boolean;
    data: GachaLogItem[];
    msg: string;
}>;
export declare function apiPeriodList(uid: string, token: string, userId: string): Promise<{
    success: boolean;
    code: number;
    msg: string;
    data: PeriodListResp | null;
}>;
export declare function apiPeriodDetail(uid: string, token: string, userId: string, type: 'month' | 'week' | 'version', period: number): Promise<KuroApiResp<PeriodDetailResp>>;
export declare function apiCalcRefresh(uid: string, token: string, userId: string): Promise<KuroApiResp<unknown>>;
export declare function apiOnlineRoleList(token: string): Promise<KuroApiResp<OnlineRole[]>>;
export declare function apiOwnedRoleInfo(uid: string, token: string, userId: string): Promise<KuroApiResp<OwnedRoleInfoResp>>;
export declare function apiBatchRoleCost(uid: string, token: string, userId: string, content: unknown[]): Promise<KuroApiResp<BatchRoleCostResp>>;
export declare function apiMoreActivity(uid: string, token: string, userId: string): Promise<KuroApiResp<MoreActivityResp>>;
export declare function apiWikiTree(catalogueId: string): Promise<KuroApiResp<unknown>>;
export declare function apiWikiEntryDetail(entryId: string): Promise<KuroApiResp<unknown>>;
export declare function getSelfCookie(uid: string, userId: string): Promise<string | null>;
export declare function getCookie(uid: string, userId: string): Promise<{
    isSelf: boolean;
    cookie: string;
} | null>;
