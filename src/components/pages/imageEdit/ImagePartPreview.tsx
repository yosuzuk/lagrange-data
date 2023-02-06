import { useState, useCallback, useMemo, useRef, useEffect, RefObject, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

interface IProps {
    file: File;
    index: number;
}

export const ImagePartPreview = (props: IProps) => {
    const { file, index } = props;
    const sliderContainerRef = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const handler = () => {
            drawImage(file, sliderContainerRef, resizerRef, containerRef, canvasRef);
        };
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [file, sliderContainerRef, resizerRef, containerRef, canvasRef]);

    useEffect(() => {
        drawImage(file, sliderContainerRef, resizerRef, containerRef, canvasRef);
    }, [file, sliderContainerRef, resizerRef, containerRef, canvasRef]);

    const handleChangeSlider = useCallback((event: Event, value: number | number[]) => {
        if (resizerRef.current !== null) {
            const { maxHeight } = resizerRef.current.style;
            if (typeof maxHeight === 'undefined' || typeof value !== 'number') {
                return;
            }
            console.log(value);
            resizerRef.current.style.height = `${Number(maxHeight.replace('px', '')) * (1 - (value / 150))}px`;
        }
    }, [resizerRef]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: index % 2 === 0 ? 'start' : 'end',
                    position: 'relative',
                    width: '60px',
                    alignSelf: 'stretch'
                }}
            >
                <Box
                    ref={sliderContainerRef}
                    pb={4}
                    sx={{
                        position: 'absolute',
                        top: '0',
                    }}
                >
                    {index > 0 && (
                        <Slider
                            sx={{
                                '& input[type="range"]': {
                                    WebkitAppearance: 'slider-vertical',
                                },
                            }}
                            orientation="vertical"
                            defaultValue={0}
                            onChange={handleChangeSlider}
                            valueLabelDisplay="off"
                            onKeyDown={preventHorizontalKeyboardNavigation}
                        />
                    )}
                </Box>
            </Box>
            <Box ref={resizerRef} sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex' }}>
                <Box ref={containerRef} sx={{ alignSelf: 'end', width: '100%' }}>
                    <canvas ref={canvasRef} />
                </Box>
            </Box>
        </>
    );
};

function drawImage(file: File, sliderContainerRef: RefObject<HTMLDivElement>, resizerRef: RefObject<HTMLDivElement>, containerRef: RefObject<HTMLDivElement>, canvasRef: RefObject<HTMLCanvasElement>) {
    if (sliderContainerRef.current === null || resizerRef.current === null ||containerRef.current === null || canvasRef.current === null || typeof FileReader === 'undefined') {
        return;
    }
    const sliderContainer = sliderContainerRef.current;
    const resizer = resizerRef.current;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const fileReader = new FileReader();
    fileReader.onload = () => {
        const img = new Image();
        img.onload = () => {
            const aspectRatio = img.height / img.width;
            canvas.width = container.offsetWidth;
            canvas.height = Math.round(container.offsetWidth * aspectRatio);

            sliderContainer.style.height = `${canvas.height}px`;
            sliderContainer.style.top = `-${Math.round(canvas.height / 2)}px`;
            resizer.style.maxHeight = resizer.style.height = `${canvas.height}px`;
            container.style.height = `${canvas.height}px`;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            }
        };
        img.src = `${fileReader.result}`;
    };
    fileReader.readAsDataURL(file);
}

function preventHorizontalKeyboardNavigation(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
    }
}
