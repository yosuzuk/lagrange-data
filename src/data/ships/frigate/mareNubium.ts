import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const mareNubium: IShipDefinition[] = [
    {
        id: ShipId.MARE_NUBIUM_A,
        name: 'マーレヌビウム級　Ａ突撃型',
        translatedName: {
            en: 'Mare Nubium - Assault Type',
        },
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [],
        subModelIds: [ShipId.MARE_NUBIUM_B],
        defaultStats: {
            hp: 9030,
            armor: 5,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 953,
            dpmAntiAir: 0,
            dpmSiege: 1532,
        },
    },
    {
        id: ShipId.MARE_NUBIUM_B,
        name: 'マーレヌビウム級　Ｂ対空型',
        translatedName: {
            en: 'Mare Nubium - Anti-Aircraft Type',
        },
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.JUPITER_INDUSTRIES,
        researchManufacturer: ResearchManufacturer.JUPITER_INDUSTRIES,
        researchStrategyTypes: [],
        researchTacticTypes: [],
        baseModelId: ShipId.MARE_NUBIUM_A,
        defaultStats: {
            hp: 9030,
            armor: 5,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 685,
            dpmAntiAir: 3008,
            dpmSiege: 0,
        },
    },
];
