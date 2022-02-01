import { BoxDefinition } from '../types/BoxDefinition';
import { ShipTag } from '../types/ShipTag';
import { ShipType } from '../types/ShipType';
import { getShipDefinitionIdsByTag } from '../utils/shipDefinitionUtils';

export const boxDefinitions: BoxDefinition[] = [
    {
        id: 'proximaV2',
        name: '暗号化技術ファイル2.0',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        ships: [
            ...getShipDefinitionIdsByTag(ShipTag.PHASE_TWO_BLUEPRINT),
        ],
        extends: 'proximaV1',
    },
    {
        id: 'proximaV1',
        name: '暗号化技術ファイル',
        chanceByShipType: {
            // TODO check
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        ships: [
            // TODO
        ],
    },
    {
        id: 'commonTechFile',
        name: '一般技術ファイル',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.008,
            [ShipType.DESTROYER]: 0.008,
            [ShipType.CRUISER]: 0.002,
            [ShipType.BATTLE_CRUISER]: 0.001,
            [ShipType.CARRIER]: 0.001,
            [ShipType.FIGHTER]: 0.005,
            [ShipType.CORVETTE]: 0.005,
        },
        ships: [
            // TODO
        ],
    },
    {
        id: 'blueprintFile',
        name: '艦舶・艦載機設計図ファイル',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.3,
            [ShipType.DESTROYER]: 0.25,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
            [ShipType.CARRIER]: 0.03,
            [ShipType.FIGHTER]: 0.1,
            [ShipType.CORVETTE]: 0.15,
        },
        ships: [
            // TODO
        ],
    },
    {
        id: 'enterpriseBlueprintFile',
        name: '企業版設計図ファイル',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.3,
            [ShipType.DESTROYER]: 0.25,
            [ShipType.CRUISER]: 0.12,
            [ShipType.BATTLE_CRUISER]: 0.05,
            [ShipType.CARRIER]: 0.03,
            [ShipType.FIGHTER]: 0.1,
            [ShipType.CORVETTE]: 0.15,
        },
        ships: [
            // TODO
        ],
    },
    {
        id: 'dawnTechFile',
        name: '技術ファイル-ドーン基準',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        ships: [
            // TODO
        ],
    },
    {
        id: 'jupiterIndustryTechFile',
        name: '技術ファイル-ジュピターインダストリー',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        ships: [
            // TODO
        ],
    },
    {
        id: 'antoniosTechFile',
        name: '技術ファイル-アントニオス',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        ships: [
            // TODO
        ],
    },
    {
        id: 'nomaShippingTechFile',
        name: '技術ファイル-ノマシッピング',
        chanceByShipType: {
            [ShipType.FRIGATE]: 0.03,
            [ShipType.DESTROYER]: 0.025,
            [ShipType.CRUISER]: 0.012,
            [ShipType.BATTLE_CRUISER]: 0.005,
            [ShipType.CARRIER]: 0.003,
            [ShipType.FIGHTER]: 0.01,
            [ShipType.CORVETTE]: 0.015,
        },
        ships: [
            // TODO
        ],
    },
];
