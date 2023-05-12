export interface IZoomLevel {
    fromDistance: number;
    untilDistance: number;
    visibility: Record<string, boolean>;
    opacity: Record<string, number>;
}
