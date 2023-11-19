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

const defensiveBatterySystem = modules.static({
    id: 'w2',
    name: '防衛砲システム',
    translatedName: {
        en: 'Defensive Battery System',
    },
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(2),
        enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(2),
    ],
    skillSlots: 5,
});

const armorSystem = modules.armorSystem({
    skillComplete: true,
    skills: [
        enhancements.increaseHp().withPercentageValue(12).withCost(8),
        enhancements.increaseHp().withPercentageValue(12).withCost(8),
        enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
        enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
    ],
    skillSlots: 3,
});

const propulsionSystem = modules.propulsionSystem({
    skillComplete: true,
    skills: [
        enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
        enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
        enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
        enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
    ],
    skillSlots: 3,
});

export const lightCone: IShipDefinition[] = [
    {
        id: ShipId.LIGHT_CONE_A,
        name: 'ライトコーン級　Ａ一般型',
        translatedName: {
            en: 'Light Cone - Generic Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.LIGHT_CONE_B, ShipId.LIGHT_CONE_C],
        relatedShipIds: [ShipId.LIGHT_CONE_TE_A_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '「トロッコ」投射装置群',
                translatedName: {
                    en: '"Minecart" Projectile Launching Array',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(7),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(7),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(7),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(7),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(7),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(7),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(7),
                ],
                skillSlots: 7,
            }),
            defensiveBatterySystem,
            modules.static({
                id: 'sp1',
                name: '「ツンドラ」対空UAVシステム',
                translatedName: {
                    en: '"Tundra" Anti-Aircraft UAV System',
                },
                flagshipEffects: [
                    flagshipEffect.antiAircraftNetwork2().withCost(40),
                ],
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
                    enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.static({
                id: 'sp2',
                name: '警報システム',
                translatedName: {
                    en: 'Warning System',
                },
                effects: [
                    enhancements.reduceHitByMissile().withFixedPercentageValue(30),
                ],
                skillComplete: true,
                skills: [
                    strategy.informationChain(30).withCost(12),
                ],
                skillSlots: 1,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            armorSystem,
            propulsionSystem,
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 69570,
            armor: 50,
            shield: 10,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 12471,
            dpmAntiAir: 6359,
            dpmSiege: 1072,
        },
    },
    {
        id: ShipId.LIGHT_CONE_B,
        name: 'ライトコーン級　Ｂ対空型',
        translatedName: {
            en: 'Light Cone - Anti-Aircraft Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.LIGHT_CONE_A,
        relatedShipIds: [ShipId.LIGHT_CONE_TE_A_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '「トロッコ」投射装置群',
                translatedName: {
                    en: '"Minecart" Projectile Launching Array',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(6),
                    enhancements.increaseInterceptionChance().withPercentageValue(25).withCost(6),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(6),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(6),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
                    enhancements.reducePreTargetTime().withAbsoluteValue(1).withUnit('seconds').withCost(6),
                    enhancements.customEnhancement('spreadOutWarhead2').withDescriptionKey('spreadOutWarhead2').withCost(6),
                ],
                skillSlots: 8,
            }),
            defensiveBatterySystem,
            modules.static({
                id: 'sp1',
                name: '「ツンドラ」要撃UAVシステム',
                translatedName: {
                    en: '"Tundra" Interceptor UAV System',
                },
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
                    enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.missileTrackingRadar(5).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.static({
                id: 'sp2',
                name: '警報システム',
                translatedName: {
                    en: 'Warning System',
                },
                effects: [
                    enhancements.reduceHitByMissile().withFixedPercentageValue(30),
                ],
                skillComplete: true,
                skills: [
                    strategy.informationChain(30).withCost(12),
                ],
                skillSlots: 1,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            armorSystem,
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                    enhancements.activeAntiMissileInterception(5, 6).withCost(12),
                ],
                skillSlots: 4,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 69570,
            armor: 50,
            shield: 10,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 5850,
            dpmAntiAir: 6930,
            dpmSiege: 570,
        },
    },
    {
        id: ShipId.LIGHT_CONE_C,
        name: 'ライトコーン級　Ｃ突撃型',
        translatedName: {
            en: 'Light Cone - Assault Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.LIGHT_CONE_A,
        relatedShipIds: [ShipId.LIGHT_CONE_TE_A_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '「トロッコ」投射装置群',
                translatedName: {
                    en: '"Minecart" Projectile Launching Array',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('heavyAmmo').withDescriptionKey('heavyAmmoWithInterval', { damage: 60, durationUp: 30, duration: 30, cooldown: 30 }).withCost(15),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(8),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(8),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(8),
                ],
                skillSlots: 6,
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
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 5,
            }),
            modules.static({
                id: 'sp1',
                name: '「ツンドラ」支援UAVシステム',
                translatedName: {
                    en: '"Tundra" Support UAV System',
                },
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.static({
                id: 'sp2',
                name: '警報システム',
                translatedName: {
                    en: 'Warning System',
                },
                effects: [
                    enhancements.reduceHitByMissile().withFixedPercentageValue(30),
                ],
                skillComplete: true,
                skills: [
                    strategy.informationChain(30).withCost(12),
                ],
                skillSlots: 1,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            armorSystem,
            propulsionSystem,
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 69570,
            armor: 50,
            shield: 10,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 13500,
            dpmAntiAir: 236,
            dpmSiege: 1372,
        },
    },
    {
        id: ShipId.LIGHT_CONE_TE_A_S,
        name: 'ライトコーン級-TE　Ａ一般型（回収）',
        translatedName: {
            en: 'Light Cone (TE) - Generic Type (salvaged)',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.LIGHT_CONE_A, ShipId.LIGHT_CONE_B, ShipId.LIGHT_CONE_C],
    },
];
