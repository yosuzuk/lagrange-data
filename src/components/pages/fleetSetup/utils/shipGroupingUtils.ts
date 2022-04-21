import { ShipRow } from '../../../../types/ShipRow';
import { ShipType } from '../../../../types/ShipType';
import { translateShipRow } from '../../../../utils/shipRowUtils';
import { shipTypeToSortValue, translateShipType } from '../../../../utils/shipTypeUtils';
import { normalizeSortFn } from '../../../table';
import { IFleetSetup, IShipSelection, ICarriedShipSelection } from '../types/IFleetSetup';
import { IGroupedShips, IShipGroup } from '../types/IGroupedShips';

export enum GroupAndSortOption {
    GROUP_BY_ROW_SORT_BY_TYPE_AND_NAME = 'groupByRowSortByTypeAndName',
    GROUP_BY_TYPE_SORT_BY_NAME = 'groupByTypeSortByName',
    SORT_BY_TYPE_AND_NAME = 'sortByTypeAndName',
    SORT_BY_NAME = 'sortByName',
};

const sortNumberPerReinforcementType = {
    initial: 0,
    self: 1,
    ally: 2,
    ally2: 3,
    ally3: 4,
} as const;

type SortableByShipDefinition = IShipSelection | ICarriedShipSelection;

const sortByReinforcementType = (a: SortableByShipDefinition, b: SortableByShipDefinition) => {
    return sortNumberPerReinforcementType[a.reinforcement ?? 'initial'] - sortNumberPerReinforcementType[b.reinforcement ?? 'initial'];
};

const sortByName = normalizeSortFn<SortableByShipDefinition>([
    (a: SortableByShipDefinition, b: SortableByShipDefinition) => a.shipDefinition.name.localeCompare(b.shipDefinition.name, 'ja-JP'),
    sortByReinforcementType,
]);

const sortByTypeAndName = normalizeSortFn<SortableByShipDefinition>([
    (a, b) => shipTypeToSortValue(a.shipDefinition.type, a.shipDefinition.subType) - shipTypeToSortValue(b.shipDefinition.type, b.shipDefinition.subType),
    sortByName,
    sortByReinforcementType,
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
                    ships: fleetSetup.ships
                        .map(ship => ({
                            ...ship,
                            carriedShips: [...ship.carriedShips].sort(sortByTypeAndName),
                        }))
                        .sort(sortByTypeAndName),
                    count: fleetSetup.ships.map(s => s.count).reduce((sum, count) => sum + count, 0),
                }],
            };
        }
        case GroupAndSortOption.SORT_BY_NAME: {
            return {
                groupedBy: groupCriteria,
                groups: [{
                    id: 'all',
                    name: '編成',
                    ships: fleetSetup.ships
                        .map(ship => ({
                            ...ship,
                            carriedShips: [...ship.carriedShips].sort(sortByName),
                        }))
                        .sort(sortByName),
                    count: fleetSetup.ships.map(s => s.count).reduce((sum, count) => sum + count, 0),
                }],
            };
        }
        default: {
            throw new Error(`Unknown group and sort option "${groupCriteria}"`);
        }
    }
}

function createShipGroupsByRow(shipSelections: IShipSelection[]): IShipGroup[] {
    return [ShipRow.FRONT, ShipRow.MIDDLE, ShipRow.BACK].map(shipRow => {
        const ships = shipSelections
            .filter(ship => ship.shipDefinition.row === shipRow)
            .map(ship => ({
                ...ship,
                carriedShips: [...ship.carriedShips].sort(sortByTypeAndName),
            }))
            .sort(sortByTypeAndName);

        const count = ships.map(s => s.count).reduce((sum, count) => sum + count, 0);
        return {
            id: shipRow,
            name: translateShipRow(shipRow),
            ships,
            count,
        };
    });
}

function createShipGroupsByType(shipSelections: IShipSelection[]): IShipGroup[] {
    return [
        ShipType.CARRIER,
        ShipType.BATTLE_CRUISER,
        ShipType.CRUISER,
        ShipType.DESTROYER,
        ShipType.FRIGATE,
    ].map(shipType => {
        const ships = shipSelections
            .filter(ship => ship.shipDefinition.type === shipType)
            .map(ship => ({
                ...ship,
                carriedShips: [...ship.carriedShips].sort(sortByName),
            }))
            .sort(sortByName);

        const count = ships.map(s => s.count).reduce((sum, count) => sum + count, 0);
        return {
            id: shipType,
            name: translateShipType(shipType),
            ships,
            count,
        };
    });
}

export function formatGroupedShipsForSharing(fleetSetup: IFleetSetup, groupedShips: IGroupedShips): string {
    return [
        fleetSetup.name,
        groupedShips.groups.filter(shipGroup => shipGroup.ships.length > 0).map(shipGroup => {
            return [
                ...(groupedShips.groups.length > 1 ? [`【${shipGroup.name}】`] : []),
                ...shipGroup.ships.flatMap(ship => {
                    const cost = ship.count * ship.shipDefinition.cost;
                    switch (ship.reinforcement) {
                        case 'self': {
                            return [
                                `${ship.count}×　${ship.shipDefinition.name}（増援）`,
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        case 'ally': {
                            return [
                                `${ship.count}×　${ship.shipDefinition.name}（ユニオン増援Ａ）`,
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        case 'ally2': {
                            return [
                                `${ship.count}×　${ship.shipDefinition.name}（ユニオン増援Ｂ）`,
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        case 'ally3': {
                            return [
                                `${ship.count}×　${ship.shipDefinition.name}（ユニオン増援Ｃ）`,
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        default: {
                            return [
                                `${ship.count}×　${ship.shipDefinition.name}（${cost}Pt）`,
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                    }
                }),
            ].join('\n');
        }).join('\n\n'),
        [
            `増援：${fleetSetup.totalReinforcementCount}/${fleetSetup.maxReinforcement}`,
            `指令Pt：${fleetSetup.totalCost}/${fleetSetup.maxCost}`,
        ].join('\n'),
    ].join('\n\n');
}

function formatCarriedShipsForSharing(carriedShips: ICarriedShipSelection[]): string[] {
    return carriedShips.map(ship => {
        return `　　${ship.count}×　${ship.shipDefinition.name}`;
    });
}
