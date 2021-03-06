import { ResearchStrategyType } from '../types/ResearchStrategyType';

// 戦略能力

export function translateResearchStrategyType(type: ResearchStrategyType): string {
    switch (type) {
        case ResearchStrategyType.OUTSTANDING_FIREPOWER:
            return '高火力';
        case ResearchStrategyType.SUSTAINED_COMBAT:
            return '継続作戦';
        case ResearchStrategyType.STRATEGY_AND_SUPPORT:
            return '戦略と支援';
        case ResearchStrategyType.FIGHTER_AND_CORVETTE:
            return '艦載機と護送艦';
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
