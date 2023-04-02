import { Marker } from '../3d/Marker';
import { Planet } from '../3d/Planet';
import { WorldMap } from '../3d/WorldMap';
import { Region } from '../3d/Region';

export const ExampleMap1 = () => {
    return (
        <WorldMap systemName="My Star System" size={10000}>
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
            <Marker position="(2500,4000)" />
            <Marker position="(2620,3950)" color="green" />
        </WorldMap>
    );
};
