export interface IColumnConfig {
    name: boolean;
    type: boolean;
    row: boolean;
    cost: boolean;
    operationLimit: boolean;
    source: boolean;
    weight: boolean;
}

export interface IColumnConfigOption {
    columnKey: keyof IColumnConfig;
    name: string;
}