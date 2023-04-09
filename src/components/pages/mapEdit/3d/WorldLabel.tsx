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

        return mergeIconAndText({
            iconCanvas: createSunIcon(),
            textCanvas: createTextImage({
                text: worldName,
                color: 'white',
                fontSize: 12,
            }),
            spacing: 4,
            marginTop: 40,
        });
    }, [worldName]);

    if (!canvas) {
        return null;
    }

    return (
        <CanvasSprite canvas={canvas} />
    );
};
