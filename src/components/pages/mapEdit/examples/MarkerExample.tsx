import { MapContent } from '../3d/MapContent';
import { WorldMap } from '../3d/WorldMap';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $marker
    (1020,2020)
    (1020,3040)
    (2040,2020) Gather here
    (2040,3040) Target
    (3060,2020) #D Gold
    (3060,3040) #c00FF00 Hex Color #00FF00
    (4080,2020) 集合場所
`;

export const MarkerExample = () => {
    const { mapContent } = useMapContent(input);

    return (
        <WorldMap systemName="Example Star System" size={9000} empty={true}>
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
