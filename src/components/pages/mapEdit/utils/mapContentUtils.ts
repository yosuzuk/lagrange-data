import { t } from '../../../../i18n';
import { IMarker, IPlanet, IStation, PlatformType } from '../types/IMapContent';
import { formatGamePosition } from './coordinateUtils';

export function formatStationLabelForList(station: IStation): string {
    switch (station.type) {
        case 'city': {
            return station.name ?? t('mapEdit.station.city');
        }
        case 'subCity': {
            return station.name ?? t('mapEdit.station.subCity');
        }
        case 'stronghold': {
            return station.name ?? t('mapEdit.station.stronghold');
        }
        case 'base': {
            return station.name ?? t('mapEdit.station.base');
        }
        default: {
            return station.name ?? `${formatGamePosition(station.position)}`;
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
