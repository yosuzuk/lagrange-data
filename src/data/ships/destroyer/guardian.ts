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

export const guardian: IShipDefinition[] = [
    {
        id: ShipId.GUARDIAN_A,
        name: 'ガーディアン級　Ａ支援型',
        translatedName: {
            en: 'Guardian - Support Type',
        },
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.GUARDIAN_B, ShipId.GUARDIAN_C],
        defaultStats: {
            hp: 25650,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 3054,
            dpmAntiAir: 3500,
            dpmSiege: 349,
        },
    },
    {
        id: ShipId.GUARDIAN_B,
        name: 'ガーディアン級　Ｂ両用型',
        translatedName: {
            en: 'Guardian - Dual-Purpose Type',
        },
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.GUARDIAN_A,
        carryCorvette: 2,
        modules: [
            modules.static({
                id: '4100201',
                name: 'ストームミサイルシステム',
                translatedName: {
                    en: '"Storm" Missile System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '艦載機集中砲火',
                        translatedName: {
                            en: 'Focus Aircraft Fire'
                        },
                        description: '90秒ごとに、搭載する艦載機がこのシステムの武器と共に攻撃する。武器の冷却時間が60%ダウンする。効果は25秒続く。',
                        translatedDescription: {
                            en: 'Syncs all aircraft with this weapon system and reduces Cooldown by 60% every 90s for 25s.',
                        },
                    }).withCost(10),
                    enhancements.customEnhancement({
                        name: '空母集中攻撃',
                        translatedName: {
                            en: 'Focus on Carriers'
                        },
                        description: '航空母艦を優先的に攻撃する。',
                        translatedDescription: {
                            en: 'Prioritizes carriers',
                        },
                    }).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(5),
                    enhancements.increaseHitRate().withPercentageValue(15).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: '4100202',
                name: '護送艦保守システム',
                translatedName: {
                    en: 'Corvette Maintenance System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
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
                    enhancements.increaseArmor().withAbsoluteValue(8).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(8).withCost(8),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 25650,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 3054,
            dpmAntiAir: 1196,
            dpmSiege: 349,
        },
    },
    {
        id: ShipId.GUARDIAN_C,
        name: 'ガーディアン級　Ｃパルス型',
        translatedName: {
            en: 'Guardian - Pulse Cannon Type',
        },
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.GUARDIAN_A,
        defaultStats: {
            hp: 25650,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 6210,
            dpmAntiAir: 248,
            dpmSiege: 400,
        },
    },
];
