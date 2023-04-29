import { useCallback, useMemo, useRef, Fragment } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { useCursorControl } from '../context/CursorContext';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IMarker } from '../types/IMapContent';
import { createMarkerImage } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';
import { TextLabel } from './TextLabel';

interface IProps {
    marker: IMarker;
    onClick: (marker: IMarker) => void;
}

const DEFAULT_COLOR = 'white';

export const Marker = (props: IProps) => {
    const { marker, onClick } = props;
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
        onClick(marker);
    }, [onClick, marker]);

    return (
        <Fragment key={`${marker.id}_${updateIterationRef.current}`}>
            <CanvasSprite
                name={marker.id}
                canvas={markerImage}
                gridPosition={position}
                onClick={handleClick}
                onPointerEnter={setCursorToPointer}
                onPointerLeave={setCursorToDefault}
            />
            {marker.label && labelVisible && (
                <TextLabel
                    text={marker.label}
                    color={marker.color}
                    marginBottom={55}
                    gridPosition={position}
                    faceCamera={true}
                />
            )}
        </Fragment>
    );
};
