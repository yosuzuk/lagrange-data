import shipStatsAndLocalization from '../data/external/shipStatsAndLocalization.json';

interface IShipStatsAndLocalizationJson {
    Data: IShipStatsAndLocalization[];
}

type ShipStatsAndLocalizationByShipId = Record<string, IShipStatsAndLocalization>;

export interface IShipStatsAndLocalization {
    ID: string;
    JA: string;
    EN: string;
    DE: string;
    hp: string;
    speed: string;
    warpSpeed: string;
    dpmShip: string;
    dpmAntiAir: string;
    dpmSiege: string;
}

const shipStatsAndLocalizationByShipId: ShipStatsAndLocalizationByShipId = (shipStatsAndLocalization as IShipStatsAndLocalizationJson).Data.reduce((acc, next) => ({
    ...acc,
    [next.ID]: next,
}), {} as ShipStatsAndLocalizationByShipId);

export function getShipStatsAndLocalizationByShipId(shipId: string): IShipStatsAndLocalization | null {
    return shipStatsAndLocalizationByShipId[shipId] ?? null;
}
