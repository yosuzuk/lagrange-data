import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const sharedModules = [
    modules.static({
        id: '3040202',
        name: '通常砲システム',
        translatedName: {
            en: 'Generic Battery System',
        },
        skillComplete: true,
        skills: [
            enhancements.increaseDamage().withPercentageValue(10).withCost(3),
            enhancements.increaseDamage().withPercentageValue(10).withCost(3),
            enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
            enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
            enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
        ],
        skillSlots: 4,
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
            enhancements.increaseHp().withPercentageValue(12).withCost(10),
            enhancements.increaseArmor().withAbsoluteValue(3).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(3).withCost(8),
            enhancements.reduceCritialDamageReceivedMainSystem().withPercentageValue(30).withCost(8),
        ],
        skillSlots: 4,
    }),
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
        ],
        skillSlots: 2,
    }),
    modules.energySystem({
        skillComplete: true,
        skillSlots: 0,
    }),
];

export const xenoStinger: IShipDefinition[] = [
    {
        id: ShipId.XENO_STINGER_A,
        name: 'ゼノスティンガー級　Ａ特殊型',
        translatedName: {
            en: 'XenoStinger - Special Type',
        },
        type: ShipType.FRIGATE,
        cost: 8,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [],
        subModelIds: [ShipId.XENO_STINGER_B],
        modules: [
            modules.static({
                id: '3040101',
                name: '「スティンガー」UAV攻撃システム',
                translatedName: {
                    en: '"Stinger" UAV Attack System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(12),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(12),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(12),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(12),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(12),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(12),
                    strategy.prioritizeTargets().withDescriptionKey('superCapitalStrike', { duration: 25 }).withCost(18),
                ],
                skillSlots: 5,
            }),
            ...sharedModules,
        ],
        defaultStats: {
            hp: 10530,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 5840,
            dpmAntiAir: 86,
            dpmSiege: 1148,
        },
    },
    {
        id: ShipId.XENO_STINGER_B,
        name: 'ゼノスティンガー級　Ｂ対空型',
        translatedName: {
            en: 'XenoStinger - Anti-Aircraft Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.XENO_STINGER_A,
        modules: [
            modules.static({
                id: '3040201',
                name: '「スティンガー」UAV防衛システム',
                translatedName: {
                    en: '"Stinger" UAV Defense System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(12),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(12),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(12),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(12),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(12),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(12),
                    strategy.prioritizeTargets().withDescriptionKey('prioritizeCorvettesWithDuration', { duration: 25 }).withCost(18),
                ],
                skillSlots: 5,
            }),
            ...sharedModules,
        ],
        defaultStats: {
            hp: 10530,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 240,
            dpmAntiAir: 2426,
            dpmSiege: 28,
        },
    },
];
