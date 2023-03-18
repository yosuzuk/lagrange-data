import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '「ホワイトフラッシュ」総合武器庫',
    translatedName: {
        en: 'White Flashing Integrated Armory',
    },
    description: '対大型＆小型艦武装',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseHitRate().withPercentageValue(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.increaseSystemHp().withPercentageValue(35),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'CI-600T型　重イオン砲',
                '対大型艦：',
                '・直射、エネルギー、対艦：10800、攻城：1620',
                'CG-2220型　通常2連砲',
                '対小型艦：',
                '・直射、実弾、対艦：5760、対空：1152、攻城：288',
            ],
        },
    ],
    dpmShip: 16560,
    dpmAntiAir: 1152,
    dpmSiege: 1908,
};

const m2: ISystemModule = {
    id: 'M2',
    name: '「ホワイトフラッシュ」総合武器庫',
    translatedName: {
        en: 'White Flashing Integrated Armory',
    },
    category: 'M',
    categoryNumber: 2,
    mainSystem: true,
    // skills: [],
    skillSlots: 5,
    parts: [
        {
            text: [
                'CG-11058型　通常砲',
                '対空：',
                '・直射、実弾、対艦：1800、対空：1080、攻城：90',
                'CR-1650型　電磁加速砲',
                '対大型：',
                '・直射、実弾、対艦：12857、攻城：2185',
            ],
        },
    ],
    dpmShip: 14657,
    dpmAntiAir: 1080,
    dpmSiege: 2275,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '総合艦載機搭載プラットフォーム',
    translatedName: {
        en: 'Integrated Aircraft Hangar',
    },
    description: '小～大型戦闘機を6機搭載可能',
    category: 'A',
    categoryNumber: 1,
    carryFighter: 6,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
    defaultModule: true,
    skills: [
        strategy.customStrategy('concentratedStrike').withDescriptionKey('concentratedStrike').withCost(20),
        enhancements.reduceRtbAircraft().withPercentageValue(20),
        enhancements.reduceRtbAircraft().withPercentageValue(20),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'CFB-700型 大型戦闘機格納庫',
                '6隊の大型戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令・探査システムを備える。',
            ],
        },
    ],
};

const a2: ISystemModule = {
    id: 'A2',
    name: '護送艦ドック',
    translatedName: {
        en: 'Corvette Dock',
    },
    category: 'A',
    categoryNumber: 2,
    carryCorvette: 6,
};

const b1: ISystemModule = {
    id: 'B1',
    name: '追加艦載機システム',
    translatedName: {
        en: 'Additional Aircraft System',
    },
    category: 'B',
    categoryNumber: 1,
    carryFighter: 4,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    skills: [
        enhancements.reduceLockOn().withPercentageValue(70),
        enhancements.reduceCooldown(),
        enhancements.increaseDamage(),
    ],
    skillSlots: 3,
    parts: [
        {
            text: [
                'CBF-320型　中型格納庫',
                '攻撃機と戦闘機を格納可能な中型機内格納庫。各編隊に独立した停泊、整備空間を提供し、戦闘機の指令・探査システムを備える。'
            ],
        },
    ],
};

const b2: ISystemModule = {
    id: 'B2',
    name: 'ミサイル防衛システム',
    translatedName: {
        en: 'Missile Defense System',
    },
    category: 'B',
    categoryNumber: 2,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseHitRate(),
        enhancements.increaseHitRateVsSmall(),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'MK2-CM-4x250A型「ストーム」',
                'ミサイルランチャーネスト',
                '対小型艦：',
                '・投射、実弾、対艦：5600、対空：2856、攻城：392',
            ],
        },
    ],
    dpmShip: 5600,
    dpmAntiAir: 2856,
    dpmSiege: 392,
};

const b3: ISystemModule = {
    id: 'B3',
    name: '偵察UAVシステム',
    translatedName: {
        en: 'Recon UAV System',
    },
    category: 'B',
    categoryNumber: 3,
    skillSlots: 2,
    parts: [
        {
            text: [
                'CIT-3型　スポッターUAV格納庫',
                '3機の情報指令UAVを搭載し、周囲の味方艦船に総合的な武器情報支援を提供し、武器の命中率をアップさせる。',
            ],
        },
    ],
};

const c1: ISystemModule = {
    id: 'C1',
    name: '付加エネルギーシステム',
    translatedName: {
        en: 'Additional Energy System',
    },
    description: '艦載機のダメージアップ',
    category: 'C',
    categoryNumber: 1,
    defaultModule: true,
    effects: [
        enhancements.increaseDamageOfAircraftMainWeapon().withFixedPercentageValue(15),
    ],
    skills: [
        // TODO cost
        enhancements.increaseIonDamage().withPercentageValue(10),
        enhancements.reduceIonCooldownOfShip().withPercentageValue(15),
    ],
    skillSlots: 2,
    parts: [
        {
            text: [
                'RET-200型　エネルギー増加装置',
            ],
        },
    ],
};

const c2: ISystemModule = {
    id: 'C2',
    name: '射撃統制補助照準システム',
    translatedName: {
        en: 'Fire-Control Auxiliary Calibration System',
    },
    description: '艦載機の命中率アップ',
    category: 'C',
    categoryNumber: 2,
    effects: [
        enhancements.increaseHitRateOfAircraftMainWeapon().withFixedPercentageValue(15),
    ],
    parts: [
        {
            text: [
                'XGC-200型　精密誘導システム',
                '小型機載攻撃補助情報システム。アントニオスプレシジョン製造の艦載機の情報システムと連動できるため、攻撃目標の情報をより多く武器システムに提供し、命中率をアップさせる。',
            ],
        },
    ],
};

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
            flagshipEffect.strategicStrike2(120).withDefaultFlag(),
            // TODO max distance
            flagshipEffect.strategicStrike3(360, '15.0+?').withCost(60),
        ],
        skills: [
            // TODO cost
            enhancements.customEnhancement('multiTargetAttack').withDescriptionKey('multiTargetAttack', { targetCount: 2 }),
            enhancements.customEnhancement('auxiliaryAttackRadar').withDescriptionKey('auxiliaryAttackRadar', { hitrate: 8 }),
            enhancements.customEnhancement('waveAdjustment').withDescriptionKey('waveAdjustment').withCost(10),
            enhancements.customEnhancement('rangeExtension').withDescriptionKey('rangeExtension', { radius: '5.0+?' }),
            enhancements.increaseSystemHp().withPercentageValue(10),
        ],
        skillSlots: 5,
    }),
    modules.armorSystem({
        skills: [
            // TODO cost
            enhancements.increaseHp().withPercentageValue(10),
            enhancements.increaseHp().withPercentageValue(10),
            enhancements.increaseArmor().withAbsoluteValue(75),
            enhancements.increaseArmor().withAbsoluteValue(75),
            enhancements.reduceCritialDamageReceived().withPercentageValue(30),
            enhancements.increaseShield().withPercentageValue(10),
        ],
        skillSlots: 4,
    }),
    modules.propulsionSystem({
        skills: [
            enhancements.increaseCruisingSpeed().withPercentageValue(15),
            enhancements.increaseCruisingSpeed().withPercentageValue(15),
            enhancements.increaseWarpSpeed().withPercentageValue(15),
            enhancements.increaseWarpSpeed().withPercentageValue(15),
        ],
        skillSlots: 3,
    }),
    modules.energySystem(),
];

const defaultStats: IDefaultShipStats = {
    hp: 254740,
    armor: 90,
    shield: 15,
    speed: 400,
    warpSpeed: 2000,
    dpmShip: 16560,
    dpmAntiAir: 1152,
    dpmSiege: 1908,
};

export const marshallCrux: IShipDefinition[] = [
    {
        id: ShipId.MARSHALL_CRUX,
        name: 'マーシャルクルックス級',
        translatedName: {
            en: 'Marshal Crux',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 2,
        row: ShipRow.BACK,
        operationLimit: 5,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        relatedShipIds: [
            ShipId.MARSHALL_CRUX_TE_A1,
            ShipId.MARSHALL_CRUX_TE_A1_B1,
            ShipId.MARSHALL_CRUX_TE_A2
        ],
        modules: [m1, m2, a1, a2, b1, b2, b3, c1, c2, ...staticModules],
        defaultStats,
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
    },
    {
        id: ShipId.MARSHALL_CRUX_TE_A1,
        name: 'マーシャルクルックス級-TE トライアル版',
        translatedName: {
            en: 'Marshal Crux (TE) Trial',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        relatedShipIds: [
            ShipId.MARSHALL_CRUX,
            ShipId.MARSHALL_CRUX_TE_A1_B1,
            ShipId.MARSHALL_CRUX_TE_A2
        ],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a1),
            modules.toStatic(c1),
            ...staticModules,
        ],
        defaultStats,
    },
    {
        id: ShipId.MARSHALL_CRUX_TE_A2,
        name: 'マーシャルクルックス級-TE トライアル版 (A2)',
        translatedName: {
            en: 'Marshal Crux (TE) Trial (A2)',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        relatedShipIds: [
            ShipId.MARSHALL_CRUX,
            ShipId.MARSHALL_CRUX_TE_A1,
            ShipId.MARSHALL_CRUX_TE_A1_B1,
        ],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a2),
            modules.toStatic(c1),
            ...staticModules,
        ],
        defaultStats,
    },
    {
        id: ShipId.MARSHALL_CRUX_TE_A1_B1,
        name: 'マーシャルクルックス級-TE トライアル版 (B1)',
        translatedName: {
            en: 'Marshal Crux (TE) Trial (B1)',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        relatedShipIds: [
            ShipId.MARSHALL_CRUX,
            ShipId.MARSHALL_CRUX_TE_A1,
            ShipId.MARSHALL_CRUX_TE_A2
        ],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a1),
            modules.toStatic(b1),
            modules.toStatic(c1),
            ...staticModules,
        ],
        defaultStats,
    },
];
