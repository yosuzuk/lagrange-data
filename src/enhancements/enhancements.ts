import { t } from '../i18n';
import { IMutableEnhancement } from './types/IEnhancement';
import { EnhancementSubType, EnhancementType } from './types/EnhancementType';

export const enhancements = {
    customEnhancement: (textKey: string, options?: Record<string, unknown>) => new Enhancement(EnhancementType.SKILL, EnhancementSubType.CUSTOM).withTextKey(textKey, options),
    increaseArmor: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ARMOR),
    increaseShield: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SHIELD),
    increaseHp: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HP),
    increaseSystemHp: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SYSTEM_HP),
    increaseDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE),
    increaseDamageOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_AIRCRAFT),
    increaseDamageOfAircraftMainWeapon: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_AIRCRAFT_MAIN_WEAPON),
    increaseDamageOfCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_CORVETTE),
    increaseDamageOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_UAV),
    increaseIonDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ION_DAMAGE),
    increaseMissileDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_DAMAGE),
    increaseSiegeDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SIEGE_DAMAGE),
    increaseCriticalDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CRITICAL_DAMAGE),
    increaseCriticalDamageAndChance: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CRITICAL_DAMAGE_AND_CHANCE),
    increaseHitRate: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE),
    increaseHitRateOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_AIRCRAFT),
    increaseHitRateOfAircraftMainWeapon: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_AIRCRAFT_MAIN_WEAPON),
    increaseHitRateOfCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_CORVETTE),
    increaseHitRateOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_UAV),
    increaseHitRateVsSmall: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_VS_SMALL),
    increaseHitRateVsLarge: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_VS_LARGE),
    increaseHitRateVsAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_VS_AIRCRAFT),
    increaseIonHitRate: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ION_HIT_RATE),
    increaseCruisingSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CRUISING_SPEED),
    increaseWarpSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_WARP_SPEED),
    increaseRepairSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_REPAIR_SPEED),
    increaseSupplySpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SUPPLY_SPEED),
    increaseStorage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_STORAGE),
    increaseCustomModuleStorage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CUSTOM_MODULE_STORAGE),
    increaseProjectileHitRateMidRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_PROJECTILE_HITRATE_MID_ROW),
    increaseTorpedoHitRateMidRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_TORPEDO_HITRATE_MID_ROW),
    increaseMissileHitRateMidRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_HITRATE_MID_ROW),
    increaseInterceptionChance: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_INTERCEPTION_CHANCE),
    increaseEvasion: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_EVASION),
    increaseMissileEvasionOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_EVASION_OF_AIRCRAFT),
    increaseMissileEvasionOfCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_EVASION_OF_CORVETTE),
    increaseMissileEvasionOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_EVASION_OF_UAV),
    increaseSelfHostCapacity: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SELF_HOST_CAPACITY),
    increaseProductionSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_PRODUCTION_SPEED),
    reduceLockOn: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_LOCK_ON),
    reduceLockOnOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_LOCK_ON_OF_AIRCRAFT),
    reduceLockOnOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_LOCK_ON_OF_UAV),
    reduceCooldown: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_COOLDOWN),
    reduceRtbAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_RTB_AIRCRAFT),
    reduceRtbCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_RTB_CORVETTE),
    reduceRtbUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_RTB_UAV),
    reduceDuration: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_DURATION),
    reducePrefabCost: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_PREFAB_COST),
    reduceUeCoinCost: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_UE_COIN_COST),
    reduceDamageReceivedBySystem: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_DAMAGE_RECEIVED_BY_SYSTEM),
    reduceCritialDamageReceived: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_CRITICAL_DAMAGE_RECEIVED),
    reduceProjectileDamageReceived: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_PROJECTILE_DAMAGE_RECEIVED),
    reduceHitByProjectileInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_PROJECTILE_IN_BACK_ROW),
    reduceHitByProjectileInMidRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_PROJECTILE_IN_MID_ROW),
    reduceHitByTorpedoInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_TORPEDO_IN_BACK_ROW),
    reduceHitByMissileInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_MISSILE_IN_BACK_ROW),
    reduceHitBySlowInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_SLOW_IN_BACK_ROW),
    reduceHitByMissleAndTorpedo: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_MISSILE_AND_TORPEDO),
    reduceTorpedoInterception: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_TORPEDO_INTERCEPTION),
    reduceEvasion: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_EVASION),
    reduceHitRateOfMainWeapon: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_RATE_OF_MAIN_WEAPON),
    disguiseAsDestroyer: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.DISGUISE_AS_DESTROYER),
    customModuleStorage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.CUSTOM_MODULE_STORAGE),
    repairQueue: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REPAIR_QUEUE),
    specialAmmo: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.SPECIAL_AMMO),
    collateralDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.COLLATERAL_DAMAGE),
} as const;

export const flagshipEffect = {
    customFlashipEffect: (textKey: string, options?: Record<string, unknown>) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.CUSTOM).withTextKey(textKey, options),
    focusFire: () => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.FOCUS_FIRE).withDescriptionKey('focusFire'),
    fleetDock1: () => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.FLEET_DOCK_1).withDescriptionKey('fleetDock1'),
    fleetDock2: () => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.FLEET_DOCK_2).withDescriptionKey('fleetDock2'),
    siegeTactic2: (duration: number) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.SIEGE_TACTIC_2).withDescriptionKey('siegeTactic2', { duration }),
} as const;

export const strategy = {
    customStrategy: (textKey: string, options?: Record<string, unknown>) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CUSTOM).withTextKey(textKey, options),
    overdrive: (interval: number, duration: number, cooldown: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.OVERDRIVE).withDescriptionKey('overdrive', { interval, duration, cooldown }),
    antiAircraftSupport: (hitRate: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.ANTI_AIRCRAFT_SUPPORT).withDescriptionKey('antiAircraftSupport', { hitRate, interval, duration }),
    rapidFire: (value: number, interval: number, duration: number, cooldown: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.RAPID_FIRE).withDescriptionKey('rapidFire', { value, interval, duration, cooldown }),
    concentrateFirePeriodically: (reduceCooldown: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CONCENTRATE_FIRE_PERIODICALLY).withDescriptionKey('concentrateFirePeriodically', { reduceCooldown, interval, duration }),
    evasiveManeuvers: (hp: number, evasion: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.EVASIVE_MANEUVERS).withDescriptionKey('evasiveManeuvers', { hp, evasion, duration }),
} as const;

export function isEnhancementInstance(value: unknown): boolean {
    return value instanceof Enhancement;
}

class Enhancement implements IMutableEnhancement {
    private _type: EnhancementType;
    private _subType: EnhancementSubType;
    private _hasPercentageValues: boolean = false;
    private _hasFixedValue: boolean = false;
    private _value: number | null = null;
    private _value2: number | null = null;
    private _cost: number | null = null;
    private _textKey: string;
    private _textKeyOptions: Record<string, unknown> = {};
    private _descriptionKey: string | null = null;
    private _descriptionKeyOptions: Record<string, unknown> = {};
    private _conditionKey: string | null = null;
    private _conditionKeyOptions: Record<string, unknown> = {};
    private _isDefault: boolean = false;

    public constructor(type: EnhancementType, subType: EnhancementSubType) {
        this._type = type;
        this._subType = subType;
        this._textKey = `enhancementSubType.${subType}`;
    }

    get type(): EnhancementType {
        return this._type;
    }

    get subType(): EnhancementSubType {
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

    get value2(): number | null {
        return this._value2;
    }

    get cost(): number | null {
        return this._cost;
    }

    get isDefault(): boolean {
        return this._isDefault;
    }

    get hasPercentageValues(): boolean {
        return this._hasPercentageValues;
    }

    get hasFixedValue(): boolean {
        return this._hasFixedValue;
    }

    get name(): string {
        return t(this._textKey, {
            defaultValue: '???',
            ...this._textKeyOptions,
        });
    }

    get properties(): string[] {
        return [
            this._descriptionKey ? t('label.effectColonValue', { effect: this.description }) : '',
            this._conditionKey ? t('label.conditionColonValue', { condition: this.condition }) : '',
            this.type === EnhancementType.STRATEGY ? t('enhancementType.strategy') : '',
            this._isDefault ? t('enhancement.enabledByDefaultBrackets') : '',
            this.formatValuesAndCost() ?? '',
        ].filter(line => !!line);
    }

    public withTextKey(key: string, options?: Record<string, unknown>) {
        this._textKey = `enhancementSubType.${key}`;
        if (options) {
            this._textKeyOptions = options;
        }
        return this;
    }

    public withDescriptionKey(key: string, options?: Record<string, unknown>) {
        this._descriptionKey = `enhancementDescription.${key}`;
        if (options) {
            this._descriptionKeyOptions = options;
        }
        return this;
    }

    public withConditionKey(key: string) {
        this._conditionKey = `enhancementCondition.${key}`;
        return this;
    }

    public withPercentageValue(value: number, value2?: number) {
        this._value = value;
        this._value2 = value2 ?? null;
        this._hasFixedValue = false;
        this._hasPercentageValues = true;
        return this;
    }

    public withFixedPercentageValue(value: number) {
        this._value = value;
        this._hasFixedValue = true;
        this._hasPercentageValues = true;
        return this;
    }

    public withAbsoluteValue(value: number) {
        this._value = value;
        this._hasFixedValue = false;
        this._hasPercentageValues = false;
        return this;
    }

    public withFixedAbsoluteValue(value: number) {
        this._value = value;
        this._hasFixedValue = true;
        this._hasPercentageValues = false;
        return this;
    }

    public withCost(cost: number) {
        this._cost = cost;
        return this;
    }

    public withDefaultFlag() {
        this._isDefault = true;
        return this;
    }

    private formatValuesAndCost(): string | null {
        const { value, value2, cost } = this;
        if (value !== null) {
            const unit = this._hasPercentageValues ? '%' : '';
            if (cost !== null) {
                if (this.hasFixedValue) {
                    return t('enhancement.valueAndCostColonValue', { value, unit });
                }
                if (value2 !== null) {
                    return t('enhancement.maxValueAndCostColonValueValue2', { value, value2, unit, cost });
                }
                return t('enhancement.maxValueAndCostColonValue', { value, unit, cost });
            }
            if (this.hasFixedValue) {
                return t('enhancement.valueColonValue', { value, unit });
            }
            if (value2 !== null) {
                return t('enhancement.maxValueColonValueValue2', { value, value2, unit });
            }
            return t('enhancement.maxValueColonValue', { value, unit });
        }
        if (cost !== null) {
            return t('enhancement.costColonValue', { cost });
        }
        return null;
    }
}
