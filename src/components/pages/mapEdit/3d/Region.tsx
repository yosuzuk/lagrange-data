import { useMemo, useRef } from 'react';
import { useDebug } from '../context/DebugContext';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getAngleBetweenAngles, getAngleBetweenVectors, getDistance, getGridPositionByAngleAndRadius, getRingThetaByGridPosition, toGridPosition } from '../utils/coordinateUtils';
import { useZoomBasedOpacity, useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { t } from '../../../../i18n';
import { TextLabel } from './TextLabel';
import { getRendeOrder } from '../utils/renderOrder';
import { IRegion } from '../types/IMapContent';

const MAX_THETA_LENGTH = Math.PI * 2;
const MIN_THETA_SEGMENTS = 3;

interface IProps {
    region: IRegion;
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
    const { region } = props;
    const gridSize = useGridSize();
    const debug = useDebug();
    const backgroundVisible = useZoomBasedVisibility('zoneBackground');
    const backgroundOpacity = useZoomBasedOpacity('zoneBackground');
    const labelVisible = useZoomBasedVisibility('zoneLabel');

    const updateIterationRef = useRef<number>(0);

    const state = useMemo<IState>(() => {
        updateIterationRef.current++;

        const innerGridPosition = toGridPosition(region.innerRadiusPoint, gridSize);
        const outerGridPosition = toGridPosition(region.outerRadiusPoint, gridSize);
        const gridStart = toGridPosition(region.angleStartPoint, gridSize);
        const gridEnd = toGridPosition(region.angleEndPoint, gridSize);

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
    }, [region, gridSize, updateIterationRef]);

    return (
        <>
            <mesh visible={backgroundVisible} position={[0, 0, 0]} renderOrder={getRendeOrder('region')}>
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
                <meshBasicMaterial
                    color={region.color}
                    wireframe={debug}
                    transparent={true}
                    opacity={backgroundOpacity ?? undefined}
                    depthWrite={false}
                />
            </mesh>
            {(Number.isFinite(region.regionNumber) || region.label) && (
                <TextLabel
                    key={`${region.id}_label_${updateIterationRef.current}`}
                    gridPosition={state.textPosition}
                    text={[
                        ...(region.label ? [region.label] : []),
                        ...(Number.isFinite(region.regionNumber) ? [t('mapEdit.regionValue', { value: region.regionNumber })] : []),
                    ].join('\n')}
                    fontSize={96}
                    scale={0.5}
                    visible={labelVisible}
                />
            )}
        </>
    );
};
