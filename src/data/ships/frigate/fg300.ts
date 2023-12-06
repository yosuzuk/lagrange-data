import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const fg300: IShipDefinition[] = [
    {
        id: ShipId.FG300_A,
        name: 'FG300型　Ａ多機能型',
        translatedName: {
            en: 'FG300 - Multi-Role Type',
        },
        type: ShipType.FRIGATE,
        cost: 3,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.FG300_B, ShipId.FG300_C],
        defaultStats: {
            hp: 10530,
            armor: 5,
            shield: 0,
            speed: 1000,
            warpSpeed: 5000,
            dpmShip: 1157,
            dpmAntiAir: 607,
            dpmSiege: 270,
        },
    },
    {
        id: ShipId.FG300_B,
        name: 'FG300型　Ｂ装甲型',
        translatedName: {
            en: 'FG300 - Armored Type',
        },
        type: ShipType.FRIGATE,
        cost: 3,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.FG300_A,
        defaultStats: {
            hp: 12540,
            armor: 15,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 771,
            dpmAntiAir: 678,
            dpmSiege: 180,
        },
    },
    {
        id: ShipId.FG300_C,
        name: 'FG300型　Ｃ偵察型',
        translatedName: {
            en: 'FG300 - Recon Type',
        },
        type: ShipType.FRIGATE,
        cost: 3,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.FG300_A,
        defaultStats: {
            hp: 12540,
            armor: 5,
            shield: 0,
            speed: 1040,
            warpSpeed: 5200,
            dpmShip: 385,
            dpmAntiAir: 505,
            dpmSiege: 90,
        },
    },
];
