import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGridSize } from '../context/GridSizeContext';
import { getZ } from '../utils/zUtils';

interface IProps {
    imagePath: string;
}

export const MapBackground = (props: IProps) => {
    const { imagePath } = props;
    const gridSize = useGridSize();
    console.log(imagePath);
    const texture = useLoader(TextureLoader, imagePath);

    return (
        <mesh position={[0, 0, getZ('mapBackground')]}>
            <planeGeometry args={[gridSize, gridSize]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
};
