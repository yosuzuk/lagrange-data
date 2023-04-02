import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
// import { ExampleMap2 } from './examples/ExampleMap2';
// import { ExampleMap2 } from './examples/ExampleMap2';
// import { MarkerExample } from './examples/MarkerExample';
// import { RegionExample } from './examples/RegionExample';
import { PlanetExample } from './examples/PlanetExample';

export const LargeMapEditPage = () => {
    return (
        <CursorProvider>
            <ZoomLevelProvider>
                <PlanetExample />
            </ZoomLevelProvider>
        </CursorProvider>
    );
};

export default LargeMapEditPage;
