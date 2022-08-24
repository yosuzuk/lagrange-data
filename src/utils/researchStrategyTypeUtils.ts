import { ResearchStrategyType } from '../types/ResearchStrategyType';
import { t } from '../i18n';

// 戦略能力

export function translateResearchStrategyType(type: ResearchStrategyType): string {
    switch (type) {
        case ResearchStrategyType.OUTSTANDING_FIREPOWER:
            return t('strategyType.outstandingFirepower');
        case ResearchStrategyType.SUSTAINED_COMBAT:
            return t('strategyType.sustainedCombat');
        case ResearchStrategyType.STRATEGY_AND_SUPPORT:
            return t('strategyType.strategyAndSupport');
        case ResearchStrategyType.FIGHTER_AND_CORVETTE:
            return t('strategyType.fighterAndCorvette');
    }
}

export function researchStrategyTypeToSortValue(type: ResearchStrategyType): number {
    switch (type) {
        case ResearchStrategyType.OUTSTANDING_FIREPOWER:
            return 1;
        case ResearchStrategyType.SUSTAINED_COMBAT:
            return 2;
        case ResearchStrategyType.STRATEGY_AND_SUPPORT:
            return 3;
        case ResearchStrategyType.FIGHTER_AND_CORVETTE:
            return 4;
    }
}
