import shipStatsAndLocalization from '../data/external/shipStatsAndLocalization.json';
import { IModuleStatsAndLocalization, IShipStatsAndLocalization, IShipStatsAndLocalizationJson, ModuleStatsAndLocalizationByShipIdAndModuleId, ShipStatsAndLocalizationByShipId } from '../types/externalData';

const { Data, Modules } = (shipStatsAndLocalization as IShipStatsAndLocalizationJson);

const shipStatsAndLocalizationByShipId: ShipStatsAndLocalizationByShipId = Data.reduce((acc, next) => ({
    ...acc,
    [next.ID]: next,
}), {} as ShipStatsAndLocalizationByShipId);

const moduleStatsAndLocalizationByShipIdAndModuleId: ModuleStatsAndLocalizationByShipIdAndModuleId = Modules.reduce((acc, next) => {
    const { ID, Module } = next;
    const moduleId = Module.substr(0, 2); // e.g. "A1*" to "A1"
    return {
        ...acc,
        [ID]: {
            ...acc[ID],
            [moduleId]: next,
        },
    };
}, {} as ModuleStatsAndLocalizationByShipIdAndModuleId);

export function getShipStatsAndLocalizationByShipId(shipId: string): IShipStatsAndLocalization | null {
    return shipStatsAndLocalizationByShipId[shipId] ?? null;
}

export function getModuleStatsAndLocalizationByShipIdAndModuleId(shipId: string, moduleId: string): IModuleStatsAndLocalization | null {
    return moduleStatsAndLocalizationByShipIdAndModuleId[shipId][moduleId] ?? null;
}
