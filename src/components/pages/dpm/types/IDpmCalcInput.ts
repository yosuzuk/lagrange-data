export interface IDpmCalcInput extends Record<string, IInputProperty> {
    installation: INumericInputProperty;
    baseDpm: INumericInputProperty;
    damageType: ISelectInputProperty;
    targetPriority: ISelectInputProperty;
    damagePerHit: INumericInputProperty;
    tune: INumericInputProperty;
    duration: INumericInputProperty;
    cooldown: INumericInputProperty;
    rounds: INumericInputProperty;
    shotsPerRound: INumericInputProperty;
    lockOnTime: INumericInputProperty;
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
