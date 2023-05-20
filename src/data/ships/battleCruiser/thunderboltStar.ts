import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '艦首武器システム「スターオブサンダーボルト」',
    translatedName: {
        en: '"Thunderbold" Bow-Mounted Weapon System',
    },
    description: '対小型武装',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    skillComplete: true,
    skills: [
        // TODO cost
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.increaseHitRate().withPercentageValue(10),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.reduceDuration().withPercentageValue(10),
    ],
    skillSlots: 6,
    parts: [{
        text: [
            'HR-1850型　長レール電磁加速砲',
            '対小型艦：',
            '・直接、実弾、対艦：27225、攻城：5744',
        ],
    }],
    dpmShip: 27225,
    dpmAntiAir: 0,
    dpmSiege: 4995,
};

const m2: ISystemModule = {
    id: 'M2',
    name: '艦首投射武器システム「スターオブサンダーボルト」',
    translatedName: {
        en: '"Thunderbold" Bow-Mounted Weapon System',
    },
    description: '対大型武装',
    category: 'M',
    categoryNumber: 2,
    mainSystem: true,
    skillComplete: false,
    skills: [
        // TODO find out
    ],
    skillSlots: 6,
    parts: [{
        text: [
            'HT-1-850型　高エネルギーランチャー',
            '対大型艦：',
            '・投射、エネルギー', // TODO dpm
            'クリティカル',
        ],
    }],
    // TODO total dpm
};

const m3: ISystemModule = {
    id: 'M3',
    name: '「サンダーファイヤースター」弓高エネルギー兵器システム',
    translatedName: {
        en: '"Thunderbold" Bow High-Energy Weapon System',
    },
    description: '対大型武装',
    category: 'M',
    categoryNumber: 3,
    mainSystem: true,
    skillComplete: false,
    skills: [
        // TODO find out
    ],
    skillSlots: 6,
    parts: [{
        text: [
            'HI-1250T型　試験型超高エネルギーイオン砲',
            '対大型艦：',
            '・投射、エネルギー',
        ],
    }],
    // TODO total dpm
};

const a1: ISystemModule = {
    id: 'A1',
    name: '高速対艦武器システム',
    translatedName: {
        en: 'Rapid-Fire Anti-Ship Weapon System',
    },
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    skillComplete: true,
    skills: [
        // TODO cost
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.reduceAttackInterval().withPercentageValue(15),
        enhancements.reduceAttackInterval().withPercentageValue(15),
        enhancements.increaseLockOnEfficiency().withPercentageValue(15),
    ],
    skillSlots: 6,
    parts: [{
        text: [
            'HG-1220型 速射砲群',
            '対小型：',
            '・直射、実弾、対艦：12636、対空：1266、攻城：1407',
            '反撃対空',
        ],
    }],
    dpmShip: 12636,
    dpmAntiAir: 1266,
    dpmSiege: 1224,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '中型対艦武器システム',
    translatedName: {
        en: 'Medium Anti-Ship Weapon System',
    },
    description: '対小型武装',
    category: 'A',
    categoryNumber: 2,
    skillComplete: false,
    skills: [
        // TODO find out
    ],
    skillSlots: 6,
    parts: [{
        text: [
            'HG-2280型　2連固定式重砲',
            '対小型艦：',
            '・直射、実弾、対艦：17884、対空：0、攻城：1490',
        ],
    }],
    dpmShip: 17884,
    dpmAntiAir: 0,
    dpmSiege: 1490,
};

const b1: ISystemModule = {
    id: 'B1',
    name: 'アクティブ対空システム',
    translatedName: {
        en: 'Active Anti-Aircraft System',
    },
    category: 'B',
    categoryNumber: 1,
    defaultModule: true,
    skillComplete: true,
    skills: [
        // TODO cost
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseDamage().withPercentageValue(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
    ],
    skillSlots: 4,
    parts: [{
        text: [
            'HM-4x60B型 中距離対空ミサイル群',
            '対空：',
            '・投射、実弾、対艦：3375、対空：465',
            '対空支援',
        ],
    }],
    dpmShip: 3375,
    dpmAntiAir: 465,
    dpmSiege: 0,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '範囲要撃システム',
    translatedName: {
        en: 'Range Interception System',
    },
    description: '対空武装、ミサイル迎撃',
    category: 'B',
    categoryNumber: 2,
    skillComplete: false,
    // TODO skills
    // skillSlots: 4,
    parts: [{
        text: [
            'HP-1008型　対ミサイルパルス群',
            '対空：',
            '・直射、エネルギー', // TODO dpm
            '迎撃効果',
        ],
    }],
    // TODO total dpm
};

const c1: ISystemModule = {
    id: 'C1',
    name: '艦載軍需生産統合システム',
    translatedName: {
        en: 'Aircraft Military Industry Integration System',
    },
    category: 'C',
    categoryNumber: 1,
    defaultModule: true,
    effects: [
        enhancements.specialAmmo().withDescriptionKey('specialAmmo'),
        enhancements.collateralDamage().withDescriptionKey('collateralDamage'),
    ],
    skillComplete: false,
    // skills: [
    // Dense Shell
    // There is a 40% chance of damaging the ship's main system when cannons of the entire ship hit the targeted ship.
    // cost 15
    // Large Shell
    // There is a 40% change to deal Crit Damage equal to 50% additional damage when railguns of the entire ship hit the target.
    // cost 15
    // Fusion Energy
    // Increases the damage of the next attack by 5%, up to a maximum of 20%, when the ion and pulse cannons of the entire ship hit the same target consecutively.
    // cost 15
    // Energy Torpedo
    // Deals an additional 20% energy damage when torpedoes of the entire ship hit the target
    // cost 15
    // Cluster Missile
    // Increases the number of targets attacked by missiles of the entire ship by +1 and reduces damage dealt to the additional target by 70%.
    // cost 15
    // ],
    skillSlots: 3,
    parts: [{
        text: [
            'AOF-300 移動式特殊弾薬合成工場',
            '大型弾薬合成工場。モジュール化設計により艦船に搭載可能となり、全艦の武器に特殊弾薬を提供できる。',
        ],
    }],
};

const d1: ISystemModule = {
    id: 'D1',
    name: 'Weapon Coordination Center', // TODO JA
    translatedName: {
        en: 'Weapon Coordination Center',
    },
    category: 'D',
    categoryNumber: 1,
    effects: [
        strategy.customStrategy('oscillatoryExcitation').withDescriptionKey('oscillatoryExcitation'),
    ],
    skillComplete: false,
    // TODO skills
    // skillSlots: 4,
    parts: [{
        text: [
            'HNI-260 Weapon Activation Device', // TODO JA
        ],
    }],
};

const d2: ISystemModule = {
    id: 'D2',
    name: 'Fire-Control Calibration System', // TODO JA
    translatedName: {
        en: 'Fire-Control Calibration System',
    },
    category: 'D',
    categoryNumber: 2,
    skillComplete: false,
    // TODO skills
    // skillSlots: 4,
    parts: [{
        text: [
            'HNA-240 Real-Time Target Calibration Module', // TODO JA
        ],
    }],
};

const e1: ISystemModule = {
    id: 'E1',
    name: '精密投射武器システム',
    translatedName: {
        en: 'Accurate Projectile Weapon System',
    },
    description: '対小型武装',
    category: 'E',
    categoryNumber: 1,
    skillComplete: false,
    skills: [
        // TODO find out
    ],
    skillSlots: 4,
    parts: [{
        text: [
            'HM-1x220A型　中距離対艦ミサイル',
            '対小型艦：',
            '・投射、実弾', // TODO dpm
            '反撃対空',
        ],
    }],
    // TODO total dpm
};

const e2: ISystemModule = {
    id: 'E2',
    name: '大型発射体兵器システム',
    translatedName: {
        en: 'Large Projectile Weapon System',
    },
    description: '対大型武装',
    category: 'E',
    categoryNumber: 2,
    skillComplete: false,
    skills: [
        // TODO find out
    ],
    skillSlots: 4,
    parts: [{
        text: [
            'HT-1-450型　大型魚雷ランチャー',
            '対大型艦：',
            '・投射、実弾', // TODO dpm
            'クリティカル',
        ],
    }],
    // TODO total dpm
};

const f1: ISystemModule = {
    id: 'F1',
    name: '多目的武器システム',
    translatedName: {
        en: 'Multi-Target Weapon System',
    },
    description: '対小型武装',
    category: 'F',
    categoryNumber: 1,
    skillComplete: false,
    // TODO skills
    // skillSlots: 4,
    parts: [{
        text: [
            'HG-1120A型　多目的対艦砲',
            '対小型艦：',
            '・直射、実弾', // TODO dpm
            '反撃対空',
        ],
    }],
    // TODO total dpm
};

const f2: ISystemModule = {
    id: 'F2',
    name: '多目的対空システム',
    translatedName: {
        en: 'Multi-Target Anti-Air System',
    },
    description: '対空武装',
    category: 'F',
    categoryNumber: 2,
    skillComplete: false,
    // TODO skills
    // skillSlots: 4,
    parts: [{
        text: [
            'HG-1120B型　多目的対空砲塔',
            '対空：',
            '・直射、実弾', // TODO dpm
            '反撃対空',
        ],
    }],
    // TODO total dpm
};

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
            // TODO cost
            flagshipEffect.customFlashipEffect('multiTargetCounterAttack').withDescriptionKey('multiTargetCounterAttack'),
        ],
        skillComplete: true,
        skills: [
            // TODO cost
            enhancements.reduceDamageReceivedBySystem().withAbsoluteValue(5),
            enhancements.increaseSystemHp().withPercentageValue(10),
        ],
        skillSlots: 2,
    }),
    modules.armorSystem({
        skillComplete: true,
        skills: [
            // TODO cost
            enhancements.increaseHp().withPercentageValue(14),
            enhancements.increaseHp().withPercentageValue(14),
            enhancements.increaseHp().withPercentageValue(14),
            enhancements.increaseArmor().withAbsoluteValue(30),
            enhancements.increaseArmor().withAbsoluteValue(30),
            enhancements.increaseShield().withPercentageValue(10),
            enhancements.increaseShield().withPercentageValue(10),
            enhancements.increaseRepairEffectivenessByArmor().withPercentageValue(0.05),
        ],
        skillSlots: 5,
    }),
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            // TODO cost
            enhancements.increaseCruisingSpeed().withPercentageValue(15),
            enhancements.increaseCruisingSpeed().withPercentageValue(15),
            enhancements.increaseWarpSpeed().withPercentageValue(15),
            enhancements.increaseWarpSpeed().withPercentageValue(15),
        ],
        skillSlots: 4,
    }),
    modules.energySystem({
        skillComplete: true,
        skillSlots: 0,
    }),
];

const defaultStats: IDefaultShipStats = {
    hp: 146740,
    armor: 120,
    shield: 15,
    speed: 400,
    warpSpeed: 2000,
    dpmShip: 43236,
    dpmAntiAir: 1731,
    dpmSiege: 7151,
};

export const thunderboldStar: IShipDefinition[] = [
    {
        id: ShipId.THUNDERBOLT_STAR,
        name: 'スターオブサンダーボルト',
        translatedName: {
            en: 'Thunderbolt Star',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 2,
        row: ShipRow.MIDDLE,
        operationLimit: 3,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.THUNDERBOLT_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        relatedShipIds: [
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW1,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW2,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW3,
        ],
        modules: [m1, m2, m3, a1, a2, b1, b2, c1, d1, d2, e1, e2, f1, f2, ...staticModules],
        defaultStats,
    },
    {
        id: ShipId.THUNDERBOLT_STAR_TE_PREVIEW1,
        name: 'スターオブサンダーボルト-TE トライアル版',
        translatedName: {
            en: 'Thunderbolt Star (TE) Trial',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.THUNDERBOLT_GROUP,
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a1),
            modules.toStatic(b1),
            modules.toStatic(c1),
            ...staticModules,
        ],
        relatedShipIds: [
            ShipId.THUNDERBOLT_STAR,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW2,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW3,
        ],
    },
    {
        id: ShipId.THUNDERBOLT_STAR_TE_PREVIEW2,
        name: 'スターオブサンダーボルト-TE トライアル版 (M2+E1)',
        translatedName: {
            en: 'Thunderbolt Star (TE) Trial (M2+E1)',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.THUNDERBOLT_GROUP,
        relatedShipIds: [
            ShipId.THUNDERBOLT_STAR,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW1,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW3,
        ],
        modules: [
            modules.toStatic(m2),
            modules.toStatic(a1),
            modules.toStatic(b1),
            modules.toStatic(c1),
            modules.toStatic(e1),
            ...staticModules,
        ],
    },
    {
        id: ShipId.THUNDERBOLT_STAR_TE_PREVIEW3,
        name: 'スターオブサンダーボルト-TE トライアル版 (M3+A2+E2)',
        translatedName: {
            en: 'Thunderbolt Star (TE) Trial (M3+A2+E2)',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.THUNDERBOLT_GROUP,
        relatedShipIds: [
            ShipId.THUNDERBOLT_STAR,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW1,
            ShipId.THUNDERBOLT_STAR_TE_PREVIEW2,
        ],
        modules: [
            modules.toStatic(m3), // 28800
            modules.toStatic(a2), // 12240
            modules.toStatic(b1), // 4500
            modules.toStatic(c1),
            modules.toStatic(e2), // 8437 -> 53977
            ...staticModules,
        ],
    },
];
