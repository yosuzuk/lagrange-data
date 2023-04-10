import { useMemo, useRef } from 'react';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { IStation } from '../types/IMapContent';
import { createPlayerBaseIcon, createTextImage, mergeIconAndText } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';
import { StationCone } from './StationCone';

interface IProps {
    station: IStation;
}

export const Station = (props: IProps) => {
    const { station } = props;
    const coneVisible = useZoomBasedVisibility('stationCone');
    const labelVisible = useZoomBasedVisibility('baseLabel');

    const updateIterationRef = useRef<number>(0);

    const position = useNormalizedPosition({
        gamePosition: station.position,
    });

    const labelImage = useMemo<HTMLCanvasElement | null>(() => {
        updateIterationRef.current++;

        if (!station.name) {
            return null;
        }

        switch (station.type) {
            case 'base': {
                const iconCanvas = createPlayerBaseIcon(station.color);
                const textCanvas = createTextImage({
                    text: station.name,
                    fontSize: 12,
                    color: station.color,
                });
                return mergeIconAndText({
                    iconCanvas,
                    textCanvas,
                    spacing: 4,
                    padding: 1,
                    marginBottom: 90,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                });
            }
            default: {
                return createTextImage({
                    text: station.name,
                    fontSize: 12,
                    color: station.color,
                    padding: 1,
                    marginBottom: 90,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                });
            }
        }
    }, [station]);

    return (
        <>
            {coneVisible && (
                <StationCone position={position} color={station.color} base={station.type === 'base'} />
            )}
            {labelImage && labelVisible && (
                <CanvasSprite
                    key={`${station.id}_label_${updateIterationRef.current}`}
                    canvas={labelImage}
                    gridPosition={position}
                />
            )}
        </>
    );
};
