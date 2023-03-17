import { flagshipEffect } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const b1: ISystemModule = {
    id: 'B1',
    name: '護送艦ドック',
    translatedName: {
        en: 'Corvette Dock',
    },
    category: 'B',
    categoryNumber: 1,
    // carryCorvette: number; // TODO find out
    // skillSlots?: number; // TODO find out
};

const b2: ISystemModule = {
    id: 'B2',
    name: '通常砲システム',
    translatedName: {
        en: 'Generic Battery System',
    },
    category: 'B',
    categoryNumber: 2,
    // carryCorvette: number; // TODO find out
    // skillSlots?: number; // TODO find out
    dpmShip: 3000,
    dpmAntiAir: 360,
    dpmSiege: 90,
};

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
        ],
        // TODO skill
        skillSlots: 1,
    }),
    modules.armorSystem({
        // TODO skill
        skillSlots: 6,
    }),
    modules.propulsionSystem({
        // TODO skill
        skillSlots: 3,
    }),
];

const defaultStats: IDefaultShipStats = {
    hp: 121350,
    armor: 90,
    shield: 15,
    speed: 250,
    warpSpeed: 1250,
    dpmShip: 19996,
    dpmAntiAir: 1701,
    dpmSiege: 1889,
};

export const indefatigable: IShipDefinition[] = [
    {
        id: ShipId.INDEFATIGABLE,
        name: 'ルドゥタブル級',
        translatedName: {
            en: 'Indefatigable',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 30,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 4,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.INDEFATIGABLE_TE_S],
        modules: [
            b1, b2,
            ...staticModules,
        ],
        defaultStats,
    },
    {
        id: ShipId.INDEFATIGABLE_TE_S,
        name: 'ルドゥタブル級-TE（回収）',
        type: ShipType.BATTLE_CRUISER,
        cost: 30,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.INDEFATIGABLE],
        modules: [
            b1, b2,
            ...staticModules,
        ],
        defaultStats,
    },
];
