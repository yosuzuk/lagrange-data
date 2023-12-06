import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const nomaM470: IShipDefinition[] = [
    {
        id: ShipId.NOMA_M470_A,
        name: 'ノマM470級　Ａ攻城型',
        translatedName: {
            en: 'NOMA M470 - Siege Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [],
        subModelIds: [ShipId.NOMA_M470_B, ShipId.NOMA_M470_C],
        relatedShipIds: [
            ShipId.NOMA_M470_TE_A,
            ShipId.NOMA_M470_TE_S,
        ],
        defaultStats: {
            hp: 14000,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 296,
            dpmAntiAir: 72,
            dpmSiege: 1650,
        },
    },
    {
        id: ShipId.NOMA_M470_B,
        name: 'ノマM470級　Ｂ支援型',
        translatedName: {
            en: 'NOMA M470 - Support Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.NOMA_M470_A,
        relatedShipIds: [
            ShipId.NOMA_M470_C,
            ShipId.NOMA_M470_TE_A,
            ShipId.NOMA_M470_TE_S,
        ],
        defaultStats: {
            hp: 14000,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 200,
            dpmAntiAir: 72,
            dpmSiege: 138,
        },
    },
    {
        id: ShipId.NOMA_M470_C,
        name: 'ノマM470級　Ｃ対空型',
        translatedName: {
            en: 'NOMA M470 - Anti-Aircraft Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.NOMA_M470_A,
        relatedShipIds: [
            ShipId.NOMA_M470_B,
            ShipId.NOMA_M470_TE_A,
            ShipId.NOMA_M470_TE_S,
        ],
        defaultStats: {
            hp: 14000,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 200,
            dpmAntiAir: 2376,
            dpmSiege: 138,
        },
    },
    {
        id: ShipId.NOMA_M470_TE_A,
        name: 'ノマM470級-TE　Ａ対艦型',
        translatedName: {
            en: 'NOMA M470 (TE) - Anti-Ship Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [
            ShipId.NOMA_M470_A,
            ShipId.NOMA_M470_B,
            ShipId.NOMA_M470_C,
            ShipId.NOMA_M470_TE_S,
        ],
    },
    {
        id: ShipId.NOMA_M470_TE_S,
        name: 'ノマM470級-TE　Ａ対艦型（回収）',
        translatedName: {
            en: 'NOMA M470 (TE) - Anti-Ship Type (salvaged)',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [
            ShipId.NOMA_M470_A,
            ShipId.NOMA_M470_B,
            ShipId.NOMA_M470_C,
            ShipId.NOMA_M470_TE_A,
        ],
    },
];
