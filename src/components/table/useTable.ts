import { useCallback, useRef, useState } from 'react';
import { ITableColumn, ITable, ITableData, ITableHeaderCell, IUseTableResult } from './types/ITable';
import { createHeaderCell, createTableRows } from './utils/factory';
import { createInitialSortState, sortTableData } from './utils/sorting';
import { SortDirection } from '../../utils/sortingUtils';

interface IHookArgs {
    initialSorting?: [string | null, SortDirection];
    onChangeSorting?: (sorting: [string | null, SortDirection]) => void;
}

export const useTable = <TData>(args: IHookArgs = {}): IUseTableResult<TData> => {
    const { initialSorting, onChangeSorting } = args;

    const [table, setTable] = useState<ITable>({
        header: [],
        rows: [],
        sortBy: initialSorting?.[0] ?? null,
        sortDirection: initialSorting?.[1] ?? null,
    });

    const tableDataRef = useRef<ITableData<TData> | null>(null);

    const setTableData = useCallback((tableData: ITableData<TData>) => {
        const columnChanged = tableDataRef.current?.columns !== tableData.columns;
        const dataChanged = tableDataRef.current?.data !== tableData.data;
        if (!columnChanged && !dataChanged) {
            return;
        }

        tableDataRef.current = { ...tableDataRef.current, ...tableData };

        setTable(table => {
            const { initialSortBy, initialSortDirection } = createInitialSortState<TData>(tableData.columns);
            const sortBy = table.sortBy ?? initialSortBy ?? null;
            const sortDirection = table.sortDirection ?? initialSortDirection;
            const sortFn = tableData.columns.find(column => column.id === sortBy)?.sortFn ?? null;

            return {
                ...table,
                header: columnChanged ? tableData.columns.map((columnDefinition: ITableColumn<TData>): ITableHeaderCell => {
                    return createHeaderCell(columnDefinition, sortBy, sortDirection, setSorting);
                }) : table.header,
                rows: (columnChanged || dataChanged) ? createTableRows(
                    sortTableData<TData>(tableData, sortFn, sortDirection),
                    tableData.columns,
                ) : table.rows,
                sortBy,
                sortDirection,
            };
        });
    }, []);

    const setSorting = useCallback((sortBy: string | null, sortDirection: SortDirection) => {
        if (tableDataRef.current) {
            const sortFn = tableDataRef.current.columns.find(column => column.id === sortBy)?.sortFn;

            setTable({
                ...table,
                header: tableDataRef.current.columns.map((columnDefinition: ITableColumn<TData>): ITableHeaderCell => {
                    return createHeaderCell(columnDefinition, sortBy, sortDirection, setSorting);
                }),
                rows: createTableRows(
                    sortTableData<TData>(tableDataRef.current, sortFn, sortDirection),
                    tableDataRef.current.columns,
                ),
                sortBy,
                sortDirection,
            });
            onChangeSorting?.([sortBy, sortDirection]);
        }
    }, [table, tableDataRef, onChangeSorting]);

    return {
        table,
        setTableData,
        setSorting,
    };
}
