import { IEnhancement } from '../../../../enhancements/types/IEnhancement';
import { IShipDefinition, ISystemModule } from '../../../../types/ShipDefinition';

type ShipId = string;
type ModuleId = string;
type EnhancementId = string;

export interface ITechPointConfig {
    ships: Record<ShipId, ITechPointShipConfig>;
}

export interface ITechPointShipConfig {
    shipDefinition: IShipDefinition;
    modules: Record<ModuleId, ITechPointModuleConfig>;
    selectedModuleIds: string[];
    techPoints: number | null;
    maxTechPoints: number | null;
    unlockCost: number;
    incomplete: boolean;
    favorite: boolean;
}

export interface ITechPointModuleConfig {
    module: ISystemModule;
    enhancements: Record<EnhancementId, ITechPointEnhancementConfig>;
    selectedEnhancementIds: string[];
    techPoints: number | null;
    maxTechPoints: number | null;
    unlockCost: number;
    incomplete: boolean;
}

export interface ITechPointEnhancementConfig {
    id: string;
    enhancement: IEnhancement;
    techPoints: number | null;
}

type ModuleInUse = 0 | 1 | undefined;
type MARKED_AS_FAVORITE = 0 | 1 | undefined;
export type IStoredTechPointModuleConfig = [ModuleId, EnhancementId[], ModuleInUse, MARKED_AS_FAVORITE];
export type IStoredTechPointShipConfig = [ShipId, IStoredTechPointModuleConfig[]];
export interface IStoredTechPointConfig {
    version: number;
    ships: IStoredTechPointShipConfig[];
};
