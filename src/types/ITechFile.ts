import { ShipType } from './ShipType';

export interface ITechFile {
    id: string;
    name: string;
    translatedName?: Record<string, string>;
    desciption: string;
    translatedDescription?: Record<string, string>;
    chanceByShipType: Record<ShipType, number>;
    chanceForTechPoint: number;
    ships: string[];
    extends?: string;
}
