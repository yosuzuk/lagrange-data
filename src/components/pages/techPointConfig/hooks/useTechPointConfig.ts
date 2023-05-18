import { useCallback, useEffect, useState } from 'react';
import { ITechPointConfig } from '../types/ITechPointConfig';
import { createDefaultTechPointConfig, toggleEnhancement, toggleModule } from '../utils/techPointConfigUtils';
import { IShipDefinition } from '../../../../types/ShipDefinition';

interface IHookArgs {
    shipDefinitions: IShipDefinition[];
}

interface IHookResult {
    config: ITechPointConfig;
    handleToggleModule: (shipId: string, moduleId: string) => void;
    handleToggleEnhancement: (shipId: string, moduleId: string, enhancementId: string) => void;
}

export const useTechPointConfig = (args: IHookArgs): IHookResult => {
    const { shipDefinitions } = args;
    const [config, setConfig] = useState<ITechPointConfig>(() => createDefaultTechPointConfig([]));

    useEffect(() => {
        const newConfig = createDefaultTechPointConfig(shipDefinitions);
        setConfig(newConfig);
    }, [shipDefinitions]);

    const handleToggleModule = useCallback((shipId: string, moduleId: string) => {
        setConfig(config => toggleModule(config, shipId, moduleId));
    }, []);

    const handleToggleEnhancement = useCallback((shipId: string, moduleId: string, enhancementId: string) => {
        setConfig(config => toggleEnhancement(config, shipId, moduleId, enhancementId));
    }, []);

    return {
        config,
        handleToggleModule,
        handleToggleEnhancement,
    };
};
