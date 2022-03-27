import { IShipDefinition, ISystemModule } from '../../../../types/ShipDefinition';
import { ShipSubType } from '../../../../types/ShipType';
import { PossessionState } from '../../../../userSettings/types/PossessionState';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getShipDefinitionById } from '../../../../utils/shipDefinitionUtils';
import { ICarriedShipSelection, ICarrierCapabilities, IFleetSetup, IMinifiedFleetSetup, IModuleSelection, IShipSelection, ReinforcementType } from '../types/IFleetSetup';

export function getCurrentFleetSetups(userSettings: IUserSettings): IFleetSetup[] {
    return [
        restoreFleetSetup('fleet1', userSettings) ?? createFleetSetup(1),
        restoreFleetSetup('fleet2', userSettings) ?? createFleetSetup(2),
        restoreFleetSetup('fleet3', userSettings) ?? createFleetSetup(3),
        restoreFleetSetup('fleet4', userSettings) ?? createFleetSetup(4),
        restoreFleetSetup('fleet5', userSettings) ?? createFleetSetup(5),
    ];
}

export function saveFleetSetup(fleetSetup: IFleetSetup) {
    const serializedFleetSetup = JSON.stringify(minifyFleetSetup(fleetSetup));
    window.localStorage.setItem(fleetSetup.key, serializedFleetSetup);
}

function restoreFleetSetup(storageKey: string, userSettings: IUserSettings): IFleetSetup | null {
    const serializedFleetSetup = window.localStorage.getItem(storageKey);
    if (!serializedFleetSetup) {
        return null;
    }

    const minifiedFleetSetup = parseFleetSetup(serializedFleetSetup);
    return minifiedFleetSetup ? unminifyFleetSetup(minifiedFleetSetup, storageKey, userSettings) : null;
}

function unminifyFleetSetup(minifiedFleetSetup: IMinifiedFleetSetup, storageKey: string, userSettings: IUserSettings): IFleetSetup {
    const myListOnly = minifiedFleetSetup.myListOnly === true;

    const ships = minifiedFleetSetup.ships.map(minifiedShipSelection => ({
        ...createShipSelection({
            shipDefinition: getShipDefinitionById(minifiedShipSelection.shipId),
            usedModules: minifiedShipSelection.usedModules ?? null,
            count: minifiedShipSelection.count,
            reinforcement: minifiedShipSelection.reinforcement,
            userSettings,
            maxReinforcement: minifiedFleetSetup.maxReinforcement,
            myListOnly,
        }),
        carriedShips: minifiedShipSelection.carriedShips.map(carriedShip => createCarriedShipSelection({
            shipId: carriedShip.shipId,
            count: carriedShip.count,
            reinforcement: minifiedShipSelection.reinforcement,
        })),
    }));

    return {
        key: storageKey,
        name: minifiedFleetSetup.name,
        ships,
        totalCost: getTotalCost(ships),
        totalReinforcementCount: getTotalReinforcementCount(ships),
        maxReinforcement: minifiedFleetSetup.maxReinforcement,
        maxCost: minifiedFleetSetup.maxCost,
        myListOnly,
    };
}

function minifyFleetSetup(fleetSetup: IFleetSetup): IMinifiedFleetSetup {
    return {
        name: fleetSetup.name,
        ships: fleetSetup.ships.map(shipSelection => ({
            shipId: shipSelection.shipDefinition.id,
            usedModules: shipSelection.moduleSelection ? extractUsedModules(shipSelection.moduleSelection) : undefined,
            carriedShips: shipSelection.carriedShips.map(carriedShipSelection => ({
                shipId: carriedShipSelection.shipDefinition.id,
                count: carriedShipSelection.count,
            })),
            count: shipSelection.count,
            reinforcement: shipSelection.reinforcement,
        })),
        maxReinforcement: fleetSetup.maxReinforcement,
        maxCost: fleetSetup.maxCost,
        myListOnly: fleetSetup.myListOnly,
    }
}

function extractUsedModules(moduleSelection: IModuleSelection): string[] {
    const usedModules: string[] = [];
    Object.keys(moduleSelection.groups).forEach(groupId => {
        Object.keys(moduleSelection.groups[groupId]).forEach(moduleId => {
            if (moduleSelection.groups[groupId][moduleId].usage === 'used') {
                usedModules.push(moduleSelection.groups[groupId][moduleId].module.id);
            }
        });
    });
    return usedModules;
}

function parseFleetSetup(serializedFleetSetup: string): IMinifiedFleetSetup | null {
    try {
        return JSON.parse(serializedFleetSetup) as IMinifiedFleetSetup;
    } catch (e) {
        alert('ERROR - Failed to restore fleet setup');
        console.error(e);
        return null;
    }
}

export function createFleetSetup(fleetNumber: number): IFleetSetup {
    return {
        key: `fleet${fleetNumber}`,
        name: `${fleetNumber}号艦隊`,
        ships: [],
        totalCost: 0,
        totalReinforcementCount: 0,
        maxReinforcement: 5,
        maxCost: 400,
        myListOnly: true,
    };
}

interface ICreateShipSelectionArgs {
    shipDefinition: IShipDefinition;
    usedModules: string[] | null;
    count: number;
    reinforcement: ReinforcementType | null;
    userSettings: IUserSettings;
    maxReinforcement: number;
    myListOnly: boolean;
    temporary?: boolean;
}

export function createShipSelection(args: ICreateShipSelectionArgs): IShipSelection {
    const { shipDefinition, usedModules, count, reinforcement, userSettings, maxReinforcement, myListOnly, temporary } = args;

    const moduleSelection = createModuleSelection(shipDefinition, usedModules, userSettings, reinforcement, myListOnly);
    const carrierCapabilities = createCarrierCapabilities(shipDefinition, moduleSelection);

    const maxCount = reinforcement === null
        ? shipDefinition.operationLimit
        : Math.min(shipDefinition.operationLimit, maxReinforcement);

    return {
        shipDefinition,
        carrierCapabilities,
        carriedShips: [],
        count: Math.max(0, count),
        reinforcement,
        maxCount,
        moduleSelection,
        temporary,
    };
}

function createModuleSelection(
    shipDefinition: IShipDefinition,
    usedModules: string[] | null,
    userSettings: IUserSettings,
    reinforcement: ReinforcementType | null,
    myListOnly: boolean,
): IModuleSelection | null {
    if (!shipDefinition.modules || shipDefinition.modules.length === 0) {
        return null;
    }

    const restoredUsedModules = usedModules ?? shipDefinition.modules.filter(module => module.defaultModule).map(module => module.id);

    const result: IModuleSelection = {
        static: shipDefinition.staticModules === true,
        groups: {},
    };

    shipDefinition.modules.forEach((module: ISystemModule) => {
        if (!result.groups[module.category]) {
            result.groups[module.category] = {};
        }

        if (result.static) {
            result.groups[module.category][module.id] = {
                module,
                usage: 'used',
            };
            return;
        }

        if (module.defaultModule || !myListOnly || reinforcement === 'ally' || userSettings.modules[module.id].possession === PossessionState.POSSESSED) {
            result.groups[module.category][module.id] = {
                module,
                usage: restoredUsedModules.includes(module.id) ? 'used' : 'not_used',
            };
            return;
        }

        result.groups[module.category][module.id] = {
            module,
            usage: 'not_possessed',
        };
    });

    return result;
}

function createCarrierCapabilities(shipDefinition: IShipDefinition, moduleSelection: IModuleSelection | null): ICarrierCapabilities {

    let carryUpToLargeFighter = 0;
    let carryUpToMediumFighter = 0;
    let carryUpToSmallFighter = 0;
    let carryCorvette = shipDefinition.carryCorvette ?? 0;

    if (shipDefinition.carryFighter) {
        switch (shipDefinition.carryFighterType) {
            case ShipSubType.LARGE_FIGHTER: {
                carryUpToLargeFighter += shipDefinition.carryFighter;
                break;
            }
            case ShipSubType.MEDIUM_FIGHTER: {
                carryUpToMediumFighter += shipDefinition.carryFighter;
                break;
            }
            case ShipSubType.SMALL_FIGHTER: {
                carryUpToSmallFighter += shipDefinition.carryFighter;
                break;
            }
        }
    }

    if (moduleSelection) {
        Object.keys(moduleSelection.groups).forEach((groupId: string) => {
            Object.keys(moduleSelection.groups[groupId] ?? {}).forEach((moduleId: string) => {
                const moduleUsage = moduleSelection.groups[groupId][moduleId];
                if (moduleUsage.usage === 'used') {
                    switch (moduleUsage.module.carryFighterType) {
                        case ShipSubType.LARGE_FIGHTER: {
                            carryUpToLargeFighter += moduleUsage.module.carryFighter ?? 0;
                            break;
                        }
                        case ShipSubType.MEDIUM_FIGHTER: {
                            carryUpToMediumFighter += moduleUsage.module.carryFighter ?? 0;
                            break;
                        }
                        case ShipSubType.SMALL_FIGHTER: {
                            carryUpToSmallFighter += moduleUsage.module.carryFighter ?? 0;
                            break;
                        }
                    }
                    carryCorvette += moduleUsage.module.carryCorvette ?? 0;
                }
            });
        });
    }

    return {
        canCarry: carryUpToLargeFighter + carryUpToMediumFighter + carryUpToSmallFighter + carryCorvette > 0,
        carryUpToLargeFighter,
        carryUpToMediumFighter,
        carryUpToSmallFighter,
        carryCorvette,
    };
}

interface ICreateCarriedShipSelectionArgs {
    shipId: string;
    count: number;
    reinforcement: ReinforcementType | null;
    temporary?: boolean;
}

function createCarriedShipSelection(args: ICreateCarriedShipSelectionArgs): ICarriedShipSelection {
    const { shipId, count, reinforcement, temporary } = args;
    const shipDefinition = getShipDefinitionById(shipId);
    return {
        shipDefinition,
        count: Math.max(0, count),
        reinforcement,
        temporary,
    };
}

export interface IApplyShipCountArgs {
    shipId: string;
    count: number;
    reinforcement: ReinforcementType | null;
    fleetSetup: IFleetSetup;
    userSettings: IUserSettings;
    keepZero?: true;
}

export function applyShipCount(args: IApplyShipCountArgs): IFleetSetup {
    const { shipId, count, reinforcement, fleetSetup, userSettings, keepZero } = args;
    const shipDefinition = getShipDefinitionById(shipId);

    let isNewSelection = true;

    const newFleetSetup: IFleetSetup = {
        ...fleetSetup,
        ships: fleetSetup.ships.flatMap((shipSelection) => {
            if (shipSelection.shipDefinition.id !== shipId || shipSelection.reinforcement !== reinforcement) {
                return shipSelection;
            }

            isNewSelection = false;
            return (!keepZero && count <= 0) ? [] : [{
                ...shipSelection,
                count,
            }];
        }),
    };

    if (!isNewSelection) {
        return {
            ...newFleetSetup,
            totalCost: getTotalCost(newFleetSetup.ships),
            totalReinforcementCount: getTotalReinforcementCount(newFleetSetup.ships),
        };
    }

    return {
        ...newFleetSetup,
        ships: [
            ...newFleetSetup.ships,
            createShipSelection({
                shipDefinition,
                usedModules: null,
                count,
                reinforcement,
                userSettings,
                maxReinforcement: fleetSetup.maxReinforcement,
                myListOnly: fleetSetup.myListOnly,
            }),
        ],
        totalCost: getTotalCost(newFleetSetup.ships),
        totalReinforcementCount: getTotalReinforcementCount(newFleetSetup.ships),
    };
}

export interface IApplyCarriedShipCountArgs {
    shipId: string;
    carrierShipId: string;
    count: number;
    reinforcement: ReinforcementType | null;
    fleetSetup: IFleetSetup;
    keepZero?: true;
}

export function applyCarriedShipCount(args: IApplyCarriedShipCountArgs): IFleetSetup {
    const { shipId, carrierShipId, count, reinforcement, fleetSetup, keepZero } = args;

    return {
        ...fleetSetup,
        ships: fleetSetup.ships.map(shipSelection => {
            if (shipSelection.shipDefinition.id !== carrierShipId || shipSelection.reinforcement !== reinforcement) {
                return shipSelection;
            }

            if (!shipSelection.carriedShips.find(carriedShipSelection => carriedShipSelection.shipDefinition.id === shipId)) {
                return {
                    ...shipSelection,
                    carriedShips: [...shipSelection.carriedShips, createCarriedShipSelection({ shipId, count, reinforcement })],
                };
            }

            return {
                ...shipSelection,
                carriedShips: shipSelection.carriedShips.flatMap(carriedShipSelection => {
                    if (carriedShipSelection.shipDefinition.id !== shipId) {
                        return [carriedShipSelection];
                    }

                    if (carriedShipSelection.reinforcement !== reinforcement) {
                        throw new Error('Detected invalid reinforcement');
                    }

                    return (!keepZero && count <= 0) ? [] : [{
                        ...carriedShipSelection,
                        count: Math.max(0, count),
                        reinforcement,
                    }];
                }),
            };
        })
    };
}

function getTotalCost(ships: IShipSelection[]): number {
    return ships.filter(ship => ship.reinforcement === null)
        .map(ship => ship.count * ship.shipDefinition.cost)
        .reduce((sum, cost) => sum + cost, 0);
}

function getTotalReinforcementCount(ships: IShipSelection[]): number {
    return ships
        .filter(ship => ship.reinforcement !== null)
        .map(ship => ship.count)
        .reduce((sum, count) => sum + count, 0);
}
