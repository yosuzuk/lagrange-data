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
    name: '艦首攻城電磁加速砲システム',
    description: '対大型艦武装',
    parts: [
        {
            text: [
                'BR-1950C型「ルビー」',
                '対大型艦：',
                '・直射、実弾、対艦：13000、攻城：11310'
            ],
            skillSlots: 7,
            skills: [
                strategy.rapidFire(80, 60, 15, 10).withCost(12),
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
        }
    ],
    category: 'M',
    categoryNumber: 1,
    defaultModule: true,
};

const m2: ISystemModule = {
    id: 'M2',
    name: 'イオン砲塔システム',
    description: '対大型艦武装',
    parts: [{
        text: [
            'BI-850型　2連重イオン砲塔',
            '対大型艦：',
            '・直射、エネルギー、対艦：10285、攻城：1748'
        ],
        skillSlots: 6,
        // TODO skills
    }],
    category: 'M',
    categoryNumber: 2,
};

const a1: ISystemModule = {
    id: 'A1',
    name: 'フォートレス砲撃システム',
    description: '対艦＆対空武装',
    parts: [
        {
            text: [
                'BG-1850型　重砲',
                '対大型艦：',
                '・直射、実弾、対艦：9500、攻城：2755',
                'BG-2240型　対艦砲',
                '対小型艦：',
                '・直射、実弾、対艦：4000、対空：280、攻城：320',
                'BG-340B型　対空砲',
                '対空：',
                '・直射、実弾、対艦：1200、対空：1440',
            ],
            skillSlots: 5,
            skills: [
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.increaseDamage().withPercentageValue(10).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                enhancements.reduceCooldown().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRateVsSmall().withPercentageValue(15).withCost(10),
                enhancements.increaseHitRateVsAircraft().withPercentageValue(15).withCost(10),
                enhancements.reduceDuration().withPercentageValue(10).withCost(10),
            ],
        },
    ],
    category: 'A',
    categoryNumber: 1,
    defaultModule: true,
};

const a2: ISystemModule = {
    id: 'A2',
    name: 'フォートレス砲撃システム',
    description: '対艦＆対空武装',
    parts: [
        {
            text: [
                'BG-1950型　重砲',
                '対艦：',
                '・直射、実弾、対艦：16000、攻城：2880',
                'BG-3408型　対空砲',
                '対空：',
                '・直射、実弾、対艦：1200、対空：1440',
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
    name: 'フォートレス砲撃システム',
    description: '対艦＆対空武装',
    parts: [
        {
            text: [
                'BG-2350型　対艦砲',
                '対小型艦：',
                '・直射、実弾、対艦：18000、対空：540、攻城：1800',
                // TODO name
                '対空：',
                '・直射、実弾、対艦：1200、対空：1440',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'A',
    categoryNumber: 3,
};

const b1: ISystemModule = {
    id: 'B1',
    name: '「トロッコ」投射装置群',
    description: '対空武装、ミサイル迎撃',
    parts: [
        {
            text: [
                'BM-12x250型　通常ミサイル発射群',
                '対空：',
                '・直射、実弾、対艦：6480、対空：1315、攻城：259',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'B',
    categoryNumber: 1,
};

const b2: ISystemModule = {
    id: 'B2',
    name: '護送艦ドック',
    description: '護送艦を3隻搭載可能',
    parts: [
        {
            text: [
                'CBC-2300型　護送艦追加ドック',
                '護送艦外付け支援システム。最大3隻の護送艦を艦船外に配備できる。',
            ],
            skillSlots: 4,
            skills: [
                enhancements.reduceLockOn().withPercentageValue(70).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(20).withCost(6),
                enhancements.reduceCooldown().withPercentageValue(20).withCost(6),
                enhancements.increaseHitRate().withPercentageValue(20).withCost(6),
                enhancements.increaseDamage().withPercentageValue(10).withCost(6),
            ],
        },
    ],
    category: 'B',
    categoryNumber: 2,
    carryCorvette: 3,
};

const b3: ISystemModule = {
    id: 'B3',
    name: '統合損失管理システム',
    description: '補修ＵＡＶ×2',
    parts: [
        {
            text: [
                'CRT-3型　汎用ロボット補修ポッド',
                '標準補修UAVを2機搭載する。補修UAVの収容と整備を行い、信号誘導システムを装備する。補修UAVは損傷した味方艦船を戦闘中に補修できる。',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'B',
    categoryNumber: 3,
};

const c1: ISystemModule = {
    id: 'C1',
    name: '分散型軽量武器統制システム',
    description: '対空武装',
    parts: [
        {
            text: [
                'BG-6258型　対空砲',
                '対空：',
                '・直射、実弾、対空：1512',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'C',
    categoryNumber: 1,
};

const c2: ISystemModule = {
    id: 'C2',
    name: '追加装甲システム',
    description: '抵抗値アップ150',
    parts: [
        {
            text: [
                '既存の装甲内部に追加するナノ強化層。艦船構造の堅牢性を効果的に高める。',
            ],
            effects: [
                enhancements.increaseArmor().withFixedAbsoluteValue(150),
            ],
        },
    ],
    category: 'C',
    categoryNumber: 2,
};

const c3: ISystemModule = {
    id: 'C3',
    name: '対ミサイル要撃システム',
    description: '対空武装、ミサイル迎撃',
    parts: [
        {
            text: [
                'BG-625C1型　領域的対ミサイル要撃砲',
                '対空：',
                '・直射、実弾、対空：2159',
            ],
            // TODO skillslots
            // TODO skills
        },
    ],
    category: 'C',
    categoryNumber: 3,
};

export const spearOfUranus: IShipDefinition[] = [
    {
        id: ShipId.SPEAR_OF_URANUS,
        name: 'スピアーオブウラヌス級',
        type: ShipType.BATTLE_CRUISER,
        cost: 35,
        weight: 2,
        row: ShipRow.FRONT,
        operationLimit: 6,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        modules: [m1, m2, a1, a2, a3, b1, b2, b3, c1, c2, c3],
    },
];
