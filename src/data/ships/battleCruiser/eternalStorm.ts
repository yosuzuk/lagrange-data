import { enhancements, strategy } from '../../../enhancements/enhancements';
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
                strategy.overdrive(90, 30, 15).withCost(15),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRate().withPercentageValue(10).withCost(10),
                enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                enhancements.increaseSystemHp().withPercentageValue(35).withCost(10),
                enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(10),
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
                strategy.overdrive(90, 30, 15).withCost(15),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(10),
                enhancements.reduceDuration().withPercentageValue(10).withCost(10),
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
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(10),
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
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseCriticalDamageAndChance().withPercentageValue(50).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
                enhancements.increaseSiegeDamage().withPercentageValue(30).withCost(10),
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
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                strategy.antiAircraftSupport(40, 30, 25).withCost(15),
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
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
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
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
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
                enhancements.reduceLockOnOfUav().withPercentageValue(70).withCost(5),
                enhancements.reduceRtbUav().withPercentageValue(20).withCost(5),
                enhancements.increaseHitRateOfUav().withPercentageValue(20).withCost(5),
                enhancements.increaseDamageOfUav().withPercentageValue(10).withCost(5),
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
                enhancements.reduceRtbUav().withPercentageValue(20).withCost(5),
                enhancements.reduceRtbUav().withPercentageValue(20).withCost(5),
                enhancements.reduceLockOnOfUav().withPercentageValue(70).withCost(5),
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
            ],
            effects: [
                enhancements.reduceProjectileDamageReceived().withFixedPercentageValue(15),
                enhancements.reduceCritialDamageReceived().withFixedPercentageValue(30),
            ],
            skillSlots: 2,
            skills: [
                enhancements.increaseShield().withPercentageValue(10).withCost(5),
                enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(5),
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
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(5),
                enhancements.increaseHitRateVsLarge().withPercentageValue(15).withCost(5),
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
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.increaseDamage().withPercentageValue(10).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(5),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(5),
                enhancements.increaseInterceptionChance().withPercentageValue(25).withCost(5),
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
