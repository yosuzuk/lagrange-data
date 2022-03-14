import { IShipDefinition } from '../../../../types/ShipDefinition';
import { ReinforcementType } from './IFleetSetup';

export interface IShipsForAddDialog {
    ships: IShipForAddDialog[];
    reinforcement: ReinforcementType | null;
    remainingCount: number | null;
    filter: string | null;
}

export interface IShipForAddDialog {
    shipDefinition: IShipDefinition;
    count: number;
    maxCount: number;
}
