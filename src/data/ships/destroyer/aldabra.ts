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

export const aldabra: IShipDefinition[] = [
    {
        id: ShipId.ALDABRA_A,
        name: 'アルダブラ級　Ａ一般型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.ALDABRA_B],
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
        defaultStats: {
            hp: 37090,
            armor: 30,
            shield: 4,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 5820,
            dpmAntiAir: 921,
            dpmSiege: 775,
        },
    },
    {
        id: ShipId.ALDABRA_B,
        name: 'アルダブラ級　Ｂ装甲型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.ALDABRA_A,
        tags: [
            ShipTag.PHASE_TWO_BLUEPRINT,
        ],
        defaultStats: {
            hp: 40799,
            armor: 45,
            shield: 4,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 5280,
            dpmAntiAir: 540,
            dpmSiege: 1048,
        },
    },
];
