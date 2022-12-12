import { formatNumber } from '../../../../utils/numberUtils';
import { Unit } from '../types/Unit';

export function getAdornmentForUnit(unit: Unit) {
    switch (unit) {
        case Unit.PERCENTAGE:
            return '%';
        case Unit.SECONDS:
            return '秒';
        case Unit.DPM:
            return '/分';
        case Unit.ION_ATTACK_COUNT:
            return '次';
    }
}

export function toIncreasingFactor(percentageValue: number): number {
    return 1 + (percentageValue as number / 100);
}

export function toDecreasingFactor(percentageValue: number): number {
    return 1 - (percentageValue as number / 100);
}

export function toIncreasingPercentageForFormula(percentageValue: number): string {
    return `100% + ${formatNumber(percentageValue)}%`;
}

export function toDecreasingPercentageForFormula(percentageValue: number): string {
    return `100% - ${formatNumber(percentageValue)}%`;
}
