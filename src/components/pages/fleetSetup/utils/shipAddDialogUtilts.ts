import { IShipDefinition } from '../../../../types/ShipDefinition';
import { IShipsForAddDialog, IShipForAddDialog } from '../types/IShipsForAddDialog';
import { IFleetSetup, ReinforcementType } from '../types/IFleetSetup';
import { IUserSettings } from '../../../../userSettings/types/UserSettings';
import { createShipSelection } from './fleetSetupUtils';
import { isPossessingShip } from '../../../../userSettings/utils/userSettingsUtils';
import { ShipType } from '../../../../types/ShipType';

export function createShipsForAddDialog(
    shipDefinitions: IShipDefinition[],
    reinforcement: ReinforcementType | null,
    fleetSetup: IFleetSetup,
): IShipsForAddDialog {
    return {
        ships: shipDefinitions.reduce((acc: Record<string, IShipForAddDialog>, shipDefinition: IShipDefinition) => {
            const shipForAddDialog = createShipForAddDialog(shipDefinition, reinforcement, fleetSetup);
            return shipForAddDialog ? {
                ...acc,
                [shipDefinition.id]: shipForAddDialog,
            } : acc;
        }, {} as Record<string, IShipForAddDialog>),
        reinforcement,
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

    switch (reinforcement) {
        case 'ally': {
            const totalReinforcementCount = fleetSetup.ships.find(s => s.reinforcement !== null)?.count ?? 0;
            const maxCount = fleetSetup.maxReinforcement - totalReinforcementCount;
            return count < maxCount ? {
                shipDefinition,
                count,
                maxCount,
            } : null;
        }
        case 'self': {
            const sameShipInitialCount = sameShipSelections.find(s => s.reinforcement === null)?.count ?? 0;
            const totalReinforcementCount = fleetSetup.ships.find(s => s.reinforcement !== null)?.count ?? 0;
            const maxCount = Math.min(
                shipDefinition.operationLimit - sameShipInitialCount,
                fleetSetup.maxReinforcement - totalReinforcementCount
            );
            return count < maxCount ? {
                shipDefinition,
                count,
                maxCount,
            } : null;
        }
        default: {
            const sameShipReinforcementCount = sameShipSelections.find(s => s.reinforcement === 'self')?.count ?? 0;
            const maxCount = shipDefinition.operationLimit - sameShipReinforcementCount;
            return count < maxCount ? {
                shipDefinition,
                count,
                maxCount,
            } : null;
        }
    }
}

export function applyCountToShipInAddDialog(shipId: string, count: number, shipsForAddDialog: IShipsForAddDialog) {
    if (!shipsForAddDialog.ships[shipId]) {
        throw new Error('Invalid ship ID');
    }
    return {
        ...shipsForAddDialog,
        ships: {
            ...shipsForAddDialog.ships,
            [shipId]: {
                ...shipsForAddDialog.ships[shipId],
                count: Math.max(0, Math.min(shipsForAddDialog.ships[shipId].maxCount, count)),
            },
        }
    }
}

export function addSelectedShipsToFleetSetup(shipsForAddDialog: IShipsForAddDialog, fleetSetup: IFleetSetup, userSettings: IUserSettings): IFleetSetup {
    return {
        ...fleetSetup,
        ships: [
            ...fleetSetup.ships,
            ...Object.keys(shipsForAddDialog.ships)
                .flatMap(shipId => {
                    const shipForAddDialog = shipsForAddDialog.ships[shipId];
                    if (shipForAddDialog.count === 0) {
                        return [];
                    }
                    return [
                        createShipSelection({
                            shipId: shipForAddDialog.shipDefinition.id,
                            count: shipForAddDialog.count,
                            reinforcement: shipsForAddDialog.reinforcement,
                            userSettings,
                        }),
                    ];
                }),
        ],
    };
}

interface IShipDefinitionsForAddDialog {
    myListShips: IShipDefinition[];
    myListCarriedShips: IShipDefinition[];
    allyReinforcementShips: IShipDefinition[];
    allyReinforcementCarriedShips: IShipDefinition[];
}

export function extractShipDefinitionsForAddDialog(shipDefinitions: IShipDefinition[], userSettings: IUserSettings) {
    const myListShips: IShipDefinition[] = [];
    const myListCarriedShips: IShipDefinition[] = [];
    const allyReinforcementShips: IShipDefinition[] = [];
    const allyReinforcementCarriedShips: IShipDefinition[] = [];

    shipDefinitions.forEach(shipDefinition => {
        switch (shipDefinition.type) {
            case ShipType.FIGHTER:
            case ShipType.CORVETTE: {
                if (isPossessingShip(shipDefinition.id, userSettings)) {
                    myListCarriedShips.push(shipDefinition);
                }
                allyReinforcementCarriedShips.push(shipDefinition);
                break;
            }
            default: {
                if (isPossessingShip(shipDefinition.id, userSettings)) {
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
