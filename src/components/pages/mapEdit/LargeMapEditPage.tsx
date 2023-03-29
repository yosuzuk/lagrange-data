import { Orbit } from './3d/Orbit';
import { Zone } from './3d/Zone';
import { WorldMap } from './3d/WorldMap';
import { Marker } from './3d/Marker';
import { Planet } from './3d/Planet';

export const LargeMapEditPage = () => {
    return (
        <WorldMap size={10000}>
            <Zone
                number={1}
                label="My Union"
                color="red"
                startPos="(1000,4000)"
                endPos="(1000,6000)"
                innerPos="(2000,5000)"
                outerPos="(0,5000)"
            />
            <Orbit outerPos="(0,5000)" />
            <Orbit outerPos="(2000,3000)" />
            <Orbit outerPos="(6000,2000)" />
            <Orbit outerPos="(6000,7000)" />
            <Orbit outerPos="(4000,6000)" />
            <Planet size="large" color="blue" position="(4000,3000)" />
            <Planet size="small" color="green" position="(4000,3500)" />
            <Orbit centerPos="(4000,3000)" outerPos="(4000,3500)" />
            <Marker position="(2000,3000)" />
        </WorldMap>
    );
};

export default LargeMapEditPage;
