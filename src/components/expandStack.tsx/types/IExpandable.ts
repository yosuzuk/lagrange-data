import { ReactNode } from 'react';

export interface IExpandable {
    id: string;
    initiallyOpened: boolean;
    expandIcon?: ReactNode;
    summary: ReactNode;
    details: ReactNode;
    actions?: ReactNode;
    skip?: boolean;
}
