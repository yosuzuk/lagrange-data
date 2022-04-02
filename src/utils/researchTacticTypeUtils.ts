import { ResearchTacticType } from '../types/ResearchTacticType';

// 戦術性能

export function translateResearchTacticType(type: ResearchTacticType): string {
    switch (type) {
        case ResearchTacticType.PROJECTILE_WEAPONS:
            return '投射兵器';
        case ResearchTacticType.DIRECT_FIRE_WEAPONS:
            return '直接射撃武器';
    }
}

export function researchTacticTypeToSortValue(type: ResearchTacticType): number {
    switch (type) {
        case ResearchTacticType.PROJECTILE_WEAPONS:
            return 1;
        case ResearchTacticType.DIRECT_FIRE_WEAPONS:
            return 2;
    }
}
