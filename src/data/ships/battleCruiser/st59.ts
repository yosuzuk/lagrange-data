import { enhancements, strategy } from '../../../enhancements/enhancements';
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
                            strategy.rapidFire(80, 60, 15, 10).withCost(15),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                            enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                            enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(8),
                            enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(8),
                            enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
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
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                            enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(14.8).withCost(8),
                            enhancements.increaseSystemHp().withPercentageValue(34.8).withCost(8),
                            strategy.rapidFire(80, 60, 15, 10).withCost(15),
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
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.reduceTorpedoInterception().withPercentageValue(30).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
                            strategy.rapidFire(80, 60, 15, 10).withCost(15),
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
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                            enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(8),
                            enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
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
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                            enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(8),
                            enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
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
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(15).withCost(8),
                            enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(8),
                            enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(8),
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
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseDamage().withPercentageValue(10).withCost(8),
                            enhancements.increaseHitRate().withPercentageValue(10).withCost(8),
                            enhancements.increaseHitRateVsLarge().withPercentageValue(14.8).withCost(8),
                            enhancements.reduceCooldown().withPercentageValue(14.8).withCost(8),
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
                            enhancements.reduceLockOnOfAircraft().withPercentageValue(70).withCost(8),
                            enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(8),
                            enhancements.reduceRtbAircraft().withPercentageValue(20).withCost(8),
                            enhancements.increaseHitRateOfAircraft().withPercentageValue(20).withCost(8),
                            enhancements.increaseDamageOfAircraft().withPercentageValue(10).withCost(8),
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
                            enhancements.reduceLockOnOfUav().withPercentageValue(70).withCost(10),
                            enhancements.reduceRtbUav().withPercentageValue(20).withCost(10),
                            enhancements.increaseHitRateOfUav().withPercentageValue(20).withCost(10),
                            enhancements.increaseMissileEvasionOfUav().withPercentageValue(30).withCost(10),
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
                        ],
                        effects: [
                            enhancements.increaseHp().withFixedPercentageValue(15),
                        ],
                        skillSlots: 2,
                        skills: [
                            enhancements.increaseHp().withPercentageValue(10).withCost(8),
                            enhancements.increaseHp().withPercentageValue(10).withCost(8),
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
                        ],
                        effects: [
                            enhancements.increaseShield().withFixedPercentageValue(35),
                        ],
                        skillSlots: 2,
                        skills: [
                            enhancements.increaseShield().withPercentageValue(10).withCost(8),
                            enhancements.increaseShield().withPercentageValue(10).withCost(8),
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
                            'ASX-130型　付加装甲',
                            '重付加装甲。既存の装甲をベースに装甲厚を増し、中型武器への防御力をアップさせた。ただし艦船の機動性と艦船メイン武器の命中率に影響する。',
                        ],
                        effects: [
                            enhancements.increaseArmor().withFixedAbsoluteValue(250),
                            enhancements.reduceEvasion().withFixedPercentageValue(10),
                            enhancements.reduceHitRateOfMainWeapon().withFixedPercentageValue(5),
                        ],
                        skillSlots: 2,
                        skills: [
                            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
                            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
                        ],
                    },
                ],
                category: 'C',
                categoryNumber: 3,
            },
        ],
    },
];
