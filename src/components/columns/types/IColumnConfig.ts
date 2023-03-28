export interface IColumnConfig {
    name: boolean;
    type: boolean;
    row: boolean;
    cost: boolean;
    operationLimit: boolean;
    dpmShip: boolean;
    dpmAntiAir: boolean;
    dpmSiege: boolean;
    hp: boolean;
    armor: boolean;
    shield: boolean;
    speed: boolean;
    warpSpeed: boolean;
    dpmShipPerCommandPoint: boolean;
    dpmAntiAirPerCommandPoint: boolean;
    dpmSiegePerCommandPoint: boolean;
    hpPerCommandPoint: boolean;
    source: boolean;
    manufacturer: boolean;
    researchManufacturer: boolean;
    researchTacticType: boolean;
    researchStrategyType: boolean;
    weight: boolean;
}

export interface IColumnConfigOption {
    columnKey: keyof IColumnConfig;
    name: string;
}
