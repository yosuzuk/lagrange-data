import { enhancements, strategy } from '../../../enhancements/enhancements';
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
    name: '護送艦ドック',
    description: '護送艦を6隻搭載可能',
    parts: [
        {
            text: [
                'CBC-3200型　護送艦ドック',
                '６隻の護送艦を格納可能な機内格納庫。護送艦の整備、支援システムを備える。',
            ],
            skillSlots: 5,
            skills: [
                enhancements.increaseDamageOfCorvette().withPercentageValue(10).withCost(10),
                enhancements.reduceRtbCorvette().withPercentageValue(20).withCost(10),
                enhancements.reduceRtbCorvette().withPercentageValue(20).withCost(10),
                enhancements.increaseHitRateOfCorvette().withPercentageValue(20).withCost(10),
                enhancements.increaseDamageOfCorvette().withPercentageValue(10).withCost(10),
                enhancements.increaseMissileEvasionOfCorvette().withPercentageValue(30).withCost(10),
                enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
            ],
        },
    ],
    category: 'M',
    categoryNumber: 1,
    carryCorvette: 6,
    defaultModule: true,
};

const m2: ISystemModule = {
    id: 'M2',
    name: '大型艦載機システム',
    description: '小～大型戦闘機を8隻搭載可能',
    parts: [
        {
            text: [
                'CFB-1200型　大型戦闘機格納庫',
                '8隊の重戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊、整備空間を提供し、戦闘機の指令・探査システムを備える。',
            ],
            skillSlots: 5,
            // TODO skills
        },
    ],
    category: 'M',
    categoryNumber: 2,
    carryFighter: 8,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
};

const a1: ISystemModule = {
    id: 'A1',
    name: '総合武器庫',
    description: '対小型＆大型艦武装',
    parts: [
        {
            text: [
                'BG-2450A型　2連重砲',
                '対大型艦：',
                '・直射、実弾、対艦5120、攻城：665',
                'MK3-BM-8x320型「ライトニングフィールド」8連対艦ミサイルシステム',
                '対小型艦：',
                '・投射、実弾、対艦：4911、対空：510、攻城：294',
            ],
            skillSlots: 6,
            skills: [
                strategy.customStrategy('moraleBooster').withDescriptionKey('moraleBooster').withCost(15),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(8),
                enhancements.increaseMissileDamage().withPercentageValue(10).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
            ],
        },
    ],
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
};

const a2: ISystemModule = {
    id: 'A2',
    name: '投射武器プラットフォーム',
    description: '対小型艦＆対空武装',
    parts: [
        {
            text: [
                'MK5-BM-16x180「ライトニングフィールド」対艦ミサイル群',
                '対小型艦：',
                '・投射、実弾、対艦：4430、攻城：354',
                'MK3-BM-8x320「ライトニングフィールド」対艦ミサイル群',
                '対空：',
                '・投射、実弾、対艦：4911、対空：510、攻城：294',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'A',
    categoryNumber: 2,
};

const a3: ISystemModule = {
    id: 'A3',
    name: '総合砲プラットフォーム',
    description: '対空＆対小型武装',
    parts: [
        {
            text: [
                'BG-2180型　対艦砲',
                '対空：',
                '・直射、実弾、対艦：6240、対空：345、攻城：336、反撃対空',
                'MK3-BM-8x320「ライトニングフィールド」8連対艦ミサイルシステム',
                '対小型：',
                '・投射、実弾、対艦：4911、対空：510、攻城：294、反撃対空',
            ],
            skillSlots: 6,
            skills: [
                strategy.customStrategy('moraleBooster').withDescriptionKey('moraleBooster').withCost(15),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(8),
                enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(14.8).withCost(8),
            ],
        },
    ],
    category: 'A',
    categoryNumber: 3,
};

const b1: ISystemModule = {
    id: 'B1',
    name: '艦船保守システム',
    description: '艦載機を入庫し耐久力を回復',
    parts: [
        {
            text: [
                'BSY-5000型　大型ドック桟橋',
                '大型の補修ロボットを搭載している。戦闘時に自身の艦載機を補修できる。',
            ],
            skillSlots: 4,
            skills: [
                enhancements.reduceRtbCorvette().withPercentageValue(5).withCost(8),
                enhancements.reduceRtbCorvette().withPercentageValue(5).withCost(8),
                enhancements.reduceRtbCorvette().withPercentageValue(5).withCost(8),
                enhancements.increaseDamageOfAircraft().withPercentageValue(3).withCost(8),
                enhancements.increaseDamageOfAircraft().withPercentageValue(3).withCost(8),
                enhancements.increaseDamageOfAircraft().withPercentageValue(3).withCost(8),
            ],
        },
    ],
    category: 'B',
    categoryNumber: 1,
    defaultModule: true,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '護送艦搭載プラットフォーム',
    description: '護送艦を3隻搭載可能',
    parts: [
        {
            text: [
                'CBC-2000型　護送艦ドック',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'B',
    categoryNumber: 2,
    carryCorvette: 3,
};

const c1: ISystemModule = {
    id: 'C1',
    name: '艦載機プラットフォーム',
    description: '小～大型艦載機を5機搭載可能',
    parts: [
        {
            text: [
                'CFB-600型　艦載機格納庫',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'C',
    categoryNumber: 1,
    carryFighter: 5,
    carryFighterType: ShipSubType.LARGE_FIGHTER,
};

const c2: ISystemModule = {
    id: 'C2',
    name: '攻城UAVシステム',
    description: '攻城UAV×4',
    parts: [
        {
            text: [
                'CST-6型　攻城UAV搭載室',
                '標準攻城UAVを4機搭載する。攻城UAVの収容と整備を担い、信号誘導システムを装備する。',
                '攻城：6048',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'C',
    categoryNumber: 2,
};

const c3: ISystemModule = {
    id: 'C3',
    name: '対空ミサイルプラットフォーム',
    description: '対空武装、ミサイル迎撃',
    parts: [
        {
            text: [
                'BM-12x180T型　防御ミサイルシステム',
                '対空：',
                '・投射、実弾、対艦：3272、対空：7854、対空支援、迎撃効果',
                '同じ艦列の味方艦船に対して対空支援を行うことができる',
            ],
            skillSlots: 3,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
            ],
        },
    ],
    category: 'C',
    categoryNumber: 3,
};

export const solarWhale: IShipDefinition[] = [
    {
        id: ShipId.SOLAR_WHALE,
        name: 'ソーラーホエール',
        type: ShipType.CARRIER,
        cost: 45,
        weight: 2,
        row: ShipRow.MIDDLE,
        operationLimit: 5,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        modules: [m1, m2, a1, a2, a3, b1, b2, c1, c2, c3],
        relatedShipIds: [ShipId.SOLAR_WHALE_TE_S],
    },
    {
        id: ShipId.SOLAR_WHALE_TE_S,
        name: 'ソーラーホエール-TE (回収)',
        type: ShipType.CARRIER,
        cost: 45,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 5,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        staticModules: true,
        modules: [
            {
                id: 'X1',
                name: '総合艦載機システム',
                description: '大型戦闘機3機と護送艦を3隻搭載可能',
                parts: [
                    {
                        text: [
                            'CFB-600型　大型戦闘機格納庫',
                            '3隊の重戦闘機を格納可能な総合戦闘機格納庫。各編隊に独立した停泊・整備空間を提供し、戦闘機の指令・探査システムを備える。',
                            'CBC-2000型　護送艦ドック',
                            '3隻の護送艦を格納可能な機内格納庫。護送艦の整備・支援システムを備える。',
                        ],
                        skillSlots: 5,
                        skills: [
                            enhancements.increaseDamageOfCorvette().withPercentageValue(10),
                            enhancements.reduceRtbCorvette().withPercentageValue(20),
                        ],
                    },
                ],
                category: 'UNKNOWN',
                categoryNumber: 1,
                carryCorvette: 3,
                carryFighter: 3,
                carryFighterType: ShipSubType.LARGE_FIGHTER,
                defaultModule: true,
            },
            {
                id: 'X2',
                name: '「スティンガー」総合UAVシステム',
                description: '戦闘UAV×3、防御UAV×2',
                parts: [
                    {
                        text: [
                            '「スティンガー」　攻撃UAVシステム',
                            '特殊設定のUAVハンガーシステム。3機の特殊攻撃UAVを積載でき、小型化されたチャージプラズマ砲により、大型目標に近接爆撃攻撃を行うことができる。',
                            '・エネルギー、対艦：4200',
                            '「スティンガー」　防御UAVシステム',
                            '特殊設定のUAVハンガーシステム。2機の特殊防衛UAVを積載でき、戦場の局所防衛を担える。',
                            '・エネルギー、対空：1500',
                        ],
                        skillSlots: 4,
                    },
                ],
                category: 'UNKNOWN',
                categoryNumber: 2,
            },
            {
                id: 'X3',
                name: 'UAV支援システム',
                description: '補修UAV×2、攻城UAV×4',
                parts: [
                    {
                        text: [
                            'CRT-3型　汎用ロボット補修ポッド',
                            '標準補修UAVを2機搭載する。補修UAVの収容と整備を行い、信号誘導システムを装備する。補修UAVは損傷した味方艦船を戦闘中に補修できる。',
                            'CST-6型　攻城UAV搭載室',
                            '標準攻城UAVを4機搭載する。攻城UAVの収容と整備を行い、信号誘導システムを装備する。',
                            '・攻城：6888',
                        ],
                        skillSlots: 4,
                    },
                ],
                category: 'UNKNOWN',
                categoryNumber: 3,
            },
            {
                id: 'X4',
                name: '対艦砲撃システム',
                description: '対小型武装',
                parts: [
                    {
                        text: [
                            'BG-2300A　2連対艦砲',
                            '対小型艦：',
                            '・直射、実弾、対艦：6624、攻城：806',
                        ],
                        skillSlots: 4,
                    },
                ],
                category: 'UNKNOWN',
                categoryNumber: 4,
            },
        ],
        relatedShipIds: [ShipId.SOLAR_WHALE],
    },
];
