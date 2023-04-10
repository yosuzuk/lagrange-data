import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useMemo, useRef } from 'react';
import { useCursorControl } from '../context/CursorContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { createMarkerImage } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';
import { TextLabel } from './TextLabel';

interface IProps {
    id: string;
    position?: GamePosition;
    gridPosition?: GridPosition;
    color?: string;
    label?: string | null;
}

export const Marker = (props: IProps) => {
    const { id, position: gamePosition, gridPosition, color = 'white', label } = props;
    const { setCursorToPointer, setCursorToDefault } = useCursorControl();
    const labelVisible = useZoomBasedVisibility('markerLabel');
    const updateIterationRef = useRef<number>(0);

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    });

    const markerImage = useMemo(() => {
        updateIterationRef.current++;
        return createMarkerImage(color);
    }, [color, updateIterationRef]);

    const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        console.log(position);
    }, [position]);

    return (
        <>
            <CanvasSprite
                key={`${id}_${updateIterationRef.current}`}
                canvas={markerImage}
                gridPosition={position}
                onClick={handleClick}
                onPointerEnter={setCursorToPointer}
                onPointerLeave={setCursorToDefault}
            />
            {label && labelVisible && (
                <TextLabel
                    id={`${id}_label`}
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
