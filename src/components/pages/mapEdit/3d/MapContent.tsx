import { IMapContent } from '../types/IMapContent';
import { Marker } from './Marker';

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
        </>
    );
};
