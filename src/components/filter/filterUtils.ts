import { IFilterOption } from './types/IFilterOption';
import { ShipRow } from '../../types/ShipRow';
import { ShipType } from '../../types/ShipType';
import { shipTypes } from '../../utils/shipTypeUtils';
import { translateShipRow } from '../../utils/shipRowUtils';
import { ShipFilterState, FilterKey } from './types/ShipFilterState';
import { ShipDefinition } from '../../types/ShipDefinition';
import { ShipSettingState } from '../../userSettings/types/UserSettings';
import { PossessionState } from '../../userSettings/types/PossessionState';
import { WishState } from '../../userSettings/types/WishState';
import { isShipObtainableThroughTechFile } from '../../utils/shipDefinitionUtils';

export function createShipRowFilterOptions(): IFilterOption[] {
    return [
        {
            filterKey: ShipRow.FRONT,
            name: translateShipRow(ShipRow.FRONT),
        },
        {
            filterKey: ShipRow.MIDDLE,
            name: translateShipRow(ShipRow.MIDDLE),
        },
        {
            filterKey: ShipRow.BACK,
            name: translateShipRow(ShipRow.BACK),
        },
    ];
}

export function createShipTypeFilterOptions(): IFilterOption[] {
    return Object.keys(shipTypes).map(type => ({
        filterKey: type as ShipType,
        name: shipTypes[type as ShipType].name,
    }));
}

export function createShipFilterOptions(): IFilterOption[] {
    return [
        ...createShipRowFilterOptions(),
        ...createShipTypeFilterOptions(),
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

export function applyShipFilter(shipDefinitions: ShipDefinition[], filter: ShipFilterState): ShipDefinition[] {
    let result = shipDefinitions;
    if (isRowFiltered(filter)) {
        result = result.filter(shipDefinition => filter[shipDefinition.row] === true);
    }
    if (isShipTypeFiltered(filter)) {
        result = result.filter(shipDefinition => filter[shipDefinition.type] === true);
    }
    return result;
}

function isRowFiltered(filter: ShipFilterState): boolean {
    return [ShipRow.FRONT, ShipRow.MIDDLE, ShipRow.BACK].some(row => filter[row] === true);
}

function isShipTypeFiltered(filter: ShipFilterState): boolean {
    return Object.keys(shipTypes).some(type => filter[type as ShipType] === true);
}

export function extractPossesssedShips(
    shipDefinitions: ShipDefinition[],
    shipSetting: ShipSettingState,
    shipFilter: ShipFilterState,
): ShipDefinition[] {
    return applyShipFilter(shipDefinitions.filter(shipDefinition => shipSetting[shipDefinition.id]?.possession === PossessionState.POSSESSED), shipFilter);
}

export function extractWishedShips(
    shipDefinitions: ShipDefinition[],
    shipSetting: ShipSettingState,
    shipFilter: ShipFilterState,
): ShipDefinition[] {
    return applyShipFilter(shipDefinitions.filter(shipDefinition => shipSetting[shipDefinition.id]?.wish === WishState.WANTED), shipFilter);
}

export function extractUnwishedShips(
    shipDefinitions: ShipDefinition[],
    shipSetting: ShipSettingState,
    shipFilter: ShipFilterState,
): ShipDefinition[] {
    const unwishedByUser = shipDefinitions.filter(shipDefinition => shipSetting[shipDefinition.id]?.wish === WishState.NOT_WANTED);

    const possessedShips = shipDefinitions.filter(shipDefinition => shipSetting[shipDefinition.id]?.possession === PossessionState.POSSESSED);
    const unbenefitialShips = possessedShips.filter(shipDefinition => {
        // ships with additional system modules are always wanted
        if (!!shipDefinition.modules && shipDefinition.modules.length > 0) {
            return false;
        }

        // we want a ship if there are sub models left, that are obtainable through tech files
        if (!!shipDefinition.subModelIds && shipDefinition.subModelIds.length > 0) {
            return !shipDefinition.subModelIds.some(subModelId => {
                if (!shipSetting[subModelId] && isShipObtainableThroughTechFile(subModelId)) {
                    return true; // assume that we want it
                }

                return shipSetting[subModelId].possession !== PossessionState.POSSESSED &&
                        shipSetting[subModelId].wish !== WishState.NOT_WANTED;
            });
        }

        return true;
    });

    return applyShipFilter([
        ...unwishedByUser,
        ...unbenefitialShips,
    ], shipFilter);
}
