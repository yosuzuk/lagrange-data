import { ReactNode, useCallback, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { useCursorValue } from './context/CursorContext';
import { ThreeCanvasSizeContext } from './context/ThreeCanvasSizeContext';

interface IProps {
    children: ReactNode;
}

export const ThreeCanvasContainer = (props: IProps) => {
    const { children } = props;
    const cursor = useCursorValue();
    const containerRef = useRef<HTMLDivElement>(null);

    const getSize = useCallback((): [number, number] | null => {
        if (!containerRef.current) {
            return null;
        }
        const { offsetWidth, offsetHeight } = containerRef.current;
        return [offsetWidth, offsetHeight];
    }, [containerRef.current]);

    return (
        <Box
            component="div"
            style={{
                height: '100dvh', // if supported
            }}
            sx={{
                height: '100vh', // fallback
                overflowY: 'hidden',
                cursor,
            }}
            ref={containerRef}
        >
            <ThreeCanvasSizeContext.Provider value={getSize}>
                {children}
            </ThreeCanvasSizeContext.Provider>
        </Box>
    );
};
