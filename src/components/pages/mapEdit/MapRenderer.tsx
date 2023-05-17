import { useMemo, useState, ComponentProps } from 'react';
import { Canvas } from '@react-three/fiber';
import { DebugProvider } from './context/DebugContext';
import { GridSizeProvider } from './context/GridSizeContext';
import { ThreeCanvasContainer } from './ThreeCanvasContainer';
import { CursorProvider } from './context/CursorContext';
import { ZoomLevelProvider } from './context/ZoomLevelContext';
import { IMapContent, IMapData } from './types/IMapContent';
import { translateSizeToGrid } from './utils/coordinateUtils';
import { CameraControls } from './3d/CameraControls';
import { degreesToRadians } from '../../../utils/math';
import { getRendeOrder } from './utils/renderOrder';
import { StarSystem } from './3d/StarSystem';
import { MapPerspective } from './types/MapPerspective';

interface IProps {
    mapData: IMapData;
    targetToMark: IMapContent | null;
    perspective: MapPerspective;
    markTarget: (target: IMapContent | null) => void;
}

const DEFAULT_MAP_SIZE = 9000;

export const MapRenderer = (props: IProps) => {
    const { mapData, targetToMark, markTarget, perspective } = props;
    const [debug, setDebug] = useState<boolean>(false);
    const gridSize = translateSizeToGrid(mapData.size ?? DEFAULT_MAP_SIZE);

    const camera = useMemo(() => {
        const initialCameraDistance = gridSize * 0.5;
        const cameraOptions: ComponentProps<typeof Canvas>['camera'] = {
            position: getInitialCameraPosition(initialCameraDistance, perspective),
            zoom: 2,
            up: [0, 0, 1],
            far: 10000,
        };
        return cameraOptions;
    }, [gridSize, perspective]);

    return (
        <CursorProvider>
            <ZoomLevelProvider>
                <DebugProvider value={debug}>
                    <GridSizeProvider value={gridSize}>
                        <ThreeCanvasContainer>
                            <Canvas
                                camera={camera}
                                onDoubleClick={() => setDebug(x => !x)}
                                frameloop="demand"
                            >
                                <CameraControls targetToMark={targetToMark} perspective={perspective} />
                                <color attach="background" args={['#292828']} />
                                <ambientLight intensity={0.1} />
                                <StarSystem mapData={mapData} markTarget={markTarget} />
                                {debug && (
                                    <axesHelper args={[10]} position={[0, 0, 0]} renderOrder={getRendeOrder('axesHelper')} />
                                )}
                            </Canvas>
                        </ThreeCanvasContainer>
                    </GridSizeProvider >
                </DebugProvider >
            </ZoomLevelProvider>
        </CursorProvider>
    );
};

function getInitialCameraPosition(initialCameraDistance: number, perspective: MapPerspective): [number, number, number] {
    if (perspective === MapPerspective.ORTHOGONAL) {
        return [
            0,
            0,
            initialCameraDistance,
        ];
    }

    return [
        // map is rotated by 6° on z-axis, 45° on x-axis
        // => x = tan(rad(5°)) * y, z = y
        Math.tan(degreesToRadians(-5)) * initialCameraDistance,
        -1 * initialCameraDistance,
        initialCameraDistance,
    ];
}
