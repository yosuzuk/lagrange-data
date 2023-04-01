import { NearestFilter } from 'three';
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

export const CanvasSprite = (props: IProps) => {
    const { canvas, position: gamePosition, gridPosition, onClick, onPointerEnter, onPointerLeave } = props;

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    });

    return (
        <sprite
            position={[...position, getZ('textLabel')]}
            scale={[canvas.width * 0.0015, canvas.height * 0.0015, 1]}
            onClick={onClick}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            <spriteMaterial sizeAttenuation={false}>
                <canvasTexture
                    attach="map"
                    image={canvas}
                    magFilter={NearestFilter}
                />
            </spriteMaterial>
        </sprite>
    );
};
