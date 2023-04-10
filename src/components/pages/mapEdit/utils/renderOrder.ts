const renderOrder = {
    axesHelper: 11,
    highLevelCityLabel: 10,
    floadingLabel: 9,
    fleet: 8,
    arrow: 7,
    fixedLabel: 6,
    areaLines: 5,
    area: 4,
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
