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

export const mareImbrium: IShipDefinition[] = [
    {
        id: ShipId.MARE_IMBRIUM_A,
        name: 'マーレインブリウム級　Ａ電磁加速砲型',
        translatedName: {
            en: 'Mare Imbrium - Railgun Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.MARE_IMBRIUM_B],
        modules: [
            modules.static({
                id: 'w1',
                name: '艦首電磁加速砲システム',
                translatedName: {
                    en: 'Bow Railgun System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('firepowerAssault').withDescriptionKey('firepowerAssault').withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.customEnhancementWithKey('additionalCharge').withDescriptionKey('additionalCharge').withCost(10),
                ],
                skillSlots: 6,
                dpmShip: 3050,
                dpmAntiAir: 0,
                dpmSiege: 693,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseInterceptionChance().withPercentageValue(2, 2).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 4,
                dpmShip: 80,
                dpmAntiAir: 240,
                dpmSiege: 80,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    // TODO max targetCount
                    flagshipEffect.customFlashipEffectWithKey('guerrillaCombatInsertion').withDescriptionKey('guerrillaCombatInsertion', { targetCount: '5-2' }).withConditionKey('guerrillaCombatInsertion').withDefaultFlag().withCost(40),
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('maneuverOperation').withDescriptionKey('maneuverOperation').withCost(12),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseArmor().withAbsoluteValue(3).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(3).withCost(8),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 14480,
            armor: 5,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 3130,
            dpmAntiAir: 240,
            dpmSiege: 773,
        },
    },
    {
        id: ShipId.MARE_IMBRIUM_B,
        name: 'マーレインブリウム級　Ｂパルス型',
        translatedName: {
            en: 'Mare Imbrium - Pulse Cannon Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.MARE_IMBRIUM_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '「インブリウム」式パルス砲システム',
                translatedName: {
                    en: '"Imbrium" Pulse Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('energySwitching').withDescriptionKey('energySwitching').withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(10),
                ],
                skillSlots: 5,
                dpmShip: 3933,
                dpmAntiAir: 496,
                dpmSiege: 275,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.customFlashipEffectWithKey('guerrillaCombatInsertion').withDescriptionKey('guerrillaCombatInsertion', { targetCount: '5-2' }).withDefaultFlag().withCost(40),
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseHp().withPercentageValue(12).withCost(10),
                    enhancements.increaseArmor().withAbsoluteValue(3).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(3).withCost(8),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                effects: [
                    enhancements.increaseEnergyDamageOfMainSystem().withFixedPercentageValue(15),
                ],
                skillComplete: true,
                skills: [
                    enhancements.increaseEnergyDamageOfMainSystem().withPercentageValue(10).withCost(8),
                ],
                skillSlots: 1,
            }),
        ],
        defaultStats: {
            hp: 14480,
            armor: 5,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 3933,
            dpmAntiAir: 496,
            dpmSiege: 275,
        },
    },
];
