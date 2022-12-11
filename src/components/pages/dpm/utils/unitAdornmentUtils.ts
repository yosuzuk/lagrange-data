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
