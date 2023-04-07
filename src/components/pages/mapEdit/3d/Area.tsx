import { Edges } from '@react-three/drei';
import { useMemo } from 'react';
import { useGridSize } from '../context/GridSizeContext';
import { useZoomBasedOpacity, useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { IArea } from '../types/IMapContent';
import { toGridPosition } from '../utils/coordinateUtils';
import { getRendeOrder } from '../utils/renderOrder';
import { Lines } from './Lines';

interface IProps {
    area: IArea;
}

const LINE_WIDTH = 2;
const LINE_Z = 0.01;

export const Area = (props: IProps) => {
    const { area } = props;
    const gridSize = useGridSize();
    const areaVisible = useZoomBasedVisibility(area.type === 'city' ? 'cityArea' : 'defaultArea');
    const edgeVisible = useZoomBasedVisibility(area.type === 'city' ? 'cityAreaEdge' : 'defaultAreaEdge');
    const backgroundOpacity = useZoomBasedOpacity('areaBackground');

    const state = useMemo(() => {
        const [x1, y1] = toGridPosition(area.position1, gridSize);
        const [x2, y2] = toGridPosition(area.position2, gridSize);

        const [xLeft, xRight] = x2 > x1 ? [x1, x2] : [x2, x1];
        const [yBottom, yTop] = y2 > y1 ? [y1, y2] : [y2, y1];

        const width = xRight - xLeft;
        const height = yTop - yBottom;
        const x = xLeft + (width / 2);
        const y = yBottom + (height / 2);

        const borderLines = new Float32Array([
            xLeft, yTop, LINE_Z,
            xRight, yTop, LINE_Z,
            xRight, yTop, LINE_Z,
            xRight, yBottom, LINE_Z,
            xRight, yBottom, LINE_Z,
            xLeft, yBottom, LINE_Z,
            xLeft, yBottom, LINE_Z,
            xLeft, yTop, LINE_Z,
        ]);

        const topLeftLines = new Float32Array([
            xLeft, yTop - (height * 0.1), LINE_Z,
            xLeft, yTop, LINE_Z,
            xLeft, yTop, LINE_Z,
            xLeft + (width * 0.1), yTop, LINE_Z,
        ]);

        const topRightLines = new Float32Array([
            xRight, yTop - (height * 0.1), LINE_Z,
            xRight, yTop, LINE_Z,
            xRight, yTop, LINE_Z,
            xRight - (width * 0.1), yTop, LINE_Z,
        ]);

        const bottomLeftLines = new Float32Array([
            xLeft, yBottom + (height * 0.1), LINE_Z,
            xLeft, yBottom, LINE_Z,
            xLeft, yBottom, LINE_Z,
            xLeft + (width * 0.1), yBottom, LINE_Z,
        ]);

        const bottomRightLines = new Float32Array([
            xRight, yBottom + (height * 0.1), LINE_Z,
            xRight, yBottom, LINE_Z,
            xRight, yBottom, LINE_Z,
            xRight - (width * 0.1), yBottom, LINE_Z,
        ]);

        return {
            x,
            y,
            width,
            height,
            borderLines,
            topLeftLines,
            topRightLines,
            bottomLeftLines,
            bottomRightLines,
        } as const;
    }, [area, gridSize]);

    if (!areaVisible) {
        return null;
    }

    const lineRenderOrder = getRendeOrder('areaLines');

    return (
        <>
            <mesh position={[state.x, state.y, 0]} renderOrder={getRendeOrder('area')}>
                <planeGeometry args={[state.width, state.height]} />
                <meshBasicMaterial color={area.color} opacity={backgroundOpacity ?? 1} transparent={true} depthWrite={false} />
                {edgeVisible && (
                    <Edges color={area.color} />
                )}
            </mesh>
            {edgeVisible ? (
                <Lines points={state.borderLines} color={area.color} lineWidth={LINE_WIDTH} renderOrder={lineRenderOrder} />
            ) : (
                <>
                    <Lines points={state.topLeftLines} color={area.color} lineWidth={LINE_WIDTH} renderOrder={lineRenderOrder} />
                    <Lines points={state.topRightLines} color={area.color} lineWidth={LINE_WIDTH} renderOrder={lineRenderOrder} />
                    <Lines points={state.bottomLeftLines} color={area.color} lineWidth={LINE_WIDTH} renderOrder={lineRenderOrder} />
                    <Lines points={state.bottomRightLines} color={area.color} lineWidth={LINE_WIDTH} renderOrder={lineRenderOrder} />
                </>
            )}
        </>
    );
};
