import { ShipType } from '../../../../types/ShipType';

export interface ITechFileChances {
    shipTypeChances: IShipTypeChance[];
    blueprintChance: number;
    wishedBlueprintChance: number;
    unwishedBlueprintChance: number;
    moduleChance: number;
    baseTechPointChance: number;
    techOrResearchPointChance: number;
}

export interface IShipTypeChance {
    shipType: ShipType;
    originalChance: number;
    blueprintChance: number;
    shipChances: IShipChance[];
    hasModules: boolean;
    moduleChance: number;
}

export interface IShipChance {
    id: string;
    name: string;
    weight: number;
    baseChance: number;
    baseChanceTooltip: string[];
    blueprintChance: number;
    blueprintChanceTooltip: string[];
    moduleChance: number;
    moduleChanceTooltip: string[];
}
