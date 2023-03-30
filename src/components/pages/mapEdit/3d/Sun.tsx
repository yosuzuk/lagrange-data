import { useDebug } from '../context/DebugContext';
import { getZ } from '../utils/zUtils';

export const Sun = () => {
    const debug = useDebug();

    const radius = 6;
    const widthSegments = 16;

    return (
        <mesh position={[0, 0, getZ('planet')]}>
            <sphereGeometry args={[radius, widthSegments, widthSegments]} />
            <meshStandardMaterial color="yellow" wireframe={debug} />
        </mesh>
    );
};
