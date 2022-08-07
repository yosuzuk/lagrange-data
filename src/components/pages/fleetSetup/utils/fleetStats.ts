import { IStats } from '../../../../types/IStats';
import { ISystemModule } from '../../../../types/ShipDefinition';
import { IModuleSelection, IShipSelection } from '../types/IFleetSetup';

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
        if (!ship.shipDefinition.stats) {
            return { ...acc, incomplete: true };
        }

        const shipApplied = applyStats(ship.shipDefinition.stats, ship.count, acc);
        if (!ship.shipDefinition.modules || ship.moduleSelection === null) {
            return shipApplied;
        }

        return flattenModuleSelection(ship.moduleSelection).reduce((acc: IStats, module: ISystemModule) => {
            if (!module.stats) {
                return acc;
            }

            return applyStats(module.stats, ship.count, acc);
        }, shipApplied);
    }, stats);
}

function applyStats(stats: IStats, count: number = 1, targetStats: IStats): IStats {
    return {
        ...targetStats,
        hp: (targetStats.hp ?? 0) + ((stats.hp ?? 0) * count),
        speed: Math.min(targetStats.speed ?? Infinity, stats.speed ?? Infinity),
        warpSpeed: Math.min(targetStats.warpSpeed ?? Infinity, stats.warpSpeed ?? Infinity),
        dpmShip: (targetStats.dpmShip ?? 0) + ((stats.dpmShip ?? 0) * count),
        dpmAntiAir: (targetStats.dpmAntiAir ?? 0) + ((stats.dpmAntiAir ?? 0) * count),
        dpmSiege: (targetStats.dpmSiege ?? 0) + ((stats.dpmSiege ?? 0) * count),
        incomplete: targetStats.incomplete === true ? true : stats.incomplete ?? false,
    };
}

function flattenModuleSelection(moduleSelection: IModuleSelection): ISystemModule[] {
    return Object.keys(moduleSelection.groups).flatMap((groupId: string) => {
        return Object.keys(moduleSelection.groups[groupId])
            .map(moduleId => moduleSelection.groups[groupId][moduleId])
            .filter(moduleUsage => moduleUsage.usage === 'used' || moduleSelection.static)
            .map(moduleUsage => moduleUsage.module);
    });
}
