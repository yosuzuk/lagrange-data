import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const kccpv2_0: IShipDefinition[] = [
    {
        id: ShipId.KCCPV2_0_A,
        name: 'KCCPV2.0  Ａ総合型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 12,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.KCCPV2_0_B, ShipId.KCCPV2_0_C, ShipId.KCCPV2_0_D],
    },
    {
        id: ShipId.KCCPV2_0_B,
        name: 'KCCPV2.0  Ｂパルス型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.KCCPV2_0_A,
    },
    {
        id: ShipId.KCCPV2_0_C,
        name: 'KCCPV2.0  Ｃ電磁加速砲型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.KCCPV2_0_A,
    },
    {
        id: ShipId.KCCPV2_0_D,
        name: 'KCCPV2.0  Ｄ艦載型',
        type: ShipType.CRUISER,
        cost: 16,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 12,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [],
        researchTacticTypes: [],
        baseModelId: ShipId.KCCPV2_0_A,
        carryFighter: 2,
        carryFighterType: ShipSubType.LARGE_FIGHTER,
    },
];
