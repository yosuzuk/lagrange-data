import { useMemo } from 'react';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { createTextImage } from '../utils/spriteUtils';
import { getZ } from '../utils/zUtils';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    text: string;
    position?: GamePosition;
    gridPosition?: GridPosition;
    color?: string;
    font?: string;
    fontSize?: number;
    lineSpacing?: number;
    faceCamera?: boolean;
    scale?: number;
    z?: number;
}

const FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT = 0.2;

export const TextLabel = (props: IProps) => {
    const { text, position: gamePosition, gridPosition, color = 'white', font = 'Arial', fontSize = 12, lineSpacing = 4, faceCamera = false, scale = 1, z } = props;

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    });

    const textImage = useMemo(() => {
        if (text.trim().length === 0) {
            return null;
        }
        return createTextImage({
            text,
            color,
            font,
            fontSize,
            lineSpacing,
        });
    }, [text, color, font, fontSize, lineSpacing]);

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
        <mesh position={[...position, z ?? getZ('textLabel')]}>
            <planeGeometry
                args={[
                    textImage.width * scale * FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT,
                    textImage.height * scale * FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT,
                ]}
            />
            <meshBasicMaterial transparent={true}>
                <canvasTexture
                    attach="map"
                    image={textImage}
                />
            </meshBasicMaterial>
        </mesh>
    );
};
