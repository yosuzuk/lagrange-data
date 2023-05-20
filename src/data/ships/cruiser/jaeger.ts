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

export const jaeger: IShipDefinition[] = [
    {
        id: ShipId.JAEGER_A,
        name: 'イエーガー級　Ａ支援型',
        translatedName: {
            en: 'Jaeger - Support Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        subModelIds: [ShipId.JAEGER_B],
        modules: [
            modules.static({
                id: 'w1',
                name: '複合砲システム',
                translatedName: {
                    en: 'Integrated Battery System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 5,
            }),
            modules.static({
                id: 'w2',
                name: '護送艦搭載システム',
                translatedName: {
                    en: 'Corvette Loading System',
                },
                carryCorvette: 4,
                skillComplete: true,
                skills: [
                    strategy.prioritizeTargets().withDescriptionKey('superCapitalStrike', { duration: 25 }).withCost(15),
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
                    enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 5,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.strategicStrike2(120).withCost(40),
                ],
                skillComplete: true,
                skills: [
                    enhancements.customEnhancement('multiTargetAttack').withDescriptionKey('multiTargetAttack', { targetCount: 2 }).withCost(40),
                    enhancements.customEnhancement('auxiliaryAttackRadar').withDescriptionKey('auxiliaryAttackRadar', { hitrate: 8 }).withCost(40),
                ],
                skillSlots: 2,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
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
            hp: 76190,
            armor: 50,
            shield: 10,
            speed: 500,
            warpSpeed: 2500,
            dpmShip: 3000,
            dpmAntiAir: 535,
            dpmSiege: 273,
        },
    },
    {
        id: ShipId.JAEGER_B,
        name: 'イエーガー級　Ｂ対艦型',
        translatedName: {
            en: 'Jaeger - Anti-Ship Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.JAEGER_A,
        modules: [
            modules.static({
                id: 'w2',
                name: '艦首武器システム',
                translatedName: {
                    en: 'Bow-mounted Weapon System',
                },
                mainSystem: true,
                skillComplete: false,
                // TODO skills
                skillSlots: 6,
            }),
            modules.static({
                id: 'w1',
                name: '複合砲システム',
                translatedName: {
                    en: 'Integrated Battery System',
                },
                skillComplete: false,
                // TODO skills
                // skills: [
                // enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                // enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                // enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                // enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
                // enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                // TODO check increaseLockOnEfficiency after update
                // ],
                skillSlots: 5,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: false,
                // TODO skills
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: false,
                // TODO skills
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: false,
                // TODO skill
                skillSlots: 3,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 76190,
            armor: 50,
            shield: 10,
            speed: 500,
            warpSpeed: 2500,
            dpmShip: 7971,
            dpmAntiAir: 535,
            dpmSiege: 1147,
        }
    },
];
