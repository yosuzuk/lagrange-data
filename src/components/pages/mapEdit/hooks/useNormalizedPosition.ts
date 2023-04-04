import { useMemo } from 'react';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { normalizePosition } from '../utils/coordinateUtils';

interface IHookArgs {
    gamePosition?: GamePosition;
    gridPosition?: GridPosition;
}

export const useNormalizedPosition = ({ gamePosition, gridPosition }: IHookArgs) => {
    const gridSize = useGridSize();
    return useMemo<GridPosition>(() => normalizePosition(gamePosition, gridPosition, gridSize), [gamePosition, gridPosition, gridSize]);
};
