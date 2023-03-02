import { skills } from '../../../skill/skill';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'M1',
    name: '「ホワイトフラッシュ」総合武器庫',
    description: '対大型＆小型艦武装',
    parts: [
        {
            text: [
                'CI-600T型　重イオン砲',
                '対大型艦：',
                '・直射、エネルギー、対艦：10800、攻城：1620',
                'CG-2220型　通常2連砲',
                '対小型艦：',
                '・直射、実弾、対艦：5760、対空：1152、攻城：288',
            ],
            skillSlots: 5,
            skills: [
                skills.increaseDamage().withValue(10),
                skills.increaseDamage().withValue(10),
                skills.increaseHitRate().withValue(10),
                skills.increaseHitRateVsSmall().withValue(15),
                skills.reduceCooldown().withValue(15),
                skills.reduceCooldown().withValue(15),
                {
                    effect: 'システムHPアップ',
                    properties: '最大35％', // TODO 技術Pt
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
    name: '「ホワイトフラッシュ」総合武器庫',
    category: 'M',
    categoryNumber: 2,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '総合艦載機搭載プラットフォーム',
    description: '小～大型戦闘機を6機搭載可能',
    parts: [
        {
            text: [
                'CFB-700型 大型戦闘機格納庫',
                '6隊の大型戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令・探査システムを備える。',
            ],
            skillSlots: 4,
            skills: [
                {
                    effect: '戦闘開始時、システム内に搭載された艦載機の最初の4ラウンドの攻撃が同一の目標にロックオンされる。戦略が発動中、システム内に搭載された戦闘機の回避率が10アップする。',
                    properties: '戦略、技術Pt20',
                },
                skills.reduceRtbAircraft().withValue(20),
                skills.reduceRtbAircraft().withValue(20),
                skills.increaseHitRateOfAircraft().withValue(20),
                {
                    effect: '艦載機のダメージアップ',
                    properties: '最大10％',
                },
                {
                    effect: '艦載機のミサイル回避率アップ',
                    properties: '最大30％',
                },
            ],
        },
    ],
    category: 'A',
    categoryNumber: 1,
    carryFighter: 6,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
    defaultModule: true,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '護送艦ドック',
    category: 'A',
    categoryNumber: 2,
    carryCorvette: 6,
};

const b1: ISystemModule = {
    id: 'B1',
    name: '追加艦載機システム',
    parts: [
        {
            text: [
                'CBF-320型　中型格納庫',
                '攻撃機と戦闘機を格納可能な中型機内格納庫。各編隊に独立した停泊、整備空間を提供し、戦闘機の指令・探査システムを備える。'
            ],
            skillSlots: 3,
            skills: [
                {
                    effect: 'ロックオン速度アップ',
                    properties: '最大70％',
                },
                skills.reduceCooldown(),
                skills.increaseDamage(),
            ],
        },
    ],
    category: 'B',
    categoryNumber: 1,
    carryFighter: 4,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
};

const b2: ISystemModule = {
    id: 'B2',
    name: 'ミサイル防衛システム',
    parts: [
        {
            text: [
                'MK2-CM-4x250A型「ストーム」',
                'ミサイルランチャーネスト',
                '対小型艦：',
                '・投射、実弾、対艦：5600、対空：2856、攻城：392',
            ],
            skillSlots: 4,
            skills: [
                skills.increaseDamage().withValue(10),
                skills.increaseDamage().withValue(10),
                skills.increaseHitRate(),
                skills.increaseHitRateVsSmall(),
            ],
        },
    ],
    category: 'B',
    categoryNumber: 2,
};

const b3: ISystemModule = {
    id: 'B3',
    name: '偵察UAVシステム',
    parts: [
        {
            text: [
                'CIT-3型　スポッターUAV格納庫',
                '3機の情報指令UAVを搭載し、周囲の味方艦船に総合的な武器情報支援を提供し、武器の命中率をアップさせる。',
            ],
            skillSlots: 2,
        },
    ],
    category: 'B',
    categoryNumber: 3,
};

const c1: ISystemModule = {
    id: 'C1',
    name: '追加エネルギーシステム',
    category: 'C',
    categoryNumber: 1,
};

const c2: ISystemModule = {
    id: 'C2',
    name: '精密誘導システム',
    category: 'C',
    categoryNumber: 2,
};

export const marshallCrux: IShipDefinition[] = [
    {
        id: ShipId.MARSHALL_CRUX,
        name: 'マーシャルクルックス級',
        type: ShipType.CARRIER,
        cost: 40,
        weight: 2,
        row: ShipRow.BACK,
        operationLimit: 5,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        relatedShipIds: [
            ShipId.MARSHALL_CRUX_TE_A1,
            ShipId.MARSHALL_CRUX_TE_A1_B1,
            ShipId.MARSHALL_CRUX_TE_A2
        ],
        modules: [m1, m2, a1, a2, b1, b2, b3, c1, c2],
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
    },
    {
        id: ShipId.MARSHALL_CRUX_TE_A1,
        name: 'マーシャルクルックス級-TE トライアル版',
        translatedName: {
            en: 'Marshal Crux (TE) Trial',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        relatedShipIds: [
            ShipId.MARSHALL_CRUX,
            ShipId.MARSHALL_CRUX_TE_A1_B1,
            ShipId.MARSHALL_CRUX_TE_A2
        ],
        staticModules: true,
        modules: [m1, a1],
    },
    {
        id: ShipId.MARSHALL_CRUX_TE_A2,
        name: 'マーシャルクルックス級-TE トライアル版 (A2)',
        translatedName: {
            en: 'Marshal Crux (TE) Trial (A2)',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        relatedShipIds: [
            ShipId.MARSHALL_CRUX,
            ShipId.MARSHALL_CRUX_TE_A1,
            ShipId.MARSHALL_CRUX_TE_A1_B1,
        ],
        staticModules: true,
        modules: [m1, a2],
    },
    {
        id: ShipId.MARSHALL_CRUX_TE_A1_B1,
        name: 'マーシャルクルックス級-TE トライアル版 (B1)',
        translatedName: {
            en: 'Marshal Crux (TE) Trial (B1)',
        },
        type: ShipType.CARRIER,
        cost: 40,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        relatedShipIds: [
            ShipId.MARSHALL_CRUX,
            ShipId.MARSHALL_CRUX_TE_A1,
            ShipId.MARSHALL_CRUX_TE_A2
        ],
        staticModules: true,
        modules: [m1, a1, b1],
    },
];
