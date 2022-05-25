import { ShipId } from '../../data/shipIds';
import { getShipDefinitionById, isShipObtainableThroughTechFile } from '../../utils/shipDefinitionUtils';
import { PossessionState } from '../types/PossessionState';
import { IUserSettings, IMinifiedUserSettings, ShipSettingState, ModuleSettingState } from '../types/UserSettings';
import { WishState } from '../types/WishState';

const STORAGE_KEY = 'settings';

export function getCurrentUserSettings(): IUserSettings {
    return restoreUserSettings() ?? createInitialUserSettings();
}

export function saveUserSettings(userSettings: IUserSettings) {
    const serializedUserSettings = JSON.stringify(minifyUserSettings(userSettings));
    window.localStorage.setItem(STORAGE_KEY, serializedUserSettings);
}

function restoreUserSettings(): IUserSettings | null {
    const serializedUserSettings = window.localStorage.getItem(STORAGE_KEY);
    if (!serializedUserSettings) {
        return null;
    }

    const userSettings = parseUserSettings(serializedUserSettings);

    return !!userSettings ? migrateUserSettings(unminifyUserSettings(userSettings)) : null;
}

function minifyUserSettings(userSettings: IUserSettings): IMinifiedUserSettings {
    return {
        ...userSettings,
        ships: Object.keys(userSettings.ships).map(shipId => {
            const { possession, wish } = userSettings.ships[shipId];
            return [shipId, possession, wish];
        }),
        modules: Object.keys(userSettings.modules).map(shipAndModuleId => {
            const { possession, wish } = userSettings.modules[shipAndModuleId];
            return [shipAndModuleId, possession, wish];
        }),
    };
}

function migrateUserSettings(userSettings: IUserSettings): IUserSettings {
    const ac721TypeC = userSettings.ships['AC721_C'];
    if (ac721TypeC) {
        userSettings.ships[ShipId.AC721_TE_A] = ac721TypeC;
        delete userSettings.ships['AC721_C'];
    }
    return userSettings;
}

function unminifyUserSettings(userSettings: IMinifiedUserSettings): IUserSettings {
    return {
        ...userSettings,
        ships: userSettings.ships.reduce((acc, [shipId, possession, wish]) => ({
            ...acc,
            [shipId]: { possession, wish },
        }), {}),
        modules: userSettings.modules?.reduce((acc, [shipAndModuleId, possession, wish]) => ({
            ...acc,
            [shipAndModuleId]: { possession, wish },
        }), {}) ?? {},
    };
}

function parseUserSettings(serializedUserSettings: string): IMinifiedUserSettings | null {
    try {
        return JSON.parse(serializedUserSettings) as IMinifiedUserSettings;
    } catch (e) {
        alert('ERROR - Failed to restore user settings');
        console.error(e);
        return null;
    }
}

export function createInitialUserSettings(): IUserSettings {
    return {
        formatVersion: 1,
        ships: {
            [ShipId.FG300_A]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.FG300_B]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.FG300_C]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.AC721_A]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.AC721_D]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.CAS066_A]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.CV_II003]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.KCCPV2_0_A]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.KCCPV2_0_D]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
            [ShipId.ST59]: {
                possession: PossessionState.POSSESSED,
                wish: WishState.UNDEFINED,
            },
        },
        modules: {},
    };
}

export function applyPossessionStateToShipSettings(
    shipId: string,
    possession: PossessionState,
    userSettings: IUserSettings,
): ShipSettingState {

    const resetWishState = isShipObtainableThroughTechFile(shipId) && possession === PossessionState.POSSESSED;

    return {
        ...userSettings.ships,
        [shipId]: {
            ...userSettings.ships[shipId],
            possession,
            wish: resetWishState ? WishState.UNDEFINED : userSettings.ships[shipId]?.wish ?? WishState.UNDEFINED,
        },
    };
}

export function applyPossessionStateToModuleSettings(
    moduleId: string,
    shipId: string,
    possession: PossessionState,
    userSettings: IUserSettings,
): ModuleSettingState {
    const key = `${shipId}.${moduleId}`;

    return {
        ...userSettings.modules,
        [key]: {
            ...userSettings.modules[key],
            possession,
            wish: possession === PossessionState.POSSESSED ? WishState.UNDEFINED : userSettings.modules[key]?.wish ?? WishState.UNDEFINED,
        },
    };
}

export function getShipPossession(shipId: string, userSettings: IUserSettings): PossessionState {
    return userSettings.ships[shipId]?.possession ?? PossessionState.UNDEFINED;
}

export function isPossessingShip(shipId: string, userSettings: IUserSettings): boolean {
    return userSettings.ships[shipId]?.possession === PossessionState.POSSESSED ?? false;
}

export function getModulePossession(moduleId: string, shipId: string, userSettings: IUserSettings): PossessionState {
    return userSettings.modules[`${shipId}.${moduleId}`]?.possession ?? PossessionState.UNDEFINED;
}

export function isPossessingModule(moduleId: string, shipId: string, userSettings: IUserSettings): boolean {
    return userSettings.modules[`${shipId}.${moduleId}`]?.possession === PossessionState.POSSESSED ?? false;
}

export function getShipWishState(shipId: string, userSettings: IUserSettings): WishState {
    return userSettings.ships[shipId]?.wish ?? WishState.UNDEFINED;
}

export function isWantedShip(shipId: string, userSettings: IUserSettings): boolean {
    return userSettings.ships[shipId]?.wish === WishState.WANTED ?? false;
}

export function isUnwantedShip(shipId: string, userSettings: IUserSettings): boolean {
    return userSettings.ships[shipId]?.wish === WishState.NOT_WANTED ?? false;
}

export function getModuleWishState(moduleId: string, shipId: string, userSettings: IUserSettings): WishState {
    return userSettings.modules[`${shipId}.${moduleId}`]?.wish ?? WishState.UNDEFINED;
}

export function isWantedModule(moduleId: string, shipId: string, userSettings: IUserSettings): boolean {
    return userSettings.modules[`${shipId}.${moduleId}`]?.wish === WishState.WANTED ?? false;
}

export function hasAcquirableModules(shipId: string, userSettings: IUserSettings): boolean {
    const definition = getShipDefinitionById(shipId);
    if (!definition.modules || definition.modules.length === 0) {
        return false;
    }

    return !!definition.modules.find(module => {
        return module.defaultModule !== true && !isPossessingModule(module.id, shipId, userSettings);
    });
}

export function hasWantedModule(shipId: string, userSettings: IUserSettings): boolean {
    const definition = getShipDefinitionById(shipId);
    if (!definition.modules || definition.modules.length === 0) {
        return false;
    }

    return !!definition.modules.find(module => {
        return module.defaultModule !== true && isWantedModule(module.id, shipId, userSettings);
    });
}
