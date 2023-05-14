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
import cityIconWhite from './assets/cityWhite.png';
import playerIconWhite from './assets/playerWhite.png';
import pinIconWhite from './assets/pinWhite.png';
import docksIconWhite from './assets/docksWhite.png';
import { CoordinateInputs } from './CoordinateInputs';

const MENU_ITEM_ID_PREFIX = 'menuItem.';

interface IProps {
    mapData: IMapData;
    targetToMark: IMapContent | null;
    onMarkTarget: Dispatch<SetStateAction<IMapContent | null>>;
    onRemoveContent: (content: IMapContent) => void;
}

export const MapNavigatorBar = (props: IProps) => {
    const { mapData, targetToMark, onMarkTarget, onRemoveContent } = props;
    const [currentMenu, setCurrentMenu] = useState<string | null>(null);
    const menuRootRef = useRef<HTMLDivElement>(null);

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
                onMarkTarget(planet ?? null);
                break;
            }
            case 'stations': {
                const station = mapData.stations.find(s => s.id === contentId);
                onMarkTarget(station ?? null);
                break;
            }
            case 'players': {
                const playerStructure = [
                    ...mapData.bases,
                    ...mapData.outposts,
                    ...mapData.platforms,
                ].find(s => s.id === contentId);
                onMarkTarget(playerStructure ?? null);
                break;
            }
            case 'docks': {
                const station = mapData.stations.find(s => s.id === contentId);
                onMarkTarget(station ?? null);
                break;
            }
            case 'markers': {
                const marker = mapData.marker.find(m => m.id === contentId);
                onMarkTarget(marker ?? null);
                break;
            }
        }
    }, [currentMenu, mapData]);

    return (
        <Box
            component="div"
            sx={{
                position: 'absolute',
                left: '0',
                bottom: '12px',
            }}
        >
            <Stack
                direction="row"
                sx={{ maxWidth: '80vw', flexWrap: 'wrap' }}
            >
                <Stack
                    direction="row"
                    ref={menuRootRef}
                    sx={{
                        backgroundColor: '#121212',
                        height: '29px',
                        padding: '4px 0',
                        border: '1px solid grey',
                        marginLeft: '8px',
                        marginBottom: '4px',
                    }}
                >
                    <Button id="planets" onClick={handleClickMenu} sx={{ minWidth: '42px' }}>
                        <img alt="planets" src={planetIconWhite} />
                    </Button>
                    <Divider orientation="vertical" flexItem={true} sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                    <Button id="stations" onClick={handleClickMenu} sx={{ minWidth: '42px' }}>
                        <img alt="stations" src={cityIconWhite} />
                    </Button>
                    <Divider orientation="vertical" flexItem={true} sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                    <Button id="players" onClick={handleClickMenu} sx={{ minWidth: '42px' }}>
                        <img alt="players" src={playerIconWhite} />
                    </Button>
                    <Divider orientation="vertical" flexItem={true} sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                    <Button id="docks" onClick={handleClickMenu} sx={{ minWidth: '42px' }}>
                        <img alt="docks" src={docksIconWhite} />
                    </Button>
                    <Divider orientation="vertical" flexItem={true} sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                    <Button id="markers" onClick={handleClickMenu} sx={{ minWidth: '42px' }}>
                        <img alt="markers" src={pinIconWhite} />
                    </Button>
                </Stack>
                <CoordinateInputs targetToMark={targetToMark} onMarkTarget={onMarkTarget} />
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
