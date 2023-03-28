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
        subModelIds: [ShipId.CAS066_B, ShipId.CAS066_C],
        modules: [
            modules.static({
                id: 'w1',
                name: '重魚雷発射システム',
                translatedName: {
                    en: 'Heavy Torpedo Launching System',
                },
                mainSystem: true,
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
                skills: [
                    strategy.antiAircraftSupport(40, 30, 25).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                    // TODO check increaseLockOnEfficiency after update
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
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
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
        id: ShipId.CAS066_B,
        name: 'CAS066級　Ｂ砲撃型',
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
                // TODO skills
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '防衛砲システム',
                translatedName: {
                    en: 'Defensive Battery System',
                },
                // TODO skills
                skillSlots: 5,
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
            modules.propulsionSystem({
                // TODO skills
                skillSlots: 3,
            }),
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.CAS066_C,
        name: 'CAS066級　Ｃ艦載型',
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
                // TODO skills
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '標準総合砲システム',
                translatedName: {
                    en: 'Standard Integrated Battery System',
                },
                // TODO skills
                skillSlots: 5,
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
            modules.propulsionSystem({
                // TODO skills
                skillSlots: 3,
            }),
            modules.energySystem(),
        ],
    },
];
