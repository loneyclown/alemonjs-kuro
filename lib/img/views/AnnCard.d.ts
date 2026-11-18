import type { AnnItem } from '@src/model/types';
import { type AnnCategory } from '@src/model/announcements';
import React from 'react';
interface AnnCardProps {
    data: {
        activities: AnnItem[];
        infos: AnnItem[];
        notices: AnnItem[];
        category?: AnnCategory;
    };
}
export default function AnnCard({ data }: AnnCardProps): React.JSX.Element;
export {};
