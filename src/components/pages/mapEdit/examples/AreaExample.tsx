import { MapContent } from '../3d/MapContent';
import { WorldMap } from '../3d/WorldMap';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $area
    (5550,3550)(5500,3500)
    (5560,3500)(5610,3550) city
    (5500,3560)(5550,3610) city #cFF0000
    (5560,3560)(5610,3610) #c0000FF My Area

    $marker
    (5500,3500) A1
    (5550,3550) A2
    (5560,3500) B1
    (5610,3550) B2
    (5500,3560) C1
    (5550,3610) C2
    (5560,3560) D1
    (5610,3610) D2
`;

export const AreaExample = () => {
    const { mapContent } = useMapContent(input);

    return (
        <WorldMap systemName="Example Star System" size={9000} empty={true}>
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
