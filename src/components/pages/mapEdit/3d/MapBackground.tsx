import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGridSize } from '../context/GridSizeContext';
import { getRendeOrder } from '../utils/renderOrder';

interface IProps {
    imagePath: string;
}

export const MapBackground = (props: IProps) => {
    const { imagePath } = props;
    const gridSize = useGridSize();
    const texture = useLoader(TextureLoader, imagePath);

    return (
        <mesh position={[0, 0, -1]} renderOrder={getRendeOrder('mapBackground')}>
            <planeGeometry args={[gridSize, gridSize]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
};
