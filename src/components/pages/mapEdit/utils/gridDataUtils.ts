import { IGridData } from '../types/IGridData';

export function createInitialGridData(): IGridData {
    return {
        minX: -1,
        maxX: 2,
        minY: -1,
        maxY: 1,
        cellContent: [],
        multiCellContent: [],
    };
}
