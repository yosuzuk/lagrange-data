import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const ruby: IShipDefinition[] = [
    {
        id: ShipId.RUBY_A,
        name: 'ルビー級　Ａ電磁加速砲型',
        translatedName: {
            en: 'Ruby - Railgun Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.RUBY_B, ShipId.RUBY_C],
        defaultStats: {
            hp: 16520,
            armor: 5,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 3172,
            dpmAntiAir: 75,
            dpmSiege: 658,
        },
    },
    {
        id: ShipId.RUBY_B,
        name: 'ルビー級　Ｂイオン砲型',
        translatedName: {
            en: 'Ruby - Ion Cannon Type',
        },
        type: ShipType.FRIGATE,
        cost: 8,
        weight: 5,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.RUBY_A,
        defaultStats: {
            hp: 14970,
            armor: 5,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 4743,
            dpmAntiAir: 571,
            dpmSiege: 711,
        },
    },
    {
        id: ShipId.RUBY_C,
        name: 'ルビー級　Ｃ防護型',
        translatedName: {
            en: 'Ruby - Defensive Type',
        },
        type: ShipType.FRIGATE,
        cost: 5,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.RUBY_A,
        defaultStats: {
            hp: 17550,
            armor: 40,
            shield: 0,
            speed: 900,
            warpSpeed: 4500,
            dpmShip: 1632,
            dpmAntiAir: 0,
            dpmSiege: 656,
        },
    },
];
