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

export const b192Newland: IShipDefinition[] = [
    {
        id: ShipId.B192_NEWLAND,
        name: 'B192ニューランド',
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
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: '1170101',
                name: '攻撃砲システム',
                translatedName: {
                    en: 'Assault Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(10),
                    enhancements.reduceAttackInterval().withPercentageValue(15).withCost(10),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    strategy.precisionStrike(70, 40, 40).withCost(15),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: '1170102',
                name: '対空ミサイルシステム',
                translatedName: {
                    en: 'Anti-Aircraft Missile System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(3),
                    enhancements.increaseDamageVsAircraft().withPercentageValue(20).withCost(3),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10).withCost(3),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
                ],
                skillSlots: 4,
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
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceFlightTime().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 3,
            }),
        ],
        defaultStats: {
            hp: 4680,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 4,
            inboundTime: 4,
            dpmShip: 1284,
            dpmAntiAir: 1080,
            dpmSiege: 270,
        },
    },
];
