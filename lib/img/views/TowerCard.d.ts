import type { AccountBaseInfo, TowerResp } from '@src/model/types';
import React from 'react';
interface TowerCardProps {
    data: {
        uid: string;
        base: AccountBaseInfo;
        tower: TowerResp;
        headUrl?: string;
    };
}
export default function TowerCard({ data }: TowerCardProps): React.JSX.Element;
export {};
