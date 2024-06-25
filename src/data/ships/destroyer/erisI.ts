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
        translatedName: {
            en: 'Eris I - Cannon Type',
        },
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
        defaultStats: {
            hp: 30540,
            armor: 20,
            shield: 2,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 4500,
            dpmAntiAir: 270,
            dpmSiege: 350,
        },
    },
    {
        id: ShipId.ERIS_I_B,
        name: 'エリスI級　Ｂ重砲型',
        translatedName: {
            en: 'Eris I - Heavy Cannon Type',
        },
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.ERIS_I_A,
        defaultStats: {
            hp: 30540,
            armor: 20,
            shield: 2,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 4963,
            dpmAntiAir: 252,
            dpmSiege: 1239,
        },
    },
    {
        id: ShipId.ERIS_I_C,
        name: 'エリスI級　Ｃ装甲型',
        translatedName: {
            en: 'Eris I - Armored Type',
        },
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
        defaultStats: {
            hp: 35140,
            armor: 30,
            shield: 5,
            speed: 850,
            warpSpeed: 4250,
            dpmShip: 4500,
            dpmAntiAir: 270,
            dpmSiege: 350,
        },
    },
];
