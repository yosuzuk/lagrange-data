import { useCallback, useMemo } from 'react';
import { useCursorControl } from '../context/CursorContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
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
    const labelVisible = useZoomBasedVisibility('markerLabel');

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
            {label && labelVisible && (
                <TextLabel
                    text={label}
                    color={color}
                    marginBottom={60}
                    gridPosition={position}
                    faceCamera={true}
                />
            )}
        </>
    );
};
