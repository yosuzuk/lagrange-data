import { Manufacturer } from '../../../types/Manufacturer';
import { ResearchManufacturer } from '../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../types/ResearchStrategyType';
import { IShipDefinition } from '../../../types/ShipDefinition';
import { ShipRow } from '../../../types/ShipRow';
import { ShipSource } from '../../../types/ShipSource';
import { ShipType, ShipSubType } from '../../../types/ShipType';
import { ShipId } from '../../shipIds';

export const predator: IShipDefinition[] = [
    {
        id: ShipId.PREDATOR_A,
        name: 'プレデター級　Ａ一般型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        subModelIds: [ShipId.PREDATOR_B, ShipId.PREDATOR_C],
        carryFighter: 4,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    },
    {
        id: ShipId.PREDATOR_B,
        name: 'プレデター級　Ｂ戦術型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.PREDATOR_A,
        carryFighter: 4,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    },
    {
        id: ShipId.PREDATOR_C,
        name: 'プレデター級　Ｃ対空型',
        type: ShipType.CRUISER,
        cost: 18,
        weight: 10,
        row: ShipRow.BACK,
        operationLimit: 8,
        source: ShipSource.TECH_FILE,
        manufacturer: Manufacturer.ANTONIOS_CONSORTIUM,
        researchManufacturer: ResearchManufacturer.ANTONIOS_CONSORTIUM,
        researchStrategyTypes: [ResearchStrategyType.STRATEGY_AND_SUPPORT],
        researchTacticTypes: [],
        baseModelId: ShipId.PREDATOR_A,
        carryFighter: 4,
        carryFighterType: ShipSubType.MEDIUM_FIGHTER,
    },
];
