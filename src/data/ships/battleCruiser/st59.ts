import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '攻城電磁加速砲システム',
    translatedName: {
        en: 'Assault Railgun System',
    },
    description: '対大型武装',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    skillComplete: true,
    skills: [
        strategy.rapidFire(80, 60, 15, 10).withCost(15),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
        enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
        enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(8),
        enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(8),
        enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
    ],
    skillSlots: 7,
    parts: [
        {
            text: [
                'SR-2600型　重電磁加速砲',
                '対大型艦：',
                '・直射、実弾、対艦：10350、攻城：3360',
            ],
        },
    ],
    dpmShip: 10350,
    dpmAntiAir: 0,
    dpmSiege: 3360,
};

const m2: ISystemModule = {
    id: 'M2',
    name: '艦首大型砲システム',
    translatedName: {
        en: 'Bow-Mounted Battery System',
    },
    description: '対小型艦武装',
    category: 'M',
    categoryNumber: 2,
    mainSystem: true,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
        enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
        enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
        strategy.rapidFire(80, 60, 15, 10).withCost(15),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                'SG-2400T型　2連速射砲',
                '対小型艦：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const m3: ISystemModule = {
    id: 'M3',
    name: '攻城魚雷システム',
    translatedName: {
        en: 'Assault Torpedo System',
    },
    description: '対大型艦武装',
    category: 'M',
    categoryNumber: 3,
    mainSystem: true,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
        strategy.rapidFire(80, 60, 15, 10).withCost(15),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                'ST-2600型　重魚雷ランチャー',
                '対大型艦：',
                '・投射、実弾、対艦：11200、攻城2266',
            ],
        },
    ],
    dpmShip: 11200,
    dpmAntiAir: 0,
    dpmSiege: 2266,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '大型砲プラットフォーム',
    translatedName: {
        en: 'Large Cannon Platform',
    },
    description: '対小型＆対空武装',
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
        enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(8),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                // TODO adjust after update
                'MK4-SG-2580型「サンダーボルト」2連重砲',
                '対小型艦：',
                '・直射、実弾、対艦：6075、攻城：1134',
                'SG-1120B型　通常砲',
                '対空：',
                '・直射、実弾、対艦：1800、対空：216、攻城：72',
                '反撃対空',
            ],
        },
    ],
    dpmShip: 7875,
    dpmAntiAir: 216,
    dpmSiege: 1206,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '電磁加速砲塔群',
    translatedName: {
        en: 'Railgun Turret Array',
    },
    description: '対大型艦武装',
    category: 'A',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
        enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(8),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'SR-1425型　電磁加速砲塔',
                '対大型艦：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const a3: ISystemModule = {
    id: 'A3',
    name: 'パルス砲塔群',
    translatedName: {
        en: 'Pulse Turret Array',
    },
    description: '対小型艦武装',
    category: 'A',
    categoryNumber: 3,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'SP-430型　パルス砲塔',
                '対小型艦：',
                '・直射、エネルギー', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const b1: ISystemModule = {
    id: 'B1',
    name: '総合投射武器プラットフォーム',
    translatedName: {
        en: 'Integrated Projectile Weapon Platform',
    },
    description: '対大型艦武装',
    category: 'B',
    categoryNumber: 1,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseHitRate().withPercentageValue(10).withCost(8),
        enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'K-ST-12-255A型　3X4クラスター魚雷発射システム',
                '対大型艦：',
                '・投射、実弾、対艦：8188、攻城：1185',
            ],
        },
    ],
    dpmShip: 8188,
    dpmAntiAir: 0,
    dpmSiege: 1185,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '艦載機システム',
    translatedName: {
        en: 'Aircraft System',
    },
    description: '小～中型艦載機を2機搭載可能',
    category: 'B',
    categoryNumber: 2,
    carryFighter: 4,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    skillComplete: true,
    skills: [
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(8),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(8),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(8),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(8),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'CBF-305型　中型格納庫',
            ],
        },
    ],
};

const b3: ISystemModule = {
    id: 'B3',
    name: 'エリア射撃統制システム',
    translatedName: {
        en: 'Area Fire-control System',
    },
    description: 'スポッターUAV×3',
    category: 'B',
    categoryNumber: 3,
    skillComplete: true,
    skills: [
        enhancements.reduceLockOnOfUav().withPercentageValue(70).withCost(10),
        enhancements.reduceRtbUav().withPercentageValue(20).withCost(10),
        enhancements.increaseHitRateOfUav().withPercentageValue(20).withCost(10),
        enhancements.increaseMissileEvasionOfUav().withPercentageValue(30).withCost(10),
    ],
    skillSlots: 3,
    parts: [
        {
            text: [
                'CIT-1型　スポッターUAV格納庫',
                '周囲の味方の艦船に総合的な武器情報を提供し、武器の命中率をアップさせる。',
            ],
        },
    ],
};

const c1: ISystemModule = {
    id: 'C1',
    name: '付加装甲システム',
    translatedName: {
        en: 'Additional Armor System',
    },
    description: 'HPを20%アップ（最大40％）',
    category: 'C',
    categoryNumber: 1,
    effects: [
        enhancements.increaseHp().withFixedAbsoluteValue(27302),
        enhancements.increaseHp().withFixedPercentageValue(20),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseHp().withPercentageValue(10).withCost(8),
        enhancements.increaseHp().withPercentageValue(10).withCost(8),
    ],
    skillSlots: 2,
    parts: [
        {
            text: [
                'ASX-100型　追加装甲',
                '既存の装甲内部に追加するナノ強化層。艦船構造の堅牢性を効果的に高める。',
            ],
        },
    ],
};

const c2: ISystemModule = {
    id: 'C2',
    name: '電磁装甲システム',
    translatedName: {
        en: 'EM Armor System',
    },
    description: 'シールド値20％アップ（最大40％）',
    category: 'C',
    categoryNumber: 2,
    effects: [
        enhancements.increaseShield().withFixedPercentageValue(20),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseShield().withPercentageValue(10).withCost(8),
        enhancements.increaseShield().withPercentageValue(10).withCost(8),
    ],
    skillSlots: 2,
    parts: [
        {
            text: [
                'AEX-120型　電磁装甲',
                '電磁的強化を施した付加装甲構造。エネルギーダメージを効果的に防護する。',
            ],
        },
    ],
};

const c3: ISystemModule = {
    id: 'C3',
    name: '重装甲システム',
    translatedName: {
        en: 'Heavy Defensive Armor System',
    },
    description: '抵抗値250アップ（最大400）',
    category: 'C',
    categoryNumber: 3,
    effects: [
        enhancements.increaseArmor().withFixedAbsoluteValue(250),
        enhancements.reduceEvasion().withFixedPercentageValue(10),
        enhancements.reduceHitRateOfMainWeapon().withFixedPercentageValue(5),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
        enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
    ],
    skillSlots: 2,
    parts: [
        {
            text: [
                'ASX-130型　付加装甲',
                '重付加装甲。既存の装甲をベースに装甲厚を増し、中型武器への防御力をアップさせた。ただし艦船の機動性と艦船メイン武器の命中率に影響する。',
            ],
        },
    ],
};

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
            flagshipEffect.desperateMeasures2('20', '2').withCost(60),
        ],
        skillComplete: true,
        skills: [
            enhancements.reduceDamageReceivedBySystem().withAbsoluteValue(5).withCost(10),
        ],
        skillSlots: 2,
    }),
    modules.armorSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseHp().withPercentageValue(14).withCost(12),
            enhancements.increaseHp().withPercentageValue(14).withCost(12),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
            enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(8),
            strategy.customStrategyWithKey('shipChargingStance').withDescriptionKey('shipChargingStance').withCost(8),
        ],
        skillSlots: 6,
    }),
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
        ],
        skillSlots: 3,
    }),
    modules.energySystem({
        skillComplete: true,
        skillSlots: 0,
    }),
];

const defaultStats: IDefaultShipStats = {
    hp: 136510,
    armor: 180,
    shield: 10,
    speed: 450,
    warpSpeed: 2250,
    dpmShip: 18225,
    dpmAntiAir: 216,
    dpmSiege: 4566,
};

export const st59: IShipDefinition[] = [
    {
        id: ShipId.ST59,
        name: 'ST59級',
        translatedName: {
            en: 'ST59',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 28,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [m1, m2, m3, a1, a2, a3, b1, b2, b3, c1, c2, c3, ...staticModules],
        defaultStats,
    },
];
