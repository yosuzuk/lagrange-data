import { useMemo } from 'react';
import { LinearMipMapLinearFilter, NearestFilter } from 'three';
import { useThreeCanvasSize } from '../context/ThreeCanvasSizeContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getZ } from '../utils/zUtils';

interface IProps {
    canvas: HTMLCanvasElement;
    position?: GamePosition;
    gridPosition?: GridPosition;
    onClick?: () => void;
    onPointerEnter?: () => void;
    onPointerLeave?: () => void;
}

// Note:
// We would like to size the sprite based on the canvas size but sprite size cannot be specified in pixel.
// Therefore we have to calculate the scale factor instead.
// The scale factor depends on the size of our three.js canvas.
//
const REFERENCE_FACTOR_Y = 0.77;

export const CanvasSprite = (props: IProps) => {
    const { canvas, position: gamePosition, gridPosition, onClick, onPointerEnter, onPointerLeave } = props;
    const [threeCanvasWidth, threeCanvasHeight] = useThreeCanvasSize();

    const [scaleX, scaleY] = useMemo(() => {
        const referenceFactorX = REFERENCE_FACTOR_Y * (threeCanvasWidth / threeCanvasHeight);
        return [
            canvas.width * (referenceFactorX / (threeCanvasWidth)),
            canvas.height * (REFERENCE_FACTOR_Y / (threeCanvasHeight))
        ];
    }, [threeCanvasWidth, threeCanvasHeight]);

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    });

    return (
        <sprite
            position={[...position, getZ('textLabel')]}
            scale={[scaleX, scaleY, 1]}
            onClick={onClick}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            <spriteMaterial sizeAttenuation={false} depthWrite={false}>
                <canvasTexture
                    attach="map"
                    image={canvas}
                    magFilter={NearestFilter}
                />
            </spriteMaterial>
        </sprite>
    );
};
