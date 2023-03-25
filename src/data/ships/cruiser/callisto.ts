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
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
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
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
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
        id: ShipId.CALLISTO_B,
        name: 'カリスト　Ｂ対艦型',
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
                // TODO skills
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
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
        id: ShipId.CALLISTO_C,
        name: 'カリスト　Ｃ支援型',
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
                // TODO skills
                skillSlots: 7,
            }),
            modules.static({
                id: 'w2',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                // TODO skills
                skillSlots: 5,
            }),
            modules.static({
                id: 'w3',
                name: '対空ＵＡＶシステム',
                translatedName: {
                    en: 'Anti-Aircraft UAV System',
                },
                // TODO skills
                skillSlots: 4,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    // TODO cost and max node count
                    flagshipEffect.customFlashipEffect('patrollingDefense').withDescriptionKey('patrollingDefense', { nodeCount: '1+?' }),
                ],
                skillSlots: 2,
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
