import { ShipType } from './ShipType';

export interface ITechFile {
    id: string;
    name: string;
    desciption: string;
    chanceByShipType: Record<ShipType, number>;
    chanceForTechPoint: number;
    ships: string[];
    extends?: string;
}
