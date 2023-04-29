import { Edges } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';

interface IProps {
    position: [number, number, number];
    width: number;
    height: number;
    color: string;
    opacity?: number | null;
    border?: boolean;
    renderOrder?: number;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

export const Plane = (props: IProps) => {
    const { position, width, height, color, opacity = 1, border = false, renderOrder = 0, onClick } = props;

    return (
        <mesh position={position} renderOrder={renderOrder} onClick={onClick}>
            <planeGeometry args={[width, height]} />
            <meshBasicMaterial color={color} opacity={opacity ?? undefined} transparent={opacity !== 1} depthWrite={false} />
            {border && (
                <Edges color={color} />
            )}
        </mesh>
    );
};
