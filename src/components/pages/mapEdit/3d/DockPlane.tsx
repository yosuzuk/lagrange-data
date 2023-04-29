import { useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IStation } from '../types/IMapContent';
import { getRendeOrder } from '../utils/renderOrder';
import { createDockSprite } from '../utils/spriteUtils';

const SIZE = 0.5;

interface IProps {
    station: IStation;
}

export const DockPlane = (props: IProps) => {
    const { station } = props;
    const gridPosition = useNormalizedPosition({
        gamePosition: station.position,
    });
    const visible = useZoomBasedVisibility('dockIcon');
    const { gl } = useThree();

    const dockIcon = useMemo<HTMLCanvasElement>(() => createDockSprite(), []);

    return (
        <mesh visible={visible} position={[...gridPosition, 0]} renderOrder={getRendeOrder('dockIcon')}>
            <planeGeometry args={[SIZE, SIZE]} />
            <meshBasicMaterial transparent={true} depthWrite={false}>
                <canvasTexture
                    attach="map"
                    image={dockIcon}
                    anisotropy={gl.capabilities.getMaxAnisotropy()}
                />
            </meshBasicMaterial>
        </mesh>
    );
};
