import { enhancements, strategy } from '../../../enhancements/enhancements';
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

export const cvII003: IShipDefinition[] = [
    {
        id: ShipId.CV_II003,
        name: 'CV-II003型',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: '速射砲システム',
                translatedName: {
                    en: 'Rapid-Fire Battery System',
                },
                mainSystem: true,
                dpmShip: 2500,
                dpmAntiAir: 237,
                dpmSiege: 418,
                skills: [
                    strategy.prioritizeFirepower(80, 90, 15).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(10),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(10),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(10),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                ],
                skillSlots: 6,
            }),
            modules.commandSystem(),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.increaseHp().withPercentageValue(10).withCost(6),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceHitByMissile().withPercentageValue(14.8).withCost(8),
                ],
                skillSlots: 3,
            }),
        ],
        defaultStats: {
            hp: 4500,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 2520,
            dpmAntiAir: 237,
            dpmSiege: 418,
        },
    },
];
