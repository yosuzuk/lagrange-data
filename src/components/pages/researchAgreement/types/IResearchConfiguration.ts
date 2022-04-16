import { ResearchManufacturer } from '../../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../../types/ShipDefinition';

export interface IResearchConfiguration {
    id: string;
    filterState: IResearchFilterState;
    shipChances: IShipResearchChance[];
    totalShipChance: number;
    totalModuleChance: number;
    wishedShipChance: number;
    unwishedShipChance: number;
    techPointChance: number;
}

export interface IResearchFilterState {
    shipId: string | null;
    manufacturerFilter: ResearchManufacturer | null;
    strategyTypeFilter: ResearchStrategyType | null;
    tacticTypeFilter: ResearchTacticType | null;
}

export interface IShipResearchChance {
    shipDefinition: IShipDefinition;
    chance: number;
    formula: string;
    possessed: boolean;
    wished: boolean;
    unwished: boolean;
}

export interface IShipFilterOptions {
    wantedShips: IShipDefinition[];
    possessedShips: IShipDefinition[];
    remainingShips: IShipDefinition[];
}
