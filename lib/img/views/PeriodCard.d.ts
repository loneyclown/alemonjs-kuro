import type { PeriodDetailResp, PeriodItem } from '@src/model/types';
import React from 'react';
interface PeriodCardProps {
    data: {
        uid: string;
        periodType: string;
        periodTitle: string;
        periodIndex?: number;
        availableMonths?: PeriodItem[];
        detail: PeriodDetailResp;
    };
}
export default function PeriodCard({ data }: PeriodCardProps): React.JSX.Element;
export {};
