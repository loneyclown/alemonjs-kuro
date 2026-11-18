import React from 'react';
import type { routeRules } from '@src/constants/kuro';
interface HelpCommand {
    rule: keyof typeof routeRules;
    name: string;
    command: string;
    icon: string;
    private?: boolean;
    sprite?: string;
    input?: string;
}
interface HelpCategory {
    title: string;
    items: HelpCommand[];
}
export declare const HELP_DATA: HelpCategory[];
export declare const MORE_HELP_DATA: HelpCategory[];
export declare const MORE_HELP_NOTES: string[];
export default function WuwaHelp({ more }: {
    more?: boolean;
}): React.JSX.Element;
export {};
