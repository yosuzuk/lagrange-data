const renderOrder = {
    axesHelper: 9,
    floadingLabel: 8,
    fleet: 7,
    arrow: 6,
    fixedLabel: 5,
    tileStructure: 4,
    gridHelper: 3,
    orbit: 3,
    regionText: 3,
    region: 2,
    planet: 1,
    mapBorder: 1,
    mapBackground: 1,
    starsBackground: 0,
} as const;

export function getRendeOrder(target: keyof typeof renderOrder): number {
    return renderOrder[target] ?? 0;
}
