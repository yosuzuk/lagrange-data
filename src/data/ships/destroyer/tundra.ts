import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const tundra: IShipDefinition[] = [
    {
        id: ShipId.TUNDRA_A,
        name: 'ツンドラ級　Ａ支援型',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        subModelIds: [ShipId.TUNDRA_B],
        relatedShipIds: [ShipId.TUNDRA_TE_S],
        defaultStats: {
            hp: 41190,
            armor: 20,
            shield: 2,
            speed: 700,
            warpSpeed: 3500,
            dpmShip: 1350,
            dpmAntiAir: 5127,
            dpmSiege: 157,
        },
    },
    {
        id: ShipId.TUNDRA_B,
        name: 'ツンドラ級　Ｂ艦載型',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        researchManufacturer: ResearchManufacturer.NOMA_SHIPPING_GROUP,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.TUNDRA_A,
        relatedShipIds: [ShipId.TUNDRA_TE_S],
        carryFighter: 2,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
        defaultStats: {
            hp: 40030,
            armor: 20,
            shield: 2,
            speed: 700,
            warpSpeed: 3500,
            dpmShip: 2022,
            dpmAntiAir: 519,
            dpmSiege: 322,
        },
    },
    {
        id: ShipId.TUNDRA_TE_S,
        name: 'ツンドラ級-TE　Ａ対空型（回収）',
        type: ShipType.DESTROYER,
        cost: 9,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.SALVAGE,
        manufacturer: Manufacturer.NOMA_SHIPPING_GROUP,
        relatedShipIds: [ShipId.TUNDRA_A, ShipId.TUNDRA_B],
    },
];
