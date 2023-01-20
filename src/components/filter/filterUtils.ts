import { IFilterOption } from './types/IFilterOption';
import { ShipRow } from '../../types/ShipRow';
import { ShipType } from '../../types/ShipType';
import { shipTypes } from '../../utils/shipTypeUtils';
import { translateShipRow } from '../../utils/shipRowUtils';
import { ShipFilterState, FilterKey } from './types/ShipFilterState';
import { IShipDefinition } from '../../types/ShipDefinition';
import { IUserSettings, ShipSettingState } from '../../userSettings/types/UserSettings';
import { PossessionState } from '../../userSettings/types/PossessionState';
import { WishState } from '../../userSettings/types/WishState';
import { getShipDefinitionById, isShipObtainableThroughTechFile } from '../../utils/shipDefinitionUtils';
import { ShipSource } from '../../types/ShipSource';
import { Manufacturer } from '../../types/Manufacturer';
import { translateManufacturer } from '../../utils/manufacturerUtils';
import { ResearchManufacturer } from '../../types/ResearchManufacturer';
import { translateResearchManufacturer } from '../../utils/researchManufacturerUtils';
import { translateResearchStrategyType } from '../../utils/researchStrategyTypeUtils';
import { translateResearchTacticType } from '../../utils/researchTacticTypeUtils';
import { ResearchStrategyType } from '../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../types/ResearchTacticType';
import { getAcquirableModules, getWantedModules } from '../../userSettings/utils/userSettingsUtils';
import { t } from '../../i18n';
import { shipSources, translateShipSource } from '../../utils/shipSourceUtils';

export function createShipRowFilterOptions(specifiedShipRows: ShipRow[] | null): IFilterOption[] {
    return (specifiedShipRows ?? [ShipRow.FRONT, ShipRow.MIDDLE, ShipRow.BACK]).map(shipRow => ({
        filterKey: shipRow,
        name: translateShipRow(shipRow),
    }));
}

export function createShipTypeFilterOptions(specifiedShipTypes: ShipType[] | null): IFilterOption[] {
    return (specifiedShipTypes ?? Object.keys(shipTypes)).map(type => ({
        filterKey: type as ShipType,
        name: shipTypes[type as ShipType].name,
    }));
}

export function createManufacturerFilterOptions(specificManufacturer: Manufacturer[] | null): IFilterOption[] {
    return (specificManufacturer ?? [Manufacturer.JUPITER_INDUSTRIES, Manufacturer.NOMA_SHIPPING_GROUP, Manufacturer.ANTONIOS_CONSORTIUM, Manufacturer.DAWN_ACCORD, Manufacturer.HAYREDDIN_CLAN, Manufacturer.THUNDERBOLT_GROUP]).map(manufacturer => ({
        filterKey: manufacturer as Manufacturer,
        name: translateManufacturer(manufacturer),
    }));
}

export function createShipSourceFilterOptions(specificShipSources: ShipSource[] | null): IFilterOption[] {
    return (specificShipSources ?? [ShipSource.CITY_TRADE, ShipSource.DOCK_EFFECT, ShipSource.SALVAGE]).map(shipSource => ({
        filterKey: shipSource as ShipSource,
        name: translateShipSource(shipSource),
    }));
}

export function createResearchManufacturerFilterOptions(specificResearchManufacturer: ResearchManufacturer[] | null): IFilterOption[] {
    return (specificResearchManufacturer ?? [ResearchManufacturer.JUPITER_INDUSTRIES, ResearchManufacturer.NOMA_SHIPPING_GROUP, ResearchManufacturer.ANTONIOS_CONSORTIUM, ResearchManufacturer.DAWN_ACCORD]).map(manufacturer => ({
        filterKey: manufacturer as ResearchManufacturer,
        name: t('label.researchManufacturerOption', {
            manufacturer: translateResearchManufacturer(manufacturer),
        }),
    }));
}

export function createResearchStrategyTypeFilterOptions(specificResearchStrategyTypes: ResearchStrategyType[] | null): IFilterOption[] {
    return (specificResearchStrategyTypes ?? [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE]).map(type => ({
        filterKey: type as ResearchStrategyType,
        name: t('label.researchStrategyTypeOption', {
            strategyType: translateResearchStrategyType(type),
        }),
    }));
}

export function createResearchTacticTypeFilterOptions(specificResearchTacticTypes: ResearchTacticType[] | null): IFilterOption[] {
    return (specificResearchTacticTypes ?? [ResearchTacticType.PROJECTILE_WEAPONS, ResearchTacticType.DIRECT_FIRE_WEAPONS]).map(type => ({
        filterKey: type as ResearchTacticType,
        name: t('label.researchTacticTypeOption', {
            tacticType: translateResearchTacticType(type),
        }),
    }));
}

interface ICreateShipFilterOptionsArgs {
    shipRows?: ShipRow[],
    shipTypes?: ShipType[],
    manufacturer?: Manufacturer[],
    researchManufacturer?: ResearchManufacturer[] | false,
    researchStrategyTypes?: ResearchStrategyType[] | false,
    researchTacticTypes?: ResearchTacticType[] | false,
    shipSources?: ShipSource[],
}

export function createShipFilterOptions(args: ICreateShipFilterOptionsArgs = {}): IFilterOption[] {
    return [
        ...createShipRowFilterOptions(args.shipRows ?? null),
        ...createShipTypeFilterOptions(args.shipTypes ?? null),
        ...createManufacturerFilterOptions(args.manufacturer ?? null),
        ...(args.researchManufacturer === false ? [] : createResearchManufacturerFilterOptions(args.researchManufacturer ?? null)),
        ...(args.researchTacticTypes === false ? [] : createResearchTacticTypeFilterOptions(args.researchTacticTypes ?? null)),
        ...(args.researchStrategyTypes === false ? [] : createResearchStrategyTypeFilterOptions(args.researchStrategyTypes ?? null)),
        ...createShipSourceFilterOptions(args.shipSources ?? null),
    ];
}

export function createInitialShipFilterState(): ShipFilterState {
    return {
        [ShipRow.FRONT]: false,
        [ShipRow.MIDDLE]: false,
        [ShipRow.BACK]: false,
        ...Object.keys(shipTypes).reduce((acc, type) => ({
            ...acc,
            [type as ShipType]: false,
        }), {}),
        [Manufacturer.JUPITER_INDUSTRIES]: false,
        [Manufacturer.NOMA_SHIPPING_GROUP]: false,
        [Manufacturer.ANTONIOS_CONSORTIUM]: false,
        [Manufacturer.DAWN_ACCORD]: false,
        [Manufacturer.HAYREDDIN_CLAN]: false,
        [Manufacturer.THUNDERBOLT_GROUP]: false,
        [ResearchManufacturer.JUPITER_INDUSTRIES]: false,
        [ResearchManufacturer.NOMA_SHIPPING_GROUP]: false,
        [ResearchManufacturer.ANTONIOS_CONSORTIUM]: false,
        [ResearchManufacturer.DAWN_ACCORD]: false,
        [ResearchTacticType.PROJECTILE_WEAPONS]: false,
        [ResearchTacticType.DIRECT_FIRE_WEAPONS]: false,
        [ResearchStrategyType.OUTSTANDING_FIREPOWER]: false,
        [ResearchStrategyType.SUSTAINED_COMBAT]: false,
        [ResearchStrategyType.STRATEGY_AND_SUPPORT]: false,
        [ResearchStrategyType.FIGHTER_AND_CORVETTE]: false,
        [ShipSource.TECH_FILE]: false,
        [ShipSource.CITY_TRADE]: false,
        [ShipSource.DOCK_EFFECT]: false,
        [ShipSource.SALVAGE]: false,
        [ShipSource.STARTER_SHIP]: false,
    } as ShipFilterState;
}

export function resetFilterState(filter: ShipFilterState): ShipFilterState {
    const newFilterState = { ...filter };
    Object.keys(newFilterState).forEach(key => {
        newFilterState[key as FilterKey] = false;
    });
    return newFilterState;
}

export function applyShipFilter(shipDefinitions: IShipDefinition[], filter: ShipFilterState): IShipDefinition[] {
    let result = shipDefinitions;
    if (isRowFiltered(filter)) {
        result = result.filter(shipDefinition => filter[shipDefinition.row] === true);
    }
    if (isShipTypeFiltered(filter)) {
        result = result.filter(shipDefinition => filter[shipDefinition.type] === true);
    }
    if (isManufacturerFiltered(filter)) {
        result = result.filter(shipDefinition => filter[shipDefinition.manufacturer] === true);
    }
    if (isResearchManufacturerFiltered(filter)) {
        result = result.filter(shipDefinition => shipDefinition.researchManufacturer && filter[shipDefinition.researchManufacturer] === true);
    }
    if (isResearchStrategyTypeFiltered(filter)) {
        result = result.filter(shipDefinition => (shipDefinition.researchStrategyTypes ?? []).some(type => filter[type] === true));
    }
    if (isResearchTacticTypeFiltered(filter)) {
        result = result.filter(shipDefinition => (shipDefinition.researchTacticTypes ?? []).some(type => filter[type] === true));
    }
    if (isShipSourceFiltered(filter)) {
        result = result.filter(shipDefinition => filter[shipDefinition.source] === true);
    }
    return result;
}

export function separateShipsBySource(shipDefinitions: IShipDefinition[]): Record<ShipSource, IShipDefinition[]> {
    const result: Record<ShipSource, IShipDefinition[]> = {
        [ShipSource.STARTER_SHIP]: [],
        [ShipSource.TECH_FILE]: [],
        [ShipSource.CITY_TRADE]: [],
        [ShipSource.DOCK_EFFECT]: [],
        [ShipSource.SALVAGE]: [],
        [ShipSource.UNKNOWN]: [],
    };

    shipDefinitions.forEach(shipDefinition => {
        result[shipDefinition.source].push(shipDefinition);
    });

    return result;
}

function isRowFiltered(filter: ShipFilterState): boolean {
    return [ShipRow.FRONT, ShipRow.MIDDLE, ShipRow.BACK].some(row => filter[row] === true);
}

function isShipTypeFiltered(filter: ShipFilterState): boolean {
    return Object.keys(shipTypes).some(type => filter[type as ShipType] === true);
}

function isShipSourceFiltered(filter: ShipFilterState): boolean {
    return Object.keys(shipSources).some(source => filter[source as unknown as ShipSource] === true);
}

function isManufacturerFiltered(filter: ShipFilterState): boolean {
    return [
        Manufacturer.JUPITER_INDUSTRIES,
        Manufacturer.NOMA_SHIPPING_GROUP,
        Manufacturer.ANTONIOS_CONSORTIUM,
        Manufacturer.DAWN_ACCORD,
        Manufacturer.HAYREDDIN_CLAN,
        Manufacturer.THUNDERBOLT_GROUP,
    ].some(manufacturer => filter[manufacturer] === true);
}

function isResearchManufacturerFiltered(filter: ShipFilterState): boolean {
    return [
        ResearchManufacturer.JUPITER_INDUSTRIES,
        ResearchManufacturer.NOMA_SHIPPING_GROUP,
        ResearchManufacturer.ANTONIOS_CONSORTIUM,
        ResearchManufacturer.DAWN_ACCORD,
    ].some(manufacturer => filter[manufacturer] === true);
}

function isResearchStrategyTypeFiltered(filter: ShipFilterState): boolean {
    return [
        ResearchStrategyType.OUTSTANDING_FIREPOWER,
        ResearchStrategyType.SUSTAINED_COMBAT,
        ResearchStrategyType.STRATEGY_AND_SUPPORT,
        ResearchStrategyType.FIGHTER_AND_CORVETTE,
    ].some(type => filter[type] === true);
}

function isResearchTacticTypeFiltered(filter: ShipFilterState): boolean {
    return [ResearchTacticType.PROJECTILE_WEAPONS, ResearchTacticType.DIRECT_FIRE_WEAPONS].some(type => filter[type] === true);
}

export function extractPossesssedShips(
    shipDefinitions: IShipDefinition[],
    shipSetting: ShipSettingState,
): IShipDefinition[] {
    return shipDefinitions.filter(shipDefinition => shipSetting[shipDefinition.id]?.possession === PossessionState.POSSESSED);
}

export function extractWishedShips(
    shipDefinitions: IShipDefinition[],
    userSettings: IUserSettings,
): IShipDefinition[] {
    return shipDefinitions.filter(shipDefinition => {
        if (getWantedModules(shipDefinition, userSettings).length > 0) {
            return true;
        }

        return userSettings.ships[shipDefinition.id]?.wish === WishState.WANTED;
    });
}

export function extractUnwishedShipsByUser(
    shipDefinitions: IShipDefinition[],
    shipSetting: ShipSettingState,
): IShipDefinition[] {
    return shipDefinitions.filter(shipDefinition => {
        return isShipObtainableThroughTechFile(shipDefinition.id)
            && shipSetting[shipDefinition.id]?.wish === WishState.NOT_WANTED;
    });
}

export function extractUnwishedShipsByData(
    shipDefinitions: IShipDefinition[],
    userSettings: IUserSettings,
): IShipDefinition[] {
    const shipsFromTechFile = shipDefinitions.filter(shipDefinition => shipDefinition.source === ShipSource.TECH_FILE || shipDefinition.source === ShipSource.STARTER_SHIP);
    const possessedShips = shipsFromTechFile.filter(shipDefinition => userSettings.ships[shipDefinition.id]?.possession === PossessionState.POSSESSED);

    // unbeneficial ships
    return possessedShips.filter(shipDefinition => {
        // we exclude ships if additional system modules are obtainable
        if (!!shipDefinition.modules && getAcquirableModules(shipDefinition, userSettings).length > 0) {
            return false;
        }

        // we exclude sub models
        if (!!shipDefinition.baseModelId) {
            return false;
        }

        // we exclude ships if non-unwished sub models are obtainable
        if (!!shipDefinition.subModelIds || !!shipDefinition.baseModelId) {
            const allRelatedSubModelIds = shipDefinition.subModelIds ?? getShipDefinitionById(shipDefinition.baseModelId!)?.subModelIds ?? [];
            if (!isPosessionDefinedForAll(allRelatedSubModelIds, userSettings.ships)) {
                return false; // we don't know if sub models are obtainable
            }

            const allObtainableSubModelIds = allRelatedSubModelIds.filter(subModelId => {
                return isShipObtainableThroughTechFile(subModelId) && !!userSettings.ships[subModelId] && userSettings.ships[subModelId].possession !== PossessionState.POSSESSED;
            });

            const allObtainableNonUnwishedSubModelIds = allObtainableSubModelIds.filter(subModelId => {
                return userSettings.ships[subModelId].wish !== WishState.NOT_WANTED;
            });

            return allObtainableNonUnwishedSubModelIds.length > 0 ? false : true;
        }

        return true;
    });
}

function isPosessionDefinedForAll(shipIds: string[], shipSetting: ShipSettingState): boolean {
    return　shipIds.length > 0 && shipIds.every(shipId => !!(shipSetting[shipId]?.possession));
}
