import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { IFleetSetup, IShipSelection, ReinforcementType } from '../types/IFleetSetup';
import { IDialogDataForCarriedShips } from '../types/IDialogDataForShips';
import { shipDefinitions as allShipDefinitions } from '../../../../data/shipDefinitions';
import { IShipDefinition } from '../../../../types/ShipDefinition';
import { isPossessingShip } from '../../../../userSettings/utils/userSettingsUtils';
import { ShipSubType, ShipType } from '../../../../types/ShipType';
import { createCarriedShipSelection, createShipSelection } from './fleetSetupUtils';
import { FilterKey, ShipFilterState } from '../../../filter/types/ShipFilterState';

export function createDialogDataForCarriedShips(
    carrierShipId: string,
    reinforcement: ReinforcementType | null,
    fleetSetup: IFleetSetup,
    userSettings: IUserSettings,
): IDialogDataForCarriedShips {
    const carrierShipSelection = fleetSetup.ships.find(shipSelection => shipSelection.shipDefinition.id === carrierShipId && shipSelection.reinforcement === reinforcement);
    if (!carrierShipSelection) {
        throw new Error('Invalid carrier');
    }

    const includedShipMap: Record<string, boolean> = {};
    carrierShipSelection.carriedShips.forEach(ship => {
        includedShipMap[`${ship.shipDefinition.id}_${ship.reinforcement}`] = true;
    });

    const shipDefinitions = pickCarriedShipsForAddDialog(
        carrierShipSelection,
        allShipDefinitions,
        reinforcement,
        fleetSetup.myListOnly,
        userSettings,
    );

    return {
        carrierShipId,
        reinforcement,
        shipSelections: shipDefinitions.flatMap((shipDefinition: IShipDefinition) => {
            if (includedShipMap[`${shipDefinition.id}_${reinforcement}`]) {
                return [];
            }
    
            return [
                createShipSelection({
                    shipDefinition,
                    usedModules: null,
                    count: 0,
                    reinforcement,
                    userSettings,
                    maxReinforcement: fleetSetup.maxReinforcement,
                    temporary: true,
                    myListOnly: fleetSetup.myListOnly,
                }),
            ];
        }),
        filter: null,
    };
}

function pickCarriedShipsForAddDialog(
    carrierShipSelection: IShipSelection,
    shipDefinitions: IShipDefinition[],
    reinforcement: ReinforcementType | null,
    myListOnly: boolean,
    userSettings: IUserSettings,
): IShipDefinition[] {
    const ships = shipDefinitions.filter(s => {
        switch (s.type) {
            case ShipType.CORVETTE: {
                return carrierShipSelection.carrierCapabilities.carryCorvette > 0;
            }
            case ShipType.FIGHTER: {
                switch (s.subType) {
                    case ShipSubType.LARGE_FIGHTER: {
                        return carrierShipSelection.carrierCapabilities.carryUpToLargeFighter > 0;
                    }
                    case ShipSubType.MEDIUM_FIGHTER: {
                        return carrierShipSelection.carrierCapabilities.carryUpToMediumFighter > 0
                            || carrierShipSelection.carrierCapabilities.carryUpToLargeFighter > 0;
                    }
                    case ShipSubType.SMALL_FIGHTER: {
                        return carrierShipSelection.carrierCapabilities.carryUpToSmallFighter > 0
                            || carrierShipSelection.carrierCapabilities.carryUpToMediumFighter > 0
                            || carrierShipSelection.carrierCapabilities.carryUpToLargeFighter > 0;
                    }
                }
            }
        }

        return false;
    });
    return (reinforcement?.includes('ally') || !myListOnly)
        ? ships
        : ships.filter(s => isPossessingShip(s.id, userSettings));
}

export function addSelectedCarriedShipsToFleetSetup(dialogData: IDialogDataForCarriedShips, fleetSetup: IFleetSetup): IFleetSetup {
    return {
        ...fleetSetup,
        ships: fleetSetup.ships.map(shipSelection => {
            if (shipSelection.shipDefinition.id !== dialogData.carrierShipId || shipSelection.reinforcement !== dialogData.reinforcement) {
                return shipSelection;
            }

            return {
                ...shipSelection,
                carriedShips: [
                    ...shipSelection.carriedShips,
                    ...dialogData.shipSelections
                        .filter(dialogShipSelection => dialogShipSelection.count > 0)
                        .map(dialogShipSelection => createCarriedShipSelection({
                            shipId: dialogShipSelection.shipDefinition.id,
                            count: dialogShipSelection.count,
                            reinforcement: dialogData.reinforcement,
                        })),
                ],
            };
        }),
    };
}

export function filterCarriedShipForAddDialog(filterState: ShipFilterState, shipsForAddDialog: IDialogDataForCarriedShips): IDialogDataForCarriedShips {
    let result: IDialogDataForCarriedShips = shipsForAddDialog;

    Object.keys(filterState).filter(filterKey => filterState[filterKey as FilterKey]).forEach(filterKey => {
        switch (filterKey) {
            case ShipType.CORVETTE:
            case ShipType.FIGHTER: {
                result = {
                    ...result,
                    shipSelections: result.shipSelections.filter(s => s.shipDefinition.type === filterKey),
                };
                break;
            }
        }
    });

    return result;
}
