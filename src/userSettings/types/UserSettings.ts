import { PossessionState } from './PossessionState';
import { WishState } from './WishState';

export interface UserSettings {
    formatVersion: number;
    ships: Record<string, ShipUserSettings>;
}

export interface ShipUserSettings {
    possession: PossessionState;
    wish: WishState;
}

export type ShipSettingState = Record<string, ShipUserSettings>;

export interface MinifiedUserSettings {
    formatVersion: number;
    ships: Array<[
        string, // ShipId
        number, // PossessionState
        number // WishState
    ]>;
}
