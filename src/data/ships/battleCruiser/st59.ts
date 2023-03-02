import { skills } from '../../../skill/skill';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const st59: IShipDefinition[] = [
    {
        id: ShipId.ST59,
        name: 'ST59級',
        type: ShipType.BATTLE_CRUISER,
        cost: 28,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 6,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [
            {
                id: 'M1',
                name: '攻城電磁加速砲システム',
                description: '対大型武装',
                parts: [
                    {
                        text: [
                            'SR-2600型　重電磁加速砲',
                            '対大型艦：',
                            '・直射、実弾、対艦：10500、攻城：3360',
                        ],
                        skillSlots: 7,
                        skills: [
                            {
                                effect: '60秒毎に、システムメイン武器の攻撃・冷却時間が80％ダウンする。効果は15秒続く。冷却時間10秒。',
                                properties: '戦略、技術Pt15',
                            },
                            skills.increaseDamage().withValue(10).withCost(8),
                            skills.increaseDamage().withValue(10).withCost(8),
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: 'システムHPアップ',
                                properties: '最大34.8％、技術Pt8',
                            },
                            {
                                effect: 'クリティカルダメージアップ＆確率アップ',
                                properties: '最大50％、技術Pt8',
                            },
                            {
                                effect: '攻城ダメージアップ',
                                properties: '最大30％、技術Pt8',
                            },
                            {
                                effect: 'システムHPアップ',
                                properties: '最大34.8％、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'M',
                categoryNumber: 1,
                defaultModule: true,
            },
            {
                id: 'M2',
                name: '艦首大型砲システム',
                description: '',
                parts: [
                    {
                        text: [
                            'SG-2400T型　2連速射砲',
                            '対小型艦：',
                            '・直射、実弾、対艦：9600、攻城：768',
                        ],
                        skillSlots: 6,
                        skills: [
                            skills.increaseDamage().withValue(10).withCost(8),
                            skills.increaseDamage().withValue(10).withCost(8),
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: 'システムHPアップ',
                                properties: '最大34.8％、技術Pt8',
                            },
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: 'システムHPアップ',
                                properties: '最大34.8％、技術Pt8',
                            },
                            {
                                effect: '60秒毎に、システムメイン武器の攻撃・冷却時間が80％ダウンする。効果は15秒続く。冷却時間10秒。',
                                properties: '戦略、技術Pt15',
                            },
                        ],
                    },
                ],
                category: 'M',
                categoryNumber: 2,
            },
            {
                id: 'M3',
                name: '攻城魚雷システム',
                description: '対大型艦武装',
                parts: [
                    {
                        text: [
                            'ST-2600型　重魚雷ランチャー',
                            '対大型艦：',
                            '・投射、実弾、対艦：11333、攻城：2266',
                        ],
                        skillSlots: 6,
                        skills: [
                            skills.increaseDamage().withValue(10).withCost(8),
                            skills.increaseDamage().withValue(10).withCost(8),
                            {
                                effect: 'クリティカルダメージアップ＆確率アップ',
                                properties: '最大50％、技術Pt8',
                            },
                            skills.increaseDamage().withValue(10).withCost(8),
                            {
                                effect: '魚雷の被迎撃率ダウン',
                                properties: '最大30％、技術Pt8',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大34.8％、技術Pt8',
                            },
                            {
                                effect: '60秒毎に、システムメイン武器の攻撃・冷却時間が80％ダウンする。効果は15秒続く。冷却時間10秒。',
                                properties: '戦略、技術Pt15',
                            },
                        ],
                    },
                ],
                category: 'M',
                categoryNumber: 3,
            },
            {
                id: 'A1',
                name: '大型砲プラットフォーム',
                description: '対小型＆対空武装',
                parts: [
                    {
                        text: [
                            'MK4-SG-2580型「サンダーボルト」2連重砲',
                            '対小型艦：',
                            '・直射、実弾、対艦：6300、攻城：1134',
                            'SG-1120B型　通常砲',
                            '対空：',
                            '・直射、実弾、対艦：2400、対空：1440、攻城：72',
                        ],
                        skillSlots: 5,
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
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                            {
                                effect: '戦闘機/護送艦に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                            {
                                effect: '巡洋艦以上に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'A',
                categoryNumber: 1,
                defaultModule: true,
            },
            {
                id: 'A2',
                name: '電磁加速砲塔群',
                description: '対大型艦武装',
                parts: [
                    {
                        text: [
                            'SR-1425型　電磁加速砲塔',
                            '対大型艦：',
                            '・直射、実弾、対艦：13162、対空：212、攻城：1923',
                        ],
                        skillSlots: 5,
                        skills: [
                            skills.increaseDamage().withValue(10).withCost(8),
                            skills.increaseDamage().withValue(10).withCost(8),
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大15％、技術Pt8',
                            },
                            {
                                effect: 'クリティカルダメージアップ＆確率アップ',
                                properties: '最大50％、技術Pt8',
                            },
                            {
                                effect: '巡洋艦以上に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'A',
                categoryNumber: 2,
            },
            {
                id: 'A3',
                name: 'パルス砲塔群',
                description: '対小型艦武装',
                parts: [
                    {
                        text: [
                            'SP-430型　パルス砲塔',
                            '対小型艦：',
                            '・直射、エネルギー、対艦：7500、対空：3360、攻城：1200',
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
                                effect: '巡洋艦以上に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大15％、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'A',
                categoryNumber: 3,
            },
            {
                id: 'B1',
                name: '総合投射武器プラットフォーム',
                description: '対大型艦武装',
                parts: [
                    {
                        text: [
                            'K-ST-12-255A型　3X4クラスター魚雷発射システム',
                            '対大型艦：',
                            '・投射、実弾、対艦：8470、攻城：1185',
                        ],
                        skillSlots: 4,
                        skills: [
                            skills.increaseDamage().withValue(10).withCost(8),
                            skills.increaseDamage().withValue(10).withCost(8),
                            {
                                effect: '命中率アップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: '巡洋艦以上に対する命中率アップ',
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
            },
            {
                id: 'B2',
                name: '艦載機システム',
                description: '小～中型艦載機を2機搭載可能',
                parts: [
                    {
                        text: [
                            'CBF-305型　中型格納庫',
                        ],
                        skillSlots: 4,
                        skills: [
                            {
                                effect: '艦載機のロックオン速度アップ',
                                properties: '最大70％、技術Pt8',
                            },
                            {
                                effect: '艦載機の帰還冷却時間ダウン',
                                properties: '最大20％、技術Pt8',
                            },
                            {
                                effect: '艦載機の帰還冷却時間ダウン',
                                properties: '最大20％、技術Pt8',
                            },
                            {
                                effect: '艦載機の命中率アップ',
                                properties: '最大20％、技術Pt8',
                            },
                            {
                                effect: '艦載機のダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'B',
                categoryNumber: 2,
                carryFighter: 2,
                carryFighterType: ShipSubType.MEDIUM_FIGHTER,
            },
            {
                id: 'B3',
                name: 'エリア射撃統制システム',
                description: 'スポッターUAV×3',
                parts: [
                    {
                        text: [
                            'CIT-1型　スポッターUAV格納庫',
                            '周囲の味方の艦船に総合的な武器情報を提供し、武器の命中率をアップさせる。',
                        ],
                        skillSlots: 3,
                        skills: [
                            {
                                effect: 'UAVのロックオン速度アップ',
                                properties: '最大70％、技術Pt10',
                            },
                            {
                                effect: 'UAVの帰還冷却時間ダウン',
                                properties: '最大20％、技術Pt10',
                            },
                            {
                                effect: 'UAVの命中率アップ',
                                properties: '最大20％、技術Pt10',
                            },
                            {
                                effect: 'UAVのミサイル回避率アップ',
                                properties: '最大30％、技術Pt10',
                            },
                        ],
                    },
                ],
                category: 'B',
                categoryNumber: 3,
            },
            {
                id: 'C1',
                name: '付加装甲システム',
                description: 'HPを15%アップ（最大35％）',
                parts: [
                    {
                        text: [
                            'ASX-100型　追加装甲',
                            '既存の装甲内部に追加するナノ強化層。艦船構造の堅牢性を効果的に高める。',
                            'HP15％アップ',
                        ],
                        skillSlots: 2,
                        skills: [
                            skills.increaseHp().withValue(10).withCost(8),
                            skills.increaseHp().withValue(10).withCost(8),
                        ],
                    },
                ],
                category: 'C',
                categoryNumber: 1,
            },
            {
                id: 'C2',
                name: '電磁装甲システム',
                description: 'シールド値35％アップ（最大55％）',
                parts: [
                    {
                        text: [
                            'AEX-120型　電磁装甲',
                            '電磁的強化を施した付加装甲構造。エネルギーダメージを効果的に防護する。',
                            'シールド値35％アップ',
                        ],
                        skillSlots: 2,
                        skills: [
                            skills.increaseShield().withValue(10).withCost(8),
                            skills.increaseShield().withValue(10).withCost(8),
                        ],
                    },
                ],
                category: 'C',
                categoryNumber: 2,
            },
            {
                id: 'C3',
                name: '重装甲システム',
                description: '抵抗値250アップ（最大400）',
                parts: [
                    {
                        text: [
                            '抵抗値250',
                            '回避率-10%',
                            'メイン武器命中率-5%',
                            'ASX-130型　付加装甲',
                            '重付加装甲。既存の装甲をベースに装甲厚を増し、中型武器への防御力をアップさせた。ただし艦船の機動性と艦船メイン武器の命中率に影響する。',
                        ],
                        skillSlots: 2,
                        skills: [
                            skills.increaseArmor().withValue(75).withCost(8),
                            skills.increaseArmor().withValue(75).withCost(8),
                        ],
                    },
                ],
                category: 'C',
                categoryNumber: 3,
            },
        ],
    },
];
