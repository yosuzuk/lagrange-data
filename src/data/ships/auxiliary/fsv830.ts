import { flagshipEffect, enhancements, strategy } from '../../../enhancements/enhancements';
import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition, ISystemModule } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { modules } from '../../modules';
import { ShipId } from '../../shipIds';

const m1: ISystemModule = {
    id: 'X1',
    name: '総合支援プラットフォーム',
    translatedName: {
        en: 'Integrated Support Platform',
    },
    description: '対空武装＆修理ドック',
    category: 'STATIC',
    categoryNumber: 1,
    mainSystem: true,
    effects: [
        enhancements.customModuleStorage().withFixedAbsoluteValue(40),
        enhancements.repairQueue().withAbsoluteValue(1),
    ],
    flagshipEffects: [
        flagshipEffect.fleetDock1().withCost(10),
    ],
    skills: [
        enhancements.increaseRepairSpeed().withPercentageValue(10).withCost(8),
        enhancements.increaseRepairSpeed().withPercentageValue(10).withCost(8),
        enhancements.reducePrefabCost().withPercentageValue(10).withCost(8),
        enhancements.increaseSupplySpeed().withPercentageValue(34).withCost(8),
        enhancements.increaseSupplySpeed().withPercentageValue(34).withCost(8),
        enhancements.increaseCustomModuleStorage().withPercentageValue(15).withCost(8),
        enhancements.increaseDamage().withPercentageValue(10).withCost(5),
    ],
    skillSlots: 5,
    parts: [{
        text: [
            '対空：',
            '・直射、実弾、対艦：3000、対空：360、攻城：90',
            '補修キュー1',
        ],
    }],
};

const a1: ISystemModule = {
    id: 'A1',
    name: '作業補修システム',
    description: 'スキルで補修速度アップ＆プレハブ消費ダウン',
    category: 'A',
    categoryNumber: 1,
    skills: [
        enhancements.increaseRepairSpeed().withPercentageValue(10),
        enhancements.increaseRepairSpeed().withPercentageValue(10),
        enhancements.reducePrefabCost().withPercentageValue(10),
        enhancements.reducePrefabCost().withPercentageValue(10),
    ],
    skillSlots: 3,
    parts: [
        {
            text: [
                'クイック補修装置',
                '補修ロボットを搭載して、艦船の補修を加速できる。',
            ],
        },
    ],
};

const a2: ISystemModule = {
    id: 'A2',
    name: '戦略資源備蓄システム',
    description: '貯蔵力60000',
    category: 'A',
    categoryNumber: 2,
    effects: [
        enhancements.increaseStorage().withFixedAbsoluteValue(60000),
    ],
    skills: [
        enhancements.increaseStorage().withPercentageValue(80),
        enhancements.increaseSupplySpeed().withPercentageValue(34),
        enhancements.increaseCustomModuleStorage().withPercentageValue(15),
        // TODO 4th skill
    ],
    // TODO skillslots
    // skillSlots: 99,
    parts: [{
        text: [
            '積載プラットフォーム',
            '大型露店運送システム。大量の貨物を格納でき、大型汎用艦に用いる。',
        ],
    }],
};

const b1: ISystemModule = {
    id: 'B1',
    name: 'フリゲート艦生産システム',
    description: '自己保有能力でフリゲートが生産可能',
    category: 'B',
    categoryNumber: 1,
    defaultModule: true,
    effects: [
        enhancements.increaseSelfHostCapacity().withFixedAbsoluteValue(60),
    ],
    skills: [
        enhancements.increaseProductionSpeed().withPercentageValue(40),
        enhancements.increaseProductionSpeed().withPercentageValue(40),
        enhancements.reduceUeCoinCost().withPercentageValue(15),
        enhancements.reduceUeCoinCost().withPercentageValue(15),
        enhancements.increaseSelfHostCapacity().withPercentageValue(40),
    ],
    skillSlots: 4,
    parts: [{
        text: [
            '完全な小型艦船生産設備を備え、基地を離れて支援艦単独でのフリゲートの生産を可能にするが生産効率は低め。',
        ],
    }],
};

const b2: ISystemModule = {
    id: 'B2',
    name: 'エスコート生産システム',
    description: '自己保有能力で護送艦が生産可能',
    category: 'B',
    categoryNumber: 2,
    skillSlots: 3,
    parts: [{
        text: [
            '完全な小型艦載機生産設備を備え、基地を離れて支援艦単独での護送艦の生産を可能にするが生産効率は低め',
        ],
    }],
};

const b3: ISystemModule = {
    id: 'B3',
    name: '戦闘機生産システム',
    description: '自己保有能力で戦闘機が生産可能',
    category: 'B',
    categoryNumber: 3,
    skillSlots: 3,
    parts: [{
        text: [
            '完全な小型艦載機生産設備を備え、基地を離れて支援艦単独での戦闘機の生産を可能にするが生産効率は低め',
        ],
    }],
};

const c1: ISystemModule = {
    id: 'C1',
    name: 'キャリア航空機システム',
    description: '小～中型戦闘機を２機搭載可能',
    category: 'C',
    categoryNumber: 1,
    carryFighter: 2,
    carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    skillSlots: 4,
    parts: [{
        text: [
            '攻撃機と戦闘機を格納可能な中型機内格納庫。',
            '2隊までの戦闘機編隊を停泊・整備する空間を提供し、戦闘機の指令・探査システムを備える。',
        ],
    }],
};

const c2: ISystemModule = {
    id: 'C2',
    name: 'UAV補修システム',
    description: '補修ＵＡＶ×２',
    category: 'C',
    categoryNumber: 2,
    skillSlots: 4,
    parts: [{
        text: [
            'CRT-3型　汎用ロボット補修ポッド',
            '標準補修UAVを2機搭載する。補修UAVの収容と整備を担い、信号誘導システムを装備する。補修UAVは補修した味方艦船を戦闘中に補修できる。',
        ],
    }],
};

const d1: ISystemModule = {
    id: 'D1',
    name: '指令システムの警告',
    description: '味方艦船の被命中率ダウン（回避アップ）',
    category: 'D',
    categoryNumber: 1,
    defaultModule: true,
    effects: [
        enhancements.reduceHitByTorpedoInBackRow().withFixedPercentageValue(8),
        enhancements.reduceHitByMissileInBackRow().withFixedPercentageValue(8),
    ],
    flagshipEffects: [
        flagshipEffect.focusFire().withDefaultFlag(),
        flagshipEffect.customFlashipEffect('sailingSpeedCoordination1').withDescriptionKey('sailingSpeedCoordination1').withConditionKey('sailingSpeedCoordination1').withDefaultFlag(),
    ],
    skills: [
        enhancements.reduceHitByProjectileInBackRow().withPercentageValue(8).withCost(8),
        enhancements.reduceHitByProjectileInMidRow().withPercentageValue(8).withCost(8),
        enhancements.reduceHitBySlowInBackRow().withPercentageValue(8).withCost(8),
        enhancements.reduceDamageReceivedBySystem().withAbsoluteValue(5),
        enhancements.increaseSystemHp().withPercentageValue(10),
    ],
    skillSlots: 2,
};

const d2: ISystemModule = {
    id: 'D2',
    name: '協同指令システム',
    description: '味方艦船の命中率アップ',
    category: 'D',
    categoryNumber: 2,
    effects: [
        enhancements.increaseMissileHitRateMidRow().withFixedPercentageValue(12),
        enhancements.increaseTorpedoHitRateMidRow().withFixedPercentageValue(12),
    ],
    skills: [
        enhancements.increaseProjectileHitRateMidRow().withPercentageValue(8).withCost(8),
    ],
    skillSlots: 2,
};

const d3: ISystemModule = {
    id: 'D3',
    name: '指令システムの妨害',
    description: '艦種を空母か駆逐艦に偽装',
    category: 'D',
    categoryNumber: 3,
    skills: [
        enhancements.disguiseAsDestroyer(),
    ],
    skillSlots: 2,
    parts: [{
        text: [
            '視覚信号カモフラージュ',
            '自身が攻撃目標になった時に、航空空母と見なされるようにする',
        ],
    }],
};

const e1: ISystemModule = {
    id: 'E1',
    name: 'エリア防空システム',
    description: '対空武装（同列）',
    category: 'E',
    categoryNumber: 1,
    skillSlots: 4,
    parts: [{
        text: [
            '対空：',
            '・直射、実弾、対空：3920'
        ],
    }],
};

const e2: ISystemModule = {
    id: 'E2',
    name: 'エスコートドック',
    description: '護送艦を３機搭載可能',
    category: 'E',
    categoryNumber: 2,
    carryCorvette: 3,
    skillSlots: 4,
    parts: [{
        text: [
            '３隻の護送艦を格納可能な機内格納庫。',
            '護送艦の整備・支援システムを備える。',
        ],
    }],
};

const staticModules: ISystemModule[] = [
    modules.armorSystem({
        skills: [
            enhancements.increaseHp().withPercentageValue(10).withCost(8),
            enhancements.increaseHp().withPercentageValue(10).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.increaseArmor().withAbsoluteValue(75).withCost(8),
            enhancements.reduceCritialDamageReceived().withPercentageValue(30).withCost(8),
            enhancements.increaseShield().withPercentageValue(10).withCost(8),
        ],
        skillSlots: 4,
    }),
    modules.propulsionSystem({
        skills: [
            strategy.evasiveManeuvers(20, 40, 40).withCost(20),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(8),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(8),
            enhancements.increaseCruisingSpeed().withPercentageValue(15).withCost(8),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
            enhancements.increaseWarpSpeed().withPercentageValue(15).withCost(6),
        ],
        skillSlots: 3,
    }),
    modules.energySystem(),
];

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
        modules: [m1, a1, a2, b1, b2, b3, c1, c2, d1, d2, d3, e1, e2, ...staticModules],
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
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW4, ShipId.FSV830_TE_PREVIEW5],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(b1),
            modules.toStatic(d1),
            ...staticModules,
        ],
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
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW4, ShipId.FSV830_TE_PREVIEW5],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(b2),
            modules.toStatic(d1),
            ...staticModules,
        ],
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
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW4, ShipId.FSV830_TE_PREVIEW5],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(b1),
            modules.toStatic(d1),
            modules.toStatic(e2),
            ...staticModules,
        ],
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
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW5],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(d2),
            modules.toStatic(b1),
            modules.toStatic(e1),
            ...staticModules,
        ],
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
        relatedShipIds: [ShipId.FSV830, ShipId.FSV830_TE_PREVIEW1, ShipId.FSV830_TE_PREVIEW2, ShipId.FSV830_TE_PREVIEW3, ShipId.FSV830_TE_PREVIEW4],
        modules: [
            modules.toStatic(m1),
            modules.toStatic(d1),
            modules.toStatic(b3),
            modules.toStatic(c1),
            ...staticModules,
        ],
    },
];
