import { useCallback, useEffect, useRef, useState } from 'react';
import { MapControls } from '@react-three/drei';
import { Event } from 'three';
import { useThree } from '@react-three/fiber';
import { MapControls as MapControlsImpl } from 'three-stdlib';
import { useCameraDistance, useZoomDistanceMinMax } from '../context/ZoomLevelContext';
import { degreesToRadians } from '../../../../utils/math';
import { TargetSprite } from './TargetSprite';

interface IProps {
    targetToMark: string | null;
}

export const CameraControls = (props: IProps) => {
    const { targetToMark } = props;
    const { setCameraDistance, getCameraDistance } = useCameraDistance();
    const { min, max } = useZoomDistanceMinMax();
    const { invalidate, scene, camera } = useThree();
    const controlRef = useRef<MapControlsImpl>(null);
    const [targetUpdateIteration, setTargetUpdateIteration] = useState<number>(0);

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

        const target = scene.getObjectByName(targetToMark);
        if (!target) {
            throw new Error(`Cannot find target id "${targetToMark}"`);
        }

        const cameraDistance = camera.position.distanceTo(controlRef.current.target);
        if (cameraDistance === null) {
            throw new Error('Missing camera distance');
        }
        const distanceOnMap = Math.sqrt(Math.pow(cameraDistance, 2) / 2);

        camera.position.set(
            target.position.x + (Math.tan(degreesToRadians(-5)) * distanceOnMap),
            target.position.y + (-1 * distanceOnMap),
            distanceOnMap,
        );

        controlRef.current.target.set(
            target.position.x,
            target.position.y,
            controlRef.current.target.z ?? 0,
        );

        setTargetUpdateIteration(i => i + 1);
        invalidate();
    }, [controlRef, invalidate, scene, camera, targetToMark]);

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
            {targetToMark && controlRef.current && (
                <TargetSprite
                    key={`target_${targetUpdateIteration}`}
                    gridPosition={[
                        controlRef.current.target.x,
                        controlRef.current.target.y,
                    ]}
                />
            )}
        </>
    );
};
