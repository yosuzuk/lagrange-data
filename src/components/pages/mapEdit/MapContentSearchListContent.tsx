import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { IMapContentWithStation, IMarker, IPlanet, IStation } from './types/IMapContent';
import { formatShortPlayerStructureType, formatStationLabelForList } from './utils/mapContentUtils';
import { useColorMode } from '../../../theme/context/ThemeProvider';
import Typography from '@mui/material/Typography';
import { CanvasClone } from './CanvasClone';
import Stack from '@mui/material/Stack';
import { SecondaryButton } from './Button';
import { t } from '../../../i18n';
import { useMapInteraction } from './context/MapInteractionContext';

interface IProps {
    menuItemIdPrefix: string;
    planets: IPlanet[];
    stations: IStation[];
    docks: IStation[];
    playerStructures: IMapContentWithStation[];
    markers: IMarker[];
    onClickItem: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const THRESHOLD = 20;

export const MapContentSearchListContent = (props: IProps) => {
    const { menuItemIdPrefix, planets, stations, docks, playerStructures, markers, onClickItem } = props;
    const totalCount = planets.length + stations.length + docks.length + markers.length;
    const [ready, setReady] = useState<boolean>(totalCount > THRESHOLD ? false : true);
    const colorMode = useColorMode();
    const { editContent, removeContent } = useMapInteraction();

    const smallMenu = document.body.getBoundingClientRect().width < 640;

    useEffect(() => {
        if (totalCount > THRESHOLD) {
            setReady(true);
        }
    }, [totalCount]);

    if (!ready) {
        return (
            <Box
                component="div"
                p={2}
                sx={{
                    height: smallMenu ? '25vh' : '60vh',
                }}
            >
                <Typography variant="body1" color="text.secondary">
                    {'Loading...'}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <MenuList
                id="map-content-menu"
                aria-labelledby="composition-button"
                dense={true}
                sx={{
                    height: smallMenu ? '25vh' : '60vh',
                    overflowY: 'auto',
                    paddingTop: 0,
                }}
            >
                {[
                    <Divider key="first-divider" />,
                    ...(planets.flatMap(planet => [
                        <MenuItem
                            key={planet.id}
                            id={menuItemIdPrefix + planet.id}
                            onClick={onClickItem}
                            disableGutters={true}
                        >
                            <ListItemText sx={{ padding: '0 6px' }}>
                                {planet.name ?? planet.position}
                            </ListItemText>
                        </MenuItem>,
                        <Divider key={`divider_${planet.id}`} style={{ margin: 0 }} />
                    ])),
                    ...([...stations, ...docks].flatMap(station => [
                        <MenuItem
                            key={station.id}
                            id={menuItemIdPrefix + station.id}
                            onClick={onClickItem}
                            disableGutters={true}
                            sx={{ paddingRight: '4px', columnGap: '8px' }}
                        >
                            <Stack
                                spacing={0.5}
                                sx={{
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    padding: '4px',
                                    width: '30px',
                                    backgroundColor: colorMode.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                }}
                            >
                                <CanvasClone canvas={station.icon} />
                                <Box
                                    component="span"
                                    sx={{ fontSize: 'xx-small', color: 'text.secondary', }}
                                >
                                    {station.level ? `Lv${station.level}` : null}
                                </Box>
                            </Stack>
                            <ListItemText sx={{ padding: '0 6px' }} primaryTypographyProps={{ component: 'pre' }}>
                                {formatStationLabelForList(station)}
                            </ListItemText>
                            {station.type === 'dock' && (
                                <>
                                    <SecondaryButton onClick={e => {
                                        e.stopPropagation();
                                        editContent(station);
                                    }}>{t('button.edit')}</SecondaryButton>
                                    <SecondaryButton onClick={e => {
                                        e.stopPropagation();
                                        removeContent(station);
                                    }}>{t('button.delete')}</SecondaryButton>
                                </>
                            )}
                        </MenuItem>,
                        <Divider key={`divider_${station.id}`} style={{ margin: 0 }} />
                    ])),
                    ...(playerStructures.flatMap(structure => [
                        <MenuItem
                            key={structure.id}
                            id={menuItemIdPrefix + structure.id}
                            onClick={onClickItem}
                            disableGutters={true}
                            sx={{ padding: 0, paddingRight: '4px', columnGap: '8px' }}
                        >
                            <Stack
                                spacing={0.5}
                                sx={{
                                    justifyContent: 'center',
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                    padding: '4px',
                                    minWidth: '50px',
                                    backgroundColor: colorMode.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                }}
                            >
                                <CanvasClone canvas={structure.station.icon} />
                                <Box
                                    component="span"
                                    sx={{ fontSize: 'small', color: 'text.secondary', }}
                                >
                                    {formatShortPlayerStructureType(structure)}
                                </Box>
                            </Stack>
                            <ListItemText sx={{ padding: '0 6px' }} primaryTypographyProps={{ component: 'pre' }}>
                                {formatStationLabelForList(structure.station)}
                            </ListItemText>
                            <SecondaryButton onClick={e => {
                                e.stopPropagation();
                                editContent(structure);
                            }}>{t('button.edit')}</SecondaryButton>
                            <SecondaryButton onClick={e => {
                                e.stopPropagation();
                                removeContent(structure);
                            }}>{t('button.delete')}</SecondaryButton>
                        </MenuItem>,
                        <Divider key={`divider_${structure.id}`} style={{ margin: 0 }} />
                    ])),
                    ...(markers.map(marker => [
                        <MenuItem
                            key={marker.id}
                            id={menuItemIdPrefix + marker.id}
                            onClick={onClickItem}
                            disableGutters={true}
                            sx={{ paddingRight: '4px', columnGap: '8px' }}
                        >
                            <ListItemText sx={{ padding: '0 6px' }} primaryTypographyProps={{ component: 'pre' }}>
                                {marker.label ?? marker.position}
                            </ListItemText>
                            <SecondaryButton onClick={e => {
                                e.stopPropagation();
                                editContent(marker);
                            }}>{t('button.edit')}</SecondaryButton>
                            <SecondaryButton onClick={e => {
                                e.stopPropagation();
                                removeContent(marker);
                            }}>{t('button.delete')}</SecondaryButton>
                        </MenuItem>,
                        <Divider key={`divider_${marker.id}`} style={{ margin: 0 }} />
                    ]))
                ]}
            </MenuList>
        </>
    );
};
