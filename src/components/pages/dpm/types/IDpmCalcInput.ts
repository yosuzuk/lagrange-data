export interface IDpmCalcBaseProperties extends Record<string, IInputProperty> {
    installation: INumericInputProperty;
    damageType: ISelectInputProperty;
    targetPriority: ISelectInputProperty;
    damagePerHit: INumericInputProperty;
    tune: INumericInputProperty;
    duration: INumericInputProperty;
    rounds: INumericInputProperty;
    shotsPerRound: INumericInputProperty;
    cooldown: INumericInputProperty;
    rounds2: INumericInputProperty;
    shotsPerRound2: INumericInputProperty;
    lockOnTime: INumericInputProperty;
}

export interface IDpmCalcEnhancementProperties extends Record<string, IInputProperty> {
    increaseDamagePerHit: INumericInputProperty;
    reduceDuration: INumericInputProperty;
    reduceCooldown: INumericInputProperty;
    reduceLockon: INumericInputProperty;
}

export interface IInputProperty {
    type: string;
    id: string;
    label: string;
    description?: string;
}

export enum Unit {
    PERCENTAGE = 'PERCENTAGE',
    SECONDS = 'SECONDS',
    DPM = 'DPM',
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
