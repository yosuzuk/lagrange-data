import { useMemo } from 'react';
import { degreesToRadians } from '../../../../utils/math';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getDistance, toGridPosition } from '../utils/coordinateUtils';
import { getZ } from '../utils/zUtils';

interface IProps {
    outerPos: GamePosition;
    centerPos?: GamePosition;
}

export const Orbit = (props: IProps) => {
    const { outerPos, centerPos } = props;
    const gridSize = useGridSize();

    const state = useMemo(() => {
        const outerGridPosition = toGridPosition(outerPos, gridSize);
        const anchorPosition = centerPos ? toGridPosition(centerPos, gridSize) : [0, 0] as GridPosition;
        return {
            anchorPosition,
            radius: getDistance(outerGridPosition, anchorPosition),
        } as const;
    }, [outerPos, centerPos]);

    return (
        <polarGridHelper
            args={[
                // radius
                state.radius,
                // sectors
                1,
                // rings
                1,
                // division
                64,
            ]}
            position={[...state.anchorPosition, getZ('orbit')]}
            rotation={[degreesToRadians(90), 0, 0]}
        >
            <lineBasicMaterial color="grey" />
        </polarGridHelper>
    );
};
