import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MyListEditActionBar } from './MyListEditActionBar';
import { MyListEdit } from './MyListEdit';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';

export const MyListEditPage = () => {
    const navigate = useNavigate();

    const { saveUserSettings, restoreUserSettings, resetUserSettings } = useUserSettings();
    const [shipFilter, setShipFilter] = useState<ShipFilterState>(createInitialShipFilterState);
    const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

    useEffect(() => {
        return () => {
            restoreUserSettings();
        };
    }, [restoreUserSettings]);

    const handleClickCancel = () => {
        restoreUserSettings();
        navigate('/myList');
    };

    const handleClickSave = () => {
        saveUserSettings();
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
        resetUserSettings();
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
                    <MyListEdit shipFilter={shipFilter} />
                </Box>
            </Container>
            {confirmingReset && (
                <ConfirmationDialog
                    title={'初期化'}
                    question={'マイリスト設定を初期状態に戻しますか？'}
                    cancelText={'キャンセル'}
                    confirmText={'初期化'}
                    onCancel={handleCancelReset}
                    onConfirm={handleConfirmReset}
                />
            )}
        </>
    );
};

export default MyListEditPage;
