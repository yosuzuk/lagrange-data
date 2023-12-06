import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const rager: IShipDefinition[] = [
    {
        id: ShipId.RAGER_A,
        name: 'レイジャー級　Ａ一般型',
        translatedName: {
            en: 'Rager - Generic Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.RAGER_B, ShipId.RAGER_TE_B_S],
        defaultStats: {
            hp: 10530,
            armor: 5,
            shield: 0,
            speed: 1040,
            warpSpeed: 5200,
            dpmShip: 3150,
            dpmAntiAir: 461,
            dpmSiege: 333,
        },
    },
    {
        id: ShipId.RAGER_B,
        name: 'レイジャー級　Ｂ魚雷型',
        translatedName: {
            en: 'Rager - Torpedo Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.RAGER_A, ShipId.RAGER_TE_B_S],
        defaultStats: {
            hp: 10530,
            armor: 5,
            shield: 0,
            speed: 950,
            warpSpeed: 4750,
            dpmShip: 4830,
            dpmAntiAir: 225,
            dpmSiege: 762,
        },
    },
    {
        id: ShipId.RAGER_TE_B_S,
        name: 'レイジャー級-TE　Ａ魚雷型（回収）',
        translatedName: {
            en: 'Rager (TE) - Torpedo Type (salvaged)',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.RAGER_A, ShipId.RAGER_B],
    },
];
