import { ShipId } from '../../data/shipIds';
import { IShipDefinition, ISystemModule } from '../../types/ShipDefinition';
import { openJson } from '../../utils/file';
import { getShipDefinitionById, isShipObtainableThroughTechFile } from '../../utils/shipDefinitionUtils';
import { PossessionState } from '../types/PossessionState';
import { IUserSettings, IMinifiedUserSettings, ShipSettingState, IShipUserSettings, ModuleSettingState } from '../types/UserSettings';
import { WishState } from '../types/WishState';
import { migrateShipId } from './migration';

const STORAGE_KEY = 'settings';
const BACKUP_STORAGE_KEY = 'settingsBackup';

export function getCurrentUserSettings(): IUserSettings {
    return readUserSettingsFromStorage() ?? createInitialUserSettings();
}

export function getCurrentSerializedUserSettings(): string {
    const userSettings = getCurrentUserSettings();
    return JSON.stringify(minifyUserSettings(userSettings));
}

export function saveUserSettings(userSettings: IUserSettings) {
    const serializedUserSettings = JSON.stringify(minifyUserSettings(userSettings));
    window.localStorage.setItem(STORAGE_KEY, serializedUserSettings);
}

export function backupCurrentUserSettings() {
    const current = window.localStorage.getItem(STORAGE_KEY);
    if (current) {
        window.localStorage.setItem(BACKUP_STORAGE_KEY, current);
    }
}

export function readUserSettingsFromBackup(): IUserSettings | null {
    return readUserSettingsFromStorage(BACKUP_STORAGE_KEY);
}

export function copyStorageValue(from: string, to: string) {
    const current = window.localStorage.getItem(from);
    if (current) {
        window.localStorage.setItem(to, current);
    } else {
        window.localStorage.removeItem(to);
    }
}

export async function openUserSettingsFromFile(): Promise<IUserSettings | null> {
    const minified = await openJson<IMinifiedUserSettings>();
    if (minified === null) {
        return null;
    }

    return migrateUserSettings(unminifyUserSettings(minified));
}

function readUserSettingsFromStorage(storageKey: string = STORAGE_KEY): IUserSettings | null {
    const serializedUserSettings = window.localStorage.getItem(storageKey);
    if (!serializedUserSettings) {
        return null;
    }

    return parseUserSettings(serializedUserSettings);
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
    // migrate ships
    const ships: ShipSettingState = Object.keys(userSettings.ships).reduce((result, shipId) => {
        const shipUserSettings: IShipUserSettings = userSettings.ships[shipId];
        return {
            ...result,
            [migrateShipId(shipId)]: shipUserSettings,
        };
    }, {} as ShipSettingState);

    // migrate modules
    const modules: ModuleSettingState = Object.keys(userSettings.modules).reduce((result, key) => {
        const [_shipId, moduleId] = key.split('.');
        const shipId = migrateShipId(_shipId);
        const shipDefinition = getShipDefinitionById(shipId);
        const moduleDefinition = shipDefinition?.modules?.find(m => m.id === moduleId);
        if (!shipDefinition || !moduleDefinition || moduleDefinition.category === 'STATIC') {
            return result;
        }

        return {
            ...result,
            [`${shipId}.${moduleId}`]: userSettings.modules[key],
        };
    }, {} as ModuleSettingState);

    const result: IUserSettings = {
        ...userSettings,
        ships,
        modules,
    };
    return result;
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

export function parseUserSettings(value: string): IUserSettings | null {
    let minified: IMinifiedUserSettings;
    try {
        minified = JSON.parse(value) as IMinifiedUserSettings;
    } catch (e) {
        console.error('ERROR - Failed to restore user settings', e);
        return null;
    }

    return minified ? migrateUserSettings(unminifyUserSettings(minified)) : null;
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

    return definition.modules.some(module => {
        return module.category !== 'STATIC' && module.defaultModule !== true && !isPossessingModule(module.id, shipId, userSettings);
    });
}

export function getAcquiredModules(ship: IShipDefinition, userSettings: IUserSettings): ISystemModule[] {
    return getPossessedModules(ship, userSettings, false);
}

export function getAcquirableModules(ship: IShipDefinition, userSettings: IUserSettings): ISystemModule[] {
    return ship.modules?.filter(module => {
        return module.category !== 'STATIC' && module.defaultModule !== true && !isPossessingModule(module.id, ship.id, userSettings);
    }) ?? [];
}

export function getPossessedModules(ship: IShipDefinition, userSettings: IUserSettings, indludeDefault: boolean = true): ISystemModule[] {
    return ship.modules?.filter(module => module.category !== 'STATIC' && ((indludeDefault && module.defaultModule) || isPossessingModule(module.id, ship.id, userSettings))) ?? [];
}

export function getWantedModules(ship: IShipDefinition, userSettings: IUserSettings): ISystemModule[] {
    return ship.modules?.filter(module => module.category !== 'STATIC' && isWantedModule(module.id, ship.id, userSettings)) ?? [];
}

export function hasWantedModule(shipId: string, userSettings: IUserSettings): boolean {
    const definition = getShipDefinitionById(shipId);
    if (!definition.modules || definition.modules.length === 0) {
        return false;
    }

    return !!definition.modules.find(module => {
        return module.category !== 'STATIC' && module.defaultModule !== true && isWantedModule(module.id, shipId, userSettings);
    });
}
