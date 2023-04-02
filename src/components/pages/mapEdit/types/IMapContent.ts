import { GamePosition } from './Coordinates';

export interface IMapContent {
    marker: IMarker[];
    regions: IRegion[];
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

export interface IParseMapContentError {
    line: number;
    message: string;
}
