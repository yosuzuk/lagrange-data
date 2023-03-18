export type GridSide = 'left' | 'right' | 'top' | 'bottom';

export interface IGridData {
    minColumnIndex: number;
    maxColumnIndex: number;
    minRowIndex: number;
    maxRowIndex: number;
    cellContent: ICellContent[];
    multiCellContent: IMultiCellContent[];
}

export interface ICellContent {
    id: string;
    columnIndex: number;
    rowIndex: number;
}

export interface IMultiCellContent {
    id: string;
    minColumnIndex: number;
    maxColumnIndex: number;
    minRowIndex: number;
    maxRowIndex: number;
}
