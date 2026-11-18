import type { PoolRound } from '@src/model/pools';
import React from 'react';
export default function PoolCard({ data }: {
    data: {
        rounds: PoolRound[];
    };
}): React.JSX.Element;
