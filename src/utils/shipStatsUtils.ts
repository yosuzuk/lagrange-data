import { IModuleSelection } from '../components/pages/fleetSetup/types/IFleetSetup';
import { t } from '../i18n';
import { IStats } from '../types/IStats';
import { IShipDefinition, ISystemModule } from '../types/ShipDefinition';
import { formatNumberWithSuffix } from './numberUtils';

export function getShipStats(shipDefinition: IShipDefinition, moduleSelection: IModuleSelection | null): IStats | null {
    // stats including default modules
    const speed = shipDefinition.defaultStats?.speed;
    const defaultStats: IStats = {
        hp: shipDefinition.defaultStats?.hp,
        speed,
        accelerationTime: speed ? getAccelerationTime(speed) : undefined,
        warpSpeed: shipDefinition.defaultStats?.warpSpeed,
        dpmShip: shipDefinition.defaultStats?.dpmShip,
        dpmAntiAir: shipDefinition.defaultStats?.dpmAntiAir,
        dpmSiege: shipDefinition.defaultStats?.dpmSiege,
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
        warpSpeed: Infinity, // calculated separately
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
        Number.isFinite(speed) ? `${formatNumberWithSuffix(speed as number)} - 1200` : '-',
        Number.isFinite(warpSpeed) ? formatNumberWithSuffix(warpSpeed as number) : '-',
    ].join(' | ');
}

export function formatAccelerationTime(stats: IStats): string {
    const { accelerationTime } = stats;
    if (!Number.isFinite(accelerationTime)) {
        return '-';
    }
    return t('quantity.nSecondsShort', { count: accelerationTime });
}

export function formatFlightTime(outboundFlightTime: number, inboundFlightTime: number): string {
    return [
        t('quantity.nSecondsShort', { count: outboundFlightTime }),
        t('quantity.nSecondsShort', { count: inboundFlightTime }),
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

const accelerationTable: Record<string, number> = {
    '1040': 123,
    '1000': 153,
    '950': 192,
    '900': 230,
    '850': 269,
    '800': 307,
    '750': 346,
    '700': 384,
    '650': 423,
    '600': 461,
    '560': 492,
    '500': 538,
    '450': 576,
    '420': 600,
    '400': 615,
    '250': 730,
    // (it's linear)
};

export function getAccelerationTime(speed: number): number | undefined {
    return accelerationTable[`${speed}`];
}
