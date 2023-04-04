import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const reliat: IShipDefinition[] = [
    {
        id: ShipId.RELIAT_A,
        name: 'レリアット級　Ａ対艦型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.RELIAT_B, ShipId.RELIAT_C],
        // defaultStats: {
        //     hp: 10530,
        // },
    },
    {
        id: ShipId.RELIAT_B,
        name: 'レリアット級　Ｂ魚雷型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.RELIAT_A,
        // defaultStats: {
        //     hp: 10530,
        // },
    },
    {
        id: ShipId.RELIAT_C,
        name: 'レリアット級　Ｃステルス型',
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.RELIAT_A,
        // defaultStats: {
        //     hp: 10530,
        // },
    },
];
