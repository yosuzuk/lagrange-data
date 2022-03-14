import { IShipSelection } from './IFleetSetup';

export interface IGroupedShips {
    groupedBy: string;
    groups: IShipGroup[];
}

export interface IShipGroup {
    id: string;
    name: string;
    ships: IShipSelection[];
}
