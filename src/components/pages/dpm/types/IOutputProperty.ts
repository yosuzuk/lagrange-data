import { IShipProperties, ITargetProperties, IWeaponBaseProperties, IWeaponEnhancementProperties, ShipPropertyId, TargetPropertyId, WeaponBasePropertyId, WeaponEnhancementPropertyId } from './IInputProperty';
import { Unit } from './Unit';

export interface IOutputProperty {
    type: string;
    id: string;
    label: string;
    description?: string;
    formula?: IFormula;
    dependsOn?: DependsOn;
    hidden?: boolean;
}

export type DependsOn = {
    shipProperties?: ShipPropertyId[];
    weaponBaseProperties?: WeaponBasePropertyId[];
    weaponEnhancementProperties?: WeaponEnhancementPropertyId[];
    targetProperties?: TargetPropertyId[];
    outputProperties?: OutputPropertyId[];
};

export interface INumericOutputProperty extends IOutputProperty {
    type: 'numeric';
    value: number | null;
    unit?: Unit;
    update: (args: IUpdateOutputPropertyArguments, self: INumericOutputProperty) => INumericOutputProperty;
}

export interface IUpdateOutputPropertyArguments {
    shipProperties: IShipProperties;
    weaponBaseProperties: IWeaponBaseProperties;
    weaponEnhancementProperties: IWeaponEnhancementProperties;
    targetProperties: ITargetProperties;
    outputProperties: IOutputProperties;
}

export interface IFormula {
    formula: string; // e.g. "X = A + B"
    filledFormula?: string | string[] | null; // e.g. "3 = 1 + 2"
    description?: string;
}

export enum OutputPropertyId {
    DAMAGE_PER_HIT_IN_STATUS = 'damagePerHitInStatus',
    DAMAGE_PER_HIT_IN_BATTLE = 'damagePerHitInBattle',
    DURATION = 'duration',
    COOLDOWN = 'cooldown',
    LOCK_ON_TIME = 'lockOnTime',
    ATTACKS_PER_ROUND = 'attacksPerRound',
    SHOTS_PER_ATTACK = 'shotsPerAttack',
    ROUND_TIME = 'roundTime',
    DAMAGE_PER_ROUND_IN_STATUS = 'damagePerRoundInStatus',
    DAMAGE_PER_ROUND_IN_BATTLE = 'damagePerRoundInBattle',
    TIME_TO_DESTROY_TARGET = 'timeToDestroyTarget',
    WEAPON_DPM_IN_STATUS = 'weaponDpmInStatus',
    WEAPON_DPM_IN_BATTLE = 'weaponDpmInBattle',
    SQUAD_WEAPON_DPM_IN_STATUS = 'squadDpmInStatus',
    SQUAD_WEAPON_DPM_IN_BATTLE = 'squadDpmInBattle',
}

export interface IOutputProperties extends Record<OutputPropertyId, IOutputProperty> {
    [OutputPropertyId.DAMAGE_PER_HIT_IN_STATUS]: INumericOutputProperty;
    [OutputPropertyId.DAMAGE_PER_HIT_IN_BATTLE]: INumericOutputProperty;
    [OutputPropertyId.DURATION]: INumericOutputProperty;
    [OutputPropertyId.COOLDOWN]: INumericOutputProperty;
    [OutputPropertyId.LOCK_ON_TIME]: INumericOutputProperty;
    [OutputPropertyId.ATTACKS_PER_ROUND]: INumericOutputProperty;
    [OutputPropertyId.SHOTS_PER_ATTACK]: INumericOutputProperty;
    [OutputPropertyId.ROUND_TIME]: INumericOutputProperty;
    [OutputPropertyId.DAMAGE_PER_ROUND_IN_STATUS]: INumericOutputProperty;
    [OutputPropertyId.DAMAGE_PER_ROUND_IN_BATTLE]: INumericOutputProperty;
    [OutputPropertyId.TIME_TO_DESTROY_TARGET]: INumericOutputProperty;
    [OutputPropertyId.WEAPON_DPM_IN_STATUS]: INumericOutputProperty;
    [OutputPropertyId.WEAPON_DPM_IN_BATTLE]: INumericOutputProperty;
    [OutputPropertyId.SQUAD_WEAPON_DPM_IN_STATUS]: INumericOutputProperty;
    [OutputPropertyId.SQUAD_WEAPON_DPM_IN_BATTLE]: INumericOutputProperty;
}
