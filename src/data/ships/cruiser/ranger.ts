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

export const ranger: IShipDefinition[] = [
    {
        id: ShipId.RANGER_A,
        name: 'レンジャー級　Ａ総合型',
        translatedName: {
            en: 'Ranger - Integrated Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.RANGER_B],
        modules: [
            modules.static({
                id: 'w1',
                name: '艦首重砲システム',
                translatedName: {
                    en: 'Bow-Mounted Heavy Cannon',
                },
                mainSystem: true,
                skillComplete: false,
                skills: [
                    // strategy.heavyAmmo(60, 30).withCost(20),
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    // enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    // enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    // enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    // enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    // enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                    // enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '総合投射システム',
                translatedName: {
                    en: 'Integrated Projectile Launching System',
                },
                skillComplete: false,
                skills: [
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    // enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    // enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w3',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skillComplete: false,
                skills: [
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    // enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    // enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 3,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: false,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: false,
                skills: [
                    // enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    // enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    // enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    // enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    // enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: false,
                skills: [
                    // enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    // enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    // enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                    // enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 3,
            }),
            modules.energySystem({
                skillComplete: false,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 73260,
            armor: 50,
            shield: 10,
            speed: 500,
            warpSpeed: 2500,
            dpmShip: 13000,
            dpmAntiAir: 1953,
            dpmSiege: 2349,
        },
    },
    {
        id: ShipId.RANGER_B,
        name: 'レンジャー級　Ｂイオン砲型',
        translatedName: {
            en: 'Ranger - Ion Cannon Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 2,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.RANGER_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '「ガンマストーム」イオン攻撃システム',
                translatedName: {
                    en: '"Gamma Storm" Ion Attack System',
                },
                mainSystem: true,
                skillComplete: false,
                skills: [
                    // strategy.keyTargets(25).withCost(20),
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    // enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    // enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    // enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    // enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    // enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    // enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: 'エネルギー投射システム',
                translatedName: {
                    en: 'Energy Projectile Launching System',
                },
                skillComplete: false,
                skills: [
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    // enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    // enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    // enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                    // enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 5,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: false,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: false,
                skills: [
                    // enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    // enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    // enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    // enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    // enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: false,
                skills: [
                    // enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    // enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    // enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                    // enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 3,
            }),
            modules.energySystem({
                skillComplete: false,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 73260,
            armor: 50,
            shield: 10,
            speed: 400,
            warpSpeed: 2000,
            dpmShip: 16837,
            dpmAntiAir: 0,
            dpmSiege: 1936,
        },
    },
];
