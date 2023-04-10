import { ThreeEvent } from '@react-three/fiber';
import { useCallback, useMemo, useRef } from 'react';
import { useCursorControl } from '../context/CursorContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IMarker } from '../types/IMapContent';
import { createMarkerImage } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';
import { TextLabel } from './TextLabel';

interface IProps {
    marker: IMarker;
}

const DEFAULT_COLOR = 'white';

export const Marker = (props: IProps) => {
    const { marker } = props;
    const { setCursorToPointer, setCursorToDefault } = useCursorControl();
    const labelVisible = useZoomBasedVisibility('markerLabel');
    const updateIterationRef = useRef<number>(0);

    const position = useNormalizedPosition({
        gamePosition: marker.position,
    });

    const markerImage = useMemo(() => {
        updateIterationRef.current++;
        return createMarkerImage(marker.color ?? DEFAULT_COLOR);
    }, [marker, updateIterationRef]);

    const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        console.log(position);
    }, [position]);

    return (
        <>
            <CanvasSprite
                key={`${marker.id}_${updateIterationRef.current}`}
                canvas={markerImage}
                gridPosition={position}
                onClick={handleClick}
                onPointerEnter={setCursorToPointer}
                onPointerLeave={setCursorToDefault}
            />
            {marker.label && labelVisible && (
                <TextLabel
                    id={`${marker.id}_label`}
                    text={marker.label}
                    color={marker.color}
                    marginBottom={60}
                    gridPosition={position}
                    faceCamera={true}
                />
            )}
        </>
    );
};
