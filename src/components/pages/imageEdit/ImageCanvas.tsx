import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { IImageModifier, IImageSelection } from './types/IImageSelection';

interface IProps {
    imageSelections: IImageSelection[];
    getModifier: (selectionId: string) => IImageModifier;
}

export const ImageCanvas = (props: IProps) => {
    const { imageSelections, getModifier } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx === null) {
            return;
        }

        // prepare canvas
        canvas.width = calculateCanvasWidth(imageSelections);
        canvas.height = calculateCanvasHeight(imageSelections, getModifier);

        // draw each image
        let nextY = 0;
        (async () => {
            for (const selection of imageSelections) {
                await new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        const imageHeight = getCroppedHeight(selection, getModifier);
                        const cutOff = selection.imageInfo.height - imageHeight;
                        const moved = getVerticalMoveOffset(selection, getModifier);

                        const sourceX = 0;
                        const sourceY = cutOff;
                        const sourceWidth = selection.imageInfo.width;
                        const sourceHeight = imageHeight;
                        const destinationX = 0;
                        const destinationY = nextY - moved;
                        const destinationWidth = selection.imageInfo.width;
                        const destinationHeight = imageHeight;
                        ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destinationX, destinationY, destinationWidth, destinationHeight);

                        nextY = destinationY + destinationHeight;
                        resolve();
                    };
                    img.src = selection.dataUrl;
                });
            }
        })();
    }, [canvasRef, imageSelections, getModifier]);

    return (
        <div>
            <canvas ref={canvasRef} style={{ width: '100%' }} />
        </div>
    );
};

function calculateCanvasWidth(imageSelections: IImageSelection[]): number {
    return Math.max(...imageSelections.map(selection => selection.imageInfo.width));
}

function calculateCanvasHeight(imageSelections: IImageSelection[], getModifier: (selectionId: string) => IImageModifier): number {
    return imageSelections.map(selection => {
        return getCroppedHeight(selection, getModifier) - getVerticalMoveOffset(selection, getModifier);
    }).reduce((sum, next) => sum + next, 0);
}

function getCroppedHeight(selection: IImageSelection, getModifier: (selectionId: string) => IImageModifier): number {
    console.log(getModifier(selection.id).cutTop);
    return Math.round(selection.imageInfo.height * (1 - getModifier(selection.id).cutTop));
}

function getVerticalMoveOffset(selection: IImageSelection, getModifier: (selectionId: string) => IImageModifier) {
    return Math.round(selection.imageInfo.height * getModifier(selection.id).moveUp);
}

/*import { useState, useCallback, useMemo, useRef, useEffect, RefObject, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
    file: File;
    index: number;
    total: number;
    moveFileUp: (index: number) => void;
    moveFileDown: (index: number) => void;
    removeFile: (index: number) => void;
}

export const ImagePartPreview = (props: IProps) => {
    const { file, index, total, moveFileUp, moveFileDown, removeFile } = props;
    const cutSliderContainerRef = useRef<HTMLDivElement>(null);
    const moveSliderContainerRef = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const handler = () => {
            drawImage(file, cutSliderContainerRef, moveSliderContainerRef, resizerRef, containerRef, canvasRef);
        };
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [file, cutSliderContainerRef, moveSliderContainerRef, resizerRef, containerRef, canvasRef]);

    useEffect(() => {
        drawImage(file, cutSliderContainerRef, moveSliderContainerRef, resizerRef, containerRef, canvasRef);
    }, [file, cutSliderContainerRef, moveSliderContainerRef, resizerRef, containerRef, canvasRef]);

    const handleChangeCutSlider = useCallback((event: Event, value: number | number[]) => {
        if (resizerRef.current !== null && typeof value === 'number') {
            const { maxHeight } = resizerRef.current.style;
            if (typeof maxHeight === 'undefined') {
                return;
            }
            resizerRef.current.style.height = `${Number(maxHeight.replace('px', '')) * (1 - (value / 150))}px`;
        }
    }, [resizerRef]);

    const handleChangeMoveSlider = useCallback((event: Event, value: number | number[]) => {
        if (resizerRef.current !== null && typeof value === 'number') {
            const { maxHeight } = resizerRef.current.style;
            if (typeof maxHeight === 'undefined') {
                return;
            }
            resizerRef.current.style.marginTop = `-${Number(maxHeight.replace('px', '')) * (value / 150)}px`;
        }
    }, [resizerRef]);

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    flexBasis: '120px',
                    alignSelf: 'stretch'
                }}
            >
                <Box
                    ref={cutSliderContainerRef}
                    pb={4}
                    sx={{
                        position: 'absolute',
                        top: '0',
                        left: index % 2 === 0 ? '30px' : '0px',
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
                            onChange={handleChangeCutSlider}
                            valueLabelDisplay="off"
                            onKeyDown={preventHorizontalKeyboardNavigation}
                        />
                    )}
                </Box>
                <Box
                    ref={moveSliderContainerRef}
                    pb={4}
                    sx={{
                        position: 'absolute',
                        top: '0',
                        left: index % 2 === 0 ? '90px' : '60px',
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
                            onChange={handleChangeMoveSlider}
                            valueLabelDisplay="off"
                            onKeyDown={preventHorizontalKeyboardNavigation}
                            color="secondary"
                        />
                    )}
                </Box>
            </Box>
            <Box ref={resizerRef} sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', marginTop: 0 }}>
                <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
                    <Box ref={containerRef} sx={{ alignSelf: 'end', width: '100%' }}>
                        <canvas ref={canvasRef} />
                    </Box>
                    <Stack>
                        <div>
                            <IconButton onClick={() => moveFileUp(index)} disabled={index === 0}>
                                <KeyboardArrowUpIcon />
                            </IconButton>
                        </div>
                        <div>
                            <IconButton onClick={() => moveFileDown(index)} disabled={index === total - 1}>
                                <KeyboardArrowDownIcon />
                            </IconButton>
                        </div>
                    </Stack>
                    <div>
                        <IconButton onClick={() => removeFile(index)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </Stack>
            </Box>
        </>
    );
};

function drawImage(
    file: File,
    cutSliderContainerRef: RefObject<HTMLDivElement>,
    moveSliderContainerRef: RefObject<HTMLDivElement>,
    resizerRef: RefObject<HTMLDivElement>,
    containerRef: RefObject<HTMLDivElement>,
    canvasRef: RefObject<HTMLCanvasElement>,
) {
    if (cutSliderContainerRef.current === null || moveSliderContainerRef.current === null || resizerRef.current === null ||containerRef.current === null || canvasRef.current === null || typeof FileReader === 'undefined') {
        return;
    }
    const cutSliderContainer = cutSliderContainerRef.current;
    const moveSliderContainer = moveSliderContainerRef.current;
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

            cutSliderContainer.style.height = `${canvas.height}px`;
            cutSliderContainer.style.top = `-${Math.round(canvas.height / 2)}px`;
            moveSliderContainer.style.height = `${canvas.height}px`;
            moveSliderContainer.style.top = `-${Math.round(canvas.height / 2)}px`;

            container.style.height = resizer.style.maxHeight = resizer.style.height = `${canvas.height}px`;

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
*/