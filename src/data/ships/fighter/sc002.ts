import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const sc002: IShipDefinition[] = [
    {
        id: ShipId.SC002,
        name: 'SC002型',
        translatedName: {
            en: 'SC002 - Generic Type',
        },
        type: ShipType.FIGHTER,
        subType: ShipSubType.SMALL_FIGHTER,
        cost: 0,
        weight: 10,
        row: ShipRow.NONE,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [
            ResearchStrategyType.SUSTAINED_COMBAT,
            ResearchStrategyType.STRATEGY_AND_SUPPORT,
            ResearchStrategyType.FIGHTER_AND_CORVETTE,
        ],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        defaultStats: {
            hp: 2850,
            armor: 0,
            shield: 0,
            speed: 3000,
            warpSpeed: 15000,
            outboundTime: 6,
            inboundTime: 4,
            dpmShip: 700,
            dpmAntiAir: 700,
            dpmSiege: 0,
        },
    },
];
