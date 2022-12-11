import { IInputProperty, ITargetProperties, IWeaponEnhancementProperties } from './IInputProperty';

export interface ITab {
    id: string;
    name: string;
    defaultName: (index: number) => string;
}

export interface IPropertyTab<T> extends ITab {
    properties: T;
}
