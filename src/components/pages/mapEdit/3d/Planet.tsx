import { useEffect, useRef } from 'react';
import { useDebug } from '../context/DebugContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IPlanet } from '../types/IMapContent';
import { PlanetSize } from '../types/PlanetSize';
import { getRendeOrder } from '../utils/renderOrder';
import { CanvasSprite } from './CanvasSprite';
import { Orbit } from './Orbit';

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
    const labelVisible = useZoomBasedVisibility('planetLabel');

    const position = useNormalizedPosition({
        gamePosition: planet.position,
    });

    const radius = radiusBySize[planet.size];
    const widthSegments = planet.size === 'small' ? 8 : 16;

    const updateIterationRef = useRef<number>(0);

    useEffect(() => {
        updateIterationRef.current++;
    }, [updateIterationRef, planet]);

    return (
        <>
            <mesh name={planet.id} position={[...position, 0]} renderOrder={getRendeOrder('planet')}>
                <sphereGeometry args={[radius, widthSegments, widthSegments]} />
                <meshStandardMaterial color={planet.color} wireframe={debug} />
            </mesh>
            <Orbit outerPos={planet.position} centerPos={planet.orbitCenter} visible={!planet.orbitCenter || subPlanetOrbitVisible} />
            {planet.labelImage && (
                <CanvasSprite
                    key={`${planet.id}_label_${updateIterationRef.current}`}
                    gridPosition={position} canvas={planet.labelImage} visible={labelVisible}
                />
            )}
        </>
    );
};
