import { ReactNode, useMemo, useState, ComponentProps } from 'react';
import { Canvas } from '@react-three/fiber';
import { degreesToRadians } from '../../../../utils/math';
import { DebugProvider } from '../context/DebugContext';
import { GridSizeProvider } from '../context/GridSizeContext';
import { ThreeCanvasContainer } from '../ThreeCanvasContainer';
import { translateSizeToGrid } from '../utils/coordinateUtils';
import { getZ } from '../utils/zUtils';
import { Sun } from './Sun';
import { CameraControls } from './CameraControls';
import { WorldLabel } from './WorldLabel';
import { StarsBackground } from './StarsBackground';
import { MapBorders } from './MapBorders';
import { MapGrid } from './MapGrid';

interface IProps {
    systemName: string;
    size: number;
    children: ReactNode;
    empty?: boolean;
}

export const WorldMap = (props: IProps) => {
    const { systemName, size, children, empty } = props;
    const gridSize = translateSizeToGrid(size);
    const [debug, setDebug] = useState<boolean>(false);

    const camera = useMemo(() => {
        const initialCameraDistance = gridSize;
        const cameraOptions: ComponentProps<typeof Canvas>['camera'] = {
            position: [
                // map is rotated by 6° on z-axis, 45° on x-axis
                // => x = tan(rad(5°)) * y, z = y
                Math.tan(degreesToRadians(-5)) * initialCameraDistance,
                -1 * initialCameraDistance,
                initialCameraDistance,
            ],
            zoom: 2,
            up: [0, 0, 1],
            far: 10000,
        };
        return cameraOptions;
    }, [gridSize]);

    return (
        <DebugProvider value={debug === true}>
            <GridSizeProvider value={gridSize}>
                <ThreeCanvasContainer>
                    <Canvas
                        camera={camera}
                        onDoubleClick={() => setDebug(x => !x)}
                    >
                        <color attach="background" args={['#292828']} />

                        <ambientLight intensity={0.1} />
                        <pointLight position={[0, 0, 40]} castShadow={true} intensity={1.2} />
                        {debug && (
                            <axesHelper args={[10]} position={[0, 0, getZ('axesHelper')]} />
                        )}
                        {empty !== true && (
                            <>
                                <StarsBackground starCount={200} starSize={3} zOffset={300} />
                                <StarsBackground starCount={1000} starSize={0.2} zOffset={500} />
                                <MapBorders />
                                <MapGrid />
                                <Sun />
                                <WorldLabel worldName={systemName} />
                            </>
                        )}
                        {children}
                        <CameraControls />
                    </Canvas>
                </ThreeCanvasContainer >
            </GridSizeProvider >
        </DebugProvider >
    );
};
