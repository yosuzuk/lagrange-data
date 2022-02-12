import { ITechFile } from '../types/ITechFile';
import { ShipType } from '../types/ShipType';
import { ShipId } from './shipIds';

export const techFiles: ITechFile[] = [
    {
        id: 'blueprintFile',
        name: '艦舶・艦載機設計図ファイル',
        desciption: '研究ポイント１５で買える常設確定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.3,
            [ShipType.DESTROYER]: 0.25,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
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
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.SOLAR_WHALE,
            ShipId.MARSHALL_CRUX,
            ShipId.CV3000,
            ShipId.MISTRAL,
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
            ShipId.SC002,
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
        id: 'blackMarketTechFileV2',
        name: '暗号化技術ファイル2.0',
        desciption: 'プロキシマコイン３００で買える常設箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        chanceForTechPoint: 0.9,
        ships: [
            ShipId.NOMA_M470_A,
            ShipId.XENO_STINGER_A,
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
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.SOLAR_WHALE,
            ShipId.MARSHALL_CRUX,
            ShipId.CV3000,
            ShipId.MISTRAL,
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
            ShipId.SC002,
            ShipId.CV_T800,
            ShipId.CV_M011_A,
            ShipId.VOID_ELFIN,
            ShipId.NEBULA_CHASER_A,
            ShipId.CELLULAR_DEFENDER,
            ShipId.RED_BEAST_7_13,
            ShipId.CV_II003,
            ShipId.SILENT_ASSASSIN,
        ],
        extends: 'proximaV1',
    },
    {
        id: 'genericTechFile',
        name: '一般技術ファイル',
        desciption: 'ＵＥコイン１００００で買える常設箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.008,
            [ShipType.DESTROYER]: 0.008,
            [ShipType.CRUISER]: 0.002,
            [ShipType.BATTLE_CRUISER]: 0.001,
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
            ShipId.CV3000,
            ShipId.SC002,
            ShipId.CV_M011_A,
            ShipId.CV_II003,
        ],
    },
    {
        id: 'unitedTechFile',
        name: 'ユナイテッドテックファイル',
        desciption: '３回限りの個数限定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.5,
            [ShipType.DESTROYER]: 0.5,
            [ShipType.CRUISER]: 0,
            [ShipType.BATTLE_CRUISER]: 0,
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
        id: 'enterpriseSelectionFileV2',
        name: '企業選別技術ファイル',
        desciption: '星間キャラバン来訪時にドーンポイント４５０で買える限定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.3,
            [ShipType.DESTROYER]: 0.25,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
            [ShipType.CARRIER]: 0.03,
            [ShipType.FIGHTER]: 0.1,
            [ShipType.CORVETTE]: 0.15,
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
            ShipId.SPEAR_OF_URANUS,
            ShipId.CONSTANTINE_THE_GREAT,
            ShipId.ETERNAL_STORM,
            ShipId.ST59,
            ShipId.SOLAR_WHALE,
            ShipId.MARSHALL_CRUX,
            ShipId.CV3000,
            ShipId.MISTRAL,
            ShipId.B192_NEWLAND,
            ShipId.VITAS_A021,
            ShipId.STRIX_A100,
            ShipId.SANDRAKE,
            ShipId.CV_T800,
            ShipId.VOID_ELFIN,
            ShipId.RED_BEAST_7_13,
            ShipId.SILENT_ASSASSIN,
        ],
    },
    {
        id: 'enterpriseBlueprintFile',
        name: '企業版設計図ファイル',
        desciption: '開拓状況の評価後にドーンポイント２００で買える限定確定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.3,
            [ShipType.DESTROYER]: 0.25,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
            [ShipType.CARRIER]: 0.03,
            [ShipType.FIGHTER]: 0.1,
            [ShipType.CORVETTE]: 0.15,
        },
        chanceForTechPoint: 0.9, // TODO
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
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
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
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.037,
            [ShipType.DESTROYER]: 0.03,
            [ShipType.CRUISER]: 0.015,
            [ShipType.BATTLE_CRUISER]: 0.006,
            [ShipType.CARRIER]: 0,
            [ShipType.FIGHTER]: 0.012,
            [ShipType.CORVETTE]: 0,
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
        ],
    },
    {
        id: 'antoniosTechFile',
        name: '技術ファイル - アントニオス',
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.031,
            [ShipType.DESTROYER]: 0.026,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
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
        desciption: '開拓状況の評価後にプロキシマコイン４５０で買える限定箱',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
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
