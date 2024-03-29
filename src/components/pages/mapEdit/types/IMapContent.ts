import { GamePosition } from './Coordinates';
import { PlanetSize } from './PlanetSize';

export interface IMapData {
    name: string | null;
    serverName: string | null;
    size: number | null;
    marker: IMarker[];
    regions: IRegion[];
    planets: IPlanet[];
    stations: IStation[];
    shapes: IShape[];
    areas: IArea[];
    hives: IHive[];
    bases: IPlayerBase[];
    outposts: IPlayerOutpost[];
    platforms: IPlayerPlatform[];
    overlayText: IOverlayText[];
}

export interface IMapContent {
    id: string;
    contentType: string;
    lineNumber: number;
}

export interface IMarker extends IMapContent {
    contentType: 'marker';
    position: GamePosition;
    color: string;
    label: string | null;
}

export interface IRegion extends IMapContent {
    contentType: 'region';
    innerRadiusPoint: GamePosition;
    outerRadiusPoint: GamePosition;
    angleStartPoint: GamePosition;
    angleEndPoint: GamePosition;
    color: string;
    regionNumber: number;
    label: string | null;
}

export interface IPlanet extends IMapContent {
    contentType: 'planet';
    position: GamePosition;
    orbitCenter: GamePosition | null;
    size: PlanetSize;
    color: string;
    name: string | null;
    labelImage: HTMLCanvasElement | null;
}

export type StationType = 'city' | 'subCity' | 'stronghold' | 'base' | 'outpost' | 'platform' | 'dock' | 'default';

export interface IStation extends IMapContent {
    contentType: 'station';
    position: GamePosition;
    type: StationType;
    level: number | null;
    color: string;
    name: string | null;
    icon: HTMLCanvasElement;
    iconCenteredLabel: HTMLCanvasElement | null;
    textCenteredLabel: HTMLCanvasElement | null;
    iconCenteredLabelWithLevel: HTMLCanvasElement | null;
    textCenteredLabelWithLevel: HTMLCanvasElement | null;
    area?: IArea;
}

export interface IMapContentWithStation extends IMapContent {
    station: IStation;
}

export type ShapeType = 'filled' | 'outlined';

export interface IShape extends IMapContent {
    contentType: 'shape';
    type: ShapeType;
    positions: GamePosition[];
    color: string;
}

export type AreaType = 'city' | 'default';

export interface IArea extends IMapContent {
    contentType: 'area';
    type: AreaType;
    position1: GamePosition;
    position2: GamePosition;
    color: string;
}

export interface IHive extends IMapContent {
    contentType: 'hive';
    position1: GamePosition;
    position2: GamePosition;
    color: string;
    label: string | null;
}

export interface IPlayerBase extends IMapContentWithStation {
    contentType: 'base';
}

export interface IPlayerOutpost extends IMapContentWithStation {
    contentType: 'outpost';
}

export type PlatformType = 'basic' | 'intermediate' | 'advanced' | 'bmp' | 'imp' | 'amp';

export interface IPlayerPlatform extends IMapContentWithStation {
    contentType: 'platform';
    type: PlatformType;
}

export interface ITemporaryLocation extends IMapContent {
    contentType: 'temporaryLocation';
    x: number;
    y: number;
}

export interface IOverlayText {
    text: string;
    type: 'normal' | 'h1' | 'h2' | 'h3';
}

export interface IParseMapContentError {
    line: number;
    message: string;
}
