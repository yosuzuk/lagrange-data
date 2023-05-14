import { ThreeEvent } from '@react-three/fiber';
import { useMemo, useRef, useCallback } from 'react';
import { useGridSize } from '../context/GridSizeContext';
import { useZoomBasedOpacity, useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { IHive, IMapContent } from '../types/IMapContent';
import { snapToGrid, toGridPosition } from '../utils/coordinateUtils';
import { getRendeOrder } from '../utils/renderOrder';
import { Lines } from './Lines';
import { Plane } from './Plane';
import { TextLabel } from './TextLabel';

interface IProps {
    hive: IHive;
    onClick?: (content: IMapContent) => void;
}

const LINE_Z = 0.01;

export const Hive = (props: IProps) => {
    const { hive, onClick } = props;
    const gridSize = useGridSize();
    const areaVisible = useZoomBasedVisibility('hiveArea');
    const edgeVisible = useZoomBasedVisibility('hiveEdge');
    const backgroundOpacity = useZoomBasedOpacity('hiveBackground');

    const updateIterationRef = useRef<number>(0);

    const state = useMemo(() => {
        updateIterationRef.current++;

        const [x1, y1] = snapToGrid(toGridPosition(hive.position1, gridSize));
        const [x2, y2] = snapToGrid(toGridPosition(hive.position2, gridSize));

        const [xLeft, xRight] = x2 > x1 ? [x1, x2] : [x2, x1];
        const [yBottom, yTop] = y2 > y1 ? [y1, y2] : [y2, y1];

        const width = xRight - xLeft;
        const height = yTop - yBottom;
        const x = xLeft + (width / 2);
        const y = yBottom + (height / 2);

        return {
            x,
            y,
            width,
            height,
            lines: createGridLines(xLeft, xRight, yBottom, yTop),
        } as const;
    }, [hive, gridSize, updateIterationRef]);

    const lineRenderOrder = getRendeOrder('areaLines');

    const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick?.(hive);
    }, [onClick, hive]);

    return (
        <group key={`${hive.id}_${updateIterationRef.current}`}>
            <Plane
                position={[state.x, state.y, 0]}
                width={state.width}
                height={state.height}
                color={hive.color}
                opacity={backgroundOpacity}
                visible={areaVisible}
                border={false}
                renderOrder={getRendeOrder('area')}
                onClick={handleClick}
            />
            <group visible={edgeVisible}>
                {state.lines.map((line: Float32Array, index: number) => (
                    <Lines key={`line${index}`} points={line} color={hive.color} renderOrder={lineRenderOrder} />
                ))}
            </group>
            <TextLabel
                key={`${hive.id}_label_${updateIterationRef.current}`}
                gridPosition={[state.x, state.y]}
                text={`${hive.label}`}
                fontSize={72}
                scale={0.05}
                visible={!!hive.label}
            />
        </group>
    );
};

function createGridLines(xLeft: number, xRight: number, yBottom: number, yTop: number): Float32Array[] {
    const lines: number[][] = [];

    for (let i = xLeft; i < xRight + 1; i++) {
        lines.push([
            i, yTop, LINE_Z,
            i, yBottom, LINE_Z,
        ]);
    }

    for (let i = yBottom; i < yTop + 1; i++) {
        lines.push([
            xLeft, i, LINE_Z,
            xRight, i, LINE_Z,
        ]);
    }

    return lines.map(l => new Float32Array(l));
}
