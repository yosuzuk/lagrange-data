import { GamePosition } from './Coordinates';

export interface IMapContent {
    marker: IMarker[];
}

export interface IMarker {
    id: string;
    position: GamePosition;
    color: string;
    label: string | null;
}

export interface IParseMapContentError {
    line: number;
    message: string;
}
