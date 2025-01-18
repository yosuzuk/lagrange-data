import { enhancements, flagshipEffect, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IDefaultShipStats, IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: 'フォートレス艦首重砲システム',
    translatedName: {
        en: 'Fortress Bow-Mounted Heavy Cannon System',
    },
    description: '対大型＆対小型武装',
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
    mainSystem: true,
    skillComplete: true,
    skills: [
        strategy.customStrategy({
            name: '乱射',
            translatedName: {
                en: 'Full Firepower',
            },
            description: 'システム内のメイン武器が2ラウンド作動するごとに、次ラウンドの攻撃回数が1増加する。',
            translatedDescription: {
                en: 'After every 2 round(s) of attacks of the main weapon in the system, increases the Rounds Per Cycle by 1 for the next round of attack.',
            },
        }).withCost(15),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRateVsLarge().withPercentageValue(10).withCost(10),
        enhancements.reduceLockOn().withPercentageValue(30).withCost(10),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                '「フォートレス」Mk4-BG-2650　艦首２連重砲',
                '対大型艦：',
                '・直射、実弾、対艦：8084、攻城：1231',
                'BG-1260型　対艦砲塔',
                '対小型艦：',
                '・直射、実弾、対艦：2973、対空：394、攻城：525',
            ],
        },
    ],
    dpmShip: 11057,
    dpmAntiAir: 394,
    dpmSiege: 1756,
};

const m2: ISystemModule = {
    id: 'M2',
    name: 'フォートレス攻城電磁加速砲システム',
    translatedName: {
        en: 'Fortress Assault Railgun System',
    },
    description: '対大型＆対空武装',
    category: 'M',
    categoryNumber: 2,
    mainSystem: true,
    skillComplete: true,
    skills: [
        strategy.customStrategy({
            name: '過負荷加速',
            translatedName: {
                en: 'Overloading Speed-up',
            },
            description: 'システム内のメイン武器が2ラウンド作動するごとに、次ラウンドの攻撃に25%ダメージが追加され、同時に物理シールド貫通効果を得る。',
            translatedDescription: {
                en: 'After every 2 round(s) of attacks of the main weapon in the system, the next round of attack deals an additional 25% damage and has physical armor penetration.',
            },
        }).withCost(15),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseDamage().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRateVsLarge().withPercentageValue(10).withCost(10),
        enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
        enhancements.increaseCriticalChance().withPercentageValue(50).withCost(10),
    ],
    skillSlots: 6,
    parts: [
        {
            text: [
                '「フォートレス」Mk4-BR-1850A　艦首攻城重電磁加速砲',
                '対大型艦：',
                '・直射、実弾', // TODO dpm
                'BM-2x2808型　対空ミサイルランチャー群',
                '対空：',
                '・直射、実弾', // TODO dpm
            ],
        },
    ],
    // TODO total dpm
};

const coreEnhancementTech = enhancements.customEnhancement({
    name: 'コア強化技術',
    translatedName: {
        en: 'Core Enhancement Tech',
    },
    description: '支援艦で製造する自己保有艦船のHP上限が10%アップし、製造時の金属消費が10%アップする。',
    translatedDescription: {
        en: 'Increases the max HP of Self-hold Ships produced by Auxiliary Ships by 10% and the Metal cost of production by 10%.',
    },
});

const alloyArmorTechnics = enhancements.customEnhancement({
    name: '合金装甲技術',
    translatedName: {
        en: 'Alloy Armor Technics',
    },
    description: '支援艦で製造する自己保有艦船の物理ダメージ抵抗が10アップし、製造時の金属消費が3%アップする。',
    translatedDescription: {
        en: 'Increases the Physical Resistance of Self-hold Ships produced by Auxiliary Ships by 10 and the Metal cost of production by 3%.',
    },
});

const a1: ISystemModule = {
    id: 'A1',
    name: 'フリゲート生産システム',
    translatedName: {
        en: 'Frigate Production System',
    },
    description: '自己保有能力でフリゲートが生産可能',
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
    effects: [
        enhancements.increaseSelfHostCapacity().withFixedAbsoluteValue(80),
        enhancements.increaseProductionSpeed().withFixedPercentageValue(10),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseProductionSpeed().withPercentageValue(60).withCost(10),
        enhancements.increaseProductionSpeed().withPercentageValue(60).withCost(10),
        enhancements.increaseSelfHostCapacity().withAbsoluteValue(40).withCost(20),
        coreEnhancementTech.withCost(10),
        alloyArmorTechnics.withCost(10),
    ],
    skillSlots: 4,
    parts: [{
        text: [
            'MF-2500型　艦上フリゲート生産設備',
            '完全な小型艦船生産設備を備え、基地を離れて支援艦単独でのフリゲート生産を可能とするが生産効率は低め。',
            'BMP-60型　生産ライン改造モジュール',
            'ノマシッピンググループが支援艦用にカスタマイズした生産ライン改造モジュールて、自己保有艦船の製造効率をアップし、製造する自己保有艦船の構造強化を行うことができる。',
        ],
    }],
};

const a2: ISystemModule = {
    id: 'A2',
    name: '護送艦生産システム',
    translatedName: {
        en: 'Escort Corvette Production System',
    },
    description: '自己保有能力で護送艦が生産可能',
    category: 'A',
    categoryNumber: 2,
    effects: [
        enhancements.increaseProductionSpeed().withFixedPercentageValue(10),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseProductionSpeed().withPercentageValue(60).withCost(10),
        enhancements.increaseProductionSpeed().withPercentageValue(60).withCost(10),
        enhancements.customEnhancement({
            name: 'コア強化技術',
            translatedName: {
                en: 'Core Enhancement Tech',
            },
            description: '支援艦で製造する艦載機のHP上限が10%アップし、製造時の金属消費が10%アップする。',
            translatedDescription: {
                en: 'Increases the max HP of Aircraft produced by Auxiliary Ships by 10% and the Metal cost of production by 10%.',
            },
        }).withCost(10),
        enhancements.customEnhancement({
            name: '合金航空装甲技術',
            translatedName: {
                en: 'Alloy Aircraft Armor Technics',
            },
            description: '支援艦で製造する艦載機の物理ダメージ抵抗が1アップし、製造時の金属消費が10%アップする。',
            translatedDescription: {
                en: 'Increases the Physical Resistance of Aircraft produced by Auxiliary Ships by 1 and the Metal cost of production by 10%.',
            },
        }).withCost(10),
    ],
    skillSlots: 3,
    parts: [{
        text: [
            'MC-2500型　艦上護送艦生産設備',
            '完全な小型艦載機生産設備を備え、基地を離れて支援艦単独での護送艦生産を可能とするが生産効率は低め。',
            'BMP-60型　生産ライン改造モジュール',
            'ノマシッピンググループが支援艦用にカスタマイズした生産ライン改造モジュールて、自己保有艦船の製造効率をアップし、製造する自己保有艦船の構造強化を行うことができる。',
        ],
    }],
};

const a3: ISystemModule = {
    id: 'A3',
    name: '駆逐艦生産システム',
    translatedName: {
        en: 'Destroyer Production System',
    },
    description: '自己保有能力で駆逐艦が生産可能',
    category: 'A',
    categoryNumber: 3,
    effects: [
        enhancements.increaseSelfHostCapacity().withFixedAbsoluteValue(80),
        enhancements.increaseProductionSpeed().withFixedPercentageValue(10),
    ],
    skillComplete: true,
    skills: [
        enhancements.increaseProductionSpeed().withPercentageValue(60).withCost(10),
        enhancements.increaseProductionSpeed().withPercentageValue(60).withCost(10),
        enhancements.increaseSelfHostCapacity().withAbsoluteValue(40).withCost(20),
        coreEnhancementTech.withCost(10),
        alloyArmorTechnics.withCost(10),
    ],
    skillSlots: 4,
    parts: [{
        text: [
            'MD-2500型　艦上駆逐艦生産設備',
            '完全な小型艦船生産設備を備え、基地を離れて支援艦単独での駆逐艦生産を可能とするが生産効率は低め。',
            'BMP-60型　生産ライン改造モジュール',
            'ノマシッピンググループが支援艦用にカスタマイズした生産ライン改造モジュールて、自己保有艦船の製造効率をアップし、製造する自己保有艦船の構造強化を行うことができる。',
        ],
    }],
};

const c1: ISystemModule = {
    id: 'C1',
    name: '戦闘機搭載システム',
    translatedName: {
        en: 'Aircraft Loading System',
    },
    description: '大型戦闘機を2隊搭載可能',
    category: 'C',
    categoryNumber: 1,
    skillComplete: true,
    skills: [
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(6),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
        enhancements.customEnhancement({
            name: '艦載機緊急補修',
            translatedName: {
                en: 'Aircraft Emergency Repair',
            },
            description: '帰還した艦載機を10%緊急補修し、戦闘機のメイン武器の冷却時間を50%延長する',
            translatedDescription: {
                en: 'Performs emergency repairs on aircraft upon returning for 10%, and extends the CD of the primary weapon on the Fighter by 50%',
            },
        }).withCost(6),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'CFB-200型　大型戦闘機格納庫',
                '2隊の大型戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令・探査システムを備える。',
            ],
        },
    ],
};

const c2: ISystemModule = {
    id: 'C2',
    name: '護送艦ドック',
    translatedName: {
        en: 'Corvette Dock',
    },
    description: '護送艦を3隻搭載可能',
    carryCorvette: 3,
    category: 'C',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(6),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(30).withCost(6),
    ],
    skillSlots: 4,
    parts: [
        {
            text: [
                'CBC-2000型　護送艦ドック',
                '3隻の護送艦を格納可能な艦内格納庫。護送艦の整備、支援システムを備える。',
            ],
        },
    ],
};

const b1: ISystemModule = {
    id: 'B1',
    name: '「ツンドラ」要撃UAVシステム',
    translatedName: {
        en: '"Tundra" Interceptor UAV System',
    },
    description: '対空UAVを4機搭載',
    skillComplete: true,
    skills: [
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(8),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(8),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(8),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(8),
    ],
    skillSlots: 4,
    category: 'B',
    categoryNumber: 1,
    parts: [
        {
            text: [
                'CAT/R-6',
                '領域対空UAVポッド', // TODO ja
                '対空：',
                '・対空：4608',
            ],
        },
    ],
};

const b2: ISystemModule = {
    id: 'B2',
    name: '「ハミングバード」火力偵察UAVシステム',
    translatedName: {
        en: '"Hummingbird" Firepower Recon UAV System',
    },
    description: '偵察UAVを4機搭載',
    category: 'B',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
        strategy.prioritizeSupport2(30).withCost(12),
    ],
    skillSlots: 3,
    parts: [
        {
            text: [
                'CFT-6',
                '偵察UAVポッド', // TODO ja
            ],
        },
    ],
};

const b3: ISystemModule = {
    id: 'B3',
    name: '「巨像」防衛UAVシステム',
    translatedName: {
        en: '"Colossus" Guard UAV System',
    },
    description: '防御UAV４機搭載',
    category: 'B',
    categoryNumber: 3,
    skillComplete: true,
    skills: [
        enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(6),
        enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(6),
        enhancements.increaseMissileEvasionOfAircraft().withPercentageValue(20).withCost(6),
    ],
    skillSlots: 4,
    parts: [{
        text: [
            'CSF-2型　防御UAV格納庫',
            '大型防御UAVを４機搭載し、戦闘UAVの収容と整備を行う。防御UAVは試験型機載パルス武器を搭載しており、味方にフリゲート級に近い火力支援を提供できる。',
            '・エネルギー、対艦：8072',
        ],
    }],
};

const d1: ISystemModule = {
    id: 'D1',
    name: '重量級付加装甲システム',
    translatedName: {
        en: 'Heavy Additional Armor System',
    },
    description: '抵抗値＆HPアップ',
    category: 'D',
    categoryNumber: 1,
    effects: [
        enhancements.increaseArmor().withFixedAbsoluteValue(80),
        enhancements.increaseHp().withFixedPercentageValue(15),
    ],
    skillComplete: true,
    skillSlots: 2,
    skills: [
        enhancements.increaseHp().withPercentageValue(14).withCost(10),
        enhancements.increaseHp().withPercentageValue(14).withCost(10),
        enhancements.increaseArmor().withAbsoluteValue(75).withCost(6),
        enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(6),
    ],
    parts: [{
        text: [
            'ASX-90型　重量級付加装甲',
            '既存の装甲外部に追加する物理強化層。艦船構造の衝撃耐性を効果的に高める。',
        ],
    }],
};

const d2: ISystemModule = {
    id: 'D2',
    name: 'ナノレベル自己補修システム',
    translatedName: {
        en: 'Nano Automated Maintenance System',
    },
    description: '自身の補修を行う',
    category: 'D',
    categoryNumber: 2,
    skillComplete: true,
    skills: [
        strategy.customStrategy({
            name: '緊急修理',
            translatedName: {
                en: 'Emergency Repairs',
            },
            description: '自身のHPが40%まで下がったとき、自己補修効果が150%アップ。効果は50秒続く。この効果は戦闘中に1回しか発生しない。',
            translatedDescription: {
                en: 'When the ship\'s HP falls to 40%, increases repair effectiveness by 150% for 50s. This effect only triggers once per battle.',
            },
        }).withCost(12),
        enhancements.increaseRepairEffectiveness().withPercentageValue(10).withCost(6),
        enhancements.increaseRepairEffectiveness().withPercentageValue(10).withCost(6),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
        enhancements.reduceCooldown().withPercentageValue(15).withCost(6),
    ],
    skillSlots: 3,
    parts: [{
        text: [
            'BST-300型　ナノ補修システム',
            '既存の装甲内に追加するナノ自己補修システム。艦船のダメージ管理と自己メンテナンスを行う。戦闘時、自身が受けたHPダメージの補修を自発的に行う。',
        ],
    }],
};

const staticModules: ISystemModule[] = [
    modules.static({
        id: 'supportDock',
        name: '総合支援ドック',
        translatedName: {
            en: 'Integrated Support Dock',
        },
        skillComplete: true,
        flagshipEffects: [
            flagshipEffect.fleetDock2().withCost(15).withDefaultFlag(),
        ],
        skills: [
            enhancements.increaseRepairSpeedOfAuxiliary().withPercentageValue(20).withCost(8),
            enhancements.increaseRepairSpeedOfAuxiliary().withPercentageValue(20).withCost(8),
            enhancements.reducePrefabCost().withPercentageValue(20).withCost(8),
            enhancements.reducePrefabCost().withPercentageValue(20).withCost(8),
            enhancements.increaseSupplySpeed().withPercentageValue(34).withCost(8),
            enhancements.increaseSupplySpeed().withPercentageValue(34).withCost(8),
            enhancements.increaseCustomModuleStorage().withAbsoluteValue(30).withCost(8),
            enhancements.increaseCustomModuleStorage().withAbsoluteValue(30).withCost(8),
        ],
        skillSlots: 6,
    }),
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
            enhancements.increaseHp().withPercentageValue(14).withCost(12),
            enhancements.increaseHp().withPercentageValue(14).withCost(12),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
            enhancements.increaseRepairEffectivenessByArmor().withPercentageValue(5).withCost(8),
        ],
        skillSlots: 4,
    }),
    modules.propulsionSystem({
        skillComplete: true,
        skills: [
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(8),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(8),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(8),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(8),
        ],
        skillSlots: 2,
    }),
    modules.energySystem({
        skillComplete: true,
        skillSlots: 0,
    }),
];

const defaultStats: IDefaultShipStats = {
    hp: 276529,
    armor: 120,
    shield: 15,
    speed: 420,
    warpSpeed: 2100,
    dpmShip: 11057,
    dpmAntiAir: 5002,
    dpmSiege: 1756,
};

export const ediacaran: IShipDefinition[] = [
    {
        id: ShipId.EDIACARAN,
        name: 'エディアカラ級',
        translatedName: {
            en: 'Ediacaran',
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 2,
        row: ShipRow.MIDDLE,
        operationLimit: 2,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        modules: [m1, m2, b1, a1, a2, a3, b2, b3, c1, c2, d1, d2, ...staticModules],
        defaultStats,
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
        relatedShipIds: [
            ShipId.EDIACARAN_TE,
            ShipId.EDIACARAN_TE_2,
            ShipId.EDIACARAN_TE_PREVIEW1,
            ShipId.EDIACARAN_TE_PREVIEW2,
            ShipId.EDIACARAN_TE_PREVIEW3,
            ShipId.EDIACARAN_TE_PREVIEW4,
        ],
    },
    {
        id: ShipId.EDIACARAN_TE,
        name: 'エディアカラ級-TE エイグラム版',
        translatedName: {
            en: 'Ediacaran (TE) Angulum',
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a1),
            ...staticModules,
        ],
        defaultStats,
        relatedShipIds: [
            ShipId.EDIACARAN,
            ShipId.EDIACARAN_TE_2,
            ShipId.EDIACARAN_TE_PREVIEW1,
            ShipId.EDIACARAN_TE_PREVIEW2,
            ShipId.EDIACARAN_TE_PREVIEW3,
            ShipId.EDIACARAN_TE_PREVIEW4,
        ],
    },
    {
        id: ShipId.EDIACARAN_TE_2,
        name: 'エディアカラ級-TE エイグラム版 (M2+B3+E2)',
        translatedName: {
            en: 'Ediacaran (TE) Angulum (M2+B3+E2)',
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        modules: [
            modules.toStatic(m2),
            modules.toStatic(a3),
            modules.toStatic(d2),
            ...staticModules,
        ],
        defaultStats,
        relatedShipIds: [
            ShipId.EDIACARAN,
            ShipId.EDIACARAN_TE,
            ShipId.EDIACARAN_TE_PREVIEW1,
            ShipId.EDIACARAN_TE_PREVIEW2,
            ShipId.EDIACARAN_TE_PREVIEW3,
            ShipId.EDIACARAN_TE_PREVIEW4,
        ],
        tags: [
            ShipTag.CURRENTLY_UNOBTAINABLE,
        ],
    },
    {
        id: ShipId.EDIACARAN_TE_PREVIEW1,
        name: 'エディアカラ級-TE トライアル版',
        translatedName: {
            en: 'Ediacaran (TE) Trial',
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a1),
            ...staticModules,
        ],
        defaultStats,
        relatedShipIds: [
            ShipId.EDIACARAN,
            ShipId.EDIACARAN_TE,
            ShipId.EDIACARAN_TE_2,
            ShipId.EDIACARAN_TE_PREVIEW2,
            ShipId.EDIACARAN_TE_PREVIEW3,
            ShipId.EDIACARAN_TE_PREVIEW4,
        ],
        tags: [
            ShipTag.CURRENTLY_UNOBTAINABLE,
        ],
    },
    {
        id: ShipId.EDIACARAN_TE_PREVIEW2,
        name: 'エディアカラ級-TE トライアル版 (E2)',
        translatedName: {
            en: 'Ediacaran (TE) Trial (E1)',
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        modules: [
            modules.toStatic(m1),
            modules.toStatic(a1),
            modules.toStatic(d1),
            ...staticModules,
        ],
        defaultStats,
        relatedShipIds: [
            ShipId.EDIACARAN,
            ShipId.EDIACARAN_TE,
            ShipId.EDIACARAN_TE_2,
            ShipId.EDIACARAN_TE_PREVIEW1,
            ShipId.EDIACARAN_TE_PREVIEW3,
            ShipId.EDIACARAN_TE_PREVIEW4,
        ],
        tags: [
            ShipTag.CURRENTLY_UNOBTAINABLE,
        ],
    },
    {
        id: ShipId.EDIACARAN_TE_PREVIEW3,
        name: 'エディアカラ級-TE トライアル版 (B3+E2)',
        translatedName: {
            en: 'Ediacaran (TE) Trial (B3+E2)',
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        modules: [
            modules.toStatic(m1),
            modules.toStatic(b3),
            modules.toStatic(d2),
            ...staticModules,
        ],
        defaultStats,
        relatedShipIds: [
            ShipId.EDIACARAN,
            ShipId.EDIACARAN_TE,
            ShipId.EDIACARAN_TE_2,
            ShipId.EDIACARAN_TE_PREVIEW1,
            ShipId.EDIACARAN_TE_PREVIEW2,
            ShipId.EDIACARAN_TE_PREVIEW4,
        ],
        tags: [
            ShipTag.CURRENTLY_UNOBTAINABLE,
        ],
    },
    {
        id: ShipId.EDIACARAN_TE_PREVIEW4,
        name: 'エディアカラ級-TE トライアル版 (M2+B2+C2+D3)',
        translatedName: {
            en: 'Ediacaran (TE) Trial (M2+B2+C2+D3)',
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        modules: [
            modules.toStatic(m2),
            modules.toStatic(a2),
            modules.toStatic(c2),
            modules.toStatic(b3),
            ...staticModules,
        ],
        defaultStats,
        relatedShipIds: [
            ShipId.EDIACARAN,
            ShipId.EDIACARAN_TE,
            ShipId.EDIACARAN_TE_2,
            ShipId.EDIACARAN_TE_PREVIEW1,
            ShipId.EDIACARAN_TE_PREVIEW2,
            ShipId.EDIACARAN_TE_PREVIEW3,
        ],
        tags: [
            ShipTag.CURRENTLY_UNOBTAINABLE,
        ],
    },
];
