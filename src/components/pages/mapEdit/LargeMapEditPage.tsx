import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
// import { ExampleMap2 } from './examples/ExampleMap2';
// import { ExampleMap2 } from './examples/ExampleMap2';
import { MarkerExample } from './examples/MarkerExample';

export const LargeMapEditPage = () => {
    return (
        <CursorProvider>
            <ZoomLevelProvider>
                <MarkerExample />
            </ZoomLevelProvider>
        </CursorProvider>
    );
};

export default LargeMapEditPage;
