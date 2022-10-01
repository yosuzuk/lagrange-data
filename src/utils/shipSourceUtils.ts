import { t } from '../i18n';
import { ShipSource, IShipSourceData } from '../types/ShipSource';

export const shipSources: Record<ShipSource, IShipSourceData> = {
    [ShipSource.STARTER_SHIP]: {
        name: t('acquirableThrough.starterTechFile'),
        sortValue: 1,
    },
    [ShipSource.TECH_FILE]: {
        name: t('label.techFile'),
        sortValue: 2,
    },
    [ShipSource.DOCK_EFFECT]: {
        name: t('acquirableThrough.dockingEffect'),
        sortValue: 3,
    },
    [ShipSource.CITY_TRADE]: {
        name: t('acquirableThrough.cityTrade'),
        sortValue: 4,
    },
    [ShipSource.SALVAGE]: {
        name: t('acquirableThrough.salvage'),
        sortValue: 5,
    },
    [ShipSource.UNKNOWN]: {
        name: t('acquirableThrough.unknown'),
        sortValue: 5,
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
