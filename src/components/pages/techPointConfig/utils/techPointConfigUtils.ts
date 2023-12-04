import { IEnhancement } from '../../../../enhancements/types/IEnhancement';
import { IShipDefinition, ISystemModule } from '../../../../types/ShipDefinition';
import { ITechPointConfig, ITechPointEnhancementConfig, ITechPointModuleConfig, ITechPointShipConfig } from '../types/ITechPointConfig';

export function createDefaultTechPointConfig(shipDefinition: IShipDefinition[]): ITechPointConfig {
    const ships = shipDefinition.reduce((acc, shipDefinition) => {
        return {
            ...acc,
            [shipDefinition.id]: createTechPointShipConfig(shipDefinition),
        };
    }, {} as Record<string, ITechPointShipConfig>);

    return {
        ships,
    };
}

function createTechPointShipConfig(shipDefinition: IShipDefinition): ITechPointShipConfig {
    const modules: Record<string, ITechPointModuleConfig> = shipDefinition.modules?.filter(m => m.skillSlots !== 0).reduce((acc, systemModule) => ({
        ...acc,
        [systemModule.id]: createTechPointModuleConfig(systemModule),
    }), {} as Record<string, ITechPointModuleConfig>) ?? {};

    const selectedModuleIds = shipDefinition.modules?.filter(m => m.skillSlots !== 0 && m.category === 'STATIC' || m.defaultModule === true)
        .map(m => m.id) ?? [];

    const maxTechPoints = findMaxTechPointsForShip(modules, selectedModuleIds);
    const unlockCost = findUnlockCostForShip(modules, selectedModuleIds);
    const incomplete = isIncompleteShip(modules, selectedModuleIds);

    return {
        shipDefinition,
        modules,
        selectedModuleIds,
        techPoints: null,
        maxTechPoints,
        unlockCost,
        incomplete,
        favorite: false,
    };
}

function createTechPointModuleConfig(systemModule: ISystemModule): ITechPointModuleConfig {

    const enhancements: Record<string, ITechPointEnhancementConfig> = [
        ...(systemModule.flagshipEffects ?? []),
        ...(systemModule.skills ?? []),
    ].filter(enh => Number.isFinite(enh.cost) && Number(enh.cost) > 0).reduce((acc, skill, index) => {
        const id = `${skill.type}_${index}`;
        return {
            ...acc,
            [id]: createTechPointEnhancementConfig(skill, id),
        };
    }, {});

    const maxTechPoints = findMaxTechPointsForModule(systemModule);
    const unlockCost = (systemModule.category !== 'STATIC' && !systemModule.defaultModule) ? 10 : 0;

    const defaultCount = Object.values(enhancements).filter(x => x.enhancement.isDefault && x.enhancement.cost !== null && x.enhancement.cost > 0).length;

    return {
        module: systemModule,
        enhancements,
        selectedEnhancementIds: [],
        techPoints: null,
        maxTechPoints,
        unlockCost,
        incomplete: isIncompleteSystemModule(systemModule),
        defaultCount,
    };
}

function createTechPointEnhancementConfig(enhancement: IEnhancement, id: string): ITechPointEnhancementConfig {
    return {
        id,
        enhancement,
        techPoints: enhancement.cost,
    };
}

export function findMaxTechPointsForShip(moduleConfigs: Record<string, ITechPointModuleConfig>, selectedModuleIds: string[]): number | null {
    return Object.keys(moduleConfigs)
        .map(moduleId => moduleConfigs[moduleId])
        .filter(moduleConfig => moduleConfig.module.category === 'STATIC' || selectedModuleIds.includes(moduleConfig.module.id))
        .map(moduleConfig => moduleConfig.maxTechPoints)
        .reduce((sum, i) => (sum ?? 0) + (i ?? 0), null);
}

export function findUnlockCostForShip(moduleConfigs: Record<string, ITechPointModuleConfig>, selectedModuleIds: string[]): number {
    return Object.keys(moduleConfigs)
        .map(moduleId => selectedModuleIds.includes(moduleId) ? moduleConfigs[moduleId].unlockCost : 0)
        .reduce((sum, next) => sum + next, 0);
}

function findMaxTechPointsForModule(systemModule: ISystemModule): number | null {
    if (!systemModule.skillSlots || !systemModule.skills || systemModule.skills.length === 0) {
        return null;
    }

    const enhancementCostForDefaultSkills = [...systemModule.skills, ...(systemModule.flagshipEffects ?? [])]
        .filter(x => x.isDefault && x.cost !== null)
        .map<number>(x => Number(x.cost))
        .reduce((sum, next) => (sum ?? 0) + (next ?? 0), 0);

    const enhancementCostForOpenSlots = [...systemModule.skills, ...(systemModule.flagshipEffects ?? [])]
        .filter(x => !x.isDefault && Number.isFinite(x.cost))
        .map(enhancement => Number(enhancement.cost))
        .sort((a, b) => (b ?? 0) - (a ?? 0))
        .slice(0, systemModule.skillSlots)
        .reduce((sum, next) => (sum ?? 0) + (next ?? 0), 0);

    return enhancementCostForDefaultSkills + enhancementCostForOpenSlots;
}

export function isIncompleteShip(moduleConfigs: Record<string, ITechPointModuleConfig>, selectedModuleIds: string[]): boolean {
    const keys = Object.keys(moduleConfigs);
    if (keys.length === 0) {
        return true;
    }
    return keys.map(key => moduleConfigs[key])
        .filter(moduleConfig => moduleConfig.module.category === 'STATIC' || selectedModuleIds.includes(moduleConfig.module.id))
        .some(moduleConfig => moduleConfig.incomplete);
}

function isIncompleteSystemModule(systemModule: ISystemModule): boolean {
    if (!systemModule.skillSlots) {
        return true;
    }

    return !systemModule.skillSlots || systemModule.skillComplete !== true || ([
        ...(systemModule.flagshipEffects ?? []),
        ...(systemModule.skills ?? []),
    ].some(enhancements => !enhancements.isDefault && enhancements.cost === null))
}

export function toggleSelectedModuleIds(shipConfig: ITechPointShipConfig, moduleId: string): string[] {
    if (shipConfig.selectedModuleIds.includes(moduleId)) {
        return shipConfig.selectedModuleIds.filter(id => id !== moduleId);
    }
    const { category } = shipConfig.modules[moduleId].module;
    if (category === 'STATIC') {
        return [...shipConfig.selectedModuleIds, moduleId];
    }

    return [
        ...shipConfig.selectedModuleIds.filter(id => {
            return category !== shipConfig.modules[id].module.category;
        }),
        moduleId,
    ];
}

export function toggleModule(config: ITechPointConfig, shipId: string, moduleId: string): ITechPointConfig {
    const shipConfig = config.ships[shipId] ?? null;
    if (!shipConfig) {
        throw new Error(`Missing config for "${shipId}"`);
    }
    const moduleConfig = shipConfig.modules[moduleId];
    if (!moduleConfig) {
        throw new Error(`Invalid module for "${shipId}", "${moduleId}"`);
    }
    const newShipConfig: ITechPointShipConfig = {
        ...shipConfig,
        selectedModuleIds: toggleSelectedModuleIds(shipConfig, moduleId),
    };
    return {
        ...config,
        ships: {
            ...config.ships,
            [shipId]: {
                ...newShipConfig,
                techPoints: countShipTechPoints(newShipConfig),
                maxTechPoints: findMaxTechPointsForShip(newShipConfig.modules, newShipConfig.selectedModuleIds),
                unlockCost: findUnlockCostForShip(newShipConfig.modules, newShipConfig.selectedModuleIds),
                incomplete: isIncompleteShip(newShipConfig.modules, newShipConfig.selectedModuleIds),
            },
        },
    };
}

export function isExceedingSlotCount(selectedEnhancementIds: string[], moduleConfig: ITechPointModuleConfig): boolean {
    const selectedEnhancementForOpenSlotCount = selectedEnhancementIds.filter(x => {
        const { isDefault, cost } = moduleConfig.enhancements[x].enhancement;
        return !isDefault && cost !== null && cost > 0;
    }).length;
    return !!moduleConfig.module.skillSlots && selectedEnhancementForOpenSlotCount > moduleConfig.module.skillSlots;
}

export function toggleEnhancement(config: ITechPointConfig, shipId: string, moduleId: string, enhancementId: string): ITechPointConfig {
    const moduleConfig = config.ships[shipId]?.modules[moduleId] ?? null;
    if (!moduleConfig) {
        throw new Error(`Missing config for "${shipId}", "${moduleId}"`);
    }

    const selectedEnhancementIds = toggleArrayItem(moduleConfig.selectedEnhancementIds, enhancementId);

    if (isExceedingSlotCount(selectedEnhancementIds, moduleConfig)) {
        console.log('No more slots available');
        return config;
    }

    const newModuleConfig: ITechPointModuleConfig = {
        ...moduleConfig,
        selectedEnhancementIds,
    };
    const newShipConfig: ITechPointShipConfig = {
        ...config.ships[shipId],
        modules: {
            ...config.ships[shipId].modules,
            [moduleId]: {
                ...newModuleConfig,
                techPoints: countModuleTechPoints(newModuleConfig),
            },
        },
    };
    return {
        ...config,
        ships: {
            ...config.ships,
            [shipId]: {
                ...newShipConfig,
                techPoints: countShipTechPoints(newShipConfig),
            },
        },
    };
}

export function toggleFavorite(config: ITechPointConfig, shipId: string): ITechPointConfig {
    return {
        ...config,
        ships: {
            ...config.ships,
            [shipId]: {
                ...config.ships[shipId],
                favorite: !config.ships[shipId].favorite,
            },
        },
    };
}

function toggleArrayItem<T>(array: T[], item: T): T[] {
    if (array.includes(item)) {
        return array.filter(i => i !== item);
    }
    return [...array, item];
}

function countShipTechPoints(shipConfig: ITechPointShipConfig): number | null {
    return Object.values(shipConfig.modules)
        .filter(m => shipConfig.selectedModuleIds.includes(m.module.id))
        .map(m => m.techPoints)
        .reduce((sum, i) => (sum ?? 0) + (i ?? 0), null);
}

function countModuleTechPoints(moduleConfig: ITechPointModuleConfig): number | null {
    return Object.values(moduleConfig.enhancements)
        .filter(e => moduleConfig.selectedEnhancementIds.includes(e.id))
        .map(e => e.techPoints)
        .reduce((sum, i) => (sum ?? 0) + (i ?? 0), null);
}
