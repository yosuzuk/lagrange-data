import { strategy, enhancements } from '../../../enhancements/enhancements';
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

export const sandrake: IShipDefinition[] = [
    {
        id: ShipId.SANDRAKE,
        name: 'サンドレイク',
        translatedName: {
            en: 'Sandrake - Dual-Purpose Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: 'アクティブ対空砲システム',
                translatedName: {
                    en: 'Offensive AA Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.pursueTargets(20, 1, 40).withCost(13),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseDamageVsAircraft().withPercentageValue(20).withCost(9),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(9),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                ],
                skillSlots: 7,
                dpmShip: 24,
                dpmAntiAir: 537,
                dpmSiege: 0,
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
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
                    enhancements.increaseSystemHpMainSystem().withPercentageValue(20).withCost(6),
                    enhancements.increaseHitRate().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceHitByMissile().withPercentageValue(14.8).withCost(8),
                    enhancements.reduceFlightTime().withPercentageValue(40).withCost(12),
                ],
                skillSlots: 4,
            }),
        ],
        defaultStats: {
            hp: 4200,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 120,
            dpmAntiAir: 2685,
            dpmSiege: 0,
        },
    },
];
