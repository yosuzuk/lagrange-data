import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

export const hayreddingsLoyal: IShipDefinition[] = [
    {
        id: ShipId.HAYREDDINGS_LOYAL,
        name: 'ハイレッディン　アストロトレーサー',
        translatedName: {
            en: 'Hayreddin\'s Loyal - Pulsar Fighter',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.HAYREDDIN_CLAN,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: "チャージパルス砲システム「スターシーカー」",
                translatedName: {
                    en: "\"Starchaser\" Charged Pulse Cannon System"
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceDuration().withPercentageValue(10).withCost(10),
                    enhancements.reduceDuration().withPercentageValue(10).withCost(10),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50, 30).withCost(10),
                    strategy.customStrategy({
                        name: "位相チャージダメージ",
                        translatedName: {
                          en: "Charged Phase Strike"
                        },
                        description: "チャージパルス武器は、同一目標を2ラウンド連続で攻撃すると武器ダメージが12%増加し、最大24%増加する。目標を切り替えるとリセットされる。",
                        translatedDescription: {
                          en: "The Charged Pulse weapon''s damage increases by 12% for every 2 consecutive rounds it attacks the same target, up to 24%. This bonus is reset after switching targets."
                        },
                    }).withCost(18),
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
                    enhancements.increaseHp().withPercentageValue(12).withCost(11),
                    enhancements.increaseHp().withPercentageValue(12).withCost(11),
                    enhancements.reduceHitByDirectFire().withPercentageValue(15).withCost(9),
                    enhancements.increaseEnemyLockOn().withPercentageValue(40).withCost(9),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(9),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(9),
                    enhancements.reduceHitByMissile().withPercentageValue(15).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                ],
                skillSlots: 3,
            }),
          ],
        defaultStats: {
            hp: 6480,
            armor: 3,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            dpmShip: 4614,
            dpmAntiAir: 3099,
            dpmSiege: 1521,
        },
    },
];
