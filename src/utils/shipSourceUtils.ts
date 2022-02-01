import { ShipSource, IShipSourceData } from '../types/ShipSource';

export const shipSources: Record<ShipSource, IShipSourceData> = {
    [ShipSource.STARTER_SHIP]: {
        name: '初期配布',
        sortValue: 1,
    },
    [ShipSource.TECH_FILE]: {
        name: '技術ファイル',
        sortValue: 2,
    },
    [ShipSource.DOCK_EFFECT]: {
        name: '結合効果',
        sortValue: 3,
    },
    [ShipSource.CITY_TRADE]: {
        name: '都市で購入',
        sortValue: 4,
    },
};

export const translateShipSource = (source: ShipSource): string => {
    if (!shipSources[source]) {
        throw new Error(`Invalid ship source "${source}"`);
    }
    return shipSources[source].name;
}

export const shipSourceToSortValue = (source: ShipSource): number => {
    if (!shipSources[source]) {
        throw new Error(`Invalid ship source "${source}"`);
    }
    return shipSources[source].sortValue;
}
