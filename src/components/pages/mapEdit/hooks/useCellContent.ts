import { useMemo } from 'react';
import { ICellContent, IGridData } from '../types/IGridData';

interface IHookArguments {
    gridData: IGridData;
}

interface IHookResult {
    cellContentById: Record<string, ICellContent[]>;
}

export const useCellContent = (args: IHookArguments): IHookResult => {
    const { gridData } = args;
    const cellContentById = useMemo<Record<string, ICellContent[]>>(() => {
        return gridData.cellContent.reduce((acc, next) => ({
            ...acc,
            [next.id]: [
                ...(acc[next.id] ?? []),
                next,
            ],
        }), {} as Record<string, ICellContent[]>);
    }, [gridData]);

    return {
        cellContentById,
    };
}
