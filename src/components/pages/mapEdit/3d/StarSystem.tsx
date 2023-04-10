import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Sun } from './Sun';
import { WorldLabel } from './WorldLabel';
import { StarsBackground } from './StarsBackground';
import { MapBorders } from './MapBorders';
import { MapGrid } from './MapGrid';
import { IMapData } from '../types/IMapContent';
import { Area } from './Area';
import { Marker } from './Marker';
import { Planet } from './Planet';
import { PlayerBase } from './PlayerBase';
import { Region } from './Region';
import { Station } from './Station';

interface IProps {
    mapData: IMapData;
}

export const StarSystem = (props: IProps) => {
    const { mapData } = props;
    const { invalidate } = useThree();

    useEffect(() => {
        console.log(`invalidate frame for "${mapData.name}"`);
        invalidate();
    }, [invalidate, mapData]);

    return (
        <>
            <StarsBackground starCount={200} starSize={3} zOffset={300} />
            <StarsBackground starCount={1000} starSize={0.2} zOffset={500} />
            <MapBorders />
            <MapGrid />
            <Sun />
            <pointLight position={[0, 0, 40]} castShadow={true} intensity={1.2} />
            {mapData.name && (
                <WorldLabel worldName={mapData.name} />
            )}
            {mapData.marker.map(marker => (
                <Marker key={marker.id} id={marker.id} position={marker.position} color={marker.color} label={marker.label} />
            ))}
            {mapData.regions.map(region => (
                <Region
                    key={region.id}
                    id={region.id}
                    innerRadiusPoint={region.innerRadiusPoint}
                    outerRadiusPoint={region.outerRadiusPoint}
                    angleStartPoint={region.angleStartPoint}
                    angleEndPoint={region.angleEndPoint}
                    color={region.color}
                    regionNumber={region.regionNumber}
                    label={region.label}
                />
            ))}
            {mapData.planets.map(planet => (
                <Planet
                    key={planet.id}
                    position={planet.position}
                    orbitCenter={planet.orbitCenter}
                    size={planet.size}
                    color={planet.color}
                    name={planet.name}
                />
            ))}
            {mapData.areas.map(area => (
                <Area key={area.id} area={area} />
            ))}
            {mapData.stations.map(station => (
                <Station key={station.id} station={station} />
            ))}
            {mapData.bases.map(base => (
                <PlayerBase key={base.id} base={base} />
            ))}
        </>
    );
};
