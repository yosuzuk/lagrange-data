import { enhancements, strategy } from '../../../enhancements/enhancements';
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
            skillComplete: true,
            skills: [
                strategy.customStrategy({
                    name: "遅延出撃",
                    translatedName: {
                      en: "Delayed Attack"
                    },
                    description: "戦闘開始後、最初の2ラウンドの攻撃のロックオン時間40%アップ、メイン武器命中率40%アップ。",
                    translatedDescription: {
                      en: "After the battle begins, extend the lock-on time of the first 2 rounds of attacks by 40% and increase the Hit Rate of the main weapon by 40%."
                    },
                }).withCost(15),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
            ],
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
            skillComplete: true,
            skills: [
                enhancements.increaseMaintenanceEfficiency().withPercentageValue(25).withCost(5),
            ],
            skillSlots: 1,
        }),
        modules.armorSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
            ],
            skillSlots: 2,
        }),
        modules.propulsionSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                enhancements.reduceFlightTime().withPercentageValue(30).withCost(10),
            ],
            skillSlots: 3,
        }),
        modules.energySystem({
            name: '機載エネルギーシステム',
            translatedName: {
                en: 'Airborne Energy System',
            },
            skillComplete: true,
            skills: [
                enhancements.increaseEnergyDamageOfMainSystem().withPercentageValue(10).withCost(10),
                enhancements.increaseEnergyDamageOfMainSystem().withPercentageValue(10).withCost(10),
                enhancements.customEnhancement({
                    "name": "エネルギー備蓄",
                    "translatedName": {
                        "en": "Energy Storage"
                    },
                    "description": "メインシステムのパルス砲の持続時間が80%アップし、攻撃回数+2",
                    "translatedDescription": {
                        "en": "Increases the main pulse cannon''s Duration by 80% and Rounds Per Cycle by 2."
                    },
                }).withCost(20),
            ],
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
            skillComplete: true,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
            ],
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
            skillComplete: true,
            skills: [
                enhancements.increaseJammingDuration().withPercentageValue(30).withCost(9),
                enhancements.increaseJammingDuration().withPercentageValue(30).withCost(9),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                enhancements.customEnhancement({
                    name: "干渉防御",
                    translatedName: {
                      en: "Interference Cover"
                    },
                    description: "直接射撃武器の被命中率が30%ダウンし、干渉効果の持続時間が50%ダウンする",
                    translatedDescription: {
                      en: "Reduces the chances of being hit by direct-fire weapons by 30% but reduces the interference effect duration by 50%."
                    },
                }).withCost(9),
                enhancements.customEnhancement({
                    name: "分散干渉",
                    translatedName: {
                      en: "Disperse Interference"
                    },
                    description: "まだ干渉を受けていない目標を優先的に選ぶ",
                    translatedDescription: {
                      en: "Prioritizes unjammed targets"
                    },
                }).withCost(9),
                enhancements.customEnhancement({
                    name: "電子防御",
                    translatedName: {
                      en: "Electronic Cover"
                    },
                    description: "自身、及び自身と同じ母艦に所属する艦載機は、対空武器のロックオン効率の影響が10%ダウンする（同類効果の重ねがけは不可）",
                    translatedDescription: {
                      en: "Reduces the effect Lock-On Efficiency of anti-aircraft weapons has on you and the aircraft within the same carrier by 10% (effects of the same type cannot stack)"
                    },
                }).withCost(14),
                enhancements.customEnhancement({
                    name: "失効調整",
                    translatedName: {
                      en: "Failure Adjustment"
                    },
                    description: "干渉失敗時ただちにその目標に干渉しなおし、そのラウンドの往路時間が35%アップする。",
                    translatedDescription: {
                      en: "Interferes again and increases the inbound time by 35% when failing to interfere."
                    },
                }).withCost(14),
            ],
            skillSlots: 7,
        }),
        modules.commandSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseMaintenanceEfficiency().withPercentageValue(25).withCost(5),
            ],
            skillSlots: 1,
        }),
        modules.armorSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
            ],
            skillSlots: 2,
        }),
        modules.propulsionSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                enhancements.reduceHitByMissile().withPercentageValue(15).withCost(8),
                enhancements.reduceFlightTime().withPercentageValue(30).withCost(10),
            ],
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
            skillComplete: true,
            skills: [
                enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(8),
                enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10).withCost(8),
                enhancements.customEnhancement({
                    name: "持続出力強化",
                    translatedName: {
                      en: "Sustained Output Enhancement"
                    },
                    description: "システム武器の持続時間が100%、攻撃回数+6",
                    translatedDescription: {
                      en: "Increases the weapon system''s Duration by 100% and Rounds Per Cycle by 6."
                    },
                }).withCost(16),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.customEnhancement({
                    name: "多目標戦略",
                    translatedName: {
                      en: "Multi-Target Strategy"
                    },
                    description: "出撃2ラウンドおきにメイン武器の目標数が2となり、武器ダメージが75%アップ、目標の搭載システムへの命中率10%ダウン",
                    translatedDescription: {
                      en: "Attacks every 2 rounds, with the main weapon now attacking 2 targets. Increases weapon damage by 75% and reduces Hit Rate against the target''s loading system by 10%."
                    },
                }).withCost(15),
            ],
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
            skillComplete: true,
            skills: [
                enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
                enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
            ],
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
            skillComplete: true,
            skills: [
                enhancements.targetReset2().withCost(5),
                enhancements.increaseMaintenanceEfficiency().withPercentageValue(25).withCost(5),
            ],
            skillSlots: 1,
        }),
        modules.armorSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(12, 25).withCost(6),
            ],
            skillSlots: 2,
        }),
        modules.propulsionSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                enhancements.reduceHitByMissile().withPercentageValue(15).withCost(8),
                enhancements.reduceFlightTime().withPercentageValue(15).withCost(10),
            ],
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
