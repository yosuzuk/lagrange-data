import { ShipRow } from '../../../../types/ShipRow';
import { ShipType } from '../../../../types/ShipType';
import { shipTypes } from '../../../../utils/shipTypeUtils';
import { IShipSelection } from '../types/IFleetSetup';
import { IFleetShipCount } from '../types/IFleetShipCount';

export function getFleetShipCount(ships: IShipSelection[]): IFleetShipCount {
    let totalCost = 0;

    const shipCount = ships.map(s => s.count).reduce((sum, count) => sum + count, 0);

    const shipCountByType = Object.keys(shipTypes).reduce((acc, shipType) => ({
        ...acc,
        [shipType]: 0,
    }), {} as Record<ShipType, number>);

    const shipCountByRow: Record<ShipRow, number> = {
        [ShipRow.FRONT]: 0,
        [ShipRow.MIDDLE]: 0,
        [ShipRow.BACK]: 0,
        [ShipRow.NONE]: 0,
    };

    ships.forEach(ship => {
        if (ship.reinforcement === null) {
            totalCost += (ship.count * ship.shipDefinition.cost);
        }

        shipCountByType[ship.shipDefinition.type] += ship.count;
        shipCountByRow[ship.shipDefinition.row] += ship.count;
        if (ship.carriedShips.length > 0) {
            ship.carriedShips.forEach(carriedShip => {
                shipCountByType[carriedShip.shipDefinition.type] += carriedShip.count;
            });
        }
    });
    return { shipCount, shipCountByType, shipCountByRow, totalCost };
}
