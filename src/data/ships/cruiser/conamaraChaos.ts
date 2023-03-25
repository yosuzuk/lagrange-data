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
                name: '',
                translatedName: {
                    en: 'Bow Railgun System',
                },
                mainSystem: true,
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
                name: '',
                translatedName: {
                    en: 'Anti-Aircraft System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    // TODO check increaseLockOnEfficiency after update
                ],
                skillSlots: 5,
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
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 3,
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
            modules.static({
                id: 'sp1',
                name: '',
                translatedName: {
                    en: 'Additional Propulsion System',
                },
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.CONAMARA_CHAOS_B,
        name: 'コネマラカオス級　Ｂプラズマ型',
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
                name: '',
                translatedName: {
                    en: 'Bow Mounted Plasma Caster',
                },
                mainSystem: true,
                skills: [
                    strategy.overdrive(90, 30, 15).withCost(15),
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
                name: '',
                translatedName: {
                    en: 'Anti-Aircraft System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    // TODO check increaseLockOnEfficiency after update
                ],
                skillSlots: 5,
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
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 3,
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
            modules.static({
                id: 'sp1',
                name: '',
                translatedName: {
                    en: 'Additional Propulsion System',
                },
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.energySystem(),
        ],
    },
];
