import { MapContent } from '../3d/MapContent';
import { Planet } from '../3d/Planet';
import { WorldMap } from '../3d/WorldMap';
import { Region } from '../3d/Region';
import { useMapContent } from '../hooks/useMapContent';

const input = `
    $marker
    (1020,2020)
    (1020,2040)
    (1040,2020) Gather here
    (1040,2040) Target
    (1060,2020) #D Gold
    (1060,2040) #c00FF00 Hex Color
`;

export const ExampleMap2 = () => {

    const { mapContent } = useMapContent(input);
    console.log(mapContent);

    return (
        <WorldMap systemName="My start system" size={10000}>
            <Region
                regionNumber={1}
                label="My Union"
                color="red"
                angleStartPoint="(6000,1000)"
                angleEndPoint="(1000,6000)"
                innerRadiusPoint="(1000,5000)"
                outerRadiusPoint="(0,5000)"
            />
            <Region
                regionNumber={2}
                label="My Union"
                color="orange"
                angleStartPoint="(9000,6000)"
                angleEndPoint="(6000,1000)"
                innerRadiusPoint="(2000,5000)"
                outerRadiusPoint="(1000,5000)"
            />
            <Region
                regionNumber={3}
                label="My Union"
                color="pink"
                angleStartPoint="(4000,9000)"
                angleEndPoint="(9000,6000)"
                innerRadiusPoint="(3000,5000)"
                outerRadiusPoint="(2000,5000)"
            />
            <Region
                regionNumber={4}
                label="My Union"
                color="purple"
                angleStartPoint="(1000,4000)"
                angleEndPoint="(4000,9000)"
                innerRadiusPoint="(4000,5000)"
                outerRadiusPoint="(3000,5000)"
            />
            <Planet size="large" color="blue" position="(0,5000)" />
            <Planet size="large" color="blue" position="(2000,3000)" />
            <Planet size="large" color="blue" position="(6000,2000)" />
            <Planet size="large" color="blue" position="(6000,7000)" />
            <Planet size="large" color="blue" position="(4000,6000)" />
            <Planet size="large" color="blue" position="(4000,3000)" />
            <Planet size="small" color="green" position="(4000,3200)" centerPosition="(4000,3000)" />
            {mapContent && (
                <MapContent mapContent={mapContent} />
            )}
        </WorldMap>
    );
};
