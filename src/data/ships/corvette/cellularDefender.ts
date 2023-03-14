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

export const cellularDefender: IShipDefinition[] = [
    {
        id: ShipId.CELLULAR_DEFENDER,
        name: 'セルラーディフェンダー',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            modules.static({
                id: "w1",
                name: "魚雷攻撃システム",
                translatedName: {
                    en: 'Torpedo Attack System',
                },
                skills: [
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(10).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(7),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(7),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(7),
                    enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(7),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: "w2",
                name: "速射砲システム",
                translatedName: {
                    en: 'Rapid-Fire Battery System',
                },
                skills: [
                    strategy.customStrategy('antiAircraftMeasures').withDescriptionKey('antiAircraftMeasures', { cooldownDown: 80, duration: 15, cooldown: 30 }).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.reduceCooldown().withPercentageValue(14.8).withCost(7),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(7),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(7),
                ],
                skillSlots: 5,
            }),
            modules.static({
                id: "sp1",
                name: "状況把握システム",
                translatedName: {
                    en: 'Situational Awareness System',
                },
                effects: [
                    enhancements.reduceHitByMissile().withPercentageValue(30),
                ],
            }),
            modules.commandSystem(),
            modules.armorSystem({
                skills: [
                    enhancements.increaseHp().withPercentageValue(10).withCost(5),
                    enhancements.increaseHp().withPercentageValue(10).withCost(5),
                    enhancements.increaseHp().withPercentageValue(10).withCost(5),
                    enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(5),
                ],
                skillSlots: 3,
            }),
            modules.propulsionSystem({
                skills: [
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                ],
                skillSlots: 2,
            }),
        ],
    },
];
