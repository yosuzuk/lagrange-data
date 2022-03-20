import { IShipDefinition } from '../../../../types/ShipDefinition';
import { IShipsForAddDialog, IShipForAddDialog } from '../types/IShipsForAddDialog';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { applyShipCount } from './fleetSetupUtils';
import { isPossessingShip } from '../../../../userSettings/utils/userSettingsUtils';
import { ShipType } from '../../../../types/ShipType';
import { ShipRow } from '../../../../types/ShipRow';
import { FilterKey, ShipFilterState } from '../../../filter/types/ShipFilterState';

export function createShipsForAddDialog(
    shipDefinitions: IShipDefinition[],
    reinforcement: ReinforcementType | null,
    fleetSetup: IFleetSetup,
    filter: string | null,
): IShipsForAddDialog {
    return {
        ships: shipDefinitions.flatMap((shipDefinition: IShipDefinition) => {
            const shipForAddDialog = createShipForAddDialog(shipDefinition, reinforcement, fleetSetup);
            return shipForAddDialog ? [shipForAddDialog] : [];
        }),
        reinforcement,
        filter,
    };
}

function createShipForAddDialog(
    shipDefinition: IShipDefinition,
    reinforcement: ReinforcementType | null,
    fleetSetup: IFleetSetup,
): IShipForAddDialog | null {
    const sameShipSelections = fleetSetup.ships.filter(s => s.shipDefinition.id === shipDefinition.id);
    const count = sameShipSelections.find(s => s.reinforcement === reinforcement)?.count ?? 0;

    if (count > 0) {
        return null; // ship has already been selected
    }

    const maxCount = reinforcement === null ? shipDefinition.operationLimit : Math.min(
        shipDefinition.operationLimit,
        fleetSetup.maxReinforcement,
    );

    return count < maxCount ? {
        shipDefinition,
        count,
        maxCount,
    } : null;
}

export function applyCountToShipInAddDialog(shipId: string, count: number, shipsForAddDialog: IShipsForAddDialog): IShipsForAddDialog {
    return {
        ...shipsForAddDialog,
        ships: shipsForAddDialog.ships.map(ship => ship.shipDefinition.id !== shipId ? ship : {
            ...ship,
            count,
        }),
    };
}

export function addSelectedShipsToFleetSetup(shipsForAddDialog: IShipsForAddDialog, fleetSetup: IFleetSetup, userSettings: IUserSettings): IFleetSetup {
    let newFleetSetup: IFleetSetup = fleetSetup;
    shipsForAddDialog.ships
        .filter(ship => ship.count > 0)
        .forEach(shipToAdd => {
            newFleetSetup = applyShipCount({
                shipId: shipToAdd.shipDefinition.id,
                count: shipToAdd.count,
                reinforcement: shipsForAddDialog.reinforcement,
                fleetSetup: newFleetSetup,
                userSettings,
            });
        });

    return newFleetSetup;
}

interface IShipDefinitionsForAddDialog {
    myListShips: IShipDefinition[];
    myListCarriedShips: IShipDefinition[];
    allyReinforcementShips: IShipDefinition[];
    allyReinforcementCarriedShips: IShipDefinition[];
}

export function extractShipDefinitionsForAddDialog(
    shipDefinitions: IShipDefinition[],
    userSettings: IUserSettings,
    myListOnly: boolean,
): IShipDefinitionsForAddDialog {
    const myListShips: IShipDefinition[] = [];
    const myListCarriedShips: IShipDefinition[] = [];
    const allyReinforcementShips: IShipDefinition[] = [];
    const allyReinforcementCarriedShips: IShipDefinition[] = [];

    shipDefinitions.forEach(shipDefinition => {
        switch (shipDefinition.type) {
            case ShipType.FIGHTER:
            case ShipType.CORVETTE: {
                if (!myListOnly || isPossessingShip(shipDefinition.id, userSettings)) {
                    myListCarriedShips.push(shipDefinition);
                }
                allyReinforcementCarriedShips.push(shipDefinition);
                break;
            }
            default: {
                if (!myListOnly || isPossessingShip(shipDefinition.id, userSettings)) {
                    myListShips.push(shipDefinition);
                }
                allyReinforcementShips.push(shipDefinition);
                break;
            }
        }        
    });

    return {
        myListShips,
        myListCarriedShips,
        allyReinforcementShips,
        allyReinforcementCarriedShips,
    };
}

export function filterShipForAddDialog(filterState: ShipFilterState, shipsForAddDialog: IShipsForAddDialog): IShipsForAddDialog {
    let result: IShipsForAddDialog = shipsForAddDialog;
    Object.keys(filterState).filter(filterKey => filterState[filterKey as FilterKey]).forEach(filterKey => {
        switch (filterKey) {
            case ShipRow.FRONT:
            case ShipRow.MIDDLE:
            case ShipRow.BACK: {
                result = {
                    ...result,
                    ships: result.ships.filter(s => s.shipDefinition.row === filterKey),
                };
                break;
            }
            case ShipType.CARRIER:
            case ShipType.BATTLE_CRUISER:
            case ShipType.CRUISER:
            case ShipType.DESTROYER:
            case ShipType.FRIGATE: {
                result = {
                    ...result,
                    ships: result.ships.filter(s => s.shipDefinition.type === filterKey),
                };
                break;
            }
        }
    });

    return result;
}
