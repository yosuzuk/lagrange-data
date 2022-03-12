import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Container } from '../../container/Container';
import { NavigationBar } from '../../navigation/NavigationBar';
import { FleetEditor } from './FleetEditor';
import { FleetSetupEditActionBar } from './FleetSetupEditActionBar';
import { ConfirmationDialog } from '../../dialog/ConfirmationDialog';

export const FleetSetupEditPage = () => {
    const navigate = useNavigate();
    const { fleetKey } = useParams();

    const [confirmingReset, setConfirmingReset] = useState<boolean>(false);

    const handleClickCancel = () => {
        navigate('/fleetSetup');
    };

    const handleClickSave = () => {
        // TODO implement
        navigate('/fleetSetup');
    };

    const handleCancelReset = () => {
        setConfirmingReset(false);
    };

    const handleClickReset = () => {
        setConfirmingReset(true);
    };

    const handleConfirmReset = () => {
        setConfirmingReset(false);
        // TODO implement
    };

    return (
        <>
            <NavigationBar currentRoute="/fleetSetup" />
            <FleetSetupEditActionBar
                onSave={handleClickSave}
                onCancel={handleClickCancel}
                onReset={handleClickReset}
            />
            <Container>
                <Box p={1}>
                    <FleetEditor fleetKey={fleetKey} />
                </Box>
            </Container>
            {confirmingReset && (
                <ConfirmationDialog
                    title={'初期化'}
                    question={'艦隊を初期状態に戻しますか？'}
                    cancelText={'キャンセル'}
                    confirmText={'初期化'}
                    onCancel={handleCancelReset}
                    onConfirm={handleConfirmReset}
                />
            )}
        </>
    );
}

export default FleetSetupEditPage;
