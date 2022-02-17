import { PossessionState } from './PossessionState';
import { WishState } from './WishState';

export interface IUserSettings {
    formatVersion: number;
    ships: Record<string, IShipUserSettings>;
}

export interface IShipUserSettings {
    possession: PossessionState;
    wish: WishState;
}

export type ShipSettingState = Record<string, IShipUserSettings>;

export interface IMinifiedUserSettings {
    formatVersion: number;
    ships: Array<[
        string, // ShipId
        number, // PossessionState
        number // WishState
    ]>;
}
