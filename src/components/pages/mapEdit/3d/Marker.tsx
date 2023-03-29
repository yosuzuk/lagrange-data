import { useState, useCallback, useMemo, useEffect } from 'react';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition } from '../types/Coordinates';
import { toGridPosition } from '../utils/coordinateUtils';

interface IProps {
    position: GamePosition;
}

export const Marker = (props: IProps) => {
    const { position } = props;
    const gridSize = useGridSize();

    return (
        <mesh position={[...toGridPosition(position, gridSize), 0]}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial />
        </mesh>
    );
};
