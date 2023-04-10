import { useMemo, useRef } from 'react';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getRendeOrder } from '../utils/renderOrder';
import { createTextImage, applyMarginToImage } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    text: string;
    position?: GamePosition;
    gridPosition?: GridPosition;
    color?: string;
    backgroundColor?: string;
    font?: string;
    fontSize?: number;
    lineSpacing?: number;
    padding?: number;
    marginTop?: number;
    marginBottom?: number;
    faceCamera?: boolean;
    scale?: number;
}

const FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT = 0.2;

export const TextLabel = (props: IProps) => {
    const {
        text,
        position: gamePosition,
        gridPosition,
        color = 'white',
        backgroundColor,
        font = 'Arial',
        fontSize = 12,
        lineSpacing = 4,
        padding = 0,
        marginTop = 0,
        marginBottom = 0,
        faceCamera = false,
        scale = 1,
    } = props;

    const updateIterationRef = useRef<number>(0);

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    });

    const textImage = useMemo(() => {
        if (text.trim().length === 0) {
            return null;
        }

        updateIterationRef.current++;

        const textImage = createTextImage({
            text,
            color,
            backgroundColor,
            font,
            fontSize,
            lineSpacing,
            padding,
        });

        if (marginTop > 0 || marginBottom > 0) {
            return applyMarginToImage({
                image: textImage,
                marginTop,
                marginBottom,
            });
        }

        return textImage;
    }, [updateIterationRef, text, color, backgroundColor, font, fontSize, lineSpacing, padding, marginTop, marginBottom]);

    if (!textImage) {
        console.log('skipped image');
        return null;
    }

    if (faceCamera) {
        return (
            <CanvasSprite
                canvas={textImage}
                gridPosition={position}
            />
        );
    }

    return (
        <mesh position={[...position, 0]} renderOrder={getRendeOrder('fixedLabel')}>
            <planeGeometry
                args={[
                    textImage.width * scale * FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT,
                    textImage.height * scale * FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT,
                ]}
            />
            <meshBasicMaterial transparent={true} depthWrite={false}>
                <canvasTexture
                    attach="map"
                    image={textImage}
                />
            </meshBasicMaterial>
        </mesh>
    );
};
