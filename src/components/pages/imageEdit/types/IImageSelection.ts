export interface IImageSelection {
    id: string;
    file: File;
    dataUrl: string;
    imageInfo: IImageInfo;
    canvasInfo: ICanvasInfo | null;
}

export interface IImageInfo {
    aspectRatio: number;
    width: number;
    height: number;
}

export interface ICanvasInfo {
    width: number;
    height: number;
    scale: number;
}

export interface IImageModifier {
    cutTop: number;
    moveUp: number;
}
