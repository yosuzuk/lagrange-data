import { Manufacturer } from './Manufacturer';
import { ResearchManufacturer } from './ResearchManufacturer';
import { ResearchStrategyType } from './ResearchStrategyType';
import { ResearchTacticType } from './ResearchTacticType';
import { ShipRow } from './ShipRow';
import { ShipSource } from './ShipSource';
import { ShipTag } from './ShipTag';
import { ShipSubType, ShipType } from './ShipType';

export interface IShipDefinition {
    id: string;
    name: string;
    type: ShipType;
    subType?: ShipSubType;
    cost: number;
    weight: number;
    row: ShipRow;
    operationLimit: number;
    source: ShipSource;
    manufacturer: Manufacturer;
    researchManufacturer?: ResearchManufacturer;
    researchStrategyTypes?: ResearchStrategyType[];
    researchTacticTypes?: ResearchTacticType[];
    subModelIds?: string[];
    relatedShipIds?: string[];
    baseModelId?: string;
    carryFighter?: number;
    carryCorvette?: number;
    carryFighterType?: ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER;
    staticModules?: boolean;
    modules?: ISystemModule[];
    tags?: ShipTag[];
}

export interface ISystemModule {
    id: string;
    name: string;
    category: 'M' | 'A' | 'B' | 'C' | 'D' | 'E';
    categoryNumber: number;
    carryFighter?: number;
    carryCorvette?: number;
    carryFighterType?: ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER;
    defaultModule?: boolean;
}
