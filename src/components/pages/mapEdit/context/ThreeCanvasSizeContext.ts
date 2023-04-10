import { createContext, useContext } from 'react';

type GetSizeFn = () => ([number, number] | null);

export const ThreeCanvasSizeContext = createContext<GetSizeFn>(() => null);

export const useThreeCanvasSize = (): [number, number] => {
    const getSizeFn = useContext(ThreeCanvasSizeContext);
    const size = getSizeFn();
    if (size === null) {
        throw new Error('Missing canvas size');
    }
    return size;
};
