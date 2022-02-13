import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MyListEditActionBar } from './MyListEditActionBar';
import { MyListEdit } from './MyListEdit';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { ShipSettingState, UserSettings } from '../../../userSettings/types/UserSettings';
import { getCurrentUserSettings, saveUserSettings, createInitialUserSettings } from '../../../userSettings/utils/userSettingsUtils';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { ResetConfirmationDialog } from './ResetConfirmationDialog';

export const MyListEditPage = () => {
    const navigate = useNavigate();

    const [userSettings, setUserSettings] = useState<UserSettings>(getCurrentUserSettings);
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(createInitialShipFilterState);
    const [shipSetting, setShipSetting] = useState<ShipSettingState>(userSettings.ships);
    const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

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

    const handleCancelReset = () => {
        setConfirmingReset(false);
    };

    const handleClickReset = () => {
        setConfirmingReset(true);
    };

    const handleConfirmReset = () => {
        setConfirmingReset(false);
        setShipSetting(createInitialUserSettings().ships);
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
                    <Stack pt={1} pb={2} spacing={2}>
                        <Typography variant="body2">
                            {'ここでは艦船/設計図の所有状態を設定できます。'}
                        </Typography>
                        <Typography variant="body2">
                            {'全て細かく設定する必要はありません。'}
                        </Typography>
                        <Typography variant="body2">
                            {'設定データはブラウザのローカルストレージに保存されます。'}
                        </Typography>
                    </Stack>
                    <MyListEdit
                        shipSetting={shipSetting}
                        shipFilter={shipFilter}
                        onShipSettingChange={setShipSetting}
                    />
                </Box>
            </Container>
            {confirmingReset && (
                <ResetConfirmationDialog
                    onCancel={handleCancelReset}
                    onConfirm={handleConfirmReset}
                />
            )}
        </>
    );
};

export default MyListEditPage;
