import { MapContent } from '../3d/MapContent';
import { WorldMap } from '../3d/WorldMap';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $planet
    (4340,4143)
    (3814,4207) Fafner
    (3978,3380) large #B Jade
    (4053,3222)(3978,3380) small #W Roc
`;

export const PlanetExample = () => {
    const { mapContent } = useMapContent(input);

    return (
        <WorldMap systemName="Example Star System" size={9000} empty={true}>
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
