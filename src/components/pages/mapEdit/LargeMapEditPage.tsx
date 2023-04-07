import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
// import { ExampleMap1 as Map } from './examples/ExampleMap1';
import { ExampleMap2 as Map } from './examples/ExampleMap2';
// import { MarkerExample as Map } from './examples/MarkerExample';
// import { RegionExample as Map } from './examples/RegionExample';
// import { PlanetExample as Map } from './examples/PlanetExample';
// import { AreaExample as Map } from './examples/AreaExample';

export const LargeMapEditPage = () => {
    return (
        <CursorProvider>
            <ZoomLevelProvider>
                <Map />
            </ZoomLevelProvider>
        </CursorProvider>
    );
};

export default LargeMapEditPage;
