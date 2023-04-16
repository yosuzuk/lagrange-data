import { useState, useCallback, useRef, SetStateAction, Dispatch } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IMapContent, IMapData } from './types/IMapContent';
import { MapContentSearchList } from './MapContentSearchList';
import planetIconWhite from './assets/planetWhite.png';
import planetIconBlack from './assets/planetBlack.png';
import cityIconWhite from './assets/cityWhite.png';
import cityIconBlack from './assets/cityBlack.png';
import pinIconWhite from './assets/pinWhite.png';
import pinIconBlack from './assets/pinBlack.png';
import { useColorMode } from '../../../theme/context/ThemeProvider';

const MENU_ITEM_ID_PREFIX = 'menuItem.';

interface IProps {
    mapData: IMapData;
    onMarkTarget: Dispatch<SetStateAction<string | null>>;
    onRemoveContent: (content: IMapContent) => void;
}

export const MapNavigatorBar = (props: IProps) => {
    const { mapData, onMarkTarget, onRemoveContent } = props;
    const [currentMenu, setCurrentMenu] = useState<string | null>(null);
    const menuRootRef = useRef<HTMLDivElement>(null);
    const colorMode = useColorMode();

    const handleClickMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        const menuId = event.currentTarget?.id ?? 'unknown';
        setCurrentMenu(currentMenu => currentMenu === menuId ? null : menuId);
    }, []);

    const handleClose = useCallback(() => {
        onMarkTarget(null);
        setCurrentMenu(null);
    }, [onMarkTarget]);

    const handleClickListItem = useCallback((event: React.MouseEvent<HTMLLIElement>) => {
        const menuItemId = event.currentTarget?.id ?? null;
        if (!menuItemId) {
            throw new Error('Missing id');
        }

        const contentId = menuItemId.substring(MENU_ITEM_ID_PREFIX.length);

        switch (currentMenu) {
            case 'planets': {
                const planet = mapData.planets.find(p => p.id === contentId);
                onMarkTarget(planet?.id ?? null);
                break;
            }
            case 'stations': {
                const station = mapData.stations.find(s => s.id === contentId);
                onMarkTarget(station?.id ?? null);
                break;
            }
            case 'markers': {
                const marker = mapData.marker.find(m => m.id === contentId);
                onMarkTarget(marker?.id ?? null);
                break;
            }
        }
    }, [currentMenu, mapData]);

    return (
        <Box
            component="div"
            sx={{
                position: 'absolute',
                left: '8px',
                bottom: '16px',
                border: '1px solid grey',
            }}
        >
            <Stack
                direction="row"
                ref={menuRootRef}
                sx={{ bgcolor: 'background.paper', height: '29px', padding: '4px 0' }}
            >
                <Button id="planets" onClick={handleClickMenu} sx={{ minWidth: '48px' }}>
                    <img alt="planets" src={colorMode.mode === 'dark' ? planetIconWhite : planetIconBlack} />
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button id="stations" onClick={handleClickMenu} sx={{ minWidth: '48px' }}>
                    <img alt="stations" src={colorMode.mode === 'dark' ? cityIconWhite : cityIconBlack} />
                </Button>
                <Divider orientation="vertical" flexItem />
                <Button id="markers" onClick={handleClickMenu} sx={{ minWidth: '48px' }}>
                    <img alt="markers" src={colorMode.mode === 'dark' ? pinIconWhite : pinIconBlack} />
                </Button>
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
