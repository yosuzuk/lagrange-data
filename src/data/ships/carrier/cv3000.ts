import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '総合艦載機搭載プラットフォーム',
    description: '小～大型艦載機を5機、護送艦を3機搭載可能',
    parts: [
        {
            text: [
                'CFB-605型　大型戦闘機格納庫',
                '5隊の大型戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令・探査システムを備える。',
                'CBC-2100型　護送艦ドック',
                '3隻の護送艦を格納可能な機内格納庫。護送艦の整備・支援システムを備える。',
            ],
            skillSlots: 5,
            skills: [
                {
                    effect: '艦載機の命中率アップ',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機のダメージアップ',
                    properties: '最大10％、技術Pt13',
                },
                {
                    effect: '艦載機の帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機の帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機のダメージアップ',
                    properties: '最大10％、技術Pt13',
                },
                {
                    effect: '艦載機のミサイル回避率アップ',
                    properties: '最大30％、技術Pt13',
                },
                {
                    effect: 'システムHPアップ',
                    properties: '最大35％、技術Pt13',
                },
            ],
        },
    ],
    category: 'M',
    categoryNumber: 1,
    carryCorvette: 3,
    carryFighter: 5,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
    defaultModule: true,
};

const m2: ISystemModule = {
    id: 'M2',
    name: '総合戦闘機システム',
    description: '小～大型艦載機を5機搭載可能、戦略UAVを5機搭載',
    parts: [
        {
            text: [
                'CFB-605型　大型戦闘機格納庫',
                'CIT-5型　戦場支援UAV格納庫',
                '5隊の戦略UAVを搭載可能な総合UAV格納庫。敵艦の武器システムにピンポイント攻撃を行える。',
                '戦略UAV：',
                '・対艦：3750、攻城：520',
            ],
            skillSlots: 5,
            skills: [
                {
                    effect: '艦載機/UAVのダメージアップ',
                    properties: '最大10％、技術Pt13',
                },
                {
                    effect: '艦載機/UAVの帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機/UAVの帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機/UAVの命中率アップ',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機/UAVのダメージアップ',
                    properties: '最大10％、技術Pt13',
                },
                {
                    effect: '艦載機/UAVのミサイル回避率アップ',
                    properties: '最大30％、技術Pt13',
                },
                {
                    effect: 'システムHPアップ',
                    properties: '最大35％、技術Pt13',
                },
            ],
        },
    ],
    category: 'M',
    categoryNumber: 2,
    carryFighter: 5,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
};

const m3: ISystemModule = {
    id: 'M3',
    name: '大型戦闘機システム',
    description: '大型戦闘機を8機搭載可能',
    parts: [
        {
            text: [
                'CFB-605型　大型戦闘機格納庫',
                '3隊の重戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令、探査システムを備える。',
            ],
            skillSlots: 5,
            skills: [
                {
                    effect: '艦載機のダメージアップ',
                    properties: '最大10％、技術Pt13',
                },
                {
                    effect: '艦載機の帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機の帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機の命中率アップ',
                    properties: '最大20％、技術Pt13',
                },
                {
                    effect: '艦載機のダメージアップ',
                    properties: '最大10％、技術Pt13',
                },
                {
                    effect: '艦載機のミサイル回避率アップ',
                    properties: '最大30％、技術Pt13',
                },
                {
                    effect: 'システムHPアップ',
                    properties: '最大35％、技術Pt13',
                },
            ],
        },
    ],
    category: 'M',
    categoryNumber: 3,
    carryFighter: 8,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '「ドラグーン」砲撃システム',
    description: '対小型＆対空武装',
    parts: [
        {
            text: [
                'MK4-C/SG-3480A型　3連重砲',
                '対小型艦：',
                '・直射、実弾、対艦：4000、攻城：520',
                'C/SG-190B型　通常連射砲',
                '対空：',
                '・直射、実弾、対艦：3300、対空：712、攻城：99',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt10',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt10',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: 'フリゲート/駆逐艦に対する命中率アップ',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: '艦載機/護送艦に対する命中率アップ',
                    properties: '最大15％、技術Pt10',
                },
            ],
        },
    ],
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '対空ミサイルプラットフォーム',
    description: '対空武装、ミサイル迎撃',
    parts: [
        {
            text: [
                'BM-12x180T型　防御ミサイルシステム',
                '対空、ミサイル迎撃：',
                '・投射、実弾、対艦：3375、対空：2362',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt10',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt10',
                },
                {
                    effect: '戦闘機/護送艦に対する命中率アップ',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: '戦闘機/護送艦に対する命中率アップ',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、技術Pt10',
                },
            ],
        },
    ],
    category: 'A',
    categoryNumber: 2,
};

const b1: ISystemModule = {
    id: 'B1',
    name: 'ミサイル防御システム',
    description: '対空武装、ミサイル迎撃',
    parts: [
        {
            text: [
                'MK3-SM-6x4008/C型「スターファイア」ミサイルランチャー群',
                '対空：',
                '・投射、実弾、対艦：1400、対空：700、攻城：70',
                '迎撃効果',
                '反撃対空',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt8',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt8',
                },
                {
                    effect: '対戦闘機/護送艦命中率アップ',
                    properties: '最大14.8％、技術Pt8',
                },
                {
                    effect: '対戦闘機/護送艦命中率アップ',
                    properties: '最大14.8％、技術Pt8',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大14.8％、技術Pt8',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大14.8％、技術Pt8',
                },
            ],
        },
    ],
    category: 'B',
    categoryNumber: 1,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '護送艦搭載プラットフォーム',
    description: '護送艦を3機搭載可能',
    parts: [
        {
            text: [
                'CBC-2100型　護送艦ドック',
                '3隻の護送艦を格納可能な機内格納庫。護送艦の整備・支援システムを備える。',
            ],
            skillSlots: 3,
            skills: [
                {
                    effect: '艦載機のロックオン速度アップ',
                    properties: '最大70％、技術Pt12',
                },
                {
                    effect: '艦載機の帰還冷却時間ダウン',
                    properties: '最大10％、技術Pt12',
                },
                {
                    effect: '艦載機の帰還冷却時間ダウン',
                    properties: '最大10％、技術Pt12',
                },
                {
                    effect: '艦載機のダメージアップ',
                    properties: '最大10％、技術Pt12',
                },
            ],
        },
    ],
    category: 'B',
    categoryNumber: 2,
    carryCorvette: 3,
};

const b3: ISystemModule = {
    id: 'B3',
    name: '情報UAV支援プラットフォーム',
    description: '情報UAVを3機搭載',
    parts: [
        {
            text: [
                'CITA-2型　戦場支援UAV搭載室',
                '通信指令UAVを3機搭載する。',
                '通信指令UAVの収容と整備を担い、信号誘導システムを装備する。',
                '情報UAVは支援艦の武器命中率をアップさせる。',
            ],
            // TODO skillslot
            // TODO skills
        },
    ],
    category: 'B',
    categoryNumber: 3,
};

export const cv3000: IShipDefinition[] = [
    {
        id: ShipId.CV3000,
        name: 'CV3000級',
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
        modules: [m1, m2, m3, a1, a2, b1, b2, b3],
    },
    {
        id: ShipId.CV3000_TE,
        name: 'CV3000級-TE',
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        staticModules: true,
        relatedShipIds: [ShipId.CV3000],
        modules: [m1, a1],
    },
];
