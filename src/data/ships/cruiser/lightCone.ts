import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const lightCone: IShipDefinition[] = [
    {
        id: ShipId.LIGHT_CONE_A,
        name: 'ライトコーン級　Ａ一般型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.LIGHT_CONE_B, ShipId.LIGHT_CONE_C],
        relatedShipIds: [ShipId.LIGHT_CONE_TE_A_S],
    },
    {
        id: ShipId.LIGHT_CONE_B,
        name: 'ライトコーン級　Ｂ対空型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.LIGHT_CONE_A,
        relatedShipIds: [ShipId.LIGHT_CONE_C, ShipId.LIGHT_CONE_TE_A_S],
    },
    {
        id: ShipId.LIGHT_CONE_C,
        name: 'ライトコーン級　Ｃ突撃型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.LIGHT_CONE_A,
        relatedShipIds: [ShipId.LIGHT_CONE_B, ShipId.LIGHT_CONE_TE_A_S],
    },
    {
        id: ShipId.LIGHT_CONE_TE_A_S,
        name: 'ライトコーン級-TE　Ａ一般型（回収）',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.LIGHT_CONE_A, ShipId.LIGHT_CONE_B, ShipId.LIGHT_CONE_C],
    },
];
