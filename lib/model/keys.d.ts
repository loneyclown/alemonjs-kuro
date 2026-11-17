export declare const kuroKeys: {
    base: (data?: string) => string;
    userByUid: (uid: string | number, userId: string) => string;
    uidByUser: (userId: string | number) => string;
    activeUid: (userId: string | number) => string;
    queryCache: (uid: string | number, api: string) => string;
    qrLoginLock: (userId: string | number) => string;
};
