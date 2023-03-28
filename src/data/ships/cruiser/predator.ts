import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const defensiveBatterySystem = modules.static({
    id: 'w2',
    name: '防衛砲システム',
    translatedName: {
        en: 'Defensive Battery System',
    },
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(3),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
        // TODO increaseLockOnEfficiency after update
    ],
    skillSlots: 4, // TODO 5 after update
});

const aircraftLoadingSystem = modules.static({
    id: 'sp1',
    name: '戦闘機搭載システム',
    translatedName: {
        en: 'Aircraft Loading System',
    },
    skills: [
        strategy.prioritizeTargets().withDescriptionKey('prioritizeCarriersWithDuration', { duration: 35 }).withCost(15),
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(10),
        enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(10), // TODO reduceFlightTimeAndCooldownOfPrimaryWeapon after update
        enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(10), // TODO reduceFlightTimeAndCooldownOfPrimaryWeapon after update
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(10),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(10),
    ],
    skillSlots: 5,
});

const armorSystem = modules.armorSystem({
    skills: [
        enhancements.increaseHp().withPercentageValue(10).withCost(6),
        enhancements.increaseHp().withPercentageValue(10).withCost(6),
        enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
        enhancements.increaseShield().withPercentageValue(10).withCost(6),
        enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
    ],
    skillSlots: 4,
});

const propulsionSystem = modules.propulsionSystem({
    skills: [
        enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
        enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
        enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
        enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
    ],
    skillSlots: 3,
});

export const predator: IShipDefinition[] = [
    {
        id: ShipId.PREDATOR_A,
        name: 'プレデター級　Ａ一般型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        subModelIds: [ShipId.PREDATOR_B, ShipId.PREDATOR_C],
        carryFighter: 4,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
        modules: [
            modules.static({
                id: 'w1',
                name: '投射武器システム',
                translatedName: {
                    en: 'Projectile Weapon System',
                },
                mainSystem: true,
                skills: [
                    strategy.antiAircraftSupport(40, 30, 25).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    // TODO increaseLockOnEfficiency after update
                ],
                skillSlots: 5, // TODO 6 after update
            }),
            defensiveBatterySystem,
            aircraftLoadingSystem,
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.strategicStrike2(120).withCost(40),
                ],
                skills: [
                    enhancements.customEnhancement('rangeExtension').withDescriptionKey('rangeExtension', { radius: '10.0' }).withCost(40),
                ],
                skillSlots: 2,
            }),
            armorSystem,
            propulsionSystem,
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.PREDATOR_B,
        name: 'プレデター級　Ｂ戦術型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.PREDATOR_A,
        carryFighter: 4,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
        modules: [
            modules.static({
                id: 'sp2',
                name: '通信指令システム',
                translatedName: {
                    en: 'Information Command System',
                },
                mainSystem: true,
                skills: [
                    strategy.prioritizeSupport(30).withCost(8),
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(5),
                    enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(5), // TODO reduceFlightTimeAndCooldownOfPrimaryWeapon after update
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(5),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(5),
                ],
                skillSlots: 4, // TODO 5 after update
            }),
            defensiveBatterySystem,
            aircraftLoadingSystem,
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.strategicStrike2(120).withCost(40),
                ],
                // TODO skills
                skillSlots: 2,
            }),
            armorSystem,
            propulsionSystem,
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.PREDATOR_C,
        name: 'プレデター級　Ｃ対空型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.PREDATOR_A,
        carryFighter: 4,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
        modules: [
            modules.static({
                id: 'w1',
                name: '対空ミサイルシステム',
                translatedName: {
                    en: 'Anti-Aircraft Missile System',
                },
                mainSystem: true,
                // TODO skills
                skillSlots: 6, // TODO 7 after update
            }),
            defensiveBatterySystem,
            aircraftLoadingSystem,
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    // TODO cost
                    flagshipEffect.antiAircraftNetwork1(5),
                ],
                // TODO skills
                skillSlots: 2,
            }),
            modules.armorSystem(),
            modules.propulsionSystem(),
            modules.energySystem(),
        ],
    },
];
