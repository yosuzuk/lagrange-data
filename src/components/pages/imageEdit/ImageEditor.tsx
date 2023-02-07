import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { ImageSelectionRow } from './ImageSelectionRow';
import { IImageSelection } from './types/IImageSelection';

interface IProps {
    imageSelections: IImageSelection[];
    onUpdateImage: (selection: IImageSelection) => void;
    onMoveUp: (index: number) => void;
    onMoveDown: (index: number) => void;
    onRemove: (index: number) => void;
}

export const ImageEditor = (props: IProps) => {
    const { imageSelections, onUpdateImage, onMoveUp, onMoveDown, onRemove } = props;

    const height = useMemo<number | null>(() => {
        return imageSelections
            .map(selection => selection.canvasInfo?.height ?? null)
            .reduce((acc: number | null, next: number | null) => (acc !== null && next !== null) ? acc + next : null, 0);
    }, [imageSelections]);

    return (
        <Box
            sx={{
                height: height !== null ? `${height}px` : 'auto',
            }}
        >
            {imageSelections.map((imageSelection, index) => (
                <ImageSelectionRow
                    key={imageSelection.id}
                    imageSelection={imageSelection}
                    index={index}
                    total={imageSelections.length}
                    onUpdateImage={onUpdateImage}
                    onMoveUp={onMoveUp}
                    onMoveDown={onMoveDown}
                    onRemove={onRemove}
                />
            ))}
        </Box>
    );
};
