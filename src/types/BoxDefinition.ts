import { ShipTag } from './ShipTag';
import { ShipType } from './ShipType';

export interface BoxDefinition {
    id: string;
    name: string;
    chanceByShipType: Record<ShipType, number>;
    ships: string[];
    extends?: string;
}
