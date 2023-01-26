import { t } from '../../../../i18n';
import { ResearchManufacturer } from '../../../../types/ResearchManufacturer';
import { ResearchStrategyType } from '../../../../types/ResearchStrategyType';
import { ResearchTacticType } from '../../../../types/ResearchTacticType';
import { IResearchFilterState } from '../types/IResearchConfiguration';

type FilterType = ResearchManufacturer | ResearchStrategyType | ResearchTacticType;
type Hour = number;

const timeMap: Record<FilterType, Hour> = {
    [ResearchManufacturer.JUPITER_INDUSTRIES]: 35,
    [ResearchManufacturer.NOMA_SHIPPING_GROUP]: 35,
    [ResearchManufacturer.ANTONIOS_CONSORTIUM]: 40,
    [ResearchManufacturer.DAWN_ACCORD]: 25,

    [ResearchStrategyType.OUTSTANDING_FIREPOWER]: 55,
    [ResearchStrategyType.SUSTAINED_COMBAT]: 50,
    [ResearchStrategyType.STRATEGY_AND_SUPPORT]: 55,
    [ResearchStrategyType.FIGHTER_AND_CORVETTE]: 60,

    [ResearchTacticType.PROJECTILE_WEAPONS]: 45,
    [ResearchTacticType.DIRECT_FIRE_WEAPONS]: 40,
};

export function formatResearchTime(filterState: IResearchFilterState): string {
    const totalHours = getResearchTimeInHours(filterState);
    return t('label.daysAndHours', {
        days: Math.floor(totalHours / 24),
        hours: Math.round(totalHours % 24),
    });
}

function getResearchTimeInHours(filterState: IResearchFilterState): Hour {
    const filters: FilterType[] = [
        ...(filterState.manufacturerFilter ? [filterState.manufacturerFilter] : []),
        ...(filterState.tacticTypeFilter ? [filterState.tacticTypeFilter] : []),
        ...(filterState.strategyTypeFilter ? [filterState.strategyTypeFilter] : []),
    ];

    const a: Hour = filters[0] ? (timeMap[filters[0]] ?? 0) : 0;
    const b: Hour = filters[1] ? (timeMap[filters[1]] ?? 0) : 0;
    const c: Hour = filters[2] ? (timeMap[filters[2]] ?? 0) : 0;

    if (filters.length === 3) {
        return a + (a + b) + ((a * b * c) / 250);
    }

    if (filters.length === 2) {
        return a + (a + b);
    }

    return a;
}
