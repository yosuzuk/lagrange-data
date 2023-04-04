import { useMemo } from 'react';
import { useGridSize } from '../context/GridSizeContext';


interface IProps {
    starCount: number;
    starSize: number;
    zOffset: number;
}

export const StarsBackground = (props: IProps) => {
    const { starCount, starSize, zOffset } = props;
    const gridSize = useGridSize();

    const vertices = useMemo<Float32Array>(() => {
        const vertices = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            // x
            vertices[i] = (Math.random() * gridSize * 4) - (gridSize * 2);
            // y
            vertices[i + 1] = (Math.random() * gridSize * 4) - (gridSize * 2) + zOffset;
            // z
            vertices[i + 2] = 0 - zOffset;
        }

        return vertices;
    }, [starCount, zOffset, gridSize]);

    return (
        <points frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[vertices, 3]} />
            </bufferGeometry>
            <pointsMaterial color="white" size={starSize} />
        </points>
    );
};
