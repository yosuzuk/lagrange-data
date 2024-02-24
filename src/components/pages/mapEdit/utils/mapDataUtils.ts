import { IMapData } from '../types/IMapContent';

export function joinMapData(mapDataList: IMapData[]): IMapData {
    return {
        name: mapDataList.find(x => !!x.name)?.name ?? null,
        serverName: mapDataList.find(x => !!x.serverName)?.serverName ?? null,
        size: mapDataList.find(x => Number.isFinite(x.size))?.size ?? null,
        marker: mapDataList.flatMap(x => x.marker),
        regions: mapDataList.flatMap(x => x.regions),
        planets: mapDataList.flatMap(x => x.planets),
        stations: mapDataList.flatMap(x => x.stations),
        shapes: mapDataList.flatMap(x => x.shapes),
        areas: mapDataList.flatMap(x => x.areas),
        hives: mapDataList.flatMap(x => x.hives),
        bases: mapDataList.flatMap(x => x.bases),
        outposts: mapDataList.flatMap(x => x.outposts),
        platforms: mapDataList.flatMap(x => x.platforms),
        overlayText: mapDataList.flatMap(x => x.overlayText),
    };
}
