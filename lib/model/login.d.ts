export declare class LoginError extends Error {
}
export declare function loginWithCode(userId: string, mobile: string, code: string, did?: string, isCurrent?: () => boolean): Promise<{
    uid: string;
    serverName: string;
}>;
