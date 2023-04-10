import { Edges } from '@react-three/drei';

interface IProps {
    position: [number, number, number];
    width: number;
    height: number;
    color: string;
    opacity?: number | null;
    border?: boolean;
    renderOrder?: number;
}

export const Plane = (props: IProps) => {
    const { position, width, height, color, opacity = 1, border = false, renderOrder = 0 } = props;

    return (
        <mesh position={position} renderOrder={renderOrder}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial color={color} opacity={opacity ?? undefined} transparent={opacity !== 1} depthWrite={false} />
            {border && (
                <Edges color={color} />
            )}
        </mesh>
    );
};
