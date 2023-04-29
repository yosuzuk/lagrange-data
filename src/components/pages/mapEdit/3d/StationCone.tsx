import { ThreeEvent } from '@react-three/fiber';
import { useMemo } from 'react';
import { DoubleSide } from 'three';
import { degreesToRadians } from '../../../../utils/math';
import { GridPosition } from '../types/Coordinates';
import { Lines } from './Lines';

const CONE_RADIUS = 5 * 0.0175;
const CONE_HEIGHT = 8 * 0.0175;
const CONE_RADIAL_SEGMENTS = 4;
const CONE_HEIGHT_SEGMENTS = 1;
const CONE_OPEN_ENDED = true;
const CONE_OPACITY = 0.75;
const LINE_Z = 0.01;

interface IProps {
    name?: string;
    position: GridPosition;
    color: string;
    base: boolean;
    visible?: boolean;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
}

export const StationCone = (props: IProps) => {
    const { name, position, color, base, visible = true, onClick } = props;

    const lines = useMemo<[Float32Array, Float32Array] | null>(() => {
        if (!base) {
            return null;
        }
        const [x, y] = position;
        const innerRadius = CONE_RADIUS * 0.8;
        return [
            new Float32Array([
                x, y + CONE_RADIUS, LINE_Z,
                x + CONE_RADIUS, y, LINE_Z,
                x + CONE_RADIUS, y, LINE_Z,
                x, y - CONE_RADIUS, LINE_Z,
                x, y - CONE_RADIUS, LINE_Z,
                x - CONE_RADIUS, y, LINE_Z,
                x - CONE_RADIUS, y, LINE_Z,
                x, y + CONE_RADIUS, LINE_Z,
            ]),
            new Float32Array([
                x, y + innerRadius, LINE_Z,
                x + innerRadius, y, LINE_Z,
                x + innerRadius, y, LINE_Z,
                x, y - innerRadius, LINE_Z,
                x, y - innerRadius, LINE_Z,
                x - innerRadius, y, LINE_Z,
                x - innerRadius, y, LINE_Z,
                x, y + innerRadius, LINE_Z,
            ]),
        ];
    }, [base, position]);

    return (
        <group visible={visible}>
            <mesh name={name} onClick={onClick} position={[...position, CONE_HEIGHT * 1.5]} rotation={[degreesToRadians(90), 0, 0]}>
                <coneGeometry args={[CONE_RADIUS, CONE_HEIGHT, CONE_RADIAL_SEGMENTS, CONE_HEIGHT_SEGMENTS, CONE_OPEN_ENDED]} />
                <meshStandardMaterial
                    emissive={color}
                    color={color}
                    transparent={true}
                    opacity={CONE_OPACITY}
                />
            </mesh>
            <mesh onClick={onClick} position={[...position, CONE_HEIGHT * 0.5]} rotation={[degreesToRadians(-90), 0, 0]}>
                <coneGeometry args={[CONE_RADIUS, CONE_HEIGHT, CONE_RADIAL_SEGMENTS, CONE_HEIGHT_SEGMENTS, CONE_OPEN_ENDED]} />
                <meshStandardMaterial
                    emissive={color}
                    emissiveIntensity={0.2}
                    color={color}
                    transparent={true}
                    opacity={CONE_OPACITY}
                    side={DoubleSide}
                />
            </mesh>
            {lines && (
                <>
                    <Lines points={lines[0]} color={color} opacity={0.5} />
                    <Lines points={lines[1]} color={color} />
                </>
            )}
        </group>
    );
};
