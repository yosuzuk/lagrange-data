import { createContext, useContext } from 'react';

const GridSizeContext = createContext<number | null>(null);

export const GridSizeProvider = GridSizeContext.Provider;

export const useGridSize = (): number => {
    const size = useContext(GridSizeContext);
    if (size === null) {
        throw new Error('Missing grid size');
    }
    return size;
}
