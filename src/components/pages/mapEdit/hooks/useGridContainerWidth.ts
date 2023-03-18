import { useState, useCallback } from 'react';
import { IGridData } from '../types/IGridData';

interface IHookArguments {
    gridData: IGridData;
    gridControlSize: number;
    rootPadding: number;
}

interface IHookResult {
    gridContainerWidth: string;
}

export const useGridContainerWidth = (args: IHookArguments): IHookResult => {
    const { gridData, gridControlSize, rootPadding } = args;
    const innerColumnCount = gridData.maxColumnIndex - gridData.minColumnIndex + 1;
    const innerRowCount = gridData.maxRowIndex - gridData.minRowIndex + 1;

    const availableSpaceRatio = (window.innerHeight - (2 * gridControlSize) - (2 * rootPadding)) / (window.innerWidth - (2 * gridControlSize) - (2 * rootPadding));
    const requiredSpaceRatio = innerRowCount / innerColumnCount;
    const adaptToWidth = availableSpaceRatio > requiredSpaceRatio;

    const gridContainerWidth = adaptToWidth ? '100%' : (() => {
        const innerGridHeight = window.innerHeight - (2 * gridControlSize) - (2 * rootPadding);
        const maxCellHeight = innerGridHeight / innerRowCount;
        const innerGridWidth = maxCellHeight * innerColumnCount;
        return `${innerGridWidth + (2 * gridControlSize)}px`;
    })();

    return {
        gridContainerWidth,
    };
};
