import { IStats } from '../../../../types/IStats';
import { getShipStats, addStats } from '../../../../utils/shipStatsUtils';
import { ICarriedShipSelection, IShipSelection } from '../types/IFleetSetup';

export function getFleetStats(shipSelection: IShipSelection[]): IStats {
    const stats: IStats = {
        hp: 0,
        speed: Infinity,
        warpSpeed: Infinity,
        dpmShip: 0,
        dpmAntiAir: 0,
        dpmSiege: 0,
        incomplete: false,
    };

    return shipSelection.reduce((acc: IStats, ship: IShipSelection) => {
        const shipStats = getShipStats(ship.shipDefinition, ship.moduleSelection);
        if (!shipStats) {
            return { ...acc, incomplete: true };
        }

        const shipApplied = addStats(shipStats, ship.count, acc);

        return ship.carriedShips.reduce((acc: IStats, carriedShip: ICarriedShipSelection) => {
            const carriedShipStats = getShipStats(carriedShip.shipDefinition, null);
            if (!carriedShipStats) {
                return { ...acc, incomplete: true };
            }

            return addStats(carriedShipStats, carriedShip.count, acc);
        }, shipApplied);
    }, stats);
}
