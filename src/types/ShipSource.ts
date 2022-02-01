export enum ShipSource {
    STARTER_SHIP,
    TECH_FILE,
    CITY_TRADE,
    DOCK_EFFECT,
}

export interface IShipSourceData {
    name: string;
    sortValue: number;
}
