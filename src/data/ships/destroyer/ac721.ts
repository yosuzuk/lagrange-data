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

export const ac721: IShipDefinition[] = [
    {
        id: ShipId.AC721_A,
        name: 'AC721　Ａ一般型',
        translatedName: {
            en: 'AC721 - Generic Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.AC721_B, ShipId.AC721_D],
        relatedShipIds: [ShipId.AC721_TE_A, ShipId.AC721_TE_D_S_LEVI9],
        defaultStats: {
            hp: 34140,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 1800,
            dpmAntiAir: 390,
            dpmSiege: 408,
        },
    },
    {
        id: ShipId.AC721_B,
        name: 'AC721　Ｂミサイル型',
        translatedName: {
            en: 'AC721 - Missile Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.AC721_A,
        relatedShipIds: [ShipId.AC721_TE_A, ShipId.AC721_TE_D_S_LEVI9],
        defaultStats: {
            hp: 34140,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 3300,
            dpmAntiAir: 780,
            dpmSiege: 345,
        },
    },
    {
        id: ShipId.AC721_D,
        name: 'AC721　Ｄ艦載型',
        translatedName: {
            en: 'AC721 - Aircraft Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.AC721_A,
        relatedShipIds: [ShipId.AC721_TE_A, ShipId.AC721_TE_D_S_LEVI9],
        modules: [
            modules.static({
                id: '4010401',
                name: '護送艦保守システム',
                translatedName: {
                    en: 'Corvette Maintenance System',
                },
                mainSystem: true,
                carryCorvette: 2,
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(10),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                ],
                skillSlots: 4,
            }),
            modules.static({
                id: '4010402',
                name: '721型総合艦砲システム',
                translatedName: {
                    en: '721 Integrated Battery System',
                },
                skillComplete: true,
                skills: [
                    strategy.antiAircraftSupport(40, 30, 25).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 5,
            }),
            modules.static({
                id: '4010407',
                name: '貯蔵システム',
                translatedName: {
                    en: 'Storage System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseStorage().withPercentageValue(30).withCost(6),
                ],
                skillSlots: 1,
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
                    enhancements.increaseArmor().withAbsoluteValue(8).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(8).withCost(8),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    strategy.evasiveManeuvers(20, 40, 40).withCost(8),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 30730,
            armor: 20,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 1200,
            dpmAntiAir: 228,
            dpmSiege: 181,
        },
    },
    {
        id: ShipId.AC721_TE_A,
        name: 'AC721-TE　Ａイオン砲型',
        translatedName: {
            en: 'AC721 (TE) - Ion Cannon Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 15,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.AC721_A, ShipId.AC721_B, ShipId.AC721_D, ShipId.AC721_TE_D_S_LEVI9],
        defaultStats: {
            hp: 34140,
            armor: 20,
            shield: 2,
            speed: 750,
            warpSpeed: 3750,
            dpmShip: 6037,
            dpmAntiAir: 138,
            dpmSiege: 1328,
        },
    },
    {
        id: ShipId.AC721_TE_D_S_LEVI9,
        name: 'AC721-TE（Ｓ-レヴィ9搭載）',
        translatedName: {
            en: 'AC721 (TE) - Aircraft Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryCorvette: 2,
        relatedShipIds: [ShipId.AC721_A, ShipId.AC721_B, ShipId.AC721_D, ShipId.AC721_TE_A],
        defaultStats: {
            hp: 34140,
            armor: 20,
            shield: 2,
            speed: 750,
            warpSpeed: 3750,
            dpmShip: 6037,
            dpmAntiAir: 138,
            dpmSiege: 1328,
        },
    },
];
