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
        carryCorvette: 4,
        modules: [
            modules.static({
                id: 'w1',
                name: '複合砲システム',
                translatedName: {
                    en: 'Integrated Battery System',
                },
                mainSystem: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    // TODO check increaseLockOnEfficiency after update
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
                skills: [
                    strategy.prioritizeTargets(35).withCost(15),
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(10),
                    enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(10), // TODO reduceFlightTimeAndCooldownOfPrimaryWeapon after update
                    enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(10), // TODO reduceFlightTimeAndCooldownOfPrimaryWeapon after update
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
                skills: [
                    enhancements.customEnhancement('multiTargetAttack').withDescriptionKey('multiTargetAttack', { targetCount: 2 }).withCost(40),
                    enhancements.customEnhancement('auxiliaryAttackRadar').withDescriptionKey('auxiliaryAttackRadar', { hitrate: 8 }).withCost(40),
                ],
                skillSlots: 2,
            }),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
                ],
                skillSlots: 4,
            }),
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
        ],
    },
    {
        id: ShipId.JAEGER_B,
        name: 'イエーガー級　Ｂ対艦型',
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
                // TODO skills
                skillSlots: 6,
            }),
            modules.static({
                id: 'w1',
                name: '複合砲システム',
                translatedName: {
                    en: 'Integrated Battery System',
                },
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
                // TODO skills
                skillSlots: 1,
            }),
            modules.armorSystem({
                // TODO skills
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                // TODO skill
                skillSlots: 3,
            }),
            modules.energySystem(),
        ],
    },
];
