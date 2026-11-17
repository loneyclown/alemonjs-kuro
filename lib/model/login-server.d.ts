interface LoginSession {
    userId: string;
    did: string;
    expiresAt: number;
    origin: string;
    busy: boolean;
    smsAt: number;
    mobile: string;
    attempts: number;
    notify: (text: string) => Promise<unknown>;
}
export declare function createLoginSession(userId: string, notify: LoginSession['notify']): Promise<string>;
export declare function revokeLoginSessions(userId: string): void;
export declare function closeLoginServer(): Promise<void>;
export {};
