import { useState, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IMapContent, IMapData } from './types/IMapContent';
import { MapContentSearchList } from './MapContentSearchList';

const MENU_ITEM_ID_PREFIX = 'menuItem.';

interface IProps {
    mapData: IMapData;
    onRemoveContent: (content: IMapContent) => void;
}

export const MapNavigatorBar = (props: IProps) => {
    const { mapData, onRemoveContent } = props;
    const [currentMenu, setCurrentMenu] = useState<string | null>(null);
    const menuRootRef = useRef<HTMLDivElement>(null);

    const handleClickMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const menuId = event.currentTarget?.id ?? 'unknown';
        setCurrentMenu(currentMenu => {
            console.log({
                currentMenu,
                menuId
            });
            return currentMenu === menuId ? null : menuId;
        });
    }, []);

    const handleClose = useCallback(() => {
        setCurrentMenu(null);
    }, []);

    const handleClickListItem = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
        const menuItemId = event.currentTarget?.id ?? null;
        if (!menuItemId) {
            throw new Error('Missing id');
        }

        const contentId = menuItemId.substring(MENU_ITEM_ID_PREFIX.length);

        switch (currentMenu) {
            case 'planets': {
                const planet = mapData.planets.find(p => p.id === contentId);
                console.log(planet);
                break;
            }
            case 'stations': {
                const station = mapData.stations.find(s => s.id === contentId);
                console.log(station);
                break;
            }
            case 'markers': {
                const marker = mapData.marker.find(m => m.id === contentId);
                console.log(marker);
                break;
            }
        }
        setCurrentMenu(null);
    }, [currentMenu, mapData]);

    return (
        <Box
            component="div"
            sx={{
                position: 'absolute',
                left: '6px',
                bottom: '16px',
                border: '1px solid grey',
            }}
        >
            <Stack
                direction="row"
                ref={menuRootRef}
                sx={{ bgcolor: 'background.paper' }}
            >
                <Button id="planets" onClick={handleClickMenu}>Planets</Button>
                <Divider orientation="vertical" flexItem />
                <Button id="stations" onClick={handleClickMenu}>Stations</Button>
                <Divider orientation="vertical" flexItem />
                <Button id="markers" onClick={handleClickMenu}>Marker</Button>
            </Stack>
            {menuRootRef.current && currentMenu && (
                <Popper key={currentMenu} open={true} placement="top-start" anchorEl={menuRootRef.current}>
                    <Paper sx={{ marginBottom: '8px' }}>
                        <ClickAwayListener onClickAway={handleClose}>
                            <div>
                                <MapContentSearchList
                                    mapData={mapData}
                                    currentMenu={currentMenu}
                                    menuItemIdPrefix={MENU_ITEM_ID_PREFIX}
                                    onClickItem={handleClickListItem}
                                    onClickRemoveItem={onRemoveContent}
                                />
                            </div>
                        </ClickAwayListener>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
};
