import { useMemo, useRef } from 'react';
import { useGridSize } from '../context/GridSizeContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { IShape } from '../types/IMapContent';
import { toGridPosition } from '../utils/coordinateUtils';
import { getRendeOrder } from '../utils/renderOrder';
import { Lines } from './Lines';

interface IProps {
    shape: IShape;
}

const LINE_Z = 0.01;
const OPACITY = 0.2;

export const Shape = (props: IProps) => {
    const { shape } = props;
    const gridSize = useGridSize();

    const visible = useZoomBasedVisibility('shape');
    const backgroundRenderOrder = getRendeOrder('shapeBackground');
    const lineRenderOrder = getRendeOrder('shapeBorder');

    const updateIterationRef = useRef<number>(0);

    const state = useMemo(() => {
        updateIterationRef.current++;
   
        const geometryPoints = new Float32Array(shape.positions.reverse().reduce((acc, position) => {
            const [x, y] = toGridPosition(position, gridSize);
            return [...acc, x, y, 0];
        }, [] as number[]));

        const [firstX, firstY] = toGridPosition(shape.positions[0], gridSize);
        const borderPoints = new Float32Array(shape.positions.reduce((acc, position, index) => {
            const [x, y] = toGridPosition(position, gridSize);
            const previousX = acc.at(-3) ?? firstX;
            const previousY = acc.at(-2) ?? firstY;

            // autoclose
            if (index === shape.positions.length - 1) {
                return [...acc, previousX, previousY, LINE_Z, x, y, LINE_Z, x, y, LINE_Z, firstX, firstY, LINE_Z];
            }

            return [...acc, previousX, previousY, LINE_Z, x, y, LINE_Z];
        }, [] as number[]));

        return {
            geometryPoints,
            borderPoints,
        } as const;
    }, [shape, gridSize, updateIterationRef]);

    return (
        <group key={`${shape.id}_${updateIterationRef.current}`}>
            {shape.type === 'filled' && (
                <mesh position={[0, 0, 0]} renderOrder={backgroundRenderOrder} visible={visible}>
                    <bufferGeometry attach="geometry" onUpdate={self => self.computeVertexNormals()}>
                        <bufferAttribute
                            attach="attributes-position"
                            array={state.geometryPoints}
                            count={state.geometryPoints.length / 3}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <meshBasicMaterial color={shape.color} opacity={OPACITY} transparent={true} depthWrite={false} />
                </mesh>
            )}
            {shape.type === 'outlined' && (
                <Lines visible={visible} points={state.borderPoints} color={shape.color} renderOrder={lineRenderOrder} />
            )}
        </group>
    );
};
