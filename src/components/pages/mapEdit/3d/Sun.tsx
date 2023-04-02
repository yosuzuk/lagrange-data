import { useDebug } from '../context/DebugContext';
import { getZ } from '../utils/zUtils';

const radius = 7;
const widthSegments = 16;

export const Sun = () => {
    const debug = useDebug();
    return (
        <mesh position={[0, 0, getZ('planet')]}>
            <sphereGeometry args={[radius, widthSegments, widthSegments]} />
            <meshBasicMaterial color="yellow" wireframe={debug} />
        </mesh>
    );
};
