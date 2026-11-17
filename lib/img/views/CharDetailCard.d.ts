import type { AccountBaseInfo, RoleDetailResp } from '@src/model/types';
import React from 'react';
interface CharDetailCardProps {
    data: {
        uid: string;
        detail: RoleDetailResp;
        base?: AccountBaseInfo;
        headUrl?: string;
    };
}
export default function CharDetailCard({ data }: CharDetailCardProps): React.JSX.Element;
export {};
