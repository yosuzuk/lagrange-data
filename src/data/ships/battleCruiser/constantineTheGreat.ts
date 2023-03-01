import { skills } from '../../../skill/skill';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: 'ガンマストーム攻撃イオン砲システム',
    description: '対大型艦武装',
    parts: [{
        text: [
            'CI-2x700T型「ヘリウムフラッシュ」2連超重イオン砲塔',
            '対大型艦：',
            '・直射、エネルギー、対艦：9000、攻城：1890',
        ],
        skillSlots: 6,
        skills: [{
            effect: 'イオン砲ダメージアップ',
            properties: '最大10％、技術Pt5',
        }, {
            effect: 'イオン砲ダメージアップ',
            properties: '最大10％、技術Pt5',
        }, {
            effect: '冷却時間ダウン',
            properties: '最大15％、技術Pt5',
        }, {
            effect: '出力時間ダウン',
            properties: '最大10％、技術Pt5',
        }, {
            effect: '冷却時間ダウン',
            properties: '最大15％、技術Pt5',
        }, {
            effect: 'イオン砲命中率アップ',
            properties: '最大10％、技術Pt5',
        }, {
            effect: '巡洋艦以上に対する命中率アップ',
            properties: '最大15％、技術Pt5',
        }, {
            effect: 'システムＨＰアップ',
            properties: '最大35％、技術Pt5',
        }, {
            effect: '被クリティカルダメージダウン',
            properties: '最大30％、技術Pt5',
        }],
    }],
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
};

const m2: ISystemModule = {
    id: 'M2',
    name: 'ガンマストーム投射攻撃システム',
    description: '対大型艦武装',
    parts: [{
        text: [
            'CT-2x600型「ガンマストーム」エネルギー魚雷発射システム',
            '対大型艦：',
            '・投射、エネルギー、対艦：9600、攻城：1344'
        ],
        skillSlots: 6,
        // TODO skills
    }],
    category: 'M',
    categoryNumber: 2,
};

const a1: ISystemModule = {
    id: 'A1',
    name: 'ガンマストーム投射武器システム',
    description: '対大型艦武装',
    parts: [{
        text: [
            'CM-8x608A型「ガンマストーム」通常ミサイル発射システム',
            '対大型艦：',
            '・投射、実弾、対艦：24000、攻城：1920',
        ],
        skillSlots: 6,
        skills: [
            {
                effect: '90秒毎に15秒間の集中攻撃、冷却80％ダウン',
                properties: '戦略、技術Pt25',
            },
            skills.increaseDamage().withValue(10).withCost(12),
            skills.increaseDamage().withValue(10).withCost(12),
            {
                effect: 'クリティカルダメージアップ＆確率アップ',
                properties: '最大50％、技術Pt12',
            }, {
                effect: '冷却時間ダウン',
                properties: '最大15％、技術Pt12',
            }, {
                effect: '巡洋艦以上に対する命中率アップ',
                properties: '最大15％、技術Pt12',
            }, {
                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                properties: '最大15％、技術Pt12',
            },
        ],
    }],
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
};

const a2: ISystemModule = {
    id: 'A2',
    name: 'ガンマストーム投射武器システム',
    description: '対艦武装',
    parts: [{
        text: [
            'CM-8x608型「ガンマストーム」パルスエネルギーミサイル発射システム',
            '対大型艦：',
            '・投射、エネルギー、対艦：18162、攻城：1816'
        ],
        // TODO skillslot
        // TODO skills
    }],
    category: 'A',
    categoryNumber: 2,
};

const b1: ISystemModule = {
    id: 'B1',
    name: '通常砲システム',
    description: '対小型＆対空武装',
    parts: [{
        text: [
            '350mm-CG-1350型　対艦2連砲',
            '対小型：',
            '・投射、実弾、対艦：8571、攻城：1371',
            'CG-1160B型　通常砲',
            '対空：',
            '・投射、実弾、対艦：3000、対空：720、攻城：90、反撃対空',
        ],
        skillSlots: 4,
        skills: [
            skills.increaseDamage().withValue(10).withCost(8),
            skills.increaseDamage().withValue(10).withCost(8),
            {
                effect: '冷却時間ダウン',
                properties: '最大15％、技術Pt8',
            },
            {
                effect: '冷却時間ダウン',
                properties: '最大15％、技術Pt8',
            },
            {
                effect: '戦闘機/護送艦に対する命中率アップ',
                properties: '最大15％、技術Pt8',
            },
        ],
    }],
    category: 'B',
    categoryNumber: 1,
};

const b2: ISystemModule = {
    id: 'B2',
    name: 'パルス対空システム',
    description: '対空武装、ミサイル迎撃',
    parts: [{
        text: [
            'CP-3x220型　3連対空パルス砲',
            '対空：',
            '・直射、エネルギー、対艦：3150、対空：5744',
            'CP-120型　対ミサイルパルス群',
            '対空、ミサイル迎撃：',
            '・直射、エネルギー、対空：1788',
        ],
        // TODO skillslot
        // TODO skills
    }],
    category: 'B',
    categoryNumber: 2,
};

const b3: ISystemModule = {
    id: 'B3',
    name: '対空ミサイルシステム',
    description: '対空武装、ミサイル迎撃',
    parts: [{
        text: [
            'MK2-CM-4x200B型「ストーム」ミサイルランチャーネスト',
            '対空：',
            '・投射、実弾、対艦：2100、対空：7190',
            'CM-2x1888型　ミサイルランチャー群',
            '対空、ミサイル迎撃：',
            '・投射、実弾、対艦：1500、対空：3120',
        ],
        // TODO skillslot
        // TODO skills
    }],
    category: 'B',
    categoryNumber: 3,
};

const c1: ISystemModule = {
    id: 'C1',
    name: 'エネルギー圧縮装置',
    description: 'イオン砲ダメージアップ15％',
    parts: [
        {
            text: [
                'RIT-650型　エネルギー圧縮装置',
                'エネルギーコア増強装置。高エネルギー出力密度を高めるのに効果的で、イオン武器の攻撃ダメージをアップさせる。',
            ],
            skillSlots: 2,
            // TODO skill
        },
    ],
    category: 'C',
    categoryNumber: 1,
};

const c2: ISystemModule = {
    id: 'C2',
    name: '戦闘機搭載ハンガー',
    description: '小～中型戦闘機を2機搭載可能',
    parts: [
        {
            text: [
                'XAC-2000型　航空ブリッジ',
                'CBF-200型　中型格納庫',
            ],
            // TODO skillslots
            // TODO skill
        },
    ],
    category: 'C',
    categoryNumber: 2,
    carryFighter: 2,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
};

const c3: ISystemModule = {
    id: 'C3',
    name: '戦術UAVシステム',
    description: 'スポッターＵＡＶ×3',
    parts: [
        {
            text: [
                'CIT-1型　スポッターUAV格納庫',
                '周囲の味方艦船に総合的な武器情報支援を提供し、武器の命中率をアップさせる。',
            ],
            // TODO skillslots
            // TODO skill
        },
    ],
    category: 'C',
    categoryNumber: 3,
};

const d1: ISystemModule = {
    id: 'D1',
    name: '近接対空システム',
    description: '対空武装',
    parts: [{
        text: [
            'CM-2x45B型　近接対空ミサイル',
            '対空：',
            '・投射、実弾、対空：5275、反撃対空',
        ],
        // TODO skillslot
        // TODO skills
    }],
    category: 'D',
    categoryNumber: 1,
};

const d2: ISystemModule = {
    id: 'D2',
    name: 'ターゲット保護システム',
    description: 'メインシステムへのクリティカルダメージ軽減60％',
    parts: [
        {
            text: [
                'ASM-220型　重点強化装甲',
                '艦船メイン武器システムの被クリティカルダメージ60％ダウン',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'D',
    categoryNumber: 2,
};

const d3: ISystemModule = {
    id: 'D3',
    name: '損失管理システム',
    description: '自己補修ＵＡＶ',
    parts: [
        {
            text: [
                'AST-50型　ダメージ管理システム',
                '艦船の損傷状態を把握すると同時に、補修ロボットを送り出して自身の緊急補修を行うことができる。',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'D',
    categoryNumber: 3,
};

export const constantineTheGreat: IShipDefinition[] = [
    {
        id: ShipId.CONSTANTINE_THE_GREAT,
        name: 'コンスタンティヌス級',
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 2,
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [m1, m2, a1, a2, b1, b2, b3, c1, c2, c3, d1, d2, d3],
    },
];
