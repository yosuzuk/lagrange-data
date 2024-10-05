import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const inostrancevia: IShipDefinition[] = [
    {
        id: ShipId.INOSTRANCEVIA_A,
        name: 'ウルフリザード級　A防御型',
        translatedName: {
            en: 'Inostrancevia - Defense Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 5, // TODO verify
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [],
        researchTacticTypes: [],
        subModelIds: [ShipId.INOSTRANCEVIA_B, ShipId.INOSTRANCEVIA_C],
        defaultStats: {
            hp: 13400,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 1500,
            dpmAntiAir: 1944,
            dpmSiege: 146,
        },
    },
    {
        id: ShipId.INOSTRANCEVIA_B,
        name: 'ウルフリザード級　B攻撃型',
        translatedName: {
            en: 'Inostrancevia - Offensive Type',
        },
        type: ShipType.FRIGATE,
        cost: 6,
        weight: 5, // TODO verify
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [],
        baseModelId: ShipId.INOSTRANCEVIA_A,
        defaultStats: {
            hp: 14480,
            armor: 15,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 3380,
            dpmAntiAir: 240,
            dpmSiege: 24,
        },
    },
    {
        id: ShipId.INOSTRANCEVIA_C,
        name: 'ウルフリザード級　C特殊型',
        translatedName: {
            en: 'Inostrancevia - Special Type',
        },
        type: ShipType.FRIGATE,
        cost: 8,
        weight: 5, // TODO verify
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [],
        baseModelId: ShipId.INOSTRANCEVIA_A,
        defaultStats: {
            hp: 14480,
            armor: 5,
            shield: 0,
            speed: 800,
            warpSpeed: 4000,
            dpmShip: 4520,
            dpmAntiAir: 192,
            dpmSiege: 24,
        },
    },
];
