import { ReactNode, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';

interface IProps {
    children: ReactNode;
}

export const SizedContainer = (props: IProps) => {
    const { children } = props;

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
                <Box component="div" sx={{ width: size[0], height: size[1] }}>
                    {children}
                </Box>
            )}
        </Box>
    );
};
