import { getCurrentLanguage, isLanguageWithWhitespace, t } from '../../../../i18n';
import { ShipRow } from '../../../../types/ShipRow';
import { ShipType } from '../../../../types/ShipType';
import { getModuleName, getShipName } from '../../../../utils/shipDefinitionUtils';
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
    (a: SortableByShipDefinition, b: SortableByShipDefinition) => getShipName(a.shipDefinition).localeCompare(getShipName(b.shipDefinition), getCurrentLanguage()),
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
                    name: t('fleetSetup.fleetFormation'),
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
                    name: t('fleetSetup.fleetFormation'),
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
        ShipType.AUXILIARY,
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
    const spacing = isLanguageWithWhitespace() ? ' ' : '';
    return [
        fleetSetup.name,
        groupedShips.groups.filter(shipGroup => shipGroup.ships.length > 0).map(shipGroup => {
            return [
                ...(groupedShips.groups.length > 1 ? [t('fleetSetup.groupNameForSharing', { name: shipGroup.name })] : []),
                ...shipGroup.ships.flatMap(ship => {
                    const cost = ship.count * ship.shipDefinition.cost;
                    const changedModulesLine = formatChangedSystemModules(ship);
                    switch (ship.reinforcement) {
                        case 'self': {
                            return [
                                `${formatCount(ship.count)}×　${getShipName(ship.shipDefinition)}${spacing}${t('fleetSetup.reinforcementBrackets')}`,
                                ...(changedModulesLine ? [changedModulesLine] : []),
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        case 'ally': {
                            return [
                                `${formatCount(ship.count)}×　${getShipName(ship.shipDefinition)}${spacing}${t('fleetSetup.orgReinforcementABrackets')}`,
                                ...(changedModulesLine ? [changedModulesLine] : []),
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        case 'ally2': {
                            return [
                                `${formatCount(ship.count)}×　${getShipName(ship.shipDefinition)}${spacing}${t('fleetSetup.orgReinforcementBBrackets')}`,
                                ...(changedModulesLine ? [changedModulesLine] : []),
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        case 'ally3': {
                            return [
                                `${formatCount(ship.count)}×　${getShipName(ship.shipDefinition)}${spacing}${t('fleetSetup.orgReinforcementCBrackets')}`,
                                ...(changedModulesLine ? [changedModulesLine] : []),
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                        default: {
                            return [
                                `${formatCount(ship.count)}×　${getShipName(ship.shipDefinition)}${spacing}${t('fleetSetup.commandPointsValueBrackets', { value: cost })}`,
                                ...(changedModulesLine ? [changedModulesLine] : []),
                                ...formatCarriedShipsForSharing(ship.carriedShips),
                            ];
                        }
                    }
                }),
            ].join('\n');
        }).join('\n\n'),
        [
            `${t('fleetSetup.reinforcementColon')}${spacing}${fleetSetup.totalReinforcementCount}/${fleetSetup.maxReinforcement}`,
            `${t('label.commandPointsColon')}${spacing}${fleetSetup.totalCost}/${fleetSetup.maxCost}`,
        ].join('\n'),
    ].join('\n\n');
}

function formatCarriedShipsForSharing(carriedShips: ICarriedShipSelection[]): string[] {
    return carriedShips.map(ship => {
        return `　　 ${formatCount(ship.count)}×　${getShipName(ship.shipDefinition)}`;
    });
}

function formatChangedSystemModules(shipSelection: IShipSelection): string | null {
    if (shipSelection.moduleSelection === null) {
        return null;
    }
    const changedModuleNames = ['M', 'A', 'B', 'C', 'D', 'E', 'F'].flatMap(groupId => {
        const moduleIds = Object.keys(shipSelection.moduleSelection?.groups[groupId] ?? {});
        const usedModuleId = moduleIds.find(moduleId => shipSelection.moduleSelection?.groups[groupId][moduleId].usage === 'used');
        if (!usedModuleId) {
            return [];
        }
        const usedModule = shipSelection.moduleSelection?.groups[groupId][usedModuleId];
        if (!usedModule || usedModule.module.defaultModule) {
            return [];
        }
        return usedModule ? [`${getModuleName(shipSelection.shipDefinition.id, usedModule.module)}（${usedModule.module.id}）`] : [];
    });
    if (changedModuleNames.length === 0) {
        return null;
    }
    return changedModuleNames.map(line => `　　 ${line}`).join('\n');
}

function formatCount(count: number): string {
    return count < 10 ? `${count}`.padStart(3) : `${count}`;
}
