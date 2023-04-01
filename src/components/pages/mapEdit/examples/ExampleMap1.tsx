import { Marker } from '../3d/Marker';
import { Planet } from '../3d/Planet';
import { WorldMap } from '../3d/WorldMap';
import { Zone } from '../3d/Zone';

export const ExampleMap1 = () => {
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
            <Marker position="(2500,4000)" />
            <Marker position="(2620,3950)" color="green" />
        </WorldMap>
    );
};
