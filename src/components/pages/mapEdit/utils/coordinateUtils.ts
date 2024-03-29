import { GamePosition, GridPosition } from '../types/Coordinates';

const GRID_SCALE = 0.1;

export function translateSizeToGrid(x: number): number {
    return x * GRID_SCALE;
}

export function normalizePosition(gamePosition: GamePosition | undefined, gridPosition: GridPosition | undefined, gridSize: number): GridPosition {
    return gridPosition ?? (gamePosition ? toGridPosition(gamePosition, gridSize) : [0, 0]);
}

export function parseGamePosition(gamePosition: GamePosition): [number, number] {
    const x = Array.isArray(gamePosition) ? gamePosition[0] : Number(`${gamePosition}`.split(',')[0].replace('(', ''));
    const y = Array.isArray(gamePosition) ? gamePosition[1] : Number(`${gamePosition}`.split(',')[1].replace(')', ''));
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        throw new Error(`Invalid in-game coordinates: ${JSON.stringify(gamePosition)}`);
    }
    return [x, y];
}

export function toGridPosition(gamePosition: GamePosition, gridSize: number): GridPosition {
    const [x, y] = parseGamePosition(gamePosition);

    // 1000,3000 => -400,-100

    return [
        (x * GRID_SCALE) - (gridSize / 2),
        (y * GRID_SCALE) - (gridSize / 2),
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
    return adaptRadiansToFullCircle(Math.atan2(y, x));
}

export function getAngleBetweenVectors(pos1: GridPosition, pos2: GridPosition): number {
    return adaptRadiansToFullCircle(Math.atan2(pos2[1], pos2[0]) - Math.atan2(pos1[1], pos1[0]));
}

export function adaptRadiansToFullCircle(value: number): number {
    return value >= 0 ? value : value + (2 * Math.PI);
}

export function getAngleBetweenAngles(angleRad1: number, angleRad2: number): number {
    const temp = angleRad2 - angleRad1;
    return angleRad1 + ((temp >= 0 ? temp : temp + (2 * Math.PI)) / 2);
}

export function getGridPositionByAngleAndRadius(angle: number, radius: number): GridPosition {
    return [
        Math.round(radius * Math.cos(angle)),
        Math.round(radius * Math.sin(angle)),
    ] as GridPosition;
}

export function snapToGrid(position: GridPosition): GridPosition {
    const [x, y] = position;
    const gameX = (x / GRID_SCALE);
    const gameY = (y / GRID_SCALE);
    const snappedGameX = Math.round(gameX / 10) * 10;
    const snappedGameY = Math.round(gameY / 10) * 10;
    return [
        snappedGameX * GRID_SCALE,
        snappedGameY * GRID_SCALE,
    ];
}

export function snapGamePositionToGridCellCenter(position: GamePosition): [GamePosition, number, number] {
    const [x, y] = parseGamePosition(position);
    // snap to grid cell center
    // e.g. 1234 => 123,4 => 123 => 1230 => 1235
    // e.g. 1239 => 123,9 => 123 => 1230 => 1235
    const snappedX = Math.floor(x * 0.1) * 10 + 5;
    const snappedY = Math.floor(y * 0.1) * 10 + 5;
    return [`(${snappedX},${snappedY})`, snappedX, snappedY];
}

export function snapGamePositionToGridCellCorner(position: GamePosition): [GamePosition, number, number] {
    const [x, y] = parseGamePosition(position);
    // snap to grid cell corner
    // e.g. 1234 => 123,4 => 123 => 1230
    // e.g. 1239 => 123,9 => 124 => 1240
    const snappedX = Math.round(x * 0.1) * 10;
    const snappedY = Math.round(y * 0.1) * 10;
    return [`(${snappedX},${snappedY})`, snappedX, snappedY];
}

export function formatGamePosition(position: GamePosition): string {
    if (Array.isArray(position)) {
        return `(${(position as number[]).join(',')})`;
    }
    return `${position}`;
}
