import { ITargetProperties, IWeaponEnhancementProperties } from './IInputProperty';

export interface ITab {
    id: string;
    name: string;
    defaultName: (index: number) => string;
}

export interface IEnhancementTab extends ITab {
    properties: IWeaponEnhancementProperties;
}

export interface ITargetTab extends ITab {
    properties: ITargetProperties;
}
