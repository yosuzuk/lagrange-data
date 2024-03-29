import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MyListEditActionBar } from './MyListEditActionBar';
import { MyListEdit } from './MyListEdit';
import { ShipFilterState } from '../../filter/types/ShipFilterState';
import { createInitialShipFilterState } from '../../filter/filterUtils';
import { NavigationBar } from '../../navigation/NavigationBar';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';
import { useUserSettings } from '../../../userSettings/context/UserSettingsContext';
import { PageContent } from '../../pageStructure/PageContent';
import { PageFooter } from '../../pageStructure/PageFooter';
import { t } from '../../../i18n';

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

    const handleClickCancel = useCallback(() => {
        restoreUserSettings();
        navigate('/myList');
    }, [restoreUserSettings, navigate]);

    const handleClickSave = useCallback(() => {
        saveUserSettings();
        navigate('/myList');
    }, [saveUserSettings, navigate]);

    const handleCancelReset = useCallback(() => {
        setConfirmingReset(false);
    }, []);

    const handleClickReset = useCallback(() => {
        setConfirmingReset(true);
    }, []);

    const handleConfirmReset = useCallback(() => {
        setConfirmingReset(false);
        resetUserSettings();
    }, [resetUserSettings]);

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
            <PageContent>
                <Box component="div" p={1}>
                    <Stack pt={1} pb={2} spacing={2}>
                        <Typography variant="body2">
                            {t('myListConfig.pageDescription1')}
                        </Typography>
                        <Typography variant="body2">
                            {t('myListConfig.pageDescription2')}
                        </Typography>
                        <Typography variant="body2">
                            {t('myListConfig.pageDescription3')}
                        </Typography>
                    </Stack>
                    <MyListEdit shipFilter={shipFilter} />
                </Box>
            </PageContent>
            {confirmingReset && (
                <ConfirmationDialog
                    title={t('button.initialize')}
                    question={t('myList.confirmInitialize')}
                    cancelText={t('button.cancel')}
                    confirmText={t('button.initialize')}
                    onCancel={handleCancelReset}
                    onConfirm={handleConfirmReset}
                />
            )}
            <PageFooter />
        </>
    );
};

export default MyListEditPage;
