import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapControls } from '@react-three/drei';
import { Event, Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import { MapControls as MapControlsImpl } from 'three-stdlib';
import { useCameraDistance, useZoomDistanceMinMax } from '../context/ZoomLevelContext';
import { degreesToRadians } from '../../../../utils/math';
import { TargetSprite } from './TargetSprite';
import { IMapContent } from '../types/IMapContent';
import { getPrimaryGridPositionForMapContent } from '../utils/mapContentUtils';
import { useGridSize } from '../context/GridSizeContext';

interface IProps {
    targetToMark: IMapContent | null;
}

export const CameraControls = (props: IProps) => {
    const { targetToMark } = props;
    const { setCameraDistance, getCameraDistance } = useCameraDistance();
    const { min, max } = useZoomDistanceMinMax();
    const { invalidate, camera } = useThree();
    const controlRef = useRef<MapControlsImpl>(null);
    const [targetUpdateIteration, setTargetUpdateIteration] = useState<number>(0);
    const gridSize = useGridSize();

    const handleChange = useCallback((e: Event | undefined) => {
        if (!e) {
            return;
        }
        const control = e.target as MapControlsImpl;
        const distance = Math.round(control.getDistance());
        setCameraDistance(distance);
    }, [setCameraDistance]);

    // set initial distance
    useEffect(() => {
        if (!controlRef.current || getCameraDistance() !== null) {
            return;
        }
        const cameraDistance = camera.position.distanceTo(controlRef.current.target);
        setCameraDistance(cameraDistance);
    }, [camera, getCameraDistance, setCameraDistance]);

    // effect for moving camera to a new target
    useEffect(() => {
        if (!controlRef.current) {
            return;
        }

        if (targetToMark === null) {
            setTargetUpdateIteration(i => i + 1);
            invalidate();
            return;
        }

        const [gridX, gridY] = getPrimaryGridPositionForMapContent(targetToMark, gridSize);
        if (gridX === null || gridY === null) {
            console.warn('No grid position');
            return;
        }

        const targetAsVector = new Vector3(gridX, gridY, 0);

        const cameraDistance = camera.position.distanceTo(targetAsVector);
        if (cameraDistance === null) {
            throw new Error('Missing camera distance');
        }
        const distanceOnMap = Math.sqrt(Math.pow(cameraDistance, 2) / 2);

        camera.position.set(
            gridX + (Math.tan(degreesToRadians(-5)) * distanceOnMap),
            gridY + (-1 * distanceOnMap),
            distanceOnMap,
        );

        controlRef.current.target.set(
            gridX,
            gridY,
            controlRef.current.target.z ?? 0,
        );

        setTargetUpdateIteration(i => i + 1);
        invalidate();
    }, [controlRef, invalidate, camera, targetToMark, gridSize]);

    const [targetX, targetY] = useMemo(() => {
        return targetToMark ? getPrimaryGridPositionForMapContent(targetToMark, gridSize) : [null, null];
    }, [targetToMark, gridSize]);

    return (
        <>
            <MapControls
                ref={controlRef}
                enableDamping={false}
                enableRotate={false}
                zoomSpeed={1.2}
                panSpeed={1}
                keyPanSpeed={0}
                minDistance={min}
                maxDistance={max}
                onChange={handleChange}
            />
            {targetX !== null && targetY !== null && (
                <TargetSprite
                    key={`target_${targetUpdateIteration}`}
                    gridPosition={[
                        targetX,
                        targetY,
                    ]}
                />
            )}
        </>
    );
};
