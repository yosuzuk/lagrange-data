import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const xenoStinger: IShipDefinition[] = [
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
        // defaultStats: {
        //     hp: 10530,
        // },
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
        // defaultStats: {
        //     hp: 10530,
        // },
    },
];
