import { IDpmCalcEnhancementProperties } from './IDpmCalcInput';

export interface ITab {
    id: string;
    name: string;
    defaultName: (index: number) => string;
}

export interface IEnhancementTab extends ITab {
    properties: IDpmCalcEnhancementProperties;
}
