import { ReactNode } from 'react';
import { SortDirection, SortFn } from '../../../utils/sortingUtils';

export interface IUseTableResult<TData> {
    table: ITable;
    setTableData: (data: ITableData<TData>) => void;
    setSorting: (sortBy: string | null, sortDirection: SortDirection) => void;
}

export interface ITable {
    header: ITableHeaderCell[];
    rows: ITableRow[];
    sortBy: string | null;
    sortDirection: SortDirection;
}

export interface ITableHeaderCell {
    id: string; // row id + column id
    content: ReactNode;
    sortDirection: SortDirection | null;
    toggleSort: (() => void) | null;
}

export interface ITableRow {
    id: string;
    cells: ITableCell[];
}

export interface ITableCell {
    id: string;
    content: ReactNode;
}

export interface ITableColumn<TData> {
    id: string;
    renderHeader: (sortDirection: SortDirection | null, toggleSort: (() => void) | null) => ReactNode;
    renderCell: (data: TData) => ReactNode;
    initialSortDirection?: SortDirection;
    sortFn?: SortFn<TData> | SortFn<TData>[];
}

export interface ITableData<TData> {
    columns: ITableColumn<TData>[];
    data: TData[];
    rowIdFn: (data: TData) => string;
}
