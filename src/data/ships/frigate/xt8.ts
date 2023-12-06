import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const xt8: IShipDefinition[] = [
    {
        id: ShipId.XT_8_A,
        name: 'XT-8級　Ａ攻城型',
        translatedName: {
            en: 'XT-8 - Siege Type',
        },
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_8_B],
        defaultStats: {
            hp: 7070,
            armor: 5,
            shield: 0,
            speed: 1000,
            warpSpeed: 5000,
            dpmShip: 246,
            dpmAntiAir: 54,
            dpmSiege: 1530,
        },
    },
    {
        id: ShipId.XT_8_B,
        name: 'XT-8級　Ｂミサイル型',
        translatedName: {
            en: 'XT-8 - Missile Type',
        },
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_8_A],
        defaultStats: {
            hp: 7070,
            armor: 5,
            shield: 0,
            speed: 1000,
            warpSpeed: 5000,
            dpmShip: 2950,
            dpmAntiAir: 438,
            dpmSiege: 18,
        },
    },
];
