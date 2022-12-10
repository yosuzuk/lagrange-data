import { ITargetProperties, IWeaponBaseProperties, IWeaponEnhancementProperties, TargetPropertyId, WeaponBasePropertyId, WeaponEnhancementPropertyId } from './IInputProperty';
import { Unit } from './Unit';

export interface IOutputProperty {
    type: string;
    id: string;
    label: string;
    description?: string;
    formula?: IFormula;
    dependsOnInput?: Array<WeaponBasePropertyId | WeaponEnhancementPropertyId | TargetPropertyId>;
    dependsOnOutput?: OutputPropertyId[];
}

export interface INumericOutputProperty extends IOutputProperty {
    type: 'numeric';
    value: number | null;
    unit?: Unit;
    update: (args: IUpdateArguments, self: INumericOutputProperty) => INumericOutputProperty;
}

export interface IUpdateArguments {
    weaponBaseProperties: IWeaponBaseProperties;
    weaponEnhancementProperties: IWeaponEnhancementProperties;
    targetProperties: ITargetProperties;
    outputProperties: IOutputProperties;
}

export interface IFormula {
    formula: (args: IUpdateArguments) => string; // e.g. "X = A + B"
    filledFormula?: string | null; // e.g. "3 = 1 + 2"
    description?: string;
}

export enum OutputPropertyId {
    DAMAGE_PER_HIT_IN_STATUS = 'damagePerHitInStatus',
    DAMAGE_PER_HIT_IN_BATTLE = 'damagePerHitInBattle',
    DURATION = 'duration',
    COOLDOWN = 'cooldown',
    LOCK_ON_TIME = 'lockOnTime',
    ROUND_TIME = 'roundTime',
    TIME_TO_DESTROY_TARGET = 'timeToDestroyTarget',
}

export interface IOutputProperties extends Record<OutputPropertyId, IOutputProperty> {
    [OutputPropertyId.DAMAGE_PER_HIT_IN_STATUS]: INumericOutputProperty;
    [OutputPropertyId.DAMAGE_PER_HIT_IN_BATTLE]: INumericOutputProperty;
    [OutputPropertyId.DURATION]: INumericOutputProperty;
    [OutputPropertyId.COOLDOWN]: INumericOutputProperty;
    [OutputPropertyId.LOCK_ON_TIME]: INumericOutputProperty;
    [OutputPropertyId.ROUND_TIME]: INumericOutputProperty;
    [OutputPropertyId.TIME_TO_DESTROY_TARGET]: INumericOutputProperty;
}
