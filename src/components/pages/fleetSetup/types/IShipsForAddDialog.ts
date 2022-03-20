import { IShipDefinition } from '../../../../types/ShipDefinition';
import { IFleetSetup, ReinforcementType } from './IFleetSetup';

export interface IShipsForAddDialog {
    fleetSetup: IFleetSetup;
    reinforcement: ReinforcementType | null;
    filter: string | null;
}
