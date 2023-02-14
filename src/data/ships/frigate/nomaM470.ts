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
    },
    {
        id: ShipId.NOMA_M470_B,
        name: 'ノマM470級　Ｂ支援型',
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
    },
    {
        id: ShipId.NOMA_M470_C,
        name: 'ノマM470級　Ｃ対空型',
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
    },
    {
        id: ShipId.NOMA_M470_TE_A,
        name: 'ノマM470級-TE　Ａ対艦型',
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
