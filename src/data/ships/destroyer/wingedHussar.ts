import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const wingedHussar: IShipDefinition[] = [
    {
        id: ShipId.WINGED_HUSSAR_A,
        name: 'ウイングドユサール　Ａ対艦型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.MIDDLE,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        subModelIds: [ShipId.WINGED_HUSSAR_B, ShipId.WINGED_HUSSAR_C],
    },
    {
        id: ShipId.WINGED_HUSSAR_B,
        name: 'ウイングドユサール　Ｂ総合型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.OUTSTANDING_FIREPOWER],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.WINGED_HUSSAR_A,
    },
    {
        id: ShipId.WINGED_HUSSAR_C,
        name: 'ウイングドユサール　Ｃ対空型',
        type: ShipType.DESTROYER,
        cost: 6,
        weight: 10,
        row: ShipRow.FRONT,
        operationLimit: 10,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [ResearchTacticType.PROJECTILE_WEAPONS],
        baseModelId: ShipId.WINGED_HUSSAR_A,
    },
];
