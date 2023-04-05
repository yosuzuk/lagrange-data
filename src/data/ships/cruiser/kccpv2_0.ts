import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const staticModules: ISystemModule[] = [
    modules.propulsionSystem({
        skills: [
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
        ],
        skillSlots: 3,
    }),
    modules.energySystem(),
];

export const kccpv2_0: IShipDefinition[] = [
    {
        id: ShipId.KCCPV2_0_A,
        name: 'KCCPV2.0  Ａ総合型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 12,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.KCCPV2_0_B, ShipId.KCCPV2_0_C, ShipId.KCCPV2_0_D],
        modules: [
            modules.static({
                id: 'w1',
                name: '総合投射武器システム',
                translatedName: {
                    en: 'Integrated Projectile Weapon System',
                },
                mainSystem: true,
                skills: [
                    strategy.concentrateFirePeriodically(80, 90, 15).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(8),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(8),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(8),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(8),
                    enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(6),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(6),
                    // TODO increaseLockOnEfficiency after update
                ],
                skillSlots: 4, // TODO 5 after update
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.customFlashipEffect('targetGuidance1').withDescriptionKey('targetGuidance1Kccpv', { hitrate: 15 }).withConditionKey('targetGuidance1Kccpv').withCost(30),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 4,
            }),
            ...staticModules,
        ],
        // defaultStats: {
        //     hp: 52040,
        // },
    },
    {
        id: ShipId.KCCPV2_0_B,
        name: 'KCCPV2.0  Ｂパルス型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.KCCPV2_0_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '速射パルス砲システム',
                translatedName: {
                    en: '',
                },
                skills: [
                    strategy.rapidFire(80, 60, 15, 10).withCost(12),
                    // TODO cost
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.reduceCooldown().withPercentageValue(14.8),
                    enhancements.reduceCooldown().withPercentageValue(14.8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(14.8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(14.8),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(14.8),
                    enhancements.increaseInterceptionChance().withPercentageValue(2),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '一般投射武器プラットフォーム',
                translatedName: {
                    en: 'Generic Projectile Weapon System',
                },
                skills: [
                    // TODO cost
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.increaseDamage().withPercentageValue(10),
                    enhancements.reduceCooldown().withPercentageValue(14.8),
                    enhancements.reduceCooldown().withPercentageValue(14.8),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10),
                ],
                skillSlots: 4,
            }),
            modules.static({
                id: 'w3',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    // TODO increaseLockOnEfficiency after update
                ],
                skillSlots: 4, // TODO 5 after update
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.customFlashipEffect('targetGuidance1').withDescriptionKey('targetGuidance1Kccpv', { hitrate: 15 }).withConditionKey('targetGuidance1Kccpv').withCost(30),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 4,
            }),
            ...staticModules,
        ],
        // defaultStats: {
        //     hp: 52040,
        // },
    },
    {
        id: ShipId.KCCPV2_0_C,
        name: 'KCCPV2.0  Ｃ電磁加速砲型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.KCCPV2_0_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '艦首砲システム',
                translatedName: {
                    en: 'Bow-mounted Battery System',
                },
                mainSystem: true,
                // TODO skills
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '一般投射武器プラットフォーム',
                translatedName: {
                    en: 'Generic Projectile Weapon System',
                },
                // TODO skills
                skillSlots: 4,
            }),
            modules.static({
                id: 'w3',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                // TODO skills
                skillSlots: 4,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
            }),
            modules.armorSystem({
                // TODO skills
                skillSlots: 4,
            }),
            ...staticModules,
        ],
        // defaultStats: {
        //     hp: 52040,
        // },
    },
    {
        id: ShipId.KCCPV2_0_D,
        name: 'KCCPV2.0  Ｄ艦載型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 12,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [],
        researchTacticTypes: [],
        baseModelId: ShipId.KCCPV2_0_A,
        carryFighter: 2,
        carryFighterType: ShipSubType.LARGE_FIGHTER,
        modules: [
            modules.static({
                id: 'sp1',
                name: '戦闘機搭載システム',
                translatedName: {
                    en: 'Aircraft Loading System',
                },
                mainSystem: true,
                skills: [
                    strategy.prioritizeTargets().withDescriptionKey('prioritizeCorvettesWithDuration', { duration: 45 }).withCost(12),
                    enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(8), // TODO reduceFlightTimeAndCooldownOfPrimaryWeapon after update
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
                    enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(8),
                    enhancements.increaseSiegeDamageOfAircraft().withPercentageValue(14.8).withCost(8),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w1',
                name: '一般投射武器プラットフォーム',
                translatedName: {
                    en: 'Generic Projectile Weapon System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(6),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                ],
                skillSlots: 4,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    // TODO increaseLockOnEfficiency after update
                ],
                skillSlots: 4, // TODO 5 after update
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
            }),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 3,
            }),
            ...staticModules,
        ],
        // defaultStats: {
        //     hp: 52040,
        // },
    },
];
