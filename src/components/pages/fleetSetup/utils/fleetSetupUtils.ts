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
                shipId: minifiedShipSelection.shipId,
                count: minifiedShipSelection.count,
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
    shipId: string;
    count: number;
    reinforcement: ReinforcementType | null;
    userSettings: IUserSettings;
}

export function createShipSelection(args: ICreateShipSelectionArgs): IShipSelection {
    const { shipId, count, reinforcement, userSettings } = args;
    const shipDefinition = getShipDefinitionById(shipId);

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

    if (!fleetSetup.ships.find(shipSelection => shipSelection.shipDefinition.id === shipId && shipSelection.reinforcement === reinforcement)) {   
        return {
            ...fleetSetup,
            ships: [...fleetSetup.ships, createShipSelection({ shipId, count, reinforcement, userSettings })],
        };
    }

    return {
        ...fleetSetup,
        ships: fleetSetup.ships.flatMap((shipSelection) => {
            if (shipSelection.shipDefinition.id !== shipId || shipSelection.reinforcement !== reinforcement) {
                return [shipSelection];
            }

            return count <= 0 ? [] : [{
                ...shipSelection,
                count: Math.max(0, count),
            }];
        }),
    };
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
