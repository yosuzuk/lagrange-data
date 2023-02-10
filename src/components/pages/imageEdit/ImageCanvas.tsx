import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { IImageModifier, IImageSelection } from './types/IImageSelection';

interface IProps {
    imageSelections: IImageSelection[];
    getModifier: (selectionId: string) => IImageModifier;
    onResultReady: (canvas: HTMLCanvasElement | null) => void;
}

export const ImageCanvas = (props: IProps) => {
    const { imageSelections, getModifier, onResultReady } = props;
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
            onResultReady(canvas);
        })();
    }, [canvasRef, imageSelections, getModifier, onResultReady]);

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
