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

export const silentAssassin: IShipDefinition[] = [
    {
        id: ShipId.SILENT_ASSASSIN,
        name: 'サイレントアサシン',
        translatedName: {
            en: 'Silent Assassin - High-Speed Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: '速射砲システム',
                translatedName: {
                    en: 'Rapid-Fire Battery System',
                },
                mainSystem: true,
                skills: [
                    strategy.rapidFire(80, 60, 15, 10).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(10),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(10),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                ],
                skillSlots: 6,
                dpmShip: 1800,
                dpmAntiAir: 0,
                dpmSiege: 630,
            }),
            modules.commandSystem(),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.increaseHp().withPercentageValue(12).withCost(6),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                name: '高速動力システム',
                translatedName: {
                    en: 'High-Speed Propulsion System',
                },
                effects: [
                    enhancements.reduceLockOn().withFixedPercentageValue(35),
                    enhancements.increaseHitRateVsSmall().withFixedPercentageValue(15),
                ],
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceHitByMissile().withPercentageValue(14.8).withCost(8),
                    enhancements.increaseHitRateOfAircraft().withPercentageValue(14.8).withCost(8),
                ],
                skillSlots: 4,
            }),
        ],
        defaultStats: {
            hp: 5350,
            armor: 6,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: 1800,
            dpmAntiAir: 0,
            dpmSiege: 630,
        },
    },
];
