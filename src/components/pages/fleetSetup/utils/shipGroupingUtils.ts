import { ShipRow } from '../../../../types/ShipRow';
import { ShipType } from '../../../../types/ShipType';
import { translateShipRow } from '../../../../utils/shipRowUtils';
import { shipTypeToSortValue, translateShipType } from '../../../../utils/shipTypeUtils';
import { normalizeSortFn } from '../../../table';
import { IFleetSetup, IShipSelection } from '../types/IFleetSetup';
import { IGroupedShips, IShipGroup } from '../types/IGroupedShips';

export enum GroupAndSortOption {
    GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME = 'groupByRowSortByTypeAndName',
    GROUP_BY_TYPE_SORT_BY_NAME = 'groupByTypeSortByName',
    SORT_BY_TYPE_AND_NAME = 'sortByTypeAndName',
    SORT_BY_NAME = 'sortByName',
};

const sortByName = (a: IShipSelection, b: IShipSelection) => a.shipDefinition.name.localeCompare(b.shipDefinition.name, 'ja-JP');

const sortByTypeAndName = normalizeSortFn<IShipSelection>([
    (a, b) => shipTypeToSortValue(a.shipDefinition.type, a.shipDefinition.subType) - shipTypeToSortValue(b.shipDefinition.type, b.shipDefinition.subType),
    sortByName,
]);

export function groupShipsBy(groupCriteria: string, fleetSetup: IFleetSetup): IGroupedShips {
    switch (groupCriteria) {
        case GroupAndSortOption.GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME: {
            return {
                groupedBy: groupCriteria,
                groups: createShipGroupsByRow(fleetSetup.ships),
            };
        }
        case GroupAndSortOption.GROUP_BY_TYPE_SORT_BY_NAME: {
            return {
                groupedBy: groupCriteria,
                groups: createShipGroupsByType(fleetSetup.ships),
            };
        }
        case GroupAndSortOption.SORT_BY_TYPE_AND_NAME: {
            return {
                groupedBy: groupCriteria,
                groups: [{
                    id: 'all',
                    name: '編成',
                    ships: [...fleetSetup.ships].sort(sortByTypeAndName),
                }],
            };
        }
        case GroupAndSortOption.SORT_BY_NAME: {
            return {
                groupedBy: groupCriteria,
                groups: [{
                    id: 'all',
                    name: '編成',
                    ships: [...fleetSetup.ships].sort(sortByName),
                }],
            };
        }
        default: {
            throw new Error(`Unknown group and sort option "${groupCriteria}"`);
        }
    }
}

function createShipGroupsByRow(shipSelections: IShipSelection[]): IShipGroup[] {
    return [ShipRow.FRONT, ShipRow.MIDDLE, ShipRow.BACK].map(shipRow => ({
        id: shipRow,
        name: translateShipRow(shipRow),
        ships: [
            ...shipSelections.filter(ship => ship.shipDefinition.row === shipRow),
        ].sort(sortByTypeAndName),
    }));
}

function createShipGroupsByType(shipSelections: IShipSelection[]): IShipGroup[] {
    return [
        ShipType.CARRIER,
        ShipType.BATTLE_CRUISER,
        ShipType.CRUISER,
        ShipType.DESTROYER,
        ShipType.FRIGATE,
    ].map(shipType => ({
        id: shipType,
        name: translateShipType(shipType),
        ships: [
            ...shipSelections.filter(ship => ship.shipDefinition.type === shipType),
        ].sort(sortByName),
    }));
}