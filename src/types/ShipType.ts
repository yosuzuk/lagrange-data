export enum ShipType {
    FRIGATE = 'frigate',
    DESTROYER = 'destroyer',
    CRUISER = 'cruiser',
    BATTLE_CRUISER = 'battleCruiser',
    CARRIER = 'carrier',
    CORVETTE = 'corvette',
    FIGHTER = 'fighter',
}

export enum ShipSubType {
    SMALL_FIGHTER = 'smallFighter',
    MEDIUM_FIGHTER = 'mediumFighter',
    LARGE_FIGHTER = 'largeFighter',
}

export interface IShipTypeData {
    name: string;
    subTypeName?: Record<ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER, string>;
    sortValue: number;
    subTypeSortValue?: Record<ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER, number>;
}
