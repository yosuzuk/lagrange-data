import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '総合艦載機搭載プラットフォーム',
    translatedName: {
        en: 'Integrated Aircraft Hangar',
    },
    description: '小～大型艦載機を5機、護送艦を3機搭載可能',
    category: 'M',
    categoryNumber: 1,
    carryCorvette: 3,
    carryFighter: 5,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
    defaultModule: true,
    mainSystem: true,
    skills: [
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(13),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(13),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(13),
        enhancements.increaseSystemHp().withPercentageValue(35).withCost(13),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'CFB-605型　大型戦闘機格納庫',
                '5隊の大型戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令・探査システムを備える。',
                'CBC-2100型　護送艦ドック',
                '3隻の護送艦を格納可能な機内格納庫。護送艦の整備・支援システムを備える。',
            ],
        },
    ],
};

const m2: ISystemModule = {
    id: 'M2',
    name: '総合戦闘機システム',
    translatedName: {
        en: 'Integrated Aircraft System',
    },
    description: '小～大型艦載機を5機搭載可能、戦略UAVを5機搭載',
    category: 'M',
    categoryNumber: 2,
    carryFighter: 5,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
    mainSystem: true,
    skills: [
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(13),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(13),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(13),
        enhancements.increaseSystemHp().withPercentageValue(35).withCost(13),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'CFB-605型　大型戦闘機格納庫',
                'CIT-5型　戦場支援UAV格納庫',
                '5隊の戦略UAVを搭載可能な総合UAV格納庫。敵艦の武器システムにピンポイント攻撃を行える。',
                '戦略UAV' // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const m3: ISystemModule = {
    id: 'M3',
    name: '大型戦闘機システム',
    translatedName: {
        en: 'Large Aircraft System',
    },
    description: '大型戦闘機を8機搭載可能',
    category: 'M',
    categoryNumber: 3,
    carryFighter: 8,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
    mainSystem: true,
    skills: [
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(13),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.reduceRtbOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(13),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(13),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(13),
        enhancements.increaseSystemHp().withPercentageValue(35).withCost(13),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'CFB-605型　大型戦闘機格納庫',
                '3隊の重戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令、探査システムを備える。',
            ],
        },
    ],
};

const a1: ISystemModule = {
    id: 'A1',
    name: '「ドラグーン」砲撃システム',
    translatedName: {
        en: 'Dragoon Battery System',
    },
    description: '対小型＆対空武装',
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.increaseLockOnEfficiency().withPercentageValue(15).withCost(10),
    ],
    skillSlots: 5,
    parts: [
        {
            text: [
                'MK4-C/SG-3480A型　3連重砲',
                '対小型艦：',
                '・直射、実弾、対艦：3800、攻城：520',
                'C/SG-190B型　通常連射砲',
                '対空：',
                '・直射、実弾、対艦：2700、対空：297、攻城：99',
                '反撃対空',
            ],
        },
    ],
    dpmShip: 6500,
    dpmAntiAir: 297,
    dpmSiege: 619,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '対空ミサイルプラットフォーム',
    translatedName: {
        en: 'Anti-Aircraft Missile Platform',
    },
    description: '対空武装、ミサイル迎撃',
    category: 'A',
    categoryNumber: 2,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'BM-12x180T型　防御ミサイルシステム',
                '対空、ミサイル迎撃：',
                '・投射、実弾、対艦：2700、対空：354',
                '支援対空',
                '迎撃効果'
            ],
        },
    ],
    dpmShip: 2700,
    dpmAntiAir: 354,
    dpmSiege: 0,
};

const b1: ISystemModule = {
    id: 'B1',
    name: 'ミサイル防御システム',
    translatedName: {
        en: 'Missile Defense System',
    },
    description: '対空武装、ミサイル迎撃',
    category: 'B',
    categoryNumber: 1,
    skills: [
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(8),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(8),
        enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
        enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'MK3-SM-6x4008/C型「スターファイア」ミサイルランチャー群',
                '対空：',
                '・投射、実弾、対艦：1200、対空：210、攻城：70',
                '迎撃効果',
                '反撃対空',
            ],
        },
    ],
    dpmShip: 1200,
    dpmAntiAir: 210,
    dpmSiege: 70,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '護送艦搭載プラットフォーム',
    translatedName: {
        en: 'Corvette Loading System',
    },
    description: '護送艦を3機搭載可能',
    category: 'B',
    categoryNumber: 2,
    carryCorvette: 3,
    skills: [
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(12),
        enhancements.reduceRtbOfAircraft().withPercentageValue(10).withCost(12),
        enhancements.reduceRtbOfAircraft().withPercentageValue(10).withCost(12),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(12),
    ],
    skillSlots: 3,
    parts: [
        {
            text: [
                'CBC-2100型　護送艦ドック',
                '3隻の護送艦を格納可能な機内格納庫。護送艦の整備・支援システムを備える。',
            ],
        },
    ],
};

const b3: ISystemModule = {
    id: 'B3',
    name: '情報UAV支援プラットフォーム',
    translatedName: {
        en: 'Info UAV Support Platform',
    },
    description: '情報UAVを3機搭載',
    category: 'B',
    categoryNumber: 3,
    // TODO skills
    // TODO skillslot
    parts: [
        {
            text: [
                'CITA-2型　戦場支援UAV搭載室',
                '通信指令UAVを3機搭載する。',
                '通信指令UAVの収容と整備を担い、信号誘導システムを装備する。',
                '情報UAVは支援艦の武器命中率をアップさせる。',
            ],
        },
    ],
};

const staticModules: ISystemModule[] = [
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
            flagshipEffect.strategicStrike1(90).withDefaultFlag(),
            flagshipEffect.strategicStrike3(360, '15.0').withCost(30),
        ],
        skills: [
            enhancements.customEnhancement('waveAdjustment').withDescriptionKey('waveAdjustment').withCost(10),
            enhancements.increaseCruisingSpeedOfAircraft().withPercentageValue(75),
            enhancements.increaseSystemHp().withPercentageValue(10).withCost(10),
        ],
        skillSlots: 3,
    }),
    modules.armorSystem({
        skills: [
            enhancements.increaseHp().withPercentageValue(14).withCost(8),
            enhancements.increaseHp().withPercentageValue(14).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
        ],
        skillSlots: 4,
    }),
    modules.propulsionSystem({
        skills: [
            strategy.evasiveManeuvers(20, 40, 40).withCost(20),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
        ],
        skillSlots: 4,
    }),
    modules.energySystem(),
];

const defaultStats: IDefaultShipStats = {
    hp: 278340,
    armor: 120,
    shield: 15,
    speed: 400,
    warpSpeed: 2000,
    dpmShip: 6500,
    dpmAntiAir: 297,
    dpmSiege: 619,
};

export const cv3000: IShipDefinition[] = [
    {
        id: ShipId.CV3000,
        name: 'CV3000級',
        translatedName: {
            en: 'CV3000',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 2,
        row: ShipRow.BACK,
        operationLimit: 5,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        relatedShipIds: [ShipId.CV3000_TE],
        modules: [m1, m2, m3, a1, a2, b1, b2, b3, ...staticModules],
        defaultStats,
    },
    {
        id: ShipId.CV3000_TE,
        name: 'CV3000級-TE',
        translatedName: {
            en: 'CV3000 (TE)',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.CV3000],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a1),
            ...staticModules,
        ],
        defaultStats,
    },
];
