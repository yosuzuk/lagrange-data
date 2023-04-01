import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
import { ExampleMap2 } from './examples/ExampleMap2';

export const LargeMapEditPage = () => {
    return (
        <CursorProvider>
            <ZoomLevelProvider>
                <ExampleMap2 />
            </ZoomLevelProvider>
        </CursorProvider>
    );
};

export default LargeMapEditPage;
