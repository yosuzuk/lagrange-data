import { useCallback, useEffect, useMemo, useState } from 'react';
import { ITechPointConfig, ITechPointShipConfig } from '../types/ITechPointConfig';
import { createDefaultTechPointConfig, toggleEnhancement, toggleModule } from '../utils/techPointConfigUtils';
import { IShipDefinition } from '../../../../types/ShipDefinition';
import { deleteTechPointConfigInStore, createOrLoadTechPointConfigFromStorage, saveTechPointConfigToStorage, hasTechPointConfigInStorage } from '../utils/storedTechPointConfigUtils';

interface IHookArgs {
    supportedShips: IShipDefinition[];
    visibleShips: IShipDefinition[];
}

interface IHookResult {
    config: ITechPointConfig;
    modified: boolean;
    stored: boolean;
    handleToggleModule: (shipId: string, moduleId: string) => void;
    handleToggleEnhancement: (shipId: string, moduleId: string, enhancementId: string) => void;
    handleReset: () => void;
    handleCancel: () => void;
    handleSave: () => void;
}

export const useTechPointConfig = (args: IHookArgs): IHookResult => {
    const { supportedShips, visibleShips } = args;
    const [config, setConfig] = useState<ITechPointConfig>(() => createDefaultTechPointConfig([]));
    const [modified, setModified] = useState<boolean>(false);
    const [stored, setStored] = useState<boolean>(hasTechPointConfigInStorage());

    useEffect(() => {
        const config = createOrLoadTechPointConfigFromStorage(supportedShips);
        setConfig(config);
    }, [supportedShips]);

    const handleToggleModule = useCallback((shipId: string, moduleId: string) => {
        setModified(true);
        setConfig(config => toggleModule(config, shipId, moduleId));
    }, []);

    const handleToggleEnhancement = useCallback((shipId: string, moduleId: string, enhancementId: string) => {
        setModified(true);
        setConfig(config => toggleEnhancement(config, shipId, moduleId, enhancementId));
    }, []);

    const handleReset = useCallback(() => {
        deleteTechPointConfigInStore();
        const newConfig = createDefaultTechPointConfig(supportedShips);
        setConfig(newConfig);
        setModified(false);
        setStored(false);
    }, [supportedShips]);

    const handleCancel = useCallback(() => {
        const config = createOrLoadTechPointConfigFromStorage(supportedShips);
        setConfig(config);
        setModified(false);
    }, [config]);

    const handleSave = useCallback(() => {
        saveTechPointConfigToStorage(config);
        setModified(false);
        setStored(true);
    }, [config]);

    const visibleConfig = useMemo<ITechPointConfig>(() => {
        return {
            ships: visibleShips.reduce((acc, shipDefinition) => {
                const shipConfig = config.ships[shipDefinition.id];
                if (!shipConfig) {
                    return acc;
                }

                return {
                    ...acc,
                    [shipDefinition.id]: shipConfig,
                };
            }, {} as Record<string, ITechPointShipConfig>),
        };
    }, [config, visibleShips]);

    return {
        config: visibleConfig,
        modified,
        stored,
        handleToggleModule,
        handleToggleEnhancement,
        handleReset,
        handleCancel,
        handleSave,
    };
};
