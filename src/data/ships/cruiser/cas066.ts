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

export const cas066: IShipDefinition[] = [
    {
        id: ShipId.CAS066_A,
        name: 'CAS066級　Ａ総合型',
        translatedName: {
            en: 'CAS066 - Integrated Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 12,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.CAS066_B, ShipId.CAS066_C, ShipId.CAS066_D],
        modules: [
            modules.static({
                id: 'w1',
                name: '重魚雷発射システム',
                translatedName: {
                    en: 'Heavy Torpedo Launching System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.rapidFire(80, 60, 15, 10).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(7),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(6),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(7),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(7),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(7),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(7),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '標準総合砲システム',
                translatedName: {
                    en: 'Standard Integrated Battery System',
                },
                skillComplete: true,
                skills: [
                    strategy.antiAircraftSupport(40, 30, 25).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(8),
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
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 4,
            }),
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
        ],
        defaultStats: {
            hp: 71600,
            armor: 50,
            shield: 10,
            speed: 500,
            warpSpeed: 2500,
            dpmShip: 10726,
            dpmAntiAir: 432,
            dpmSiege: 3299,
        },
    },
    {
        id: ShipId.CAS066_B,
        name: 'CAS066級　Ｂ砲撃型',
        translatedName: {
            en: 'CAS066 - Artillery Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CAS066_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '「ロングアーム」電磁加速砲システム',
                translatedName: {
                    en: '"Long Arm" Railgun System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.lightAmmo(30, 50, 40).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                    enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                    enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(30, 50).withCost(8),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '防衛砲システム',
                translatedName: {
                    en: 'Defensive Battery System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(4),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(4),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(4),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(4),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(4),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(4),
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
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 4,
            }),
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
        ],
        defaultStats: {
            hp: 63340,
            armor: 50,
            shield: 10,
            speed: 500,
            warpSpeed: 2500,
            dpmShip: 15103,
            dpmAntiAir: 378,
            dpmSiege: 6423,
        },
    },
    {
        id: ShipId.CAS066_C,
        name: 'CAS066級　Ｃ艦載型',
        translatedName: {
            en: 'CAS066 - Aircraft Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [],
        researchTacticTypes: [],
        baseModelId: ShipId.CAS066_A,
        carryCorvette: 2,
        modules: [
            modules.static({
                id: 'w1',
                name: '護送艦保守システム',
                translatedName: {
                    en: 'Corvette Maintenance System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(8),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(8),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(8),
                    enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(8),
                    enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(8),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '標準総合砲システム',
                translatedName: {
                    en: 'Standard Integrated Battery System',
                },
                skillComplete: true,
                skills: [
                    strategy.antiAircraftSupport(40, 30, 25).withCost(12),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(6),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(6),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 6,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.strategicStrike2(120).withCost(40),
                ],
                skillComplete: true,
                skills: [
                    // TODO verify cost & max value
                    enhancements.reduceDamageReceivedBySystem().withAbsoluteValue(5).withCost(10),
                ],
                skillSlots: 2,
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
        ],
        defaultStats: {
            hp: 66400,
            armor: 50,
            shield: 10,
            speed: 500,
            warpSpeed: 2500,
            dpmShip: 3975,
            dpmAntiAir: 432,
            dpmSiege: 724,
        },
    },
    {
        id: ShipId.CAS066_D,
        name: 'CAS066級　D支援型',
        translatedName: {
            en: 'CAS066 - Support Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.CAS066_A,
        modules: [
            modules.static({
                id: 'sp1',
                name: 'UAV補修システム',
                translatedName: {
                    en: 'UAV Maintenance System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.speedUpRepair(40, 30).withCost(15),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10).withCost(10),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10).withCost(10),
                    enhancements.increaseRepairEffectiveness().withPercentageValue(10).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(50).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '標準総合砲システム',
                translatedName: {
                    en: 'Standard Integrated Battery System',
                },
                skillComplete: true,
                skills: [
                    strategy.antiAircraftSupport(40, 30, 25).withCost(12),
                    enhancements.increaseDamage().withPercentageValue(12).withCost(6),
                    enhancements.increaseDamage().withPercentageValue(12).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(18).withCost(6),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(18).withCost(6),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(6)
                ],
                skillSlots: 6,
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
                    // TODO verify 16 or 12
                    enhancements.increaseHp().withPercentageValue(16).withCost(8),
                    enhancements.increaseHp().withPercentageValue(16).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    // TODO verify 12 or 10
                    enhancements.increaseShield().withPercentageValue(12).withCost(6),
                ],
                skillSlots: 4,
            }),
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
        ],
        defaultStats: {
            hp: 66400,
            armor: 50,
            shield: 10,
            speed: 500,
            warpSpeed: 2500,
            dpmShip: 3975,
            dpmAntiAir: 432,
            dpmSiege: 724,
        },
    },
];
