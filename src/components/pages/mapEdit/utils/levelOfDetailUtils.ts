import { IZoomLevel } from '../types/IZoomLevel';

export interface ILodVisibility {
    name: string;
    fromDistance: number;
    untilDistance: number;
}

export interface ILodOpacity {
    name: string;
    fromDistance: number;
    untilDistance: number;
    opacity: number;
}

export const MIN_CAMERA_DISTANCE = 5;
export const MAX_CAMERA_DISTANCE = 1500;

const lodVisibilities: ILodVisibility[] = [
    {
        name: 'zoneBackground',
        fromDistance: 50,
        untilDistance: MAX_CAMERA_DISTANCE,
    },
    {
        name: 'zoneLabel',
        fromDistance: 50,
        untilDistance: MAX_CAMERA_DISTANCE,
    },
    {
        name: 'gameGrid',
        fromDistance: 0,
        untilDistance: 35,
    },
    {
        name: 'planetLabel',
        fromDistance: 0,
        untilDistance: 200,
    },
    {
        name: 'subPlanetOrbit',
        fromDistance: 0,
        untilDistance: 200,
    },
    {
        name: 'markerLabel',
        fromDistance: 0,
        untilDistance: 200,
    },
    {
        name: 'stationLabel',
        fromDistance: 0,
        untilDistance: 15,
    },
    {
        name: 'stationCone',
        fromDistance: 0,
        untilDistance: 25,
    },
    {
        name: 'dockIcon',
        fromDistance: 15,
        untilDistance: 50,
    },
    {
        name: 'dockCone',
        fromDistance: 0,
        untilDistance: 15,
    },
    {
        name: 'cityIcon',
        fromDistance: 0,
        untilDistance: 1000,
    },
    {
        name: 'subCityIcon',
        fromDistance: 0,
        untilDistance: 200,
    },
    {
        name: 'subCityLabel',
        fromDistance: 0,
        untilDistance: 50,
    },
    {
        name: 'cityLabel',
        fromDistance: 0,
        untilDistance: 200,
    },
    {
        name: 'cityLabel7up',
        fromDistance: 0,
        untilDistance: 1000,
    },
    {
        name: 'cityLevel',
        fromDistance: 0,
        untilDistance: 200,
    },
    {
        name: 'defaultArea',
        fromDistance: 0,
        untilDistance: 500,
    },
    {
        name: 'defaultAreaDetailedEdge',
        fromDistance: 0,
        untilDistance: 15,
    },
    {
        name: 'defaultAreaEdge',
        fromDistance: 15,
        untilDistance: 100,
    },
    {
        name: 'cityArea',
        fromDistance: 0,
        untilDistance: 200,
    },
    {
        name: 'cityAreaDetailedEdge',
        fromDistance: 0,
        untilDistance: 15,
    },
    {
        name: 'cityAreaEdge',
        fromDistance: 15,
        untilDistance: 200,
    },
];

const lodOpacities: ILodOpacity[] = [
    {
        name: 'zoneBackground',
        fromDistance: 0,
        untilDistance: 50,
        opacity: 0,
    },
    {
        name: 'zoneBackground',
        fromDistance: 50,
        untilDistance: 200,
        opacity: 0.1,
    },
    {
        name: 'zoneBackground',
        fromDistance: 200,
        untilDistance: MAX_CAMERA_DISTANCE,
        opacity: 0.4,
    },
    {
        name: 'areaBackground',
        fromDistance: 0,
        untilDistance: 15,
        opacity: 0.03,
    },
    {
        name: 'areaBackground',
        fromDistance: 15,
        untilDistance: 100,
        opacity: 0.2,
    },
    {
        name: 'areaBackground',
        fromDistance: 100,
        untilDistance: 500,
        opacity: 0.8,
    },
    {
        name: 'areaBackground',
        fromDistance: 500,
        untilDistance: MAX_CAMERA_DISTANCE,
        opacity: 0,
    },
    {
        name: 'cityAreaBackground',
        fromDistance: 0,
        untilDistance: 15,
        opacity: 0.03,
    },
    {
        name: 'cityAreaBackground',
        fromDistance: 15,
        untilDistance: 200,
        opacity: 0.2,
    },
    {
        name: 'cityAreaBackground',
        fromDistance: 200,
        untilDistance: MAX_CAMERA_DISTANCE,
        opacity: 0,
    },
];

export function createZoomLevels(): IZoomLevel[] {
    const lodVisibilitiesMap = groupByName(lodVisibilities);
    const lodOpacitiesMap = groupByName(lodOpacities);

    const getLodVisibility = (name: string, distance: number): boolean => {
        return lodVisibilitiesMap[name]?.some(lodVisibility => {
            return lodVisibility.name === name && distance >= lodVisibility.fromDistance && distance < lodVisibility.untilDistance;
        }) ?? false;
    };

    const getLodOpacity = (name: string, distance: number): number => {
        return lodOpacitiesMap[name]?.find(lodOpacity => {
            return lodOpacity.name === name && distance >= lodOpacity.fromDistance && distance < lodOpacity.untilDistance;
        })?.opacity ?? 0;
    };

    const allDistances = [
        ...lodVisibilities.map(x => x.fromDistance),
        ...lodVisibilities.map(x => x.untilDistance),
        ...lodOpacities.map(x => x.fromDistance),
        ...lodOpacities.map(x => x.untilDistance),
    ].sort((a, b) => a - b).reduce((acc: number[], next: number) => {
        return (acc.length > 1 && acc.at(-1)) === next ? acc : [...acc, next];
    }, [] as number[]);

    const zoomLevels: IZoomLevel[] = [];

    for (let i = 0; i < allDistances.length - 1; i++) {
        zoomLevels.push({
            fromDistance: allDistances[i],
            untilDistance: allDistances[i + 1],
            visibility: lodVisibilities.reduce((acc, next) => {
                return {
                    ...acc,
                    [next.name]: getLodVisibility(next.name, allDistances[i]),
                };
            }, {} as Record<string, boolean>),
            opacity: lodOpacities.reduce((acc, next) => {
                return {
                    ...acc,
                    [next.name]: getLodOpacity(next.name, allDistances[i]),
                };
            }, {} as Record<string, number>),
        });
    }

    return zoomLevels;
}

interface IWithName {
    name: string;
}

function groupByName<T extends IWithName>(list: T[]): Record<string, T[]> {
    return list.reduce((acc: Record<string, T[]>, next: T) => {
        return {
            ...acc,
            [next.name]: [
                ...(acc[next.name] ?? []),
                next,
            ],
        };
    }, {} as Record<string, T[]>);
}
