import { PossessionState } from './PossessionState';
import { WishState } from './WishState';

export interface IUserSettings {
    formatVersion: number;
    ships: ShipSettingState;
    modules: ModuleSettingState; 
}

export interface IShipUserSettings {
    possession: PossessionState;
    wish: WishState;
}

export interface IModuleUserSettings {
    possession: PossessionState;
    wish: WishState;
}

export type ShipSettingState = Record<string, IShipUserSettings>; // key = shipId

export type ModuleSettingState = Record<string, IModuleUserSettings>; // key = shipId.moduleId

export interface IMinifiedUserSettings {
    formatVersion: number;
    ships: Array<[
        string, // ShipId
        number, // PossessionState
        number // WishState
    ]>;
    modules: Array<[
        string, // ShipId.ModuleId
        number, // PossessionState
        number // WhishState
    ]>;
}
