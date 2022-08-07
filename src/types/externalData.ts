export interface IShipStatsAndLocalizationJson {
    Data: IShipStatsAndLocalization[];
}

export type ShipStatsAndLocalizationByShipId = Record<string, IShipStatsAndLocalization>;

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
