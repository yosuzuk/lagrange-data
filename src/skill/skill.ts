import { t } from '../i18n';
import { sum } from '../utils/numberUtils';
import { IModuleSkill } from './types/IModuleSkill';
import { SkillSubType, SkillType } from './types/SkillType';

export const skills = {
    increaseArmor: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_ARMOR),
    increaseHp: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HP, true),
    increaseDamage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_DAMAGE, true),
    flagshipEffect: (textKey: string) => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.CUSTOM).withTextKey(textKey),
    strategy: (textKey: string) => new ModuleSkill(SkillType.STRATEGY, SkillSubType.CUSTOM).withTextKey(textKey),
    custom: (textKey: string) => new ModuleSkill(SkillType.DEFAULT, SkillSubType.CUSTOM).withTextKey(textKey),
} as const;

export function isModuleSkill(value: unknown): boolean {
    return value instanceof ModuleSkill;
}

class ModuleSkill implements IModuleSkill {
    private _type: SkillType;
    private _subType: SkillSubType;
    private _hasPercentageValues: boolean;
    private _stepValue: number | null = null;
    private _totalValue: number | null = null;
    private _steps: number = 1;
    private _stepCost: number[] = [];
    private _totalCost: number | null = null;
    private _textKey: string;

    public constructor(type: SkillType, subType: SkillSubType, percentage: boolean = true) {
        this._type = type;
        this._subType = subType;
        this._textKey = `skillType.${subType}`;
        this._hasPercentageValues = percentage;
    }

    get type(): SkillType {
        return this._type;
    }

    get subType(): SkillSubType {
        return this._subType;
    }

    get steps(): number {
        return this._steps;
    }

    get stepValue(): number | null {
        return this._stepValue;
    }

    get totalValue(): number | null {
        return this._totalValue ?? (Number.isFinite(this._stepValue) ? (this._stepValue as number) * this._steps : null);
    }

    get stepCost(): number[] {
        return this._stepCost;
    }

    get totalCost(): number | null {
        return this._totalCost ?? sum(this._stepCost);
    }

    get hasPercentageValues(): boolean {
        return this._hasPercentageValues;
    }

    get effect(): string {
        return t(this._textKey, {
            defaultValue: '???',
        });
    }

    get properties(): string[] {
        return [
            this.type === SkillType.STRATEGY ? t('skill.strategy') : '',
            this.type === SkillType.FLAGSHIP_EFFECT ? t('skill.flagshipEffect') : '',
            this.formatValues() ?? '',
            this.formatCost() ?? '',
        ].filter(line => !!line);
    }

    public withTextKey(key: string) {
        this._textKey = key;
        return this;
    }

    public withSteps(steps: number) {
        this._steps = steps;
        return this;
    }

    public withStepValue(value: number) {
        this._stepValue = value;
        return this;
    }

    public withTotalValue(value: number) {
        this._totalValue = value;
        return this;
    }

    public withStepCost(cost: number[]) {
        this._stepCost = cost;
        return this;
    }

    public withTotalCost(cost: number) {
        this._totalCost = cost;
        return this;
    }

    public validate(context: string): string[] {
        const prefix = `${context} - ${this._type}`;
        const issues: string[] = [];
        if (this._totalValue !== null && this._stepValue !== null && this._totalValue !== this._totalValue * this._steps) {
            issues.push(`${prefix}: Explicit totalValue doesn't match sum of explicit stepValue`);
        }
        if (this._totalCost !== null && this._stepCost.length > 0 && this._totalCost !== sum(this._stepCost)) {
            issues.push(`${prefix}: Explicit totalCost doesn't match sum of explicit stepCost`);
        }
        if (this._stepCost.length > 0 && this._stepCost.length !== this._steps) {
            issues.push(`${prefix}: stepCost count doesn't match step count`);
        }
        return issues;
    }

    private formatValues(): string | null {
        const { totalValue, stepValue, steps } = this;
        if (totalValue !== null) {
            const unit = this._hasPercentageValues ? '%' : '';
            if (stepValue !== null) {
                return t('skill.totalAndStepValues', { totalValue, unit, stepValue, steps });
            }
            return t('skill.totalValue', { totalValue, unit });
        }
        return null;
    }

    private formatCost(): string | null {
        const { totalCost, stepCost } = this;
        if (totalCost !== null) {
            if (stepCost.length > 0) {
                return t('skill.totalAndStepCost', {
                    totalCost,
                    stepCost: stepCost.map(cost => `${cost}`).join('+'),
                });
            }
            return t('skill.totalCost', { totalCost });
        }
        return null;
    }
}
