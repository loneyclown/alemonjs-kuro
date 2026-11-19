import type { MatrixResp } from '@src/model/types';
import React from 'react';
export default function MatrixCard({ data }: {
    data: {
        uid: string;
        matrix: MatrixResp;
        modeId?: number;
    };
}): React.JSX.Element;
