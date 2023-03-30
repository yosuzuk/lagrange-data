import { ReactNode, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, Grid } from '@react-three/drei';
import { degreesToRadians } from '../../../../utils/math';
import { DebugProvider } from '../context/DebugContext';
import { GridSizeProvider } from '../context/GridSizeContext';
import { ThreeCanvasContainer } from '../ThreeCanvasContainer';
import { translateSizeToGrid } from '../utils/coordinateUtils';
import { getZ } from '../utils/zUtils';
import { Sun } from './Sun';

interface IProps {
    systemName: string;
    size: number;
    children: ReactNode;
}

export const WorldMap = (props: IProps) => {
    const { systemName, size, children } = props;
    const gridSize = translateSizeToGrid(size);
    const [debug, setDebug] = useState<boolean>(false);

    const camera = useMemo(() => {
        const initialCameraDistance = gridSize;
        return {
            position: [
                // map is rotated by 6° on z-axis, 45° on x-axis
                // => x = tan(rad(6°)) * y, z = y
                Math.tan(degreesToRadians(-6)) * initialCameraDistance,
                -1 * initialCameraDistance,
                initialCameraDistance,
            ],
            zoom: 2,
            up: [0, 0, 1],
            far: 10000,
        } as const;
    }, [gridSize]);

    return (
        <DebugProvider value={debug === true}>
            <GridSizeProvider value={gridSize}>
                <ThreeCanvasContainer>
                    <Canvas camera={camera} onClick={() => setDebug(x => !x)}>
                        <gridHelper
                            args={[
                                // size
                                gridSize,
                                // divisions
                                debug ? 10 : 1,
                                // colorCenterLine
                                0x0000ff,
                                // colorGrid
                                0x808080,
                            ]}
                            position={[0, 0, getZ('gridHelper')]}
                            rotation={[degreesToRadians(90), 0, 0]}
                        />
                        <ambientLight />
                        <pointLight position={[10, 10, 10]} />
                        <Grid
                            args={[10, 10, 1, 1]}
                            cellColor="white"
                            rotation={[degreesToRadians(90), 0, 0]}
                        />
                        {debug && (
                            <axesHelper args={[10]} position={[0, 0, getZ('axesHelper')]} />
                        )}
                        <Sun label={systemName} />
                        {children}
                        <MapControls
                            enableDamping={false}
                            enableRotate={false}
                            zoomSpeed={5}
                        />
                    </Canvas>
                </ThreeCanvasContainer >
            </GridSizeProvider >
        </DebugProvider >
    );
};
