import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { MyListEditActionBar } from './MyListEditActionBar';
import { MyListEdit } from './MyListEdit';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { ShipSettingState, UserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings, saveUserSettings, createInitialUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';

export const MyListEditPage = () => {
    const navigate = useNavigate();

    const [userSettings, setUserSettings] = useState<UserSettings>(getCurrentUserSettings);
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(createInitialShipFilterState);
    const [shipSetting, setShipSetting] = useState<ShipSettingState>(userSettings.ships);

    const handleClickCancel = () => {
        setShipSetting(userSettings.ships);
        navigate('/myList');
    };

    const handleClickSave = () => {
        const newUserSettings = {
            ...getCurrentUserSettings(),
            ships: shipSetting,
        };
        saveUserSettings(newUserSettings);
        setUserSettings(newUserSettings);
        navigate('/myList');
    };

    const handleClickReset = () => {
        if (window.confirm('設定を初期化しますか？')) {
            setShipSetting(createInitialUserSettings().ships);
        }
    };

    return (
        <>
            <NavigationBar currentRoute="/myList" />
            <MyListEditActionBar
                shipFilter={shipFilter}
                onCancel={handleClickCancel}
                onReset={handleClickReset}
                onSave={handleClickSave}
                onFilter={setShipFilter}
            />
            <Container>
                <Box p={1}>
                    <MyListEdit
                        shipSetting={shipSetting}
                        shipFilter={shipFilter}
                        onShipSettingChange={setShipSetting}
                    />
                </Box>
            </Container>
        </>
    );
};

export default MyListEditPage;
