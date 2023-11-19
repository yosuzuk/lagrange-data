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

export const strixA100: IShipDefinition[] = [
    {
        id: ShipId.STRIX_A100,
        name: 'ストリクスA100型',
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
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
                name: 'パルス砲システム',
                translatedName: {
                    en: 'Charged Pulse Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('rapidFire').withDescriptionKey('rapidFire2', { value: 50, cooldown: 70, interval: 45, duraction: 35 }) .withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50, 30).withCost(10),
                    enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
                ],
                skillSlots: 6,
                dpmShip: 663,
                dpmAntiAir: 459,
                dpmSiege: 132,
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
                    strategy.closeCombatAssault2(30).withCost(15),
                    enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.increaseHitRateOfMainWeapon().withPercentageValue(14.8).withCost(8),
                    enhancements.reduceFlightTime().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 5,
            }),
        ],
        defaultStats: {
            hp: 4920,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 1989,
            dpmAntiAir: 2289,
            dpmSiege: 396,
        },
    },
];
