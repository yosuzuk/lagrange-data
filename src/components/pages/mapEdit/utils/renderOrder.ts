const renderOrder = {
    axesHelper: 14,
    highLevelCityLabel: 13,
    floadingLabel: 12,
    fleet: 11,
    arrow: 10,
    fixedLabel: 9,
    dockIcon: 8,
    areaLines: 7,
    area: 6,
    shapeBorder: 5,
    shapeBackground: 4,
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
