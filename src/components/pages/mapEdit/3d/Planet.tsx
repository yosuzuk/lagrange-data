import { useDebug } from '../context/DebugContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { IPlanet } from '../types/IMapContent';
import { PlanetSize } from '../types/PlanetSize';
import { getRendeOrder } from '../utils/renderOrder';
import { Orbit } from './Orbit';
import { PlanetLabel } from './PlanetLabel';

const radiusBySize: Record<PlanetSize, number> = {
    large: 2.5,
    medium: 1.5,
    small: 0.5,
};

interface IProps {
    planet: IPlanet;
}

export const Planet = (props: IProps) => {
    const { planet } = props;
    const debug = useDebug();

    const subPlanetOrbitVisible = useZoomBasedVisibility('subPlanetOrbit');

    const position = useNormalizedPosition({
        gamePosition: planet.position,
    });

    const radius = radiusBySize[planet.size];
    const widthSegments = planet.size === 'small' ? 8 : 16;

    return (
        <>
            <mesh name={planet.id} position={[...position, 0]} renderOrder={getRendeOrder('planet')}>
                <sphereGeometry args={[radius, widthSegments, widthSegments]} />
                <meshStandardMaterial color={planet.color} wireframe={debug} />
            </mesh>
            <Orbit outerPos={planet.position} centerPos={planet.orbitCenter} visible={!planet.orbitCenter || subPlanetOrbitVisible} />
            {planet.name && (
                <PlanetLabel
                    key={`${planet.id}_${planet.name}`}
                    gridPosition={position}
                    planetName={planet.name}
                    planetSize={planet.size}
                />
            )}
        </>
    );
};
