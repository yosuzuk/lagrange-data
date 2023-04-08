import { IMapContent } from '../types/IMapContent';
import { Area } from './Area';
import { Marker } from './Marker';
import { Planet } from './Planet';
import { PlayerBase } from './PlayerBase';
import { Region } from './Region';
import { Station } from './Station';

interface IProps {
    mapContent: IMapContent;
}

export const MapContent = (props: IProps) => {
    const { mapContent } = props;

    return (
        <>
            {mapContent.marker.map(marker => (
                <Marker key={marker.id} position={marker.position} color={marker.color} label={marker.label} />
            ))}
            {mapContent.regions.map(region => (
                <Region
                    key={region.id}
                    innerRadiusPoint={region.innerRadiusPoint}
                    outerRadiusPoint={region.outerRadiusPoint}
                    angleStartPoint={region.angleStartPoint}
                    angleEndPoint={region.angleEndPoint}
                    color={region.color}
                    regionNumber={region.regionNumber}
                    label={region.label}
                />
            ))}
            {mapContent.planets.map(planet => (
                <Planet
                    key={planet.id}
                    position={planet.position}
                    orbitCenter={planet.orbitCenter}
                    size={planet.size}
                    color={planet.color}
                    name={planet.name}
                />
            ))}
            {mapContent.areas.map(area => (
                <Area key={area.id} area={area} />
            ))}
            {mapContent.stations.map(station => (
                <Station key={station.id} station={station} />
            ))}
            {mapContent.bases.map(base => (
                <PlayerBase key={base.id} base={base} />
            ))}
        </>
    );
};
