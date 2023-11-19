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

export const callisto: IShipDefinition[] = [
    {
        id: ShipId.CALLISTO_A,
        name: 'カリスト　Ａ魚雷型',
        translatedName: {
            en: 'Callisto - Torpedo Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 2,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.CALLISTO_B, ShipId.CALLISTO_C],
        modules: [
            modules.static({
                id: 'w1',
                name: '「エターナルボラリス」大型投射システム',
                translatedName: {
                    en: '"Eternal Polaris" Large Projectile Launching System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.heavyAmmo(60, 30).withCost(20),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 5,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
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
            hp: 79630,
            armor: 40,
            shield: 10,
            speed: 400,
            warpSpeed: 2000,
            dpmShip: 14350,
            dpmAntiAir: 216,
            dpmSiege: 3983,
        },
    },
    {
        id: ShipId.CALLISTO_B,
        name: 'カリスト　Ｂ対艦型',
        translatedName: {
            en: 'Callisto - Anti-Ship Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 2,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.CALLISTO_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '「エターナルボラリス」大型投射システム',
                translatedName: {
                    en: '"Eternal Polaris" Large Projectile Launching System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.keyTargets(25).withCost(20),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    // TODO verify
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 5,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
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
            hp: 79630,
            armor: 40,
            shield: 10,
            speed: 400,
            warpSpeed: 2000,
            dpmShip: 18095,
            dpmAntiAir: 126,
            dpmSiege: 3728,
        },
    },
    {
        id: ShipId.CALLISTO_C,
        name: 'カリスト　Ｃ支援型',
        translatedName: {
            en: 'Callisto - Support Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 2,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.CALLISTO_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '「エターナルボラリス」大型投射システム',
                translatedName: {
                    en: '"Eternal Polaris" Large Projectile Launching System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('heavyAmmo').withDescriptionKey('heavyAmmoWithInterval', { damage: 60, durationUp: 30, duration: 30, cooldown: 30 }).withCost(12),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(6),
                    enhancements.increaseSiegeDamage().withPercentageValue(40).withCost(6),
                    enhancements.increaseSiegeDamage().withPercentageValue(40).withCost(6),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(6),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(6),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(6),
                ],
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 5,
            }),
            modules.static({
                id: 'w3',
                name: '対空ＵＡＶシステム',
                translatedName: {
                    en: 'Anti-Aircraft UAV System',
                },
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
                    enhancements.reduceFlightTimeAndWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(6),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(6),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    // TODO verify max node count and cost
                    flagshipEffect.customFlashipEffectWithKey('patrollingDefense').withDescriptionKey('patrollingDefense', { nodeCount: '3' }).withCost(60),
                ],
                skillComplete: true,
                skills: [
                    enhancements.reduceDamageReceivedBySystem().withAbsoluteValue(5).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(10).withCost(10),
                ],
                skillSlots: 2,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
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
            hp: 79630,
            armor: 40,
            shield: 10,
            speed: 400,
            warpSpeed: 2000,
            dpmShip: 10950,
            dpmAntiAir: 4801,
            dpmSiege: 3003,
        },
    },
];
