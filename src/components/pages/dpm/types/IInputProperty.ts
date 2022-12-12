import { Unit } from './Unit';

export interface IInputProperty {
    type: string;
    id: string;
    label: string;
    description?: string;
}

export interface INumericInputProperty extends IInputProperty {
    type: 'numeric';
    value: number | null;
    min?: number;
    max?: number;
    unit?: Unit;
}

export interface ISelectInputProperty extends IInputProperty {
    type: 'select';
    value: string;
    options: IOptions[];
}

export interface IOptions {
    id: string;
    label: string;
    value: string;
}

export enum WeaponBasePropertyId {
    INSTALLATION = 'installation',
    DAMAGE_TYPE = 'damageType',
    DAMAGE_PER_HIT = 'damagePerHit',
    TUNE = 'tune',
    DURATION = 'duration',
    ATTACKS_PER_ROUND = 'attacksPerRound',
    SHOTS_PER_ATTACK = 'shotsPerAttack',
    COOLDOWN = 'cooldown',
    ATTACKS_PER_ROUND_ION = 'attacksPerRoundIon',
    SHOTS_PER_ATTACK_ION = 'shotsPerAttackIon',
    LOCK_ON_TIME = 'lockOnTime',
    LOCK_ON_BEHAVIOUR = 'lockOnBehaviour',
}

export interface IWeaponBaseProperties extends Record<WeaponBasePropertyId, IInputProperty> {
    [WeaponBasePropertyId.INSTALLATION]: INumericInputProperty;
    [WeaponBasePropertyId.DAMAGE_TYPE]: ISelectInputProperty;
    [WeaponBasePropertyId.DAMAGE_PER_HIT]: INumericInputProperty;
    [WeaponBasePropertyId.TUNE]: INumericInputProperty;
    [WeaponBasePropertyId.DURATION]: INumericInputProperty;
    [WeaponBasePropertyId.ATTACKS_PER_ROUND]: INumericInputProperty;
    [WeaponBasePropertyId.SHOTS_PER_ATTACK]: INumericInputProperty;
    [WeaponBasePropertyId.COOLDOWN]: INumericInputProperty;
    [WeaponBasePropertyId.ATTACKS_PER_ROUND_ION]: INumericInputProperty;
    [WeaponBasePropertyId.SHOTS_PER_ATTACK_ION]: INumericInputProperty;
    [WeaponBasePropertyId.LOCK_ON_TIME]: INumericInputProperty;
    [WeaponBasePropertyId.LOCK_ON_BEHAVIOUR]: ISelectInputProperty;
}

export enum WeaponEnhancementPropertyId {
    INCREASE_DAMAGE_PER_HIT = 'increaseDamagePerHit',
    REDUCE_DURATION = 'reduceDuration',
    REDUCE_COOLDOWN = 'reduceCooldown',
    REDUCE_LOCKON = 'reduceLockon',
    INCREASE_SHOTS_PER_ATTACK = 'increaseShotsPerAttack',
}

export interface IWeaponEnhancementProperties extends Record<WeaponEnhancementPropertyId, IInputProperty> {
    [WeaponEnhancementPropertyId.INCREASE_DAMAGE_PER_HIT]: INumericInputProperty;
    [WeaponEnhancementPropertyId.REDUCE_DURATION]: INumericInputProperty;
    [WeaponEnhancementPropertyId.REDUCE_COOLDOWN]: INumericInputProperty;
    [WeaponEnhancementPropertyId.REDUCE_LOCKON]: INumericInputProperty;
    [WeaponEnhancementPropertyId.INCREASE_SHOTS_PER_ATTACK]: INumericInputProperty;
}

export enum TargetPropertyId {
    HP = 'hp',
    ARMOR = 'armor',
    ENERGY_SHIELD = 'energyShield',
}

export interface ITargetProperties extends Record<TargetPropertyId, IInputProperty> {
    [TargetPropertyId.HP]: INumericInputProperty;
    [TargetPropertyId.ARMOR]: INumericInputProperty;
    [TargetPropertyId.ENERGY_SHIELD]: INumericInputProperty;
}
