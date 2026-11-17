import { Format, type EventsEnum } from 'alemonjs';
export interface MarkdownCommand {
    label: string;
    command: string;
    autoEnter?: boolean;
}
export interface CommandMarkdown {
    title: string;
    sections: {
        title: string;
        commands: MarkdownCommand[];
    }[];
    navigation?: MarkdownCommand[];
    note?: string;
}
export declare function createCommandMarkdown(content: CommandMarkdown): Format;
export declare function trySendCommandMarkdown(event: EventsEnum, content: CommandMarkdown): Promise<boolean>;
