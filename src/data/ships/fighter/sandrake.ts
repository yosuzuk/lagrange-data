import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const sandrake: IShipDefinition[] = [
    {
        id: ShipId.SANDRAKE,
        name: 'サンドレイク',
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        defaultStats: {
            hp: 4200,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 1230,
            dpmAntiAir: 4475,
            dpmSiege: 0,
        },
    },
];
