import { createContext, useContext } from 'react';

type GetSizeFn = () => ([number, number] | null);

export const ThreeCanvasSizeContext = createContext<GetSizeFn>(() => null);

export const useThreeCanvasSize = (): [number, number] | null => {
    return useContext(ThreeCanvasSizeContext)();
};
