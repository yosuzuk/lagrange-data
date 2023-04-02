import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { useDebug } from '../context/DebugContext';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getAngleBetweenAngles, getAngleBetweenVectors, getDistance, getGridPositionByAngleAndRadius, getRingThetaByGridPosition, toGridPosition } from '../utils/coordinateUtils';
import { getZ } from '../utils/zUtils';
import { useZoomBasedOpacity, useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { t } from '../../../../i18n';

const MAX_THETA_LENGTH = Math.PI * 2;
const MIN_THETA_SEGMENTS = 3;

interface IProps {
    innerRadiusPoint: GamePosition;
    outerRadiusPoint: GamePosition;
    angleStartPoint: GamePosition;
    angleEndPoint: GamePosition;
    color: string;
    regionNumber?: number;
    label?: string | null;
}

interface IState {
    innerRadius: number;
    outerRadius: number;
    thetaStart: number;
    thetaLength: number;
    thetaSegments: number;
    textPosition: GridPosition;
}

export const Region = (props: IProps) => {
    const { regionNumber, color, label, angleStartPoint, angleEndPoint, innerRadiusPoint, outerRadiusPoint } = props;
    const gridSize = useGridSize();
    const debug = useDebug();
    const backgroundVisible = useZoomBasedVisibility('zoneBackground');
    const backgroundOpacity = useZoomBasedOpacity('zoneBackground');
    const labelVisible = useZoomBasedVisibility('zoneLabel');

    const state = useMemo<IState>(() => {
        const innerGridPosition = toGridPosition(innerRadiusPoint, gridSize);
        const outerGridPosition = toGridPosition(outerRadiusPoint, gridSize);
        const gridStart = toGridPosition(angleStartPoint, gridSize);
        const gridEnd = toGridPosition(angleEndPoint, gridSize);

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
    }, [angleStartPoint, angleEndPoint, innerRadiusPoint, outerRadiusPoint, gridSize]);

    return (
        <>
            {backgroundVisible && (
                <mesh position={[0, 0, getZ('region')]}>
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
                    <meshStandardMaterial
                        color={color}
                        wireframe={debug}
                        transparent={true}
                        opacity={backgroundOpacity ?? undefined}
                    />
                </mesh>
            )}
            {labelVisible && (Number.isFinite(regionNumber) || label) && (
                <mesh position={[...state.textPosition, getZ('regionText')]}>
                    <Text
                        color="white"
                        anchorX="center"
                        anchorY="middle"
                        textAlign='center'
                        fontSize={12}
                    >
                        {[
                            ...(Number.isFinite(regionNumber) ? [t('mapEdit.regionValue', { value: regionNumber })] : []),
                            ...(label ? [label] : []),
                        ].join('\n')}
                    </Text>
                </mesh>
            )}
        </>
    );
};
