import { shipDefinitions } from '../../../../data/shipDefinitions';
import { ResearchManufacturer } from '../../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../../types/ShipDefinition';
import { ShipTag } from '../../../../types/ShipTag';
import { ShipType } from '../../../../types/ShipType';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getAcquirableModules, getWantedModules, isPossessingShip, isUnwantedShip, isWantedModule, isWantedShip } from '../../../../userSettings/utils/userSettingsUtils';
import { getShipName } from '../../../../utils/shipDefinitionUtils';
import { IResearchConfiguration, IResearchFilterState, IShipResearchChance, IShipFilterOptions, IShipFilterEntryForModule, IShipTypeResearchChance } from '../types/IResearchConfiguration';
import { Season } from '../types/Season';

export function getShipDefinitionsForResearchAgreement(season: Season): IShipDefinition[] {
    return shipDefinitions.filter(shipDefinition => {
        if (season === Season.ONE && shipDefinition.tags?.includes(ShipTag.PHASE_TWO_BLUEPRINT)) {
            return false;
        }

        return !!shipDefinition.researchManufacturer || !!shipDefinition.researchStrategyTypes || !!shipDefinition.researchTacticTypes;
    });
}

export function getShipFilterOptions(shipDefinitions: IShipDefinition[], userSettings: IUserSettings): IShipFilterOptions {
    const wantedShips: IShipDefinition[] = [];
    const shipsWithWantedModule: IShipFilterEntryForModule[] = [];
    const possessedShips: IShipDefinition[] = [];
    const remainingShips: IShipDefinition[] = [];

    shipDefinitions.forEach(ship => {
        const wantedModules = getWantedModules(ship, userSettings);
        if (wantedModules.length > 0) {
            shipsWithWantedModule.push({
                shipDefinition: ship,
                modules: wantedModules,
            });
            return;
        }
        if (isPossessingShip(ship.id, userSettings)) {
            possessedShips.push(ship);
            return;
        }
        if (isWantedShip(ship.id, userSettings)) {
            wantedShips.push(ship);
            return;
        }
        remainingShips.push(ship);
    });

    return {
        wantedShips: wantedShips.sort((a, b) => getShipName(a).localeCompare(getShipName(b))),
        shipsWithWantedModule: shipsWithWantedModule.sort((a, b) => getShipName(a.shipDefinition).localeCompare(getShipName(b.shipDefinition))),
        possessedShips: possessedShips.sort((a, b) => getShipName(a).localeCompare(getShipName(b))),
        remainingShips: remainingShips.sort((a, b) => getShipName(a).localeCompare(getShipName(b))),
    };
}

export function getAllFilterCombinations(): IResearchFilterState[] {
    const manufacturerOptions: Array<ResearchManufacturer | null> = [
        ResearchManufacturer.NOMA_SHIPPING_GROUP,
        ResearchManufacturer.JUPITER_INDUSTRIES,
        ResearchManufacturer.ANTONIOS_CONSORTIUM,
        ResearchManufacturer.DAWN_ACCORD,
        null,
    ];

    const strategyFilterOptions: Array<ResearchStrategyType | null> = [
        ResearchStrategyType.OUTSTANDING_FIREPOWER,
        ResearchStrategyType.SUSTAINED_COMBAT,
        ResearchStrategyType.STRATEGY_AND_SUPPORT,
        ResearchStrategyType.FIGHTER_AND_CORVETTE,
        null,
    ];

    const tacticFilterOptions: Array<ResearchTacticType | null> = [
        ResearchTacticType.PROJECTILE_WEAPONS,
        ResearchTacticType.DIRECT_FIRE_WEAPONS,
        null,
    ];

    return manufacturerOptions.flatMap(manufacturerFilter => {
        return tacticFilterOptions.flatMap(tacticTypeFilter => {
            return strategyFilterOptions.map(strategyTypeFilter => {
                return {
                    shipId: null,
                    manufacturerFilter,
                    strategyTypeFilter,
                    tacticTypeFilter,
                };
            });
        });
    });
}

let idCounter = 0;

export function createResearchConfiguration(
    filterState: IResearchFilterState,
    shipDefinitions: IShipDefinition[],
    userSettings: IUserSettings,
): IResearchConfiguration {
    const filteredShipDefinitions = shipDefinitions.filter(shipDefinition => {
        if (filterState.manufacturerFilter !== null && shipDefinition.researchManufacturer !== filterState.manufacturerFilter) {
            return false;
        }

        if (filterState.strategyTypeFilter !== null && shipDefinition.researchStrategyTypes && !shipDefinition.researchStrategyTypes.includes(filterState.strategyTypeFilter)) {
            return false;
        }

        if (filterState.tacticTypeFilter !== null && shipDefinition.researchTacticTypes && !shipDefinition.researchTacticTypes.includes(filterState.tacticTypeFilter)) {
            return false;
        }

        return true;
    });

    const totalWeight = filteredShipDefinitions.reduce((sum, next) => sum + next.weight, 0);

    const shipChances: IShipResearchChance[] = filteredShipDefinitions.map(shipDefinition => {
        const possessed = isPossessingShip(shipDefinition.id, userSettings);
        const shipChance = shipDefinition.weight / totalWeight;
        const acquirableModules = getAcquirableModules(shipDefinition, userSettings);

        return {
            shipDefinition,
            chance: shipChance,
            formula: `${shipDefinition.weight} / ${totalWeight}`,
            possessed,
            wished: isWantedShip(shipDefinition.id, userSettings),
            unwished: isUnwantedShip(shipDefinition.id, userSettings),
            modules: acquirableModules.map(module => ({
                module,
                chance: shipChance / acquirableModules.length,
                formula: `${formatChance(shipChance)} / ${acquirableModules.length}`,
                wished: isWantedModule(module.id, shipDefinition.id, userSettings),
            })),
        };
    });

    let totalShipChance: number = 0;
    let totalModuleChance: number = 0;
    let wishedShipChance: number = 0;
    let unwishedShipChance: number = 0;
    let techPointChance: number = 0;

    shipChances.forEach(shipChance => {
        if (shipChance.possessed) {
            if (shipChance.modules.length > 0) {
                totalModuleChance += shipChance.chance;

                if (!!shipChance.modules.find(moduleChance => moduleChance.wished)) {
                    wishedShipChance += shipChance.chance; // implicitely wanted for module
                }
                return;
            }

            techPointChance += shipChance.chance;
            return; // no modules or all modules acquired
        } else {
            totalShipChance += shipChance.chance;

            if (shipChance.wished) {
                wishedShipChance += shipChance.chance;
            }

            if (shipChance.unwished) {
                unwishedShipChance += shipChance.chance;
            }

            return;
        }
    });

    const orderedShipTypes = [
        ShipType.FIGHTER,
        ShipType.CORVETTE,
        ShipType.FRIGATE,
        ShipType.DESTROYER,
        ShipType.CRUISER,
        ShipType.BATTLE_CRUISER,
        ShipType.AUXILIARY,
        ShipType.CARRIER,
    ];

    const shipTypeChances: IShipTypeResearchChance[] = orderedShipTypes.map(shipType => {
        return {
            shipType,
            chance: shipChances
                .filter(shipChance => shipChance.shipDefinition.type === shipType)
                .map(shipChance => shipChance.chance)
                .reduce((total: number, next: number) => total + next, 0),
        };
    }).filter(shipTypeChance => shipTypeChance.chance > 0);

    return {
        id: `${idCounter++}`,
        filterState,
        shipChances,
        shipTypeChances,
        totalShipChance,
        totalModuleChance,
        wishedShipChance,
        unwishedShipChance,
        techPointChance,
    };
}

export function serializeResearchFilterState(filterState: IResearchFilterState): string {
    return `${filterState.manufacturerFilter ?? 'null'}.${filterState.strategyTypeFilter ?? 'null'}.${filterState.tacticTypeFilter ?? 'null'}`;
}

export function getFilteredResearchConfigurations(configurations: IResearchConfiguration[], filterState: IResearchFilterState): IResearchConfiguration[] {
    if (filterState.shipId !== null) {
        return configurations
            .filter(configuration => {
                // ignore no-filter
                if (!configuration.filterState.manufacturerFilter && !configuration.filterState.strategyTypeFilter && !configuration.filterState.tacticTypeFilter) {
                    return false;
                }

                // config contains ship
                return configuration.shipChances.find(shipChance => shipChance.shipDefinition.id === filterState.shipId);
            })
            .sort((a, b) => {
                const aChance = a.shipChances.find(shipChance => shipChance.shipDefinition.id === filterState.shipId)?.chance ?? 0;
                const bChance = b.shipChances.find(shipChance => shipChance.shipDefinition.id === filterState.shipId)?.chance ?? 0;
                return bChance - aChance;
            });
    }

    const exactMatch: IResearchConfiguration[] = [];

    const compatibleMatch = configurations.filter(configuration => {
        if (filterState.manufacturerFilter !== null && configuration.filterState.manufacturerFilter !== filterState.manufacturerFilter) {
            return false;
        }

        if (filterState.strategyTypeFilter !== null && configuration.filterState.strategyTypeFilter !== filterState.strategyTypeFilter) {
            return false;
        }

        if (filterState.tacticTypeFilter !== null && configuration.filterState.tacticTypeFilter !== filterState.tacticTypeFilter) {
            return false;
        }

        // ignore no-filter
        if (!configuration.filterState.manufacturerFilter && !configuration.filterState.strategyTypeFilter && !configuration.filterState.tacticTypeFilter) {
            return false;
        }

        // exact match (move to top)
        if (configuration.filterState.manufacturerFilter === filterState.manufacturerFilter && configuration.filterState.strategyTypeFilter === filterState.strategyTypeFilter && configuration.filterState.tacticTypeFilter === filterState.tacticTypeFilter) {
            exactMatch.push(configuration);
            return false;
        }

        return configuration;
    });

    return [...exactMatch, ...compatibleMatch];
}

function formatChance(chance: number): string {
    return `${Number((chance * 100).toFixed(3))} %`;
}
