import { IFilterOption } from './types/IFilterOption';
import { ShipRow } from '../../types/ShipRow';
import { ShipType } from '../../types/ShipType';
import { shipTypes } from '../../utils/shipTypeUtils';
import { translateShipRow } from '../../utils/shipRowUtils';
import { ShipFilterState, FilterKey } from './types/ShipFilterState';
import { IShipDefinition } from '../../types/ShipDefinition';
import { ShipSettingState } from '../../userSettings/types/UserSettings';
import { PossessionState } from '../../userSettings/types/PossessionState';
import { WishState } from '../../userSettings/types/WishState';
import { getShipDefinitionById, isShipObtainableThroughTechFile } from '../../utils/shipDefinitionUtils';
import { ShipSource } from '../../types/ShipSource';

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

interface ICreateShipFilterOptionsArgs {
    shipRows?: ShipRow[],
    shipTypes?: ShipType[],
}

export function createShipFilterOptions(args: ICreateShipFilterOptionsArgs = {}): IFilterOption[] {
    return [
        ...createShipRowFilterOptions(args.shipRows ?? null),
        ...createShipTypeFilterOptions(args.shipTypes ?? null),
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

export function extractPossesssedShips(
    shipDefinitions: IShipDefinition[],
    shipSetting: ShipSettingState,
): IShipDefinition[] {
    return shipDefinitions.filter(shipDefinition => shipSetting[shipDefinition.id]?.possession === PossessionState.POSSESSED);
}

export function extractWishedShips(
    shipDefinitions: IShipDefinition[],
    shipSetting: ShipSettingState,
): IShipDefinition[] {
    return shipDefinitions.filter(shipDefinition => shipSetting[shipDefinition.id]?.wish === WishState.WANTED);
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
