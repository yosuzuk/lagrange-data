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
import { getWantedModules } from '../../userSettings/utils/userSettingsUtils';

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
    return (specificManufacturer ?? [Manufacturer.JUPITER_INDUSTRIES, Manufacturer.NOMA_SHIPPING_GROUP, Manufacturer.ANTONIOS_CONSORTIUM, Manufacturer.DAWN_ACCORD]).map(manufacturer => ({
        filterKey: manufacturer as Manufacturer,
        name: translateManufacturer(manufacturer),
    }));
}

export function createResearchManufacturerFilterOptions(specificResearchManufacturer: ResearchManufacturer[] | null): IFilterOption[] {
    return (specificResearchManufacturer ?? [ResearchManufacturer.JUPITER_INDUSTRIES, ResearchManufacturer.NOMA_SHIPPING_GROUP, ResearchManufacturer.ANTONIOS_CONSORTIUM, ResearchManufacturer.DAWN_ACCORD]).map(manufacturer => ({
        filterKey: manufacturer as ResearchManufacturer,
        name: `委託企業：${translateResearchManufacturer(manufacturer)}`,
    }));
}

export function createResearchStrategyTypeFilterOptions(specificResearchStrategyTypes: ResearchStrategyType[] | null): IFilterOption[] {
    return (specificResearchStrategyTypes ?? [ResearchStrategyType.OUTSTANDING_FIREPOWER, ResearchStrategyType.SUSTAINED_COMBAT, ResearchStrategyType.STRATEGY_AND_SUPPORT, ResearchStrategyType.FIGHTER_AND_CORVETTE]).map(type => ({
        filterKey: type as ResearchStrategyType,
        name: `戦略能力：${translateResearchStrategyType(type)}`,
    }));
}

export function createResearchTacticTypeFilterOptions(specificResearchTacticTypes: ResearchTacticType[] | null): IFilterOption[] {
    return (specificResearchTacticTypes ?? [ResearchTacticType.PROJECTILE_WEAPONS, ResearchTacticType.DIRECT_FIRE_WEAPONS]).map(type => ({
        filterKey: type as ResearchTacticType,
        name: `戦術性能：${translateResearchTacticType(type)}`,
    }));
}

interface ICreateShipFilterOptionsArgs {
    shipRows?: ShipRow[],
    shipTypes?: ShipType[],
    manufacturer?: Manufacturer[],
    researchManufacturer?: ResearchManufacturer[] | false,
    researchStrategyTypes?: ResearchStrategyType[] | false,
    researchTacticTypes?: ResearchTacticType[] | false,
}

export function createShipFilterOptions(args: ICreateShipFilterOptionsArgs = {}): IFilterOption[] {
    return [
        ...createShipRowFilterOptions(args.shipRows ?? null),
        ...createShipTypeFilterOptions(args.shipTypes ?? null),
        ...createManufacturerFilterOptions(args.manufacturer ?? null),
        ...(args.researchManufacturer === false ? [] : createResearchManufacturerFilterOptions(args.researchManufacturer ?? null)),
        ...(args.researchStrategyTypes === false ? [] : createResearchStrategyTypeFilterOptions(args.researchStrategyTypes ?? null)),
        ...(args.researchTacticTypes === false ? [] : createResearchTacticTypeFilterOptions(args.researchTacticTypes ?? null)),
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
        [ResearchManufacturer.JUPITER_INDUSTRIES]: false,
        [ResearchManufacturer.NOMA_SHIPPING_GROUP]: false,
        [ResearchManufacturer.ANTONIOS_CONSORTIUM]: false,
        [ResearchManufacturer.DAWN_ACCORD]: false,
        [ResearchStrategyType.OUTSTANDING_FIREPOWER]: false,
        [ResearchStrategyType.SUSTAINED_COMBAT]: false,
        [ResearchStrategyType.STRATEGY_AND_SUPPORT]: false,
        [ResearchStrategyType.FIGHTER_AND_CORVETTE]: false,
        [ResearchTacticType.PROJECTILE_WEAPONS]: false,
        [ResearchTacticType.DIRECT_FIRE_WEAPONS]: false,
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
    return result;
}

export function separateShipsBySource(shipDefinitions: IShipDefinition[]): Record<ShipSource, IShipDefinition[]> {
    const result: Record<ShipSource, IShipDefinition[]> = {
        [ShipSource.STARTER_SHIP]: [],
        [ShipSource.TECH_FILE]: [],
        [ShipSource.CITY_TRADE]: [],
        [ShipSource.DOCK_EFFECT]: [],
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

function isManufacturerFiltered(filter: ShipFilterState): boolean {
    return [
        Manufacturer.JUPITER_INDUSTRIES,
        Manufacturer.NOMA_SHIPPING_GROUP,
        Manufacturer.ANTONIOS_CONSORTIUM,
        Manufacturer.DAWN_ACCORD,
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
    shipSetting: ShipSettingState,
): IShipDefinition[] {
    const shipsFromTechFile = shipDefinitions.filter(shipDefinition => shipDefinition.source === ShipSource.TECH_FILE || shipDefinition.source === ShipSource.STARTER_SHIP);
    const possessedShips = shipsFromTechFile.filter(shipDefinition => shipSetting[shipDefinition.id]?.possession === PossessionState.POSSESSED);

    // unbeneficial ships
    return possessedShips.filter(shipDefinition => {
        // we exclude ships if additional system modules are obtainable
        if (!!shipDefinition.modules && shipDefinition.modules.length > 0) {
            return false;
        }

        // we exclude sub models
        if (!!shipDefinition.baseModelId) {
            return false;
        }

        // we exclude ships if non-unwished sub models are obtainable
        if (!!shipDefinition.subModelIds || !!shipDefinition.baseModelId) {
            const allRelatedSubModelIds = shipDefinition.subModelIds ?? getShipDefinitionById(shipDefinition.baseModelId!)?.subModelIds ?? [];
            if (!isPosessionDefinedForAll(allRelatedSubModelIds, shipSetting)) {
                return false; // we don't know if sub models are obtainable
            }

            const allObtainableSubModelIds = allRelatedSubModelIds.filter(subModelId => {
                return isShipObtainableThroughTechFile(subModelId) && !!shipSetting[subModelId] && shipSetting[subModelId].possession !== PossessionState.POSSESSED;
            });

            const allObtainableNonUnwishedSubModelIds = allObtainableSubModelIds.filter(subModelId => {
                return shipSetting[subModelId].wish !== WishState.NOT_WANTED;
            });

            return allObtainableNonUnwishedSubModelIds.length > 0 ? false : true;
        }

        return true;
    });
}

function isPosessionDefinedForAll(shipIds: string[], shipSetting: ShipSettingState): boolean {
    return　shipIds.length > 0 && shipIds.every(shipId => !!(shipSetting[shipId]?.possession));
}
