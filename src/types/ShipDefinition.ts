import { IEnhancement } from '../enhancements/types/IEnhancement';
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
    translatedName: Record<string, string>;
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
    modules?: ISystemModule[];
    defaultStats?: IDefaultShipStats;
    tags?: ShipTag[];
}

export interface IDefaultShipStats {
    // numbers including stats from default modules like M1
    hp: number;
    armor: number;
    shield: number;
    speed: number;
    warpSpeed: number;
    outboundTime?: number;
    inboundTime?: number;
    dpmShip: number;
    dpmAntiAir: number;
    dpmSiege: number;
}

export interface ISystemModule {
    id: string;
    name: string;
    translatedName?: Record<string, string>;
    description?: string;
    parts?: IModulePart[];
    category: 'M' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'STATIC';
    categoryNumber: number;
    carryFighter?: number;
    carryCorvette?: number;
    carryFighterType?: ShipSubType.SMALL_FIGHTER | ShipSubType.MEDIUM_FIGHTER | ShipSubType.LARGE_FIGHTER;
    defaultModule?: boolean;
    mainSystem?: boolean;
    effects?: IEnhancement[];
    skillComplete?: boolean;
    skillSlots?: number;
    skills?: IEnhancement[];
    flagshipEffects?: IEnhancement[];
    dpmShip?: number;
    dpmAntiAir?: number;
    dpmSiege?: number;
}

interface IModulePart {
    text?: string | string[];
}
