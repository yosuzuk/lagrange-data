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

export const chimera: IShipDefinition[] = [
    {
        id: ShipId.CHIMERA_A,
        name: 'キメラ級　Ａ弾道型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.CHIMERA_B, ShipId.CHIMERA_C],
        relatedShipIds: [ShipId.CHIMERA_TE_C_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '「フォートレス」砲撃システム',
                translatedName: {
                    en: '"Fortress" Battery System',
                },
                mainSystem: true,
                skills: [
                    strategy.allShipsFocusFire(80, 90, 10).withCost(20),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                    enhancements.reduceDuration().withPercentageValue(10).withCost(8),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: 'ミサイル攻撃システム',
                translatedName: {
                    en: 'Assault Missile System',
                },
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(6),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 4,
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
                    enhancements.increaseSystemHp().withPercentageValue(30).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 2,
            }),
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.CHIMERA_B,
        name: 'キメラ級　Ｂ重砲型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CHIMERA_A,
        relatedShipIds: [ShipId.CHIMERA_C, ShipId.CHIMERA_TE_C_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '「フォートレス」砲撃システムSP',
                translatedName: {
                    en: '"Fortress" Cannon System SP',
                },
                mainSystem: true,
                // TODO skills
                skillSlots: 7,
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
                skillSlots: 2,
            }),
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.CHIMERA_C,
        name: 'キメラ級　Ｃ防衛型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CHIMERA_A,
        relatedShipIds: [ShipId.CHIMERA_B, ShipId.CHIMERA_TE_C_S],
        modules: [
            modules.static({
                id: 'w1',
                name: '総合武器庫',
                translatedName: {
                    en: 'Integrated Armory',
                },
                mainSystem: true,
                // TODO skills
                skillSlots: 7,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    // TODO flagshipEffect
                ],
                // TODO skills
                skillSlots: 2,
            }),
            modules.armorSystem({
                // TODO skills
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                // TODO skills
                skillSlots: 2,
            }),
            modules.energySystem(),
        ],
    },
    {
        id: ShipId.CHIMERA_TE_C_S,
        name: 'キメラ級-TE　Ａ防衛型（回収）',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.CHIMERA_A, ShipId.CHIMERA_B, ShipId.CHIMERA_C],
    },
];
