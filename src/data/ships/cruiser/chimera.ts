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
        translatedName: {
            en: 'Chimera - Ballistic Type',
        },
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
                skillComplete: true,
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
                skillComplete: true,
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
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                    enhancements.increaseSystemHp().withPercentageValue(30).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 89390,
            armor: 80,
            shield: 0,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 14567,
            dpmAntiAir: 180,
            dpmSiege: 1893,
        },
    },
    {
        id: ShipId.CHIMERA_B,
        name: 'キメラ級　Ｂ重砲型',
        translatedName: {
            en: 'Chimera - Heavy Cannon Type',
        },
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
                skillComplete: true,
                skills: [
                    strategy.allShipsFocusFire(60, 90, 10).withCost(20),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                    enhancements.reduceDuration().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 7,
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
                    enhancements.increaseShield().withPercentageValue(10).withCost(6),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 89390,
            armor: 80,
            shield: 0,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 17650,
            dpmAntiAir: 180,
            dpmSiege: 3342,
        },
    },
    {
        id: ShipId.CHIMERA_C,
        name: 'キメラ級　Ｃ防衛型',
        translatedName: {
            en: 'Chimera - Defensive Type',
        },
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
                skillComplete: false,
                // TODO skills
                skillSlots: 7,
            }),
            modules.commandSystem({
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    // TODO flagshipEffect
                ],
                skillComplete: false,
                // TODO skills
                skillSlots: 2,
            }),
            modules.armorSystem({
                skillComplete: false,
                // TODO skills
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: false,
                // TODO skills
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 97270,
            armor: 130,
            shield: 0,
            speed: 450,
            warpSpeed: 2250,
            dpmShip: 10914,
            dpmAntiAir: 0,
            dpmSiege: 2415,
        },
    },
    {
        id: ShipId.CHIMERA_TE_C_S,
        name: 'キメラ級-TE　Ａ防衛型（回収）',
        translatedName: {
            en: 'Chimera (TE) - Defensive Type (salvaged)',
        },
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
