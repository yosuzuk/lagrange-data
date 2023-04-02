import { IMapContent } from '../types/IMapContent';
import { Marker } from './Marker';
import { Region } from './Region';

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
        </>
    );
};
