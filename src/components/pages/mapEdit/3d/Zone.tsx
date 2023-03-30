import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { useDebug } from '../context/DebugContext';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getAngleBetweenAngles, getAngleBetweenVectors, getDistance, getGridPositionByAngleAndRadius, getRingThetaByGridPosition, toGridPosition } from '../utils/coordinateUtils';
import { Marker } from './Marker';
import { getZ } from '../utils/zUtils';

const MAX_THETA_LENGTH = Math.PI * 2;
const MIN_THETA_SEGMENTS = 3;

interface IProps {
    zoneNumber?: number;
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
    textPosition: GridPosition;
}

export const Zone = (props: IProps) => {
    const { zoneNumber, color, label, startPos, endPos, innerPos, outerPos } = props;
    const gridSize = useGridSize();
    const debug = useDebug();

    const state = useMemo<IState>(() => {
        const innerGridPosition = toGridPosition(innerPos, gridSize);
        const outerGridPosition = toGridPosition(outerPos, gridSize);
        const gridStart = toGridPosition(startPos, gridSize);
        const gridEnd = toGridPosition(endPos, gridSize);

        // properties for the ring
        const innerRadius = getDistance(innerGridPosition, [0, 0]);
        const outerRadius = getDistance(outerGridPosition, [0, 0]);
        const thetaStart = getRingThetaByGridPosition(gridEnd); // use gridEnd, span direction is inversed
        const thetaLength = getAngleBetweenVectors(gridEnd, gridStart);
        const thetaSegments = Math.max(Math.round(60 * (thetaLength / MAX_THETA_LENGTH)), MIN_THETA_SEGMENTS);

        // properties for text
        const thetaEnd = getRingThetaByGridPosition(gridStart);
        const angleForText = getAngleBetweenAngles(thetaStart, thetaEnd);
        const radiusForText = innerRadius + ((outerRadius - innerRadius) / 2);
        const textPosition = getGridPositionByAngleAndRadius(angleForText, radiusForText);

        return {
            innerRadius,
            outerRadius,
            thetaStart,
            thetaLength,
            thetaSegments,
            textPosition,
        };
    }, [startPos, endPos, innerPos, outerPos, gridSize]);

    return (
        <>
            <mesh position={[0, 0, getZ('zone')]}>
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
            {(Number.isFinite(zoneNumber) || label) && (
                <mesh position={[...state.textPosition, getZ('zoneText')]}>
                    <Text
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        textAlign='center'
                        fontSize={12}
                    >
                        {[
                            ...(Number.isFinite(zoneNumber) ? [`Zone ${zoneNumber}`] : []),
                            ...(label ? [label] : []),
                        ].join('\n')}
                    </Text>
                </mesh>
            )}
        </>
    );
};
