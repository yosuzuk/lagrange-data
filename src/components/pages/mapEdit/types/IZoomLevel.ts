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
}

export interface IZoomBasedOpacity {
    zoneBackground: number;
}
