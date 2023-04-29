const renderOrder = {
    axesHelper: 12,
    highLevelCityLabel: 11,
    floadingLabel: 10,
    fleet: 9,
    arrow: 8,
    fixedLabel: 7,
    dockIcon: 6,
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
