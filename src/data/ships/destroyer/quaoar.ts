import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipTag } from '../../../types/ShipTag';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const quaoar: IShipDefinition[] = [
    {
        id: ShipId.QUAOAR_A,
        name: 'クワオアー級　Ａ電磁加速砲型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.QUAOAR_B],
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
        defaultStats: {
            hp: 30540,
            armor: 20,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 4800,
            dpmAntiAir: 216,
            dpmSiege: 506,
        },
    },
    {
        id: ShipId.QUAOAR_B,
        name: 'クワオアー級　Ｂ魚雷型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.QUAOAR_A,
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
        defaultStats: {
            hp: 30540,
            armor: 20,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 5309,
            dpmAntiAir: 1362,
            dpmSiege: 381,
        },
    },
];
