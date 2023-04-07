import { MapContent } from '../3d/MapContent';
import { WorldMap } from '../3d/WorldMap';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $region
    (8173,4769)(8547,2586)(7840,6833)(8326,3104) 1 #c873E2C
    (7367,2867)(8547,2586)(8325,3102)(3536,628) 2 #c873E2C
    (7367,2867)(8547,2586)(3532,630)(525,2969) 3 #c87372C
    (8173,4769)(8547,2586)(3680,8087)(7838,6837) 4 #c694226
    (7367,2867)(8547,2586)(524,2972)(959,6145) 5 #c985036
    (8173,4769)(8547,2586)(961,6148)(3668,8091) 6 #c625828
    (3802,4550)(2496,4741)(5503,3255)(2496,4741) 7 #c87372C
    (4913,4399)(4280,6079)(4192,6674)(5507,3258) 8 #c694226
    (3249,6734)(8169,4769)(2576,7146)(7837,4614) 9 #c87372C
    (6820,4572)(7354,2884)(7764,4609)(3750,2041) 10 #c873E2C
    (3491,2291)(3268,1438)(3750,2051)(2573,7143) 11 #c87372C
    (3832,4618)(2496,4741)(2497,4744)(4275,6080) 12 #c985036
    (4278,6082)(6816,4572)(4192,6674)(5507,3258) 13 #c873E2C

    $planet
    (1972,2974) large Korah
    (3472,5494) large Narfi
    (3915,3649) medium Celestial
    (5172,4814) large Grid
    (5692,6074) large Jade
    (6232,7354) large Fornjot
    (6852,3234) large Hymir

    (1932,3036)(1972,2974) small Kratos α
    (2138,2915)(1972,2974) small New Earth β
    (3269,5436)(3472,5494) small Kumar
    (3535,5550)(3472,5494) small Triangle Ring A
    (3651,5322)(3472,5494) small Nordrie
    (3752,3770)(3915,3649) small Pathfinder 19A
    (3961,3653)(3915,3649) small Emeral Heart
    (4023,3621)(3915,3649) small Mosoniel
    (4969,4756)(5172,4814) small Sedelina
    (5235,4870)(5172,4814) small Mormo
    (5351,4642)(5172,4814) small Moros
    (5652,6176)(5692,6074) small Heredma
    (5838,6025)(5692,6074) small Roc
    (6029,7296)(6232,7354) small Harza
    (6295,7410)(6232,7354) small Unicorn
    (6411,7182)(6232,7354) small Eternal Victory
    (6812,3296)(6852,3234) small Fafner
    (7018,3175)(6852,3234) small Pohjola

    $area
    (5500,3550)(5550,3500)
    (5560,3510)(5600,3550) city
    (5550,3580)(5530,3560) city #cFF0000
    (5590,3560)(5560,3590) #c0077ff
    $marker
    (5500,3550) A1
    (5550,3500) A2
    (5560,3510) B1
    (5600,3550) B2
    (5550,3580) C1
    (5530,3560) C2
    (5590,3560) D1
    (5560,3590) D2
`;

export const ExampleMap2 = () => {
    const { mapContent } = useMapContent(input);

    return (
        <WorldMap systemName="My Star System" size={9000}>
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
