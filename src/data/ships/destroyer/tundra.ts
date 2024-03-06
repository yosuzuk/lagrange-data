import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const tundra: IShipDefinition[] = [
    {
        id: ShipId.TUNDRA_A,
        name: 'ツンドラ級　Ａ支援型',
        translatedName: {
            en: 'Tundra - Support Type',
        },
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        subModelIds: [ShipId.TUNDRA_B],
        relatedShipIds: [ShipId.TUNDRA_TE_S],
        defaultStats: {
            hp: 41190,
            armor: 20,
            shield: 2,
            speed: 700,
            warpSpeed: 3500,
            dpmShip: 1350,
            dpmAntiAir: 5127,
            dpmSiege: 157,
        },
    },
    {
        id: ShipId.TUNDRA_B,
        name: 'ツンドラ級　Ｂ艦載型',
        translatedName: {
            en: 'Tundra - Aircraft Type',
        },
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.TUNDRA_A,
        relatedShipIds: [ShipId.TUNDRA_TE_S],
        modules: [
            modules.static({
                id: '4070201',
                name: 'ツンドラ艦載機システム',
                translatedName: {
                    en: 'Tundra Aircraft System'
                },
                mainSystem: true,
                carryFighter: 2,
                carryFighterType: ShipSubType.MEDIUM_FIGHTER,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '機動回避',
                        translatedName: {
                            en: 'Evasive Maneuvers',
                        },
                        description: '自身のHPが20%になったとき、艦船の回避率が40%アップする。効果は40秒続く。この効果は戦闘中に1回しか発生しない。',
                        translatedDescription: {
                            en: 'When the ship\'s HP falls to 20%, increases Evasion by 40% for 40s. This effect only triggers once per battle.',
                        },
                    }).withCost(15),
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(10),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                    enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: '4070202',
                name: '総合武器庫',
                translatedName: {
                    en: 'Integrated Armory',
                },
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '対空連携',
                        translatedName: {
                            en: 'Anti-Aircraft Support',
                        },
                        description: '30秒ごとに、システム内のすべての武器が同列の範囲内に接近する敵機をロックオンして攻撃する。対戦闘機命中率が0%アップする。効果は25秒続く。',
                        translatedDescription: {
                            en: 'All weapons in the system lock onto enemy aircraft in the nearby row and launch attacks, increasing the Hit Rate by 0% every 30s or 25s.',
                        },
                    }).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 5,
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
                    enhancements.increaseArmor().withAbsoluteValue(8).withCost(8),
                    enhancements.increaseShield().withPercentageValue(10).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 40030,
            armor: 20,
            shield: 2,
            speed: 700,
            warpSpeed: 3500,
            dpmShip: 2022,
            dpmAntiAir: 519,
            dpmSiege: 322,
        },
    },
    {
        id: ShipId.TUNDRA_TE_S,
        name: 'ツンドラ級-TE　Ａ対空型（回収）',
        translatedName: {
            en: 'Tundra (TE) - Anti-Aircraft Type (salvaged)',
        },
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.TUNDRA_A, ShipId.TUNDRA_B],
    },
];
