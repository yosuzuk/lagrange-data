export type GridSide = 'left' | 'right' | 'top' | 'bottom';

export interface IGridData {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    cellContent: ICellContent[];
    multiCellContent: IMultiCellContent[];
}

export interface ICellContent {
    id: string;
    x: number;
    y: number;
}

export interface IMultiCellContent {
    id: string;
    minColumnIndex: number;
    maxColumnIndex: number;
    minRowIndex: number;
    maxRowIndex: number;
}
