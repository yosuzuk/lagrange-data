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
    name: '艦首攻城電磁加速砲システム',
    translatedName: {
        en: 'Bow Railgun System',
    },
    description: '対大型艦武装',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    skillComplete: true,
    skills: [
        strategy.rapidFire(80, 60, 15, 10).withCost(12),
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
                'BR-1950C型「ルビー」',
                '対大型艦：',
                '・直射、実弾、対艦：12950、攻城：11310'
            ],
        }
    ],
    dpmShip: 12950,
    dpmAntiAir: 0,
    dpmSiege: 11310,
};

const m2: ISystemModule = {
    id: 'M2',
    name: 'イオン砲塔システム',
    translatedName: {
        en: 'Ion Turret System',
    },
    description: '対大型艦武装',
    category: 'M',
    categoryNumber: 2,
    mainSystem: true,
    skillComplete: true,
    skills: [
        enhancements.increaseIonDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseIonDamage().withPercentageValue(10).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
        enhancements.increaseIonHitRate().withPercentageValue(10).withCost(8),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
        enhancements.increaseSystemHp().withPercentageValue(35).withCost(8),
        enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
    ],
    skillSlots: 6,
    parts: [{
        text: [
            'BI-850型　2連重イオン砲塔',
            '対大型艦：',
            '・直射、エネルギー' // TODO dpm
        ],
    }],
    // TODO total dpm
};

const a1: ISystemModule = {
    id: 'A1',
    name: 'フォートレス砲撃システム',
    translatedName: {
        en: 'Fortress Battery System',
    },
    description: '対艦＆対空武装',
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.reduceDuration().withPercentageValue(10).withCost(10),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'BG-1850型　重砲',
                '対大型艦：',
                '・直射、実弾、対艦：9400、攻城：2755',
                'BG-2240型　対艦砲',
                '対小型艦：',
                '・直射、実弾、対艦：3600、対空：420、攻城：320',
                '反撃対空',
                'BG-340B型　対空砲',
                '対空：',
                '・直射、実弾、対艦：120、対空：216',
                '反撃対空',
                '特殊弾薬：対空ダメージ10アップ',
            ],
        },
    ],
    dpmShip: 13120,
    dpmAntiAir: 636,
    dpmSiege: 3075,
};

const a2: ISystemModule = {
    id: 'A2',
    name: 'フォートレス砲撃システム',
    translatedName: {
        en: 'Fortress Battery System',
    },
    description: '対艦＆対空武装',
    category: 'A',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        // TODO verify strategy vs skill
        strategy.customStrategy({
            name: '集中攻撃',
            translatedName: {
                en: 'Concentrate Fire',
            },
            description: '武器で目標1件を集中攻撃する。',
            translatedDescription: {
                en: 'Focuses weapons fire on 1 target(s)',
            },
        }).withCost(15),
        // TODO verify strategy vs skill
        strategy.customStrategy({
            name: '乱射',
            translatedName: {
                en: 'Full Firepower',
            },
            description: '自身のHPが50%以下に減少すると、システム内の武器の冷却時間が40%ダウンし、効果は180秒続く。この効果は戦闘中に1回しか発生しない。',
            translatedDescription: {
                en: 'Decreases the CD of the system\'s weapons by 40% for 180 second(s) whenever your HP falls below 50%. Can only be triggered once per battle.',
            },
        }).withCost(15),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'BG-1950型　重砲',
                '対艦：',
                '・直射、実弾', // TODO dpm
                'BG-3408型　対空砲',
                '対空：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const a3: ISystemModule = {
    id: 'A3',
    name: 'フォートレス砲撃システム',
    translatedName: {
        en: 'Fortress Battery System',
    },
    description: '対艦＆対空武装',
    category: 'A',
    categoryNumber: 3,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.increaseInterceptionChance().withPercentageValue(6).withCost(10),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                // TODO adjust after update (added interception)
                'BG-2350型　対艦砲',
                '対小型艦：',
                '・直射、実弾', // TODO dpm
                // TODO name
                '対空：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const b1: ISystemModule = {
    id: 'B1',
    name: '「トロッコ」投射装置群',
    translatedName: {
        en: 'Minecart Projectile Launching Array',
    },
    description: '対空武装、ミサイル迎撃',
    category: 'B',
    categoryNumber: 1,
    skillComplete: true,
    skills: [
        enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(6),
        enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(6),
        enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(6),
        enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(6),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(6),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(6),
        enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(6),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                'BM-12x250型　通常ミサイル発射群',
                '対空：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const b2: ISystemModule = {
    id: 'B2',
    name: '護送艦ドック',
    translatedName: {
        en: 'Corvette Dock',
    },
    description: '護送艦を3隻搭載可能',
    category: 'B',
    categoryNumber: 2,
    carryCorvette: 3,
    skillComplete: true,
    skills: [
        enhancements.reduceLockOn().withPercentageValue(70).withCost(6),
        enhancements.reduceCooldown().withPercentageValue(20).withCost(6),
        enhancements.reduceCooldown().withPercentageValue(20).withCost(6),
        enhancements.increaseHitRate().withPercentageValue(20).withCost(6),
        enhancements.increaseDamage().withPercentageValue(10).withCost(6),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'CBC-2300型　護送艦追加ドック',
                '護送艦外付け支援システム。最大3隻の護送艦を艦船外に配備できる。',
            ],
        },
    ],
};

const b3: ISystemModule = {
    id: 'B3',
    name: '統合損失管理システム',
    translatedName: {
        en: 'Integrated Damage Control System',
    },
    description: '補修ＵＡＶ×2',
    category: 'B',
    categoryNumber: 3,
    skillComplete: true,
    skills: [
        enhancements.increaseRepairEffectivenessOfUav().withPercentageValue(10).withCost(6),
        enhancements.increaseRepairEffectivenessOfUav().withPercentageValue(10).withCost(6),
        enhancements.increaseRepairEffectivenessOfUav().withPercentageValue(10).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'CRT-3型　汎用ロボット補修ポッド',
                '標準補修UAVを2機搭載する。補修UAVの収容と整備を行い、信号誘導システムを装備する。補修UAVは損傷した味方艦船を戦闘中に補修できる。',
            ],
        },
    ],
};

const c1: ISystemModule = {
    id: 'C1',
    name: '分散型軽量武器統制システム', // TODO verify, maybe changed by update
    translatedName: {
        en: 'Distributed Light Weapon Control System', // TODO verify, maybe changed by update
    },
    description: '対空武装',
    category: 'C',
    categoryNumber: 1,
    skillComplete: true,
    skills: [
        enhancements.increaseHitRateOfAllWeapons().withPercentageValue(3).withCost(12),
    ],
    skillSlots: 1,
    parts: [
        {
            text: [
                // TODO adjust after update
                'BG-6258型　対空砲',
                '対空：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const c2: ISystemModule = {
    id: 'C2',
    name: '追加装甲システム',
    translatedName: {
        en: 'Additional Armor System',
    },
    description: '抵抗値アップ150',
    category: 'C',
    categoryNumber: 2,
    effects: [
        enhancements.increaseArmor().withFixedAbsoluteValue(150),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseHp().withPercentageValue(14).withCost(12),
        enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
        enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
        enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(8),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                '既存の装甲内部に追加するナノ強化層。艦船構造の堅牢性を効果的に高める。',
            ],
        },
    ],
};

const c3: ISystemModule = {
    id: 'C3',
    name: '対ミサイル要撃システム',
    translatedName: {
        en: 'Anti-Missile System',
    },
    description: '対空武装、ミサイル迎撃',
    category: 'C',
    categoryNumber: 3,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(3),
        enhancements.increaseDamage().withPercentageValue(10).withCost(3),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
        enhancements.increaseInterceptionChance().withPercentageValue(25).withCost(3),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'BG-625C1型　領域的対ミサイル要撃砲',
                '対空：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
            // TODO max duration
            flagshipEffect.customFlashipEffectWithKey('combatSurge').withDescriptionKey('combatSurge', { duration: '60' }).withCost(30),
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
            enhancements.increaseHp().withPercentageValue(14).withCost(12),
            enhancements.increaseHp().withPercentageValue(14).withCost(12),
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
    hp: 180470,
    armor: 240,
    shield: 5,
    speed: 250,
    warpSpeed: 1250,
    dpmShip: 26070,
    dpmAntiAir: 636,
    dpmSiege: 14385,
};

export const spearOfUranus: IShipDefinition[] = [
    {
        id: ShipId.SPEAR_OF_URANUS,
        name: 'スピアーオブウラヌス級',
        translatedName: {
            en: 'Spear of Uranus',
        },
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 2,
        row: ShipRow.FRONT,
        operationLimit: 6,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [m1, m2, a1, a2, a3, b1, b2, b3, c1, c2, c3, ...staticModules],
        defaultStats,
    },
];
