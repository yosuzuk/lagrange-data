import { ISkill } from '../../types/ShipDefinition';
import { SkillType, SkillSubType } from './SkillType';

export interface IModuleSkill extends ISkill {
    type: SkillType;
    subType: SkillSubType;
    description: string | null;
    condition: string | null;
    value: number | null;
    cost: number | null;
    hasPercentageValues: boolean;
    withTextKey: (key: string) => IModuleSkill;
    withDescriptionKey: (key: string) => IModuleSkill;
    withConditionKey: (key: string) => IModuleSkill;
    withValue: (value: number) => IModuleSkill;
    withCost: (cost: number) => IModuleSkill;
}
