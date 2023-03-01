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
    private _value: number | null = null;
    private _cost: number | null = null;
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

    get value(): number | null {
        return this._value;
    }

    get cost(): number | null {
        return this._cost;
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
            this.formatValuesAndCost() ?? '',
        ].filter(line => !!line);
    }

    public withTextKey(key: string) {
        this._textKey = key;
        return this;
    }

    public withValue(value: number) {
        this._value = value;
        return this;
    }

    public withCost(cost: number) {
        this._cost = cost;
        return this;
    }

    private formatValuesAndCost(): string | null {
        const { value, cost } = this;
        if (value !== null) {
            const unit = this._hasPercentageValues ? '%' : '';
            if (cost !== null) {
                return t('skill.valueAndCost', { value, unit, cost });
            }
            return t('skill.value', { value, unit });
        }
        return null;
    }
}
