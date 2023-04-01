import { createContext, useContext } from 'react';

export const ThreeCanvasSizeContext = createContext<[number | null, number | null]>([null, null]);

export const useThreeCanvasSize = (): [number, number] => {
    const [width, height] = useContext(ThreeCanvasSizeContext);
    if (width === null || height === null) {
        throw new Error('Missing three canvas size context');
    }
    return [width, height];
};
