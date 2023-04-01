import { useMemo } from 'react';
import { createSunIcon, createTextImage, mergeIconAndText } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    worldName: string;
}

export const WorldLabel = (props: IProps) => {
    const { worldName } = props;

    const canvas = useMemo(() => {
        return mergeIconAndText(
            createSunIcon(),
            createTextImage({
                text: worldName,
                color: 'white',
                fontSize: 12,
            }),
            4,
        );
    }, [worldName]);

    return (
        <CanvasSprite canvas={canvas} />
    );
};
