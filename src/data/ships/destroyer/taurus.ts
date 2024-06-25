import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const taurus: IShipDefinition[] = [
    {
        id: ShipId.TAURUS_A,
        name: 'トーラス級　Ａ攻撃型',
        translatedName: {
            en: 'Taurus - Offensive Type',
        },
        type: ShipType.DESTROYER,
        cost: 11,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.TAURUS_B, ShipId.TAURUS_C],
        relatedShipIds: [ShipId.TAURUS_TE_A_S, ShipId.TAURUS_TE_B_S],
        defaultStats: {
            hp: 36040,
            armor: 20,
            shield: 2,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 6210,
            dpmAntiAir: 1615,
            dpmSiege: 338,
        },
    },
    {
        id: ShipId.TAURUS_B,
        name: 'トーラス級　Ｂ突撃型',
        translatedName: {
            en: 'Taurus - Assault Type',
        },
        type: ShipType.DESTROYER,
        cost: 11,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.TAURUS_A,
        relatedShipIds: [ShipId.TAURUS_C, ShipId.TAURUS_TE_A_S, ShipId.TAURUS_TE_B_S],
        defaultStats: {
            hp: 48036,
            armor: 30,
            shield: 4,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 6555,
            dpmAntiAir: 501,
            dpmSiege: 1552,
        },
    },
    {
        id: ShipId.TAURUS_C,
        name: 'トーラス級　Ｃ防護型',
        translatedName: {
            en: 'Taurus - Defensive Type',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.TAURUS_A,
        relatedShipIds: [ShipId.TAURUS_B, ShipId.TAURUS_TE_A_S, ShipId.TAURUS_TE_B_S],
        defaultStats: {
            hp: 48036,
            armor: 30,
            shield: 4,
            speed: 650,
            warpSpeed: 3250,
            dpmShip: 4830,
            dpmAntiAir: 2059,
            dpmSiege: 338,
        },
    },
    {
        id: ShipId.TAURUS_TE_A_S,
        name: 'トーラス級-TE　Ａ対艦型（回収）',
        translatedName: {
            en: 'Taurus (TE) - Anti-Ship Type (salvaged)',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.TAURUS_A, ShipId.TAURUS_B, ShipId.TAURUS_C, ShipId.TAURUS_TE_B_S],
    },
    {
        id: ShipId.TAURUS_TE_B_S,
        name: 'トーラス級-TE　Ｂ突撃型（回収）',
        translatedName: {
            en: 'Taurus (TE) - Assault Type (salvaged)',
        },
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 5,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.TAURUS_A, ShipId.TAURUS_B, ShipId.TAURUS_C, ShipId.TAURUS_TE_A_S],
    },
];
