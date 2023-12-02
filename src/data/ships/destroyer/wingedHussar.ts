import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';
import { modules } from '../../modules';
import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';

export const wingedHussar: IShipDefinition[] = [
    {
        id: ShipId.WINGED_HUSSAR_A,
        name: 'ウイングドユサール　Ａ対艦型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.WINGED_HUSSAR_B, ShipId.WINGED_HUSSAR_C],
        // defaultStats: {
        //     hp: 22710,
        // },
    },
    {
        id: ShipId.WINGED_HUSSAR_B,
        name: 'ウイングドユサール　Ｂ総合型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.WINGED_HUSSAR_A,
        // defaultStats: {
        //     hp: 22710,
        // },
    },
    {
        id: ShipId.WINGED_HUSSAR_C,
        name: 'ウイングドユサール　Ｃ対空型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.WINGED_HUSSAR_A,
        modules: [
            modules.static({
                id: '4080301',
                name: '「ストーム」ミサイルシステム',
                translatedName: {
                    en: '"Storm" Missile System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(8),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                    enhancements.customEnhancement({
                        name: '高爆弾頭',
                        translatedName: {
                            en: 'High-Explosive Warhead',
                        },
                        description: 'システム内の武器で艦載機目標を攻撃すると、クリティカルダメージが追加で100%アップする',
                        translatedDescription: {
                            en: 'The weapon system will cause an additional 100% Crit Damage when attacking aircraft',
                        },
                    }).withCost(8),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: '4080306',
                name: '状況把握システム',
                translatedName: {
                    en: 'Situational Awareness System',
                },
                skillComplete: true,
                skills: [
                    strategy.informationChain(30).withCost(15),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(20).withCost(10),
                ],
                skillSlots: 2,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.customFlashipEffect({
                        name: '火力較正',
                        translatedName: {
                            en: 'Firing Calibration',
                        },
                        description: '同社の艦船または艦載機搭載の対空武器が+10%の確率で命中した目標に160%の追加ダメージ',
                        translatedDescription: {
                            en: 'The anti-aircraft weapons of our company\'s ships or aircraft have a 10% chance to deal 160% additional damage to the target hit.',
                        },
                    }).withCost(20),
                    flagshipEffect.customFlashipEffect({
                        name: '防空ネットワークI',
                        translatedName: {
                            en: 'Anti-Aircraft Network I',
                        },
                        description: '条件を満たす味方艦隊の艦載機能力が劣っている時、艦隊内の対空能力を持つ武器が艦載機目標を優先攻撃し、命中率が15%アップ。',
                        translatedDescription: {
                            en: 'When the aircraft of fleets that meet the requirements are at a disadvantage, anti-air weapons will attack aircraft first, increasing their Hit Rate by 15%.',
                        },
                        condition: '艦隊に3隻以上の旗艦と同モデルの艦船が必要です',
                        translatedCondition: {
                            en: 'The fleet contains at least 3 ships that are the same type as the flagship.',
                        },
                    }).withCost(30),
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skills: [
                    enhancements.increaseSystemHp().withPercentageValue(10).withCost(10),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseArmor().withAbsoluteValue(8).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(8).withCost(8),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
                    enhancements.increaseSystemHp().withPercentageValue(30).withCost(8),
                ],
                skillSlots: 4,
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
        ],
        defaultStats: {
            hp: 22710,
            armor: 30,
            shield: 5,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 3360,
            dpmAntiAir: 1105,
            dpmSiege: 72,
        },
    },
];
