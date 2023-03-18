import { useState, useCallback } from 'react';
import { GridSide, IGridData } from '../types/IGridData';
import { createInitialGridData } from '../utils/gridDataUtils';

interface IHookResult {
    gridData: IGridData;
    addCells: (side: GridSide) => void;
    removeCells: (side: GridSide) => void;
}

export const useGridData = (): IHookResult => {
    const [gridData, setGridData] = useState<IGridData>(createInitialGridData());

    const addCells = useCallback((side: GridSide) => {
        setGridData(gridData => {
            switch (side) {
                case 'left': {
                    return { ...gridData, minColumnIndex: gridData.minColumnIndex - 1 };
                }
                case 'right': {
                    return { ...gridData, maxColumnIndex: gridData.maxColumnIndex + 1 };
                }
                case 'top': {
                    return { ...gridData, minRowIndex: gridData.minRowIndex - 1 };
                }
                case 'bottom': {
                    return { ...gridData, maxRowIndex: gridData.maxRowIndex + 1 };
                }
            }
        });
    }, []);

    const removeCells = useCallback((side: GridSide) => {
        setGridData(gridData => {
            switch (side) {
                case 'left': {
                    return {
                        ...gridData,
                        cellContent: gridData.cellContent.filter(content => content.columnIndex > gridData.minColumnIndex),
                        minColumnIndex: gridData.minColumnIndex + 1,
                    };
                }
                case 'right': {
                    return {
                        ...gridData,
                        cellContent: gridData.cellContent.filter(content => content.columnIndex < gridData.maxColumnIndex),
                        maxColumnIndex: gridData.maxColumnIndex - 1,
                    };
                }
                case 'top': {
                    return {
                        ...gridData,
                        cellContent: gridData.cellContent.filter(content => content.rowIndex > gridData.minRowIndex),
                        minRowIndex: gridData.minRowIndex + 1,
                    };
                }
                case 'bottom': {
                    return {
                        ...gridData,
                        cellContent: gridData.cellContent.filter(content => content.rowIndex < gridData.maxRowIndex),
                        maxRowIndex: gridData.maxRowIndex - 1,
                    };
                }
            }
        });
    }, []);

    return {
        gridData,
        addCells,
        removeCells,
    };
};
