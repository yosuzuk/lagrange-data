import { useMemo } from 'react';
import { GridPosition } from '../types/Coordinates';
import { PlanetSize } from '../types/PlanetSize';
import { createSunIcon, createTextImage, mergeIconAndText } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    gridPosition: GridPosition;
    planetName: string;
    planetSize: PlanetSize;
}

export const PlanetLabel = (props: IProps) => {
    const { gridPosition, planetName, planetSize } = props;

    const canvas = useMemo(() => mergeIconAndText({
        iconCanvas: createSunIcon(),
        textCanvas: createTextImage({
            text: planetName,
            color: 'white',
            fontSize: 12,
        }),
        spacing: 4,
        marginTop: 40,
    }), [planetName]);

    return (
        <CanvasSprite gridPosition={gridPosition} canvas={canvas} renderOrder={2} />
    );
};
