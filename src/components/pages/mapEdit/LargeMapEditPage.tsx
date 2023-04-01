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
            <div style={{ position: 'absolute', top: '144px', left: '300px', fontSize: '24px' }}>HEX color #FF0000</div>
            <div style={{ position: 'absolute', top: '65px', left: '200px', border: '1px solid red', boxSizing: 'border-box', width: '90px', height: '400px' }}></div>
        </CursorProvider>
    );
};

export default LargeMapEditPage;
