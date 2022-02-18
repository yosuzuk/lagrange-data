import { IShipDefinition } from '../../../../types/ShipDefinition';
import { ShipSubType } from '../../../../types/ShipType';

export interface IFleetSetup {
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
}

export interface ICarriedShipSelection {
    shipDefinition: IShipDefinition;
    carrierShipId: string;
    count: number;
}
