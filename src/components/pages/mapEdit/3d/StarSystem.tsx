import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Sun } from './Sun';
import { WorldLabel } from './WorldLabel';
import { StarsBackground } from './StarsBackground';
import { MapBorders } from './MapBorders';
import { MapGrid } from './MapGrid';
import { IMapContent, IMapData } from '../types/IMapContent';
import { Marker } from './Marker';
import { Planet } from './Planet';
import { PlayerBase } from './PlayerBase';
import { Region } from './Region';
import { Station } from './Station';
import { PlayerOutpost } from './PlayerOutpost';
import { PlayerPlatform } from './PlayerPlatform';
import { Area } from './Area';
import { Hive } from './Hive';
import { Shape } from './Shape';
import { MapBackground } from './MapBackground';

interface IProps {
    mapData: IMapData;
    markTarget: (target: IMapContent | null) => void;
}

export const StarSystem = (props: IProps) => {
    const { mapData, markTarget } = props;
    const { invalidate } = useThree();
    const imagePath = null; // window.location.origin + window.location.pathname + 'foo.png';

    useEffect(() => {
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
            {mapData.serverName && (
                <WorldLabel worldName={mapData.serverName} />
            )}
            {mapData.marker.map(marker => (
                <Marker key={marker.id} marker={marker} onClick={markTarget} />
            ))}
            {mapData.regions.map(region => (
                <Region key={region.id} region={region} />
            ))}
            {mapData.planets.map(planet => (
                <Planet key={planet.id} planet={planet} />
            ))}
            {mapData.stations.map(station => (
                <Station key={station.id} station={station} onClick={markTarget} />
            ))}
            {mapData.areas.map(area => (
                <Area key={area.id} area={area} onClick={markTarget} />
            ))}
            {mapData.hives.map(hive => (
                <Hive key={hive.id} hive={hive} onClick={markTarget} />
            ))}
            {mapData.bases.map(base => (
                <PlayerBase key={base.id} base={base} onClick={markTarget} />
            ))}
            {mapData.outposts.map(outpost => (
                <PlayerOutpost key={outpost.id} outpost={outpost} onClick={markTarget} />
            ))}
            {mapData.platforms.map(platform => (
                <PlayerPlatform key={platform.id} platform={platform} onClick={markTarget} />
            ))}
            {mapData.shapes.map(shape => (
                <Shape key={shape.id} shape={shape} />
            ))}
            {imagePath && (
                <MapBackground imagePath={imagePath} />
            )}
        </>
    );
};
