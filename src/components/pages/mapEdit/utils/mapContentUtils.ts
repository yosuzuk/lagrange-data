import { t } from '../../../../i18n';
import { IStation } from '../types/IMapContent';
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

export function matchStation(station: IStation, searchTerm: string): boolean {
    if (station.level !== null) {
        return `${station.name?.toLowerCase()} lv${station.level}`.includes(searchTerm) ?? false;
    }
    return station.name?.toLowerCase().includes(searchTerm) ?? false;
}
