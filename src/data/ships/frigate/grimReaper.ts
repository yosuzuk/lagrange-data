import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const grimReaper: IShipDefinition[] = [
    {
        id: ShipId.GRIM_REAPER_A,
        name: 'グリムリーパー級　Ａ一般型',
        translatedName: {
            en: 'Grim Reaper - Generic Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        defaultStats: {
            hp: 12540,
            armor: 5,
            shield: 0,
            speed: 1000,
            warpSpeed: 1200,
            dpmShip: 3150,
            dpmAntiAir: 72,
            dpmSiege: 2017,
        },
    },
];
