import { MapContent } from '../3d/MapContent';
import { WorldMap } from '../3d/WorldMap';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $region
    (1000,5000)(0,5000)(6000,1000)(1000,6000) #R 1 My Union
    (2000,5000)(1000,5000)(9000,6000)(6000,1000) #D 2 My Union
    (3000,5000)(2000,5000)(4000,9000)(9000,6000) #c00FF00 3 My Union
    (4000,5000)(3000,5000)(1000,4000)(4000,9000) #cFF00FF 4 My Union

    $marker
    (1000,5000) Marks inner radius
    (0,5000) Marks outer radius
    (6000,1000) Marks start angle
    (1000,6000) Marks end angle
`;

export const RegionExample = () => {
    const { mapContent } = useMapContent(input);

    return (
        <WorldMap systemName="Example Star System" size={10000}>
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
