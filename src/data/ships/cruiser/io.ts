import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
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

const genericMissileLaunchingSystem = modules.static({
    id: 'w2',
    name: '通常ミサイル発射システム',
    translatedName: {
        en: 'Generic Missile Launching System',
    },
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
    ],
    skillSlots: 4,
});

const integratedBatterySystem = modules.static({
    id: 'w3',
    name: '総合砲システム',
    translatedName: {
        en: 'Integrated Battery System',
    },
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.increaseDamage().withPercentageValue(10).withCost(2),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(2),
        enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(2),
    ],
    skillSlots: 5,
});

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
        ],
        skillComplete: true,
        skillSlots: 0,
    }),
    modules.armorSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseHp().withPercentageValue(12).withCost(8),
            enhancements.increaseHp().withPercentageValue(12).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
            enhancements.increaseArmor().withAbsoluteValue(30).withCost(6),
            enhancements.increaseShield().withPercentageValue(10).withCost(6),
            enhancements.reduceHitByMissleAndTorpedo().withPercentageValue(15, 25).withCost(6),
        ],
        skillSlots: 4,
    }),
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(3),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(3),
        ],
        skillSlots: 2,
    }),
    modules.static({
        id: 'sp1',
        name: '追加動力システム',
        translatedName: {
            en: 'Additional Propulsion System',
        },
        effects: [
            enhancements.increaseHitRateOfMainWeapon().withFixedPercentageValue(5),
            enhancements.increaseEvasion().withFixedPercentageValue(15),
        ],
        skillComplete: true,
        skills: [
            enhancements.increaseEvasion().withPercentageValue(8).withCost(5),
            enhancements.increaseEvasion().withPercentageValue(8).withCost(5),
        ],
        skillSlots: 2,
    }),
    modules.energySystem({
        skillComplete: true,
        skillSlots: 0,
    }),
];

export const io: IShipDefinition[] = [
    {
        id: ShipId.IO_A,
        name: 'イオ級　Ａイオン砲型',
        translatedName: {
            en: 'Io - Ion Cannon Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.IO_B, ShipId.IO_C],
        modules: [
            modules.static({
                id: 'w1',
                name: '「ビゲン」イオン砲システム',
                translatedName: {
                    en: '"Viggen" Ion Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.customStrategyWithKey('overdrive').withDescriptionKey('overdriveWithDuration', { interval: 90, frequency: 4, durationUp: 100, hitRate: 35, duration: 30, cooldown: 15 }).withCost(15),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 6,
            }),
            genericMissileLaunchingSystem,
            integratedBatterySystem,
            ...staticModules,
        ],
        defaultStats: {
            hp: 62120,
            armor: 50,
            shield: 10,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 18985,
            dpmAntiAir: 189,
            dpmSiege: 3753,
        },
    },
    {
        id: ShipId.IO_B,
        name: 'イオ級　Ｂ対艦型',
        translatedName: {
            en: 'Io - Anti-Ship Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.IO_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '「ビゲン」イオン砲システム',
                translatedName: {
                    en: '"Viggen" Ion Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.focusedAttacks(40, 20, 30, 15).withCost(20),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                    enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 6,
            }),
            modules.static({
                id: 'w2',
                name: '対艦ミサイル発射システム',
                translatedName: {
                    en: 'Anti-Ship Missile Launching System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(2),
                ],
                skillSlots: 4,
            }),
            integratedBatterySystem,
            ...staticModules,
        ],
        defaultStats: {
            hp: 62120,
            armor: 50,
            shield: 10,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 15100,
            dpmAntiAir: 189,
            dpmSiege: 946,
        },
    },
    {
        id: ShipId.IO_C,
        name: 'イオ級　Ｃ攻城型',
        translatedName: {
            en: 'Io - Siege Type',
        },
        type: ShipType.CRUISER,
        cost: 18,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.IO_A,
        modules: [
            modules.static({
                id: 'w1',
                name: '「ビゲン」イオン砲システム',
                translatedName: {
                    en: '"Viggen" Ion Cannon System',
                },
                mainSystem: true,
                skillComplete: true,
                skills: [
                    strategy.sustainedDamageOutput(3, 60).withCost(20),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                    enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
                    enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                    enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                ],
                skillSlots: 6,
            }),
            genericMissileLaunchingSystem,
            modules.static({
                id: 'w3',
                name: '防衛砲システム',
                translatedName: {
                    en: 'Defensive Battery System',
                },
                skillComplete: true,
                skills: [
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.increaseDamage().withPercentageValue(10).withCost(2),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
                    enhancements.reduceCooldown().withPercentageValue(15).withCost(2),
                    enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(2),
                    enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(10),
                ],
                skillSlots: 5,
            }),
            ...staticModules,
        ],
        defaultStats: {
            hp: 62120,
            armor: 50,
            shield: 10,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 15647,
            dpmAntiAir: 92,
            dpmSiege: 11979,
        },
    },
];
