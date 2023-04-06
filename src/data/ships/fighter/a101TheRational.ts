import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const a101TheRationalTe: IShipDefinition[] = [
    {
        id: ShipId.A101_THE_RATIONAL_TE,
        name: 'A101ザラショナル-TE',
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 0,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        defaultStats: {
            hp: 4050,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 2169,
            dpmAntiAir: 690,
            dpmSiege: 180,
        },
    },
];
