import { useState, useCallback, useMemo, useEffect } from 'react';
import { useGridSize } from '../context/GridSizeContext';

const SIZE_FACTOR = 5;

interface IProps {

}

export const MapBorders = (props: IProps) => {
    const { } = props;
    const gridSize = useGridSize();

    return (
        <>
            <mesh position={[0, (gridSize * SIZE_FACTOR / 2) + (gridSize / 2), 0]}>
                <planeGeometry args={[gridSize, gridSize * SIZE_FACTOR]} />
                <meshBasicMaterial color="black" transparent={true} opacity={0.5} />
            </mesh>
            <mesh position={[0, (gridSize * SIZE_FACTOR / -2) - (gridSize / 2), 0]}>
                <planeGeometry args={[gridSize, gridSize * SIZE_FACTOR]} />
                <meshBasicMaterial color="black" transparent={true} opacity={0.5} />
            </mesh>
            <mesh position={[(gridSize * SIZE_FACTOR / 2) + (gridSize / 2), 0, 0]}>
                <planeGeometry args={[gridSize * SIZE_FACTOR, gridSize * SIZE_FACTOR * 2]} />
                <meshBasicMaterial color="black" transparent={true} opacity={0.5} />
            </mesh>
            <mesh position={[(gridSize * SIZE_FACTOR / -2) - (gridSize / 2), 0, 0]}>
                <planeGeometry args={[gridSize * SIZE_FACTOR, gridSize * SIZE_FACTOR * 2]} />
                <meshBasicMaterial color="black" transparent={true} opacity={0.5} />
            </mesh>
        </>
    );
};
