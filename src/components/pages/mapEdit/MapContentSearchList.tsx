import { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IMapContent, IMapData, IMarker, IPlanet, IStation } from './types/IMapContent';
import { SearchInput } from '../../searchInput/SearchInput';
import { t } from '../../../i18n';
import { matchMarker, matchPlanet, matchStation } from './utils/mapContentUtils';
import { MapContentSearchListContent } from './MapContentSearchListContent';

interface IProps {
    mapData: IMapData;
    currentMenu: string;
    menuItemIdPrefix: string;
    onClickItem: (event: React.MouseEvent<HTMLLIElement>) => void;
    onClickRemoveItem: (content: IMapContent) => void;
}

export const MapContentSearchList = (props: IProps) => {
    const { mapData, currentMenu, menuItemIdPrefix, onClickItem, onClickRemoveItem } = props;
    const [searchTerm, setSearchTerm] = useState<string>('');

    const planets: IPlanet[] = useMemo(() => {
        if (currentMenu !== 'planets') {
            return [];
        }
        if (searchTerm.length === 0) {
            return mapData.planets;
        }
        return mapData.planets.filter(planet => matchPlanet(planet, searchTerm));
    }, [mapData, currentMenu, searchTerm]);

    const stations: IStation[] = useMemo(() => {
        if (currentMenu !== 'stations') {
            return [];
        }
        const searchableStations = mapData.stations.filter(station => station.type === 'city' || station.type === 'subCity');
        if (searchTerm.length === 0) {
            return searchableStations;
        }
        return searchableStations.filter(station => matchStation(station, searchTerm));
    }, [mapData, currentMenu, searchTerm]);

    const docks: IStation[] = useMemo(() => {
        if (currentMenu !== 'docks') {
            return [];
        }
        const searchableStations = mapData.stations.filter(station => station.type === 'dock');
        if (searchTerm.length === 0) {
            return searchableStations;
        }
        return searchableStations.filter(station => matchStation(station, searchTerm));
    }, [mapData, currentMenu, searchTerm]);

    const markers: IMarker[] = useMemo(() => {
        if (currentMenu !== 'markers') {
            return [];
        }
        if (searchTerm.length === 0) {
            return mapData.marker;
        }
        return mapData.marker.filter(marker => matchMarker(marker, searchTerm));
    }, [mapData, currentMenu, searchTerm]);

    const smallMenu = document.body.getBoundingClientRect().width < 640;

    return (
        <Stack spacing={1}>
            <Box component="div" p={1}>
                <SearchInput
                    id="map-content-search"
                    value={searchTerm}
                    lowerCase={true}
                    onChange={setSearchTerm}
                />
            </Box>
            {(planets.length + stations.length + docks.length + markers.length) > 0 ? (
                <MapContentSearchListContent
                    menuItemIdPrefix={menuItemIdPrefix}
                    planets={planets}
                    stations={stations}
                    docks={docks}
                    markers={markers}
                    onClickItem={onClickItem}
                    onClickRemoveItem={onClickRemoveItem}
                />
            ) : (
                <Box
                    component="div"
                    p={2}
                    sx={{
                        height: smallMenu ? '25vh' : '60vh',
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        {t('mapEdit.noContent')}
                    </Typography>
                </Box>
            )}
        </Stack>
    );
};
