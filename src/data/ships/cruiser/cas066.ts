import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const cas066: IShipDefinition[] = [
    {
        id: ShipId.CAS066_A,
        name: 'CAS066級　Ａ総合型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 12,
        source: ShipSource.STARTER_SHIP,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.CAS066_B, ShipId.CAS066_C],
    },
    {
        id: ShipId.CAS066_B,
        name: 'CAS066級　Ｂ砲撃型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.DIRECT_FIRE_WEAPONS],
        baseModelId: ShipId.CAS066_A,
    },
    {
        id: ShipId.CAS066_C,
        name: 'CAS066級　Ｃ艦載型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 12,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.DAWN_ACCORD,
        researchManufacturer: ResearchManufacturer.DAWN_ACCORD,
        researchStrategyTypes: [],
        researchTacticTypes: [],
        baseModelId: ShipId.CAS066_A,
        carryCorvette: 2,
    },
];
