import { useEffect, useMemo, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { GridPosition } from '../types/Coordinates';
import { createTargetSprite } from '../utils/spriteUtils';
import { CanvasSprite } from './CanvasSprite';

interface IProps {
    gridPosition: GridPosition | null;
}

export const TargetSprite = (props: IProps) => {
    const { gridPosition } = props;
    const { invalidate } = useThree();

    useEffect(() => {
        invalidate();
    }, [gridPosition, invalidate]);

    const targetImage = useMemo(() => {
        return createTargetSprite();
    }, []);

    if (!gridPosition) {
        return null;
    }

    return (
        <CanvasSprite
            canvas={targetImage}
            gridPosition={gridPosition}
        />
    );
};
