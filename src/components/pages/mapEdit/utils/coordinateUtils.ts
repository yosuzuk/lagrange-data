import { GamePosition, GridPosition } from '../types/Coordinates';

const GRID_SCALE = 0.1;

export function translateSizeToGrid(x: number): number {
    return x * GRID_SCALE;
}

export function toGridPosition(gamePosition: GamePosition, gridSize: number): GridPosition {
    // grid x-axis: positive to the left, negative to the right, 0 at the center
    // game x-axis: positive to the right, 0 at the left front corner
    // grid y-axis: positive to the front, negative to the rear, 0 at the center
    // game y-axis: positive to the rear, 0 at the left front corner
    const x = Array.isArray(gamePosition) ? gamePosition[0] : Number(`${gamePosition}`.split(',')[0].replace('(', ''));
    const y = Array.isArray(gamePosition) ? gamePosition[1] : Number(`${gamePosition}`.split(',')[1].replace(')', ''));
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        throw new Error(`Invalid in-game coordinates: ${JSON.stringify(gamePosition)}`);
    }

    // 2000,3000 => 300,200

    return [
        (gridSize / 2) - (x * GRID_SCALE),
        (gridSize / 2) - (y * GRID_SCALE),
    ];
}

export function getDistance(pos1: GridPosition, pos2: GridPosition): number {
    //  √[(x2 − x1)^2 + (y2 − y1)^2]
    const [x1, y1] = pos1;
    const [x2, y2] = pos2;
    return Math.sqrt(
        Math.abs(
            Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
        )
    );
}

export function getRingThetaByGridPosition(position: GridPosition): number {
    const [x, y] = position;
    const temp = Math.atan2(y, x);
    return temp >= 0 ? temp : temp + (2 * Math.PI);
}

export function getAngleBetweenVectors(pos1: GridPosition, pos2: GridPosition): number {
    const temp = Math.atan2(pos2[1], pos2[0]) - Math.atan2(pos1[1], pos1[0]);
    return temp >= 0 ? temp : temp + (2 * Math.PI);
}
