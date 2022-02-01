import { ITableColumn, ITableHeaderCell, ITableData, ITableRow, SortDirection } from '../types/ITable';
import { toggleSortState, DEFAULT_SORT_DIRECTION } from './sorting';

export function createHeaderCell<TData>(
    columnDefinition: ITableColumn<TData>,
    currentSortBy: string | null,
    currentSortDirection: SortDirection,
    setSorting: (sortBy: string | null, sortDirection: SortDirection) => void,
): ITableHeaderCell {
    if (!columnDefinition.sortFn) {
        return {
            id: `header_${columnDefinition.id}`,
            content: columnDefinition.renderHeader(null, null),
            sortDirection: null,
            toggleSort: null,
        };
    }

    const toggleSort = () => {
        setSorting(
            columnDefinition.id,
            columnDefinition.id === currentSortBy ? toggleSortState(currentSortDirection) : DEFAULT_SORT_DIRECTION,
        );
    };
    const ownSortDirection = columnDefinition.id === currentSortBy ? currentSortDirection : null;
    return {
        id: `header_${columnDefinition.id}`,
        content: columnDefinition.renderHeader(ownSortDirection, toggleSort),
        sortDirection: ownSortDirection,
        toggleSort,
    };
}

export function createTableRows<TData>(tableData: ITableData<TData>, columnDefinitions: ITableColumn<TData>[]): ITableRow[] {
    return tableData.data.map((data: TData): ITableRow => ({
        id: tableData.rowIdFn(data),
        cells: columnDefinitions.map(columnDefinition => ({
            id: `${tableData.rowIdFn(data)}_${columnDefinition.id}`,
            content: columnDefinition.renderCell(data),
        })),
    }));
}
