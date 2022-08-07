import { IModuleSelection } from '../components/pages/fleetSetup/types/IFleetSetup';
import { IStats } from '../types/IStats';
import { IShipDefinition, ISystemModule } from '../types/ShipDefinition';
import { getShipStatsAndLocalizationByShipId } from './externalDataUtils';
import { formatNumberWithSuffix } from './numberUtils';

export function getShipStats(shipDefinition: IShipDefinition, moduleSelection: IModuleSelection | null): IStats | null {
    const data = getShipStatsAndLocalizationByShipId(shipDefinition.id);
    if (!data) {
        return null;
    }

    const baseStats: IStats = {
        hp: Number(data.hp),
        speed: Number(data.speed),
        warpSpeed: Number(data.warpSpeed),
        dpmShip: Number(data.dpmShip),
        dpmAntiAir: Number(data.dpmAntiAir),
        dpmSiege: Number(data.dpmSiege),
    };

    const modules = (moduleSelection ?  getUsedModules(moduleSelection) : getDefaultModules(shipDefinition));

    return modules.reduce((acc: IStats, module: ISystemModule) => {
        const moduleStats = getSystemModuleStats(shipDefinition.id, module.id);
        if (!moduleStats) {
            return acc;
        }

        return mergeStats(moduleStats, 1, acc);
    }, baseStats);
}

export function mergeStats(stats: IStats, count: number = 1, targetStats: IStats): IStats {
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

export function getSystemModuleStats(shipId: string, moduleId: string): IStats | null {
    return null; // TODO implement when data is available
}

export function formatDpm(dpm: number | undefined): string {
    return Number.isFinite(dpm) ? formatNumberWithSuffix(dpm as number) : '-';
}

export function formatDpmAll(stats: IStats): string {
    return [
        formatDpm(stats.dpmShip),
        formatDpm(stats.dpmAntiAir),
        formatDpm(stats.dpmSiege),
    ].join(' | ');
}

export function formatSpeed(stats: IStats): string {
    const { speed, warpSpeed } = stats;
    return [
        Number.isFinite(speed) ? formatNumberWithSuffix(speed as number) : '-',
        Number.isFinite(warpSpeed) ? formatNumberWithSuffix(warpSpeed as number) : '-',
    ].join(' | ');
}

export function formatHp(stats: IStats): string {
    const { hp } = stats;
    return Number.isFinite(hp) ? formatNumberWithSuffix(hp as number) : '-';
}

function getUsedModules(moduleSelection: IModuleSelection): ISystemModule[] {
    return Object.keys(moduleSelection.groups).flatMap((groupId: string) => {
        return Object.keys(moduleSelection.groups[groupId])
            .map(moduleId => moduleSelection.groups[groupId][moduleId])
            .filter(moduleUsage => moduleUsage.usage === 'used' || moduleSelection.static)
            .map(moduleUsage => moduleUsage.module);
    });
}

function getDefaultModules(shipDefinition: IShipDefinition): ISystemModule[] {
    return shipDefinition.modules?.filter(module => module.defaultModule) ?? [];
}
