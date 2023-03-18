import { IGridData } from '../types/IGridData';

export function createInitialGridData(): IGridData {
    return {
        minColumnIndex: -1,
        maxColumnIndex: 2,
        minRowIndex: -1,
        maxRowIndex: 1,
        cellContent: [],
        multiCellContent: [],
    };
}
