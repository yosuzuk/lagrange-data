import { ReactNode, useEffect, useRef, useState } from 'react';
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
    const [size, setSize] = useState<[number, number] | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            setSize([containerRef.current.offsetWidth, containerRef.current.offsetHeight]);
        }
    }, [containerRef.current]);

    return (
        <Box component="div" sx={{ flexGrow: 1 }} ref={containerRef}>
            {size && (
                <ThreeCanvasSizeContext.Provider value={size}>
                    <Box component="div" sx={{ width: size[0], height: size[1], cursor }}>
                        {children}
                    </Box>
                </ThreeCanvasSizeContext.Provider>
            )}
        </Box>
    );
};
