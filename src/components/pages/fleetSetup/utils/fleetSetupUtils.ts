import { IShipDefinition } from '../../../../types/ShipDefinition';
import { ShipSubType } from '../../../../types/ShipType';
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
    return {
        key: storageKey,
        name: minifiedFleetSetup.name,
        ships: minifiedFleetSetup.ships.map(minifiedShipSelection => ({
            ...createShipSelection({
                shipDefinition: getShipDefinitionById(minifiedShipSelection.shipId),
                count: minifiedShipSelection.count,
                maxCount: minifiedShipSelection.maxCount,
                reinforcement: minifiedShipSelection.reinforcement,
                userSettings,
            }),
            carriedShips: minifiedShipSelection.carriedShips.map(carriedShip => createCarriedShipSelection({
                shipId: carriedShip.shipId,
                count: carriedShip.count,
                reinforcement: minifiedShipSelection.reinforcement,
            })),
        })),
        maxReinforcement: minifiedFleetSetup.maxReinforcement,
        maxCost: minifiedFleetSetup.maxCost,
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
            maxCount: shipSelection.maxCount,
            reinforcement: shipSelection.reinforcement,
        })),
        maxReinforcement: fleetSetup.maxReinforcement,
        maxCost: fleetSetup.maxCost,
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
        maxReinforcement: 5,
        maxCost: 400,
    };
}

interface ICreateShipSelectionArgs {
    shipDefinition: IShipDefinition;
    count: number;
    maxCount: number;
    reinforcement: ReinforcementType | null;
    userSettings: IUserSettings;
}

export function createShipSelection(args: ICreateShipSelectionArgs): IShipSelection {
    const { shipDefinition, count, maxCount, reinforcement, userSettings } = args;

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

    return {
        shipDefinition,
        carryUpToLargeFighter,
        carryUpToMediumFighter,
        carryUpToSmallFighter,
        carryCorvette,
        carriedShips: [],
        count: Math.max(0, count),
        maxCount,
        reinforcement,
    };
}

interface ICreateCarriedShipSelectionArgs {
    shipId: string;
    count: number;
    reinforcement: ReinforcementType | null;
}

function createCarriedShipSelection(args: ICreateCarriedShipSelectionArgs): ICarriedShipSelection {
    const { shipId, count, reinforcement } = args;
    const shipDefinition = getShipDefinitionById(shipId);
    return {
        shipDefinition,
        count: Math.max(0, count),
        reinforcement,
    };
}

export interface IApplyShipCountArgs {
    shipId: string;
    count: number;
    reinforcement: ReinforcementType | null;
    fleetSetup: IFleetSetup;
    userSettings: IUserSettings;
}

export function applyShipCount(args: IApplyShipCountArgs): IFleetSetup {
    const { shipId, count, reinforcement, fleetSetup, userSettings } = args;
    const shipDefinition = getShipDefinitionById(shipId);

    const totalReinforcementCount = fleetSetup.ships
            .filter(s => s.reinforcement !== null && !(s.shipDefinition.id === shipId && s.reinforcement === reinforcement))
            .map(s => s.count)
            .reduce((sum, count) => sum + count, 0) + (reinforcement ? count : 0);

    let isNewSelection = true;

    const otherCountOfSameKind = reinforcement === 'ally' ? 0 : fleetSetup.ships.find(s => s.shipDefinition.id === shipId && s.reinforcement !== reinforcement)?.count ?? 0;

    const newFleetSetup = {
        ...fleetSetup,
        ships: fleetSetup.ships.flatMap((shipSelection) => {

            // update primary target
            if (shipSelection.shipDefinition.id === shipId && shipSelection.reinforcement === reinforcement) {
                console.log('update count');
                isNewSelection = false;
                return count <= 0 ? [] : [{
                    ...shipSelection,
                    count,
                    maxCount: getMaxCount(
                        count,
                        otherCountOfSameKind,
                        reinforcement,
                        fleetSetup.maxReinforcement,
                        totalReinforcementCount,
                        shipDefinition.operationLimit
                    ),
                }];
            }

            // if initial ship, update maxCount for self reinforcment of same kind
            if (reinforcement === null && shipSelection.shipDefinition.id === shipId && shipSelection.reinforcement === 'self') {
                console.log('update self reinforcement');
                return [{
                    ...shipSelection,
                    maxCount: getMaxCount(
                        shipSelection.count,
                        count,
                        shipSelection.reinforcement,
                        fleetSetup.maxReinforcement,
                        totalReinforcementCount,
                        shipSelection.shipDefinition.operationLimit
                    ),
                }];
            }

            // if self reinforcement, update maxCount for initial ship of same kind
            if (reinforcement === 'self' && shipSelection.shipDefinition.id === shipId && shipSelection.reinforcement === null) {
                console.log('update initial ship');
                return [{
                    ...shipSelection,
                    maxCount: getMaxCount(
                        shipSelection.count,
                        count,
                        shipSelection.reinforcement,
                        fleetSetup.maxReinforcement,
                        totalReinforcementCount,
                        shipSelection.shipDefinition.operationLimit
                    ),
                }];
            }

            // adapt maxCount for any other reinforcement
            if (shipSelection.reinforcement !== null) {
                const relatedInitialShipCount = shipSelection.reinforcement === 'ally' ? 0 : fleetSetup.ships.find(s => s.shipDefinition.id === shipSelection.shipDefinition.id && s.reinforcement === null)?.count ?? 0;
                return [{
                    ...shipSelection,
                    maxCount: getMaxCount(
                        shipSelection.count,
                        relatedInitialShipCount,
                        shipSelection.reinforcement,
                        fleetSetup.maxReinforcement,
                        totalReinforcementCount,
                        shipSelection.shipDefinition.operationLimit
                    ),
                }];
            }

            return [shipSelection];
        }),
    };

    if (isNewSelection) {
        newFleetSetup.ships.push(
            createShipSelection({
                shipDefinition,
                count,
                maxCount: getMaxCount(
                    count,
                    otherCountOfSameKind,
                    reinforcement,
                    fleetSetup.maxReinforcement,
                    totalReinforcementCount,
                    shipDefinition.operationLimit
                ),
                reinforcement,
                userSettings,
            }),
        );
    }

    return newFleetSetup;
}

function getMaxCount(
    count: number,
    otherCountOfSameKind: number,
    reinforcement: ReinforcementType | null,
    maxReinforcement: number,
    totalReinforcementCount: number,
    operationLimit: number,
): number {
    switch (reinforcement) {
        case 'ally': {
            return Math.min(
                operationLimit,
                maxReinforcement - (totalReinforcementCount - count),
            );
        }
        case 'self': {
            return Math.min(
                operationLimit - otherCountOfSameKind,
                maxReinforcement - (totalReinforcementCount - count),
            );
        }
        default: {
            return operationLimit - otherCountOfSameKind;
        }
    }
}

function getUsedShipCount(
    shipId: string,
    reinforcement: ReinforcementType | null,
    ships: IShipSelection[],
): number {
    switch(reinforcement) {
        case 'self': {
            return ships.find(shipSelection => shipSelection.shipDefinition.id === shipId && shipSelection.reinforcement === null)?.count ?? 0;
        }
        case 'ally': {
            return 0;
        }
        default: {
            return ships.find(shipSelection => shipSelection.shipDefinition.id === shipId && shipSelection.reinforcement === 'self')?.count ?? 0;
        }
    }
}

export interface IApplyCarriedShipCountArgs {
    shipId: string;
    carrierShipId: string;
    count: number;
    reinforcement: ReinforcementType | null;
    fleetSetup: IFleetSetup;
}

export function applyCarriedShipCount(args: IApplyCarriedShipCountArgs): IFleetSetup {
    const { shipId, carrierShipId, count, reinforcement, fleetSetup } = args;

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

                    return count <= 0 ? [] : [{
                        ...carriedShipSelection,
                        count: Math.max(0, count),
                        reinforcement,
                    }];
                }),
            };
        })
    };
}
