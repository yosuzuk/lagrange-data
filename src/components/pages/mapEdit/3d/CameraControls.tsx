import { useCallback } from 'react';
import { MapControls } from '@react-three/drei';
import { useCameraDistance, useZoomDistanceMinMax } from '../context/ZoomLevelContext';
import { Event } from 'three';

export const CameraControls = () => {
    const { setCameraDistance } = useCameraDistance();
    const { min, max } = useZoomDistanceMinMax();

    const handleChange = useCallback((e: Event | undefined) => {
        if (!e) {
            return;
        }
        const distance = e.target.getDistance();

        console.log(distance);

        setCameraDistance(distance);
    }, [setCameraDistance]);

    return (
        <MapControls
            enableDamping={false}
            enableRotate={false}
            zoomSpeed={5}
            minDistance={min}
            maxDistance={max}
            onChange={handleChange}
        />
    );
};
