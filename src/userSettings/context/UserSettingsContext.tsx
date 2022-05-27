import { FC, useCallback, useMemo, useState, useContext, createContext } from 'react';
import { PossessionState } from '../types/PossessionState';
import { IUserSettings } from '../types/UserSettings';
import { WishState } from '../types/WishState';
import { applyPossessionStateToModuleSettings, applyPossessionStateToShipSettings, createInitialUserSettings, getCurrentUserSettings, saveUserSettings as _saveUserSettings } from '../utils/userSettingsUtils';

interface IUserSettingsContextValue {
    userSettings: IUserSettings;
    setUserSettings: (userSettings: IUserSettings) => void;
    saveUserSettings: () => void;
    restoreUserSettings: () => void;
    resetUserSettings: () => void;
    setShipPossession: (shipId: string, possession: PossessionState) => void;
    setModulePossession: (moduleId: string, shipId: string, possession: PossessionState) => void;
    setShipWish: (shipId: string, wish: WishState) => void;
    setModuleWish: (moduleId: string, shipId: string, wish: WishState) => void;
}

const UserSettingsContext = createContext<IUserSettingsContextValue | null>(null);

export const UserSettingsProvider: FC = ({ children }) => {
    const [userSettings, _setUserSettings] = useState<IUserSettings>(getCurrentUserSettings);

    const setUserSettings = useCallback((newUserSettings: IUserSettings) => {
        _setUserSettings(newUserSettings);
    }, []);

    const saveUserSettings = useCallback(() => {
        _setUserSettings(userSettings => {
            _saveUserSettings(userSettings);
            return userSettings;
        });
    }, []);

    const restoreUserSettings = useCallback(() => {
        _setUserSettings(getCurrentUserSettings());
    }, []);

    const resetUserSettings = useCallback(() => {
        _setUserSettings(createInitialUserSettings());
    }, []);

    const setShipPossession = useCallback((shipId: string, possession: PossessionState) => {
        _setUserSettings(userSettings => ({
            ...userSettings,
            ships: applyPossessionStateToShipSettings(shipId, possession, userSettings),
        }));
    }, []);

    const setModulePossession = useCallback((moduleId: string, shipId: string, possession: PossessionState) => {
        _setUserSettings(userSettings => ({
            ...userSettings,
            modules: applyPossessionStateToModuleSettings(moduleId, shipId, possession, userSettings),
        }));
    }, []);

    const setShipWish = useCallback((shipId: string, wish: WishState) => {
        _setUserSettings(userSettings => ({
            ...userSettings,
            ships: {
                ...userSettings.ships,
                [shipId]: {
                    ...userSettings.ships[shipId],
                    wish,
                },
            },
        }));
    }, []);

    const setModuleWish = useCallback((moduleId: string, shipId: string, wish: WishState) => {
        _setUserSettings(userSettings => ({
            ...userSettings,
            modules: {
                ...userSettings.modules,
                [`${shipId}.${moduleId}`]: {
                    ...userSettings.modules[`${shipId}.${moduleId}`],
                    wish,
                },
            },
        }));
    }, []);

    const  contextValue: IUserSettingsContextValue = {
        userSettings,
        setUserSettings,
        saveUserSettings,
        restoreUserSettings,
        resetUserSettings,
        setShipPossession,
        setModulePossession,
        setShipWish,
        setModuleWish,
    };

    return (
        <UserSettingsContext.Provider value={contextValue}>
            {children}
        </UserSettingsContext.Provider>
    );
}

export const useUserSettings = (): IUserSettingsContextValue => {
    const contextValue = useContext(UserSettingsContext);
    if (contextValue === null) {
        throw new Error('Missing value in UserSettingsContext');
    }

    return contextValue;
};
