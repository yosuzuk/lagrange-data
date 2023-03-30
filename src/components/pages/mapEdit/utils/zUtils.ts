const Z_SCALE = 0.5;

const zLevels = {
    fleet: 3,
    arrow: 2,
    tileStructure: 1,
    axesHelper: 0,
    gridHelper: 0,
    planet: 0,
    orbit: 0,
    zone: -1,
    mapBackground: -2,
} as const;

export function getZ(target: keyof typeof zLevels): number {
    return zLevels[target] * Z_SCALE;
}
