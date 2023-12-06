import { Manufacturer } from '../../../types/Manufacturer';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const startSweeper: IShipDefinition[] = [
    {
        id: ShipId.STAR_SWEEPER_A,
        name: 'スタースィーパー級　Ａイオン砲型',
        translatedName: {
            en: 'Star Sweeper - Ion Cannon Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.STAR_SWEEPER_TE_A, ShipId.STAR_SWEEPER_TE_A_S],
        defaultStats: {
            hp: 56320,
            armor: 50,
            shield: 10,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 10192,
            dpmAntiAir: 575,
            dpmSiege: 1721,
        },
    },
    {
        id: ShipId.STAR_SWEEPER_TE_A,
        name: 'スタースィーパー級-TE　Ａイオン砲型',
        translatedName: {
            en: 'Star Sweeper (TE) - Ion Cannon Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.STAR_SWEEPER_A, ShipId.STAR_SWEEPER_TE_A_S],
        defaultStats: {
            hp: 56320,
            armor: 50,
            shield: 10,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 10192,
            dpmAntiAir: 575,
            dpmSiege: 1721,
        },
    },
    {
        id: ShipId.STAR_SWEEPER_TE_A_S,
        name: 'スタースィーパー級-TE　Ａイオン砲型（回収）',
        translatedName: {
            en: 'Star Sweeper (TE) - Ion Cannon Type (salvaged)',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 5,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.STAR_SWEEPER_A, ShipId.STAR_SWEEPER_TE_A],
    },
];
