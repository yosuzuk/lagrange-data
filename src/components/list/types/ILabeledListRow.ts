import { ReactNode } from 'react';

export interface ILabeledListRow {
    key: string;
    value: ReactNode;
    label: string;
}
