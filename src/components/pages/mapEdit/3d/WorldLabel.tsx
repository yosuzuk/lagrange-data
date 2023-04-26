import { useMemo } from 'react';
import { createSunIcon, createTextImage, mergeIconAndText } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    worldName?: string | null;
}

export const WorldLabel = (props: IProps) => {
    const { worldName } = props;

    const canvas = useMemo(() => {
        if (!worldName) {
            return null;
        }

        const iconCanvas = createSunIcon();
        const textCanvas = createTextImage({
            text: worldName,
            color: 'white',
            fontSize: 12,
        });

        return mergeIconAndText({
            iconCanvas,
            textCanvas,
            spacing: 4,
            marginTop: 35 + Math.max(iconCanvas.height, textCanvas.height),
        });
    }, [worldName]);

    if (!canvas) {
        return null;
    }

    return (
        <CanvasSprite key={worldName} canvas={canvas} />
    );
};
