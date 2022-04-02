export interface IColumnConfig {
    name: boolean;
    type: boolean;
    row: boolean;
    cost: boolean;
    operationLimit: boolean;
    source: boolean;
    manufacturer: boolean;
    researchManufacturer: boolean;
    researchStrategyType: boolean;
    researchTacticType: boolean;
    weight: boolean;
}

export interface IColumnConfigOption {
    columnKey: keyof IColumnConfig;
    name: string;
}
