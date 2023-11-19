import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
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
    name: '「ビゲン」イオン生成システム',
    translatedName: {
        en: 'Viggen Ion Generation System',
    },
    description: '対大型艦武装',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    skillComplete: true,
    skills: [
        strategy.overdrive(60, 3, 35, 30, 5, 10).withCost(15),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
        enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
        enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(10),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                'AI-900A型「ビゲン」イオン砲',
                '対大型艦：',
                '・直射、エネルギー、対艦：16000、攻城：3360',
            ],
        },
    ],
    dpmShip: 16000,
    dpmAntiAir: 0,
    dpmSiege: 3360,
};

const m2: ISystemModule = {
    id: 'M2',
    name: 'プラズマ投射システム',
    translatedName: {
        en: 'Experimental Plasma Caster',
    },
    description: '対大型艦武装',
    category: 'M',
    categoryNumber: 2,
    mainSystem: true,
    skillComplete: true,
    skills: [
        strategy.customStrategyWithKey('unknown').withCost(15), // TODO find out
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
        enhancements.reduceDuration().withPercentageValue(10).withCost(10),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                'AIM-850T型　プラズマ投射器',
                '対大型艦：',
                '・投射、エネルギー', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const a1: ISystemModule = {
    id: 'A1',
    name: '「エターナルポラリス」MARKⅡ投射システム',
    translatedName: {
        en: 'Eternal Polaris Mk II Projectile Launching System',
    },
    description: '対小型＆大型艦武装',
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(10),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'MK3-AT-800A型「スーパーノヴァ・ホワイト」対艦魚雷',
                '対大型艦：',
                '・投射、実弾、対艦：9540、攻城：1440',
                'MK2-AM-8x300B型「エターナルボラリスK」',
                '対小型艦：',
                '・投射、実弾、対艦：2700、対空：396、攻城：99',
            ],
        },
    ],
    dpmShip: 12240,
    dpmAntiAir: 396,
    dpmSiege: 1539,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '「エターナルポラリス」MARKⅡ投射システム',
    translatedName: {
        en: 'Eternal Polaris Mk II Projectile Launching System',
    },
    description: '対大型艦＆攻城武装',
    category: 'A',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
        enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'MK2-AM-16x150B型「スーパーノヴァホワイト」攻城魚雷ランチャー群',
                '対大型艦：',
                '・投射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const a3: ISystemModule = {
    id: 'A3',
    name: '「エターナルポラリス」MARKⅡ投射システム', // TODO adjust after update
    translatedName: {
        en: 'Eternal Polaris Mk II Projectile Launching System', // TODO adjust after update
    },
    description: '対艦＆対空武装',
    category: 'A',
    categoryNumber: 3,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        strategy.antiAircraftSupport(40, 30, 25).withCost(15),
    ],
    skillSlots: 4,
    // TODO total dpm
};

const b1: ISystemModule = {
    id: 'B1',
    name: '一般砲撃プラットフォーム',
    translatedName: {
        en: 'Generic Cannon Platform',
    },
    description: '対艦＆対空武装',
    category: 'B',
    categoryNumber: 1,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'AG-2580型　2連重砲',
                '対大型艦：',
                '・投射、実弾', // TODO dpm
                // TODO name
                '対空：',
                '・投射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const b2: ISystemModule = {
    id: 'B2',
    name: '一般近接防御システム',
    translatedName: {
        en: 'Generic Close-in Weapon System',
    },
    description: '対空武装',
    category: 'B',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'AG-1105B型　通常砲',
                '対空：',
                '・直射、実弾', // TODO dpm
            ],
        }
    ],
    // TODO total dpm
};

const c1: ISystemModule = {
    id: 'C1',
    name: 'NT UAV対空システム',
    translatedName: {
        en: 'NT UAV Anti-Aircraft System',
    },
    description: '対空UAV×3',
    category: 'C',
    categoryNumber: 1,
    skillComplete: true,
    skills: [
        enhancements.reduceLockOnOfUav().withPercentageValue(70).withCost(5),
        enhancements.reduceRtbUav().withPercentageValue(20).withCost(5),
        enhancements.increaseHitRateOfUav().withPercentageValue(20).withCost(5),
        enhancements.increaseDamageOfUav().withPercentageValue(10).withCost(5),
    ],
    skillSlots: 3,
    parts: [
        {
            text: [
                'NT-1型　対空UAVラック',
                '領域対空UAVを3機搭載する。UAVの収容と整備を行い、信号誘導システムを装備する。',
                // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const c2: ISystemModule = {
    id: 'C2',
    name: '「サンダーストーム」UAVシールドシステム',
    translatedName: {
        en: 'Thunderstorm UAV Shield System',
    },
    description: 'シールドUAV×1',
    category: 'C',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        enhancements.reduceRtbUav().withPercentageValue(20).withCost(5),
        enhancements.reduceRtbUav().withPercentageValue(20).withCost(5),
        enhancements.reduceLockOnOfUav().withPercentageValue(70).withCost(5),
    ],
    skillSlots: 2,
    parts: [
        {
            text: [
                'SNT-1型　シールドUAVラック',
                '対象の敵艦船のエネルギー武器の命中率ダウン',
            ],
        },
    ],
};

const c3: ISystemModule = {
    id: 'C3',
    name: 'エネルギー補償装甲システム',
    translatedName: {
        en: 'Energy Compensation Armor System',
    },
    description: 'エネルギー＆投射ダメージを軽減',
    category: 'C',
    categoryNumber: 3,
    effects: [
        enhancements.reduceProjectileDamageReceived().withFixedPercentageValue(15),
        enhancements.reduceCritialDamageReceived().withFixedPercentageValue(30),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseShield().withPercentageValue(10).withCost(5),
        enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(5),
    ],
    skillSlots: 2,
    parts: [
        {
            text: [
                'RIR-220型　実験的エネルギー補助装甲',
                'エネルギーシステムのエネルギーを利用し、装甲表面にエネルギー層を形成する。運動エネルギーの衛撃や高エネルギー照射を受けた場合も変形や溶融によりダメージを吸収する。',
            ],
        },
    ],
};

const d1: ISystemModule = {
    id: 'D1',
    name: 'イオン砲塔システム',
    translatedName: {
        en: 'Ion Turret System',
    },
    description: '対艦武装',
    category: 'D',
    categoryNumber: 1,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(5),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'AI-450A型　試験的イオン砲塔',
                '対大型艦：',
                '・直射、エネルギー', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const d2: ISystemModule = {
    id: 'D2',
    name: 'パルス砲塔システム',
    translatedName: {
        en: 'Pulse Turret System',
    },
    description: '対空武装、ミサイル/魚雷迎撃',
    category: 'D',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
        enhancements.increaseInterceptionChance().withPercentageValue(25).withCost(5),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'AP-1308型　連射近接防御パルス砲',
                '対空：',
                '・直射、エネルギー', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
            flagshipEffect.customFlashipEffect('patrollingDefense').withDescriptionKey('patrollingDefense', { nodeCount: '4' }).withCost(40),
        ],
        skillComplete: true,
        skills: [
            enhancements.reduceDamageReceivedBySystem().withAbsoluteValue(5).withCost(10),
            enhancements.increaseSystemHp().withPercentageValue(10).withCost(10),
        ],
        skillSlots: 2,
    }),
    modules.armorSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseHp().withPercentageValue(14).withCost(8),
            enhancements.increaseHp().withPercentageValue(14).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
            enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(8),
        ],
        skillSlots: 5,
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
    hp: 146740,
    armor: 180,
    shield: 10,
    speed: 450,
    warpSpeed: 2250,
    dpmShip: 28240,
    dpmAntiAir: 396,
    dpmSiege: 4899,
};

export const eternalStorm: IShipDefinition[] = [
    {
        id: ShipId.ETERNAL_STORM,
        name: 'エターナルストーム級',
        translatedName: {
            en: 'Eternal Storm',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 32,
        weight: 2,
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [m1, m2, a1, a2, a3, b1, b2, c1, c2, c3, d1, d2, ...staticModules],
        defaultStats,
    },
];
