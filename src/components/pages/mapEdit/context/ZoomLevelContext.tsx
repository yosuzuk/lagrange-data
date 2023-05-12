import { createContext, ReactNode, useState, useContext, useMemo, useCallback, useRef } from 'react';
import { IZoomLevel } from '../types/IZoomLevel';
import { createZoomLevels, MAX_CAMERA_DISTANCE, MIN_CAMERA_DISTANCE } from '../utils/levelOfDetailUtils';

interface ICameraDistanceContextValue {
    getCameraDistance: () => number | null;
    setCameraDistance: (distance: number) => void;
}

const zoomLevels: IZoomLevel[] = createZoomLevels();

const defaultZoomLevel = zoomLevels.at(-1);
if (!defaultZoomLevel) {
    throw new Error('No zoom levels');
}

const ZoomLevelContext = createContext<IZoomLevel>(defaultZoomLevel);

const CameraDistanceContext = createContext<ICameraDistanceContextValue>({
    getCameraDistance: () => null,
    setCameraDistance: () => { },
});

interface IProps {
    children: ReactNode;
}

export const ZoomLevelProvider = (props: IProps) => {
    const { children } = props;
    const [zoomLevel, setZoomLevel] = useState<IZoomLevel>(defaultZoomLevel);
    const cameraDistanceRef = useRef<number | null>(null);

    const getCameraDistance = useCallback(() => {
        return cameraDistanceRef.current;
    }, [cameraDistanceRef]);

    const setCameraDistance = useCallback((distance: number) => {
        cameraDistanceRef.current = distance;

        const newLevel = zoomLevels.find(level => distance >= level.fromDistance && distance < level.untilDistance) ?? zoomLevels.at(-1);
        if (!newLevel) {
            throw new Error(`Could not find zoomLevel for camera distance "${distance}"`);
        }
        setZoomLevel(newLevel);
    }, [cameraDistanceRef]);

    const cameraDistanceContextValue = useMemo(() => ({
        getCameraDistance,
        setCameraDistance,
    }), [getCameraDistance, setCameraDistance]);

    return (
        <ZoomLevelContext.Provider value={zoomLevel}>
            <CameraDistanceContext.Provider value={cameraDistanceContextValue}>
                {children}
            </CameraDistanceContext.Provider>
        </ZoomLevelContext.Provider>
    );
};

export const useCameraDistance = (): ICameraDistanceContextValue => {
    const value = useContext(CameraDistanceContext);
    if (!value) {
        throw new Error('Missing camera distance context value');
    }
    return value;
}

export const useZoomDistanceMinMax = () => {
    return {
        min: MIN_CAMERA_DISTANCE,
        max: MAX_CAMERA_DISTANCE,
    } as const;
};

export const useZoomBasedVisibility = (key: string): boolean => {
    const zoomLevel = useContext(ZoomLevelContext);
    if (!zoomLevel) {
        return false;
    }
    return zoomLevel.visibility[key] === true;
}

export const useZoomBasedOpacity = (key: string): number | null => {
    const zoomLevel = useContext(ZoomLevelContext);
    if (!zoomLevel) {
        return null;
    }
    return zoomLevel.opacity[key] ?? null;
}
