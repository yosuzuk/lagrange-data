import { IFleetSetup, IShipSelection, ReinforcementType } from './IFleetSetup';

export interface IDialogDataForShips {
    fleetSetup: IFleetSetup;
    reinforcement: ReinforcementType | null;
    filter: string | null;
}

export interface IDialogDataForCarriedShips {
    carrierShipId: string;
    reinforcement: ReinforcementType | null;
    shipSelections: IShipSelection[];
    filter: string | null;
}
