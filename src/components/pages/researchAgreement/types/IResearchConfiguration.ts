import { ResearchManufacturer } from '../../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../../types/ResearchTacticType';
import { IShipDefinition, ISystemModule } from '../../../../types/ShipDefinition';
import { ShipType } from '../../../../types/ShipType';

export interface IResearchConfiguration {
    id: string;
    filterState: IResearchFilterState;
    shipChances: IShipResearchChance[];
    shipTypeChances: IShipTypeResearchChance[];
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
    modules: IModuleResearchChance[];
}

export interface IShipTypeResearchChance {
    shipType: ShipType;
    chance: number;
}

export interface IModuleResearchChance {
    module: ISystemModule;
    chance: number;
    formula: string;
    wished: boolean;
}

export interface IShipFilterOptions {
    wantedShips: IShipDefinition[];
    shipsWithWantedModule: IShipFilterEntryForModule[];
    possessedShips: IShipDefinition[];
    remainingShips: IShipDefinition[];
}

export interface IShipFilterEntryForModule {
    shipDefinition: IShipDefinition;
    modules: ISystemModule[];
}
