import { Unit } from '../types/Unit';

export function getAdornmentForUnit(unit: Unit) {
    switch (unit) {
        case Unit.PERCENTAGE:
            return '%';
        case Unit.SECONDS:
            return '秒';
        case Unit.DPM:
            return '/分';
    }
}

export function toIncreasingFactor(percentageValue: number | null): number | null {
    return Number.isFinite(percentageValue) ? 1 + (percentageValue as number / 100) : null;
}

export function toDecreasingFactor(percentageValue: number | null): number | null {
    return Number.isFinite(percentageValue) ? 1 - (percentageValue as number / 100) : null;
}
