import { ResearchStrategyType } from '../types/ResearchStrategyType';

export function translateResearchStrategyType(type: ResearchStrategyType): string {
    switch (type) {
        case ResearchStrategyType.OUTSTANDING_FIREPOWER:
            return '高火力';
        case ResearchStrategyType.SUSTAINED_COMBAT:
            return '生存性';
        case ResearchStrategyType.STRATEGY_AND_SUPPORT:
            return '戦略＆支援';
        case ResearchStrategyType.FIGHTER_AND_CORVETTE:
            return '艦載機&護送艦';
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
