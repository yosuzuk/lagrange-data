import { shipDefinitions } from '../../../../data/shipDefinitions';
import { ResearchManufacturer } from '../../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../../types/ResearchTacticType';
import { IShipDefinition } from '../../../../types/ShipDefinition';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { isPossessingShip, isUnwantedShip, isWantedShip } from '../../../../userSettings/utils/userSettingsUtils';
import { IResearchConfiguration, IResearchFilterState, IShipResearchChance } from '../types/IResearchConfiguration';

export function getShipDefinitionsForResearchAgreement() {
    return shipDefinitions.filter(shipDefinition => !!shipDefinition.researchManufacturer || !!shipDefinition.researchStrategyTypes || !!shipDefinition.researchTacticTypes);
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
        return strategyFilterOptions.flatMap(strategyTypeFilter => {
            return tacticFilterOptions.map(tacticTypeFilter => {
                return {
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
        return {
            shipDefinition,
            chance: shipDefinition.weight / totalWeight,
            formula: `${shipDefinition.weight} / ${totalWeight}`,
            possessed,
            wished: isWantedShip(shipDefinition.id, userSettings),
            unwished: isUnwantedShip(shipDefinition.id, userSettings),
        };
    });

    let totalShipChance: number = 0;
    let totalModuleChance: number = 0;
    let wishedShipChance: number = 0;
    let unwishedShipChance: number = 0;
    let techPointChance: number = 0;

    shipChances.forEach(shipChance => {
        if (!shipChance.possessed) {
            totalShipChance += shipChance.chance;

            if (shipChance.wished) {
                wishedShipChance += shipChance.chance;
            }

            if (shipChance.unwished) {
                unwishedShipChance += shipChance.chance;
            }

            return;
        }

        if (shipChance.shipDefinition.modules && shipChance.shipDefinition.modules.length > 0) {
            totalModuleChance += shipChance.chance;
            return;
        }

        techPointChance += shipChance.chance;
    });

    return {
        id: `${idCounter++}`,
        filterState,
        shipChances,
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
