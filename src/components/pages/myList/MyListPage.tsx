import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MyListActionBar } from './MyListActionBar';
import { MyListEdit } from './MyListEdit';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState, extractPossesssedShips, extractUnwishedShips, extractWishedShips } from '../../filter/filterUtils';
import { ShipSettingState, UserSettings } from '../../../userSettings/types/UserSettings';
import { restoreUserSettings, saveUserSettings, createInitialUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { MyListView } from './MyListView';
import { ShipsSharingDialog } from './ShipsSharingDialog';
import { shipDefinitions } from '../../../data/shipDefinitions';
import { IShipListState } from './types/IShipListState';

const getCurrentUserSettings = (): UserSettings => restoreUserSettings() ?? createInitialUserSettings();

export const MyListPage = () => {
    const [userSettings, setUserSettings] = useState<UserSettings>(getCurrentUserSettings);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(createInitialShipFilterState);
    const [shipSetting, setShipSetting] = useState<ShipSettingState>(userSettings.ships);
    const [shipsForShare, setShipsForShare] = useState<IShipListState | null>(null);

    const shipList = useMemo<IShipListState>(() => ({
        possessed: extractPossesssedShips(shipDefinitions, shipSetting, shipFilter),
        wished: extractWishedShips(shipDefinitions, shipSetting, shipFilter),
        unwished: extractUnwishedShips(shipDefinitions, shipSetting, shipFilter),
    }), [shipSetting, shipFilter]);

    const handleClickEdit = () => {
        setEditMode(true);
    };

    const handleClickCancel = () => {
        setShipSetting(userSettings.ships);
        setEditMode(false);
    };

    const handleClickSave = () => {
        const newUserSettings = {
            ...getCurrentUserSettings(),
            ships: shipSetting,
        };
        saveUserSettings(newUserSettings);
        setUserSettings(newUserSettings);
        setEditMode(false);
    };

    const handleClickReset = () => {
        if (window.confirm('設定を初期化しますか？')) {
            setShipSetting(createInitialUserSettings().ships);
        }
    };

    const handleClickShare = () => {
        setShipsForShare(shipList);
    };

    const handleCloseShare = () => {
        setShipsForShare(null);
    };

    return (
        <>
            <MyListActionBar
                editMode={editMode}
                shipFilter={shipFilter}
                onCancel={handleClickCancel}
                onEdit={handleClickEdit}
                onReset={handleClickReset}
                onSave={handleClickSave}
                onFilter={setShipFilter}
                onShare={handleClickShare}
            />
            <Container maxWidth="md" disableGutters={true}>
                <Box p={1}>
                    {editMode ? (
                        <MyListEdit
                            shipSetting={shipSetting}
                            shipFilter={shipFilter}
                            onShipSettingChange={setShipSetting}
                        />
                    ) : (
                        <MyListView
                            possessedShips={shipList.possessed}
                            wishedShips={shipList.wished}
                            unwishedShips={shipList.unwished}
                         />
                    )}
                </Box>
            </Container>
            {shipsForShare && (
                <ShipsSharingDialog
                    ships={shipsForShare}
                    open={true}
                    onClose={handleCloseShare}
                >
                    
                </ShipsSharingDialog>
            )}
        </>
    );
};
