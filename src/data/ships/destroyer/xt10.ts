import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const xt10: IShipDefinition[] = [
    {
        id: ShipId.XT_10_A,
        name: 'XT-10級　Ａ魚雷型',
        translatedName: {
            en: 'XT-10 - Torpedo Type',
        },
        type: ShipType.DESTROYER,
        cost: 10,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        defaultStats: {
            hp: 25650,
            armor: 12,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 5659,
            dpmAntiAir: 806,
            dpmSiege: 80,
        },
    },
];
