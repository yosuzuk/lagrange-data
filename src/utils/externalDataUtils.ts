import shipStatsAndLocalization from '../data/external/shipStatsAndLocalization.json';
import { IShipStatsAndLocalization, IShipStatsAndLocalizationJson, ShipStatsAndLocalizationByShipId } from '../types/externalData';

const { Data } = (shipStatsAndLocalization as IShipStatsAndLocalizationJson);

const shipStatsAndLocalizationByShipId: ShipStatsAndLocalizationByShipId = Data.reduce((acc, next) => ({
    ...acc,
    [next.ID]: next,
}), {} as ShipStatsAndLocalizationByShipId);

export function getShipStatsAndLocalizationByShipId(shipId: string): IShipStatsAndLocalization | null {
    return shipStatsAndLocalizationByShipId[shipId] ?? null;
}
