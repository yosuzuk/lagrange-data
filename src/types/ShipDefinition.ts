import { ShipRow } from './ShipRow';
import { ShipSource } from './ShipSource';
import { ShipTag } from './ShipTag';
import { ShipSubType, ShipType } from './ShipType';

export interface ShipDefinition {
    id: string;
    name: string;
    type: ShipType;
    subType?: ShipSubType;
    cost: number;
    weight: number;
    row: ShipRow;
    operationLimit: number;
    source: ShipSource;
    subModelIds?: string[];
    baseModelId?: string;
    carryFighter?: number;
    carryCorvette?: number;
    carryFighterType?: ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER;
    modules?: SystemModule[];
    tags?: ShipTag[];
}

export interface SystemModule {
    id: string;
    name: string;
    category: 'M' | 'A' | 'B' | 'C' | 'D';
    categoryNumber: number;
    carryFighter?: number;
    carryCorvette?: number;
    carryFighterType?: ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER;
}
