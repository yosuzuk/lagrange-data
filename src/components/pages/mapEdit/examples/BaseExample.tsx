import { MapContent } from '../3d/MapContent';
import { MapGrid } from '../3d/MapGrid';
import { WorldMap } from '../3d/WorldMap';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $base
    (5615,3555) #cF7C360
    (5625,3565) #c40C0C3
    (5635,3555) #c0077FF Player
    (5635,3545) #c0077FF プレイヤー

    $marker
    (5600,3550)
`;

export const BaseExample = () => {
    const { mapContent } = useMapContent(input);

    return (
        <WorldMap systemName="Example Star System" size={9000} empty={true}>
            <MapGrid />
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
