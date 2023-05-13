import { t } from '../../../../i18n';
import { IArea, IHive, IMapContent, IMarker, IPlanet, IPlayerBase, IPlayerOutpost, IPlayerPlatform, IStation, ITemporaryLocation, PlatformType, StationType } from '../types/IMapContent';
import { formatGamePosition, parseGamePosition, toGridPosition } from './coordinateUtils';

let idCounter = 0;

export function createTemporaryLocation(x: number, y: number): ITemporaryLocation {
    return {
        id: `temporaryLocation${idCounter++}`,
        lineNumber: -1,
        contentType: 'temporaryLocation',
        x,
        y,
    };
}

export function formatStationLabelForList(station: IStation): string {
    return station.name || getStationTypeText(station.type);
}

export function getStationTypeText(stationType: StationType): string {
    switch (stationType) {
        case 'city': {
            return t('mapEdit.station.city');
        }
        case 'subCity': {
            return t('mapEdit.station.subCity');
        }
        case 'stronghold': {
            return t('mapEdit.station.stronghold');
        }
        case 'base': {
            return t('mapEdit.station.base');
        }
        case 'dock': {
            return t('mapEdit.station.dock');
        }
        case 'outpost': {
            return t('mapEdit.station.outpost');
        }
        case 'platform': {
            return t('mapEdit.station.platform');
        }
        default: {
            return t('mapEdit.station.default');;
        }
    }
}

export function formatPlatformLabel(platformType: PlatformType): string {
    switch (platformType) {
        case 'basic':
        case 'bmp': {
            return t('mapEdit.station.bmp');
        }
        case 'intermediate':
        case 'imp': {
            return t('mapEdit.station.imp');
        }
        case 'advanced':
        case 'amp': {
            return t('mapEdit.station.amp');
        }
    }
}

export function matchStation(station: IStation, searchTerm: string): boolean {
    if (station.level !== null) {
        return `${station.name?.toLowerCase()} lv${station.level}`.includes(searchTerm) ?? false;
    }
    if (station.name) {
        return station.name.toLowerCase().includes(searchTerm);
    }
    return formatGamePosition(station.position).includes(searchTerm);
}

export function matchMarker(marker: IMarker, searchTerm: string): boolean {
    if (marker.label) {
        return marker.label.toLowerCase().includes(searchTerm);
    }
    return formatGamePosition(marker.position).includes(searchTerm);
}

export function matchPlanet(planet: IPlanet, searchTerm: string): boolean {
    if (planet.name) {
        return planet.name.toLowerCase().includes(searchTerm);
    }
    return formatGamePosition(planet.position).includes(searchTerm);
}

export function getPrimaryCoordinatesForMapContent(mapContent: IMapContent): [number | null, number | null] {
    switch (mapContent.contentType) {
        case 'station': {
            const station = mapContent as IStation;
            return parseGamePosition(station.position);
        }
        case 'marker': {
            const marker = mapContent as IMarker;
            return parseGamePosition(marker.position);
        }
        case 'base': {
            const base = mapContent as IPlayerBase;
            return parseGamePosition(base.station.position);
        }
        case 'outpost': {
            const outpost = mapContent as IPlayerOutpost;
            return parseGamePosition(outpost.station.position);
        }
        case 'planet': {
            const planet = mapContent as IPlanet;
            return parseGamePosition(planet.position);
        }
        case 'region': {
            return [null, null];
        }
        case 'hive':
        case 'area': {
            const area = mapContent as IArea;
            const [x1, y1] = parseGamePosition(area.position1);
            const [x2, y2] = parseGamePosition(area.position2);
            return [
                Math.min(x1, x2) + Math.round((x2 > x1 ? (x2 - x1) : (x1 - x2)) / 2),
                Math.min(y1, y2) + Math.round((y2 > y1 ? (y2 - y1) : (y1 - y2)) / 2),
            ];
        }
        case 'platform': {
            const platform = mapContent as IPlayerPlatform;
            return parseGamePosition(platform.station.position);
        }
        case 'temporaryLocation': {
            const temporaryLocation = mapContent as ITemporaryLocation;
            return [temporaryLocation.x, temporaryLocation.y];
        }
        default: {
            throw new Error(`Cannot get primary coordinates for type "${mapContent.contentType}"`);
        }
    }
}

export function getPrimaryGridPositionForMapContent(mapContent: IMapContent, gridSize: number): [number | null, number | null] {
    const [gameX, gameY] = getPrimaryCoordinatesForMapContent(mapContent);
    if (gameX === null || gameY === null) {
        return [null, null];
    }
    return toGridPosition([gameX, gameY], gridSize);
}

export function mapContentToText(mapContent: IMapContent): string | null {
    switch (mapContent.contentType) {
        case 'station': {
            const { type, name, level } = mapContent as IStation;
            return `${name ? convertLineBreaks(name) : getStationTypeText(type)} ${level !== null ? `Lv${level}` : ''}`.trim();
        }
        case 'marker': {
            const { label } = mapContent as IMarker;
            return label ? convertLineBreaks(label) : t('mapEdit.marker');
        }
        case 'base': {
            return mapContentToText((mapContent as IPlayerBase).station);
        }
        case 'outpost': {
            return mapContentToText((mapContent as IPlayerOutpost).station);
        }
        case 'planet': {
            const { name, position } = mapContent as IPlanet;
            return name ? convertLineBreaks(name) : t('mapEdit.planet');
        }
        case 'area': {
            const { position1, position2 } = mapContent as IArea;
            return `${t('mapEdit.area')} ${formatGamePosition(position1)}/${formatGamePosition(position2)}`
        }
        case 'platform': {
            return mapContentToText((mapContent as IPlayerPlatform).station);
        }
        case 'hive': {
            const { label } = mapContent as IHive;
            return label ? convertLineBreaks(label) : t('mapEdit.hive');
        }
        default: {
            return null;
        }
    }
}

function convertLineBreaks(text: string): string {
    return text.replaceAll('#r', '\n');
}
