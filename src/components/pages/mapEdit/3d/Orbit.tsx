import { useMemo } from 'react';
import { degreesToRadians } from '../../../../utils/math';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getDistance, toGridPosition } from '../utils/coordinateUtils';
import { getRendeOrder } from '../utils/renderOrder';

interface IProps {
    outerPos: GamePosition;
    centerPos?: GamePosition | null;
    visible?: boolean;
}

export const Orbit = (props: IProps) => {
    const { outerPos, centerPos, visible = true } = props;
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
            visible={visible}
            args={[
                // radius
                state.radius,
                // sectors
                1,
                // rings
                1,
                // division
                state.radius > 200 ? 128 : 64,
            ]}
            position={[...state.anchorPosition, 0]}
            rotation={[degreesToRadians(90), 0, 0]}
            renderOrder={getRendeOrder('orbit')}
        >
            <lineBasicMaterial color="grey" />
        </polarGridHelper>
    );
};
