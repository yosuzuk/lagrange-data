import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const ac721: IShipDefinition[] = [
    {
        id: ShipId.AC721_A,
        name: 'AC721　Ａ一般型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        subModelIds: [ShipId.AC721_B, ShipId.AC721_D],
        relatedShipIds: [ShipId.AC721_TE_A, ShipId.AC721_TE_D_S_LEVI9],
    },
    {
        id: ShipId.AC721_B,
        name: 'AC721　Ｂミサイル型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 15,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.AC721_A,
        relatedShipIds: [ShipId.AC721_TE_A, ShipId.AC721_TE_D_S_LEVI9],
    },
    {
        id: ShipId.AC721_D,
        name: 'AC721　Ｄ艦載型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 15,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        carryCorvette: 2,
        baseModelId: ShipId.AC721_A,
        relatedShipIds: [ShipId.AC721_TE_A, ShipId.AC721_TE_D_S_LEVI9],
    },
    {
        id: ShipId.AC721_TE_A,
        name: 'AC721-TE　Ａイオン砲型',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 0,
        row: ShipRow.MIDDLE,
        operationLimit: 15,
        source: ShipSource.DOCK_EFFECT,
        manufacturer: Manufacturer.DAWN_ACCORD,
        relatedShipIds: [ShipId.AC721_A, ShipId.AC721_B, ShipId.AC721_D, ShipId.AC721_TE_D_S_LEVI9],
    },
    {
        id: ShipId.AC721_TE_D_S_LEVI9,
        name: 'AC721-TE（Ｓ-レヴィ9搭載）',
        type: ShipType.DESTROYER,
        cost: 8,
        weight: 0,
        row: ShipRow.BACK,
        operationLimit: 3,
        source: ShipSource.CITY_TRADE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        carryCorvette: 2,
        relatedShipIds: [ShipId.AC721_A, ShipId.AC721_B, ShipId.AC721_D, ShipId.AC721_TE_A],
    },
];
