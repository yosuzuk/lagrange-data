export interface IShipStatsAndLocalizationJson {
    Data: IShipStatsAndLocalization[];
    Modules: IModuleStatsAndLocalization[];
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

export interface IModuleStatsAndLocalization {
    ID: string;
    Module: string; // e.g. "A1", "A1*"
    JA: string;
    EN: string;
    DE: string;
    dpmShip: string; // number as string
    dpmAntiAir: string;
    dpmSiege: string;
}

export type ShipStatsAndLocalizationByShipId = Record<string, IShipStatsAndLocalization>;
export type ModuleStatsAndLocalizationByShipIdAndModuleId = Record<string, Record<string, IModuleStatsAndLocalization>>;
