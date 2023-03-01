import { ISkill } from '../../types/ShipDefinition';
import { SkillType, SkillSubType } from './SkillType';

export interface IModuleSkill extends ISkill {
    type: SkillType;
    subType: SkillSubType;
    steps: number;
    stepValue: number | null;
    totalValue: number | null;
    stepCost: number[];
    totalCost: number | null;
    hasPercentageValues: boolean;
    withTextKey: (key: string) => IModuleSkill;
    withSteps: (steps: number) => IModuleSkill;
    withStepValue: (value: number) => IModuleSkill;
    withTotalValue: (value: number) => IModuleSkill;
    withStepCost: (cost: number[]) => IModuleSkill;
    withTotalCost: (cost: number) => IModuleSkill;
    validate: (context: string) => string[];
}
