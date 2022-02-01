import { ITableColumn, ITableData, SortDirection, SortFn } from '../types/ITable';

export const DEFAULT_SORT_DIRECTION = 'asc';

export function toggleSortState(sortDirection: SortDirection): SortDirection {
    if (sortDirection === null) {
        return DEFAULT_SORT_DIRECTION;
    }
    return sortDirection === 'asc' ? 'desc' : 'asc';
}

export function createInitialSortState<TData>(columnDefinitions: ITableColumn<TData>[]) {
    const columnForSorting = columnDefinitions.find(column => !!column.initialSortDirection);
    return {
        initialSortBy: columnForSorting?.id ?? null,
        initialSortDirection: columnForSorting?.initialSortDirection ?? DEFAULT_SORT_DIRECTION,
    };
}

export function sortTableData<TData>(
    tableData: ITableData<TData>,
    sortFn?: SortFn<TData> | SortFn<TData>[] | null,
    sortDirection?: SortDirection,
): ITableData<TData> {
    if (!sortFn) {
        return tableData;
    }

    const sortedData = [...tableData.data];
    sortedData.sort(normalizeSortFn(sortFn));
    if (sortDirection === 'desc') {
        sortedData.reverse();
    }

    return {
        ...tableData,
        data: sortedData,
    };
}

function normalizeSortFn<TData>(sortFn: SortFn<TData> | SortFn<TData>[]): SortFn<TData> {
    if (Array.isArray(sortFn)) {
        return (a: TData, b: TData) => (sortFn as SortFn<TData>[])
            .reduce((result: number, nextSortFn: SortFn<TData>) => result !== 0 ? result : nextSortFn(a, b), 0);
    }

    return sortFn;
}
