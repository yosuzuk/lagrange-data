import { IShipDefinition } from '../../../../types/ShipDefinition';

export type ReinforcementType = 'self' | 'ally';

export interface IFleetSetup {
    key: string;
    name: string;
    ships: IShipSelection[];
}

export interface IShipSelection {
    shipDefinition: IShipDefinition;
    carryUpToLargeFighter: number;
    carryUpToMediumFighter: number;
    carryUpToSmallFighter: number;
    carryCorvette: number;
    carriedShips: ICarriedShipSelection[];
    count: number;
    reinforcement: ReinforcementType | null;
}

export interface ICarriedShipSelection {
    shipDefinition: IShipDefinition;
    count: number;
    reinforcement: ReinforcementType | null;
}

export interface IMinifiedFleetSetup {
    name: string;
    ships: IMinifiedShipSelection[];
}

export interface IMinifiedShipSelection {
    shipId: string;
    carriedShips: IMinifiedCarriedShipSelection[];
    count: number;
    reinforcement: ReinforcementType | null;
}

export interface IMinifiedCarriedShipSelection {
    shipId: string;
    count: number;
}
