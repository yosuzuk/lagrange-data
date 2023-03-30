import { useState, useCallback, useMemo, useEffect } from 'react';
import { NearestFilter } from 'three';
import { useGridSize } from '../context/GridSizeContext';
import { GamePosition } from '../types/Coordinates';
import { toGridPosition } from '../utils/coordinateUtils';
import { createMarkerImage } from '../utils/spriteUtils';

const markerImage = createMarkerImage();

interface IProps {
    position: GamePosition;
}

export const Marker = (props: IProps) => {
    const { position } = props;
    const gridSize = useGridSize();

    return (
        <sprite
            position={[...toGridPosition(position, gridSize), 0]}
            scale={[markerImage.width * 0.0015, markerImage.height * 0.0015, 1]}
        >
            <spriteMaterial
                sizeAttenuation={false}
                color="0xffffff"
            >
                <canvasTexture
                    attach="map"
                    image={markerImage}
                    magFilter={NearestFilter}
                />
            </spriteMaterial>
        </sprite>
    );
};
