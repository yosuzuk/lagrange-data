import { useState, useCallback, useMemo, useEffect } from 'react';
import { CoordinateInput } from './CoordinateInput';
import { IMapContent } from './types/IMapContent';
import { getPrimaryCoordinatesForMapContent } from './utils/mapContentUtils';

interface IProps {
    targetToMark: IMapContent | null;
}

export const CoordinateInputs = (props: IProps) => {
    const { targetToMark } = props;
    const [x, y] = targetToMark ? getPrimaryCoordinatesForMapContent(targetToMark) : [null, null];

    return (
        <>
            <div>
                <CoordinateInput
                    id="x-coordinate"
                    label="X"
                    value={x}
                />
            </div>
            <div>
                <CoordinateInput
                    id="y-coordinate"
                    label="Y"
                    value={y}
                />
            </div>
        </>
    );
};
