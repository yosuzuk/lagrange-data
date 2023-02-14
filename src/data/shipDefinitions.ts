import { Manufacturer } from '../types/Manufacturer';
import { ResearchManufacturer } from '../types/ResearchManufacturer';
import { ResearchStrategyType } from '../types/ResearchStrategyType';
import { ResearchTacticType } from '../types/ResearchTacticType';
import { IShipDefinition } from '../types/ShipDefinition';
import { ShipRow } from '../types/ShipRow';
import { ShipSource } from '../types/ShipSource';
import { ShipSubType, ShipType } from '../types/ShipType';
import { ShipId } from './shipIds';
import { ediacaran } from './ships/auxiliary/ediacaran';
import { fsv830 } from './ships/auxiliary/fsv830';
import { constantineTheGreat } from './ships/battleCruiser/constantineTheGreat';
import { eternalStorm } from './ships/battleCruiser/eternalStorm';
import { indefatigable } from './ships/battleCruiser/indefatigable';
import { thunderboldStar } from './ships/battleCruiser/thunderboltStar';
import { cv3000 } from './ships/carrier/cv3000';
import { marshallCrux } from './ships/carrier/marshallCrux';
import { cellularDefender } from './ships/corvette/cellularDefender';
import { cvII003 } from './ships/corvette/cvII003';
import { cvMo11 } from './ships/corvette/cvMo11';
import { cvT800 } from './ships/corvette/cvT800';
import { nebulaChaser } from './ships/corvette/nubulaChaser';
import { redBeast7_13 } from './ships/corvette/redBeast7_13';
import { sLevi } from './ships/corvette/sLevi';
import { callisto } from './ships/cruiser/callisto';
import { cas066 } from './ships/cruiser/cas066';
import { chimera } from './ships/cruiser/chimera';
import { conamaraChaos } from './ships/cruiser/conamaraChaos';
import { crasher } from './ships/cruiser/crasher';
import { io } from './ships/cruiser/io';
import { jaeger } from './ships/cruiser/jaeger';
import { kccpv2_0 } from './ships/cruiser/kccpv2_0';
import { lightCone } from './ships/cruiser/lightCone';
import { predator } from './ships/cruiser/predator';
import { ac721 } from './ships/destroyer/ac721';
import { aldabra } from './ships/destroyer/aldabra';
import { argus } from './ships/destroyer/argus';
import { boreas } from './ships/destroyer/boreas';
import { ceres } from './ships/destroyer/ceres';
import { erisI } from './ships/destroyer/erisI';
import { guardian } from './ships/destroyer/guardian';
import { helios } from './ships/destroyer/helios';
import { quaoar } from './ships/destroyer/quaoar';
import { a101TheRationalTe } from './ships/fighter/a101TheRational';
import { b192Newland } from './ships/fighter/b192Newland';
import { balancerAnderson } from './ships/fighter/balancerAnderson';
import { bullfrog } from './ships/fighter/bullfrog';
import { hayreddingsLoyal } from './ships/fighter/hayreddingsLoyal';
import { janbiyaAer410 } from './ships/fighter/janbiyaAer410';
import { mistral } from './ships/fighter/mistral';
import { carilion } from './ships/frigate/carilion';
import { fg300 } from './ships/frigate/fg300';
import { grimReaper } from './ships/frigate/grimReaper';
import { mareNubium } from './ships/frigate/mareNubium';
import { mareSerenitatis } from './ships/frigate/mareSerenitatis';
import { mareTranquillitatis } from './ships/frigate/mareTranquillitatis';
import { noma330 } from './ships/frigate/noma330';
import { nomaM470 } from './ships/frigate/nomaM470';
import { rager } from './ships/frigate/rager';
import { reliat } from './ships/frigate/reliat';
import { ruby } from './ships/frigate/ruby';

export const shipDefinitions: IShipDefinition[] = [
    ...a101TheRationalTe,
    ...ac721,
    ...aldabra,
    ...argus,
    ...b192Newland,
    ...balancerAnderson,
    ...boreas,
    ...bullfrog,
    ...callisto,
    ...carilion,
    ...cas066,
    ...cellularDefender,
    ...ceres,
    ...chimera,
    ...conamaraChaos,
    ...constantineTheGreat,
    ...crasher,
    ...cvII003,
    ...cvMo11,
    ...cvT800,
    ...cv3000,
    ...ediacaran,
    ...erisI,
    ...eternalStorm,
    ...fsv830,
    ...fg300,
    ...grimReaper,
    ...guardian,
    ...hayreddingsLoyal,
    ...helios,
    ...indefatigable,
    ...io,
    ...jaeger,
    ...janbiyaAer410,
    ...kccpv2_0,
    ...lightCone,
    ...mareNubium,
    ...mareSerenitatis,
    ...mareTranquillitatis,
    ...marshallCrux,
    ...mistral,
    ...nebulaChaser,
    ...noma330,
    ...nomaM470,
    ...predator,
    ...quaoar,
    ...redBeast7_13,
    ...rager,
    ...reliat,
    ...ruby,
    ...sLevi,

    {
        id: ShipId.SANDRAKE,
        name: 'サンドレイク',
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
    {
        id: ShipId.SC002,
        name: 'SC002型',
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.STRATEGY_AND_SUPPORT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
    {
        id: ShipId.SILENT_ASSASSIN,
        name: 'サイレントアサシン',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
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
        modules: [
            {
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
                            {
                                effect: '護送艦のダメージアップ',
                                properties: '最大10％、技術Pt10',
                            },
                            {
                                effect: '護送艦の帰還冷却時間ダウン',
                                properties: '最大20％、技術Pt10',
                            },
                            {
                                effect: '護送艦の帰還冷却時間ダウン',
                                properties: '最大20％、技術Pt10',
                            },
                            {
                                effect: '護送艦の命中率アップ',
                                properties: '最大20％、技術Pt10',
                            },
                            {
                                effect: '護送艦のダメージアップ',
                                properties: '最大10％、技術Pt10',
                            },
                            {
                                effect: '護送艦の対ミサイル回避率アップ',
                                properties: '最大30％、技術Pt10',
                            },
                            {
                                effect: 'システムHPアップ',
                                properties: '最大35％、技術Pt10',
                            },
                        ],
                    },
                ],
                category: 'M',
                categoryNumber: 1,
                carryCorvette: 6,
                defaultModule: true,
            },
            {
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
            },
            {
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
                            {
                                effect: '敵が巡洋艦を失うと10秒間冷却時間85％ダウン',
                                properties: '戦略、技術Pt15',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
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
                                effect: '戦闘機/護送艦に対する命中率アップ',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: 'ミサイルのダメージアップ',
                                properties: '最大10％、技術Pt8',
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
                category: 'A',
                categoryNumber: 1,
                defaultModule: true,
            },
            {
                id: 'A2',
                name: '投射武器プラットフォーム',
                description: '対小型艦＆対空武装',
                parts: [
                    {
                        text: [
                            'MK5-BM-16x180「ライトニングフィールド」対艦ミサイル群',
                            '対小型艦：',
                            '・投射、実弾、対艦：4430、攻城：354',
                            'MK3-BM-8x320「ライトニングフィールド」対艦ミサイル群', // TODO verify name (same as A3)
                            '対空：', // TODO verify priority
                            '・投射、実弾、対艦：4911、対空：510、攻城：294',
                        ],
                        // TODO skillslots
                        // TODO skills
                    },
                ],
                category: 'A',
                categoryNumber: 2,
            },
            {
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
                            {
                                effect: '敵が巡洋艦を失うと10秒間冷却時間85％ダウン',
                                properties: '戦略、技術Pt15',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                                effect: '巡洋艦以上に対する命中率アップ',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大14.8％、技術Pt8',
                            },
                            {
                                effect: '戦闘機/護送艦に対する命中率アップ',
                                properties: '最大14.8％、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'A',
                categoryNumber: 3,
            },
            {
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
                            {
                                effect: '艦載機の帰還冷却時間ダウン',
                                properties: '最大5％、技術Pt8',
                            },
                            {
                                effect: '艦載機の帰還冷却時間ダウン',
                                properties: '最大5％、技術Pt8',
                            },
                            {
                                effect: '艦載機の帰還冷却時間ダウン',
                                properties: '最大5％、技術Pt8',
                            },
                            {
                                effect: '艦載機のダメージアップ',
                                properties: '最大3％、技術Pt8',
                            },
                            {
                                effect: '艦載機のダメージアップ',
                                properties: '最大3％、技術Pt8',
                            },
                            {
                                effect: '艦載機のダメージアップ',
                                properties: '最大3％、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'B',
                categoryNumber: 1,
                defaultModule: true,
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt5',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt5',
                            },
                            {
                                effect: '対戦闘機/護送艦命中率アップ',
                                properties: '最大15％、技術Pt5',
                            },
                            {
                                effect: '対戦闘機/護送艦命中率アップ',
                                properties: '最大15％、技術Pt5',
                            },
                        ],
                    },
                ],
                category: 'C',
                categoryNumber: 3,
            },
        ],
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
                            {
                                effect: '護送艦のダメージアップ',
                                properties: '最大10％',
                            },
                            {
                                effect: '護送艦の帰還冷却時間ダウン',
                                properties: '最大20％',
                            },
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
        modules: [
            {
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
                            {
                                effect: '90秒毎に15秒間攻撃・冷却時間が80％ダウン、冷却10秒',
                                properties: '戦略、技術Pt12',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                                effect: 'システムＨＰアップ',
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
                                effect: 'システムＨＰアップ',
                                properties: '最大34.8％、技術Pt8',
                            },
                        ],
                    }
                ],
                category: 'M',
                categoryNumber: 1,
                defaultModule: true,
            },
            {
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
            },
            {
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
                                properties: '最大10％、技術Pt10',
                            },
                            {
                                effect: 'フリゲート/駆逐艦に対する命中率アップ',
                                properties: '最大15％、技術Pt10',
                            },
                            {
                                effect: '戦闘機/護送艦に対する命中率アップ',
                                properties: '最大15％、技術Pt10',
                            },
                            {
                                effect: '出力時間ダウン',
                                properties: '最大10％、技術Pt10',
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
                name: 'フォートレス砲撃システム',
                description: '対艦＆対空武装',
                parts: [
                    {
                        text: [
                            'BG-1950型　重砲',
                            '対艦：', // TODO priority
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
            },
            {
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
            },
            {
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
            },
            {
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
                            {
                                effect: 'ロックオン速度アップ',
                                properties: '最大70％、技術Pt6',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大20％、技術Pt6',
                            },
                            {
                                effect: '冷却時間ダウン',
                                properties: '最大20％、技術Pt6',
                            },
                            {
                                effect: '命中率アップ',
                                properties: '最大20％、技術Pt6',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt6',
                            },
                        ],
                    },
                ],
                category: 'B',
                categoryNumber: 2,
                carryCorvette: 3,
            },
            {
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
            },
            {
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
            },
            {
                id: 'C2',
                name: '追加装甲システム',
                description: '抵抗値アップ150',
                parts: [
                    {
                        text: [
                            '既存の装甲内部に追加するナノ強化層。艦船構造の堅牢性を効果的に高める。',
                        ],
                    },
                ],
                category: 'C',
                categoryNumber: 2,
            },
            {
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
            },
        ],
    },
    {
        id: ShipId.SPORE_A404,
        name: 'スポアA404',
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'クリティカルダメージアップ＆確率アップ',
                                properties: '最大50％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'ダメージアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'HPアップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'HPアップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: 'シールド値アップ',
                                properties: '最大10％、技術Pt8',
                            },
                            {
                                effect: 'シールド値アップ',
                                properties: '最大10％、技術Pt8',
                            },
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
                            {
                                effect: '抵抗値アップ',
                                properties: '最大75、技術Pt8',
                            },
                            {
                                effect: '抵抗値アップ',
                                properties: '最大75、技術Pt8',
                            },
                        ],
                    },
                ],
                category: 'C',
                categoryNumber: 3,
            },
        ],
    },
    {
        id: ShipId.STAR_SWEEPER_A,
        name: 'スタースィーパー級　Ａイオン砲型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.STAR_SWEEPER_TE_A, ShipId.STAR_SWEEPER_TE_A_S],
    },
    {
        id: ShipId.STAR_SWEEPER_TE_A,
        name: 'スタースィーパー級-TE　Ａイオン砲型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.STAR_SWEEPER_A, ShipId.STAR_SWEEPER_TE_A_S],
    },
    {
        id: ShipId.STAR_SWEEPER_TE_A_S,
        name: 'スタースィーパー級-TE　Ａイオン砲型（回収）',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 5,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.STAR_SWEEPER_A, ShipId.STAR_SWEEPER_TE_A],
    },
    {
        id: ShipId.STINGRAY,
        name: 'スティングレイ',
        type: ShipType.FIGHTER,
        subType: ShipSubType.LARGE_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
    },
    {
        id: ShipId.STRIX_A100,
        name: 'ストリクスA100型',
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
    {
        id: ShipId.TAURUS_A,
        name: 'トーラス級　Ａ攻撃型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.TAURUS_B, ShipId.TAURUS_C],
    },
    {
        id: ShipId.TAURUS_B,
        name: 'トーラス級　Ｂ突撃型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.TAURUS_A,
    },
    {
        id: ShipId.TAURUS_TE_A_S,
        name: 'トーラス級-TE　Ａ対艦型（回収）',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        subModelIds: [ShipId.TAURUS_A, ShipId.TAURUS_B, ShipId.TAURUS_C, ShipId.TAURUS_TE_B_S],
    },
    {
        id: ShipId.TAURUS_TE_B_S,
        name: 'トーラス級-TE　Ｂ突撃型（回収）',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        subModelIds: [ShipId.TAURUS_A, ShipId.TAURUS_B, ShipId.TAURUS_C, ShipId.TAURUS_TE_A_S],
    },
    {
        id: ShipId.TAURUS_C,
        name: 'トーラス級　Ｃ防護型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.TAURUS_A,
    },
    ...thunderboldStar,
    {
        id: ShipId.TUNDRA_A,
        name: 'ツンドラ級　Ａ支援型',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        subModelIds: [ShipId.TUNDRA_B],
        relatedShipIds: [ShipId.TUNDRA_TE_S],
    },
    {
        id: ShipId.TUNDRA_B,
        name: 'ツンドラ級　Ｂ艦載型',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.TUNDRA_A,
        relatedShipIds: [ShipId.TUNDRA_TE_S],
        carryFighter: 2,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    },
    {
        id: ShipId.TUNDRA_TE_S,
        name: 'ツンドラ級-TE　Ａ対空型（回収）',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.TUNDRA_A, ShipId.TUNDRA_B],
    },
    {
        id: ShipId.VITAS_A021,
        name: 'ヴィタスA021',
        type: ShipType.FIGHTER,
        subType: ShipSubType.MEDIUM_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
    },
    {
        id: ShipId.VITAS_B010,
        name: 'ヴィタスB010',
        type: ShipType.FIGHTER,
        subType: ShipSubType.LARGE_FIGHTER,
        cost: 0,
        weight: 5,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
    },
    {
        id: ShipId.VOID_ELFIN,
        name: 'ボイドエルフィン',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
    },
    {
        id: ShipId.WILD_FIRE_TE,
        name: 'ワイルドファイヤー-TE',
        type: ShipType.CORVETTE,
        cost: 0,
        weight: 0,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
    },
    {
        id: ShipId.WINGED_HUSSAR_A,
        name: 'ウイングドユサール　Ａ対艦型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.WINGED_HUSSAR_B, ShipId.WINGED_HUSSAR_C],
    },
    {
        id: ShipId.WINGED_HUSSAR_B,
        name: 'ウイングドユサール　Ｂ総合型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.WINGED_HUSSAR_A,
    },
    {
        id: ShipId.WINGED_HUSSAR_C,
        name: 'ウイングドユサール　Ｃ対空型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.WINGED_HUSSAR_A,
    },
    {
        id: ShipId.XENO_STINGER_A,
        name: 'ゼノスティンガー級　Ａ特殊型',
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [],
        subModelIds: [ShipId.XENO_STINGER_B],
    },
    {
        id: ShipId.XENO_STINGER_B,
        name: 'ゼノスティンガー級　Ｂ対空型',
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 5,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.XENO_STINGER_A,
    },
    {
        id: ShipId.XT_8_A,
        name: 'XT-8級　Ａ攻城型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_8_B],
    },
    {
        id: ShipId.XT_8_B,
        name: 'XT-8級　Ｂミサイル型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_8_A],
    },
    {
        id: ShipId.XT_10_A,
        name: 'XT-10級　Ａ魚雷型', // TODO check
        type: ShipType.DESTROYER,
        cost: 10,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
    },
    {
        id: ShipId.XT_20_A,
        name: 'XT-20級　Ａ積載型',
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 6,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryCorvette: 4,
        relatedShipIds: [ShipId.XT_20_B, ShipId.XT_20_C],
    },
    {
        id: ShipId.XT_20_B,
        name: 'XT-20級　Ｂ艦載型',
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 6,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryFighter: 4,
        carryFighterType: ShipSubType.LARGE_FIGHTER,
        relatedShipIds: [ShipId.XT_20_A, ShipId.XT_20_C],
    },
    {
        id: ShipId.XT_20_C,
        name: 'XT-20級　Ｃ支援型', // TODO check
        type: ShipType.CRUISER,
        cost: 14,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 6,
        source: ShipSource.UNKNOWN, // TODO check
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.XT_20_B, ShipId.XT_20_C],
    },
];
