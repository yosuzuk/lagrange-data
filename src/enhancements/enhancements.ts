import { getCurrentLanguage, t } from '../i18n';
import { EnhancementValueUnit, IMutableEnhancement, IEnhancementText } from './types/IEnhancement';
import { EnhancementSubType, EnhancementType } from './types/EnhancementType';

export const enhancements = {
    customEnhancement: (text: IEnhancementText) => new Enhancement(EnhancementType.SKILL, EnhancementSubType.CUSTOM).withText(text),
    customEnhancementWithKey: (textKey: string, options?: Record<string, unknown>) => new Enhancement(EnhancementType.SKILL, EnhancementSubType.CUSTOM).withTextKey(textKey, options),
    increaseArmor: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ARMOR),
    increaseShield: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SHIELD),
    increaseHp: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HP),
    increaseSystemHp: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SYSTEM_HP),
    increaseSystemHpMainSystem: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SYSTEM_HP_MAIN_SYSTEM),
    increaseDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE),
    increaseDamageOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_AIRCRAFT),
    increaseDamageOfAircraftMainWeapon: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_AIRCRAFT_MAIN_WEAPON),
    increaseDamageOfCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_CORVETTE),
    increaseDamageOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_OF_UAV),
    increaseDamageVsAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_DAMAGE_VS_AIRCRAFT),
    increaseIonDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ION_DAMAGE),
    increaseIonDamageOfShip: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ION_DAMAGE_OF_SHIP),
    increaseMissileDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_DAMAGE),
    increaseMissileAndTorpedoDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_AND_TORPEDO_DAMAGE),
    increaseSiegeDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SIEGE_DAMAGE),
    increaseSiegeDamageOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SIEGE_DAMAGE_OF_AIRCRAFT),
    increaseCriticalDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CRITICAL_DAMAGE),
    increaseCriticalDamageAndChance: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CRITICAL_DAMAGE_AND_CHANCE),
    increaseEnergyDamageOfMainSystem: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ENERGY_DAMAGE_OF_MAIN_SYSTEM),
    increaseHitRate: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE),
    increaseHitRateOfMainWeapon: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_MAIN_WEAPON),
    increaseHitRateOfAllWeapons: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_ALL_WEAPONS),
    increaseHitRateOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_AIRCRAFT),
    increaseHitRateOfAircraftMainWeapon: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_AIRCRAFT_MAIN_WEAPON),
    increaseHitRateOfCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_CORVETTE),
    increaseHitRateOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_OF_UAV),
    increaseHitRateVsSmall: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_VS_SMALL),
    increaseHitRateVsLarge: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_VS_LARGE),
    increaseHitRateVsAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_HIT_RATE_VS_AIRCRAFT),
    increaseIonHitRate: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ION_HIT_RATE),
    increaseMissileAndTorpedoHitRate: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_AND_TORPEDO_HIT_RATE),
    increaseCruisingSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CRUISING_SPEED),
    increaseCruisingSpeedOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CRUISING_SPEED_OF_AIRCRAFT),
    increaseWarpSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_WARP_SPEED),
    increaseRepairSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_REPAIR_SPEED),
    increaseSupplySpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SUPPLY_SPEED),
    increaseStorage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_STORAGE),
    increaseCustomModuleStorage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_CUSTOM_MODULE_STORAGE),
    increaseProjectileHitRateMidRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_PROJECTILE_HITRATE_MID_ROW),
    increaseTorpedoHitRateMidRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_TORPEDO_HITRATE_MID_ROW),
    increaseMissileAndTorpedoHitRateBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_AND_TORPEDO_HITRATE_BACK_ROW),
    increaseInterceptionChance: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_INTERCEPTION_CHANCE),
    increaseEvasion: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_EVASION),
    increaseMissileEvasionOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_EVASION_OF_AIRCRAFT),
    increaseMissileEvasionOfCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_EVASION_OF_CORVETTE),
    increaseMissileEvasionOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MISSILE_EVASION_OF_UAV),
    increaseSelfHostCapacity: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_SELF_HOST_CAPACITY),
    increaseProductionSpeed: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_PRODUCTION_SPEED),
    increaseEnemyLockOn: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_ENEMY_LOCK_ON),
    increaseLockOnEfficiency: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_LOCK_ON_EFFICIENCY),
    increaseStrategicStrikeAngle: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_STRATEGIC_STRIKE_ANGLE),
    increaseRepairEffectiveness: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_REPAIR_EFFECTIVENESS),
    increaseRepairEffectivenessOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_REPAIR_EFFECTIVENESS_OF_UAV),
    increaseRepairEffectivenessByArmor: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_REPAIR_EFFECTIVENESS_BY_ARMOR),
    increaseMaintenanceEfficiency: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_MAINTENANCE_EFFICIENCY),
    increaseJammingDuration: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.INCREASE_JAMMING_DURATION),
    reduceLockOn: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_LOCK_ON),
    reduceLockOnOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_LOCK_ON_OF_AIRCRAFT),
    reduceLockOnOfUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_LOCK_ON_OF_UAV),
    reduceLockOnEfficiencyChance: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_LOCK_ON_EFFICIENCY_CHANCE),
    reduceCooldown: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_COOLDOWN),
    reduceCooldownOfMainSystem: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_COOLDOWN_OF_MAIN_SYSTEM),
    reduceIonCooldownOfShip: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_ION_COOLDOWN_OF_SHIP),
    reduceRtbOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_RTB_OF_AIRCRAFT),
    reduceRtbOfCorvette: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_RTB_OF_CORVETTE),
    reduceRtbUav: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_RTB_UAV),
    reduceDuration: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_DURATION),
    reduceAttackInterval: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_ATTACK_INTERVAL),
    reducePrefabCost: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_PREFAB_COST),
    reduceUeCoinCost: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_UE_COIN_COST),
    reduceDamageReceivedBySystem: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_DAMAGE_RECEIVED_BY_SYSTEM),
    reduceCritialDamageReceived: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_CRITICAL_DAMAGE_RECEIVED),
    reduceCritialDamageReceivedMainSystem: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_CRITICAL_DAMAGE_RECEIVED_MAIN_SYSTEM),
    reduceProjectileDamageReceived: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_PROJECTILE_DAMAGE_RECEIVED),
    reduceHitByMissile: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_MISSILE),
    reduceHitByProjectile: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_PROJECTILE),
    reduceHitByProjectileInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_PROJECTILE_IN_BACK_ROW),
    reduceHitByProjectileInMidRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_PROJECTILE_IN_MID_ROW),
    reduceHitByTorpedoInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_TORPEDO_IN_BACK_ROW),
    reduceHitByMissileInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_MISSILE_IN_BACK_ROW),
    reduceHitBySlowInBackRow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_SLOW_IN_BACK_ROW),
    reduceHitByMissleAndTorpedo: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_MISSILE_AND_TORPEDO),
    reduceHitByDirectFire: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_DIRECT_FIRE),
    reduceHitBySlow: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_BY_SLOW),
    reduceMissileInterception: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_MISSILE_INTERCEPTION),
    reduceTorpedoInterception: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_TORPEDO_INTERCEPTION),
    reduceEvasion: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_EVASION),
    reduceHitRateOfMainWeapon: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_HIT_RATE_OF_MAIN_WEAPON),
    reduceBatOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_BAT_OF_AIRCRAFT),
    reduceFlightTime: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_FLIGHT_TIME),
    reduceFlightTimeAndWeaponCooldownOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_FLIGHT_TIME_AND_WEAPON_COOLDOWN_OF_AIRCRAFT),
    reduceFlightTimeAndPrimaryWeaponCooldownOfAircraft: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_FLIGHT_TIME_AND_PRIMARY_WEAPON_COOLDOWN_OF_AIRCRAFT),
    reducePreTargetTime: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REDUCE_PRE_TARGET_TIME),
    disguiseAsDestroyer: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.DISGUISE_AS_DESTROYER),
    disguiseAsCarrier: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.DISGUISE_AS_CARRIER),
    customModuleStorage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.CUSTOM_MODULE_STORAGE),
    repairQueue: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.REPAIR_QUEUE),
    specialAmmo: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.SPECIAL_AMMO),
    collateralDamage: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.COLLATERAL_DAMAGE),
    missileTrackingRadar: (interception: number) => new Enhancement(EnhancementType.SKILL, EnhancementSubType.MISSILE_TRACKING_RADAR).withDescriptionKey('missileTrackingRadar', { interception }),
    activeAntiMissileInterception: (missileInterception: number, torpedoInterception: number) => new Enhancement(EnhancementType.SKILL, EnhancementSubType.ACTIVE_ANTI_MISSILE_INTERCEPTION).withDescriptionKey('activeAntiMissileInterception', { missileInterception, torpedoInterception }),
    targetReset1: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.TARGET_RESET_1).withTextKey('targetReset').withDescriptionKey('targetReset1'),
    targetReset2: () => new Enhancement(EnhancementType.SKILL, EnhancementSubType.TARGET_RESET_2).withTextKey('targetReset').withDescriptionKey('targetReset2'),
} as const;

export const flagshipEffect = {
    customFlashipEffect: (text: IEnhancementText) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.CUSTOM).withText(text),
    customFlashipEffectWithKey: (textKey: string, options?: Record<string, unknown>) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.CUSTOM).withTextKey(textKey, options),
    focusFire: () => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.FOCUS_FIRE).withDescriptionKey('focusFire'),
    fleetDock1: () => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.FLEET_DOCK_1).withDescriptionKey('fleetDock1'),
    fleetDock2: () => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.FLEET_DOCK_2).withDescriptionKey('fleetDock2'),
    siegeTactic2: (duration: string) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.SIEGE_TACTIC_2).withDescriptionKey('siegeTactic2', { duration }),
    desperateMeasures1: (percentage: string, targetCount: string) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.DESPERATE_MEASURES_1).withDescriptionKey('desperateMeasures', { percentage, targetCount }),
    desperateMeasures2: (percentage: string, targetCount: string) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.DESPERATE_MEASURES_2).withDescriptionKey('desperateMeasures', { percentage, targetCount }),
    strategicStrike1: (angle: number) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.STRATEGIC_STRIKE_1).withDescriptionKey('strategicStrike1', { angle }),
    strategicStrike2: (angle: number) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.STRATEGIC_STRIKE_2).withDescriptionKey('strategicStrike1', { angle }),
    strategicStrike3: (angle: number, distance: string) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.STRATEGIC_STRIKE_3).withDescriptionKey('strategicStrike3', { angle, distance }),
    antiAircraftNetwork1: (hitRate: number) => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.ANTI_AIRCRAFT_NETWORK_1).withDescriptionKey('antiAircraftNetwork1', { hitRate }),
    antiAircraftNetwork2: () => new Enhancement(EnhancementType.FLAGSHIP_EFFECT, EnhancementSubType.ANTI_AIRCRAFT_NETWORK_2).withDescriptionKey('antiAircraftNetwork2').withConditionKey('antiAircraftNetwork2'),
} as const;

export const strategy = {
    customStrategy: (text: IEnhancementText) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CUSTOM).withText(text),
    customStrategyWithKey: (textKey: string, options?: Record<string, unknown>) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CUSTOM).withTextKey(textKey, options),
    overdrive: (interval: number, frequency: number, hitRate: number, duration: number, shield: number, cooldown: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.OVERDRIVE).withDescriptionKey('overdrive', { interval, frequency, hitRate, duration, shield, cooldown }),
    antiAircraftSupport: (hitRate: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.ANTI_AIRCRAFT_SUPPORT).withDescriptionKey('antiAircraftSupport', { hitRate, interval, duration }),
    antiAircraftMeasures: (cooldownDown: number, duration: number, cooldown: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.ANTI_AIRCRAFT_MEASURES).withDescriptionKey('antiAircraftMeasures', { cooldownDown, duration, cooldown }),
    rapidFire: (value: number, interval: number, duration: number, cooldown: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.RAPID_FIRE).withDescriptionKey('rapidFire', { value, interval, duration, cooldown }),
    concentrateFirePeriodically: (reduceCooldown: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CONCENTRATE_FIRE_PERIODICALLY).withDescriptionKey('concentrateFirePeriodically', { reduceCooldown, interval, duration }),
    evasiveManeuvers: (hp: number, evasion: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.EVASIVE_MANEUVERS).withDescriptionKey('evasiveManeuvers', { hp, evasion, duration }),
    superCapitalStrike: (duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.SUPER_CAPITAL_STRIKE).withDescriptionKey('superCapitalStrike', { duration }),
    prioritizeTargets: () => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.PRIORITIZE_TARGETS).withDescriptionKey('prioritizeTargets'),
    prioritizeFirepower: (value: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.PRIORITIZE_FIREPOWER).withDescriptionKey('prioritizeFirepower', { value, interval, duration }),
    precisionStrike: (damage: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.PRECISION_STRIKE).withDescriptionKey('precisionStrike', { damage, interval, duration }),
    heavyAmmo: (damage: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.HEAVY_AMMO).withDescriptionKey('heavyAmmo', { damage, duration }),
    lightAmmo: (hitrate: number, cooldown: number, damage: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.LIGHT_AMMO).withDescriptionKey('lightAmmo', { hitrate, cooldown, damage }),
    activeInterference: (evasion: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.ACTIVE_INTERFERENCE).withDescriptionKey('activeInterference', { evasion, interval, duration }),
    focusedAttacks: (hitRate: number, evasion: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.FOCUSED_ATTACKS).withDescriptionKey('focusedAttacks', { hitRate, evasion, interval, duration }),
    sustainedDamageOutput: (roundsPerCycle: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.SUSTAINED_DAMAGE_OUTPUT).withDescriptionKey('sustainedDamageOutput', { roundsPerCycle, duration }),
    informationChain: (hitRate: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.INFORMATION_CHAIN).withDescriptionKey('informationChain', { hitRate }),
    allShipsFocusFire: (cooldown: number, interval: number, duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.ALL_SHIPS_FOCUS_FIRE).withDescriptionKey('allShipsFocusFire', { cooldown, interval, duration }),
    prioritizeSupport: (duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.PRIORITIZE_SUPPORT).withDescriptionKey('prioritizeSupport', { duration }),
    prioritizeSupport2: (duration: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.PRIORITIZE_SUPPORT_2).withDescriptionKey('prioritizeSupport2', { duration }),
    weakPointStrike: (critDamage: number, hp: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.WEAK_POINT_STRIKE).withDescriptionKey('weakPointStrike', { critDamage, hp }),
    closeCombatAssault1: (chance: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CLOSE_COMBAT_ASSAULT_1).withTextKey('closeCombatAssault').withDescriptionKey('closeCombatAssault1', { chance }),
    closeCombatAssault2: (chance: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CLOSE_COMBAT_ASSAULT_2).withTextKey('closeCombatAssault').withDescriptionKey('closeCombatAssault2', { chance }),
    speedUpRepair: (up: number, interval: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.SPEED_UP_REPAIR).withDescriptionKey('speedUpRepair', { up, interval }),
    keyTargets: (damage: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.KEY_TARGETS).withDescriptionKey('keyTargets', { damage }),
    pursueTargets: (hp: number, round: number, interval: number) => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.PURSUE_TARGETS).withDescriptionKey('pursueTargets', { hp, round, interval }),
    conentratedStrike: () => new Enhancement(EnhancementType.STRATEGY, EnhancementSubType.CONCENTRATED_STRIKE).withDescriptionKey('concentratedStrike'),
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
    private _unit: EnhancementValueUnit | null = null;
    private _cost: number | null = null;
    private _text: IEnhancementText | null = null;
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
        if (this._text) {
            return this._text.translatedDescription[getCurrentLanguage()] ?? this._text.description;
        }

        return this._descriptionKey ? t(this._descriptionKey, { defaultValue: '???', ...this._descriptionKeyOptions }) : null;
    }

    get condition(): string | null {
        if (this._text) {
            const text = this._text.translatedCondition?.[getCurrentLanguage()] ?? this._text.condition;
            if (text) {
                return text;
            }
        }
        return this._conditionKey ? t(this._conditionKey, { defaultValue: '???', ...this._conditionKeyOptions }) : null;
    }

    get value(): number | null {
        return this._value;
    }

    get value2(): number | null {
        return this._value2;
    }

    get unit(): EnhancementValueUnit | null {
        return this._unit;
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
        if (this._text) {
            return this._text.translatedName[getCurrentLanguage()] ?? this._text.name;
        }

        return t(this._textKey, {
            defaultValue: '???',
            ...this._textKeyOptions,
        });
    }

    get properties(): string[] {
        return [
            this.description ? t('label.effectColonValue', { effect: this.description }) : '',
            this._conditionKey ? t('label.conditionColonValue', { condition: this.condition }) : '',
            this.type === EnhancementType.STRATEGY ? t('enhancementType.strategy') : '',
            this._isDefault ? (Number(this._cost) > 0 ? t('enhancement.enabledByDefaultButUpgradableBrackets') : t('enhancement.enabledByDefaultBrackets')) : '',
            this.formatValuesAndCost() ?? '',
        ].filter(line => !!line);
    }

    public withText(text: IEnhancementText) {
        this._text = text;
        return this;
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

    public withUnit(unit: EnhancementValueUnit) {
        this._unit = unit;
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

    private getUnitSymbol(): string {
        if (this._hasPercentageValues) {
            return '%';
        }
        if (this._unit === 'degree') {
            return '°';
        }
        if (this._unit === 'seconds') {
            return t('quantity.secondShort');
        }
        return '';
    }

    private formatValuesAndCost(): string | null {
        const { value, value2, cost } = this;
        if (value !== null) {
            const unit = this.getUnitSymbol();
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
