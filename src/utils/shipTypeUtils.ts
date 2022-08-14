import { t } from '../i18n';
import { ShipType, IShipTypeData, ShipSubType } from '../types/ShipType';

export const shipTypes: Record<ShipType, IShipTypeData> = {
    [ShipType.FRIGATE]: {
        name: t('shipType.frigate'),
        sortValue: 6,
    },
    [ShipType.DESTROYER]: {
        name: t('shipType.destroyer'),
        sortValue: 5,
    },
    [ShipType.CRUISER]: {
        name: t('shipType.cruiser'),
        sortValue: 4,
    },
    [ShipType.BATTLE_CRUISER]: {
        name: t('shipType.battleCruiser'),
        sortValue: 3,
    },
    [ShipType.AUXILIARY]: {
        name: t('shipType.auxiliary'),
        sortValue: 2,
    },
    [ShipType.CARRIER]: {
        name: t('shipType.carrier'),
        sortValue: 1,
    },
    [ShipType.CORVETTE]: {
        name: t('shipType.corvette'),
        sortValue: 7,
    },
    [ShipType.FIGHTER]: {
        name: t('shipType.fighter'),
        subTypeName: {
            [ShipSubType.SMALL_FIGHTER]: t('shipType.smallFighter'),
            [ShipSubType.MEDIUM_FIGHTER]: t('shipType.mediumFighter'),
            [ShipSubType.LARGE_FIGHTER]: t('shipType.largeFighter'),
        },
        sortValue: 8,
        subTypeSortValue: {
            [ShipSubType.SMALL_FIGHTER]: 9,
            [ShipSubType.MEDIUM_FIGHTER]: 8,
            [ShipSubType.LARGE_FIGHTER]: 7,
        },
    },
};

export const translateShipType = (type: ShipType, subType?: ShipSubType) => {
    const { name, subTypeName } = shipTypes[type];
    return typeof subType !== 'undefined' ? subTypeName?.[subType] ?? name : name;
}

export const shipTypeToSortValue = (type: ShipType, subType?: ShipSubType) => {
    const { sortValue, subTypeSortValue } = shipTypes[type];
    return typeof subType !== 'undefined' ? subTypeSortValue?.[subType] ?? sortValue : sortValue;
}
