import { skills } from '../../../skill/skill';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '総合支援プラットフォーム',
    description: '対空武装＆修理ドック',
    parts: [{
        text: [
            '対空：',
            '・直射、実弾、対艦：3000、対空：360、攻城：90',
            'カスタムモジュール備蓄量40',
            '補修キュー1',
        ],
        skillSlots: 5,
        skills: [
            {
                effect: '補修速度アップ',
                properties: '最大10％、技術Pt8',
            }, {
                effect: '補修速度アップ',
                properties: '最大10％、技術Pt8',
            }, {
                effect: 'クイック補修プレハブモジュール消費ダウン',
                properties: '最大10％、技術Pt8',
            }, {
                effect: '補給速度アップ',
                properties: '最大34％、技術Pt8',
            }, {
                effect: '補給速度アップ',
                properties: '最大34％、技術Pt8',
            }, {
                effect: 'カスタムモジュール容量アップ',
                properties: '最大15、技術Pt8',
            },
            skills.increaseDamage().withValue(10).withCost(5),
        ],
    }],
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '作業補修システム',
    description: 'スキルで補修速度アップ＆プレハブ消費ダウン',
    parts: [
        {
            text: [
                'クイック補修装置',
                '補修ロボットを搭載して、艦船の補修を加速できる。',
            ],
            skillSlots: 3,
            skills: [
                {
                    effect: '支援補修速度アップ',
                    properties: '最大10％',
                },
                {
                    effect: '支援補修速度アップ',
                    properties: '最大10％',
                },
                {
                    effect: 'グイック補修プレハブモジュール消費ダウン',
                    properties: '最大10％',
                },
                {
                    effect: 'グイック補修プレハブモジュール消費ダウン',
                    properties: '最大10％',
                },
            ],
        },
    ],
    category: 'A',
    categoryNumber: 1,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '戦略資源備蓄システム',
    description: '貯蔵力60000',
    parts: [{
        text: [
            '積載プラットフォーム',
            '大型露店運送システム。大量の貨物を格納でき、大型汎用艦に用いる。',
        ],
        // TODO skillslots
        // skillSlots: 99,
        skills: [
            {
                effect: '貯蔵力アップ',
                properties: '最大80％', // TODO 技術Pt
            },
            {
                effect: '補給速度アップ',
                properties: '最大34％', // TODO 技術Pt
            },
            {
                effect: 'カスタムモジュール容量アップ',
                properties: '最大15', // TODO 技術Pt
            },
            // TODO 4th skill
        ],
    }],
    category: 'A',
    categoryNumber: 2,
};

const b1: ISystemModule = {
    id: 'B1',
    name: 'フリゲート艦生産システム',
    description: '自己保有能力でフリゲートが生産可能',
    parts: [{
        text: [
            '完全な小型艦船生産設備を備え、基地を離れて支援艦単独でのフリゲートの生産を可能にするが生産効率は低め。',
            '支援艦の自己保有容量：60',
        ],
        skillSlots: 3,
    }],
    category: 'B',
    categoryNumber: 1,
    defaultModule: true,
};

const b2: ISystemModule = {
    id: 'B2',
    name: 'エスコート生産システム',
    description: '自己保有能力で護送艦が生産可能',
    parts: [{
        text: [
            '完全な小型艦載機生産設備を備え、基地を離れて支援艦単独での護送艦の生産を可能にするが生産効率は低め',
        ],
        skillSlots: 3,
    }],
    category: 'B',
    categoryNumber: 2,
};

const b3: ISystemModule = {
    id: 'B3',
    name: '戦闘機生産システム',
    description: '自己保有能力で戦闘機が生産可能',
    parts: [{
        text: [
            '完全な小型艦載機生産設備を備え、基地を離れて支援艦単独での戦闘機の生産を可能にするが生産効率は低め',
        ],
        skillSlots: 3,
    }],
    category: 'B',
    categoryNumber: 3,
};

const c1: ISystemModule = {
    id: 'C1',
    name: 'キャリア航空機システム',
    description: '小～中型戦闘機を２機搭載可能',
    parts: [{
        text: [
            '攻撃機と戦闘機を格納可能な中型機内格納庫。',
            '2隊までの戦闘機編隊を停泊・整備する空間を提供し、戦闘機の指令・探査システムを備える。',
        ],
        skillSlots: 4,
    }],
    category: 'C',
    categoryNumber: 1,
    carryFighter: 2,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
};

const c2: ISystemModule = {
    id: 'C2',
    name: 'UAV補修システム',
    description: '補修ＵＡＶ×２',
    parts: [{
        text: [
            'CRT-3型　汎用ロボット補修ポッド',
            '標準補修UAVを2機搭載する。補修UAVの収容と整備を担い、信号誘導システムを装備する。補修UAVは補修した味方艦船を戦闘中に補修できる。',
        ],
        skillSlots: 4,
    }],
    category: 'C',
    categoryNumber: 2,
};

const d1: ISystemModule = {
    id: 'D1',
    name: '指令システムの警告',
    description: '味方艦船の被命中率ダウン（回避アップ）',
    parts: [{
        text: [
            '後列の魚雷攻撃被命中率ダウン：8%',
            '後列のミサイル攻撃被命中率ダウン：8%',
        ],
        skillSlots: 2,
        skills: [{
            effect: '後列の投射武器の被命中率ダウン',
            properties: '最大8％、技術Pt：8',
        }, {
            effect: '中列の投射武器の被命中率ダウン',
            properties: '最大8％、技術Pt：8',
        }, {
            effect: '後列の低速武器の被命中率ダウン',
            properties: '最大8％、技術Pt：8',
        }],
    }],
    category: 'D',
    categoryNumber: 1,
    defaultModule: true,
};

const d2: ISystemModule = {
    id: 'D2',
    name: '協同指令システム',
    description: '味方艦船の命中率アップ',
    parts: [{
        text: [
            '後列のミサイル武器命中率アップ：12%',
            '後列の魚雷武器命中率アップ：12%',
        ],
        skillSlots: 2,
        skills: [
            {
                effect: '中列のミサイル/魚雷命中率アップ',
                properties: '最大8％、技術Pt：8',
            },
        ],
    }],
    category: 'D',
    categoryNumber: 2,
};

const d3: ISystemModule = {
    id: 'D3',
    name: '指令システムの妨害',
    description: '艦種を空母か駆逐艦に偽装',
    parts: [{
        text: [
            '視覚信号カモフラージュ',
            '自身が攻撃目標になった時に、航空空母と見なされるようにする',
        ],
        skillSlots: 2,
        skills: [{
            effect: '自身が攻撃目標になった時に、駆逐艦と見なされるようにする',
        }],
    }],
    category: 'D',
    categoryNumber: 3,
};

const e1: ISystemModule = {
    id: 'E1',
    name: 'エリア防空システム',
    description: '対空武装（同列）',
    parts: [{
        text: [
            '対空：',
            '・直射、実弾、対空：3920'
        ],
        skillSlots: 4,
    }],
    category: 'E',
    categoryNumber: 1,
};

const e2: ISystemModule = {
    id: 'E2',
    name: 'エスコートドック',
    description: '護送艦を３機搭載可能',
    parts: [{
        text: [
            '３隻の護送艦を格納可能な機内格納庫。',
            '護送艦の整備・支援システムを備える。',
        ],
        skillSlots: 4,
    }],
    category: 'E',
    categoryNumber: 2,
    carryCorvette: 3,
};

export const fsv830: IShipDefinition[] = [
    {
        id: ShipId.FSV830,
        name: 'FSV830',
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 2,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        relatedShipIds: [ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW4, ShipId.FSV830_TE_PREVIEW5],
        modules: [m1, a1, a2, b1, b2, b3, c1, c2, d1, d2, d3, e1, e2],
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
    },
    {
        id: ShipId.FSV830_TE_PREVIEW1,
        name: 'FSV830-TE トライアル版',
        translatedName: {
            en: 'FSV830-TE Trial'
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 2,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        staticModules: true,
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW4, ShipId.FSV830_TE_PREVIEW5],
        modules: [m1, b1, d1],
    },
    {
        id: ShipId.FSV830_TE_PREVIEW2,
        name: 'FSV830-TE トライアル版 (B2)',
        translatedName: {
            en: 'FSV830-TE Trial (B2)'
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        staticModules: true,
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW4, ShipId.FSV830_TE_PREVIEW5],
        modules: [m1, b2, d1],
    },
    {
        id: ShipId.FSV830_TE_PREVIEW3,
        name: 'FSV830-TE トライアル版 (E2)',
        translatedName: {
            en: 'FSV830-TE Trial (E2)'
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        staticModules: true,
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW4, ShipId.FSV830_TE_PREVIEW5],
        modules: [m1, b1, d1, e2],
    },
    {
        id: ShipId.FSV830_TE_PREVIEW4,
        name: 'FSV830-TE トライアル版 (D2+E1)',
        translatedName: {
            en: 'FSV830-TE Trial (D2+E1)'
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        staticModules: true,
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW5],
        modules: [m1, d2, b1, e1],
    },
    {
        id: ShipId.FSV830_TE_PREVIEW5,
        name: 'FSV830-TE トライアル版 (B3+C1)',
        translatedName: {
            en: 'FSV830-TE Trial (B3+C1)'
        },
        type: ShipType.AUXILIARY,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 2,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        staticModules: true,
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW4],
        modules: [m1, d1, b3, c1],
    },
];
