import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const staticModules: ISystemModule[] = [
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
        ],
        skillSlots: 3,
    }),
    modules.energySystem({
        skillComplete: true,
        skillSlots: 0,
    }),
];

const typeA: IShipDefinition = {
    id: ShipId.KCCPV2_0_A,
    name: 'KCCPV2.0  Ａ総合型',
    translatedName: {
        en: 'KCCPV2.0 - Integrated Type',
    },
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
    relatedShipIds: [ShipId.KCCPV2_0_TE_D],
    modules: [
        modules.static({
            id: 'w1',
            name: '総合投射武器システム',
            translatedName: {
                en: 'Integrated Projectile Weapon System',
            },
            mainSystem: true,
            skillComplete: true,
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
            skillComplete: true,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(6),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(6),
                enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(6),
            ],
            skillSlots: 5,
        }),
        modules.commandSystem({
            flagshipEffects: [
                flagshipEffect.focusFire().withDefaultFlag(),
                flagshipEffect.customFlashipEffectWithKey('targetGuidance1').withDescriptionKey('targetGuidance1Kccpv', { hitrate: 15 }).withConditionKey('targetGuidance1Kccpv').withCost(30),
            ],
            skillComplete: true,
            skillSlots: 1,
        }),
        modules.armorSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                enhancements.increaseShield().withPercentageValue(10).withCost(6),
            ],
            skillSlots: 4,
        }),
        ...staticModules,
    ],
    defaultStats: {
        hp: 52040,
        armor: 50,
        shield: 10,
        speed: 650,
        warpSpeed: 3250,
        dpmShip: 8702,
        dpmAntiAir: 1110,
        dpmSiege: 1965,
    },
};

const typeB: IShipDefinition = {
    id: ShipId.KCCPV2_0_B,
    name: 'KCCPV2.0  Ｂパルス型',
    translatedName: {
        en: 'KCCPV2.0 - Pulse Cannon Type',
    },
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
    relatedShipIds: [ShipId.KCCPV2_0_TE_D],
    modules: [
        modules.static({
            id: 'w1',
            name: '速射パルス砲システム',
            translatedName: {
                en: 'Rapid-Fire Pulse Cannon System',
            },
            skillComplete: true,
            skills: [
                strategy.rapidFire(80, 60, 15, 10).withCost(12),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(8),
                enhancements.increaseInterceptionChance().withPercentageValue(2).withCost(8),
            ],
            skillSlots: 6,
        }),
        modules.static({
            id: 'w2',
            name: '一般投射武器プラットフォーム',
            translatedName: {
                en: 'Generic Projectile Weapon System',
            },
            skillComplete: true,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(6),
                enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(6),
            ],
            skillSlots: 5,
        }),
        modules.static({
            id: 'w3',
            name: '通常砲システム',
            translatedName: {
                en: 'Generic Battery System',
            },
            skillComplete: true,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
            ],
            skillSlots: 4,
        }),
        modules.commandSystem({
            flagshipEffects: [
                flagshipEffect.focusFire().withDefaultFlag(),
                flagshipEffect.customFlashipEffectWithKey('targetGuidance1').withDescriptionKey('targetGuidance1Kccpv', { hitrate: 15 }).withConditionKey('targetGuidance1Kccpv').withCost(30),
            ],
            skillComplete: true,
            skillSlots: 1,
        }),
        modules.armorSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                enhancements.increaseShield().withPercentageValue(10).withCost(6),
            ],
            skillSlots: 4,
        }),
        ...staticModules,
    ],
    defaultStats: {
        hp: 52040,
        armor: 50,
        shield: 10,
        speed: 650,
        warpSpeed: 3250,
        dpmShip: 9064,
        dpmAntiAir: 1020,
        dpmSiege: 734,
    },
};

const typeC: IShipDefinition = {
    id: ShipId.KCCPV2_0_C,
    name: 'KCCPV2.0  Ｃ電磁加速砲型',
    translatedName: {
        en: 'KCCPV2.0 - Railgun Type',
    },
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
    relatedShipIds: [ShipId.KCCPV2_0_TE_D],
    modules: [
        modules.static({
            id: 'w1',
            name: '艦首砲システム',
            translatedName: {
                en: 'Bow-mounted Battery System',
            },
            mainSystem: true,
            skillComplete: true,
            skills: [
                strategy.concentrateFirePeriodically(80, 90, 15).withCost(12),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRate().withPercentageValue(10).withCost(8),
                enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(8),
                enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(8),
                enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(8),
                enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
            ],
            skillSlots: 7,
        }),
        modules.static({
            id: 'w2',
            name: '一般投射武器プラットフォーム',
            translatedName: {
                en: 'Generic Projectile Weapon System',
            },
            skillComplete: true,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(6),
                enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(6),
            ],
            skillSlots: 4,
        }),
        modules.static({
            id: 'w3',
            name: '通常砲システム',
            translatedName: {
                en: 'Generic Battery System',
            },
            skillComplete: true,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
            ],
            skillSlots: 5,
        }),
        modules.commandSystem({
            flagshipEffects: [
                flagshipEffect.focusFire().withDefaultFlag(),
            ],
            skillComplete: true,
            skillSlots: 0,
        }),
        modules.armorSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseHp().withPercentageValue(12).withCost(8),
                enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                enhancements.increaseShield().withPercentageValue(10).withCost(6),
            ],
            skillSlots: 3,
        }),
        ...staticModules,
    ],
    defaultStats: {
        hp: 52040,
        armor: 50,
        shield: 10,
        speed: 650,
        warpSpeed: 3250,
        dpmShip: 9604,
        dpmAntiAir: 1020,
        dpmSiege: 3632,
    },
};

const typeD: IShipDefinition = {
    id: ShipId.KCCPV2_0_D,
    name: 'KCCPV2.0  Ｄ艦載型',
    translatedName: {
        en: 'KCCPV2.0 - Aircraft Type',
    },
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
    relatedShipIds: [ShipId.KCCPV2_0_TE_D],
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
            skillComplete: true,
            skills: [
                strategy.prioritizeTargets().withDescriptionKey('prioritizeCorvettesWithDuration', { duration: 45 }).withCost(12),
                enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(8),
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
            skillComplete: true,
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
            skillComplete: true,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(3),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
            ],
            skillSlots: 5,
        }),
        modules.commandSystem({
            flagshipEffects: [
                flagshipEffect.focusFire().withDefaultFlag(),
            ],
            skillComplete: true,
            skillSlots: 0,
        }),
        modules.armorSystem({
            skillComplete: true,
            skills: [
                enhancements.increaseHp().withPercentageValue(10).withCost(8),
                enhancements.increaseHp().withPercentageValue(10).withCost(8),
                enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                enhancements.increaseShield().withPercentageValue(10).withCost(6),
            ],
            skillSlots: 3,
        }),
        ...staticModules,
    ],
    defaultStats: {
        hp: 52040,
        armor: 50,
        shield: 10,
        speed: 650,
        warpSpeed: 3250,
        dpmShip: 5014,
        dpmAntiAir: 930,
        dpmSiege: 464,
    },
};

export const kccpv2_0: IShipDefinition[] = [
    typeA,
    typeB,
    typeC,
    typeD,
    {
        ...typeD,
        id: ShipId.KCCPV2_0_TE_D,
        name: 'KCCPV2.0-TE  Ｄ艦載型',
        translatedName: {
            en: 'KCCPV2.0 (TE) - Aircraft Type',
        },
        operationLimit: 5,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: undefined,
        researchStrategyTypes: undefined,
        researchTacticTypes: undefined,
        relatedShipIds: [
            ShipId.KCCPV2_0_A,
            ShipId.KCCPV2_0_B,
            ShipId.KCCPV2_0_C,
            ShipId.KCCPV2_0_D,
        ],
        tags: [
            ShipTag.CURRENTLY_UNOBTAINABLE,
        ],
    },
];
