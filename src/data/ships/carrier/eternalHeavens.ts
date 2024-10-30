import { enhancements, flagshipEffect } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipSubType, ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '戦闘機連合作戦格納庫Ⅰ型',
    translatedName: {
        en: 'Collaborative Hangar I',
    },
    description: '中型艦載機を3機搭載可能',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    carryFighter: 3,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    skillComplete: true,
    skills: [
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(10),
        enhancements.reduceRtbOfAircraft().withPercentageValue(40).withCost(10),
        enhancements.reduceFlightTimeOfAircraft().withPercentageValue(40).withCost(10),
        enhancements.reduceFlightTimeOfAircraft().withPercentageValue(20).withCost(10),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(10),
        enhancements.reduceLockOnOfAircraft().withPercentageValue(50).withCost(10),
        enhancements.customEnhancementWithKey('tacticsOfGuerillas').withDescriptionKey('tacticsOfGuerillas').withCost(10),
        enhancements.customEnhancementWithKey('jointStrike').withDescriptionKey('jointStrike', { chance: 50, damage: 200 }).withCost(35),
    ],
    skillSlots: 6,
};

const m2: ISystemModule = {
    id: 'M2',
    name: '戦闘機連合作戦格納庫ⅠⅠ型',
    translatedName: {
        en: 'Collaborative Hangar II',
    },
    description: '中型艦載機を3機搭載可能',
    category: 'M',
    categoryNumber: 2,
    mainSystem: true,
    carryFighter: 3,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    skillComplete: false,
    skills: [
        // TODO cost
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.reduceRtbOfAircraft().withPercentageValue(40),
        enhancements.reduceFlightTimeOfAircraft().withPercentageValue(40),
        enhancements.reduceFlightTimeOfAircraft().withPercentageValue(20),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20),
        enhancements.reduceLockOnOfAircraft().withPercentageValue(50),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30),
        enhancements.customEnhancementWithKey('threeDimensionalCoverSupport').withDescriptionKey('threeDimensionalCoverSupport', { chance: 60 }),
    ],
    skillSlots: 6,
};

const m3: ISystemModule = {
    id: 'M3',
    name: '戦闘機連合作戦格納庫ⅠⅠⅠ型',
    translatedName: {
        en: 'Collaborative Hangar III',
    },
    description: '中型艦載機を3機搭載可能',
    category: 'M',
    categoryNumber: 3,
    mainSystem: true,
    carryFighter: 3,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    skillComplete: false,
    skills: [
        // TODO skill
    ],
    skillSlots: 6,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '複合砲システム',
    translatedName: {
        en: 'Integrated Battery System',
    },
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    skillComplete: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(10),
    ],
    skillSlots: 4,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '試験的イオン砲塔システム',
    translatedName: {
        en: 'Experimental Ion Turret System',
    },
    description: '対空＆対大型武装',
    category: 'A',
    categoryNumber: 2,
    skillComplete: false,
    skills: [
        // TODO cost
        enhancements.increaseIonDamage().withPercentageValue(10),
        enhancements.increaseIonDamage().withPercentageValue(10),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.increaseHitRateVsLarge().withPercentageValue(15),
        enhancements.increaseSystemHp().withPercentageValue(35),
    ],
    skillSlots: 5,
};

const a3: ISystemModule = {
    id: 'A3',
    name: '???',
    translatedName: {
        en: 'Pulse Anti-Aircraft System',
    },
    category: 'A',
    categoryNumber: 3,
    skillComplete: false,
    skills: [
        // TODO skill
    ],
    skillSlots: 0,
};

const b1: ISystemModule = {
    id: 'B1',
    name: '対艦投射システム',
    translatedName: {
        en: 'Anti-Ship Projectile Launching System',
    },
    category: 'B',
    categoryNumber: 1,
    skillComplete: false,
    skills: [
        // TODO skill
    ],
    skillSlots: 4,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '防御要撃システム',
    translatedName: {
        en: 'Anti-Missile Defense System',
    },
    description: '対空要撃＆対小型武装',
    category: 'B',
    categoryNumber: 2,
    skillComplete: false,
    skills: [
        // TODO cost
        enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10),
        enhancements.increaseMissileAndTorpedoDamage().withPercentageValue(10),
        enhancements.increaseInterceptionChance().withPercentageValue(15),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
        enhancements.reduceCooldown().withPercentageValue(15),
    ],
    skillSlots: 4,
    dpmShip: 1104,
    dpmAntiAir: 257,
    dpmSiege: 225,
};

const b3: ISystemModule = {
    id: 'B3',
    name: '???',
    translatedName: {
        en: 'Anti-Aircraft Missile Platform',
    },
    category: 'B',
    categoryNumber: 3,
    skillComplete: false,
    skills: [
        // TODO skill
    ],
    skillSlots: 0,
};

const c1: ISystemModule = {
    id: 'C1',
    name: '追加艦載機格納庫',
    translatedName: {
        en: 'Auxiliary Aircraft Hangar',
    },
    description: '大型艦載機を4機搭載可能',
    category: 'C',
    categoryNumber: 1,
    carryFighter: 4,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
    skillComplete: false,
    skills: [
        // TODO cost
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.reduceRtbOfAircraft().withPercentageValue(40),
        enhancements.reduceFlightTimeOfAircraft().withPercentageValue(40),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30),
    ],
    skillSlots: 4,
};

const c2: ISystemModule = {
    id: 'C2',
    name: '追加護送艦ドック',
    translatedName: {
        en: 'Auxiliary Corvette Dockyard',
    },
    description: '護送艦を4機搭載可能',
    category: 'C',
    categoryNumber: 2,
    carryCorvette: 4,
    skillComplete: false,
    skills: [
        // TODO cost
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70),
        enhancements.reduceRtbOfAircraft().withPercentageValue(40),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20),
        enhancements.reduceHitByProjectile().withPercentageValue(20),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30),
    ],
    skillSlots: 4,
};

const c3: ISystemModule = {
    id: 'C3',
    name: '???',
    translatedName: {
        en: 'Support Repair UAV System',
    },
    category: 'C',
    categoryNumber: 3,
    skillComplete: false,
    skills: [
        // TODO skill
    ],
    skillSlots: 0,
};

const defaultStats: IDefaultShipStats = {
    hp: 298690,
    armor: 105,
    shield: 15,
    speed: 350,
    warpSpeed: 1750,
    dpmShip: 18002,
    dpmAntiAir: 3130,
    dpmSiege: 4589,
};

export const eternalHeavens: IShipDefinition[] = [
    {
        id: ShipId.ETERNAL_HEAVENS,
        name: 'エターナルヘブン級',
        translatedName: {
            en: 'Eternal Heavens',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 2,
        row: ShipRow.BACK,
        operationLimit: 5,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        // relatedShipIds: [ShipId.ETERNAL_HEAVENS_TE],
        modules: [
            m1,
            m2,
            m3,
            a1,
            a2,
            a3,
            b1,
            b2,
            b3,
            c1,
            c2,
            c3,
            modules.commandSystem({
                skillComplete: true,
                flagshipEffects: [
                    flagshipEffect.strategicStrike2(120).withDefaultFlag(),
                    flagshipEffect.strategicStrike3(360, '15gm').withCost(20),
                    flagshipEffect.focusFire().withDefaultFlag(),
                ],
                skills: [
                    enhancements.customEnhancementWithKey('multiTargetAttack').withDescriptionKey('multiTargetAttack', { targetCount: 3 }).withCost(30),
                    enhancements.customEnhancementWithKey('auxiliaryAttackRadar').withDescriptionKey('auxiliaryAttackRadar', { hitrate: 8 }).withCost(20),
                    enhancements.customEnhancementWithKey('extraAmmoSupply').withDescriptionKey('extraAmmoSupply', { roundsPerCycle: 2, duration: 50 }).withCost(20),
                    enhancements.customEnhancementWithKey('rangeExtension').withDescriptionKey('rangeExtension', { radius: '10.0' }).withCost(20),
                    enhancements.increaseSystemHp().withPercentageValue(10).withCost(10),
                ],
                skillSlots: 3,
            }),
            modules.armorSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseHp().withPercentageValue(10).withCost(12),
                    enhancements.increaseHp().withPercentageValue(10).withCost(12),
                    enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
                    enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
                    enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
                    enhancements.increaseShield().withPercentageValue(10).withCost(8),
                    enhancements.increaseRepairEffectivenessByArmor().withPercentageValue(0.05).withCost(8),
                ],
                skillSlots: 4,
            }),
            modules.propulsionSystem({
                skillComplete: true,
                skills: [
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                    enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
                ],
                skillSlots: 2,
            }),
            modules.energySystem({
                skillComplete: true,
                skillSlots: 0,
            }),
        ],
        defaultStats,
    },
];
