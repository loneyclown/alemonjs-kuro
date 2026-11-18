import type { AnnItem } from './types';
export declare const ANN_CATEGORIES: {
    readonly notice: {
        readonly key: "notices";
        readonly title: "游戏公告";
        readonly command: "#mc公告";
        readonly eventType: "3";
        readonly english: "NEWS BULLETIN";
    };
    readonly activity: {
        readonly key: "activities";
        readonly title: "活动速递";
        readonly command: "#mc公告 活动";
        readonly eventType: "1";
        readonly english: "EVENT UPDATES";
    };
    readonly info: {
        readonly key: "infos";
        readonly title: "游戏资讯";
        readonly command: "#mc公告 资讯";
        readonly eventType: "2";
        readonly english: "GAME STORIES";
    };
};
export type AnnCategory = keyof typeof ANN_CATEGORIES;
export declare function parseAnnQuery(input: string): {
    category: AnnCategory;
    index?: number;
} | null;
export declare function annTimestamp(value: unknown): number | null;
export declare function annPostUrl(postId: unknown): string | null;
export declare function sortedAnnouncements(list: AnnItem[] | null | undefined): AnnItem[];
export declare function rememberAnnList(scope: string, category: AnnCategory, items: AnnItem[], now?: number): void;
export declare function getAnnList(scope: string, category: AnnCategory, now?: number): AnnItem[] | null;
