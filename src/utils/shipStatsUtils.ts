import { IModuleSelection } from '../components/pages/fleetSetup/types/IFleetSetup';
import { t } from '../i18n';
import { IStats } from '../types/IStats';
import { IShipDefinition, ISystemModule } from '../types/ShipDefinition';
import { getShipStatsAndLocalizationByShipId } from './externalDataUtils';
import { formatNumberWithSuffix } from './numberUtils';

export function getShipStats(shipDefinition: IShipDefinition, moduleSelection: IModuleSelection | null): IStats | null {
    const data = getShipStatsAndLocalizationByShipId(shipDefinition.id);

    // stats including default modules
    const defaultStats: IStats = {
        hp: shipDefinition.defaultStats?.hp,
        speed: shipDefinition.defaultStats?.speed ?? (data !== null ? Number(data.speed) : undefined),
        warpSpeed: shipDefinition.defaultStats?.warpSpeed ?? (data !== null ? Number(data.warp) : undefined),
        dpmShip: shipDefinition.defaultStats?.dpmShip ?? (data !== null ? Number(data.dpmShip) : undefined),
        dpmAntiAir: shipDefinition.defaultStats?.dpmAntiAir ?? (data !== null ? Number(data.dpmAntiAir) : undefined),
        dpmSiege: shipDefinition.defaultStats?.dpmSiege ?? (data !== null ? Number(data.dpmSiege) : undefined),
    };

    if (!moduleSelection) {
        return defaultStats;
    }

    const defaultModules = getNonStaticDefaultModules(shipDefinition);
    const usedModules = getUsedNonStaticModules(moduleSelection);

    // stats excluding default modules
    const baseStats: IStats = defaultModules
        .map(defaultModule => getSystemModuleStats(defaultModule))
        .reduce((acc: IStats, next: IStats | null) => {
            if (!next) {
                return acc;
            }

            return subtractDpmStats(next, acc);
        }, defaultStats);

    // stats including selected modules
    return usedModules.reduce((acc: IStats, module: ISystemModule) => {
        const moduleStats = getSystemModuleStats(module);
        if (!moduleStats) {
            return acc;
        }

        return addStats(moduleStats, 1, acc);
    }, baseStats);
}

export function getSystemModuleStats(module: ISystemModule): IStats | null {
    return {
        dpmShip: module.dpmShip,
        dpmAntiAir: module.dpmAntiAir,
        dpmSiege: module.dpmSiege,
    };
}

export function addStats(stats: IStats, count: number = 1, targetStats: IStats): IStats {
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

export function subtractDpmStats(stats: IStats, targetStats: IStats): IStats {
    return {
        ...targetStats,
        dpmShip: (targetStats.dpmShip ?? 0) - (stats.dpmShip ?? 0),
        dpmAntiAir: (targetStats.dpmAntiAir ?? 0) - (stats.dpmAntiAir ?? 0),
        dpmSiege: (targetStats.dpmSiege ?? 0) - (stats.dpmSiege ?? 0),
    };
}

export function formatDpm(dpm: number | undefined | null, precision?: number): string {
    return Number.isFinite(dpm) ? formatNumberWithSuffix(dpm as number, precision) : '-';
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

export function formatFlightTime(inboundFlightTime: number, outboundFlightTime: number): string {
    return [
        t('quantity.nSecondsShort', { count: inboundFlightTime }),
        t('quantity.nSecondsShort', { count: outboundFlightTime }),
    ].join(' | ');
}

export function formatHp(stats: IStats): string {
    const { hp } = stats;
    return Number.isFinite(hp) ? `${hp}` : '-';
}

function getUsedNonStaticModules(moduleSelection: IModuleSelection): ISystemModule[] {
    return Object.keys(moduleSelection.groups).flatMap((groupId: string) => {
        return Object.keys(moduleSelection.groups[groupId])
            .map(moduleId => moduleSelection.groups[groupId][moduleId])
            .filter(moduleUsage => moduleUsage.usage === 'used' && moduleUsage.module.category !== 'STATIC')
            .map(moduleUsage => moduleUsage.module);
    });
}

function getNonStaticDefaultModules(shipDefinition: IShipDefinition): ISystemModule[] {
    return shipDefinition.modules?.filter(module => module.category !== 'STATIC' && module.defaultModule) ?? [];
}
