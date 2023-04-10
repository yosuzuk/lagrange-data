import { useMemo, useRef, Fragment } from 'react';
import { useGridSize } from '../context/GridSizeContext';
import { useZoomBasedOpacity, useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { IArea } from '../types/IMapContent';
import { snapToGrid, toGridPosition } from '../utils/coordinateUtils';
import { getRendeOrder } from '../utils/renderOrder';
import { Lines } from './Lines';
import { Plane } from './Plane';

interface IProps {
    area: IArea;
}

const LINE_Z = 0.01;
const CORNER_POINT_SIZE = 0.04;
const DIAGONAL_LINE_COLOR = '#545454';

export const Area = (props: IProps) => {
    const { area } = props;
    const gridSize = useGridSize();
    const areaVisible = useZoomBasedVisibility(area.type === 'city' ? 'cityArea' : 'defaultArea');
    const edgeVisible = useZoomBasedVisibility(area.type === 'city' ? 'cityAreaEdge' : 'defaultAreaEdge');
    const backgroundOpacity = useZoomBasedOpacity('areaBackground');

    const updateIterationRef = useRef<number>(0);

    const state = useMemo(() => {
        updateIterationRef.current++;

        const [x1, y1] = snapToGrid(toGridPosition(area.position1, gridSize));
        const [x2, y2] = snapToGrid(toGridPosition(area.position2, gridSize));

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

        const dxStart = (width * 0.1 * 0.5 * 0.25);
        const dxEnd = (width * 0.1 * 0.5 * 0.75);
        const dyStart = (width * 0.1 * 0.5 * 0.25);
        const dyEnd = (width * 0.1 * 0.5 * 0.75);

        const topLeftDiagonalLine = new Float32Array([
            xLeft + dxStart, yTop - dyStart, LINE_Z,
            xLeft + dxEnd, yTop - dyEnd, LINE_Z,
        ]);

        const topRightDiagonalLine = new Float32Array([
            xRight - dxStart, yTop - dyStart, LINE_Z,
            xRight - dxEnd, yTop - dyEnd, LINE_Z,
        ]);

        const bottomLeftDiagonalLine = new Float32Array([
            xLeft + dxStart, yBottom + dyStart, LINE_Z,
            xLeft + dxEnd, yBottom + dyEnd, LINE_Z,
        ]);

        const bottomRightDiagonalLine = new Float32Array([
            xRight - dxStart, yBottom + dyStart, LINE_Z,
            xRight - dxEnd, yBottom + dyEnd, LINE_Z,
        ]);

        return {
            x,
            y,
            width,
            height,
            xLeft,
            xRight,
            yTop,
            yBottom,
            borderLines,
            topLeftLines,
            topRightLines,
            bottomLeftLines,
            bottomRightLines,
            topLeftDiagonalLine,
            topRightDiagonalLine,
            bottomLeftDiagonalLine,
            bottomRightDiagonalLine,
        } as const;
    }, [area, gridSize, updateIterationRef]);

    if (!areaVisible) {
        return null;
    }

    const lineRenderOrder = getRendeOrder('areaLines');

    return (
        <Fragment key={`${area.id}_${updateIterationRef.current}`}>
            <Plane
                position={[state.x, state.y, 0]}
                width={state.width}
                height={state.height}
                color={area.color}
                opacity={backgroundOpacity}
                border={edgeVisible}
                renderOrder={getRendeOrder('area')}
            />
            {edgeVisible ? (
                <Lines points={state.borderLines} color={area.color} renderOrder={lineRenderOrder} />
            ) : (
                <>
                    <Lines points={state.topLeftLines} color={area.color} renderOrder={lineRenderOrder} />
                    <Lines points={state.topRightLines} color={area.color} renderOrder={lineRenderOrder} />
                    <Lines points={state.bottomLeftLines} color={area.color} renderOrder={lineRenderOrder} />
                    <Lines points={state.bottomRightLines} color={area.color} renderOrder={lineRenderOrder} />

                    <Lines points={state.topLeftDiagonalLine} color={DIAGONAL_LINE_COLOR} renderOrder={lineRenderOrder} />
                    <Lines points={state.topRightDiagonalLine} color={DIAGONAL_LINE_COLOR} renderOrder={lineRenderOrder} />
                    <Lines points={state.bottomLeftDiagonalLine} color={DIAGONAL_LINE_COLOR} renderOrder={lineRenderOrder} />
                    <Lines points={state.bottomRightDiagonalLine} color={DIAGONAL_LINE_COLOR} renderOrder={lineRenderOrder} />

                    <Plane position={[state.xLeft, state.yTop, LINE_Z]} width={CORNER_POINT_SIZE} height={CORNER_POINT_SIZE} color="white" renderOrder={lineRenderOrder} />
                    <Plane position={[state.xRight, state.yTop, LINE_Z]} width={CORNER_POINT_SIZE} height={CORNER_POINT_SIZE} color="white" renderOrder={lineRenderOrder} />
                    <Plane position={[state.xLeft, state.yBottom, LINE_Z]} width={CORNER_POINT_SIZE} height={CORNER_POINT_SIZE} color="white" renderOrder={lineRenderOrder} />
                    <Plane position={[state.xRight, state.yBottom, LINE_Z]} width={CORNER_POINT_SIZE} height={CORNER_POINT_SIZE} color="white" renderOrder={lineRenderOrder} />
                </>
            )}
        </Fragment>
    );
};
