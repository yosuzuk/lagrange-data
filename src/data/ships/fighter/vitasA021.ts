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

export const vitasA021: IShipDefinition[] = [
    {
        id: ShipId.VITAS_A021,
        name: 'ヴィタスA021',
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: '精密攻撃システム',
                translatedName: {
                    en: 'Precision Strike System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.precisionStrike(60, 30, 30).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10, 10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                    enhancements.reduceMissileInterception().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 6,
                dpmShip: 851,
                dpmAntiAir: 0,
                dpmSiege: 181,
            }),
            modules.static({
                id: 'w2',
                name: '反撃砲システム',
                translatedName: {
                    en: 'Counter Cannon System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 4,
                dpmShip: 20,
                dpmAntiAir: 180,
                dpmSiege: 0,
            }),
            modules.commandSystem({
                skillComplete: true,
                skillSlots: 0,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(9),
                    enhancements.increaseHp().withPercentageValue(12).withCost(9),
                    enhancements.increaseHp().withPercentageValue(12).withCost(9),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(7),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(32).withCost(8),
                    enhancements.reduceFlightTime().withPercentageValue(30).withCost(10),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                ],
                skillSlots: 3,
            }),
        ],
        defaultStats: {
            hp: 5370,
            armor: 3,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 5,
            inboundTime: 3,
            dpmShip: 3618,
            dpmAntiAir: 900,
            dpmSiege: 543,
        },
    },
];
