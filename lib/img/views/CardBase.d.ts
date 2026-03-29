import React from 'react';
export declare const C: {
    readonly bg: "#0f1115";
    readonly gold: "#d4b163";
    readonly goldDim: "rgba(212, 177, 99, 0.2)";
    readonly goldBorder: "rgba(212, 177, 99, 0.4)";
    readonly panelBg: "rgba(20, 22, 26, 0.6)";
    readonly panelBorder: "rgba(255, 255, 255, 0.08)";
    readonly panelBorderTop: "rgba(255, 255, 255, 0.2)";
    readonly textPrimary: "#ffffff";
    readonly textSecondary: "rgba(255, 255, 255, 0.7)";
    readonly textDim: "#6d717a";
    readonly star5: "#d4b163";
    readonly star4: "#843fa1";
    readonly chain: readonly ["#666", "#4fc3f7", "#66bb6a", "#9c6cdb", "#e8a640", "#ff7043", "#ef5350"];
};
export declare function DarkContainer({ children, width }: {
    children: React.ReactNode;
    width?: number;
}): React.JSX.Element;
export declare function UserHeader({ name, uid, level, worldLevel, avatarUrl, decoText }: {
    name: string;
    uid: string;
    level?: number;
    worldLevel?: number;
    avatarUrl?: string;
    decoText?: string;
}): React.JSX.Element;
export declare function Section({ title, children, extra }: {
    title: string;
    children: React.ReactNode;
    extra?: React.ReactNode;
}): React.JSX.Element;
export declare function LightContainer({ children, width }: {
    children: React.ReactNode;
    width?: number;
}): React.JSX.Element;
export declare function LightHeader({ title, subtitle, width }: {
    title: string;
    subtitle?: string;
    width?: string;
}): React.JSX.Element;
export declare function Footer(): React.JSX.Element;
