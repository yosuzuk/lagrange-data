import { ReactNode } from 'react';

export interface IPage {
    id: string;
    name: string;
    description: string;
    render: () => ReactNode;
    hidden?: boolean;
}
