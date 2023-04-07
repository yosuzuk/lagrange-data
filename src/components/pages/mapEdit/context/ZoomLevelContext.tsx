import { createContext, ReactNode, useState, useContext, useMemo, useCallback, useRef } from 'react';
import { IZoomLevel, IZoomBasedOpacity, IZoomBasedVisibility } from '../types/IZoomLevel';

interface ICameraDistanceContextValue {
    getCameraDistance: () => number | null;
    setCameraDistance: (distance: number) => void;
}

const MIN_DISTANCE = 5;
const MAX_DISTANCE = 1500;

const zoomLevels: IZoomLevel[] = [
    {
        fromDistance: 0,
        untilDistance: 8,
        visibility: {
            zoneBackground: false,
            zoneLabel: false,
            gameGrid: true,
            planetLabel: true,
            subPlanetOrbit: true,
            markerLabel: true,
            defaultArea: true,
            defaultAreaEdge: false,
            cityArea: true,
            cityAreaEdge: false,
        },
        opacity: {
            zoneBackground: 0,
            areaBackground: 0.03,
        },
    },
    {
        fromDistance: 8,
        untilDistance: 20,
        visibility: {
            zoneBackground: false,
            zoneLabel: false,
            gameGrid: true,
            planetLabel: true,
            subPlanetOrbit: true,
            markerLabel: true,
            defaultArea: true,
            defaultAreaEdge: true,
            cityArea: true,
            cityAreaEdge: true,
        },
        opacity: {
            zoneBackground: 0,
            areaBackground: 0.2,
        },
    },
    {
        fromDistance: 20,
        untilDistance: 50,
        visibility: {
            zoneBackground: false,
            zoneLabel: false,
            gameGrid: false,
            planetLabel: true,
            subPlanetOrbit: true,
            markerLabel: true,
            defaultArea: true,
            defaultAreaEdge: true,
            cityArea: true,
            cityAreaEdge: true,
        },
        opacity: {
            zoneBackground: 0,
            areaBackground: 0.2,
        },
    },
    {
        fromDistance: 50,
        untilDistance: 200,
        visibility: {
            zoneBackground: true,
            zoneLabel: true,
            gameGrid: false,
            planetLabel: true,
            subPlanetOrbit: true,
            markerLabel: true,
            defaultArea: false,
            defaultAreaEdge: false,
            cityArea: true,
            cityAreaEdge: true,
        },
        opacity: {
            zoneBackground: 0.1,
            areaBackground: 0.2,
        },
    },
    {
        fromDistance: 200,
        untilDistance: MAX_DISTANCE,
        visibility: {
            zoneBackground: true,
            zoneLabel: true,
            gameGrid: false,
            planetLabel: false,
            subPlanetOrbit: false,
            markerLabel: false,
            defaultArea: false,
            defaultAreaEdge: false,
            cityArea: false,
            cityAreaEdge: false,
        },
        opacity: {
            zoneBackground: 0.4,
            areaBackground: 0,
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
        min: MIN_DISTANCE,
        max: MAX_DISTANCE,
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
