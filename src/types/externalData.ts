export interface IShipStatsAndLocalizationJson {
    Data: IShipStatsAndLocalization[];
}

export interface IShipStatsAndLocalization {
    ID: string;
    JA: string;
    EN: string;
    DE: string;
    HP: string;
    speed: string;
    warp: string;
    dpmShip: string; // number as string
    dpmAntiAir: string;
    dpmSiege: string;
}

export type ShipStatsAndLocalizationByShipId = Record<string, IShipStatsAndLocalization>;
