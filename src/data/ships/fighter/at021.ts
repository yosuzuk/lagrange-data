import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const typeA: IShipDefinition = {
    id: ShipId.AT021_A,
    name: 'AT021　Ａパルス型',
    translatedName: {
        en: 'AT021 - Pulse Cannon Type',
    },
    type: ShipType.FIGHTER,
    subType: ShipSubType.MEDIUM_FIGHTER,
    cost: 0,
    weight: 10,
    row: ShipRow.NONE,
    operationLimit: 15,
    source: ShipSource.TECH_FILE,
    manufacturer: Manufacturer.DAWN_ACCORD,
    subModelIds: [ShipId.AT021_B, ShipId.AT021_C],
    defaultStats: {
        hp: 4920,
        armor: 2,
        shield: 0,
        speed: 3000,
        warpSpeed: 15000,
        outboundTime: 8,
        inboundTime: 4,
        dpmShip: 1482,
        dpmAntiAir: 888,
        dpmSiege: 42,
    },
    modules: [
        modules.static({
            id: 'w1',
            name: 'パルス機関砲システム',
            translatedName: {
                en: 'Pulse Cannon System',
            },
            description: '対小型武装',
            mainSystem: true,
            // TODO skills
            skillSlots: 5,
            dpmShip: 494,
            dpmAntiAir: 296,
            dpmSiege: 14,
            parts: [
                {
                    text: [
                        'SP-1900型　大口径パルス機関砲',
                        '対小型：',
                        '・直射、エネルギー、対艦：494、対空：296、攻城：14',
                    ],
                },
            ],
        }),
        modules.commandSystem({
            // TODO skills
            skillSlots: 1,
        }),
        modules.armorSystem({
            // TODO skills
            skillSlots: 2,
        }),
        modules.propulsionSystem({
            // TODO skills
            skillSlots: 3,
        }),
        modules.energySystem({
            name: '機載エネルギーシステム',
            translatedName: {
                en: 'Airborne Energy System',
            },
            // TODO skills
            skillSlots: 2,
        }),
    ],
};

const typeB: IShipDefinition = {
    id: ShipId.AT021_B,
    name: 'AT021　Ｂ干渉型',
    translatedName: {
        en: 'AT021 - Interference Type',
    },
    type: ShipType.FIGHTER,
    subType: ShipSubType.MEDIUM_FIGHTER,
    cost: 0,
    weight: 10,
    row: ShipRow.NONE,
    operationLimit: 15,
    source: ShipSource.TECH_FILE,
    manufacturer: Manufacturer.DAWN_ACCORD,
    baseModelId: ShipId.AT021_A,
    defaultStats: {
        hp: 4920,
        armor: 0,
        shield: 0,
        speed: 3000,
        warpSpeed: 15000,
        outboundTime: 5,
        inboundTime: 5,
        dpmShip: 843,
        dpmAntiAir: 675,
        dpmSiege: 96,
    },
    modules: [
        modules.static({
            id: 'w1',
            name: '機載武器システム',
            translatedName: {
                en: 'Airborne Weapon System',
            },
            description: '対小型武装',
            mainSystem: true,
            // TODO skills
            skillSlots: 4,
            dpmShip: 281,
            dpmAntiAir: 225,
            dpmSiege: 32,
            parts: [
                {
                    text: [
                        'SG-1300型　速射機関砲',
                        '対小型：',
                        '・直射、実弾、対艦：281、対空：225、攻城：32',
                    ],
                },
            ],
        }),
        modules.static({
            id: 'sp1',
            name: '電子干渉システム',
            translatedName: {
                en: 'Electronic Jamming System',
            },
            // TODO skills
            skillSlots: 7,
        }),
        modules.commandSystem(),
        modules.armorSystem({
            // TODO skills
            skillSlots: 2,
        }),
        modules.propulsionSystem({
            // TODO skills
            skillSlots: 3,
        }),
    ],
};

const typeC: IShipDefinition = {
    id: ShipId.AT021_C,
    name: 'AT021　Ｃ多機能型',
    translatedName: {
        en: 'AT021 - Multi-Role Type',
    },
    type: ShipType.FIGHTER,
    subType: ShipSubType.MEDIUM_FIGHTER,
    cost: 0,
    weight: 5,
    row: ShipRow.NONE,
    operationLimit: 15,
    source: ShipSource.TECH_FILE,
    manufacturer: Manufacturer.DAWN_ACCORD,
    baseModelId: ShipId.AT021_A,
    defaultStats: {
        hp: 4920,
        armor: 0,
        shield: 0,
        speed: 3000,
        warpSpeed: 15000,
        outboundTime: 9,
        inboundTime: 5,
        dpmShip: 3366,
        dpmAntiAir: 0,
        dpmSiege: 387,
    },
    modules: [
        modules.static({
            id: 'w1',
            name: '精密攻撃システム',
            translatedName: {
                en: 'Precision Strike System',
            },
            description: '対大型武装',
            mainSystem: true,
            // TODO skills
            skillSlots: 6,
            dpmShip: 540,
            dpmAntiAir: 0,
            dpmSiege: 57,
            parts: [
                {
                    text: [
                        'SM-1x50C/D型　ミサイルランチャー',
                        '対大型：',
                        '・投射、実弾、対艦：540、攻城：57',
                        'システム破壊：',
                        '・指令システム（中）',
                        '・武器システム（中）',
                    ],
                },
            ],
        }),
        modules.static({
            id: 'w2',
            name: '機載誘導システム',
            translatedName: {
                en: 'Airborne Guiding System',
            },
            description: '対大型武装',
            // TODO skills
            skillSlots: 3,
            dpmShip: 582,
            dpmAntiAir: 0,
            dpmSiege: 72,
            parts: [
                {
                    text: [
                        'SM-1x3000型　ミサイルランチャー',
                        '対大型：',
                        '・投射、実弾、対艦：582、攻城：72',
                    ],
                },
            ],
        }),
        modules.commandSystem({
            // TODO skills
            skillSlots: 1,
        }),
        modules.armorSystem({
            // TODO skills
            skillSlots: 2,
        }),
        modules.propulsionSystem({
            // TODO skills
            skillSlots: 3,
        }),
    ],
};

export const at021: IShipDefinition[] = [
    {
        ...typeA,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
    {
        ...typeA,
        id: ShipId.AT021_A_TE,
        name: 'AT021-TE　Ａパルス型',
        translatedName: {
            en: 'AT021-TE - Pulse Cannon Type',
        },
        operationLimit: 10,
        subModelIds: undefined,
        baseModelId: undefined,
        source: ShipSource.CITY_TRADE,
    },
    {
        ...typeB,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
    {
        ...typeB,
        id: ShipId.AT021_B_TE,
        name: 'AT021-TE　Ｂ干渉型',
        translatedName: {
            en: 'AT021-TE - Interference Type',
        },
        operationLimit: 10,
        subModelIds: undefined,
        baseModelId: undefined,
        source: ShipSource.CITY_TRADE,
    },
    {
        ...typeC,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
    },
    {
        ...typeC,
        id: ShipId.AT021_C_TE,
        name: 'AT021-TE　Ｃ多機能型',
        translatedName: {
            en: 'AT021-TE - Multi-Role Type',
        },
        operationLimit: 10,
        subModelIds: undefined,
        baseModelId: undefined,
        source: ShipSource.CITY_TRADE,
    },
];
