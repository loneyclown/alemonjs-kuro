import type { AccountBaseInfo, DailyData } from '@src/model/types';
import React from 'react';
export interface DailyDataExt extends DailyData {
    storeEnergyData?: {
        cur: number;
        total: number;
        refreshTimeStamp?: number;
    };
}
interface StaminaCardProps {
    data: {
        uid: string;
        daily: DailyDataExt;
        base: AccountBaseInfo;
        headUrl?: string;
    };
}
export default function StaminaCard({ data }: StaminaCardProps): React.JSX.Element;
export {};
