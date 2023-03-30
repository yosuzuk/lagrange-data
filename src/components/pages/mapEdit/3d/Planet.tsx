import { useDebug } from '../context/DebugContext';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition } from '../types/Coordinates';
import { toGridPosition } from '../utils/coordinateUtils';
import { getZ } from '../utils/zUtils';
import { Orbit } from './Orbit';

interface IProps {
    size: 'large' | 'small';
    color: string;
    position: GamePosition;
    centerPosition?: GamePosition;
}

export const Planet = (props: IProps) => {
    const { size, color, position, centerPosition } = props;
    const gridSize = useGridSize();
    const debug = useDebug();

    const radius = size === 'large' ? 2.5 : 0.5;
    const widthSegments = size === 'large' ? 16 : 8;

    return (
        <>
            <mesh position={[...toGridPosition(position, gridSize), getZ('planet')]}>
                <sphereGeometry args={[radius, widthSegments, widthSegments]} />
                <meshStandardMaterial color={color} wireframe={debug} />
            </mesh>
            <Orbit outerPos={position} centerPos={centerPosition} />
        </>
    );
};
