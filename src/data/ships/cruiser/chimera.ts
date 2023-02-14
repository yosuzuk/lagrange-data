import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const chimera: IShipDefinition[] = [
    {
        id: ShipId.CHIMERA_A,
        name: 'キメラ級　Ａ弾道型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.CHIMERA_B, ShipId.CHIMERA_C],
        relatedShipIds: [ShipId.CHIMERA_TE_C_S],
    },
    {
        id: ShipId.CHIMERA_B,
        name: 'キメラ級　Ｂ重砲型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CHIMERA_A,
        relatedShipIds: [ShipId.CHIMERA_C, ShipId.CHIMERA_TE_C_S],
    },
    {
        id: ShipId.CHIMERA_C,
        name: 'キメラ級　Ｃ防衛型',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CHIMERA_A,
        relatedShipIds: [ShipId.CHIMERA_B, ShipId.CHIMERA_TE_C_S],
    },
    {
        id: ShipId.CHIMERA_TE_C_S,
        name: 'キメラ級-TE　Ａ防衛型（回収）',
        type: ShipType.CRUISER,
        cost: 20,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 8,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.CHIMERA_A, ShipId.CHIMERA_B, ShipId.CHIMERA_C],
    },
];
