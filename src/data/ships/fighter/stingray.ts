import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const stingray: IShipDefinition[] = [
    {
        id: ShipId.STINGRAY,
        name: 'スティングレイ',
        type: ShipType.FIGHTER,
        subType: ShipSubType.LARGE_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [
            ResearchStrategyType.OUTSTANDING_FIREPOWER,
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        // defaultStats: {
        //     hp: 5200,
        //     outboundTime: 8,
        //     inboundTime: 4,
        // },
    },
];
