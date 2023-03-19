import { useState, useCallback } from 'react';
import { GridSide, IGridData } from '../types/IGridData';
import { createInitialGridData } from '../utils/gridDataUtils';

interface IHookResult {
    gridData: IGridData;
    openedCellId: string | null;
    addCells: (side: GridSide) => void;
    removeCells: (side: GridSide) => void;
    toggleCell: (cellId: string) => void;
}

export const useGridData = (): IHookResult => {
    const [gridData, setGridData] = useState<IGridData>(createInitialGridData());
    const [openedCellId, setOpenedCellId] = useState<string | null>(null);

    const addCells = useCallback((side: GridSide) => {
        setGridData(gridData => {
            switch (side) {
                case 'left': {
                    return { ...gridData, minX: gridData.minX - 1 };
                }
                case 'right': {
                    return { ...gridData, maxX: gridData.maxX + 1 };
                }
                case 'top': {
                    return { ...gridData, minY: gridData.minY - 1 };
                }
                case 'bottom': {
                    return { ...gridData, maxY: gridData.maxY + 1 };
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
                        cellContent: gridData.cellContent.filter(content => content.x > gridData.minX),
                        minX: gridData.minX + 1,
                    };
                }
                case 'right': {
                    return {
                        ...gridData,
                        cellContent: gridData.cellContent.filter(content => content.x < gridData.maxX),
                        maxX: gridData.maxX - 1,
                    };
                }
                case 'top': {
                    return {
                        ...gridData,
                        cellContent: gridData.cellContent.filter(content => content.y > gridData.minY),
                        minY: gridData.minY + 1,
                    };
                }
                case 'bottom': {
                    return {
                        ...gridData,
                        cellContent: gridData.cellContent.filter(content => content.y < gridData.maxY),
                        maxY: gridData.maxY - 1,
                    };
                }
            }
        });
    }, []);

    const toggleCell = useCallback((cellId: string) => {
        setOpenedCellId(state => state === cellId ? null : cellId);
    }, []);

    return {
        gridData,
        openedCellId,
        addCells,
        removeCells,
        toggleCell,
    };
};
