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
    modules.static({
        id: 'w1',
        name: 'MK2-ロケット発射システム「チリングブリーズ」',
        translatedName: {
            en: 'MK2 "Chilling Breeze" Rocket Launching System',
        },
        description: '対小型武装',
        defaultModule: true,
        // TODO skills
        skillSlots: 6,
        dpmShip: 13403,
        dpmAntiAir: 1514,
        dpmSiege: 1349,
    }),
    modules.static({
        id: 'w2',
        name: '艦首電磁加速砲システム',
        translatedName: {
            en: 'Bow Railgun System',
        },
        description: '対大型武装',
        // TODO skills
        skillSlots: 5,
        dpmShip: 5966,
        dpmAntiAir: 0,
        dpmSiege: 540,
    }),
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
        ],
        // TODO skills
        skillSlots: 1,
    }),
    modules.armorSystem({
        // TODO skills
        skillSlots: 6,
    }),
    modules.propulsionSystem({
        // TODO skills
        skillSlots: 3,
    }),
    modules.energySystem(),
];

const defaultStats: IDefaultShipStats = {
    hp: 136510,
    armor: 90,
    shield: 15,
    speed: 250,
    warpSpeed: 1250,
    dpmShip: 19369,
    dpmAntiAir: 1514,
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
        translatedName: {
            en: 'Indefatigable (TE) (salvaged)',
        },
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
