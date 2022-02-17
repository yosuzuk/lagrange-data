import { IShipDefinition } from '../../../../types/ShipDefinition';

export interface IShipListState {
    possessed: IShipDefinition[];
    wished: IShipDefinition[];
    unwishedByUser: IShipDefinition[];
    unwishedByData: IShipDefinition[];
}
