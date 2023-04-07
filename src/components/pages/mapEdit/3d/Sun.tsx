import { useDebug } from '../context/DebugContext';
import { getRendeOrder } from '../utils/renderOrder';

const radius = 7;
const widthSegments = 16;

export const Sun = () => {
    const debug = useDebug();
    return (
        <mesh position={[0, 0, 0]} renderOrder={getRendeOrder('planet')}>
            <sphereGeometry args={[radius, widthSegments, widthSegments]} />
            <meshBasicMaterial color="yellow" wireframe={debug} />
        </mesh>
    );
};
