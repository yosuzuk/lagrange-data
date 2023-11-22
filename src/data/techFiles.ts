import { ITechFile } from '../types/ITechFile';
import { ShipType } from '../types/ShipType';
import { ShipId } from './shipIds';

export const techFiles: ITechFile[] = [
    {
        id: 'blueprintFile2',
        name: '艦舶・艦載機設計図ファイル2.0',
        translatedName: {
            en: 'Ship & Aircraft BP Files 2.0',
        },
        desciption: '研究ポイント１５で買える常設確定箱',
        translatedDescription: {
            en: '15 research points',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.28,
            [ShipType.DESTROYER]: 0.24,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
            [ShipType.AUXILIARY]: 0.03,
            [ShipType.CARRIER]: 0.03,
            [ShipType.FIGHTER]: 0.1,
            [ShipType.CORVETTE]: 0.15,
        },
        chanceForTechPoint: 0,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.XENO_STINGER_A,
            ShipId.MARE_IMBRIUM_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_NUBIUM_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.FG300_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.ALDABRA_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.AC721_A,
            ShipId.ERIS_I_A,
            ShipId.QUAOAR_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CONAMARA_CHAOS_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.CALLISTO_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.CAS066_A,
            ShipId.KCCPV2_0_A,
            ShipId.THUNDERBOLT_STAR,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.EDIACARAN,
            ShipId.FSV830,
            ShipId.SOLAR_WHALE,
            ShipId.MARSHALL_CRUX,
            ShipId.CV3000,
            ShipId.AT021_A,
            ShipId.MISTRAL,
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.STRIX_A100,
            ShipId.BULLFROG,
            ShipId.SANDRAKE,
            ShipId.SC002,
            ShipId.S_LEVI9,
            ShipId.CV_T800,
            ShipId.CV_M011_A,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.RED_BEAST_7_13,
            ShipId.CV_II003,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'blueprintFile1',
        name: '艦舶・艦載機設計図ファイル',
        translatedName: {
            en: 'Ship & Aircraft BP Files',
        },
        desciption: '研究ポイント１５で買える常設確定箱',
        translatedDescription: {
            en: '15 research points',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.3,
            [ShipType.DESTROYER]: 0.25,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.03,
            [ShipType.FIGHTER]: 0.1,
            [ShipType.CORVETTE]: 0.15,
        },
        chanceForTechPoint: 0,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.XENO_STINGER_A,
            ShipId.MARE_IMBRIUM_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_NUBIUM_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.FG300_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.AC721_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.CALLISTO_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.CAS066_A,
            ShipId.KCCPV2_0_A,
            ShipId.THUNDERBOLT_STAR,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.SOLAR_WHALE,
            ShipId.CV3000,
            ShipId.AT021_A,
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.STRIX_A100,
            ShipId.BULLFROG,
            ShipId.SANDRAKE,
            ShipId.SC002,
            ShipId.S_LEVI9,
            ShipId.CV_M011_A,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.RED_BEAST_7_13,
            ShipId.CV_II003,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'blackMarketTechFileV2',
        name: '暗号化技術ファイル2.0',
        translatedName: {
            en: 'Black Market Tech Files 2.0',
        },
        desciption: 'プロキシマコイン３００で買える常設箱',
        translatedDescription: {
            en: '300 Proxima coins',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.028,
            [ShipType.DESTROYER]: 0.024,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0.003,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.XENO_STINGER_A,
            ShipId.MARE_IMBRIUM_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_NUBIUM_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.FG300_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.ALDABRA_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.AC721_A,
            ShipId.ERIS_I_A,
            ShipId.QUAOAR_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CONAMARA_CHAOS_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.CALLISTO_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.CAS066_A,
            ShipId.KCCPV2_0_A,
            ShipId.THUNDERBOLT_STAR,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.EDIACARAN,
            ShipId.FSV830,
            ShipId.SOLAR_WHALE,
            ShipId.MARSHALL_CRUX,
            ShipId.CV3000,
            ShipId.AT021_A,
            ShipId.MISTRAL,
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.STRIX_A100,
            ShipId.BULLFROG,
            ShipId.SANDRAKE,
            ShipId.SC002,
            ShipId.S_LEVI9,
            ShipId.CV_T800,
            ShipId.CV_M011_A,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.RED_BEAST_7_13,
            ShipId.CV_II003,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'genericTechFileV2',
        name: '一般技術ファイル2.0',
        translatedName: {
            en: 'Generic Tech Files 2.0',
        },
        desciption: 'ＵＥコイン１００００で買える常設箱',
        translatedDescription: {
            en: '10000 UE coins',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.008,
            [ShipType.DESTROYER]: 0.007,
            [ShipType.CRUISER]: 0.002,
            [ShipType.BATTLE_CRUISER]: 0.001,
            [ShipType.AUXILIARY]: 0.001,
            [ShipType.CARRIER]: 0.001,
            [ShipType.FIGHTER]: 0.005,
            [ShipType.CORVETTE]: 0.005,
        },
        chanceForTechPoint: 0.97,
        ships: [
            ShipId.FG300_A,
            ShipId.AC721_A,
            ShipId.CAS066_A,
            ShipId.KCCPV2_0_A,
            ShipId.ST59,
            ShipId.FSV830,
            ShipId.CV3000,
            ShipId.SC002,
            ShipId.CV_T800,
            ShipId.CV_M011_A,
            ShipId.CV_II003,
        ],
    },
    {
        id: 'unitedTechFile',
        name: 'ユナイテッドテックファイル',
        translatedName: {
            en: 'United Tech Files',
        },
        desciption: '３回限りの個数限定箱',
        translatedDescription: {
            en: '799 Proxima coins (max. 3 per account)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.5,
            [ShipType.DESTROYER]: 0.5,
            [ShipType.CRUISER]: 0,
            [ShipType.BATTLE_CRUISER]: 0,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0,
            [ShipType.CORVETTE]: 0,
        },
        chanceForTechPoint: 0,
        ships: [
            ShipId.RELIAT_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.WINGED_HUSSAR_A,
        ],
    },
    {
        id: 'enterpriseSelectionFileV3',
        name: '企業選別技術ファイル',
        translatedName: {
            en: 'Tech Files Selected by Enterprise',
        },
        desciption: 'プロキシマコイン４５０（初回２２５、期間限定）',
        translatedDescription: {
            en: '450 Proxima coins (special package)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.028,
            [ShipType.DESTROYER]: 0.024,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0.003,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.GUARDIAN_A,
            ShipId.ALDABRA_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.QUAOAR_A,
            ShipId.CONAMARA_CHAOS_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.JAEGER_A,
            ShipId.IO_A,
            ShipId.THUNDERBOLT_STAR,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.EDIACARAN,
            ShipId.FSV830,
            ShipId.SOLAR_WHALE,
            ShipId.MARSHALL_CRUX,
            ShipId.CV3000,
            ShipId.MISTRAL,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_A021,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.STRIX_A100,
            ShipId.SANDRAKE,
            ShipId.S_LEVI9,
            ShipId.CV_T800,
            ShipId.VOID_ELFIN,
            ShipId.RED_BEAST_7_13,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'enterpriseBlueprintFile',
        name: '企業版設計図ファイル',
        translatedName: {
            en: 'Enterprise BP Files',
        },
        desciption: '開拓状況の評価後にドーンポイント２００で買える限定確定箱',
        translatedDescription: {
            en: '200 Dawn points (2 per season)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.3,
            [ShipType.DESTROYER]: 0.25,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.03,
            [ShipType.FIGHTER]: 0.1,
            [ShipType.CORVETTE]: 0.15,
        },
        chanceForTechPoint: 0,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.XENO_STINGER_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_NUBIUM_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.CALLISTO_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.SOLAR_WHALE,
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.STRIX_A100,
            ShipId.BULLFROG,
            ShipId.SANDRAKE,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.RED_BEAST_7_13,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'dawnTechFile',
        name: '技術ファイル - ドーン基準',
        translatedName: {
            en: 'Standard Military Ship Tech Files',
        },
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        translatedDescription: {
            en: '450 Proxima coins (5 per season)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.FG300_A,
            ShipId.AC721_A,
            ShipId.CAS066_A,
            ShipId.KCCPV2_0_A,
            ShipId.ST59,
            ShipId.CV3000,
            ShipId.SC002,
            ShipId.CV_M011_A,
            ShipId.CV_II003,
        ],
    },
    {
        id: 'jupiterIndustryTechFile',
        name: '技術ファイル - ジュピターインダストリー',
        translatedName: {
            en: 'Jupiter Ind. Tech Files',
        },
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        translatedDescription: {
            en: '450 Proxima coins (5 per season)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.031,
            [ShipType.DESTROYER]: 0.026,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.006,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.MARE_SERENITATIS_A,
            ShipId.MARE_NUBIUM_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.CALLISTO_A,
            ShipId.IO_A,
            ShipId.ETERNAL_STORM,
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.S_LEVI9,
        ],
    },
    {
        id: 'antoniosTechFile',
        name: '技術ファイル - アントニオス',
        translatedName: {
            en: 'Antonios Tech Files',
        },
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        translatedDescription: {
            en: '450 Proxima coins (5 per season)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.031,
            [ShipType.DESTROYER]: 0.026,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.016,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.GUARDIAN_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.VITAS_A021,
            ShipId.VITAS_B010,
            ShipId.BALANCER_ANDERSON,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
        ],
    },
    {
        id: 'nomaShippingTechFile',
        name: '技術ファイル - ノマシッピング',
        translatedName: {
            en: 'NOMA Tech Files',
        },
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        translatedDescription: {
            en: '450 Proxima coins (5 per season)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.XENO_STINGER_A,
            ShipId.RUBY_A,
            ShipId.TUNDRA_A,
            ShipId.TAURUS_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.SPEAR_OF_URANUS,
            ShipId.SOLAR_WHALE,
            ShipId.STRIX_A100,
            ShipId.BULLFROG,
            ShipId.SANDRAKE,
            ShipId.RED_BEAST_7_13,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'fighterTechFile',
        name: '艦載機技術ファイル',
        translatedName: {
            en: 'Aircraft Tech Files', // TODO verify name
        },
        desciption: 'プロキシマコイン４５０（初回２２５、期間限定）',
        translatedDescription: {
            en: '450 Proxima coins (special package)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0,
            [ShipType.DESTROYER]: 0,
            [ShipType.CRUISER]: 0,
            [ShipType.BATTLE_CRUISER]: 0,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0.04,
            [ShipType.CORVETTE]: 0.06,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.STRIX_A100,
            ShipId.BULLFROG,
            ShipId.SANDRAKE,
            ShipId.S_LEVI9,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.RED_BEAST_7_13,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'dawnSelectedTechnicalFiles',
        name: 'エンドレスドーンが選択した技術ファイル',
        translatedName: {
            en: 'Dawn selected technical files',
        },
        desciption: '期間限定',
        translatedDescription: {
            en: 'Time limited',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.FG300_A,
            ShipId.AC721_A,
            ShipId.CAS066_A,
            ShipId.KCCPV2_0_A,
            ShipId.ST59,
            ShipId.CV3000,
            ShipId.SC002,
            ShipId.CV_M011_A,
            ShipId.CV_II003,
        ],
    },
    {
        id: 'celebrationTradeFairTechFiles',
        name: '祭典貿易技術ファイル',
        translatedName: {
            en: 'Celebration Trade Fair Tech Files',
        },
        desciption: 'イベント「ドーン共同採点」限定',
        translatedDescription: {
            en: 'Dawn Celebration event',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.XENO_STINGER_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.LIGHT_CONE_A,
            ShipId.CALLISTO_A,
            ShipId.JAEGER_A,
            ShipId.IO_A,
            ShipId.CAS066_A,
            ShipId.THUNDERBOLT_STAR,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.EDIACARAN,
            ShipId.SOLAR_WHALE,
            ShipId.CV3000,
            ShipId.AT021_A,
            ShipId.SPORE_A404,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.S_LEVI9,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.CV_II003,
        ],
    },
    {
        id: 'earthDayCommerceTechPack',
        name: 'アースデイ貿易ファイル',
        translatedName: {
            en: 'Earth Day Commerce Tech Pack',
        },
        desciption: '期間限定',
        translatedDescription: {
            en: 'Time limited',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.THUNDERBOLT_STAR,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.SOLAR_WHALE,
            ShipId.CV3000,
            ShipId.AT021_A,
            ShipId.SPORE_A404,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.STRIX_A100,
            ShipId.S_LEVI9,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
        ],
    },
    {
        id: 'beaconFestivalTechFiles',
        name: '星の灯祭技術ファイル',
        translatedName: {
            en: 'Beacon Festival Tech Files',
        },
        desciption: 'プロキシマコイン４５０（初回２２５、期間限定）',
        translatedDescription: {
            en: '450 Proxima coins (special package)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.THUNDERBOLT_STAR,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.SOLAR_WHALE,
            ShipId.CV3000,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.STRIX_A100,
            ShipId.S_LEVI9,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
        ],
    },
    {
        id: 'dawnCelebrationTechFile',
        name: 'ドーン共同祭典技術ファイル',
        translatedName: {
            en: 'Dawn Celebration Tech Files',
        },
        desciption: 'プロキシマコイン４５０（初回２２５、期間限定）',
        translatedDescription: {
            en: '450 Proxima coins (special package)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0.003,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.XENO_STINGER_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.GUARDIAN_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.CALLISTO_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.SOLAR_WHALE,
            ShipId.CV3000,
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.S_LEVI9,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
        ],
    },
    {
        id: 'jupiterFortuneUnitedShipTechFile',
        name: '「ジュピターフォーチュン」連合技術ファイル',
        translatedName: {
            en: '"Jupiter Fortune" United Ship Tech Files',
        },
        desciption: '期間限定',
        translatedDescription: {
            en: 'Time limited',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.0301,
            [ShipType.DESTROYER]: 0.0251,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.927,
        ships: [
            ShipId.MARE_IMBRIUM_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_NUBIUM_A,
            ShipId.GUARDIAN_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CALLISTO_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.S_LEVI9,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
        ],
    },
    {
        id: 'jupiterFortuneFighterTechFile',
        name: '「ジュピターフォーチュン」艦載機技術ファイル',
        translatedName: {
            en: '"Jupiter Fortune" Aircraft Tech Files',
        },
        desciption: 'プロキシマコイン４５０で買える「アースデイ」限定箱',
        translatedDescription: {
            en: '450 Proxima coins (special package)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0,
            [ShipType.DESTROYER]: 0,
            [ShipType.CRUISER]: 0,
            [ShipType.BATTLE_CRUISER]: 0,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0.04,
            [ShipType.CORVETTE]: 0.06,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.JANBIYA_AER410,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
        ],
    },
    {
        id: 'jupiterFortuneShipTechFile',
        name: '「ジュピターフォーチュン」艦船技術ファイル',
        translatedName: {
            en: '"Jupiter Fortune" Ship Tech Files',
        },
        desciption: 'プロキシマコイン４５０で買える「アースデイ」限定箱',
        translatedDescription: {
            en: '450 Proxima coins (special package)',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.04,
            [ShipType.DESTROYER]: 0.035,
            [ShipType.CRUISER]: 0.018,
            [ShipType.BATTLE_CRUISER]: 0.007,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0,
            [ShipType.CORVETTE]: 0,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.MARE_SERENITATIS_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_NUBIUM_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.GUARDIAN_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CALLISTO_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
        ],
    },
    {
        id: 'twinFairyTalesArchives',
        name: '双子童話アーカイブ',
        translatedName: {
            en: 'Twin Fairy Tales Archives',
        },
        desciption: '期間限定、双子物流センターで販売',
        translatedDescription: {
            en: '888 Proxima coins for two files',
        },
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.AUXILIARY]: 0,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.XENO_STINGER_A,
            ShipId.MARE_SERENITATIS_A,
            ShipId.RUBY_A,
            ShipId.RELIAT_A,
            ShipId.CARILION_A,
            ShipId.MARE_TRANQUILLITATIS_A,
            ShipId.GUARDIAN_A,
            ShipId.TUNDRA_A,
            ShipId.TAURUS_A,
            ShipId.CERES_A,
            ShipId.ERIS_I_A,
            ShipId.WINGED_HUSSAR_A,
            ShipId.CHIMERA_A,
            ShipId.LIGHT_CONE_A,
            ShipId.CALLISTO_A,
            ShipId.JAEGER_A,
            ShipId.PREDATOR_A,
            ShipId.IO_A,
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.SOLAR_WHALE,
            ShipId.CV3000,
            ShipId.STINGRAY,
            ShipId.SPORE_A404,
            ShipId.VITAS_B010,
            ShipId.VITAS_A021,
            ShipId.BALANCER_ANDERSON,
            ShipId.HAYREDDINGS_LOYAL,
            ShipId.S_LEVI9,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.RED_BEAST_7_13,
        ],
    },
];

const techFilesById: Record<string, ITechFile> = techFiles.reduce((result, techFile) => ({
    ...result,
    [techFile.id]: techFile,
}), {});

export function getTechFileById(id: string): ITechFile {
    if (!techFilesById[id]) {
        throw new Error(`Invalid tech file id "${id}"`);
    }
    return techFilesById[id];
}
