export interface IZoomLevel {
    fromDistance: number;
    untilDistance: number;
    visibility: IZoomBasedVisibility;
    opacity: IZoomBasedOpacity;
}

export interface IZoomBasedVisibility {
    zoneBackground: boolean;
    zoneLabel: boolean;
    gameGrid: boolean;
    planetLabel: boolean;
    subPlanetOrbit: boolean;
    markerLabel: boolean;
    baseLabel: boolean;
    stationCone: boolean;

    // city
    cityIcon: boolean;
    cityLabel: boolean;
    cityLabel7up: boolean;
    cityLevel: boolean;

    // area
    defaultArea: boolean;
    defaultAreaEdge: boolean;
    cityArea: boolean;
    cityAreaEdge: boolean;
}

export interface IZoomBasedOpacity {
    zoneBackground: number;
    areaBackground: number;
}
