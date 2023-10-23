import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const erisI: IShipDefinition[] = [
    {
        id: ShipId.ERIS_I_A,
        name: 'エリスI級　Ａ大砲型',
        type: ShipType.DESTROYER,
        cost: 7,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.ERIS_I_B, ShipId.ERIS_I_C],
        // defaultStats: {
        //     hp: 30540,
        // },
    },
    {
        id: ShipId.ERIS_I_B,
        name: 'エリスI級　Ｂ重砲型',
        type: ShipType.DESTROYER,
        cost: 7,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.ERIS_I_A,
        // defaultStats: {
        //     hp: 30540,
        // },
    },
    {
        id: ShipId.ERIS_I_C,
        name: 'エリスI級　Ｃ装甲型',
        type: ShipType.DESTROYER,
        cost: 7,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.ERIS_I_A,
        // defaultStats: {
        //     hp: 35140,
        // },
    },
];
