import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const sporeA404: IShipDefinition[] = [
    {
        id: ShipId.SPORE_A404,
        name: 'スポアA404',
        translatedName: {
            en: 'Spore A404 - Anti-Aircraft Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: '1180101',
                name: '機載戦闘システム',
                translatedName: {
                    en: 'Airborne Combat System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '追い打ち',
                        translatedName: {
                            en: 'Pursue Targets',
                        },
                        description: '攻撃目標のHPが20%になったとき、そのラウンドの攻撃回数が1回増加し、攻撃間隔が40%ダウンする。',
                        translatedDescription: {
                            en: 'When the target\'s HP falls below 20%, it increases attack chances in a single round by 1 and reduces Attack Interval by 40%.',
                        },
                    }).withCost(14),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(9),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.customEnhancement({
                        name: '空戦目標集中',
                        translatedName: {
                            en: 'Focus on Aerial Targets',
                        },
                        description: '戦闘機と要撃機を優先的に攻撃する。',
                        translatedDescription: {
                            en: 'Prioritizes fighters and interceptors',
                        },
                    }).withCost(9),
                ],
                skillSlots: 7,
            }),
            modules.commandSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseMaintenanceEfficiency().withPercentageValue(25).withCost(5),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(5),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(9),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.reduceHitByMissile().withPercentageValue(15).withCost(9),
                    enhancements.reduceFlightTime().withPercentageValue(40).withCost(12),
                    enhancements.customEnhancement({
                        name: 'ステルス機動',
                        translatedName: {
                            en: 'Stealth Maneuvers',
                        },
                        description: '艦載機が母艦に帰還する際、30%の確率で敵対空武器の早期ロックオン効果を無視する',
                        translatedDescription: {
                            en: 'When the aircraft is returning to the carrier, there is a 30% chance of ignoring the enemy anti-aircraft weapon\'s pre-targeting effect',
                        },
                    }).withCost(12),
                ],
                skillSlots: 5,
            }),
        ],
        defaultStats: {
            hp: 3550,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 3,
            inboundTime: 3,
            dpmShip: 135,
            dpmAntiAir: 1990,
            dpmSiege: 0,
        },
    },
];
