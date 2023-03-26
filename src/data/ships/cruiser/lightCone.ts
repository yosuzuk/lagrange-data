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
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(2),
        // TODO increaseLockOnEfficiency after update
    ],
    skillSlots: 4,
});

const armorSystem = modules.armorSystem({
    skills: [
        enhancements.increaseHp().withPercentageValue(10).withCost(6),
        enhancements.increaseHp().withPercentageValue(10).withCost(6),
        enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
        enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
    ],
    skillSlots: 3,
});

export const lightCone: IShipDefinition[] = [
    {
        id: ShipId.LIGHT_CONE_A,
        name: 'ライトコーン級　Ａ一般型',
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
                    // TODO increaseLockOnEfficiency after update
                ],
                skillSlots: 6,
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
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
                    enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(6),
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
                skills: [
                    strategy.informationChain(30).withCost(12),
                ],
                skillSlots: 1,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
            }),
            armorSystem,
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
        id: ShipId.LIGHT_CONE_B,
        name: 'ライトコーン級　Ｂ対空型',
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
        relatedShipIds: [ShipId.LIGHT_CONE_C, ShipId.LIGHT_CONE_TE_A_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '「トロッコ」投射装置群',
                translatedName: {
                    en: '"Minecart" Projectile Launching Array',
                },
                mainSystem: true,
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
                    // TODO increaseLockOnEfficiency after update
                ],
                skillSlots: 6,
            }),
            defensiveBatterySystem,
            modules.static({
                id: 'sp1',
                name: '「ツンドラ」要撃UAVシステム',
                translatedName: {
                    en: '"Tundra" Interceptor UAV System',
                },
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
                    enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(6),
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
                skills: [
                    strategy.informationChain(30).withCost(12),
                ],
                skillSlots: 1,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
            }),
            armorSystem,
            modules.propulsionSystem({
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                    enhancements.activeAntiMissileInterception(5, 6).withCost(12),
                ],
                skillSlots: 4,
            }),
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.LIGHT_CONE_C,
        name: 'ライトコーン級　Ｃ突撃型',
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
        relatedShipIds: [ShipId.LIGHT_CONE_B, ShipId.LIGHT_CONE_TE_A_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '「トロッコ」投射装置群',
                translatedName: {
                    en: '"Minecart" Projectile Launching Array',
                },
                mainSystem: true,
                // TODO skills
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                // TODO skills
                skillSlots: 4,
            }),
            modules.static({
                id: 'sp1',
                name: '「ツンドラ」支援UAVシステム',
                translatedName: {
                    en: '"Tundra" Support UAV System',
                },
                // TODO skills
                skillSlots: 3,
            }),
            modules.static({
                id: 'sp2',
                name: '警報システム',
                translatedName: {
                    en: 'Warning System',
                },
                // TODO effects
                skills: [
                    strategy.informationChain(30),
                ],
                skillSlots: 1,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
            }),
            modules.armorSystem({
                // TODO skills
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                // TODO skills
                skillSlots: 3,
            }),
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.LIGHT_CONE_TE_A_S,
        name: 'ライトコーン級-TE　Ａ一般型（回収）',
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
