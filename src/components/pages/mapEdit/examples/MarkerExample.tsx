import { MapContent } from '../3d/MapContent';
import { Planet } from '../3d/Planet';
import { WorldMap } from '../3d/WorldMap';
import { Zone } from '../3d/Zone';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $marker
    (1020,2020)
    (1020,3040)
    (2040,2020) Gather here
    (2040,3040) Target
    (3060,2020) #D Gold
    (3060,3040) #c00FF00 Hex Color
`;

export const MarkerExample = () => {
    const { mapContent } = useMapContent(input);

    return (
        <WorldMap systemName="Marker example" size={10000}>
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
