import { IShipDefinition } from '../../../../types/ShipDefinition';
import { ShipSubType, ShipType } from '../../../../types/ShipType';
import { PossessionState } from '../../../../userSettings/types/PossessionState';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getShipDefinitionById } from '../../../../utils/shipDefinitionUtils';
import { ICarriedShipSelection, IFleetSetup, IMinifiedFleetSetup, IShipSelection, ReinforcementType } from '../types/IFleetSetup';

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
    const ships = minifiedFleetSetup.ships.map(minifiedShipSelection => ({
        ...createShipSelection({
            shipDefinition: getShipDefinitionById(minifiedShipSelection.shipId),
            count: minifiedShipSelection.count,
            reinforcement: minifiedShipSelection.reinforcement,
            userSettings,
            maxReinforcement: minifiedFleetSetup.maxReinforcement,
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
        myListOnly: minifiedFleetSetup.myListOnly === true,
    };
}

function minifyFleetSetup(fleetSetup: IFleetSetup): IMinifiedFleetSetup {
    return {
        name: fleetSetup.name,
        ships: fleetSetup.ships.map(shipSelection => ({
            shipId: shipSelection.shipDefinition.id,
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
    count: number;
    reinforcement: ReinforcementType | null;
    userSettings: IUserSettings;
    maxReinforcement: number;
    temporary?: boolean;
}

export function createShipSelection(args: ICreateShipSelectionArgs): IShipSelection {
    const { shipDefinition, count, reinforcement, userSettings, maxReinforcement, temporary } = args;

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

    shipDefinition.modules?.forEach((module) => {
        if (shipDefinition.staticModules || userSettings.modules[`${shipDefinition.id}.${module.id}`]?.possession === PossessionState.POSSESSED) {
            switch (module.carryFighterType) {
                case ShipSubType.LARGE_FIGHTER: {
                    carryUpToLargeFighter += module.carryFighter ?? 0;
                    break;
                }
                case ShipSubType.MEDIUM_FIGHTER: {
                    carryUpToMediumFighter += module.carryFighter ?? 0;
                    break;
                }
                case ShipSubType.SMALL_FIGHTER: {
                    carryUpToSmallFighter += module.carryFighter ?? 0;
                    break;
                }
            }
            carryCorvette += module.carryCorvette ?? 0;
        }
    });

    const maxCount = reinforcement === null
        ? shipDefinition.operationLimit
        : Math.min(shipDefinition.operationLimit, maxReinforcement);

    return {
        shipDefinition,
        carryUpToLargeFighter,
        carryUpToMediumFighter,
        carryUpToSmallFighter,
        carryCorvette,
        carriedShips: [],
        count: Math.max(0, count),
        reinforcement,
        maxCount,
        temporary,
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
                count,
                reinforcement,
                userSettings,
                maxReinforcement: fleetSetup.maxReinforcement,
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

export function canCarryShips(shipSelection: IShipSelection): boolean {
    return shipSelection.carryCorvette > 0
        || shipSelection.carryUpToLargeFighter > 0
        || shipSelection.carryUpToMediumFighter > 0
        || shipSelection.carryUpToSmallFighter > 0;
}
