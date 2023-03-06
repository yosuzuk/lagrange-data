import { t } from '../i18n';
import { IModuleSkill } from './types/IModuleSkill';
import { SkillSubType, SkillType } from './types/SkillType';

export const skills = {
    custom: (textKey: string, options?: Record<string, unknown>) => new ModuleSkill(SkillType.DEFAULT, SkillSubType.CUSTOM).withTextKey(textKey, options),
    increaseArmor: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_ARMOR),
    increaseShield: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_SHIELD),
    increaseHp: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HP, true),
    increaseSystemHp: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_SYSTEM_HP, true),
    increaseDamage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_DAMAGE, true),
    increaseDamageOfAircraft: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_DAMAGE_OF_AIRCRAFT, true),
    increaseDamageOfCorvette: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_DAMAGE_OF_CORVETTE, true),
    increaseDamageOfUav: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_DAMAGE_OF_UAV, true),
    increaseIonDamage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_ION_DAMAGE, true),
    increaseMissileDamage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_MISSILE_DAMAGE, true),
    increaseSiegeDamage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_SIEGE_DAMAGE, true),
    increaseCriticalDamage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_CRITICAL_DAMAGE, true),
    increaseCriticalDamageAndChance: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_CRITICAL_DAMAGE_AND_CHANCE, true),
    increaseHitRate: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HIT_RATE, true),
    increaseHitRateOfAircraft: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HIT_RATE_OF_AIRCRAFT, true),
    increaseHitRateOfCorvette: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HIT_RATE_OF_CORVETTE, true),
    increaseHitRateOfUav: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HIT_RATE_OF_UAV, true),
    increaseHitRateVsSmall: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HIT_RATE_VS_SMALL, true),
    increaseHitRateVsLarge: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HIT_RATE_VS_LARGE, true),
    increaseHitRateVsAircraft: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_HIT_RATE_VS_AIRCRAFT, true),
    increaseIonHitRate: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_ION_HIT_RATE, true),
    increaseRepairSpeed: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_REPAIR_SPEED, true),
    increaseSupplySpeed: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_SUPPLY_SPEED, true),
    increaseStorage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_STORAGE, true),
    increaseCustomModuleStorage: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_CUSTOM_MODULE_STORAGE),
    increaseProjectileHitRateMidRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_PROJECTILE_HITRATE_MID_ROW, true),
    increaseInterceptionChance: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_INTERCEPTION_CHANCE, true),
    increaseMissileEvasionOfAircraft: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_MISSILE_EVASION_OF_AIRCRAFT, true),
    increaseMissileEvasionOfCorvette: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_MISSILE_EVASION_OF_CORVETTE, true),
    increaseMissileEvasionOfUav: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.INCREASE_MISSILE_EVASION_OF_UAV, true),
    reduceLockOn: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_LOCK_ON, true),
    reduceLockOnOfAircraft: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_LOCK_ON_OF_AIRCRAFT, true),
    reduceLockOnOfUav: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_LOCK_ON_OF_UAV, true),
    reduceCooldown: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_COOLDOWN, true),
    reduceRtbAircraft: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_RTB_AIRCRAFT, true),
    reduceRtbCorvette: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_RTB_CORVETTE, true),
    reduceRtbUav: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_RTB_UAV, true),
    reduceDuration: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_DURATION, true),
    reducePrefabCost: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_PREFAB_COST, true),
    reduceCritialDamageReceived: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_CRITICAL_DAMAGE_RECEIVED, true),
    reduceHitByProjectileInBackRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_HIT_BY_PROJECTILE_IN_BACK_ROW, true),
    reduceHitByProjectileInMidRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_HIT_BY_PROJECTILE_IN_MID_ROW, true),
    reduceHitBySlowInBackRow: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_HIT_BY_SLOW_IN_BACK_ROW, true),
    reduceTorpedoInterception: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.REDUCE_TORPEDO_INTERCEPTION, true),
    disguiseAsDestroyer: () => new ModuleSkill(SkillType.DEFAULT, SkillSubType.DISGUISE_AS_DESTROYER),

    // flagship effect
    customFlashipEffect: (textKey: string, options?: Record<string, unknown>) => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.CUSTOM).withTextKey(textKey, options),
    focusFire: () => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.FOCUS_FIRE).withDescriptionKey('skillDescription.focusFire'),
    fleetDock1: () => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.FLEET_DOCK_1).withDescriptionKey('skillDescription.fleetDock1'),
    fleetDock2: () => new ModuleSkill(SkillType.FLAGSHIP_EFFECT, SkillSubType.FLEET_DOCK_2).withDescriptionKey('skillDescription.fleetDock2'),

    // strategy
    customStrategy: (textKey: string, options?: Record<string, unknown>) => new ModuleSkill(SkillType.STRATEGY, SkillSubType.CUSTOM).withTextKey(textKey, options),
    overdrive: (interval: number, duration: number, cooldown: number) => new ModuleSkill(SkillType.STRATEGY, SkillSubType.OVERDRIVE).withDescriptionKey('skillDescription.overdrive', { interval, duration, cooldown }),
    antiAircraftSupport: (hitRate: number, interval: number, duration: number) => new ModuleSkill(SkillType.STRATEGY, SkillSubType.ANTI_AIRCRAFT_SUPPORT).withDescriptionKey('skillDescription.antiAircraftSupport', { hitRate, interval, duration }),
    rapidFire: (value: number, interval: number, duration: number, cooldown: number) => new ModuleSkill(SkillType.STRATEGY, SkillSubType.RAPID_FIRE).withDescriptionKey('skillDescription.rapidFire', { value, interval, duration, cooldown }),
    concentrateFirePeriodically: (reduceCooldown: number, interval: number, duration: number) => new ModuleSkill(SkillType.STRATEGY, SkillSubType.CONCENTRATE_FIRE_PERIODICALLY).withDescriptionKey('skillDescription.concentrateFirePeriodically', { reduceCooldown, interval, duration }),
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
    private _textKeyOptions: Record<string, unknown> = {};
    private _descriptionKey: string | null = null;
    private _descriptionKeyOptions: Record<string, unknown> = {};
    private _conditionKey: string | null = null;
    private _conditionKeyOptions: Record<string, unknown> = {};

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
        return this._descriptionKey ? t(this._descriptionKey, { defaultValue: '???', ...this._descriptionKeyOptions }) : null;
    }

    get condition(): string | null {
        return this._conditionKey ? t(this._conditionKey, { defaultValue: '???', ...this._conditionKeyOptions }) : null;
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
            ...this._textKeyOptions,
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

    public withTextKey(key: string, options?: Record<string, unknown>) {
        this._textKey = key;
        if (options) {
            this._textKeyOptions = options;
        }
        return this;
    }

    public withDescriptionKey(key: string, options?: Record<string, unknown>) {
        this._descriptionKey = key;
        if (options) {
            this._descriptionKeyOptions = options;
        }
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
