import { useMemo } from 'react';
import { useZoomBasedVisibility } from '../context/ZoomLevelContext';
import { GridPosition } from '../types/Coordinates';
import { PlanetSize } from '../types/PlanetSize';
import { createLargePlanetIcon, createSmallPlanetIcon, createSunIcon, createTextImage, mergeIconAndText } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    gridPosition: GridPosition;
    planetName: string;
    planetSize: PlanetSize;
}

export const PlanetLabel = (props: IProps) => {
    const { gridPosition, planetName, planetSize } = props;
    const visible = useZoomBasedVisibility('planetLabel');

    const canvas = useMemo(() => {
        const iconCanvas = planetSize === 'small' ? createSmallPlanetIcon() : createLargePlanetIcon();
        const textCanvas = createTextImage({
            text: planetName,
            color: 'white',
            fontSize: 12,
        });
        return mergeIconAndText({
            iconCanvas,
            textCanvas,
            spacing: 4,
            marginTop: (planetSize === 'large' ? 55 : 35) + Math.max(iconCanvas.height, textCanvas.height),
        });
    }, [planetName, planetSize]);

    if (!visible) {
        return null;
    }

    return (
        <CanvasSprite gridPosition={gridPosition} canvas={canvas} />
    );
};
