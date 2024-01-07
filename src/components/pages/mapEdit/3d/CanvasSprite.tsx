import { useMemo } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { NearestFilter } from 'three';
import { useThreeCanvasSize } from '../context/ThreeCanvasSizeContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { getRendeOrder } from '../utils/renderOrder';

interface IProps {
    name?: string;
    canvas: HTMLCanvasElement;
    position?: GamePosition;
    gridPosition?: GridPosition;
    visible?: boolean;
    onClick?: (e: ThreeEvent<MouseEvent>) => void;
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
    const { name, canvas, position: gamePosition, gridPosition, visible = true, onClick, onPointerEnter, onPointerLeave } = props;
    const canvasSize = useThreeCanvasSize();
    const [threeCanvasWidth, threeCanvasHeight] = canvasSize ?? [0, 0];

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

    if (canvasSize === null) {
        return null;
    }

    return (
        <sprite
            visible={visible}
            name={name}
            position={[...position, 0]}
            scale={[scaleX, scaleY, 1]}
            onClick={onClick}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            renderOrder={getRendeOrder('floadingLabel')}
        >
            <spriteMaterial sizeAttenuation={false} depthWrite={false} depthTest={false}>
                <canvasTexture
                    attach="map"
                    image={canvas}
                    magFilter={NearestFilter}
                />
            </spriteMaterial>
        </sprite>
    );
};
