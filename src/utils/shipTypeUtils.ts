import { ShipType, ShipTypeData, ShipSubType } from '../types/ShipType';

export const shipTypes: Record<ShipType, ShipTypeData> = {
    [ShipType.FRIGATE]: {
        name: 'フリゲート',
        sortValue: 5,
    },
    [ShipType.DESTROYER]: {
        name: '駆逐艦',
        sortValue: 4,
    },
    [ShipType.CRUISER]: {
        name: '巡洋艦',
        sortValue: 3,
    },
    [ShipType.BATTLE_CRUISER]: {
        name: '巡洋戦艦',
        sortValue: 2,
    },
    [ShipType.CARRIER]: {
        name: '航空母艦',
        sortValue: 1,
    },
    [ShipType.CORVETTE]: {
        name: '護送艦',
        sortValue: 6,
    },
    [ShipType.FIGHTER]: {
        name: '戦闘機',
        subTypeName: {
            [ShipSubType.SMALL_FIGHTER]: '小型戦闘機',
            [ShipSubType.MEDIUM_FIGHTER]: '中量級戦闘機',
            [ShipSubType.LARGE_FIGHTER]: '大型戦闘機',
        },
        sortValue: 7,
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
