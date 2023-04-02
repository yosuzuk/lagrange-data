import { GamePosition } from './Coordinates';
import { PlanetSize } from './PlanetSize';

export interface IMapContent {
    marker: IMarker[];
    regions: IRegion[];
    planets: IPlanet[];
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
    orbitCenter?: GamePosition;
    size: PlanetSize;
    color: string;
    name?: string;
}

export interface IParseMapContentError {
    line: number;
    message: string;
}
