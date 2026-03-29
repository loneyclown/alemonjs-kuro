export interface kuroUser {
    uid: string;
    cookie: string;
    did: string;
    bat: string;
    isLogin: boolean;
    createdAt: number;
}
export declare function getUidList(userId: string): Promise<string[]>;
export declare function getActiveUid(userId: string): Promise<string | null>;
export declare function bindUid(userId: string, uid: string): Promise<string>;
export declare function switchUid(userId: string, uid: string): Promise<string>;
export declare function unbindUid(userId: string, uid: string): Promise<string>;
export declare function viewUids(userId: string): Promise<string>;
export declare function addToken(_userId: string, uid: string, cookie: string, did: string, bat?: string): Promise<void>;
export declare function getUserByUid(uid: string): Promise<kuroUser | null>;
export declare function deleteToken(uid: string): Promise<void>;
