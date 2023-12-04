import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const mareTranquillitatis: IShipDefinition[] = [
    {
        id: ShipId.MARE_TRANQUILLITATIS_A,
        name: 'マーレトランキリタティス級　Ａ総合型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.MARE_TRANQUILLITATIS_B, ShipId.MARE_TRANQUILLITATIS_C],
        defaultStats: {
            hp: 12360,
            armor: 5,
            shield: 0,
            speed: 1000,
            warpSpeed: 5000,
            dpmShip: 1896,
            dpmAntiAir: 811,
            dpmSiege: 328,
        },
    },
    {
        id: ShipId.MARE_TRANQUILLITATIS_B,
        name: 'マーレトランキリタティス級　Ｂパルス型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.MARE_TRANQUILLITATIS_A,
        modules: [
            modules.static({
                id: '3020201',
                name: '防衛パルス砲システム',
                translatedName: {
                    en: 'Defensive Pulse Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '対空集中砲火',
                        translatedName: {
                            en: 'Focus Fire on Aircraft',
                        },
                        description: '30秒ごとに、すべての武器が同列の範囲内に接近する敵機をロックオンして攻撃する。武器の冷却時間が4%ダウンする。効果は25秒続く。',
                        translatedDescription: {
                            en: 'Syncs all weapon systems to lock onto and attack aircraft in the nearby row and reduces Cooldown by 4% every 30s for 25s.',
                        },
                    }).withCost(8),
                    strategy.customStrategy({
                        name: '精密射撃',
                        translatedName: {
                            en: 'Precision Firing',
                        },
                        description: '戦闘開始後60秒以内に、このシステムのパルス対空武器の対空命中率が20%アップする',
                        translatedDescription: {
                            en: 'Increases the Hit Rate of the system\'s pulse anti-aircraft weapons by 20% for 60 seconds after the battle starts',
                        },
                    }).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: '3020202',
                name: '「エターナル ポラリス」投射システム',
                translatedName: {
                    en: '"Eternal Polaris" Projectile Launching System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(8),
                ],
                skillSlots: 8,
            }),
            modules.commandSystem({
                skillComplete: true,
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseShield().withPercentageValue(10).withCost(8),
                    enhancements.increaseShield().withPercentageValue(10).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                    enhancements.customEnhancement({
                        name: '艦船回避戦略',
                        translatedName: {
                            en: 'Ship Evasion Stance',
                        },
                        description: '艦船が後列へ移動する。',
                        translatedDescription: {
                            en: 'Changes ship position to the back row of your formation',
                        },
                    }).withCost(6),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 12360,
            armor: 5,
            shield: 0,
            speed: 1000,
            warpSpeed: 5000,
            dpmShip: 1125,
            dpmAntiAir: 1126,
            dpmSiege: 148,
        },
    },
    {
        id: ShipId.MARE_TRANQUILLITATIS_C,
        name: 'マーレトランキリタティス級　Ｃ対空型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.MARE_TRANQUILLITATIS_A,
        modules: [
            modules.static({
                id: '3020301',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '対空集中砲火',
                        translatedName: {
                            en: 'Focus Fire on Aircraft',
                        },
                        description: '30秒ごとに、すべての武器が同列の範囲内に接近する敵機をロックオンして攻撃する。武器の冷却時間が4%ダウンする。効果は25秒続く。',
                        translatedDescription: {
                            en: 'Syncs all weapon systems to lock onto and attack aircraft in the nearby row and reduces Cooldown by 4% every 30s for 25s.',
                        },
                    }).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseInterceptionChance().withPercentageValue(2).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: '3020302',
                name: '「エターナル ポラリス」投射システム',
                translatedName: {
                    en: '"Eternal Polaris" Projectile Launching System',
                },
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '戦闘準備警報',
                        translatedName: {
                            en: 'Preparation Warning',
                        },
                        description: '戦闘開始後60秒以内に、このシステムの対空武器のロックオン効率が20%アップする',
                        translatedDescription: {
                            en: 'Increases the Lock-On Efficiency of this system\'s anti-aircraft weapons by 20% for 60 seconds after the battle starts',
                        },
                    }).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                    enhancements.increaseInterceptionChance().withPercentageValue(25).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(8),
                    enhancements.customEnhancement({
                        name: '防空範囲拡大',
                        translatedName: {
                            en: 'Anti-Aircraft Coverage Expansion',
                        },
                        description: '武器の防空範囲が同列の艦船まで拡張する。',
                        translatedDescription: {
                            en: 'Expands the weapon\'s anti-aircraft coverage to the same-row ships',
                        },
                    }).withCost(5),
                ],
                skillSlots: 8,
            }),
            modules.commandSystem({
                skillComplete: true,
                flagshipEffects: [
                    flagshipEffect.customFlashipEffect({
                        name: '高速切替',
                        translatedName: {
                            en: 'Fast Switching',
                        },
                        description: '同社の艦船搭載の対空武器の冷却時間が6%ダウンし、同社の対空艦載機の飛行時間と対空武器の冷却時間が6%ダウンする。',
                        translatedDescription: {
                            en: 'The CD of all anti-aircraft weapons of our company\'s ships is reduced by 6%. The flight time and the CD of anti-aircraft weapons of our company\'s aircraft are reduced by 6%.',
                        },
                    }).withCost(20),
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skills: [
                    enhancements.increaseSystemHp().withPercentageValue(10).withCost(10),
                ],
                skillSlots: 2,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseShield().withPercentageValue(10).withCost(8),
                    enhancements.increaseShield().withPercentageValue(10).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '艦船回避戦略',
                        translatedName: {
                            en: 'Ship Evasion Stance',
                        },
                        description: '艦船が後列へ移動する。',
                        translatedDescription: {
                            en: 'Changes ship position to the back row of your formation',
                        },
                    }).withCost(6),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 12360,
            armor: 5,
            shield: 0,
            speed: 1000,
            warpSpeed: 5000,
            dpmShip: 535,
            dpmAntiAir: 944,
            dpmSiege: 120,
        },
    },
];
