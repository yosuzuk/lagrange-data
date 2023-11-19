import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const conamaraChaos: IShipDefinition[] = [
    {
        id: ShipId.CONAMARA_CHAOS_A,
        name: 'コネマラカオス級　Ａ電磁加速砲型',
        translatedName: {
            en: 'Conamara Chaos - Railgun Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.CONAMARA_CHAOS_B],
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
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
                    strategy.concentrateFirePeriodically(80, 90, 8).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '対空システム',
                translatedName: {
                    en: 'Anti-Aircraft System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
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
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 3,
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
            modules.static({
                id: 'sp1',
                name: '追加動力システム',
                translatedName: {
                    en: 'Additional Propulsion System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
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
            hp: 71600,
            armor: 30,
            shield: 10,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 12380,
            dpmAntiAir: 529,
            dpmSiege: 1320,
        },
    },
    {
        id: ShipId.CONAMARA_CHAOS_B,
        name: 'コネマラカオス級　Ｂプラズマ型',
        translatedName: {
            en: 'Conamara Chaos - Plasma Type',
        },
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CONAMARA_CHAOS_A,
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
        modules: [
            modules.static({
                id: 'w1',
                name: '艦首プラズマ投射システム',
                translatedName: {
                    en: 'Bow Mounted Plasma Caster',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('overdrive').withDescriptionKey('overdriveWithDuration', { interval: 90, frequency: 4, durationUp: 100, hitRate: 35, duration: 30, cooldown: 15 }).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.reduceDuration().withPercentageValue(10).withCost(10),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '対空システム',
                translatedName: {
                    en: 'Anti-Aircraft System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(14.8).withCost(5),
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
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 3,
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
            modules.static({
                id: 'sp1',
                name: '追加動力システム',
                translatedName: {
                    en: 'Additional Propulsion System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
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
            hp: 71600,
            armor: 30,
            shield: 10,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 15908,
            dpmAntiAir: 529,
            dpmSiege: 2622,
        },
    },
];
