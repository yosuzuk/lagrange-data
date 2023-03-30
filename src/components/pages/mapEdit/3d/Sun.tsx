import { useDebug } from '../context/DebugContext';
import { getZ } from '../utils/zUtils';

interface IProps {
    label: string;
}

export const Sun = ({ label }: IProps) => {
    const debug = useDebug();

    const radius = 7;
    const widthSegments = 16;

    return (
        <mesh position={[0, 0, getZ('planet')]}>
            <sphereGeometry args={[radius, widthSegments, widthSegments]} />
            <meshStandardMaterial color="yellow" wireframe={debug} />
        </mesh>
    );
};
