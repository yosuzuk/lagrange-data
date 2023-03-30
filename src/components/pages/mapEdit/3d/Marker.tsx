import { useCallback, useMemo } from 'react';
import { NearestFilter } from 'three';
import { useCursorControl } from '../context/CursorContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { createMarkerImage } from '../utils/spriteUtils';

interface IProps {
    position?: GamePosition;
    gridPosition?: GridPosition;
    color?: string;
}

export const Marker = (props: IProps) => {
    const { position: gamePosition, gridPosition, color = 'white' } = props;
    const { setCursorToPointer, setCursorToDefault } = useCursorControl();

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    });

    const markerImage = useMemo(() => createMarkerImage(color), [color]);

    const handleClick = useCallback(() => {
        console.log(position);
    }, [position]);

    return (
        <sprite
            position={[...position, 0]}
            scale={[markerImage.width * 0.0015, markerImage.height * 0.0015, 1]}
            onClick={handleClick}
            onPointerEnter={setCursorToPointer}
            onPointerLeave={setCursorToDefault}
        >
            <spriteMaterial sizeAttenuation={false}>
                <canvasTexture
                    attach="map"
                    image={markerImage}
                    magFilter={NearestFilter}
                />
            </spriteMaterial>
        </sprite>
    );
};
