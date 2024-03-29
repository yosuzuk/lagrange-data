import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const defaultModules: ISystemModule[] = [
    modules.static({
        id: 'w1',
        name: '機載爆薬投下システム',
        translatedName: {
            en: 'Airborne Bombardment System',
        },
        mainSystem: true,
        skillComplete: true,
        skills: [
            strategy.customStrategyWithKey('diveToss').withDescriptionKey('diveToss').withCost(18),
            enhancements.increaseDamage().withPercentageValue(10).withCost(12),
            enhancements.increaseDamage().withPercentageValue(10).withCost(12),
            enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(12),
            enhancements.increaseMissileAndTorpedoHitRate().withPercentageValue(8, 10).withCost(12),
            enhancements.increaseCriticalDamageAndChance().withPercentageValue(25).withCost(12),
            enhancements.increaseCriticalDamage().withPercentageValue(45).withCost(12),
            enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
            enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
            enhancements.reduceLockOn().withPercentageValue(30).withCost(12),
        ],
        skillSlots: 7,
        dpmShip: 3760,
        dpmAntiAir: 0,
        dpmSiege: 1820,
    }),
    modules.commandSystem({
        skillComplete: true,
        skillSlots: 0,
    }),
    modules.armorSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseHp().withPercentageValue(12).withCost(8),
            enhancements.increaseHp().withPercentageValue(12).withCost(8),
            enhancements.increaseHp().withPercentageValue(12).withCost(8),
            enhancements.increaseEnemyLockOn().withPercentageValue(40).withCost(8),
        ],
        skillSlots: 3,
    }),
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            strategy.closeCombatAssault1(45).withCost(15),
            enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
            enhancements.increaseEvasion().withPercentageValue(8).withCost(8),
            enhancements.reduceBatOfAircraft().withPercentageValue(20).withCost(12),
            enhancements.reduceFlightTime().withPercentageValue(30).withCost(12),
        ],
        skillSlots: 4,
    }),
];

const defaultStats: IDefaultShipStats = {
    hp: 6000,
    armor: 2,
    shield: 0,
    speed: 2500,
    warpSpeed: 12500,
    outboundTime: 9,
    inboundTime: 5,
    dpmShip: 3760,
    dpmAntiAir: 0,
    dpmSiege: 1820,
};

export const sLevi: IShipDefinition[] = [
    {
        id: ShipId.S_LEVI9,
        name: 'S-レヴィ9',
        translatedName: {
            en: 'S-Levy 9 - Anti-Ship Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        modules: [
            ...defaultModules,
        ],
        defaultStats,
    },
    {
        id: ShipId.S_LEVI9_TE,
        name: 'S-レヴィ9-TE',
        translatedName: {
            en: 'S-Levy 9 (TE) - Anti-Ship Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 0,
        row: ShipRow.NONE,
        operationLimit: 6,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        modules: [
            ...defaultModules,
        ],
        defaultStats,
        tags: [
            ShipTag.CURRENTLY_UNOBTAINABLE,
        ],
    },
];
