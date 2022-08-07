import { FormatListNumbered } from '@mui/icons-material';
import { IStats } from '../types/IStats';
import { getShipStatsAndLocalizationByShipId } from './externalDataUtils';
import { formatNumberWithSuffix } from './numberUtils';

export function getShipStats(shipId: string): IStats | null {
    const data = getShipStatsAndLocalizationByShipId(shipId);
    if (!data) {
        return null;
    }

    return {
        hp: Number(data.hp),
        speed: Number(data.speed),
        warpSpeed: Number(data.warpSpeed),
        dpmShip: Number(data.dpmShip),
        dpmAntiAir: Number(data.dpmAntiAir),
        dpmSiege: Number(data.dpmSiege),
    };
}

export function getSystemModuleStats(shipId: string, moduleId: string): IStats | null {
    return null; // TODO implement when data is available
}

export function formatDpm(stats: IStats): string {
    const { dpmShip, dpmAntiAir, dpmSiege } = stats;
    return [
        Number.isFinite(dpmShip) ? formatNumberWithSuffix(dpmShip as number) : '-',
        Number.isFinite(dpmAntiAir) ? formatNumberWithSuffix(dpmAntiAir as number) : '-',
        Number.isFinite(dpmSiege) ? formatNumberWithSuffix(dpmSiege as number) : '-',
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
