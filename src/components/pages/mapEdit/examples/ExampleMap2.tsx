import { MapContent } from '../3d/MapContent';
import { Planet } from '../3d/Planet';
import { WorldMap } from '../3d/WorldMap';
import { Zone } from '../3d/Zone';
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
            <Zone
                zoneNumber={1}
                label="My Union"
                color="red"
                startPos="(6000,1000)"
                endPos="(1000,6000)"
                innerPos="(1000,5000)"
                outerPos="(0,5000)"
            />
            <Zone
                zoneNumber={2}
                label="My Union"
                color="orange"
                startPos="(9000,6000)"
                endPos="(6000,1000)"
                innerPos="(2000,5000)"
                outerPos="(1000,5000)"
            />
            <Zone
                zoneNumber={3}
                label="My Union"
                color="pink"
                startPos="(4000,9000)"
                endPos="(9000,6000)"
                innerPos="(3000,5000)"
                outerPos="(2000,5000)"
            />
            <Zone
                zoneNumber={4}
                label="My Union"
                color="purple"
                startPos="(1000,4000)"
                endPos="(4000,9000)"
                innerPos="(4000,5000)"
                outerPos="(3000,5000)"
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
