import { useState, useCallback, useMemo, useEffect } from 'react';

interface IProps {
    points: Float32Array;
    color: string;
    lineWidth?: number;
    renderOrder?: number;
}

export const Lines = (props: IProps) => {
    const { points, color, renderOrder = 0 } = props;

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
            />
        </lineSegments>
    );
};
