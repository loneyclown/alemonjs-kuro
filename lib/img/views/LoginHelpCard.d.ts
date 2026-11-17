import React from 'react';
interface Props {
    data: {
        qrDataUrl: string;
        loginUrl: string;
    };
}
export default function LoginHelpCard({ data }: Props): React.JSX.Element;
export declare function generateQrDataUrl(loginUrl: string): Promise<string>;
export {};
