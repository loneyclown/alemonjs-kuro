import { type EventsEnum } from 'alemonjs';
export declare function withProcessingFeedback<T>(work: () => Promise<T>, notify: () => Promise<unknown>, delayMs?: number): Promise<T>;
export declare function processingLazy(loader: () => Promise<{
    default: (event: EventsEnum) => unknown;
}>, text?: string): () => Promise<(e: EventsEnum) => Promise<unknown>>;
