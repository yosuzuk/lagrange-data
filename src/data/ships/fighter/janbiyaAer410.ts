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

export const janbiyaAer410: IShipDefinition[] = [
    {
        id: ShipId.JANBIYA_AER410,
        name: 'ジャンビーヤAer410',
        translatedName: {
            en: 'Janbiya Aer410 - Anti-Ship Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: '1200101',
                name: '弾道攻撃システム',
                translatedName: {
                    en: 'Gun/Missile Attack System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategy({
                        name: '高精度攻撃',
                        translatedName: {
                            en: 'Precision Strike',
                        },
                        description: '35秒ごとに、システム内のメイン武器が敵目標に対して、15%の確率で170%のクリティカルダメージを追加で与える。効果は35秒続く。',
                        translatedDescription: {
                            en: 'The system\'s primary weapon has a 15% chance to deal an additional 170% Crit Damage to the enemy target every 35s for 35s.',
                        },
                    }).withCost(15),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseCannonDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50, 30).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.reduceMissileInterception().withPercentageValue(30).withCost(10),  
                ],
                skillSlots: 7,
            }),
            modules.commandSystem({
                skillComplete: true,
                skills: [
                    enhancements.targetReset1().withCost(5),
                    enhancements.increaseMaintenanceEfficiency().withPercentageValue(25).withCost(5),
                ],
                skillSlots: 1,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                ],
                skillSlots: 2,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.increaseHitRateOfAllWeapons().withPercentageValue(15).withCost(8),
                    enhancements.reduceFlightTime().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 4,
            }),
        ],
        defaultStats: {
            hp: 4050,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 3,
            inboundTime: 3,
            dpmShip: 1416,
            dpmAntiAir: 1194,
            dpmSiege: 246,
        },
    },
];
