import { EnhancementType, EnhancementSubType } from './SkillType';

export interface IEnhancement {
    type: EnhancementType;
    subType: EnhancementSubType;
    description: string | null;
    condition: string | null;
    value: number | null;
    cost: number | null;
    isDefault: boolean;
    hasPercentageValues: boolean;
    name: string;
    properties: string[];
}

export interface IMutableEnhancement {
    withTextKey: (key: string) => IEnhancement;
    withDescriptionKey: (key: string) => IEnhancement;
    withConditionKey: (key: string) => IEnhancement;
    withValue: (value: number) => IEnhancement;
    withCost: (cost: number) => IEnhancement;
    withDefaultFlag: () => IEnhancement;
}
