import { ShipSubType } from '../../../../types/ShipType';
import { PossessionState } from '../../../../userSettings/types/PossessionState';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { getShipDefinitionById } from '../../../../utils/shipDefinitionUtils';
import { ICarriedShipSelection, IFleetSetup, IShipSelection } from '../types/IFleetSetup';

export function applyShipCount(shipId: string, count: number, fleetSetup: IFleetSetup, userSettings: IUserSettings): IFleetSetup {
    if (!fleetSetup.ships.find(shipSelection => shipSelection.shipDefinition.id === shipId)) {   
        return {
            ...fleetSetup,
            ships: [...fleetSetup.ships, createShipSelection(shipId, count, userSettings)],
        };
    }

    return {
        ...fleetSetup,
        ships: fleetSetup.ships.flatMap((shipSelection) => {
            if (shipSelection.shipDefinition.id !== shipId) {
                return [shipSelection];
            }

            return count <= 0 ? [] : [{
                ...shipSelection,
                count: Math.min(count, shipSelection.shipDefinition.operationLimit),
            }];
        }),
    };
}

export function applyCarriedShipCount(shipId: string, carrierShipId: string, count: number, fleetSetup: IFleetSetup): IFleetSetup {
    return {
        ...fleetSetup,
        ships: fleetSetup.ships.map(shipSelection => {
            if (shipSelection.shipDefinition.id !== carrierShipId) {
                return shipSelection;
            }

            if (!shipSelection.carriedShips.find(carriedShipSelection => carriedShipSelection.carrierShipId === shipId)) {
                return {
                    ...shipSelection,
                    carriedShips: [...shipSelection.carriedShips, createCarriedShipSelection(shipId, carrierShipId, count)],
                };
            }

            return {
                ...shipSelection,
                carriedShips: shipSelection.carriedShips.flatMap(carriedShipSelection => {
                    if (carriedShipSelection.shipDefinition.id !== shipId) {
                        return [carriedShipSelection];
                    }

                    return count <= 0 ? [] : [{
                        ...carriedShipSelection,
                        count: Math.min(count, carriedShipSelection.shipDefinition.operationLimit),
                    }];
                }),
            };
        })
    };
}

function createShipSelection(shipId: string, count: number, userSettings: IUserSettings): IShipSelection {
    const shipDefinition = getShipDefinitionById(shipId);

    let carryUpToLargeFighter = 0;
    let carryUpToMediumFighter = 0;
    let carryUpToSmallFighter = 0;
    let carryCorvette = shipDefinition.carryCorvette ?? 0;

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
        count: Math.max(0, Math.min(shipDefinition.operationLimit, count)),
    };
}

function createCarriedShipSelection(shipId: string, carrierShipId: string, count: number): ICarriedShipSelection {
    const shipDefinition = getShipDefinitionById(shipId);
    return {
        shipDefinition,
        carrierShipId,
        count: Math.max(0, Math.min(shipDefinition.operationLimit, count)),
    };
}
