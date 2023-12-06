import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const carilion: IShipDefinition[] = [
    {
        id: ShipId.CARILION_A,
        name: 'カリリオン級　Ａ偵察型',
        translatedName: {
            en: 'Carilion - Recon Type',
        },
        type: ShipType.FRIGATE,
        cost: 4,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.CARILION_B, ShipId.CARILION_C],
        defaultStats: {
            hp: 8340,
            armor: 5,
            shield: 0,
            speed: 1040,
            warpSpeed: 5200,
            dpmShip: 1125,
            dpmAntiAir: 361,
            dpmSiege: 315,
        },
    },
    {
        id: ShipId.CARILION_B,
        name: 'カリリオン級　Ｂ重砲型',
        translatedName: {
            en: 'Carilion - Heavy Cannon Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CARILION_A,
        defaultStats: {
            hp: 9840,
            armor: 5,
            shield: 0,
            speed: 950,
            warpSpeed: 4750,
            dpmShip: 2485,
            dpmAntiAir: 96,
            dpmSiege: 540,
        },
    },
    {
        id: ShipId.CARILION_C,
        name: 'カリリオン級　Ｃ特殊型',
        translatedName: {
            en: 'Carilion - Special Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CARILION_A,
        defaultStats: {
            hp: 9770,
            armor: 5,
            shield: 0,
            speed: 1040,
            warpSpeed: 5200,
            dpmShip: 1125,
            dpmAntiAir: 285,
            dpmSiege: 315,
        },
    },
];
