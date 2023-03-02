import { t } from '../i18n';
import { IModuleSkill } from './types/IModuleSkill';
import { SkillSubType, SkillType } from './types/SkillType';

export const skills = {
    increaseArmor: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_ARMOR),
    increaseShield: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_SHIELD),
    increaseHp: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HP, true),
    increaseDamage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_DAMAGE, true),
    increaseRepairSpeed: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_REPAIR_SPEED, true),
    increaseSupplySpeed: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_SUPPLY_SPEED, true),
    increaseStorage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_STORAGE, true),
    increaseCustomModuleStorage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_CUSTOM_MODULE_STORAGE),
    increaseProjectileHitRateMidRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_PROJECTILE_HITRATE_MID_ROW, true),
    reducePrefabCost: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_PREFAB_COST, true),
    reduceHitByProjectileInBackRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_HIT_BY_PROJECTILE_IN_BACK_ROW, true),
    reduceHitByProjectileInMidRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_HIT_BY_PROJECTILE_IN_MID_ROW, true),
    reduceHitBySlowInBackRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_HIT_BY_SLOW_IN_BACK_ROW, true),
    disguiseAsDestroyer: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.DISGUISE_AS_DESTROYER),
    flagshipEffect: (textKey: string) => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.CUSTOM).withTextKey(textKey),
    focusFire: () => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.FOCUS_FIRE).withDescriptionKey('skillDescription.focusFire'),
    fleetDock1: () => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.FLEET_DOCK_1).withDescriptionKey('skillDescription.fleetDock1'),
    fleetDock2: () => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.FLEET_DOCK_2).withDescriptionKey('skillDescription.fleetDock2'),
    customFlashipEffect: (textKey: string) => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.FOCUS_FIRE).withTextKey(textKey),
    customStrategy: (textKey: string) => new ModuleSkill(SkillType.STRATEGY, SkillSubType.CUSTOM).withTextKey(textKey),
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
    private _descriptionKey: string | null = null;
    private _conditionKey: string | null = null;

    public constructor(type: SkillType, subType: SkillSubType, percentage: boolean = true) {
        this._type = type;
        this._subType = subType;
        this._textKey = `skillSubType.${subType}`;
        this._hasPercentageValues = percentage;
    }

    get type(): SkillType {
        return this._type;
    }

    get subType(): SkillSubType {
        return this._subType;
    }

    get description(): string | null {
        return this._descriptionKey ? t(this._descriptionKey, { defaultValue: '???' }) : null;
    }

    get condition(): string | null {
        return this._conditionKey ? t(this._conditionKey, { defaultValue: '???' }) : null;
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
            this.formatValuesAndCost() ?? '',
            this._descriptionKey ? t('label.effectColonValue', { effect: this.description }) : '',
            this._conditionKey ? t('label.conditionColonValue', { condition: this.condition }) : '',
        ].filter(line => !!line);
    }

    public withTextKey(key: string) {
        this._textKey = key;
        return this;
    }

    public withDescriptionKey(key: string) {
        this._descriptionKey = key;
        return this;
    }

    public withConditionKey(key: string) {
        this._conditionKey = key;
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
                return t('skill.valueAndCostColonValue', { value, unit, cost });
            }
            return t('skill.valueColonValue', { value, unit });
        }
        if (cost !== null) {
            return t('skill.costColonValue', { cost });
        }
        return null;
    }
}
