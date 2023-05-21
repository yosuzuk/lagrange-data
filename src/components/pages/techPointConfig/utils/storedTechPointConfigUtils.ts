import { IShipDefinition } from '../../../../types/ShipDefinition';
import { IStoredTechPointConfig, IStoredTechPointModuleConfig, IStoredTechPointShipConfig, ITechPointConfig } from '../types/ITechPointConfig';
import { createDefaultTechPointConfig, findMaxTechPointsForShip, findUnlockCostForShip, isIncompleteShip } from './techPointConfigUtils';

const TECH_POINTS_STORAGE_KEY = 'tp';

export function hasTechPointConfigInStorage(): boolean {
    return !!window.localStorage.getItem(TECH_POINTS_STORAGE_KEY);
}

export function deleteTechPointConfigInStore() {
    window.localStorage.removeItem(TECH_POINTS_STORAGE_KEY);
}

export function saveTechPointConfigToStorage(config: ITechPointConfig) {
    const compressed = compressTechPointConfig(config);
    window.localStorage.setItem(TECH_POINTS_STORAGE_KEY, JSON.stringify(compressed));
}

export function createOrLoadTechPointConfigFromStorage(shipDefinitions: IShipDefinition[]): ITechPointConfig {
    const newConfig = createDefaultTechPointConfig(shipDefinitions);

    const serialized = window.localStorage.getItem(TECH_POINTS_STORAGE_KEY);
    if (!serialized) {
        return newConfig;
    }

    let deserialized: IStoredTechPointConfig;
    try {
        deserialized = JSON.parse(serialized);
    } catch (e) {
        console.warn('Invalid tech point config', e);
        return newConfig;
    }

    return applyStoredTechPointConfig(newConfig, deserialized);
}

export function compressTechPointConfig(config: ITechPointConfig): IStoredTechPointConfig {
    const result: IStoredTechPointConfig = {
        version: 1,
        ships: [],
    };

    Object.keys(config.ships).forEach(shipId => {
        const shipConfig = config.ships[shipId];
        const storedShipConfig: IStoredTechPointShipConfig = [shipId, []];

        Object.keys(shipConfig.modules).forEach(moduleId => {
            const moduleConfig = shipConfig.modules[moduleId];

            const moduleInUse = shipConfig.selectedModuleIds.includes(moduleId) ? 1 : 0;
            const storedModuleConfig: IStoredTechPointModuleConfig = [moduleId, moduleConfig.selectedEnhancementIds, moduleInUse];
            storedShipConfig[1].push(storedModuleConfig);
        });

        result.ships.push(storedShipConfig);
    });

    return result;
}

export function applyStoredTechPointConfig(config: ITechPointConfig, storedConfig: IStoredTechPointConfig): ITechPointConfig {
    storedConfig.ships.forEach(([shipId, storedModuleConfigs]) => {
        const shipConfig = config.ships[shipId];
        if (!shipConfig) {
            console.warn(`Invalid shipId "${shipId}"`);
            return;
        }

        storedModuleConfigs.forEach(([moduleId, selectedEnhancementIds, moduleInUse]) => {
            const moduleConfig = shipConfig.modules[moduleId];
            if (!moduleConfig) {
                console.warn(`Invalid moduleId "${moduleId}"`);
                return;
            }

            if (moduleConfig.selectedEnhancementIds.length > 0) {
                console.warn(`Skip moduleId "${moduleId}" (duplicate)`);
                return;
            }

            selectedEnhancementIds.forEach(enhancementId => {
                const enhancementConfig = moduleConfig.enhancements[enhancementId];
                if (!enhancementConfig) {
                    console.warn(`Invalid enhancement "${enhancementId}"`);
                    return;
                }

                moduleConfig.selectedEnhancementIds.push(enhancementId);
                moduleConfig.techPoints = (moduleConfig.techPoints ?? 0) + (enhancementConfig.enhancement.cost ?? 0);
                shipConfig.techPoints = (shipConfig.techPoints ?? 0) + (enhancementConfig.enhancement.cost ?? 0);
            });

            // adjust module selection when using additional system modules
            if (moduleInUse === 1 && !shipConfig.selectedModuleIds.includes(moduleId)) {
                const moduleIdsToRemove = Object.keys(shipConfig.modules).filter(id => {
                    const { category } = shipConfig.modules[id].module;
                    return category !== 'STATIC' && category === moduleConfig.module.category;
                });

                shipConfig.selectedModuleIds = [
                    ...shipConfig.selectedModuleIds.filter(id => !moduleIdsToRemove.includes(id)),
                    moduleId
                ];
            }
        });

        shipConfig.maxTechPoints = findMaxTechPointsForShip(shipConfig.modules, shipConfig.selectedModuleIds);
        shipConfig.unlockCost = findUnlockCostForShip(shipConfig.modules, shipConfig.selectedModuleIds);
        shipConfig.incomplete = isIncompleteShip(shipConfig.modules, shipConfig.selectedModuleIds);
    });

    return config;
}
