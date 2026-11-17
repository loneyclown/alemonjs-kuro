import type { AccountBaseInfo, DailyData } from '@src/model/types';
import React from 'react';
interface StaminaCardProps {
    data: {
        uid: string;
        daily: DailyData;
        base: AccountBaseInfo;
        headUrl?: string;
    };
}
export default function StaminaCard({ data }: StaminaCardProps): React.JSX.Element;
export {};
