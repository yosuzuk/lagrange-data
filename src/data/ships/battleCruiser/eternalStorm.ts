import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '「ビゲン」イオン生成システム',
    description: '対大型艦武装',
    parts: [
        {
            text: [
                'AI-900A型「ビゲン」イオン砲',
                '対大型艦：',
                '・直射、エネルギー、対艦：16000、攻城：3360',
            ],
            skillSlots: 6,
            skills: [
                {
                    effect: '90秒毎に、他の全ての武器を停止し、１ラウンドあたり攻撃数が4回、メインイオン砲の連続射撃時間100％、命中率が35％アップする。効果は30秒続く。冷却15秒',
                    properties: '戦略、技術Pt15',
                },
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
                    effect: '命中率アップ',
                    properties: '最大10％、技術Pt10',
                },
                {
                    effect: '巡洋艦以上に対する命中率アップ',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: 'システムHPアップ',
                    properties: '最大35％、技術Pt10',
                },
                {
                    effect: '被クリティカルダメージダウン',
                    properties: '最大30％、技術Pt10',
                },
            ],
        },
    ],
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
};

const m2: ISystemModule = {
    id: 'M2',
    name: 'プラズマ投射システム',
    description: '対大型艦武装',
    parts: [
        {
            text: [
                'AIM-850T型　プラズマ投射器',
                '対大型艦：',
                '・投射、エネルギー、対艦：15692、対空：3640、攻城：2824',
            ],
            skillSlots: 6,
            skills: [
                {
                    effect: '90秒毎に、他の全ての武器を停止し、１ラウンドあたり攻撃数が4回、メインイオン砲の連続射撃時間100％、命中率が35％アップする。効果は30秒続く。冷却15秒',
                    properties: '戦略、技術Pt15',
                },
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
                    effect: '巡洋艦以上に対する命中率アップ',
                    properties: '最大15％、技術Pt10',
                },
                {
                    effect: '持続時間ダウン',
                    properties: '最大10％、技術Pt10',
                },
            ],
        },
    ],
    category: 'M',
    categoryNumber: 2,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '「エターナルポラリス」MARKⅡ投射システム',
    description: '対小型＆大型艦武装',
    parts: [
        {
            text: [
                'MK3-AT-800A型「スーパーノヴァ・ホワイト」対艦魚雷',
                '対大型艦：',
                '・投射、実弾、対艦：9600、攻城：1440',
                'MK2-AM-8x300B型「エターナルボラリスK」',
                '対小型艦：',
                '・投射、実弾、対艦：3300、対空：1663、攻城：99',
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
                    effect: 'クリティカルダメージアップ＆確率アップ',
                    properties: '最大50％、技術Pt10',
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
    name: '「エターナルポラリス」MARKⅡ投射システム',
    description: '対大型艦＆攻城武装',
    parts: [
        {
            text: [
                'MK2-AM-16x150B型「スーパーノヴァホワイト」攻城魚雷ランチャー群',
                '対大型艦：',
                '・投射、実弾、対艦：12000、攻城：10440',
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
                    effect: 'クリティカルダメージアップ＆確率アップ',
                    properties: '最大50％、技術Pt10',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt10',
                },
                {
                    effect: '攻城ダメージアップ',
                    properties: '最大30％、技術Pt10',
                },
                {
                    effect: '攻城ダメージアップ',
                    properties: '最大30％、技術Pt10',
                },
            ],
        },
    ],
    category: 'A',
    categoryNumber: 2,
};

const a3: ISystemModule = {
    id: 'A3',
    name: '「エターナルポラリス」MARKⅡ投射システム',
    description: '対艦＆対空武装',
    parts: [
        {
            text: [
                'MK3-AT-800A型「スーパーノヴァホワイト」対艦魚雷',
                '対艦：',
                '・投射、実弾、対艦：9600、攻城：1440',
                'MK2-AM-16x150B型「エターナルポラリス」対空ミサイル群',
                '対空：',
                '・投射、実弾、対艦：2327、対空：3946',
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
                    effect: 'システムのメイン武装が同列に接近する艦載機を攻撃。命中率40％アップ。効果は25秒続く。冷却30秒。',
                    properties: '戦略、技術Pt15',
                },
            ],
        },
    ],
    category: 'A',
    categoryNumber: 3,
};

const b1: ISystemModule = {
    id: 'B1',
    name: '一般砲撃プラットフォーム',
    description: '対艦＆対空武装',
    parts: [
        {
            text: [
                'AG-2580型　2連重砲',
                '対大型艦：',
                '・投射、実弾、対艦；4200、攻城：840',
                // TODO name
                '対空：',
                '・投射、実弾、対艦：1050、対空；840、攻城；63',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、Pt5',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、Pt5',
                },
                {
                    effect: 'フリゲート/駆逐艦に対する命中率アップ',
                    properties: '最大15％、Pt5',
                },
            ],
        },
    ],
    category: 'B',
    categoryNumber: 1,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '一般近接防御システム',
    description: '対空武装',
    parts: [
        {
            text: [
                'AG-1105B型　通常砲',
                '対空：',
                '・直射、実弾、対艦：1200、対空：2160、攻城：60',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、Pt5',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、Pt5',
                },
                {
                    effect: 'フリゲート/駆逐艦に対する命中率アップ',
                    properties: '最大15％、Pt5',
                },
            ],
        }
    ],
    category: 'B',
    categoryNumber: 2,
};

const c1: ISystemModule = {
    id: 'C1',
    name: 'NT UAV対空システム',
    description: '対空UAV×3',
    parts: [
        {
            text: [
                'NT-1型　対空UAVラック',
                '領域対空UAVを3機搭載する。UAVの収容と整備を行い、信号誘導システムを装備する。',
                '対空：6480',
            ],
            skillSlots: 3,
            skills: [
                {
                    effect: 'UAVのロックオン速度アップ',
                    properties: '最大70％、技術Pt5',
                },
                {
                    effect: 'UAVの帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt5',
                },
                {
                    effect: 'UAVの命中率アップ',
                    properties: '最大20％、技術Pt5',
                },
                {
                    effect: 'UAVのダメージアップ',
                    properties: '最大10％、技術Pt5',
                },
            ],
        },
    ],
    category: 'C',
    categoryNumber: 1,
};

const c2: ISystemModule = {
    id: 'C2',
    name: '「サンダーストーム」UAVシールドシステム',
    description: 'シールドUAV×1',
    parts: [
        {
            text: [
                'SNT-1型　シールドUAVラック',
                '対象の敵艦船のエネルギー武器の命中率ダウン',
            ],
            skillSlots: 2,
            skills: [
                {
                    effect: 'UAVの帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt5',
                },
                {
                    effect: 'UAVの帰還冷却時間ダウン',
                    properties: '最大20％、技術Pt5',
                },
                {
                    effect: 'UAVのロックオン速度アップ',
                    properties: '最大70％、技術Pt5',
                },
            ],
        },
    ],
    category: 'C',
    categoryNumber: 2,
};

const c3: ISystemModule = {
    id: 'C3',
    name: 'エネルギー補償装甲システム',
    description: 'エネルギー＆投射ダメージを軽減',
    parts: [
        {
            text: [
                'RIR-220型　実験的エネルギー補助装甲',
                'エネルギーシステムのエネルギーを利用し、装甲表面にエネルギー層を形成する。運動エネルギーの衛撃や高エネルギー照射を受けた場合も変形や溶融によりダメージを吸収する。',
                'エネルギー武器によるダメージを15％軽減',
                '投射武器によるダメージを15％軽減',
                '被クリティカルダメージを30％軽減',
            ],
            skillSlots: 2,
            skills: [
                {
                    effect: 'シールド値アップ',
                    properties: '最大10％、技術Pt5',
                },
                {
                    effect: '被クリティカルダメージダウン',
                    properties: '最大30％、技術Pt5',
                },
            ],
        },
    ],
    category: 'C',
    categoryNumber: 3,
};

const d1: ISystemModule = {
    id: 'D1',
    name: 'イオン砲塔システム',
    description: '対艦武装',
    parts: [
        {
            text: [
                'AI-450A型　試験的イオン砲塔',
                '対大型艦：',
                '・直射、エネルギー、対艦：6857、攻城：1028',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、Pt5',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、Pt5',
                },
                {
                    effect: 'フリゲート/駆逐艦に対する命中率アップ',
                    properties: '最大15％、Pt5',
                },
                {
                    effect: '巡洋艦以上に対する命中率アップ',
                    properties: '最大15％、Pt5',
                },
            ],
        },
    ],
    category: 'D',
    categoryNumber: 1,
};

const d2: ISystemModule = {
    id: 'D2',
    name: 'パルス砲塔システム',
    description: '対空武装、ミサイル/魚雷迎撃',
    parts: [
        {
            text: [
                'AP-1308型　連射近接防御パルス砲',
                '対空：',
                '・直射、エネルギー、対空：2160',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt5',
                },
                {
                    effect: 'ダメージアップ',
                    properties: '最大10％、技術Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、技術Pt5',
                },
                {
                    effect: '冷却時間ダウン',
                    properties: '最大15％、技術Pt5',
                },
                {
                    effect: '戦闘機/護送艦に対する命中率アップ',
                    properties: '最大15％、技術Pt5',
                },
                {
                    effect: 'ミサイル/魚雷要撃率アップ',
                    properties: '最大25％、技術Pt5',
                },
            ],
        },
    ],
    category: 'D',
    categoryNumber: 2,
};

export const eternalStorm: IShipDefinition[] = [
    {
        id: ShipId.ETERNAL_STORM,
        name: 'エターナルストーム級',
        type: ShipType.BATTLE_CRUISER,
        cost: 32,
        weight: 2,
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [m1, m2, a1, a2, a3, b1, b2, c1, c2, c3, d1, d2],
    },
];
