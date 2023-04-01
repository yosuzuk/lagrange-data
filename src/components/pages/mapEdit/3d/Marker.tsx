import { useCallback, useMemo } from 'react';
import { useCursorControl } from '../context/CursorContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { createMarkerImage } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';
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
            <CanvasSprite
                canvas={markerImage}
                gridPosition={position}
                onClick={handleClick}
                onPointerEnter={setCursorToPointer}
                onPointerLeave={setCursorToDefault}
            />
            {label && (
                <TextLabel
                    text={`${label}`}
                    color={color}
                    scale={1}
                    lineSpacing={40}
                    gridPosition={position}
                    faceCamera={true}
                />
            )}
        </>
    );
};
