import { useState, useCallback, useMemo, useEffect } from 'react';
import { NearestFilter } from 'three';
import { useNormalizedPosition } from '../hooks/useNormalizedPosition';
import { GamePosition, GridPosition } from '../types/Coordinates';
import { createTextImage } from '../utils/spriteUtils';
import { getZ } from '../utils/zUtils';
import { CanvasSprite } from './CanvasSprite';

/*function createText2D(text, color, font, size, segW, segH) {

    var canvas = createTextCanvas(text, color, font, size);
    var plane = new THREE.PlaneGeometry(canvas.width, canvas.height, segW, segH);
    var tex = new THREE.Texture(canvas);

    tex.needsUpdate = true;

    var planeMat = new THREE.MeshBasicMaterial({
        map: tex,
        color: 0xffffff,
        transparent: true
    });

    var mesh = new THREE.Mesh(plane, planeMat);
    mesh.scale.set(0.2, 0.2, 0.2);
    //mesh.doubleSided = true; // this is no longer a property of mesh // CHANGED
    mesh.quaternion = camera.quaternion; // CHANGED

    return mesh;

}*/

interface IProps {
    text: string;
    position?: GamePosition;
    gridPosition?: GridPosition;
    color?: string;
    font?: string;
    lineSpacing?: number;
    faceCamera?: boolean;
    scale?: number;
    z?: number;
}

const FONT_SIZE = 72;
const FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT = 0.2;

export const TextLabel = (props: IProps) => {
    const { text, position: gamePosition, gridPosition, color = 'white', font = 'Arial', lineSpacing = 4, faceCamera = false, scale = 1, z } = props;

    const position = useNormalizedPosition({
        gamePosition,
        gridPosition,
    });

    const textImage = useMemo(() => {
        if (text.trim().length === 0) {
            return null;
        }
        return createTextImage({
            text,
            color,
            font,
            fontSize: 12, // FONT_SIZE,
            lineSpacing,
        });
    }, [text, color, font, lineSpacing]);

    if (!textImage) {
        console.log('skipped image');
        return null;
    }

    if (faceCamera) {
        return (
            <CanvasSprite
                canvas={textImage}
                gridPosition={position}
            />
        );
    }

    return (
        <mesh position={[...position, z ?? getZ('textLabel')]}>
            <planeGeometry
                args={[
                    textImage.width * scale * FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT,
                    textImage.height * scale * FIXED_SCALE_FOR_NON_CAMERA_FACING_TEXT,
                ]}
            />
            <meshBasicMaterial transparent={true}>
                <canvasTexture
                    attach="map"
                    image={textImage}
                />
            </meshBasicMaterial>
        </mesh>
    );
};
