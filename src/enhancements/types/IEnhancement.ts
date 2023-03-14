import { EnhancementType, EnhancementSubType } from './EnhancementType';

export interface IEnhancement {
    type: EnhancementType;
    subType: EnhancementSubType;
    description: string | null;
    condition: string | null;
    value: number | null;
    value2: number | null;
    cost: number | null;
    isDefault: boolean;
    hasPercentageValues: boolean;
    hasFixedValue: boolean;
    name: string;
    properties: string[];
}

export interface IMutableEnhancement extends IEnhancement {
    withTextKey: (key: string) => IMutableEnhancement;
    withDescriptionKey: (key: string) => IMutableEnhancement;
    withConditionKey: (key: string) => IMutableEnhancement;
    withPercentageValue: (value: number, value2?: number) => IMutableEnhancement;
    withFixedPercentageValue: (value: number) => IMutableEnhancement;
    withAbsoluteValue: (value: number) => IMutableEnhancement;
    withFixedAbsoluteValue: (value: number) => IMutableEnhancement;
    withCost: (cost: number) => IMutableEnhancement;
    withDefaultFlag: () => IMutableEnhancement;
}
