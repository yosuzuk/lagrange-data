import { ShipDefinition } from '../../../../types/ShipDefinition';

export interface IShipListState {
    possessed: ShipDefinition[];
    wished: ShipDefinition[];
    unwished: ShipDefinition[];
}