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
    id: ShipId.BR050_A,
    name: 'BR050　Ａ対艦型',
    translatedName: {
        en: 'BR050 - Standard Bomber',
    },
    type: ShipType.FIGHTER,
    subType: ShipSubType.LARGE_FIGHTER,
    cost: 0,
    weight: 10,
    row: ShipRow.NONE,
    operationLimit: 10,
    source: ShipSource.TECH_FILE,
    manufacturer: Manufacturer.DAWN_ACCORD,
    modules: [
        modules.static({
            id: 'w1',
            name: '機載爆弾投下システム',
            translatedName: {
                en: 'Airborne Bombardment System',
            },
            mainSystem: true,
            skillComplete: false,
            skills: [
                // TODO cost
                strategy.customStrategy({
                    name: '高速魚雷',
                    translatedName: {
                        en: 'High-Speed Torpedo',
                    },
                    description: 'システムの魚雷ランチャーを3ラウンドごとに高速魚雷に換装。そのラウンドに要撃される確率が40%ダウンすし、システム命中時、システムへのダメージが30%アップ',
                    translatedDescription: {
                        en: 'Every 3 round(s), the system\'s torpedo launchers are reloaded with high-speed torpedoes, reducing the chance of being intercepted by 40% and increasing the damage against systems by 35% upon hitting.',
                    },
                }),
                enhancements.increaseDamage().withPercentageValue(10),
                enhancements.increaseDamage().withPercentageValue(10),
                enhancements.increaseSiegeDamage().withPercentageValue(30),
                enhancements.increaseSiegeDamage().withPercentageValue(30),
                enhancements.increaseHitRate().withPercentageValue(10),
                enhancements.reduceCooldown().withPercentageValue(15),
                enhancements.reduceCooldown().withPercentageValue(15),
                enhancements.increaseCriticalDamageAndChance().withPercentageValue(50, 30),
                enhancements.reduceTorpedoInterception().withPercentageValue(30),
            ],
            skillSlots: 6,
        }),
        modules.commandSystem({
            skillComplete: false,
            skillSlots: 1,
            skills: [
                // TODO cost
                enhancements.increaseMaintenanceEfficiency().withPercentageValue(25),
                enhancements.targetReset2(),
                enhancements.reduceLockOn().withPercentageValue(15),
            ],
        }),
        modules.armorSystem({
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseArmor().withAbsoluteValue(3),
                enhancements.increaseArmor().withAbsoluteValue(3),
            ],
            skillSlots: 4,
        }),
        modules.propulsionSystem({
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.reduceFlightTime().withPercentageValue(30),
                enhancements.increaseEvasion().withPercentageValue(8),
                enhancements.reduceLockOn().withPercentageValue(30),
                enhancements.reduceLockOn().withPercentageValue(30),
            ],
            skillSlots: 2,
        }),
    ],
    defaultStats: {
        hp: 5040,
        armor: 2,
        shield: 0,
        speed: 2800,
        warpSpeed: 15000,
        outboundTime: 10,
        inboundTime: 6,
        dpmShip: 3770,
        dpmAntiAir: 0,
        dpmSiege: 1350,
    },
};

const typeB: IShipDefinition = {
    id: ShipId.BR050_B,
    name: 'BR050　Ｂ防御型',
    translatedName: {
        en: 'BR050 - Multi-Role Bomber',
    },
    type: ShipType.FIGHTER,
    subType: ShipSubType.LARGE_FIGHTER,
    cost: 0,
    weight: 10,
    row: ShipRow.NONE,
    operationLimit: 10,
    source: ShipSource.TECH_FILE,
    manufacturer: Manufacturer.DAWN_ACCORD,
    modules: [
        modules.static({
            id: 'w1',
            name: '機載爆弾投下システム',
            translatedName: {
                en: 'Airborne Bombardment System',
            },
            mainSystem: true,
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.increaseDamage().withPercentageValue(10),
                enhancements.increaseDamage().withPercentageValue(10),
                enhancements.increaseSiegeDamage().withPercentageValue(30),
                enhancements.increaseSiegeDamage().withPercentageValue(30),
                enhancements.increaseHitRate().withPercentageValue(10),
                enhancements.reduceCooldown().withPercentageValue(15),
                enhancements.reduceCooldown().withPercentageValue(15),
                enhancements.increaseCriticalDamageAndChance().withPercentageValue(50, 30),
                enhancements.reduceTorpedoInterception().withPercentageValue(30),
            ],
            skillSlots: 5,
        }),
        modules.static({
            id: 'sp1',
            name: '電子防御システム',
            translatedName: {
                en: 'Electronig Defense System',
            },
            effects: [
                enhancements.reduceHitByAircraft().withFixedPercentageValue(25),
            ],
            skillComplete: false,
            skills: [
                // TODO cost
                strategy.customStrategy({
                    name: '干渉強化',
                    translatedName: {
                        en: 'Enhanced Interference',
                    },
                    description: '戦闘開始後60秒間、艦載機による攻撃の自身への命中率がさらに50%ダウン',
                    translatedDescription: {
                        en: 'From the first 60s of battle, further reduces the hit rate of attacks from enemy aircraft against you by 50%.',
                    },
                }),
            ],
            skillSlots: 1,
        }),
        modules.commandSystem({
            skillComplete: false,
            skillSlots: 1,
            skills: [
                // TODO cost
                enhancements.increaseMaintenanceEfficiency().withPercentageValue(25),
                enhancements.targetReset2(),
                enhancements.reduceLockOn().withPercentageValue(15),
            ],
        }),
        modules.armorSystem({
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseArmor().withAbsoluteValue(3),
                enhancements.increaseArmor().withAbsoluteValue(3),
            ],
            skillSlots: 4,
        }),
        modules.propulsionSystem({
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.reduceFlightTime().withPercentageValue(30),
                enhancements.increaseEvasion().withPercentageValue(8),
                enhancements.reduceLockOn().withPercentageValue(30),
                enhancements.reduceLockOn().withPercentageValue(30),
            ],
            skillSlots: 2,
        }),
    ],
    defaultStats: {
        hp: 5040,
        armor: 0,
        shield: 0,
        speed: 2800,
        warpSpeed: 15000,
        outboundTime: 10,
        inboundTime: 6,
        dpmShip: 2514,
        dpmAntiAir: 0,
        dpmSiege: 900,
    },
};

const typeC: IShipDefinition = {
    ...typeA,
    id: ShipId.BR050_C,
    name: 'BR050　Ｃ魚雷型',
    translatedName: {
        en: 'BR050 - Torpedo Bomber',
    },
    type: ShipType.FIGHTER,
    subType: ShipSubType.LARGE_FIGHTER,
    cost: 0,
    weight: 5,
    row: ShipRow.NONE,
    operationLimit: 10,
    source: ShipSource.TECH_FILE,
    manufacturer: Manufacturer.DAWN_ACCORD,
    modules: [
        modules.static({
            id: 'w1',
            name: '試験型特殊魚雷射出システム',
            translatedName: {
                en: 'Experimental Special Torpedo Launching System',
            },
            mainSystem: true,
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.increaseDamage().withPercentageValue(10),
                enhancements.increaseDamage().withPercentageValue(10),
                enhancements.increaseSiegeDamage().withPercentageValue(30),
                enhancements.increaseSiegeDamage().withPercentageValue(30),
                enhancements.increaseHitRate().withPercentageValue(10),
                enhancements.reduceCooldown().withPercentageValue(15),
                enhancements.reduceCooldown().withPercentageValue(15),
                enhancements.reduceDuration().withPercentageValue(15),
                enhancements.reduceTorpedoInterception().withPercentageValue(30),
                enhancements.customEnhancement({
                    name: '特殊魚雷射出',
                    translatedName: {
                        en: 'Special Torpedo Launching',
                    },
                    description: 'システム内の魚雷ランチャーを装甲溶解弾に換装したもの。目標に命中後、15%の確率で目標に装甲溶解状態を付与する。装甲溶解：毎秒80の特殊ダメージを受け、60秒艦持続する。この状態は最大10スタックまで重複し、目標が建物の場合はダメージが75%ダウン',
                    translatedDescription: {
                        en: 'Load the torpedo launcher with armor-melting torpedoes, granting 15% chance to inflict the Armor Melting status on the target upon hitting. Armor Melting: Suffer 80 point(s) of special damage for 60s. This effect can exist up to 10 layer(s). If the target is a building, then the damage is reduced by 75%.',
                    },
                }).withCost(15),
            ],
            skillSlots: 7,
        }),
        modules.commandSystem({
            skillComplete: false,
            skillSlots: 1,
            skills: [
                // TODO cost
                enhancements.increaseMaintenanceEfficiency().withPercentageValue(25),
                enhancements.targetReset2().withCost(5),
                // TODO cost
                enhancements.reduceLockOn().withPercentageValue(15),
            ],
        }),
        modules.armorSystem({
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseHp().withPercentageValue(12),
                enhancements.increaseArmor().withAbsoluteValue(3),
                enhancements.increaseArmor().withAbsoluteValue(3),
            ],
            skillSlots: 4,
        }),
        modules.propulsionSystem({
            skillComplete: false,
            skills: [
                // TODO cost
                enhancements.reduceFlightTime().withPercentageValue(30),
                enhancements.increaseEvasion().withPercentageValue(8),
                enhancements.reduceLockOn().withPercentageValue(30),
                enhancements.reduceLockOn().withPercentageValue(30),
            ],
            skillSlots: 3,
        }),
    ],
    defaultStats: {
        hp: 5040,
        armor: 0,
        shield: 0,
        speed: 2800,
        warpSpeed: 15000,
        outboundTime: 10,
        inboundTime: 6,
        dpmShip: 642,
        dpmAntiAir: 0,
        dpmSiege: 254,
    },
};

export const br050: IShipDefinition[] = [
    {
        ...typeA,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.BR050_B, ShipId.BR050_C],
        relatedShipIds: [ShipId.BR050_A_TE, ShipId.BR050_B_TE, ShipId.BR050_C_TE],
    },
    {
        ...typeB,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.BR050_A,
        relatedShipIds: [ShipId.BR050_A_TE, ShipId.BR050_B_TE, ShipId.BR050_C_TE],
    },
    {
        ...typeC,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.BR050_A,
        relatedShipIds: [ShipId.BR050_A_TE, ShipId.BR050_B_TE, ShipId.BR050_C_TE],
    },
    {
        ...typeA,
        id: ShipId.BR050_A_TE,
        name: 'BR050-TE　Ａ対艦型',
        translatedName: {
            en: 'BR050-TE - Standard Bomber',
        },
        relatedShipIds: [ShipId.BR050_A, ShipId.BR050_B, ShipId.BR050_C, ShipId.BR050_B_TE, ShipId.BR050_C_TE],
        source: ShipSource.CITY_TRADE,
    },
    {
        ...typeB,
        id: ShipId.BR050_B_TE,
        name: 'BR050-TE　Ｂ防御型',
        translatedName: {
            en: 'BR050-TE - Multi-Role Bomber',
        },
        relatedShipIds: [ShipId.BR050_A, ShipId.BR050_B, ShipId.BR050_C, ShipId.BR050_A_TE, ShipId.BR050_C_TE],
        source: ShipSource.CITY_TRADE,
    },
    {
        ...typeC,
        id: ShipId.BR050_C_TE,
        name: 'BR050-TE　Ｃ魚雷型',
        translatedName: {
            en: 'BR050-TE - Torpedo Bomber',
        },
        relatedShipIds: [ShipId.BR050_A, ShipId.BR050_B, ShipId.BR050_C, ShipId.BR050_A_TE, ShipId.BR050_B_TE],
        source: ShipSource.CITY_TRADE,
    },
];
