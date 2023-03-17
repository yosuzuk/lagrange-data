import { enhancements, flagshipEffect } from '../../../enhancements/enhancements';
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
    skillSlots: 6,
    parts: [
        {
            text: [
                '「フォートレス」Mk4-BG-2650　艦首２連重砲',
                '対大型艦：',
                '・直射、実弾、対艦：8456、攻城：1231',
                'BG-1260型　対艦砲塔',
                '対小型艦：',
                '・直射、実弾、対艦：3286、対空：736、攻城：525',
            ],
        },
    ],
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
    // TODO skills
    skillSlots: 6,
    parts: [
        {
            text: [
                '「フォートレス」Mk4-BR-1850A　艦首攻城重電磁加速砲',
                '対大型艦：',
                '・直射、実弾、対艦：13500、攻城：3150',
                'BM-2x2808型　対空ミサイルランチャー群',
                '対空：',
                '・直射、実弾、対艦：1333、対空：2773',
            ],
        },
    ],
};

const b1: ISystemModule = {
    id: 'B1',
    name: 'フリゲート生産システム',
    translatedName: {
        en: 'Frigate Production System',
    },
    description: '自己保有能力でフリゲートが生産可能',
    category: 'B',
    categoryNumber: 1,
    defaultModule: true,
    effects: [
        enhancements.increaseSelfHostCapacity().withFixedAbsoluteValue(80),
        enhancements.increaseProductionSpeed().withFixedPercentageValue(10),
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

const b2: ISystemModule = {
    id: 'B2',
    name: '護送艦生産システム',
    translatedName: {
        en: 'Escort Corvette Production System',
    },
    description: '自己保有能力で護送艦が生産可能',
    category: 'B',
    categoryNumber: 2,
    effects: [
        enhancements.increaseProductionSpeed().withFixedPercentageValue(10),
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

const b3: ISystemModule = {
    id: 'B3',
    name: '駆逐艦生産システム',
    translatedName: {
        en: 'Destroyer Production System',
    },
    description: '自己保有能力で駆逐艦が生産可能',
    category: 'B',
    categoryNumber: 3,
    effects: [
        enhancements.increaseSelfHostCapacity().withFixedAbsoluteValue(80),
        enhancements.increaseProductionSpeed().withFixedPercentageValue(10),
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
        // TODO en
    },
    description: '大型戦闘機を2隊搭載可能',
    category: 'C',
    categoryNumber: 1,
    skillSlots: 6,
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

const d1: ISystemModule = {
    id: 'D1',
    name: '???',
    category: 'D',
    categoryNumber: 1,
};

const d2: ISystemModule = {
    id: 'D2',
    name: '???',
    category: 'D',
    categoryNumber: 2,
};

const d3: ISystemModule = {
    id: 'D3',
    translatedName: {
        en: '"Colossus" Guard UAV System',
    },
    name: '「巨像」防衛UAVシステム',
    description: '防御UAV４機搭載',
    category: 'D',
    categoryNumber: 3,
    skillSlots: 4,
    parts: [{
        text: [
            'CSF-2型　防御UAV格納庫',
            '大型防御UAVを４機搭載し、戦闘UAVの収容と整備を行う。防御UAVは試験型機載パルス武器を搭載しており、味方にフリゲート級に近い火力支援を提供できる。',
            '・エネルギー、対艦：9272', // TODO check, it's probably lower
        ],
    }],
};

const e1: ISystemModule = {
    id: 'E1',
    name: '重量級付加装甲システム',
    translatedName: {
        en: 'Heave Additional Armor System',
    },
    description: '抵抗値＆HPアップ',
    category: 'E',
    categoryNumber: 1,
    effects: [
        enhancements.increaseArmor().withFixedAbsoluteValue(80),
        enhancements.increaseHp().withFixedPercentageValue(15),
    ],
    skillSlots: 2,
    skills: [
        enhancements.increaseArmor().withAbsoluteValue(75),
        enhancements.increaseHp().withPercentageValue(10),
    ],
    parts: [{
        text: [
            'ASX-90型　重量級付加装甲',
            '既存の装甲外部に追加する物理強化層。艦船構造の衝撃耐性を効果的に高める。',
        ],
    }],
};

const e2: ISystemModule = {
    id: 'E2',
    name: 'ナノレベル自己補修システム',
    translatedName: {
        en: 'Nano Automated Maintenance System',
    },
    description: '自身の補修を行う',
    category: 'E',
    categoryNumber: 2,
    skillSlots: 3,
    parts: [{
        text: [
            'BST-300型　ナノ補修システム',
            '既存の装甲内に追加するナノ自己補修システム。艦船のダメージ管理と自己メンテナンスを行う。戦闘時、自身が受けたHPダメージの補修を自発的に行う。',
        ],
    }],
};

const staticModules: ISystemModule[] = [
    // TODO find out if static: 「ツンドラ」要撃UAVシステム（Ｄ１？）
    // TODO find out if static: 総合支援ドック
    modules.static({
        id: 'supportDock',
        name: '総合支援ドック',
        translatedName: {
            en: 'Integrated Support Dock',
        },
    }),
    modules.commandSystem({
        flagshipEffects: [
            flagshipEffect.focusFire().withDefaultFlag(),
        ],
    }),
    modules.armorSystem({
        skillSlots: 4,
    }),
    modules.propulsionSystem({
        skillSlots: 2,
    }),
    modules.energySystem(),
];

const defaultStats: IDefaultShipStats = {
    hp: 253080,
    armor: 120,
    shield: 15,
    speed: 420,
    warpSpeed: 2100,
    dpmShip: 11496,
    dpmAntiAir: 8388,
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
        modules: [m1, m2, b1, b2, b3, c1, c2, d1, d2, d3, e1, ...staticModules],
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
            modules.toStatic(b1),
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
            modules.toStatic(b3),
            modules.toStatic(e2),
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
            modules.toStatic(b1),
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
            modules.toStatic(b1),
            modules.toStatic(e1),
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
            modules.toStatic(e2),
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
            modules.toStatic(b2),
            modules.toStatic(c2),
            modules.toStatic(d3),
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
    },
];
