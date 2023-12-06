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

export const vitasB010: IShipDefinition[] = [
    {
        id: ShipId.VITAS_B010,
        name: 'ヴィタスB010',
        translatedName: {
            en: 'Vitas-B010 - Anti-Ship Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.LARGE_FIGHTER,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            modules.static({
                id: 'w1',
                name: 'プラズマ爆撃システム',
                translatedName: {
                    en: 'Plasma Bombardment System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('activeManeuvers').withDescriptionKey('activeManeuvers').withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(9),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(9),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(9),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(9),
                    enhancements.increaseCriticalDamageAndChance().withPercentageValue(50, 30).withCost(9),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(9),
                ],
                skillSlots: 7,
                dpmShip: 2727,
                dpmAntiAir: 0,
                dpmSiege: 1009,
            }),
            modules.commandSystem({
                skillComplete: true,
                skillSlots: 1,
                skills: [
                    enhancements.increaseMaintenanceEfficiency().withPercentageValue(30).withCost(5),
                ],
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseHp().withPercentageValue(12).withCost(8),
                    enhancements.increaseEnemyLockOn().withPercentageValue(40).withCost(6),
                    enhancements.increaseEnemyLockOn().withPercentageValue(40).withCost(6),
                    enhancements.reduceLockOnEfficiencyChance().withPercentageValue(20).withCost(6),
                ],
                skillSlots: 5,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.reduceFlightTime().withPercentageValue(30).withCost(8),
                    enhancements.increaseEvasion().withPercentageValue(32).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                    enhancements.reduceLockOn().withPercentageValue(30).withCost(8),
                ],
                skillSlots: 3,
            }),
        ],
        defaultStats: {
            hp: 5860,
            armor: 10,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 12,
            inboundTime: 6,
            dpmShip: 4588,
            dpmAntiAir: 0,
            dpmSiege: 1696,
        },
    },
];
