import { GamePosition } from './Coordinates';
import { PlanetSize } from './PlanetSize';

export interface IMap {
    system: IStarSystem | null;
    marker: IMarker[];
    regions: IRegion[];
    planets: IPlanet[];
    stations: IStation[];
    areas: IArea[];
    bases: IPlayerBase[];
}

export interface IStarSystem {
    startPoint: GamePosition | null;
    endPoint: GamePosition | null;
    centerPoint: GamePosition | null;
    name: string | null;
}

export interface IMarker {
    id: string;
    position: GamePosition;
    color: string;
    label: string | null;
}

export interface IRegion {
    id: string;
    innerRadiusPoint: GamePosition;
    outerRadiusPoint: GamePosition;
    angleStartPoint: GamePosition;
    angleEndPoint: GamePosition;
    color: string;
    regionNumber: number;
    label: string | null;
}

export interface IPlanet {
    id: string;
    position: GamePosition;
    orbitCenter: GamePosition | null;
    size: PlanetSize;
    color: string;
    name: string | null;
}

export type StationType = 'city' | 'stronghold' | 'base' | 'default';

export interface IStation {
    id: string;
    position: GamePosition;
    type: StationType;
    level: number | null;
    color: string;
    name: string | null;
}

export type AreaType = 'city' | 'default';

export interface IArea {
    id: string;
    type: AreaType;
    position1: GamePosition;
    position2: GamePosition;
    color: string;
}

export interface IPlayerBase {
    id: string;
    station: IStation;
    area: IArea;
}

export interface IParseMapContentError {
    line: number;
    message: string;
}
