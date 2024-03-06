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

export const ceres: IShipDefinition[] = [
    {
        id: ShipId.CERES_A,
        name: 'セレス級　Ａ艦載型',
        translatedName: {
            en: 'Ceres - Aircraft Type',  
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        subModelIds: [ShipId.CERES_B, ShipId.CERES_C],
        modules: [
            modules.static({
                id: '4040101',
                name: '戦闘機保守指令システム',
                translatedName: {
                    en: 'Aircraft Maintenance and Command System',
                },
                mainSystem: true,
                carryFighter: 2,
                carryFighterType: ShipSubType.MEDIUM_FIGHTER,
                skillComplete: true,
                skills: [
                    enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(10),
                    enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(10),
                    enhancements.reduceHitByProjectile().withPercentageValue(20).withCost(10),
                    enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                    enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(10),
                    enhancements.customEnhancement({
                        name: '艦載機緊急補修',
                        translatedName: {
                            en: 'Aircraft Emergency Repair',
                        },
                        description: '帰還した艦載機を10%緊急補修し、戦闘機のメイン武器の冷却時間を50%延長する',
                        translatedDescription: {
                            en: 'Performs emergency repairs on aircraft upon returning for 10%, and extends the CD of the primary weapon on the Fighter by 50%',
                        },
                    }).withCost(10),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: '4040102',
                name: '通常砲システム',
                translatedName: {
                    en: 'Generic Battery System',
                },
                skillComplete: true,
                skills: [
                    strategy.antiAircraftSupport(40, 30, 25).withCost(8),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(4),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(4),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(4),
                    enhancements.customEnhancement({
                        name: '分散攻撃',
                        translatedName: {
                            en: 'Scatter Attacks',
                        },
                        description: '武器で目標2件を分散攻撃する。',
                        translatedDescription: {
                            en: 'Spreads weapons fire across 2 target(s)',
                        },
                    }).withCost(4),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(4),
                ],
                skillSlots: 5,
            }),
            modules.commandSystem({
                skillComplete: true,
                flagshipEffects: [
                    flagshipEffect.focusFire().withDefaultFlag(),
                    flagshipEffect.strategicStrike2(90).withCost(40),
                ],
                skills: [
                    enhancements.customEnhancement({
                        name: '艦載機エンジン強化',
                        translatedName: {
                            en: 'Aircraft Engine Enhancement',
                        },
                        description: '艦載機の巡航速度が100%アップ。',
                        translatedDescription: {
                            en: 'Increases aircraft cruising speed by 100%.',
                        },
                    }).withCost(40),
                    enhancements.customEnhancement({
                        name: '艦載機緊急補修',
                        translatedName: {
                            en: 'Aircraft Emergency Repair',
                        },
                        description: '戦略攻撃を実行した艦載機を帰還するたびに4%緊急補修する。',
                        translatedDescription: {
                            en: 'Repairs 4% damage on aircraft returning from a Strategic Strike.',
                        },
                    }).withCost(40),
                ],
                skillSlots: 2,
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
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats: {
            hp: 32310,
            armor: 20,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 1500,
            dpmAntiAir: 216,
            dpmSiege: 252,
        },
    },
    {
        id: ShipId.CERES_B,
        name: 'セレス級　Ｂ支援型',
        translatedName: {
            en: 'Ceres - Support Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.CERES_A,
        defaultStats: {
            hp: 32310,
            armor: 20,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 1500,
            dpmAntiAir: 3096,
            dpmSiege: 252,
        },
    },
    {
        id: ShipId.CERES_C,
        name: 'セレス級　Ｃ戦術型',
        translatedName: {
            en: 'Ceres - Tactical Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.CERES_A,
        defaultStats: {
            hp: 32310,
            armor: 20,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 1500,
            dpmAntiAir: 216,
            dpmSiege: 252,
        },
    },
];
