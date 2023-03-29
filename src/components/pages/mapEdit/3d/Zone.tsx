import { useMemo } from 'react';
import { degreesToRadians, radiansToDegrees } from '../../../../utils/math';
import { useDebug } from '../context/DebugContext';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition } from '../types/Coordinates';
import { getAngleBetweenVectors, getDistance, getRingThetaByGridPosition, toGridPosition } from '../utils/coordinateUtils';

const MAX_THETA_LENGTH = Math.PI * 2;
const MIN_THETA_SEGMENTS = 3;

interface IProps {
    number?: number;
    label?: string;
    color: string;
    startPos: GamePosition;
    endPos: GamePosition;
    innerPos: GamePosition;
    outerPos: GamePosition;
}

interface IState {
    innerRadius: number;
    outerRadius: number;
    thetaStart: number;
    thetaLength: number;
    thetaSegments: number;
}

export const Zone = (props: IProps) => {
    const { color, startPos, endPos, innerPos, outerPos } = props;
    const gridSize = useGridSize();
    const debug = useDebug();

    const state = useMemo<IState>(() => {
        const innerGridPosition = toGridPosition(innerPos, gridSize);
        const innerRadius = getDistance(innerGridPosition, [0, 0]);

        const outerGridPosition = toGridPosition(outerPos, gridSize);
        const outerRadius = getDistance(outerGridPosition, [0, 0]);

        const gridStart = toGridPosition(startPos, gridSize);
        const gridEnd = toGridPosition(endPos, gridSize);

        // we use gridEnd for thetaStart because the span direction is inversed
        const thetaStart = getRingThetaByGridPosition(gridEnd);
        const thetaLength = getAngleBetweenVectors(gridEnd, gridStart);

        const thetaSegments = Math.max(Math.round(60 * (thetaLength / MAX_THETA_LENGTH)), MIN_THETA_SEGMENTS);

        return {
            innerRadius,
            outerRadius,
            thetaStart,
            thetaLength,
            thetaSegments,
        };
    }, [startPos, endPos, innerPos, outerPos, gridSize]);

    console.log(`${color}: ${toGridPosition(startPos, gridSize)}`)

    return (
        <mesh position={[0, 0, 0]}>
            <ringGeometry
                args={[
                    // innerRadius: Float
                    state.innerRadius,
                    // outerRadius: Float
                    state.outerRadius,
                    // thetaSegments: Integer
                    state.thetaSegments,
                    // phiSegments: Integer
                    1,
                    // thetaStart: Float
                    state.thetaStart,
                    // thetaLength: Float
                    state.thetaLength,
                ]}
            />
            <meshStandardMaterial color={color} wireframe={debug} />
        </mesh>
    );
};
