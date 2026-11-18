import type { CalabashResp } from '@src/model/types';
import React from 'react';
interface CalabashCardProps {
    data: {
        uid: string;
        calabash: CalabashResp;
        page?: number;
    };
}
export default function CalabashCard({ data }: CalabashCardProps): React.JSX.Element;
export {};
