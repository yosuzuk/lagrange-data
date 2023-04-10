interface IProps {
    points: Float32Array;
    color: string;
    lineWidth?: number;
    renderOrder?: number;
    opacity?: number;
}

export const Lines = (props: IProps) => {
    const { points, color, renderOrder = 0, opacity = 1 } = props;

    return (
        <lineSegments renderOrder={renderOrder}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    array={points}
                    count={points.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                attach="material"
                color={color}
                depthWrite={false}
                transparent={opacity !== 1}
                opacity={opacity}
            />
        </lineSegments>
    );
};
