import { useCallback } from 'react';
import { MapControls } from '@react-three/drei';
import { useCameraDistance, useZoomDistanceMinMax } from '../context/ZoomLevelContext';
import { Event, MOUSE } from 'three';

export const CameraControls = () => {
    const { setCameraDistance } = useCameraDistance();
    const { min, max } = useZoomDistanceMinMax();

    const handleChange = useCallback((e: Event | undefined) => {
        if (!e) {
            return;
        }
        const distance = e.target.getDistance();

        setCameraDistance(distance);
    }, [setCameraDistance]);

    return (
        <MapControls
            enableDamping={false}
            enableRotate={false}
            zoomSpeed={1.2}
            panSpeed={1}
            keyPanSpeed={0}
            minDistance={min}
            maxDistance={max}
            onChange={handleChange}
        />
    );
};
