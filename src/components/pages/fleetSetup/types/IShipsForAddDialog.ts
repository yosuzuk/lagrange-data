import { IShipDefinition } from '../../../../types/ShipDefinition';
import { ReinforcementType } from './IFleetSetup';

export interface IShipsForAddDialog {
    ships: Record<string, IShipForAddDialog>;
    reinforcement: ReinforcementType | null;
}

export interface IShipForAddDialog {
    shipDefinition: IShipDefinition;
    count: number;
    maxCount: number;
}
