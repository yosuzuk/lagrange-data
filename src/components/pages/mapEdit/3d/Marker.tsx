import { useCallback, useMemo } from 'react';
import { NearestFilter } from 'three';
import { useCursorControl } from '../context/CursorContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { createMarkerImage } from '../utils/spriteUtils';
import { TextLabel } from './TextLabel';

interface IProps {
    position?: GamePosition;
    gridPosition?: GridPosition;
    color?: string;
    label?: string | null;
}

export const Marker = (props: IProps) => {
    const { position: gamePosition, gridPosition, color = 'white', label } = props;
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
        <>
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
            {label && (
                <TextLabel
                    text={`${label}\n`}
                    color={color}
                    fontSize={12}
                    lineSpacing={40}
                    gridPosition={position}
                    faceCamera={true}
                />
            )}
        </>
    );
};
