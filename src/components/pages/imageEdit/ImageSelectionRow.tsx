import { useCallback, useEffect, useRef, KeyboardEvent } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';
import { IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { IImageModifier, IImageSelection } from './types/IImageSelection';

interface IProps {
    index: number;
    total: number;
    imageSelection: IImageSelection;
    onUpdateImage: (selection: IImageSelection) => void;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    onRemove: (index: number) => void;
    setModifier: (selectionId: string, modifier: Partial<IImageModifier>) => void;
    getModifier: (selectionId: string) => IImageModifier;
}

export const ImageSelectionRow = (props: IProps) => {
    const { index, total, imageSelection, onUpdateImage, onMoveUp, onMoveDown, onRemove, setModifier, getModifier } = props;
    const modifier = getModifier(imageSelection.id);

    const cutSliderContainerRef = useRef<HTMLDivElement>(null);
    const moveSliderContainerRef = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = () => {
            // TODO debounce
            onUpdateImage({
                ...imageSelection,
                canvasInfo: null,
            });
        };
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        };
    }, [imageSelection, onUpdateImage]);

    useEffect(() => {
        const imageContainerWidth = imageContainerRef.current?.offsetWidth ?? null;

        if (!imageSelection.canvasInfo && imageContainerWidth !== null) {
            onUpdateImage({
                ...imageSelection,
                canvasInfo: {
                    width: imageContainerWidth,
                    height: imageContainerWidth * imageSelection.imageInfo.aspectRatio,
                    scale: imageContainerWidth / imageSelection.imageInfo.width,
                },
            });
        }
    }, [imageSelection, onUpdateImage, imageContainerRef]);

    const handleChangeCutSlider = useCallback((event: Event, value: number | number[]) => {
        if (resizerRef.current !== null && typeof value === 'number') {
            const { maxHeight } = resizerRef.current.style;
            if (typeof maxHeight === 'undefined' || imageSelection.canvasInfo === null) {
                return;
            }
            const newHeight = imageSelection.canvasInfo.height * (1 - (value / 100));
            const cutTopPx = imageSelection.canvasInfo.height - newHeight;
            resizerRef.current.style.height = `${newHeight}px`;
            setModifier(imageSelection.id, {
                cutTop: cutTopPx / imageSelection.canvasInfo.height,
            });
        }
    }, [resizerRef, setModifier, imageSelection]);

    const handleChangeMoveSlider = useCallback((event: Event, value: number | number[]) => {
        if (resizerRef.current !== null && typeof value === 'number') {
            const { maxHeight } = resizerRef.current.style;
            if (typeof maxHeight === 'undefined' || imageSelection.canvasInfo === null) {
                return;
            }
            const moveUpPx = Number(maxHeight.replace('px', '')) * (value / 100);
            resizerRef.current.style.marginTop = `-${moveUpPx}px`;
            setModifier(imageSelection.id, {
                moveUp: moveUpPx / imageSelection.canvasInfo.height,
            });
        }
    }, [resizerRef, setModifier, imageSelection]);

    const width = imageSelection.canvasInfo?.width ?? Number.NaN;
    const height = imageSelection.canvasInfo?.height ?? Number.NaN;
    const widthPxOrFullWidth = Number.isFinite(width) ? `${width}px` : '100%';
    const heightPxOrAuto = Number.isFinite(height) ? `${height}px` : 'auto';
    const sliderTopPx = Number.isFinite(height) ? `-${Math.round(height / 2)}px` : '0';

    return (
        <Paper>
            <Stack direction="row">
                <Box
                    sx={{
                        position: 'relative',
                        alignSelf: 'stretch'
                    }}
                >
                    <Box
                        ref={cutSliderContainerRef}
                        pb={4}
                        sx={{
                            position: 'absolute',
                            top: sliderTopPx,
                            left: index % 2 === 0 ? `${width * 0.2}px` : `${width * 0.05}px`,
                            height: heightPxOrAuto,
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
                                defaultValue={modifier.cutTop * 100}
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
                            top: sliderTopPx,
                            left: index % 2 === 0 ? `${width * 0.95 - 30}px` : `${width * 0.8 - 30}px`,
                            height: heightPxOrAuto,
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
                                defaultValue={modifier.moveUp * 100}
                                onChange={handleChangeMoveSlider}
                                valueLabelDisplay="off"
                                onKeyDown={preventHorizontalKeyboardNavigation}
                                color="secondary"
                            />
                        )}
                    </Box>
                </Box>
                <Box
                    ref={resizerRef}
                    sx={{
                        flexGrow: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        marginTop: 0,
                    }}
                    style={{
                        height: imageSelection.canvasInfo !== null ? imageSelection.canvasInfo.height * (1 - modifier.cutTop) : 'auto',
                        maxHeight: heightPxOrAuto,
                        marginTop: imageSelection.canvasInfo !== null ? `-${modifier.moveUp * imageSelection.canvasInfo.height}px` : '0',
                    }}
                >
                    <Stack direction="row" alignItems="end" sx={{ flexGrow: 1 }}>
                        <Box ref={imageContainerRef}
                            sx={{
                                width: widthPxOrFullWidth,
                                height: heightPxOrAuto,
                            }}
                        >
                            <img
                                width={widthPxOrFullWidth}
                                height={heightPxOrAuto}
                                src={imageSelection.dataUrl}
                                alt={imageSelection.file.name}
                            />
                        </Box>
                        <Stack direction="row" alignItems="center" sx={{ height: '100%' }}>
                            <Stack>
                                <div>
                                    <IconButton onClick={() => onMoveUp(index)} disabled={index === 0}>
                                        <KeyboardArrowUpIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton onClick={() => onMoveDown(index)} disabled={index === total - 1}>
                                        <KeyboardArrowDownIcon />
                                    </IconButton>
                                </div>
                            </Stack>
                            <div>
                                <IconButton onClick={() => onRemove(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Paper>
    );
};

function preventHorizontalKeyboardNavigation(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
    }
}
