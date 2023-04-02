import { useDebug } from '../context/DebugContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { PlanetSize } from '../types/PlanetSize';
import { getZ } from '../utils/zUtils';
import { Orbit } from './Orbit';
import { PlanetLabel } from './PlanetLabel';

const radiusBySize: Record<PlanetSize, number> = {
    large: 2.5,
    medium: 1.5,
    small: 0.5,
};

interface IProps {
    size: PlanetSize;
    color: string;
    position: GamePosition;
    gridPosition?: GridPosition;
    orbitCenter?: GamePosition;
    name?: string;
}

export const Planet = (props: IProps) => {
    const { size, color, position: gamePosition, gridPosition, orbitCenter, name } = props;
    const debug = useDebug();

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    })

    const radius = radiusBySize[size];
    const widthSegments = size === 'small' ? 8 : 16;

    return (
        <>
            <mesh position={[...position, getZ('planet')]}>
                <sphereGeometry args={[radius, widthSegments, widthSegments]} />
                <meshStandardMaterial color={color} wireframe={debug} />
            </mesh>
            <Orbit outerPos={gamePosition} centerPos={orbitCenter} />
            {name && (
                <PlanetLabel gridPosition={position} planetName={name} planetSize={size} />
            )}
        </>
    );
};
