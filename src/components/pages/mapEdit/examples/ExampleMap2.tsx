import { MapContent } from '../3d/MapContent';
import { WorldMap } from '../3d/WorldMap';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $marker
    (1020,2020)
    (1020,2040)
    (1040,2020) Gather here
    (1040,2040) Target
    (1060,2020) #D Gold
    (1060,2040) #c00FF00 Hex Color

    $region
    (8173,4769)(8547,2586)(7840,6833)(8326,3104) #R 1
    (7367,2867)(8547,2586)(8325,3102)(3536,628) #R 2
    (7367,2867)(8547,2586)(3532,630)(525,2969) #R 3
    (8173,4769)(8547,2586)(3680,8087)(7838,6837) #R 4
    (7367,2867)(8547,2586)(524,2972)(959,6145) #R 5
    (8173,4769)(8547,2586)(961,6148)(3668,8091) #R 6
    (3802,4550)(2496,4741)(5503,3255)(2496,4741) #R 7
    (4913,4399)(4280,6079)(4192,6674)(5507,3258) #R 8
    (3249,6734)(8169,4769)(2576,7146)() #R 9
    (6820,4572)(7354,2884)()() #R 10
    ()(3268,1438)()(2573,7143) #R 11
    (3832,4618)(2496,4741)(2497,4744)(4275,6080) #R 12
    (4278,6082)(6816,4572)(4192,6674)(5507,3258) #R 13
`;

export const ExampleMap2 = () => {

    const { mapContent } = useMapContent(input);
    console.log(mapContent);

    return (
        <WorldMap systemName="My start system" size={9000}>
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
