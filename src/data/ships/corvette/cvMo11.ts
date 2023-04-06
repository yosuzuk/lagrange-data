import { enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const assaultMissileSystem = modules.static({
    id: 'w1',
    name: 'ミサイル攻撃システム',
    translatedName: {
        en: 'Assault Missile System',
    },
    mainSystem: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(10),
        enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
        enhancements.increaseCriticalDamage().withPercentageValue(40).withCost(10),
        enhancements.reduceMissileInterception().withPercentageValue(30).withCost(10),
    ],
    skillSlots: 6,
    dpmShip: 2100,
    dpmAntiAir: 0,
    dpmSiege: 240,
});

const cannonAttackSystem = modules.static({
    id: 'w1',
    name: '大砲攻撃システム',
    translatedName: {
        en: 'Cannon Attack System',
    },
    mainSystem: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(12),
        enhancements.increaseDamage().withPercentageValue(10).withCost(12),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(12),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(12),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(12),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(12),
    ],
    skillSlots: 4,
    dpmShip: 2228,
    dpmAntiAir: 0,
    dpmSiege: 247,
});

const precisionGuidanceSystem = modules.static({
    id: 'w1',
    name: '正確誘導システム',
    translatedName: {
        en: 'Precision Guidance System',
    },
    mainSystem: true,
    // TODO skills
    skillSlots: 7,
    dpmShip: 624,
    dpmAntiAir: 1100,
    dpmSiege: 130,
});

const defaultModules: ISystemModule[] = [
    modules.commandSystem(),
    modules.armorSystem({
        skills: [
            enhancements.increaseHp().withPercentageValue(12).withCost(5),
            enhancements.increaseHp().withPercentageValue(12).withCost(5),
            enhancements.increaseHp().withPercentageValue(12).withCost(5),
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
];

const antiAircraftBatterySystem = modules.static({
    id: 'w2',
    name: '対空砲システム',
    translatedName: {
        en: 'Anti-Aircraft Battery System',
    },
    skills: [
        strategy.antiAircraftMeasures(80, 15, 30).withCost(6),
        enhancements.increaseDamage().withPercentageValue(10).withCost(3),
        enhancements.increaseDamageVsAircraft().withPercentageValue(20).withCost(3),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(3),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(3),
    ],
    skillSlots: 5,
    dpmShip: 87,
    dpmAntiAir: 837,
    dpmSiege: 0,
});

const counterCannonSystem = modules.static({
    id: 'w2',
    name: '反撃砲システム',
    translatedName: {
        en: 'Counter Cannon System',
    },
    // TODO skills,
    skillSlots: 5,
    dpmShip: 106,
    dpmAntiAir: 384,
    dpmSiege: 0,
});

export const cvMo11: IShipDefinition[] = [
    {
        id: ShipId.CV_M011_A,
        name: 'CV-M011型　Ａミサイル型',
        translatedName: {
            en: 'CV-M011 - Missile Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.STRATEGY_AND_SUPPORT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.CV_M011_B, ShipId.CV_M011_C],
        modules: [
            assaultMissileSystem,
            antiAircraftBatterySystem,
            ...defaultModules,
        ],
        defaultStats: {
            hp: 7500,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: (assaultMissileSystem.dpmShip ?? 0) + (antiAircraftBatterySystem.dpmShip ?? 0),
            dpmAntiAir: (assaultMissileSystem.dpmAntiAir ?? 0) + (antiAircraftBatterySystem.dpmAntiAir ?? 0),
            dpmSiege: (assaultMissileSystem.dpmSiege ?? 0) + (antiAircraftBatterySystem.dpmSiege ?? 0),
        },
    },
    {
        id: ShipId.CV_M011_B,
        name: 'CV-M011型　Ｂ大砲型',
        translatedName: {
            en: 'CV-M011 - Cannon Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CV_M011_A,
        modules: [
            cannonAttackSystem,
            antiAircraftBatterySystem,
            ...defaultModules,
        ],
        defaultStats: {
            hp: 7500,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: (cannonAttackSystem.dpmShip ?? 0) + (antiAircraftBatterySystem.dpmShip ?? 0),
            dpmAntiAir: (cannonAttackSystem.dpmAntiAir ?? 0) + (antiAircraftBatterySystem.dpmAntiAir ?? 0),
            dpmSiege: (cannonAttackSystem.dpmSiege ?? 0) + (antiAircraftBatterySystem.dpmSiege ?? 0),
        },
    },
    {
        id: ShipId.CV_M011_C,
        name: 'CV-M011型　C高速型',
        translatedName: {
            en: 'CV-M011 - High-Speed Type',
        },
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10, // TODO verify
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        // researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        // researchStrategyTypes: [ResearchStrategyType.FIGHTER_AND_CORVETTE],
        // researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CV_M011_A,
        modules: [
            precisionGuidanceSystem,
            counterCannonSystem,
            ...defaultModules,
        ],
        defaultStats: {
            hp: 7500,
            armor: 2,
            shield: 0,
            speed: 2500,
            warpSpeed: 12500,
            dpmShip: (precisionGuidanceSystem.dpmShip ?? 0) + (counterCannonSystem.dpmShip ?? 0),
            dpmAntiAir: (precisionGuidanceSystem.dpmAntiAir ?? 0) + (counterCannonSystem.dpmAntiAir ?? 0),
            dpmSiege: (precisionGuidanceSystem.dpmSiege ?? 0) + (counterCannonSystem.dpmSiege ?? 0),
        },
    },
];
