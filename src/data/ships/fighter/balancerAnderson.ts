import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const balancerAnderson: IShipDefinition[] = [
    {
        id: ShipId.BALANCER_ANDERSON,
        name: 'バランサーアンダーソン',
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        // defaultStats: {
        //     hp: 3450,
        //     outboundTime: 6,
        //     inboundTime: 4,
        // },
    },
];
