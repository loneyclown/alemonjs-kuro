import type { WikiHomeResp } from './types';
export interface Pool {
    name: string;
    type: 'char' | 'weapon';
    images: {
        url: string;
        title: string;
    }[];
}
export interface PoolRound {
    range?: [string, string];
    status: '进行中' | '未开始' | '已结束' | '时间未公布';
    countdown?: string;
    pools: Pool[];
}
export declare function readPoolRounds(raw: WikiHomeResp['contentJson'], now?: number): PoolRound[];
