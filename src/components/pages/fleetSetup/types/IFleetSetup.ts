import { IShipDefinition, ISystemModule } from '../../../../types/ShipDefinition';

export type ReinforcementType = 'self' | 'ally' | 'ally2' | 'ally3';

export interface IFleetSetup {
    key: string;
    name: string;
    ships: IShipSelection[];
    totalCost: number;
    totalReinforcementCount: number;
    maxReinforcement: number;
    maxCost: number;
    myListOnly: boolean;
}

export interface IShipSelection {
    shipDefinition: IShipDefinition;
    carrierCapabilities: ICarrierCapabilities;
    carriedShips: ICarriedShipSelection[];
    moduleSelection: IModuleSelection | null;
    count: number;
    maxCount: number;
    reinforcement: ReinforcementType | null;
    temporary?: boolean;
}

export interface ICarrierCapabilities {
    canCarry: boolean;
    carryUpToLargeFighter: number;
    carryUpToMediumFighter: number;
    carryUpToSmallFighter: number;
    carryCorvette: number;
}

export interface ICarriedShipSelection {
    shipDefinition: IShipDefinition;
    count: number;
    reinforcement: ReinforcementType | null;
    temporary?: boolean;
}

export interface IMinifiedFleetSetup {
    name: string;
    ships: IMinifiedShipSelection[];
    maxReinforcement: number;
    maxCost: number;
    myListOnly: boolean;
}

export interface IMinifiedShipSelection {
    shipId: string;
    usedModules?: string[];
    carriedShips: IMinifiedCarriedShipSelection[];
    count: number;
    reinforcement: ReinforcementType | null;
}

export interface IMinifiedCarriedShipSelection {
    shipId: string;
    count: number;
}

export interface IModuleSelection {
    static: boolean;
    groups: Record<string, Record<string, IModuleUsage>>; // group id, module id
}

export interface IModuleUsage {
    module: ISystemModule;
    usage: 'used' | 'not_used' | 'not_possessed';
}
