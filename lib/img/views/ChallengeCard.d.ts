import type { AccountBaseInfo, TowerResp } from '@src/model/types';
import React from 'react';
interface ChallengeCardProps {
    data: {
        uid: string;
        base: AccountBaseInfo;
        challenge: TowerResp;
        title: string;
        icon: string;
        headUrl?: string;
    };
}
export default function ChallengeCard({ data }: ChallengeCardProps): React.JSX.Element;
export {};
