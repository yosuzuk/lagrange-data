import { GamePosition } from './Coordinates';
import { PlanetSize } from './PlanetSize';

export interface IMap {
    name: string | null;
    size: number | null;
    marker: IMarker[];
    regions: IRegion[];
    planets: IPlanet[];
    stations: IStation[];
    areas: IArea[];
    bases: IPlayerBase[];
}

export interface IMapContent {
    id: string;
    contentType: string;
    lineNumber: number;
}

export interface IMarker extends IMapContent {
    contentType: 'marker',
    position: GamePosition;
    color: string;
    label: string | null;
}

export interface IRegion extends IMapContent {
    contentType: 'region',
    innerRadiusPoint: GamePosition;
    outerRadiusPoint: GamePosition;
    angleStartPoint: GamePosition;
    angleEndPoint: GamePosition;
    color: string;
    regionNumber: number;
    label: string | null;
}

export interface IPlanet extends IMapContent {
    contentType: 'planet',
    position: GamePosition;
    orbitCenter: GamePosition | null;
    size: PlanetSize;
    color: string;
    name: string | null;
}

export type StationType = 'city' | 'stronghold' | 'base' | 'default';

export interface IStation extends IMapContent {
    contentType: 'station',
    position: GamePosition;
    type: StationType;
    level: number | null;
    color: string;
    name: string | null;
}

export type AreaType = 'city' | 'default';

export interface IArea extends IMapContent {
    contentType: 'area',
    type: AreaType;
    position1: GamePosition;
    position2: GamePosition;
    color: string;
}

export interface IPlayerBase extends IMapContent {
    contentType: 'base',
    station: IStation;
    area: IArea;
}

export interface IParseMapContentError {
    line: number;
    message: string;
}
