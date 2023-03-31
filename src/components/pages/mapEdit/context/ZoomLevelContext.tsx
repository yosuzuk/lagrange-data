import { createContext, ReactNode, useState, useContext, useMemo, useCallback, useRef } from 'react';
import { IZoomLevel, IZoomBasedOpacity, IZoomBasedVisibility } from '../types/IZoomLevel';

interface ICameraDistanceContextValue {
    getCameraDistance: () => number | null;
    setCameraDistance: (distance: number) => void;
}

const zoomLevels: IZoomLevel[] = [
    {
        fromDistance: 3,
        untilDistance: 500,
        visibility: {
            zoneBackground: false,
            zoneLabel: false,
            gameGrid: true,
        },
        opacity: {
            zoneBackground: 0,
        },
    },
    {
        fromDistance: 500,
        untilDistance: 1000,
        visibility: {
            zoneBackground: true,
            zoneLabel: true,
            gameGrid: false,
        },
        opacity: {
            zoneBackground: 0.5,
        },
    },
    {
        fromDistance: 1000,
        untilDistance: 1500,
        visibility: {
            zoneBackground: true,
            zoneLabel: true,
            gameGrid: false,
        },
        opacity: {
            zoneBackground: 1,
        },
    },
];

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
        min: zoomLevels.at(0)?.fromDistance ?? 0,
        max: zoomLevels.at(-1)?.untilDistance ?? Infinity,
    } as const;
};

export const useZoomBasedVisibility = (key: keyof IZoomBasedVisibility): boolean => {
    const zoomLevel = useContext(ZoomLevelContext);
    if (!zoomLevel) {
        return false;
    }
    return zoomLevel.visibility[key] === true;
}

export const useZoomBasedOpacity = (key: keyof IZoomBasedOpacity): number | null => {
    const zoomLevel = useContext(ZoomLevelContext);
    if (!zoomLevel) {
        return null;
    }
    return zoomLevel.opacity[key] ?? null;
}
